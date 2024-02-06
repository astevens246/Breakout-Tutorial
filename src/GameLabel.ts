/* eslint-disable import/extensions */
import Sprite from './Sprite.js';

class GameLabel extends Sprite {
  value: number;
  text: string;
  font: string;
  color: string | CanvasGradient | CanvasPattern;
  x: number;
  y: number;
  constructor(text: string, x: number, y: number, color: string, font = '16px Arial') {
    super(x, y, 0, 0, color);
    this.text = text;
    this.value = 0;
    this.font = font;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

// const scoreLabel = new GameLabel('Score: ', 8, 20, '#0095DD');
// const livesLabel = new GameLabel('Lives: ', 480 - 65, 20, 'red');
// livesLabel.value = 3;

export default GameLabel;
