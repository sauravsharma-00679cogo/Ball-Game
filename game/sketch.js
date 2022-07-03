let ball_x, ball_y, ball_dx, ball_dy, ball_radius;
let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
let rem_lives, score;
let grid = [];
var x, y, w, h;
function setup() {
  createCanvas(400, 400);
  background("black");
  fill("white");
  stroke("blue");
  paddle_y = height - 20;
  ball_x = width / 2;
  ball_radius = 25;
  ball_y = paddle_y - ball_radius / 2;
  ball_dx = -2;
  ball_dy = -1.5;

  paddle_x = width / 2 - 80 / 2;
  paddle_height = 15;
  paddle_width = 80;
  paddle_dx = 3;

  brick_x = 100;
  brick_y = 100;
  brick_width = 90;
  brick_height = 30;
  score = 0;
  rem_lives = 2;
  //showing bricks on canvas
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      row.push({ x: i * 95 + 20, y: j * 55 + 30, w: 80, h: 35 });
    }
    grid.push(row);
  }
}
function draw() {
  background("black");
  ball_x += ball_dx;
  ball_y += ball_dy;
  circle(ball_x, ball_y, ball_radius);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  //ball on left and right side of canvas
  if (ball_x + ball_radius / 2 >= width || ball_x - ball_radius / 2 <= 0) {
    ball_dx = -ball_dx;
  }
  //ball on top
  if (ball_y - ball_radius / 2 <= 0) {
    ball_dy = -ball_dy;
  }

  //ball on paddle
  if (
    ball_x >= paddle_x &&
    ball_x <= paddle_x + paddle_width &&
    ball_y + ball_radius / 2 >= paddle_y) {
    ball_dy = -ball_dy;
  }
  //ball not on paddle
  if (ball_y + ball_radius / 2 >= height) {
    if (rem_lives > 1) {
      rem_lives--;
      ball_x = width / 2;
      paddle_y = height - 20;
      ball_y = paddle_y - ball_radius / 2;
      ball_dx = -2;
      ball_dy = -1.5;
      paddle_x = width / 2 - 80 / 2;
    } else {
      rem_lives = 0;
      ball_dy = 0;
      ball_dx = 0;
      paddle_dx = 0;
      text("!!!Game Over!!!!", 170, 250);
    }
  }

  if (keyIsDown(RIGHT_ARROW) && paddle_x + 80 <= width) {
    paddle_x += paddle_dx;
  }
  if (keyIsDown(LEFT_ARROW) && paddle_x >= 0) {
    paddle_x -= paddle_dx;
  }

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      rect(grid[i][j].x, grid[i][j].y, grid[i][j].w, grid[i][j].h);
      //brick hit by ball
      //left and right side of brick
      if (
        ball_x - ball_radius / 2 < grid[i][j].x + grid[i][j].w &&
        ball_y > grid[i][j].y &&
        ball_y < grid[i][j].y + grid[i][j].h &&
        ball_x + ball_radius / 2 > grid[i][j].x
      ) {
        ball_dx = -ball_dx;
        score++;
        grid[i][j].h = 0;
        grid[i][j].w = 0;
      }
      //top and bottom of brick
      if (
        ball_y - ball_radius / 2 < grid[i][j].y + grid[i][j].h &&
        ball_x > grid[i][j].x &&
        ball_x < grid[i][j].x + grid[i][j].w &&
        ball_y + ball_radius / 2 > grid[i][j].y
      ) {
        ball_dy = -ball_dy;
        score++;
        grid[i][j].h = 0;
        grid[i][j].w = 0;
      }
    }
  }
  //when ball hit all the bricks
  if (score === grid.length * grid[0].length) {
    ball_dx = 0;
    ball_dy = 0;
    text("You Won!!!!", width / 2 - 50, height / 2);
  }
  //adding score and remaining lives
  text("Score:", width - 100, 20);
  text("Lives:", 30, 20);
  text(rem_lives, 70, 20);
  text(score, width - 60, 20);

}
