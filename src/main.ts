/* eslint-disable no-new */
// Variables
// eslint-disable-next-line import/extensions
import Ball from './Ball.js';
import Game from './Game.js';
import Paddle from './Paddle.js';

const x: number = 0; // Example value, replace with the actual value
const y: number = 0; // Example value, replace with the actual value
const width: number = 100; // Example value, replace with the actual value
const height: number = 50; // Example value, replace with the actual value
const color: string = 'blue'; // Example value, replace with the actual value

const paddle = new Paddle(x, y, width, height, color); // Instantiate an instance of the Paddle class
const ball = new Ball(); // Instantiate an instance of the Ball class
new Game('myCanvas', paddle, ball); // Pass the paddle and ball instances as arguments
