class Terrain {
  constructor(points) {
    this.points = points;
  }

  drawTerrain() {
    stroke(255, 0, 0);
    strokeWeight(2);
    for (let i = 0; i < this.points.length - 1; i++) {
      line(this.points[i][0], this.points[i][1], this.points[i + 1][0], this.points[i + 1][1]);
    }
  }

  collisionDetection(rocketX, rocketY, rocketR, rocketVX, rocketVY, rocketAngle) {
    if (rocketX + rocketR / 2 >= width) {
      return true;
    } else if (rocketX - rocketR / 2 <= 0) {
      return true;
    } else if (rocketY - rocketR / 2 <= 0) {
      return true;
    } else if (rocketY - rocketR / 2 >= height) {
      return true;
    }
    for (let i = 0; i < this.points.length - 1; i++) {
      let x1 = points[i][0];
      let y1 = points[i][1];
      let x2 = points[i + 1][0];
      let y2 = points[i + 1][1];
      let mPerp = 0;
      if (x2 - x1 != 0) {
        mPerp = (y2 - y1) / (x2 - x1);
      } else {
        mPerp = 0;
      }
      let c = y1 - (mPerp * x1);
      let perpDist = Math.abs((mPerp * rocketX - rocketY + c) / (Math.sqrt(Math.pow(mPerp, 2) + Math.pow(1, 2))));
      if (perpDist <= (rocketR / 2) && (rocketX >= x1 - rocketR) && (rocketX <= x2 + rocketR)) {
        if (y2 - y1 != 0) {
          return true;
        } else if (Math.abs(rocketVX) <= horizontalVelLimit && Math.abs(rocketVY) <= verticalVelLimit && rocketAngle == 0) {
          return "HEHE";
        } else {
          return true;
        }
      }
    }
    return false;
  }
}


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = Math.atan2(this.x, this.y);
  }

  static add(vec1, vec2) {
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y);
  }

  scale(f) {
    return new Vector(this.x * f, this.y * f);
  }
}