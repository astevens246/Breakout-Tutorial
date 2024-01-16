const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); // robot that draws on the canvas

let x = canvas.width / 2;// starting point for the ball
let y = canvas.height - 30;// starting point for the ball
let dx = 2;
let dy = -2;

const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y,ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);




// // draws a rectangle
// ctx.beginPath(); // tells the robot to start drawing
// // rectangle is 20 from the left and 40 from the top and is 50 wide and 50 tall
// ctx.rect(20, 40, 50, 50);// created a rectangle and numbers determine where it is on the screen
// ctx.fillStyle = "#FF0000"; // telling robot to put red pain on the brush
// ctx.fill();// actually paints the rectangle
// ctx.closePath();// tells robot to stop drawing and can start a new path 




// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);// created a rectangle and numbers determine where it is on the screen
// ctx.strokeStyle = "rgba 0, 0, 255, 0.5)";// rgba is red, green, blue, and alpha
// ctx.stroke();
// ctx.closePath();