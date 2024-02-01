(()=>{"use strict";const t=class{constructor(t=0,s=0,i=10,h=10,e="#f00"){this.x=t,this.y=s,this.width=i,this.height=h,this.color=e}moveBy(t,s){this.x+=t,this.y+=s}moveTo(t,s){this.x=t,this.y=s}render(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}},s=class extends t{constructor(t=0,s=0,i=2,h=-1,e=10,l="#red"){super(t,s,2*e,2*e,l),this.dx=i,this.dy=h,this.radius=e,this.PI2=2*Math.PI}move(){this.moveBy(this.dx,this.dy)}render(t){t.beginPath(),t.arc(this.x,this.y,this.radius,0,this.PI2),t.fillStyle=this.color,t.fill(),t.closePath()}},i=class extends t{constructor(t,s,i,h,e="red"){super(t,s,i,h,e)}moveBy(t,s){this.x+=t,this.y+=s}moveTo(t,s){this.x=t,this.y=s}},h=class extends t{constructor(t,s,i,h,e="#0095DD"){super(t,s,i,h,e),this.status=1}render(t){t.beginPath(),t.rect(this.x,this.y,this.width,this.height),t.fillStyle=this.color,t.fill(),t.closePath()}},e=class{constructor(t){this.cols=t.cols,this.rows=t.rows,this.bricks=[],this.width=t.width,this.height=t.height,this.padding=t.padding,this.offsetLeft=t.offsetLeft,this.offsetTop=t.offsetTop,this.color=t.color,this.init()}init(){for(let t=0;t<this.cols;t+=1){this.bricks[t]=[];for(let s=0;s<this.rows;s+=1){const i=t*(this.width+this.padding)+this.offsetLeft,e=s*(this.height+this.padding)+this.offsetTop;this.bricks[t][s]=new h(i,e,this.width,this.height,this.color)}}}render(t){for(let s=0;s<this.cols;s+=1)for(let i=0;i<this.rows;i+=1){const h=this.bricks[s][i];1===h.status&&h.render(t)}}},l=class extends t{constructor(t,s,i,h,e="16px Arial"){super(s,i,0,0,h),this.text=t,this.value=0,this.font=e}render(t){t.font=this.font,t.fillStyle=this.color,t.fillText(`${this.text} ${this.value}`,this.x,this.y)}};new class{constructor(t){this.canvas=document.getElementById(t),this.ctx=this.canvas.getContext("2d"),this.ballRadius=10,this.paddleHeight=10,this.paddleWidth=75,this.brickRowCount=6,this.brickColumnCount=10,this.brickWidth=35,this.brickHeight=20,this.brickPadding=10,this.brickOffsetTop=30,this.brickOffsetLeft=30,this.paddleXStart=(this.canvas.width-this.paddleWidth)/2,this.paddleYStart=this.canvas.height-this.paddleHeight,this.objectColor="#0095DD",this.gameOverMessage="Game Over",this.ball=new s(0,0,2,-2,this.ballRadius,this.objectColor),this.paddle=new i(this.paddleXStart,this.paddleYStart,this.paddleWidth,this.paddleHeight,this.objectColor),this.bricks=new e({cols:this.brickColumnCount,rows:this.brickRowCount,width:this.brickWidth,height:this.brickHeight,padding:this.brickPadding,offsetLeft:this.brickOffsetLeft,offsetTop:this.brickOffsetTop,color:this.objectColor}),this.scoreLabel=new l("Score: ",8,20,this.objectcolor),this.livesLabel=new l("Lives: ",this.canvas.width-65,20,"red"),this.rightPressed=!1,this.leftPressed=!1,this.setup(),this.draw()}setup(){this.livesLabel.value=3,this.resetBallAndPaddle(),document.addEventListener("keydown",(t=>{this.keyDownHandler(t)}),!1),document.addEventListener("keyup",this.keyUpHandler.bind(this),!1),document.addEventListener("mousemove",this.mouseMoveHandler.bind(this),!1)}resetBallAndPaddle(){this.ball.x=this.canvas.width/2,this.ball.y=this.canvas.height-30,this.ball.dx=2,this.ball.dy=-2,this.paddle.x=this.paddleXStart}collisionDetection(){for(let t=0;t<this.bricks.cols;t+=1)for(let s=0;s<this.bricks.rows;s+=1){const i=this.bricks.bricks[t][s];1===i.status&&this.ball.x+this.ball.radius>i.x&&this.ball.x-this.ball.radius<i.x+i.width&&this.ball.y+this.ball.radius>i.y&&this.ball.y-this.ball.radius<i.y+i.height&&(this.ball.dy=-this.ball.dy,i.status=0,this.scoreLabel.value+=1,this.scoreLabel.value===this.bricks.cols*this.bricks.rows&&(alert("YOU WIN, CONGRATULATIONS!"),document.location.reload()))}}movePaddle(){this.rightPressed&&this.paddle.x<this.canvas.width-this.paddle.width?this.paddle.moveBy(7,0):this.leftPressed&&this.paddle.x>0&&this.paddle.moveBy(-7,0)}collisionsWithCanvasAndPaddle(t){(this.ball.x+this.ball.dx>this.canvas.width-this.ball.radius||this.ball.x+this.ball.dx<this.ball.radius)&&(this.ball.dx=-this.ball.dx),this.ball.y+this.ball.dy<this.ball.radius?this.ball.dy=-this.ball.dy:this.ball.y+this.ball.dy>this.canvas.height-this.ball.radius&&(this.ball.x>this.paddle.x&&this.ball.x<this.paddle.x+this.paddle.width?this.ball.dy=-this.ball.dy:(this.livesLabel.value-=1,0===this.livesLabel.value?(alert("GAME OVER"),document.location.reload()):(this.ball.x=this.canvas.width/2,this.ball.y=this.canvas.height-30,this.ball.dx=3,this.ball.dy=-3,this.paddle.x=(this.canvas.width-this.paddle.width)/2))),this.rightPressed&&this.paddle.x<this.canvas.width-this.paddle.width?this.paddle.x+=7:this.leftPressed&&this.paddle.x>0&&(this.paddle.x-=7),this.ball.x+=this.ball.dx,this.ball.y+=this.ball.dy}mouseMoveHandler(t){const s=t.clientX-this.canvas.offsetLeft;this.relativeX>0&&s<this.canvas.width&&this.paddle.moveTo(s-this.paddle.width/2,this.paddleYStart)}keyDownHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!0:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!0)}keyUpHandler(t){"Right"===t.key||"ArrowRight"===t.key?this.rightPressed=!1:"Left"!==t.key&&"ArrowLeft"!==t.key||(this.leftPressed=!1)}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.bricks.render(this.ctx),this.ball.render(this.ctx),this.paddle.render(this.ctx),this.scoreLabel.render(this.ctx),this.livesLabel.render(this.ctx),this.collisionDetection(),this.ball.move(),this.movePaddle(),this.collisionsWithCanvasAndPaddle(),requestAnimationFrame((()=>{this.draw(this.ctx)}))}}("myCanvas")})();