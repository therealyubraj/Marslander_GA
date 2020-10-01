class Rocket {
  vel = new Vector(0, 0);
  acc = new Vector(0, 0);
  gravity = new Vector(0, 3.711 * scaleFac);
  dir = 0;
  angleRotateLimit = 15;
  thurstPower = 3.72 * scaleFac / 4;
  thurst = new Vector(0, 0);

  constructor(x, y, r) {
    this.pos = new Vector(x, y);
    this.r = r;
  }

  drawRocket() {
    fill(255);
    stroke(0);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.dir);
    ellipse(0, 0, this.r, this.r);
    ellipse(0, -10, 3, 3);
    pop();
  }

  moveRocket() {
    this.acc = Vector.add(this.acc, this.gravity);
    this.acc = Vector.add(this.acc, this.thurst);
    this.vel = Vector.add(this.vel, this.acc);
    this.pos = Vector.add(this.pos, this.vel);
  }

  applyForce(force, angle) {
    let thurstToApply = force;
    let angleToRotate = angle - this.dir;

    if (force > 4) {
      thurstToApply = 4;
    } else if (force < 0) {
      thurstToApply = 0;
    }

    if (angleToRotate > this.angleRotateLimit) {
      angleToRotate = this.angleRotateLimit;
    } else if (angleToRotate < -this.angleRotateLimit) {
      angleToRotate = -this.angleRotateLimit;
    }

    this.dir += angleToRotate;

    if (this.dir > 90) {
      this.dir = 90;
    } else if (this.dir < -90) {
      this.dir = -90;
    }

    this.thurst.y = -scaleFac * cos(this.dir) * thurstToApply;
    this.thurst.x = scaleFac * sin(this.dir) * thurstToApply;
  }

  deepCopy() {
    return new Rocket(startingX, startingY, rocketR);
  }
}