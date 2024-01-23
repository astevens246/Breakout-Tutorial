import Sprite from './Sprite.js';
import Brick from './Brick.js';
import Ball from './Ball.js';

// Variables
//---------------------------------------------
const box = new Sprite(100, 50, 33, 44, 'blue');
const ball = new Ball(1, 2, 3, 4, 10);

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d'); // robot that draws on the canvas
const ballRadius = 10;

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

function initializeBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight);
    }
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
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
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r]; // deconstruction could be applied here
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

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']; // Add as many colors as you have rows

  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) brick.render(ctx);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.render(ctx);
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

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
