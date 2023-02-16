let coins;
let player;
let score = 20;
function setup() {
  createCanvas(windowWidth/2, windowHeight).center('horizontal');
  coins = new Group();
  for (let i = 0; i < 10; i++) {
    let c = createSprite(
      random(100, width-100),
      0,
      10, 10);
    c.shapeColor = color(255, 255, 0);
    c.velocity.y = random(1, 5);
    coins.add(c);
  }
  player = createSprite(50, 50, 40, 40);
  player.shapeColor = color(255);
}
function draw() {
  background(50);
//   player.position.x = mouseX;
//   player.position.y = mouseY;
    player.velocity.x = 
        (mouseX-player.position.x)*1;
    player.velocity.y = 
        (mouseY-player.position.y)*1;
  player.overlap(coins, getCoin);
  drawSprites();
  fill(255);
  noStroke();
  textSize(72);
  textAlign(CENTER, CENTER);
  if (coins.length > 0) {
    text(score, width/2, height/2);
  }
  else {
    text("you lose!", width/2, height/2);
  }
}
function getCoin(player, coin) {
  coin.remove();
  score -= 1;
}