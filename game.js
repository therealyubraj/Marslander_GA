class Game {
    reachedLanding = false;
    dead = false;
    turns = 0;
    score = 0;
    constructor(rocketX, rocketY, rocketR, terrainPoints) {
        this.fuel = 200;
        this.rocket = new Rocket(rocketX, rocketY, rocketR);
        this.terrain = new Terrain(terrainPoints);
        this.movesToDo = [];
    }

    drawGame() {
        this.terrain.drawTerrain();
        this.rocket.drawRocket();
    }

    createMoveList() {
        let thrustRange = 5;
        let firstForce = Math.floor(Math.random() * thrustRange);
        let firstAngle = Math.floor(Math.random() * 180) - 90;
        this.movesToDo.push([firstAngle, firstForce]);
        for (let i = 1; i < this.fuel; i++) {
            let curForce = this.movesToDo[i - 1][1] + Math.floor(Math.random() * 2) - 1;
            let curAngle = this.movesToDo[i - 1][1] + Math.floor(Math.random() * 3) - 1.5;

            if (curForce > 4) {
                curForce = 4;
            } else if (curForce < 0) {
                curForce = 0;
            }

            if (curAngle > 90) {
                curAngle = 90;
            } else if (curAngle < -90) {
                curAngle = -90;
            }

            this.movesToDo.push([curAngle, curForce]);
        }
    }

    checkDeath() {
        return this.terrain.collisionDetection(this.rocket.pos.x, this.rocket.pos.y, this.rocket.r, this.rocket.vel.x, this.rocket.vel.y, this.rocket.dir);
    }

    simulateOneTurn() {
        if (!this.dead && !this.reachedLanding && this.turns < this.movesToDo.length) {
            let deathVar = this.checkDeath();
            let angle = this.movesToDo[this.turns][0];
            let force = this.movesToDo[this.turns][1];
            if (!deathVar) {
                this.rocket.applyForce(force, angle);
                this.rocket.moveRocket();
            } else if (deathVar == 'HEHE') {
                this.reachedLanding = true;
                console.error("NOICE!!");
            } else {
                this.dead = true;
            }
            this.turns++;
        }
    }

    simulateTillEnd() {
        while (!this.dead && !this.reachedLanding) {
            let deathVar = this.checkDeath();
            let angle = this.movesToDo[this.turns][0];
            let force = this.movesToDo[this.turns][1];
            if (!deathVar) {
                this.fuel -= force;
                this.rocket.applyForce(force, angle);
                this.rocket.moveRocket();
                this.score++;
            } else if (deathVar == 'HEHE') {
                this.reachedLanding = true;
                reachedTarget = true;
                this.score += 100;
            } else {
                this.dead = true;
                //console.error(":SOB:")
                //this.score -= 50;
            }
            this.turns++;
        }
    }

    mutate(MR) {
        for (let i = 0; i < this.movesToDo.length; i++) {
            if (Math.random() < MR) {
                let curForce = this.movesToDo[i][1] + Math.floor(Math.random() * 4) - 2;
                let curAngle = this.movesToDo[i][0] + Math.floor(Math.random() * 10) - 5;
                if (curForce > 4) {
                    curForce = 4;
                } else if (curForce < 0) {
                    curForce = 0;
                }

                if (curAngle > 90) {
                    curAngle = 90;
                } else if (curAngle < -90) {
                    curAngle = -90;
                }
                this.movesToDo[i][0] = curAngle;
                this.movesToDo[i][1] = curForce;
            }
        }
    }
}