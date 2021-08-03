let catImage, catImageL, catImageR, waterImage, backgroundImage, startOfGame, gameOver, platformX, platforms, obstacles, lives, previousY;
let offsetAmount;
let currentOffset;
let victoryPlatform;

function preload()
{
  catImageR = loadImage("assets/catR.png")
  catImageL = loadImage("assets/catL.png")
  //cloudImage = loadImage("");
  waterImage = loadImage("assets/water.png")
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  startOfGame = true;
  gameOver = false;
  lives=10;
  player = new Cat();
  platformX = player.position.x;
  previousY = 2*height/3;
  platforms = [];
  obstacles = [];
  offsetAmount = -2;
  currentOffset = 0;
  //platform1 = new Platform();
  //random platforms
  for(let i=0; i<20; i++){
    platforms.push(new Platform(previousY));
    previousY=platforms[i].y;
    if(int(random(1, 10))%3==0 && i!=0){
      obstacles.push(new Obstacle(platforms[i].x, platforms[i].y));
    }
  }
  victoryPlatform = new FinalPlatform()
  //drawBackground();
}

// function reset()
// {
//   createCanvas(800, 600);
//   colorMode(HSB, 360, 100, 100);
//   startOfGame = true;
// }

function draw() {
  if (startOfGame) {
    introScreen();
  } else if (gameOver) {
    gameOverScreen();
  } else {
    background(255);
    displayLives();
    //platform1.showSelf();
    player.move();
    player.jumpGravity();
    player.showSelf();
    player.checkPlatformCollision();
    player.checkObstacleCollision();
    for (let platform of platforms) {
      platform.showSelf();
    }
    for(let obstacle of obstacles){
      obstacle.showSelf();
    }
    victoryPlatform.showSelf();
    drawBackground();
}

}

function keyPressed()
{
  //for game: space to jump
  /*
  if (keyCode == 32 && inGame) {
   //cat jump function;
  }
  */


  if (keyCode == 83 && startOfGame) {
    startOfGame = false;
    //frameCount = 0;
  }

  if (keyCode == 82 && gameOver) {
    setup();
  }
}

function drawBackground(){ //helena
  /*
  image(cloudImage, width / 5, height / 6);
  image(cloudImage, width / 2, height / 2, 40, 25);
  image(cloudImage, width / 1.5, height / 2.8, 200, 125);
  */
  image(waterImage, 0, height-40, width, 40);
}

function introScreen(){ //helena
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(100);
  text("KITTY CATCH 2", width / 2, height / 3);
  textSize(30);
  text("Instructions", width / 2, height / 2 - 50);
  textSize(15);
  text("Try to get the cat to the end goal!", width / 2, height / 2 - 20);
  text("Use arrow keys to move!", width / 2, height / 2);
  //start game button
  //button = createButton('start game');
  //button.position(width/2, 2*height/3);
  //button.mousePressed(startGame());
  textAlign(LEFT);
}

function startGame(){ //helena
  startOfGame = false;
  //gameOver = false;
}

function gameOverScreen(){ //helena
  background(0);
  textFont("Helvetica");
  fill(255);
  textAlign(CENTER);
  textSize(30);
  //if game was completed -> victory
  //text(`VICTORY!!`, width / 2, height / 2 - 30);
  //else if game not completed -> game over
  text(`GAME OVER!!`, width / 2, height / 2 - 30);
  textSize(15);
  //text(`Score: ${score}`, width / 2, height / 2 + 10);
  //text(`High Score: ${highscore}`, width / 2, height / 2 + 10);
  //restart game button
  //button = createButton('restart game');
  //button.position(width/2, 2*height/3);
  //button.mousePressed(setup());
}

function displayLives(){ //helena
  fill(0);
  text(`HP: ${lives}`, 10, 20);
  fill(120, 80, 80);
  // if (lives >= 1) {
  //   ellipse(50, 16, 10, 10);
  // }
  // if (lives >= 2) {
  //   ellipse(65, 16, 10, 10);
  // }
  // if (lives >= 3) {
  //   ellipse(80, 16, 10, 10);
  // }
}

function displayScore(){ //helena
  fill(0);
  text(`Score: ${score}`, 10, 35);
}

function fixHitboxes(){ //emily
  for(let platform of platforms)
  {
    platform.translate();
  }

  for(let obstacle of obstacles)
  {
    obstacle.translate();
  }
  victoryPlatform.translate();
}

class Cat //emily
{
  constructor() {
    this.width = 66;
    this.height = 55;
    this.position = createVector(width/4, height - 400);
    this.velocity = createVector(0, 0);
    this.gravity = 2;
    this.isFalling = true;
    this.hasJump = true;
    catImage = catImageR;
  }

  showSelf()
  {
    image(catImage, this.position.x, this.position.y, this.width, this.height);
    if(this.position.x > width/12)
    {
      currentOffset = offsetAmount;
      fixHitboxes();
    }

    if(this.position.x < width / 3)
    {
      currentOffset = -offsetAmount;
      fixHitboxes();
    }
  }

  move() //temporary movement method
  {

    if(keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -5
      catImage = catImageL
    }
    if(keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 5
      catImage = catImageR
    }

    if(keyIsDown(DOWN_ARROW) && this.isFalling) {
      this.velocity.y -= 1
    }
    if(keyIsDown(UP_ARROW) && this.hasJump) {
      this.velocity.y = -20
      this.isFalling = true
      this.hasJump = false //maybe add jump cooldown for stretch goal
    }
  }

  checkPlatformCollision()
  {
    // if(collideRectRect(this.position.x, this.position.y, this.width, this.height, platform1.x, platform1.y, platform1.width, platform1.height))
    //   {
    //     console.log("collision")
    //     this.isFalling = false
    //     this.velocity = createVector(0,0);
    //     this.hasJump = true
    //   }

    this.isFalling = true
    for(let i = 0; i < 20; i++)
    {
      let platformCheck = platforms[i]
      if(i == 0){
        //console.log(platformCheck)
      }
      if(collideRectRect(this.position.x, this.position.y, this.width, this.height, platformCheck.x, platformCheck.y, platformCheck.width, platformCheck.height))
      {
        this.position.y = platformCheck.y - this.height
        // if(this.position.y + this.height < platformCheck.y)
        //   {
        //     this.position.y -= 1;
        //   }
        //console.log("collision")
        this.isFalling = false
        this.velocity.y = 0;
        this.velocity.x = 0;
        //this.velocity = createVector(0,0);
        this.hasJump = true
      }
      // else{
      //   this.isFalling = true
      // }
    }
  }

  checkObstacleCollision()
  {
    for(let obstacle of obstacles)
    {
      if(collideRectRect(this.position.x, this.position.y, this.width, this.height, obstacle.x1, obstacle.y3, 10, 10))
      {
        console.log("owwie");
        lives -= 1;
        //tint screen red
        let red = color(0, 100, 70)
        background(red)
        player.showSelf();
        //tint(red)
      }
      else{
        noTint()
      }
    }
  }

  jumpGravity()
  {
    this.position.add(this.velocity)
    if(this.isFalling)
    {
      this.position.add(0, this.gravity)
      this.velocity.add(0, this.gravity)
    }
    
    if(this.position.y > height - this.height - 10)
    {
      this.position.y = height - this.height - 10
      this.velocity = createVector(0,0)
      this.hasJump = true
      this.isFalling = false
      gameOver = true;
    }
    if(this.position.y < 10)
    {
      this.position.y =  10
    }
    
    if(this.position.x > width - this.width - 10)
    {
      this.position.x = width - this.width - 10
    } 

    if(this.position.x < 10)
    {
      this.position.x = 10
    }
    
  }
}

class Platform{ //helena
  constructor(previousY){
    //this.x = round(random(width - 10));
    //this.y = round(random(height - 10));
    this.x = platformX;
    this.y = int(random(previousY-40, previousY+40));
    this.width = int(random(40, 130)); //min width=40, max width=~130?
    //this.width = random(40, 130);
    this.height = 10;
    platformX += int(random(65, 135))+this.width;
  }
  showSelf(){
    //gray platforms for now -- may replace with image in future.
    fill(80);
    rect(this.x, this.y, this.width, this.height);
  }
  translate(){ //emily
    this.x += currentOffset;
    this.showSelf();
  }
}

class FinalPlatform{
  constructor()
  {
    this.x = platforms[platforms.length - 1].x + 100;
    this.y = platforms[platforms.length - 1].y + 20;
    this.width = 600;
    this.height = 10;
  }
  showSelf()
  {
    fill(color(60, 100, 80))
    rect(this.x, this.y, this.width, this.height);
  }
  translate()
  {
    this.x += currentOffset;
    this.showSelf();
  }
}

class Obstacle{ //helena
  constructor(x1, y1){
    //triangles/spikes that take away a life unless jump over
    //triangle(x1, y1, x2, y2, x3, y3)
    this.x1=x1;
    this.y1=y1;
    this.x2=this.x1+10;
    this.y2=this.y1;
    this.x3=(this.x1+this.x2)/2;
    this.y3=this.y1-10;
  }
  showSelf(){
    //red spikes!
    fill(0, 80, 80);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  translate(){ //emily
    this.x1 += currentOffset;
    this.x2 += currentOffset;
    this.x3 += currentOffset;
    this.showSelf();
  }
}

class Ball{
  constructor(){
    //might be interesting to have balls/yarn that fall from the sky and bounce
    //and if you hit them, they like slow you down or smtg?
  }
}