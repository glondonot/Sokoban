//-----seccion encarga de iniciarlizar variables de juego-----
let h , player , caja , cajas = [] , nivel = 1
let jugando = false;
let niveles = false;
let informacion = false;
let seleccionado=false;
let imagenenpantalla= false;
let controlesenpantalla=false;
let crearmapa = false;
let crearbotones = false;
let hola = true;
let cancion = false;
//-----seccion encarga de cargar los sprites del juego-----
function preload() {
  ImagenPlayer_right = loadImage("assets/Player_right.png");
  ImagenPlayer_left = loadImage("assets/Player_left.png");
  ImagenBox = loadImage("assets/Box.png");
  ImagenWall = loadImage("assets/Wall.png");
  ImagenStorage = loadImage("assets/Storage.png");
  nivel1=loadImage("assets/nivel1.png");
  nivel2=loadImage("assets/nivel2.png");
  nivel3=loadImage("assets/nivel3.png");
  nivel4=loadImage("assets/nivel9.png");
  nivel5=loadImage("assets/nivel7.png");
  nivel6=loadImage("assets/nivel4.png");
  nivel7=loadImage("assets/nivel8.png");
  nivel8=loadImage("assets/nivel5.png");
  nivel9=loadImage("assets/nivel6.png");
  nivel10=loadImage("assets/nivel10.png");
  soundFormats('ogg', 'mp3');
  soundFile = loadSound('assets/musica.mp3');

}
//crea el menu que actua como una ventana emergente.
Swal.fire({
  title: 'Sokoban',
  showDenyButton: true,
  showCancelButton: true,
  allowOutsideClick: false,
  confirmButtonText: 'Jugar',
  denyButtonText: `Selector de niveles`,
  denyButtonColor: '#1C6DD0',
  cancelButtonText: 'Sobre nosotros',
  cancelButtonColor: '#A3E4DB',
  backdrop: "#181D31",
  background:"#F0E9D2",
  imageUrl: 'assets/inicio.png',
  imageWidth: 400,
  imageHeight: 400,
  imageAlt: 'Custom image',
  //esta parte se encarga de mostrar los botones y sus resultados
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('Sobokan es un juego en el que debes poner las cajas encima de las marcas. \n ¡una vez hecho pasaras al siguiente nivel! \n ten cuidado, si haces movimientos equivocados puedes terminar atascando las cajas y la unica manera de continuar es reiniciar el nivel. \n ¡buena suerte!', '', 'info')
    iniciar(jugando=true);
  } 
  if (result.isDenied) {
    Swal.fire('Selecciona el nivel que quieres jugar', '', 'info')
    elegirnivel();
    
  }
  if (result.isDismissed) {
    informacionimportante();
    
    }
})
//estas funciones retornan un valor positivo para hacer referencia que es la secccion activa
//seccion en la que se juega
function iniciar(){
  nivel = 1
  jugando = true;
  setup()
  Construir(mapas())
}
//seccion en la que se elige el nivel
function elegirnivel(){
  niveles=true;
}
//seccion en la que se muestra la informacion importante
function informacionimportante(){
  informacion=true;
}

// Inicar nivel escogido 
function jugarNiveln(){
  nivel=slider.value();
  jugando = true;
  setup()
  Construir(mapas())
  seleccionado=true;
}
//-----se establece el tamaño del canvas y se crea objeto tablero y almacen-----
function setup() {
  //seccion que pone la cancion
  if(cancion==false){
    soundFile.setVolume(0.1)
    soundFile.loop()
    cancion=true;
  }
  imagenesancho=windowWidth/2.3;
  imageneslargo=windowHeight/2.3;
  h = windowHeight/10
  createCanvas(windowHeight, windowHeight)
  board = new Tablero
  almacen = new Almacen
  // creación botones
  if (crearbotones==false &&  niveles==true){
    slider=createSlider(1,10,1,1);
    slider.position(0,windowHeight/2);
    slider.center('horizontal')
    button = createButton('Regresar al menu principal');
    button.position(0, windowHeight/1.5);
    button.center("horizontal");  
    button.mousePressed(recargarpagina);
    button.style("background-color","#4CAF50C");
    button.style("border","none");
    button.style("color","black");
    button.style("padding","10px 10px");
    button.style("border-radius","10px")
    button.style("fount-size","10px")
    button.style("box-shadow", "0 4px 4px 0")

    // boton 1 (El numero corresponde el nivel seleccionado)
    boton_1=createButton("Jugar Nivel");
    boton_1.position(0, windowHeight/1.7);
    boton_1.center("horizontal");
    boton_1.mousePressed(jugarNiveln)
    boton_1.style("background-color","#8CFF98");
    boton_1.style("border","none");
    boton_1.style("color","black");
    boton_1.style("padding","10px 10px");
    boton_1.style("border-radius","10px")
    boton_1.style("fount-size","10px")
    boton_1.style("box-shadow", "0 4px 4px 0")
    crearbotones=true;
    }
    // crea la imagen de los controles
    if (jugando == true){
      controles = createImg("assets/controles.png")
      controles.position(windowWidth-windowHeight/2,windowHeight/3);
      controles.size(windowHeight/2,windowHeight/2);
    }
    
    //verifica si el boton "sobrenosotros" fue presionado y si no se ha creado ya la  informacion de esa parte, de ser asi la crea.
    if (imagenenpantalla==false && informacion==true){
      aboutus = createImg("assets/fondo.png",'sobre nosotros');
      aboutus.position(0,0);
      aboutus.size(windowWidth,windowHeight);
      button = createButton('regresar al menu principal');
      button.position(0, windowHeight/1.1);
      button.center("horizontal");
      button.mousePressed(recargarpagina);
      imagenenpantalla=true;
    }
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
    Construir(mapas())
  }
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
//funcion que recarga la pagina
function recargarpagina(){
  location.reload();
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
    Construir(mapas())
  }
  if (keyCode == 27){
    recargarpagina()
  }
}

//-----seccion encarga de dibujar objetos del juego-----
function draw() {
  console.log(niveles);
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
  //si el boton niveles es seleccionado se ejecuta esta parte de aca
  if (niveles==true){
    //si no existen los botones los crea
    if (crearbotones==false){
      setup();
    }
    // La valiable seleccionados determina su el usuario a escogido o no un nivel, con la intención de controlar el canvas mostrado
    if(seleccionado==false){
      background("#59656F");
      boton_1.show();
      // Slider.value es una función propia de p5, que determina el valor actual de un slider
      if(slider.value()==1){
        image(nivel1,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==2){
        image(nivel2,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==3){
        image(nivel3,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==4){
        image(nivel4,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==5){
        image(nivel5,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==6){
        image(nivel6,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==7){
        image(nivel7,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==8){
        image(nivel8,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==9){
        image(nivel9,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }
      else if(slider.value()==10){
        image(nivel10,windowWidth/8,windowHeight/20,imageneslargo,imageneslargo);
      }

    }
    else{
      background(220);
      almacen.victoria()
      player.draw()
      player.limite()
      ncajas()
      board.draw()
      almacen.draw()
      board.limitetablero('player')
      slider.hide();
      boton_1.hide();
      button.hide();
    }
  }
  //si el boton informacion es seleccionado se ejecuta esta parte de aca.
  if (informacion==true){
    background('#1e243b');
    //verifica si se creo la informacion de los botones, si es falso entonces la crea
    if (imagenenpantalla==false){
      setup();
    }
  } 
}












