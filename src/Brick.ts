// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Brick extends Sprite {
  status: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string | CanvasGradient | CanvasPattern;
  constructor(x: number, y: number, width: number, height: number, color = '#0095DD') {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = 1; // adds a new property
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color; // Use the row index to select a color
    ctx.fill();
    ctx.closePath();
  }
}
export default Brick;
