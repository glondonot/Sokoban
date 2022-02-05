//-----seccion encarga de iniciarlizar variables de juego-----
let h , player , caja , cajas = [] , nivel = 1, menu=true, instrucciones=false, niveles=false;

// HOLA ESTOY PROBANDO ALGO EN GIT HUB POR FAVOR IGNORAR POR COMPLETO ESTE COMMIT

//-----seccion encarga de cargar los sprites del juego-----
function preload() {
  ImagenPlayer_right = loadImage("assets/Player_right.png");
  ImagenPlayer_left = loadImage("assets/Player_left.png");
  ImagenBox = loadImage("assets/Box.png");
  ImagenWall = loadImage("assets/Wall.png");
  ImagenStorage = loadImage("assets/Storage.png");
  MenuWallpaper=loadImage("assets/hero.jpg");
}

//-----se establece el tamaño del canvas y se crea objeto tablero y almacen-----
function setup() {
  h = windowHeight/10
  createCanvas(windowHeight, windowHeight)
  board = new Tablero
  almacen = new Almacen
  //llama la funcion mapa y segun el mapa este es construido
  Construir(mapas())
  // creación botones menu 
  boton_jugar = createButton('Jugar'); 
  boton_jugar.position(450,370);
  boton_jugar.style('background-color', '#329F5B');
  boton_jugar.mousePressed(iniciar_juego_en_0);


  boton_instrucciones=createButton("Instrucciones");
  boton_instrucciones.position(450,430);
  boton_instrucciones.mousePressed(iniciar_instrucciones);

  boton_niveles=createButton("niveles");
  boton_niveles.position(450,480);
  boton_niveles.mousePressed(menu_niveles);


  // Estos son los botones que me generan problemas

  // seleccion_nivel=createInput("");
  // seleccion_nivel.position(0,0);
  // seleccion_nivel.size(100);
  // nivel_escogido=seleccion_nivel.input(usuario_selecciona_nivel,Number);
  // // nivel_escogido=parseInt(nivel_escogido,10);


  // boton_nivel_escogido=createButton("Seleccionar");
  // boton_nivel_escogido.position(400,550);
  // boton_nivel_escogido.mousePressed(iniciar_nivel_escogido);
}

// funciones de los botones:
function iniciar_juego_en_0(){
  menu=!menu;
  nivel=1;
  boton_jugar.hide();
  boton_instrucciones.hide();
  boton_niveles.hide();
  console.log(menu)
  setup();
}

function iniciar_instrucciones(){
  instrucciones=!instrucciones;
  menu=false;
  console.log(instrucciones);
}

function menu_niveles(){
  menu=false;
  niveles=!niveles;
  console.log(niveles);
}

// Estas son las funciones de los botones que generan problemas

// function usuario_selecciona_nivel(){
//   nivel_escogido=this.value();
//   return nivel_escogido;
// }

// function iniciar_nivel_escogido(nivel_seleccionado){
//   nivel=nivel_seleccionado;
//   boton_jugar.hide();
//   boton_instrucciones.hide();
//   boton_niveles.hide();
//   boton_nivel_escogido.hide();
//   setup();

// }


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
  if(menu==true && instrucciones==false){
    createCanvas(750,650);
    background("white");
    image(MenuWallpaper,0,0,750,650);
    boton_jugar.show();
    boton_instrucciones.show();
    boton_niveles.show();
    // seleccion_nivel.hide()
    // boton_nivel_escogido.hide();
  }
  else if(instrucciones==true && menu==false){
    createCanvas(750,650);
    background("white");
    text('Aquí van las instrucciones',0,0);
    boton_jugar.hide();
    boton_instrucciones.hide();
    boton_niveles.hide();
  }

  else if(menu==false && instrucciones==false && niveles==true ){
    createCanvas(750,650);
    background("gray");
    boton_jugar.hide();
    boton_instrucciones.hide();
    boton_niveles.hide();
    seleccion_nivel.show()
    boton_nivel_escogido.show();
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
    boton_jugar.hide();
    boton_instrucciones.hide();
    boton_niveles.hide();
    // seleccion_nivel.hide()
    // boton_nivel_escogido.hide();
  }
}

// function draw() {
//   background(220);
//   almacen.victoria()
//   player.draw()
//   player.limite()
//   ncajas()
//   board.draw()
//   almacen.draw()
//   board.limitetablero('player')
// }

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
  if (keyCode== 27){
    menu=true;
    instrucciones=false;
    niveles=false;
  }
}
