var mario, mario_running, mario_collided;
var bg, bgImage;
var brickGroup, brickImage;
var coinsGroup, coinImage;
var coinScore=0;
var gameState ="PLAY"

function preload(){
  //Mario Image (Animation of running Mario)
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");
  //Background Image 
  brickImage = loadImage("images/brick.png");
  //Coin Sound 
  coinSound = loadSound("sounds/coinSound.mp3");
  //Coin Image (Animation of Coin)
  coinImage = loadAnimation("images/con1.png",
  "images/con2.png","images/con3.png",
  "images/con4.png","images/con5.png","images/con6.png");
  //Mushroom Obstacle Image (Animation of Mushroom Obstacle)
  mushObstacleImage = loadAnimation("images/mush1.png",
  "images/mush2.png","images/mush3.png","images/mush4.png",
  "images/mush5.png","images/mush6.png",);
  //Turtle Obstacle Image (Animation of Turtle Obstacle) 
  turtleObstacleImage = loadAnimation("images/tur1.png",
  "images/tur2.png","images/tur3.png","images/tur4.png",
  "images/tur5.png",);
  //Mario Death Sound 
  dieSound = loadSound("sounds/dieSound.mp3");
  
}

function setup() {
  //Create canvas
  createCanvas(1000, 600);
  //Background Image
  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
  bg.velocityX = -6;
  //Mario Image
  mario = createSprite(200,505,20,50);
  mario.addAnimation("running", mario_running);
  mario.scale =0.3;
  //Ground Image
  ground = createSprite(200,585,400,10);
  //To make ground invisible
  ground.visible = false;
  // To make these groups Appear Infinite
  bricksGroup = new Group();
  coinsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
   //Background Canvas Area
  if (bg.x < 100){
    bg.x=bg.width/4;
  }x
  //To make sure mario remains in the canvas 
  if(mario.x<200){
    mario.x=200;
  }
  if(mario.y<50){
    mario.y=50;
  }
    if(keyDown("space") ) {
    mario.velocityY = -16;
  }
  mario.velocityY = mario.velocityY + 0.5;
  generateBricks();
  for(var i = 0 ; i< (bricksGroup).length ;i++){
    var temp = (bricksGroup).get(i) ;
    
    if (temp.isTouching(mario)) {
       mario.collide(temp);
      }
        
    }
    // Generating Obstacles and Coins Command 

    generateObstacles();
    generateCoins();
    for(var i = 0 ; i< (coinsGroup).length ;i++){
      var temp = (coinsGroup).get(i) ;
      // Coin displaying on screen
      if (temp.isTouching(mario)) {
        coinSound.play();
        coinScore++;
        temp.destroy();
        temp=null;
        }
          
      }
  
  mario.collide(ground);

  drawSprites();
  textSize(20);
  fill("brown")
  text("Coins Collected: "+ coinScore, 500,50);
  
}

// Generating Bricks Command

function generateBricks() {
  if (frameCount % 70 === 0) {
    var brick = createSprite(1200,120,40,10);
    brick.y = random(50,450);
    brick.addImage(brickImage);
    brick.scale = 0.5;
    brick.velocityX = -5;
    
    brick.lifetime =250;
    bricksGroup.add(brick);
  }
}
// Generating Coins Command

function generateCoins() {
  if (frameCount % 50 === 0) {
    var coin = createSprite(1200,120,40,10);
    coin.addAnimation("coin", coinImage);
    coin.y = random(80,350);
    coin.scale = 0.1;
    coin.velocityX = -3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

// Generating Obstacles Command

function generateObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1200,545,10,40);
    obstacle.velocityX = -4; 
    obstacle.scale=0.2;
    var rand= Math.round(random(1,2));
    switch(rand){
    case 1:
        obstacle.addAnimation("mush",mushObstacleImage);
        break;
    case 2:
      obstacle.addAnimation("turtle", turtleObstacleImage);
        break;
    default:
        break;    
    }
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}