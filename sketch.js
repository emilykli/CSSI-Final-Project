let catImage, catImageL, catImageR, waterImage, backgroundImage, platformImage, victoryPlatformImage, fishImage, smallFishImage, ballImage;
let startOfGame, gameOver, wonGame, platformX1, platformX2, platforms1, platforms2, obstacles, lives, previousY1, previousY2;
let healthBoosts, collectibleFish, points, balls;
let offsetAmount;
let currentOffset;
let victoryPlatform;
let highScore = 0;

function preload()
{
  catImageR = loadImage("assets/catR.png");
  catImageL = loadImage("assets/catL.png");
  //cloudImage = loadImage("");
  waterImage = loadImage("assets/water.png");
  victoryPlatformImage = loadImage("assets/blossom_plank.png");
  platformImage = loadImage("assets/vine_plank.png");
  fishImage = loadImage("assets/fish.png");
  ballImage = loadImage("assets/yarn.png");
  smallFishImage = loadImage("assets/small_fish.png");
  //song = loadSound('assets/');
  //use song.play and song.stop
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  startOfGame = true;
  gameOver = false;
  wonGame = false;
  lives=50;
  points = 0;
  player = new Cat();
  platformX1 = player.position.x;
  platformX2 = player.position.x-50;
  previousY1 = 2*height/3;
  previousY2 = height/3;
  platforms1 = [];
  platforms2 = [];
  obstacles = [];
  healthBoosts = [];
  collectibleFish = [];
  offsetAmount = -2;
  currentOffset = 0;
  //platform1 = new Platform();
  //random platforms
  balls = [];
  numBalls = 5;
  for(let i = 0; i < numBalls; i++) {
    balls.push(new Ball());
  }
  for(let i=0; i<15; i++){
    platforms1.push(new Platform1(previousY1));
    previousY1=platforms1[i].y;
    if(int(random(1, 10))%3==0 && i!=0){
      obstacles.push(new Obstacle(platforms1[i].x, platforms1[i].y));
    }
    if(int(random(1, 10)) % 6 == 0 && i!= 0)
    {
      healthBoosts.push(new HealthBoost(platforms1[i].x + platforms1[i].width/2, platforms1[i].y - 15));
    }
    else if (i!= 0){
      collectibleFish.push(new PointFish(platforms1[i].x + platforms1[i].width/4 - 8, platforms1[i].y - 9));
      collectibleFish.push(new PointFish(platforms1[i].x + platforms1[i].width * 3/4 - 8, platforms1[i].y - 9));
    }
    platforms2.push(new Platform2(previousY2));
    previousY2=platforms2[i].y;
    if(int(random(1, 10))%3==0 && i!=0){
      obstacles.push(new Obstacle(platforms2[i].x, platforms2[i].y));
    }
    else if(int(random(1, 10)) % 6 == 0 && i!= 0)
    {
      healthBoosts.push(new HealthBoost(platforms2[i].x + platforms2[i].width/2, platforms2[i].y - 15));
    }
    else if (i!= 0){
      collectibleFish.push(new PointFish(platforms2[i].x + platforms2[i].width/4 - 8, platforms2[i].y - 9));
      collectibleFish.push(new PointFish(platforms2[i].x + platforms2[i].width * 3/4 - 8, platforms2[i].y - 9));
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
    //displayLives();
    for (let ball of balls) {
      ball.move();
      ball.display();
    }
    drawHPBar();
    drawScore();
    //platform1.showSelf();
    player.move();
    player.jumpGravity();
    player.showSelf();

    checkCollisions(player);
    
    

    // let showableObjects = [platforms1, platforms2, obstacles, healthBoosts];
    // for (let platform of platforms1) {
    //   platform.showSelf();
    // }
    // for(let platform of platforms2)
    // {
    //   platform.showSelf();
    // }
    // for(let obstacle of obstacles){
    //   obstacle.showSelf();
    // }
    // for(let healthBoost of healthBoosts)
    // {
    //   healthBoost.showSelf();
    // }
    showObjects();
    victoryPlatform.showSelf();
    drawBackground();
  }
}

function checkCollisions(catObject) //emily
{
  catObject.checkPlatformCollision();
  catObject.checkFinalPlatformCollision();
  catObject.checkObstacleCollision();
  catObject.checkHealthBoostCollision();
  catObject.checkPointFishCollision();
}

function showObjects() //emily
{
  let showableObjects = [platforms1, platforms2, obstacles, healthBoosts, collectibleFish];
  for(let itemName of showableObjects)
  {
    for(let item of itemName)
    {
      item.showSelf();
    }
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

function drawHPBar() //emily
{
  textAlign(LEFT);
  fill(0);
  text("HP: ", 10, 20);
  fill(25);
  rect(45, 5, 200, 20);
  fill(5, 80, 90); //red
  rect(45, 5, lives * 4, 20);
}

function drawScore() //emily
{
  textAlign(LEFT);
  fill(0);
  text(`Score: ${points}`, 10, 40);
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
  //button = createButton("start game");
  //button.position(width/2, 2*height/3);
  //button.mousePressed(startGame());

}

function startGame(){ //helena
  startOfGame = false;
  //gameOver = false;
}

function gameOverScreen(){ //helena, emily
  background(0);
  textFont("Helvetica");
  fill(255);
  textAlign(CENTER);
  textSize(30);
  //if game was completed -> victory
  if(wonGame)
    {
      text(`VICTORY!!`, width / 2, height / 2 - 30);
      textSize(15);
      text(`Score: ${points}   HP Bonus: ${lives}`, width/2, height/2);
      text(`Final Score: ${points + lives}`, width/2, height/2 + 30);
      let currentScore = points + lives
      if(currentScore > highScore)
      {
        highScore = currentScore;
      }
      text(`High Score: ${highScore}`, width/2, height/2 + 60);
    }
  //else if game not completed -> game over
  else
  {
    text(`GAME OVER!!`, width / 2, height / 2 - 30);
    textSize(15);
    text(`Score: ${points}`, width/2, height/2);
    if(points > highScore)
    {
      highScore = points
    }
    text(`High Score: ${highScore}`, width/2, height/2 + 30);
  }
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
  // for(let platform of platforms1)
  // {
  //   platform.translate();
  // }

  // for(let platform of platforms2)
  // {
  //   platform.translate();
  // }

  // for(let obstacle of obstacles)
  // {
  //   obstacle.translate();
  // }
  // victoryPlatform.translate();

  let movableItems = [platforms1, platforms2, obstacles, healthBoosts, collectibleFish]
  for(let itemName of movableItems)
  {
    for(let item of itemName)
    {
      item.translate();
    } 
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

  checkFinalPlatformCollision()
  {
    this.isFalling = true;
    if(collideRectRect(this.position.x, this.position.y, this.width, this.height, victoryPlatform.x, victoryPlatform.y, victoryPlatform.width, victoryPlatform.height))
    {
      this.position.y = victoryPlatform.y - this.height;
      this.isFalling = false;
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.hasJump = true;
      gameOver = true;
      wonGame = true;
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
    for(let i = 0; i < platforms1.length; i++)
    {
      let platformCheck = platforms1[i]
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

    for(let i = 0; i < platforms2.length; i++)
    {
      let platformCheck = platforms2[i]
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
        if(lives <= 0)
        {
          gameOver = true;
        }
        //tint screen red
        let red = color(0, 100, 70)
        background("#d84622")
        player.showSelf();
        //tint(red)
      }
      else{
        noTint()
      }
    }
  }

  checkHealthBoostCollision()
  {
    for(let healthBoost of healthBoosts)
    {
      if(collideRectRect(this.position.x, this.position.y, this.width, this.height, healthBoost.x, healthBoost.y, 30, 15))
      {
        if(lives < 50)
          lives += 3;
        else
          points += 5;
        let index = healthBoosts.indexOf(healthBoost);
        if(index > -1)
        {
          healthBoosts.splice(index, 1);
        }
      }
    }
  }

  checkPointFishCollision()
  {
    for(let pointFish of collectibleFish)
    {
      if(collideRectRect(this.position.x, this.position.y, this.width, this.height, pointFish.x, pointFish.y, 16, 9))
      {
        points += 1;
        let index = collectibleFish.indexOf(pointFish);
        if(index > -1)
        {
          collectibleFish.splice(index, 1);
        }
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

class Platform1{ //helena
  constructor(previousY){
    //this.x = round(random(width - 10));
    //this.y = round(random(height - 10));
    this.x = platformX1;
    this.y = int(random(previousY1-40, previousY1+40));
    this.width = int(random(40, 130)); //min width=40, max width=~130?
    //this.width = random(40, 130);
    this.height = 10;
    platformX1 += int(random(65, 135))+this.width;
  }
  showSelf(){
    //gray platforms for now -- may replace with image in future.
    fill(80);
    //rect(this.x, this.y, this.width, this.height);
    image(platformImage, this.x, this.y, this.width, this.height);
  }
  translate(){ //emily
    this.x += currentOffset;
    this.showSelf();
  }
}

class Platform2{ //helena
  constructor(previousY){
    //this.x = round(random(width - 10));
    //this.y = round(random(height - 10));
    this.x = platformX2;
    this.y = int(random(previousY2-40, previousY2+40));
    this.width = int(random(40, 130)); //min width=40, max width=~130?
    //this.width = random(40, 130);
    this.height = 10;
    platformX2 += int(random(65, 135))+this.width;
  }
  showSelf(){
    //gray platforms for now -- may replace with image in future.
    fill(80);
    //rect(this.x, this.y, this.width, this.height);
    image(platformImage, this.x, this.y, this.width, this.height);
  }
  translate(){ //emily
    this.x += currentOffset;
    this.showSelf();
  }
}

class FinalPlatform{
  constructor()
  {
    this.x = platforms1[platforms1.length - 1].x + 150;
    this.y = platforms1[platforms1.length - 1].y + 20;
    this.width = 250;
    this.height = 38;
  }
  showSelf()
  {
    fill(color(60, 100, 80))
    //rect(this.x, this.y, this.width, this.height);
    image(victoryPlatformImage, this.x, this.y, this.width, this.height);
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

class PointFish{//emily
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 9;
  }

  showSelf()
  {
    image(smallFishImage, this.x, this.y, this.width, this.height);
  }
  translate()
  {
    this.x += currentOffset;
    this.showSelf();
  }
}

class HealthBoost{ //emily
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 15;
  }
  showSelf()
  {
    image(fishImage, this.x, this.y, this.width, this.height);
  }
  translate()
  {
    this.x += currentOffset;
    this.showSelf();
  }
}

class Ball{ //helena
  constructor(){
    //might be interesting to have balls/yarn that fall from the sky and bounce
    //and if you hit them, they like slow you down or smtg?
    //this.x = int(random(width));
    //this.y = 0;
    //this.radius = int(random(20, 40));
    this.x = random(width);
    this.y = random(height);
    this.radius = random(30, 45);
    this.color = random(360);
    this.baseXVelocity = random(0.5, 3);
    this.baseYVelocity = random(0.5, 3);
    this.xVelocity = this.baseXVelocity;
    this.yVelocity = this.baseYVelocity;
  }
  
  move() {
    // move
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.radius > width) {
      this.xVelocity = -1 * this.baseXVelocity;
    }
    if (this.x - this.radius < 0) {
      this.xVelocity = this.baseXVelocity;
    }
    if (this.y + this.radius > height) {
      this.yVelocity = -1 * this.baseYVelocity;
    }
    if (this.y - this.radius < 0) {
      this.yVelocity = this.baseYVelocity;
    }
  }
  
  display() {
    // draw the image
    image(ballImage, this.x, this.y, this.radius, this.radius)
  }
}

function waterMode(){ //helena
  //instead of dying/ having gameover when the cat hit the water,
  // the screen changes into a different water interactive game

}