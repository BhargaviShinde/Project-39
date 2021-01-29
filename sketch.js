var gamestate = 1;
var Play = 1;
var End = 0;

var car, carimg, coin, coinimg;

var obstcar1, obstcarimg1, obstcar2, obstcarimg2, trackimg, track, coneobst, coneobstimg;

var score = 0;

var obstcar1Gr, obstcar2Gr, gameoverimg;

var life = 5;

function preload(){
  
   carimg = loadImage("car4.png");
   trackimg = loadImage("Road.jpg");
   coinimg = loadImage("Reg coin.jpg");
   Scoinimg = loadImage("Scoin.png");
   coneobstimg = loadImage("cone obst.png");
   obstcarimg1 = loadImage("car obst2.png");
   obstcarimg2 = loadImage("obst car2.png");
   gameoverimg = loadImage("gameover.png");
   
}

function setup(){
  createCanvas(800,800);
  
  track = createSprite(300,-2700);
  track.addImage(trackimg);
  track.scale = 3;
  //track.velocityY = 2.5;
  
  car = createSprite(400,500);
  car.addImage(carimg);
  car.scale = 0.2;
  
  obstcar1Gr = createGroup();
  obstcar2Gr = createGroup();
  coinGr = createGroup();
  ScoinGr = createGroup();
  coneGr = createGroup();
}

function draw(){
  camera.y = car.y;

  carobst2();
  carobst1();
  coneobst();
  
  if(gamestate === Play){
     
     if(keyDown("left_arrow") && car.x > 150){
        car.x = car.x - 5;
      }
  
      if(keyDown("right_arrow")&& car.x < 450){
         car.x = car.x + 5;
      }
    
     if(keyDown("up_arrow") ){
       car.y = car.y - 5;
     }
     
     if(keyDown("down_arrow")){
       car.y = car.y + 5;
     }
     
     if(track.y > 0){
       track.y = -2700;
     }
    
      if(obstcar1Gr.isTouching(car)){
        life = life - 1;
        obstcar1Gr.destroyEach();
      }
      
      if(obstcar2Gr.isTouching(car)){
        life = life - 1;
        obstcar2Gr.destroyEach();
      }
    
     if(coneGr.isTouching(car)){
       coneGr.destroyEach();
       score = 0;
     }
    
    if(coinGr.isTouching(car)){
      score = score + 1;
      coinGr.destroyEach();
    }
    
    if(ScoinGr.isTouching(car)){
      score = score + 2;
      ScoinGr.destroyEach();
    }

    if(life === 0){
        gamestate = "end";
    }
    
  }

  if(gamestate === "end"){
    strokeWeight(7);
    textSize(50);
    fill("black");
    text("Game Over!",100,300);
      track.destroy();
      obstcar1Gr.destroyEach();
      obstcar2Gr.destroyEach();
      car.destroy();
      ScoinGr.destroyEach();
      coinGr.destroyEach();
      background(gameoverimg);
      strokeWeight(7);
      textSize(50);
      fill("black");
      text("Game Over!",100,300);
  }
  
  drawSprites();
  coins();
  
  
  fill(127,255,212);
  textSize(25);
  text("Score: " + score,370,car.y - 200);
  fill("red");
  text("Lives: " + life,90,car.y - 200)
}

function carobst1(){
  
  if(frameCount % 250 === 0){
     obstcar1 = createSprite(100,car.y - 300);
     obstcar1.addImage(obstcarimg1);
     obstcar1.scale = 0.13;
  
     obstcar1.x = Math.round(random(150,450));
    
     obstcar1.velocityY = 5;
     
     obstcar1.lifetime = 210;
     
    obstcar1Gr.add(obstcar1);
  }
  
  
}   


function carobst2(){
  
  if(frameCount % 350 === 0){
     obstcar2= createSprite(100,car.y - 300);
     obstcar2.addImage(obstcarimg2);
     obstcar2.scale = 0.07; 
  
     obstcar2.x = Math.round(random(150,450));
    
     obstcar2.velocityY = 5;
     
     obstcar2.lifetime = 210;
    
    obstcar2Gr.add(obstcar2)
  }
}  



function coneobst(){
  
  if(frameCount % 350 === 0){
     Cone = createSprite(100,300);
     Cone.addImage(coneobstimg);
     Cone.scale = 0.15;
  
     Cone.x = Math.round(random(150,450));
     Cone.y = Math.round(random(280,550));
     
     Cone.lifetime = 120;
    
    coneGr.add(Cone);
  }
} 


function coins(){
  
  if(frameCount % 200 === 0){
      coin = createSprite(300,car.y - 300);
      coin.addImage(coinimg);
      coin.scale = 0.08;
      coin.velocityY = 3;
      coin.x = Math.round(random(160,450));
    
      coinGr.add(coin);
     }
  
  if(frameCount % 412 === 0){
      Scoin = createSprite(300,car.y - 300);
      Scoin.addImage(Scoinimg);
      Scoin.scale = 0.12;
      Scoin.velocityY = 3;
      Scoin.x = Math.round(random(160,450));
    
      ScoinGr.add(Scoin);
     }
}