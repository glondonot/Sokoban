//-----seccion encarga de iniciarlizar variables de juego-----
let h , player , caja , cajas = [] , nivel = 0
let jugando = false;
let niveles = false;
let informacion = false;
seleccionado=false;

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
  nivel4=loadImage("assets/nivel4.png");
  nivel5=loadImage("assets/nivel5.png");
  nivel6=loadImage("assets/nivel6.png");
  nivel7=loadImage("assets/nivel7.png");
  nivel8=loadImage("assets/nivel8.png");
  nivel9=loadImage("assets/nivel9.png");
  nivel10=loadImage("assets/nivel10.png");

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
    Swal.fire('Selecciona el nivel que quieres jugar', '', 'info')
    elegirnivel();
    
  }
  if (result.isDismissed) {
    informacionimportante();
    
    }
})
//estas funciones retornan un valor positivo para hacer referencia que es la secccion activa
function iniciar(){
  nivel=1
  Construir(mapas())
  return jugando=true;
  
}
function elegirnivel(){
  return niveles=true;
}
function informacionimportante(){
  return informacion=true;
}

// Inicar nivel escogido 
function inicarNivel1(){
  nivel=1;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel2(){
  nivel=2;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel3(){
  nivel=3;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel4(){
  nivel=4;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel5(){
  nivel=5;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel6(){
  nivel=6;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel7(){
  nivel=7;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel8(){
  nivel=8;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel9(){
  nivel=9;
  Construir(mapas())
  seleccionado=true;
}

function inicarNivel10(){
  nivel=10;
  Construir(mapas())
  seleccionado=true;
}

//-----se establece el tamaño del canvas y se crea objeto tablero y almacen-----
function setup() {
  h = windowHeight/10
  createCanvas(windowHeight, windowHeight)
  board = new Tablero
  almacen = new Almacen
  slider=createSlider(1,10,1,1);
  slider.position(580, 500);
  // creación botones
      button = createButton('Regresar al menu principal');
      button.position(0, 600);
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
      boton_1=createButton("Nivel 1");
      boton_1.position(0, 540);
      boton_1.center("horizontal");
      boton_1.mousePressed(inicarNivel1)
      boton_1.style("background-color","#8CFF98");
      boton_1.style("border","none");
      boton_1.style("color","black");
      boton_1.style("padding","10px 10px");
      boton_1.style("border-radius","10px")
      boton_1.style("fount-size","10px")
      boton_1.style("box-shadow", "0 4px 4px 0")
      // boton 2
      boton_2=createButton("Nivel 2");
      boton_2.position(0, 540);
      boton_2.center("horizontal");
      boton_2.mousePressed(inicarNivel2)
      boton_2.style("background-color","#8CFF98");
      boton_2.style("border","none");
      boton_2.style("color","black");
      boton_2.style("padding","10px 10px");
      boton_2.style("border-radius","10px")
      boton_2.style("fount-size","10px")
      boton_2.style("box-shadow", "0 4px 4px 0")
      // boton 3
      boton_3=createButton("Nivel 3");
      boton_3.position(0, 540);
      boton_3.center("horizontal");
      boton_3.mousePressed(inicarNivel3)
      boton_3.style("background-color","#8CFF98");
      boton_3.style("border","none");
      boton_3.style("color","black");
      boton_3.style("padding","10px 10px");
      boton_3.style("border-radius","10px")
      boton_3.style("fount-size","10px")
      boton_3.style("box-shadow", "0 4px 4px 0")
      // Boton 4
      boton_4=createButton("Nivel 4");
      boton_4.position(0, 540);
      boton_4.center("horizontal");
      boton_4.mousePressed(inicarNivel4)
      boton_4.style("background-color","#8CFF98");
      boton_4.style("border","none");
      boton_4.style("color","black");
      boton_4.style("padding","10px 10px");
      boton_4.style("border-radius","10px")
      boton_4.style("fount-size","10px")
      boton_4.style("box-shadow", "0 4px 4px 0")
      // boton 5b
      boton_5=createButton("Nivel 5");
      boton_5.position(0, 540);
      boton_5.center("horizontal");
      boton_5.mousePressed(inicarNivel5)
      boton_5.style("background-color","#8CFF98");
      boton_5.style("border","none");
      boton_5.style("color","black");
      boton_5.style("padding","10px 10px");
      boton_5.style("border-radius","10px")
      boton_5.style("fount-size","10px")
      boton_5.style("box-shadow", "0 4px 4px 0")
      // boton 6
      boton_6=createButton("Nivel 6");
      boton_6.position(0, 540);
      boton_6.center("horizontal");
      boton_6.mousePressed(inicarNivel6)
      boton_6.style("background-color","#8CFF98");
      boton_6.style("border","none");
      boton_6.style("color","black");
      boton_6.style("padding","10px 10px");
      boton_6.style("border-radius","10px")
      boton_6.style("fount-size","10px")
      boton_6.style("box-shadow", "0 4px 4px 0")
      // boton 7
      boton_7=createButton("Nivel 7");
      boton_7.position(0, 540);
      boton_7.center("horizontal");
      boton_7.mousePressed(inicarNivel7)
      boton_7.style("background-color","#8CFF98");
      boton_7.style("border","none");
      boton_7.style("color","black");
      boton_7.style("padding","10px 10px");
      boton_7.style("border-radius","10px")
      boton_7.style("fount-size","10px")
      boton_7.style("box-shadow", "0 4px 4px 0")
      // boton 8
      boton_8=createButton("Nivel 8");
      boton_8.position(0, 540);
      boton_8.center("horizontal");
      boton_8.mousePressed(inicarNivel8)
      boton_8.style("background-color","#8CFF98");
      boton_8.style("border","none");
      boton_8.style("color","black");
      boton_8.style("padding","10px 10px");
      boton_8.style("border-radius","10px")
      boton_8.style("fount-size","10px")
      boton_8.style("box-shadow", "0 4px 4px 0")
      // boton 9
      boton_9=createButton("Nivel 9");
      boton_9.position(0, 540);
      boton_9.center("horizontal");
      boton_9.mousePressed(inicarNivel9)
      boton_9.style("background-color","#8CFF98");
      boton_9.style("border","none");
      boton_9.style("color","black");
      boton_9.style("padding","10px 10px");
      boton_9.style("border-radius","10px")
      boton_9.style("fount-size","10px")
      boton_9.style("box-shadow", "0 4px 4px 0")
      // boton 10
      boton_10=createButton("Nivel 10");
      boton_10.position(0, 540);
      boton_10.center("horizontal");
      boton_10.mousePressed(inicarNivel10)
      boton_10.style("background-color","#8CFF98");
      boton_10.style("border","none");
      boton_10.style("color","black");
      boton_10.style("padding","10px 10px");
      boton_10.style("border-radius","10px")
      boton_10.style("fount-size","10px")
      boton_10.style("box-shadow", "0 4px 4px 0")
      // asda
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
    Construir(mapas())
  }
  if (keyCode == 77){
    almacen.victory = true
  }
  if(keyCode == 66){
  
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
    slider.hide();
    boton_1.hide();
    boton_2.hide();
    boton_3.hide();
    boton_4.hide();
    boton_5.hide();
    boton_6.hide();
    boton_7.hide();
    boton_8.hide();
    boton_9.hide();
    boton_10.hide();
    button.hide();
  }
  //si el boton niveles es seleccionado se ejecuta esta parte de aca
  if (niveles==true){
    // La valiable seleccionados determina su el usuario a escogido o no un nivel, con la intención de controlar el canvas mostrado
    if(seleccionado==false){
      background("#59656F");
      // Slider.value es una función propia de p5, que determina el valor actual de un slider
      if(slider.value()==1){
        image(nivel1,125,50,450,400);
        boton_1.show();
        boton_2.hide();
        boton_3.hide();
        boton_4.hide();
        boton_5.hide();
        boton_6.hide();
        boton_7.hide();
        boton_8.hide();
        boton_9.hide();
        boton_10.hide();
      }
      else if(slider.value()==2){
        image(nivel2,125,50,450,400);
        boton_1.hide();
        boton_2.show();
        boton_3.hide();
        boton_4.hide();
        boton_5.hide();
        boton_6.hide();
        boton_7.hide();
        boton_8.hide();
        boton_9.hide();
        boton_10.hide();

      }
      else if(slider.value()==3){
        image(nivel3,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.show();
        boton_4.hide();
        boton_5.hide();
        boton_6.hide();
        boton_7.hide();
        boton_8.hide();
        boton_9.hide();
        boton_10.hide();
      }
      else if(slider.value()==4){
        image(nivel4,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.hide();
        boton_4.show();
        boton_5.hide();
        boton_6.hide();
        boton_7.hide();
        boton_8.hide();
        boton_9.hide();
        boton_10.hide();
      }
      else if(slider.value()==5){
        image(nivel5,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.hide();
        boton_4.hide();
        boton_5.show();
        boton_6.hide();
        boton_7.hide();
        boton_8.hide();
        boton_9.hide();
        boton_10.hide();
      }
      else if(slider.value()==6){
        image(nivel6,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.hide();
        boton_4.hide();
        boton_5.hide();
        boton_6.show();
        boton_7.hide();
        boton_8.hide();
        boton_9.hide();
        boton_10.hide();
      }
      else if(slider.value()==7){
        image(nivel7,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.hide();
        boton_4.hide();
        boton_5.hide();
        boton_6.hide();
        boton_7.show();
        boton_8.hide();
        boton_9.hide();
        boton_10.hide();
      }
      else if(slider.value()==8){
        image(nivel8,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.hide();
        boton_4.hide();
        boton_5.hide();
        boton_6.hide();
        boton_7.hide();
        boton_8.show();
        boton_9.hide();
        boton_10.hide();
      }
      else if(slider.value()==9){
        image(nivel9,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.hide();
        boton_4.hide();
        boton_5.hide();
        boton_6.hide();
        boton_7.hide();
        boton_8.hide();
        boton_9.show();
        boton_10.hide();
      }
      else if(slider.value()==10){
        image(nivel10,125,50,450,400);
        boton_1.hide();
        boton_2.hide();
        boton_3.hide();
        boton_4.hide();
        boton_5.hide();
        boton_6.hide();
        boton_7.hide();
        boton_8.hide();
        boton_9.hide();
        boton_10.show();
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
      boton_2.hide();
      boton_3.hide();
      boton_4.hide();
      boton_5.hide();
      boton_6.hide();
      boton_7.hide();
      boton_8.hide();
      boton_9.hide();
      boton_10.hide();
      button.hide();
    }
    
  }
  //si el boton informacion es seleccionado se ejecuta esta parte de aca.
  if (informacion==true){
    background('#1e243b');
    aboutus = createImg("assets/fondo.png",'sobre nosotros');
    aboutus.position(0,0);
    aboutus.size(windowWidth,windowHeight);
    //crea un boton que se devuelve al menu (recargando la pagina)
    button = createButton('Regresar al menu principal');
    button.position(0, windowHeight/1.1);
    button.center("horizontal");
    button.mousePressed(recargarpagina);
  }
}
