var PLAY = 1;
var END = 0;
var gameState = PLAY;
 
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var cloudImage, cloud;
var FoodGroup, obstacleGroup, cloudGroup;
var score;
var groundImage, ground;
var invisibleGround;
var score;
var gameOverImg,gameOver,restart,restartImg;

function preload(){
  
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("ground2.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}



function setup() {
createCanvas(600, 200);

monkey = createSprite(50,160,20,50)
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.06;

ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width/2
 
  
gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);
  
restart = createSprite(300,140);
restart.addImage(restartImg);
  
gameOver.scale = 0.5;
restart.scale = 0.5;  

  
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
//monkey.debug = true
  
score = 0;
  
  
bananaGroup = createGroup();
obstacleGroup = createGroup();
}


function draw() {
background(180);

text("Score: "+ score, 500,20);


if(gameState === PLAY){
ground.velocityX = -4;

gameOver.visible = false;
restart.visible = false;


if(keyDown("space")){
monkey.velocityY = -12;
}
//gravity fix
monkey.velocityY = monkey.velocityY + 0.8
 spawnBanana(); 
//scoring system
if(bananaGroup.isTouching(monkey)){
score = score+1;
}
spawnObstacles();
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
}
  else if(gameState ===END){
  
  gameOver.visible = true;
  restart.visible = true;
    
    
  monkey.velcoityY = 0;
  ground.velocityX = 0;
  
  bananaGroup.depth = gameOver.depth
  gameOver.depth = gameOver.depth+1
   
 obstacleGroup.setLifetimeEach(-1); 
 bananaGroup.setLifetimeEach(-1);
     
 obstacleGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0);

 if(mousePressedOver(restart)) {
      reset();
    } 
    
  }
  monkey.collide(invisibleGround);
  //reseting the ground
if (ground.x < 0){
ground.x = ground.width/2;
}
//depth fix
ground.depth = monkey.depth; 
monkey.depth = monkey.depth+1; 
  
  
//drawing sprites
drawSprites();  
}


function reset(){
 gameState = PLAY; 
 restart.visible = false;
 gameOver.visible = false;
 obstacleGroup.destroyEach();
 bananaGroup.destroyEach();
 ground.velocityX = -2;
 score = 0;
}



function spawnBanana(){  
if(frameCount%60 === 0){
 var banana = createSprite(600,120,10,40);
 banana.y = Math.round(random(80,120));
 banana.addImage(bananaImage);
 banana.velocityX = -2;
 banana.scale = 0.05;
 banana.lifetime = 490;
 bananaGroup.add(banana);
}
}

function spawnObstacles(){
//codes for obstacle
if(frameCount%120 === 0){
var obstacle = createSprite(600,165,10,40);
obstacle.collide(invisibleGround);
obstacle.addImage(obstacleImage);
obstacle.velocityX = -3;
obstacle.scale = 0.12;
obstacleGroup.add(obstacle);
}
  
}


