const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d"); // robot that draws on the canvas

// draws a rectangle
ctx.beginPath(); // tells the robot to start drawing
// rectangle is 20 from the left and 40 from the top and is 50 wide and 50 tall
ctx.rect(20, 40, 50, 50);// created a rectangle and numbers determine where it is on the screen
ctx.fillStyle = "#FF0000"; // telling robot to put red pain on the brush
ctx.fill();// actually paints the rectangle
ctx.closePath();// tells robot to stop drawing and can start a new path 

// draws circle
ctx.beginPath();
// first two numbers are the center points of the circle and the third is the radius
// last two numbers are the start and end angle of the circle, 0-360 degrees | 0-6.28 radians or 2pi
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);// arc draws an arc like a compass
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.rect(160, 10, 100, 40);// created a rectangle and numbers determine where it is on the screen
ctx.strokeStyle = "rgba 0, 0, 255, 0.5)";// rgba is red, green, blue, and alpha
ctx.stroke();
ctx.closePath();