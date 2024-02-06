/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Paddle extends Sprite {
  x: number;
  width: number;
  y: any;
  constructor(x: number, y: number, width: number, height: number, color = 'red') {
    super(x, y, width, height, color);
  }

  moveBy(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// const paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight);

export default Paddle;
