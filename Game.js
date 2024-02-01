/* eslint-disable import/extensions */
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';
import GameLabel from './GameLabel.js';

// ----------------------------------------------------
// Game
//-----------------------------------------------------

// use sprite somewhere in your code
class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d'); // robot that draws on the canvas

    this.ballRadius = 10;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.brickRowCount = 6;
    this.brickColumnCount = 10;
    this.brickWidth = 35;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;
    this.paddleYStart = this.canvas.height - this.paddleHeight;
    this.objectColor = '#0095DD';
    this.gameOverMessage = 'Game Over';

    this.ball = new Ball(0, 0, 2, -2, this.ballRadius, this.objectColor);
    this.paddle = new Paddle(
      this.paddleXStart,
      this.paddleYStart,
      this.paddleWidth,
      this.paddleHeight,
      this.objectColor,
    );

    this.bricks = new Bricks({
      cols: this.brickColumnCount,
      rows: this.brickRowCount,
      width: this.brickWidth,
      height: this.brickHeight,
      padding: this.brickPadding,
      offsetLeft: this.brickOffsetLeft,
      offsetTop: this.brickOffsetTop,
      color: this.objectColor,

    });

    // cols, rows, width, height, padding, offsetLeft, offsetTop, color

    this.scoreLabel = new GameLabel('Score: ', 8, 20, this.objectcolor);
    this.livesLabel = new GameLabel('Lives: ', this.canvas.width - 65, 20, 'red');

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();

    this.draw();
  }

  setup() {
    this.livesLabel.value = 3;
    this.resetBallAndPaddle();

    // FIX ME
    document.addEventListener('keydown', (e) => {
      this.keyDownHandler(e);
    }, false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);

    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
  }

  resetBallAndPaddle() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = this.paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (
            this.ball.x + this.ball.radius > brick.x
            && this.ball.x - this.ball.radius < brick.x + brick.width
            && this.ball.y + this.ball.radius > brick.y
            && this.ball.y - this.ball.radius < brick.y + brick.height
          ) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;

            if (this.scoreLabel.value === this.bricks.cols * this.bricks.rows) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  collisionsWithCanvasAndPaddle(ctx) {
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
         || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }

    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesLabel.value -= 1;

        if (this.livesLabel.value === 0) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 3;
          this.ball.dy = -3;
          this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }

    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.x += 7;
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
    }

    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (this.relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  draw() {
    // Clear the canvas
    // canvas.width, and canvas.height might be better as constants
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Call helper functions
    this.bricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.livesLabel.render(this.ctx);
    this.collisionDetection();
    this.ball.move();
    this.movePaddle();
    this.collisionsWithCanvasAndPaddle();
    // Draw the screen again
    requestAnimationFrame(() => {
      this.draw(this.ctx);
    });// program may break here
  }
} // Game class ends---------------------------------------------

export default Game;
