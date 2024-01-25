/* eslint-disable import/extensions */
import Sprite from './Sprite.js';
import Ball from './Ball.js';

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
const x = canvas.width / 2;// starting point for the ball
const y = canvas.height - 30;// starting point for the ball
const dx = (Math.random() - 0.5) * 10; // Generate a random number between -5 and 5
let dy = (Math.random() - 0.5) * 10; // Generate a random number between -5 and 5

const paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 6;
const brickColumnCount = 10;
const brickWidth = 35;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
initializeBricks();

// Functions
//---------------------------------------------

function movePaddle() {
  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.moveBy(7, 0);
  } else if (leftPressed && paddle.x > 0) {
    paddle.moveBy(-7, 0);
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.moveTo(relativeX - paddle.width / 2, paddleYStart);
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

          scoreLabel.value += 1;
          if (scoreLabel.value === bricks.cols * bricks.rows) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function collisionsWithCanvasAndPaddle() {
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      if (lives > 0) {
        livesLabel.value -= 1;
      }
      if (livesLabel.value === 0) {
        ctx.font = '50px Arial';
        ctx.fillStyle = 'black';
        const text = 'GAME OVER';
        const textWidth = ctx.measureText(text).width;
        const x = (canvas.width - textWidth) / 2;
        const y = canvas.height / 2;
        ctx.fillText(text, x, y);
        setTimeout(() => {
          document.location.reload();
        }, 30000);
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 3;
        ball.dy = -3;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);
}
function draw() {
  // Clear the canvas
  // canvas.width, and canvas.height might be better as constants
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Call helper functions
  bricks.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  scoreLabel.render(ctx);
  livesLabel.render(ctx);
  collisionDetection();
  ball.move();
  movePaddle();
  collisionsWithCanvasAndPaddle();

  // Draw the screen again
  requestAnimationFrame(draw);
}

draw();
