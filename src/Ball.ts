/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class Ball extends Sprite {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  PI2: number;
  color: string | CanvasGradient | CanvasPattern;
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = '#red') {
    super(x, y, radius * 2, radius * 2, color);
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.PI2 = Math.PI * 2;
  }

  move() {
    this.moveBy(this.dx, this.dy);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;