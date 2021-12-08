import Ball from './ball.js';
import Paddle from './paddle.js';

let lastTime;
let ball = new Ball('ball');
let playerPaddle = new Paddle('player-paddle');
let computerPaddle = new Paddle('computer-paddle');
let playerScore = document.getElementById('right-score');
let computerScore = document.getElementById('left-score');
let togglePlayBTN = document.querySelector('.toggle-play');
let restartGameBTN = document.querySelector('.restart');
let breakLoop = false;
let play = false;
let newGame = false;

const reset = () => {
  lastTime;
  ball = new Ball('ball');
  playerPaddle = new Paddle('player-paddle');
  computerPaddle = new Paddle('computer-paddle');
  breakLoop = false;
  play = false;
  if (newGame) {
    playerScore.innerText = '0';
    computerScore.innerText = '0';
    newGame = false;
  }
};

const addListeners = () => {
  togglePlayBTN.addEventListener('click', () => togglePlay());
  restartGameBTN.addEventListener('click', () => restart());
};

const togglePlay = () => {
  if (play) togglePlayBTN.innerText = 'עצור משחק';
  if (!play) togglePlayBTN.innerText = 'המשך משחק';
  play = !play;
};

const restart = () => {
  newGame = true;
  togglePlayBTN.innerText = 'התחל משחק';
  reset();
};

const checkStatus = () => {
  let { bottom, top, right, left } = playerPaddle.rect();
  let {
    bottom: bottomBall,
    top: topBall,
    right: rightBall,
    left: leftBall,
  } = ball.rect();

  if (
    ((bottom > bottomBall && bottomBall > top) ||
      (bottom > topBall && topBall > top)) &&
    right >= leftBall
  ) {
    console.log('hit');
    console.log(bottom, top, right, left);
    console.log(bottomBall, topBall, rightBall, leftBall);
    ball.signX = -ball.signX;
  }

  if (0 >= rightBall && !breakLoop) {
    computerScore.innerText = parseInt(computerScore.innerText) + 1;
    breakLoop = true;
    reset();
  }

  let {
    bottom: bottomComputer,
    top: topComputer,
    right: rightComputer,
    left: leftComputer,
  } = computerPaddle.rect();

  console.log(bottomComputer, topComputer, rightComputer, leftComputer);

  if (
    ((bottomComputer > bottomBall && bottomBall > topComputer) ||
      (bottomComputer > topBall && topBall > topComputer)) &&
    leftComputer <= rightBall
  ) {
    console.log('hit computer');
    console.log(bottomComputer, topComputer, rightComputer, leftComputer);
    console.log(bottomBall, topBall, rightBall, leftBall);
    ball.signX = -ball.signX;
  }
  if (window.innerWidth <= leftBall && !breakLoop) {
    playerScore.innerText = parseInt(playerScore.innerText) + 1;
    breakLoop = true;
    reset();
  }
};

function update(time) {
  let delta;
  if (play && lastTime !== undefined) {
    delta = time - lastTime;
    ball.update(delta);
    playerPaddle.update(delta, ball);
    computerPaddle.update(delta, ball);
    checkStatus();
  }
  lastTime = time;
  requestAnimationFrame(update);
}

addListeners();
requestAnimationFrame(update);
