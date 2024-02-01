// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x, y, width, height, color = '#0095DD') {
    super(x, y, width, height, color); // pass arguments to Sprite!
    this.status = 1; // adds a new property
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color; // Use the row index to select a color
    ctx.fill();
    ctx.closePath();
  }
}
export default Brick;
