class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = '#red') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;  
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.Radius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
