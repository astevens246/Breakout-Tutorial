// eslint-disable-next-line import/extensions
import Brick from './Brick.js';

class Bricks {
  cols: number;
  rows: number;
  bricks: any;
  width: any;
  height: any;
  padding: any;
  offsetLeft: any;
  offsetTop: any;
  color: any;
  constructor(options: { cols: any; rows: any; width: any; height: any; padding: any; offsetLeft: any; offsetTop: any; color: any; }) {
    this.cols = options.cols;
    this.rows = options.rows;
    this.bricks = [];
    this.width = options.width;
    this.height = options.height;
    this.padding = options.padding;
    this.offsetLeft = options.offsetLeft;
    this.offsetTop = options.offsetTop;
    this.color = options.color;
    this.init();
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brickX = c * (this.width + this.padding) + this.offsetLeft;
        const brickY = r * (this.height + this.padding) + this.offsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, this.width, this.height, this.color);
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) brick.render(ctx);
      }
    }
  }
}

export default Bricks;
