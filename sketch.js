//-----seccion encarga de iniciarlizar variables de juego-----
let h , player , caja , cajas = [] , nivel = 1
let jugando = false;
let niveles = false;
let informacion = false;

//-----seccion encarga de cargar los sprites del juego-----
function preload() {
  ImagenPlayer_right = loadImage("assets/Player_right.png");
  ImagenPlayer_left = loadImage("assets/Player_left.png");
  ImagenBox = loadImage("assets/Box.png");
  ImagenWall = loadImage("assets/Wall.png");
  ImagenStorage = loadImage("assets/Storage.png");
}
//crea el menu que actua como una ventana emergente.
Swal.fire({
  title: 'Sokoban!',
  showDenyButton: true,
  showCancelButton: true,
  allowOutsideClick: false,
  confirmButtonText: 'Jugar',
  denyButtonText: `Selector de niveles`,
  denyButtonColor: '#1C6DD0',
  cancelButtonText: 'Sobre nosotros',
  cancelButtonColor: '#A3E4DB',
  backdrop: "#B983FF",
  background:"#94B3FD",
  imageUrl: 'assets/inicio.png',
  imageWidth: 400,
  imageHeight: 400,
  imageAlt: 'Custom image',
  //esta parte se encarga de mostrar los botones y sus resultados
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Sobokan es un juego en el que debes poner las cajas encima de las marcas. \n ¡una vez hecho pasaras al siguiente nivel! \n ten cuidado, si haces movimientos equivocados puedes terminar atascando las cajas y la unica manera de continuar es reiniciar el nivel. \n ¡buena suerte!', '', 'info')
    iniciar();
  } 
  if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
    elegirnivel();
  }
  if (result.isDismissed) {
    informacionimportante();
    }
})
//estas funciones retornan un valor positivo para hacer referencia que es la secccion activa
function iniciar(){
  return jugando=true;
}
function elegirnivel(){
  return niveles=true;
}
function informacionimportante(){
  return informacion=true;
}

//-----se establece el tamaño del canvas y se crea objeto tablero y almacen-----
function setup() {
  h = windowHeight/10
  createCanvas(windowHeight, windowHeight)
  board = new Tablero
  almacen = new Almacen
  //llama la funcion mapa y segun el mapa este es construido
  Construir(mapas())
}

//-----se encarga de representar el mapa y crear los objetos en este-----
function Construir(map){
  let c = 0
  for(let i = 0 ; i<map.length ; i++){
    for(let j = 0 ; j<map[i].length ; j++){
      //-----Si en la posicion indicada del mapa se encuentra # crea pared-----
      if(map[i][j]=='#'){
        append(board.wallX,j)
        append(board.wallY,i)
      }
      //-----Si en la posicion indicada del mapa se encuentra ! crea almacenaje-----
      if(map[i][j]=='!'){
        append(almacen.storageX,j)
        append(almacen.storageY,i)
      }
      //-----Si en la posicion indicada del mapa se encuentra @ crea objeto personaje-----   
      if(map[i][j]=='@'){
        player = new Jugador(j,i)
      }
      //-----Si en la posicion indicada del mapa se encuentra & crea objeto caja-----
      if(map[i][j]=='&'){
        eval('caja' + c + '= ' + 'new ' + 'Caja(j,i)')
        //se crean todos los objetos 'caja' y se almacena en lista 'cajas'
        append(cajas,eval('caja' + c))
        c += 1
      }
    }
  }
}
//-----Segun la cantidad de cajas, estas son dibujadas-----
function ncajas(){
  for(let i = 0 ; i<cajas.length ; i++){
    eval('cajas' + '['+i+']' + '.' + 'draw()')
  }
  //Se crea la condicion de victoria segun cada nivel y pasa al siguiente
  if(almacen.victory == true){
    console.log('ya ganaste wapo')
    nivel = nivel + 1
    setup()
  }
}

//-----seccion encarga de dibujar objetos del juego-----
function draw() {
  //si el boton jugar es seleccionado se ejecuta esta parte de aca
  if (jugando==true){
    background(220);
    almacen.victoria()
    player.draw()
    player.limite()
    ncajas()
    board.draw()
    almacen.draw()
    board.limitetablero('player')
  }
  //si el boton niveles es seleccionado se ehecuta esta parte de aca
  if (niveles==true){
    background(50);
  }
  //si el boton informacion es seleccionado se ejecuta esta parte de aca.
  if (informacion==true){
    background('#1e243b');
    aboutus = createImg("assets/fondo.png",'sobre nosotros');
    aboutus.position(0,0);
    aboutus.size(windowWidth,windowHeight);
    //crea un boton que se devuelve al menu (recargando la pagina)
    button = createButton('regresar al menu principal');
    button.position(0, windowHeight/1.1);
    button.center("horizontal");
    button.mousePressed(recargarpagina);
  }
}
//funcion que recarga la pagina
function recargarpagina(){
  location.reload();
}
//-----Clase tablero representa la posicion de las paredes y las coliciones con estos-----
class Tablero{
  constructor(){
    this.wallX = []
    this.wallY = []
  }
  //dibuja cada bloque de pared
  draw(){
    for(let i = 0 ; i<this.wallX.length ; i++){
      image(ImagenWall, h*this.wallX[i], h*this.wallY[i], h, h)
    }
  }
  //verifica las coliciones jugador-pared y caja-pared
  limitetablero(objeto){
    if(objeto == 'player'){
      eval('objeto'+' = '+'player')  
    }
    if(objeto == 'caja'){
      eval('objeto'+'='+'caja')  
    }
    objeto.moveDer = true
    objeto.moveIzq = true
    objeto.moveArriba = true
    objeto.moveAbajo = true
    for (let i = 0; i<board.wallX.length; i++){
      if(board.wallY[i]==objeto.coordY && board.wallX[i]==objeto.coordX+1){
        objeto.moveDer = false
      }
      if(board.wallY[i]==objeto.coordY && board.wallX[i]==objeto.coordX-1){
        objeto.moveIzq = false
      }
      if(board.wallY[i]==objeto.coordY+1 && board.wallX[i]==objeto.coordX){
        objeto.moveAbajo = false
      }
      if(board.wallY[i]==objeto.coordY-1 && board.wallX[i]==objeto.coordX){
        objeto.moveArriba = false
      }
    }
  }

  //verifica las coliciones entre las cajas
  limiteCaja(caja,p){
    let caja2
    for(let j = 0 ; j<cajas.length; j++){
      eval('caja2'+' = '+'cajas[j]')
  
      caja.moveDer = true
      caja.moveIzq = true
      caja.moveArriba = true
      caja.moveAbajo = true
      if(caja2.coordY==caja.coordY && caja2.coordX==caja.coordX+1 && p == 'd'){
        return caja.moveDer = false
      }
      if(caja2.coordY==caja.coordY && caja2.coordX==caja.coordX-1 && p == 'i'){
        return caja.moveIzq = false
      }
      if(caja2.coordY==caja.coordY+1 && caja2.coordX==caja.coordX && p == 'ab'){
        return caja.moveAbajo = false
      }
      if(caja2.coordY==caja.coordY-1 && caja2.coordX==caja.coordX && p == 'ar'){
        return caja.moveArriba = false
      }
    } 
  }
}

//-----Clase jugador representa la posicion de jugador, movimiento de este y colicion con cajas-----
class Jugador{
  constructor(posInicialX,posInicialY){
    this.direccion = ''
    this.moveX = posInicialX*h;
    this.moveY = posInicialY*h;
    this.coordX = posInicialX;
    this.coordY = posInicialY;
    this.moveIzq = true
    this.moveDer = true
    this.moveArriba = true
    this.moveAbajo = true
  }
  //dibuja al jugador segun la direccion que se encuentra
  draw(){
    if(this.direccion =='l'){
      image(ImagenPlayer_left, this.moveX, this.moveY, h, h)
      return
    } 
    if(this.direccion =='d'){
      image(ImagenPlayer_right, this.moveX, this.moveY, h, h)
      return
    } 
    else{
      image(ImagenPlayer_right, this.moveX, this.moveY, h, h)
      
    }
  }
  //Maneja las coliciones del jugador, verificando si estas existen y permitiendo el movimiento del jugador
  limite(p){
    for(let i = 0 ; i<cajas.length ; i++){
      eval('caja'+' = '+'cajas[i]') 
      if(caja.coordY==player.coordY && caja.coordX==player.coordX+1 && p == 'd'){
        board.limiteCaja(caja,p)
        if(caja.moveDer == false){
          player.moveDer = false
          break
        }
        else{
          board.limitetablero('caja')
          if(caja.moveDer == false){
            player.moveDer = false
          }
          else{player.moveDer = true
          caja.movDerecha()}
        }
        
      }
      if(caja.coordY==player.coordY && caja.coordX==player.coordX-1 && p == 'i'){
        board.limiteCaja(caja,p)
        if(caja.moveIzq == false){
          player.moveIzq = false
          break
        }
        else{
          board.limitetablero('caja')
          if(caja.moveIzq == false){
            player.moveIzq = false
          }
          else{player.moveIzq = true
          caja.movIzqrda()}}
      }
      if(caja.coordY==player.coordY+1 && caja.coordX==player.coordX && p == 'ab'){
        board.limiteCaja(caja,p)
        if(caja.moveAbajo == false){
          player.moveAbajo = false
          break
        }
        else{
          board.limitetablero('caja')
          if(caja.moveAbajo == false){
            player.moveAbajo = false
          }
          else{player.moveAbajo = true
          caja.movAbajo()}}
      }
      if(caja.coordY==player.coordY-1 && caja.coordX==player.coordX && p == 'ar'){
        board.limiteCaja(caja,p)
        if(caja.moveArriba == false){
          player.moveArriba = false
          break
        }
        else{
          board.limitetablero('caja')
          if(caja.moveArriba == false){
            player.moveArriba = false
          }
          else{player.moveArriba = true
          caja.movArriba()}}
      }
    }
    
  }
  //Si es permitido, el jugador se mueve a  la derecha
  movDerecha(){
    player.limite('d')
    if(player.moveDer == false){
      //Do nothing
    }
    else{
      this.moveX = this.moveX + h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'd'
  }
  //Si es permitido, el jugador se mueve a  la izquierda
  movIzqrda(){
    player.limite('i')
    if(this.moveIzq == false){
      //Do nothing
    }
    else{this.moveX = this.moveX - h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'l'
  }
  //Si es permitido, el jugador se mueve abajo
  movAbajo(){
    player.limite('ab')
    if(this.moveAbajo == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY + h
      this.coordY = round(this.moveY/h)}
  }
  //Si es permitido, el jugador se mueve arriba
  movArriba(){
    player.limite('ar')
    if(this.moveArriba == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY - h
      this.coordY = round(this.moveY/h)}
  }

}

//-----Clase caja representa la posicion de cada objeto caja y movimiento de este objeto-----
class Caja{
  constructor(posInicialX,posInicialY){
    this.moveX = posInicialX*h;
    this.moveY = posInicialY*h;
    this.coordX = posInicialX;
    this.coordY = posInicialY;
    this.moveIzq = true
    this.moveDer = true
    this.moveArriba = true
    this.moveAbajo = true
  }
  //dibuja cada caja segun su posicion
  draw(){
    image(ImagenBox, this.moveX, this.moveY, h, h)  
  }
  //-----Seccion se encarga del movimiento de la caja, igual al del jugador-----
  movDerecha(){
    if(this.moveDer == false){
      //Do nothing
    }
    else{
      this.moveX = this.moveX + h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'd'
  }

  movIzqrda(){
    if(this.moveIzq == false){
      //Do nothing
    }
    else{this.moveX = this.moveX - h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'l'
  }

  movAbajo(){
    if(this.moveAbajo == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY + h
      this.coordY = round(this.moveY/h)}
  }

  movArriba(){
    if(this.moveArriba == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY - h
      this.coordY = round(this.moveY/h)}
  }
}
//-----Clase almacen representa la posicion de cada almacenaje y si estos se encuentran ocupados-----
class Almacen{
  constructor(){
    this.storageX = []
    this.storageY = []
    this.victory = false
  }

  draw(){
    for(let i = 0 ; i<this.storageX.length ; i++){
      image(ImagenStorage, h*this.storageX[i], h*this.storageY[i], h, h)
    }
  }
  //verifica la condicion de victoria si todos los almacenajes se encuentran ocupados por cajas
  victoria(){
    let vic = 0
    for(let i = 0 ; i<cajas.length ; i++){
      eval('caja'+' = '+'cajas[i]')
      for(let j = 0 ; j<cajas.length ; j++){
        if(caja.coordY==this.storageY[j] && caja.coordX==this.storageX[j]){
          vic = vic + 1
        }
        if(vic==this.storageX.length){
          this.victory = true
          return 
        }
      }
    }
  }
}

//-----Funcion se encarga del movimiento del personaje con las teclas-----
function keyPressed(){
  if (keyCode == UP_ARROW){
    player.movArriba()
  }
  if (keyCode == DOWN_ARROW){
    player.movAbajo()
  }
  if (keyCode == LEFT_ARROW){
    player.movIzqrda()
  }
  if (keyCode == RIGHT_ARROW){
    player.movDerecha()
  }
  if (keyCode == 32){
    setup()
  }
  if (keyCode == 77){
    almacen.victory = true
  }
}
