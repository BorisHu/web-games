let health = 3;

function setup() {
  createCanvas(windowWidth/2, windowHeight).center('horizontal');
  enemies = new Group();
  enemyBullets = new Group();
  playerBullets = new Group();
  setSketch();
  var button = createButton("Start");
  button.mousePressed(setSketch);
  button.position(windowWidth/8, windowHeight/2);
  button.size(100,50);
}

function draw() {
  background(50);
  player.position.x = mouseX;
  player.position.y = mouseY;
  drawSprites();
  fill(255);
  noStroke();
  textSize(36);

  player.overlaps(enemies, playerGetHit);
  player.overlaps(enemyBullets, playerGetHit);
  if (mouse.pressing() && frameCount % 10 == 0) {
    plShootFly(player, playerBullets);
  }
  
  if (frameCount % 100 == 0) {
    enShootFly(enemies, enemyBullets);
  }
  playerBullets.overlaps(enemies, enemyGetHit);

  displayHealth(health);
  showWin(enemies);
}

function setSketch() {
  enemies.remove();
  enemyBullets.remove();
  playerBullets.remove();
  enemies = new Group();
  enemyBullets = new Group();
  playerBullets = new Group();
  spawnEnemy(enemies, 5);
  enemyShoot(enemies, enemyBullets);
  player = createSprite(50, 50, 20, 20);
  player.shapeColor = color(255);
  playerShoot(player, playerBullets);
  health = 3;
}

function playerGetHit(player, enemy) {
  health -= 1;
}

function enemyGetHit(enemies, enemy) {
  enemy.remove();
}

function spawnEnemy(enemies, num) {
  for (let i = 0; i < num; i++) {
    let enemy = createSprite(random(10, width-10), random(-(num*40), 0), 30, 30);
    enemy.shapeColor = color(255, 0, 0);
    enemy.velocity.y = 0.5;
    enemies.add(enemy);
  }
}

function playerShoot(player, playerBullets) {
  for (let i = 0; i <= 12; i++) {
    let plBullets = createSprite(-10, -10, 5);
    plBullets.shapeColor = color(255);
    playerBullets.add(plBullets);
  }
}

function plShootFly(player, playerBullets) {
  for (let i = 0; i < playerBullets.length; i++){
    playerBullets[i].x = player.x;
    playerBullets[i].y = player.y - i*60;
    playerBullets[i].velocity.y = -6;
    if (playerBullets[i] < 0) {
      playerBullets[i].remove();
    }
  }
}

function enemyShoot(enemies, enemyBullets) {
  for (let i = 0; i < enemies.length; i++) {
    let enBullets = createSprite(-100, -100, 5);
      enBullets.shapeColor = color(255,100,0);
      enemyBullets.add(enBullets);
  }
}

function enShootFly(enemies, enemyBullets) {
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < enemyBullets.length; j++){
      enemyBullets[i].x = enemies[i].x;
      enemyBullets[i].y = enemies[i].y + i;
      enemyBullets[i].velocity.y = 3;
      if (enemyBullets[i] > height || enemyBullets[i] < 0) {
        enemyBullets[i].remove();
      }
    }
  }
}

function displayHealth(health) {
  if (health > 0) {
    text("Health: "+ health, width/2-50, height-15);
  }
  else {
    textAlign(CENTER, CENTER);
    text("You lose!", width/2, height/2);
    player.remove();
    playerBullets.remove();
  }
}

function showWin(enemies) {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].y > height) {
      enemies[i].remove();
    }
  }
  if (enemies.length == 0) {
    textSize(72);
    textAlign(CENTER, CENTER);
    text("You Win!", width/2, height/2);
    player.remove();
    playerBullets.remove();
  }
}