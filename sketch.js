//-----seccion encarga de iniciarlizar variables-----
let h , player , caja , cajas = [] , nivel = 1

function preload() {
  ImagenPlayer_right = loadImage("assets/Player_right.png");
  ImagenPlayer_left = loadImage("assets/Player_left.png");
  ImagenBox = loadImage("assets/Box.png");
  ImagenWall = loadImage("assets/Wall.png");
  ImagenStorage = loadImage("assets/Storage.png");
}

function setup() {
  h = windowHeight/10
  createCanvas(windowHeight, windowHeight)
  board = new Tablero
  almacen = new Almacen
  Construir(mapas())
}

function mapas(){
  cajas = []
  if(nivel==1){
    console.log('Primer nivel')
    let map1 = ['##########',
               '##########',
               '###0000###',
               '###&0!0###',
               '##00@00###',
               '##0&#!0###',
               '##00######',
               '##########',
               '##########',
               '##########']
    return map1}
  if(nivel==2){
    console.log('Segundo nivel')
    let map2 = ['##########',
               '##########',
               '###!0#####',
               '###!0#####',
               '###@&00###',
               '###0&00###',
               '###00#####',
               '##########',
               '##########',
               '##########']
    return map2}
  if(nivel==3){
    console.log('Tercer nivel')
    let map1 = ['##########',
               '##########',
               '###00#####',
               '###0@#####',
               '###!&#####',
               '###0000###',
               '###!&#0###',
               '####000###',
               '##########',
               '##########']
    return map1}
  if(nivel==4){
    let map1 = ['##########',
               '##########',
               '####00####',
               '####&!@0##',
               '##000#00##',
               '##00&!0###',
               '##00#00###',
               '#####00###',
               '##########',
               '##########']
    return map1}
  if(nivel==5){
    let map1 = ['##########',
               '##########',
               '##000#00##',
               '##00!000##',
               '###&##00##',
               '##0@!#00##',
               '##0&0000##',
               '######00##',
               '##########',
               '##########']
    return map1}

  if(nivel==6){
    let map1 = ['##########',
               '##########',
               '####00####',
               '####&!00##',
               '##0&00#0##',
               '##0!0@#0##',
               '###0###0##',
               '###00000##',
               '##########',
               '##########']
  return map1}
  if(nivel==7){
    console.log('Primer nivel')
    let map1 = ['##########',
               '##########',
               '##!000&0##',
               '##!&00#0##',
               '##!#0#00##',
               '####0#0###',
               '###0&00###',
               '###@0#####',
               '##########',
               '##########']
    return map1}
  if(nivel==8){
    h = windowHeight/11
    console.log('Primer nivel')
    let map1 = ['###########',
               '###########',
               '##000######',
               '##0&0#000##',
               '##000#&#0##',
               '####&0000##',
               '###000#####',
               '###0@!!!###',
               '###########',
               '###########',
               '###########']
    return map1}
  if(nivel==9){
    console.log('Primer nivel')
    let map1 =['##########',
               '##########',
               '###00000##',
               '###0!&!0##',
               '###0&@&0##',
               '##00!&!0##',
               '##000000##',
               '##########',
               '##########',
               '##########']
  return map1}
  if(nivel==10){
    h = windowHeight/11
    console.log('Primer nivel')
    let map1 =['###########',
               '#00########',
               '#00!0##0!##',
               '#0&#0000!##',
               '##0##0#0!##',
               '##0000#00##',
               '#####0#00##',
               '###0@&0####',
               '###0&&0####',
               '###0000####',
               '###########']
    return map1}
}

function Construir(map){
  let c = 0
  for(let i = 0 ; i<map.length ; i++){
    for(let j = 0 ; j<map[i].length ; j++){
      if(map[i][j]=='#'){
        append(board.wallX,j)
        append(board.wallY,i)
      }

      if(map[i][j]=='!'){
        append(almacen.storageX,j)
        append(almacen.storageY,i)
      }

      if(map[i][j]=='@'){
        player = new Jugador(j,i)
      }

      if(map[i][j]=='&'){
        eval('caja' + c + '= ' + 'new ' + 'Caja(j,i)')
        append(cajas,eval('caja' + c))
        c += 1
      }
    }
  }
}

function ncajas(){
  for(let i = 0 ; i<cajas.length ; i++){
    eval('cajas' + '['+i+']' + '.' + 'draw()')
  }
  if(almacen.victory == true){
    console.log('ya ganaste wapo')
    nivel = nivel + 1
    setup()
  }
}

function draw() {
  background(220);
  almacen.victoria()
  player.draw()
  player.limite()
  ncajas()
  board.draw()
  almacen.draw()
  board.limitetablero('player')
  //image(ImagenStorage, h*2, h, h, h)
}

class Tablero{
  constructor(){
    this.wallX = []
    this.wallY = []
  }

  draw(){
    for(let i = 0 ; i<this.wallX.length ; i++){
      image(ImagenWall, h*this.wallX[i], h*this.wallY[i], h, h)
    }
  }

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

  movDerecha(){
    player.limite('d')
    if(player.moveDer == false){
      //Do nothing
    }
    else{
      this.moveX = this.moveX + h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'd'
    this.draw()
  }

  movIzqrda(){
    player.limite('i')
    if(this.moveIzq == false){
      //Do nothing
    }
    else{this.moveX = this.moveX - h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'l'
    this.draw()
  }

  movAbajo(){
    player.limite('ab')
    if(this.moveAbajo == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY + h
      this.coordY = round(this.moveY/h)}
      this.draw()
  }

  movArriba(){
    player.limite('ar')
    if(this.moveArriba == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY - h
      this.coordY = round(this.moveY/h)}
      this.draw()
  }

}

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

  draw(){
    image(ImagenBox, this.moveX, this.moveY, h, h)  
  }

  movDerecha(){
    if(this.moveDer == false){
      //Do nothing
    }
    else{
      this.moveX = this.moveX + h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'd'
    this.draw()
  }

  movIzqrda(){
    if(this.moveIzq == false){
      //Do nothing
    }
    else{this.moveX = this.moveX - h
      this.coordX = round(this.moveX/h)}
    this.direccion = 'l'
    this.draw()
  }

  movAbajo(){
    if(this.moveAbajo == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY + h
      this.coordY = round(this.moveY/h)}
      this.draw()
  }

  movArriba(){
    if(this.moveArriba == false){
      //Do nothing
    }
    else{this.moveY =  this.moveY - h
      this.coordY = round(this.moveY/h)}
      this.draw()
  }
}

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

function pruebas(){
  let n = 3
  for(let i = 0 ; i<5 ; i++){
    if(i!=n){
      console.log(i)
    }
    
  }
}

function keyPressed(){
  if (keyCode == UP_ARROW){
    console.log('arriba');
    player.movArriba()
  }
  if (keyCode == DOWN_ARROW){
    console.log('abajo');
    player.movAbajo()
  }
  if (keyCode == LEFT_ARROW){
    console.log('izquierda');
    player.movIzqrda()
  }
  if (keyCode == RIGHT_ARROW){
    console.log('derecha');
    player.movDerecha();
  }
  if (keyCode == 32){
    setup()
  }
}
