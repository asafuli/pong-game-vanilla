const INITIAL_VELOCITY = 0.028;
const ACCELERATION = 1.5;

export default class Ball {
  constructor(id) {
    this.ball = document.getElementById(id);
    this.direction = this.findRandomDirection();
    this.x = 50;
    this.y = 50;
    this.signX = 1;
    this.signY = 1;
    this.velocity = INITIAL_VELOCITY;
    this.acceleration = ACCELERATION;
  }

  get x() {
    return parseFloat(this.ball.style.getPropertyValue('--x'));
  }

  set x(value) {
    this.ball.style.setProperty('--x', value);
\  }

  get y() {
    return parseFloat(this.ball.style.getPropertyValue('--y'));
  }

  set y(value) {
    this.ball.style.setProperty('--y', value);
  }

  rect() {
    return this.ball.getBoundingClientRect();
  }

  update(delta) {
    let { bottom, top, right, left } = this.rect();
    // console.log(this.rect());
    if (bottom > window.innerHeight || top < 0) {
      this.signY = -this.signY;
    }
    // if (left > window.innerWidth || right < 0) {
    //   this.signX = -this.signX;
    // }
    this.x +=
      this.direction.x * this.velocity * delta * this.acceleration * this.signX;
    this.y +=
      this.direction.y * this.velocity * delta * this.acceleration * this.signY;
  }

  randomDirection = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  findRandomDirection = function () {
    let found = false;
    let rand = 0;
    while (!found) {
      rand = this.randomDirection(0, 2 * Math.PI);
      if (0.1 <= rand && rand <= 0.9) found = true;
    }
    let x = Math.cos(rand);
    let y = Math.sin(rand);
    return { x, y };
  };
}
