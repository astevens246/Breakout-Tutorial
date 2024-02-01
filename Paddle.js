/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width, height, color = 'red') {
    super(x, y, width, height, color);
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}

// const paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight);

export default Paddle;
