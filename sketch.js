let catImage, backgroundImage, startOfGame, gameOver, platformX, platforms;
function preload()
{
  catImage = loadImage("assets/tempcat.png")
  //cloudImage = loadImage("");
}

function setup() {
  createCanvas(800, 600);
  startOfGame = true;
  gameOver = false;
  platformX = 50;
  player = new Cat();
  platforms = [];
  platform1 = new Platform();
  //random platforms
  for(let i=0; i<20; i++){
    platforms.push(new Platform());
  }
  //drawBackground();
}

function draw() {
  /*
  if (startOfGame) {
    introScreen();
  } else if (gameOver) {
    gameOverScreen();
  } else {
  */
  background(220);
  platform1.showSelf();
  for (let platform of platforms) {
    platform.showSelf();
  }
  player.move();
  player.jumpGravity();
  player.showSelf();
  player.checkPlatformCollision();

}

function keyPressed()
{
  //for game: space to jump
  /*
  if (keyCode == 32 && inGame) {
   //cat jump function;
  }
  */
}

function drawBackground(){ //helena
  image(cloudImage, width / 5, height / 6);
  image(cloudImage, width / 2, height / 2, 40, 25);
  image(cloudImage, width / 1.5, height / 2.8, 200, 125);
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
  text("Use space bar to jump!", width / 2, height / 2);
  //start game button
  button = createButton('start game');
  button.position(0, 0);
  button.mousePressed(startGame());
}

function startGame(){
  startOfGame = false;
}

function gameOverScreen(){
  background(0);
  textFont("Helvetica");
  fill(255);
  textAlign(CENTER);
  textSize(30);
  //if game was completed -> victory
  text(`VICTORY!!`, width / 2, height / 2 - 30);
  //else if game not completed -> game over
  text(`GAME OVER!!`, width / 2, height / 2 - 30);
  textSize(15);
  text(`Score: ${score}`, width / 2, height / 2 + 10);
  text(`High Score: ${highscore}`, width / 2, height / 2 + 10);
  //restart game button
}

function displayLives(){ //helena
  fill(0);
  text(`Lives: ${lives}`, 10, 20);
  fill(120, 80, 80);
  if (lives >= 1) {
    ellipse(50, 16, 10, 10);
  }
  if (lives >= 2) {
    ellipse(65, 16, 10, 10);
  }
  if (lives >= 3) {
    ellipse(80, 16, 10, 10);
  }
}

function displayScore(){ //helena
  fill(0);
  text(`Score: ${score}`, 10, 35);
}

class Cat //emily
{
  constructor() {
    this.width = 66;
    this.height = 55;
    this.position = createVector(60, height - 400);
    this.velocity = createVector(0, 0);
    this.gravity = 2;
    this.isFalling = true;
    this.hasJump = true;
  }

  showSelf()
  {
    image(catImage, this.position.x, this.position.y, this.width, this.height);
  }

  move() //temporary movement method
  {

    if(keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -5
    }
    if(keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 5
    }

    if(keyIsDown(DOWN_ARROW) && this.isFalling) {
      this.velocity.y -= 1
    }
    if(keyIsDown(UP_ARROW) && this.hasJump) {
      this.velocity.y = -20
      this.isFalling = true
      this.hasJump = false
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

    for(let i = 0; i < 20; i++)
    {
      let platformCheck = platforms[i]
      if(i == 0){
        console.log(platformCheck)
      }
      if(collideRectRect(this.position.x, this.position.y, this.width, this.height, platformCheck.x, platformCheck.y, platformCheck.width, platformCheck.height))
      {
        console.log("collision")
        this.isFalling = false
        this.velocity = createVector(0,0);
        this.hasJump = true
      }
  
      else{
        //console.log("no collision")
        this.isFalling = true
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
  constructor(){
    //this.x = round(random(width - 10));
    //this.y = round(random(height - 10));
    this.x = platformX;
    this.y = int(random(height-15, height/2));
    this.width = int(random(40, 130)); //min width=40, max width=~130?
    //this.width = random(40, 130);
    this.height = 10;
    platformX += int(random(40, 105))+this.width;
  }
  showSelf(){
    //
    fill(80);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Obstacle{ //helena
  constructor(){
    //triangles/spikes that take away a life unless jump over
    //triangle(x1, y1, x2, y2, x3, y3)
  }
  showSelf(){

  }
}

class Ball{
  constructor(){
    //might be interesting to have balls/yarn that fall from the sky and bounce
    //and if you hit them, they like slow you down or smtg?
  }
}