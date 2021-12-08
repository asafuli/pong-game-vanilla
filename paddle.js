const INITIAL_VELOCITY = 1.5;
const INITIAL_COMPUTER_VELOCITY = 0.2;

export default class Paddle {
  constructor(id) {
    this.paddle = document.getElementById(id);
    this.addListeners();
    this.direction = '';
    this.position = '50';
    this.velocity = INITIAL_VELOCITY;
    this.computerVelocity = INITIAL_COMPUTER_VELOCITY;
    this.lastBallX;
    this.lastBallY;
  }

  rect() {
    return this.paddle.getBoundingClientRect();
  }

  get position() {
    return parseFloat(this.paddle.style.getPropertyValue('--position'));
  }

  set position(value) {
    this.paddle.style.setProperty('--position', value);
  }

  addListeners() {
    document.addEventListener('keydown', (ev) => {
      // console.log('key down', ev.key);
      if (ev.key === 'ArrowDown') {
        this.direction = 'down';
      }
      if (ev.key === 'ArrowUp') {
        this.direction = 'up';
      }
    });
    document.addEventListener('keyup', (ev) => {
      // console.log('key up', ev.key);
      if (ev.key === 'ArrowDown' && this.direction === 'down') {
        this.direction = '';
      }
      if (ev.key === 'ArrowUp' && this.direction === 'up') {
        this.direction = '';
      }
    });
  }

  update(delta, ball) {
    let { bottom, top } = this.rect();
    if (this.paddle.getAttribute('id') === 'computer-paddle') {
      console.log(this.lastBallX, ball.x);
      if (this.lastBallX - ball.x > 0) {
        if (ball.y > this.position && this.lastBallY < ball.y) {
          this.position += this.computerVelocity;
        } else if (ball.y < this.position && this.lastBallY > ball.y) {
          this.position -= this.computerVelocity;
        }
      }
      this.lastBallX = ball.x;
      this.lastBallY = ball.y;
    }

    if (this.paddle.getAttribute('id') === 'player-paddle') {
      if (this.direction === 'up' && top > 0) {
        // console.log(bottom);
        this.position -= this.velocity;
      }
      if (this.direction === 'down' && bottom < window.innerHeight) {
        this.position += this.velocity;
        // console.log(bottom);
      }
    }
  }
}
