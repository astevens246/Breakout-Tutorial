import Sprite from './Sprite.js';
import Brick from './Brick.js';
import Ball from './Ball.js';
import Score from './Score.js';

// Variables
//---------------------------------------------
const box = new Sprite(100, 50, 33, 44, 'blue');
const ball = new Ball(1, 2, 3, 4, 10);

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // robot that draws on the canvas
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const paddleYStart = canvas.height - paddleHeight;

// these variables will change throughout so they are defined as let instead of const
let x = canvas.width / 2;// starting point for the ball
let y = canvas.height - 30;// starting point for the ball
let dx = (Math.random() - 0.5) * 10; // Generate a random number between -5 and 5
let dy = (Math.random() - 0.5) * 10; // Generate a random number between -5 and 5
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 6;
const brickColumnCount = 10;
const brickWidth = 35;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let lives = 3;

const bricks = [];
initializeBricks();

// Functions
//---------------------------------------------

function movePaddle() {
  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.moveBy(7, 0);
  } else if (leftPressed && paddle.x > 0) {
    paddle.moveBy(-7, 0); }
}

function collisionsWithCanvasAndPaddle() {
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.moveTo(relativeX - paddle.width / 2, paddleYStart)
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection() {
  for (let c = 0; c < bricks.cols; c += 1) {
    for (let r = 0; r < bricks.rows; r += 1) {
      const brick = bricks.bricks[c][r]; // deconstruction could be applied here
      if (b.status === 1) {
        if (
          x > b.x
            && x < b.x + brickWidth
            && y > b.y
            && y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function draw() {
  // Clear the canvas
  // canvas.width, and canvas.height might be better as constants
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Call helper functions 
  bricks.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  drawScore();
  drawLives();
  collisionDetection();
  ball.move();
  movePaddle();
  collisionsWithCanvasAndPaddle();

  //Draw the screen again
  requestAnimationFrame(draw);
}

function collisionsWithCanvasAndPaddle() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      if (lives > 0) { // Only decrement lives if it's greater than 0
        lives -= 1;
      }
      if (!lives) {
        // eslint-disable-next-line no-alert
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        const text = 'GAME OVER';
        const textWidth = ctx.measureText(text).width;
        // eslint-disable-next-line no-shadow
        const x = (canvas.width - textWidth) / 2;
        // eslint-disable-next-line no-shadow
        const y = canvas.height / 2;
        ctx.fillText(text, x, y);
        setTimeout(() => {
          document.location.reload();
        }, 30000); // Delay in milliseconds (e.g., 3000 milliseconds = 3 seconds)
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
