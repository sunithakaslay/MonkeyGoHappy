var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground, invisibleGround, groundImage;

var bananaGroup, bananaImage;
var obstaclesGroup;
var gameOver, restart, gameOverImage, restartImage;
var survivalTime;


function preload(){
    //create monkey animation
    monkey_running =           loadAnimation("monkey_0.png","monkey_1.png",
    "monkey_2.png", "monkey_3.png", "monkey_4.png",
    "monkey_5.png", "monkey_6.png", "monkey_7.png",
      "monkey_8.png");
  
    groundImage = loadImage("ground2.png");

    bananaImage = loadImage("banana.png");

    obstacleImage = loadImage("obstacle.png");

    gameOverImage = loadImage("gameOver.png");
    restartImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 500);
  
  //create monkey sprite and add animation
  monkey = createSprite(50,380,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //create ground sprite and add image
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  ground.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
  
  //create invisible ground
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  //create gameOver and restart Image sprites;
  gameOver = createSprite(300,100,100,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,150,100,100);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  //create Obstacle and Banana Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  //set collider radius for the monkey sprite
  monkey.setCollider("circle",0,0,40);
  monkey.debug = false;
  
  // create score variable
  survivalTime = 0;
}

function draw() {
  //clears the background
  background(180);
  
  //displaying score
  text("Survival Time: "+ survivalTime, 300,100);
  
  //Check the status of the game
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    //scoring
   // console.log(frameRate());
    //console.log(frameCount);
    survivalTime = survivalTime + Math.round(frameCount/30);
   // console.log(survivalTime);
    
    //reset the ground to the center
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y > 361) {
        monkey.velocityY = -15;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //create the bananas
    createBananas();
  
    //create obstacles on the ground
    createObstacles();
    
    
        
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
       gameOver.visible = true;
       restart.visible = true;
      ground.velocityX = 0;
      monkey.velocityY = 0;
      //monkey.changeAnimation("collided",trex_collided);
     obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     if(mousePressedOver(restart)){
          reset();
          
        }
   }
  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);
   
  drawSprites();
}

function createObstacles(){
   if (frameCount % 300 === 0){
       var obstacle = createSprite(600,365,10,40);
       obstacle.velocityX = -6;
       obstacle.addImage(obstacleImage);

      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.2;
      obstacle.lifetime = 600;

     //add each obstacle to the group
      obstaclesGroup.add(obstacle);
   }
}

function createBananas() {
  //create the banana
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(250,300));
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifetime = 200; 
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
   
    //add each banana to the group
    bananaGroup.add(banana);
    
    }
}

function reset(){
    gameState = PLAY;
    survivalTime = 0;
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();
    gameOver.visible = false;
    restart.visible = false;
}


