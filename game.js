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
        let lastThurstChange = 5;
        for (let i = 1; i < this.fuel; i++) {
            let curForce = this.movesToDo[i - 1][1];
            if (lastThurstChange == 0) {
                let toChange = Math.floor(Math.random() * 3) - 1;
                //console.error(toChange);
                curForce += toChange;
                lastThurstChange = 6;
            }
            let curAngle = this.movesToDo[i - 1][1] + Math.floor(Math.random() * 30) - 15;

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


            this.movesToDo.push([0, curForce]);
            lastThurstChange--;
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
        while (!this.dead && !this.reachedLanding && this.turns < this.movesToDo.length) {
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
                this.score += 100000;
            } else {
                this.dead = true;
                this.score -= 200;
            }
            this.turns++;
        }
    }

    mutate(MR) {
        if (Math.random() < MR) {
            let randInd = Math.max(0, Math.floor(Math.random() * this.movesToDo.length) - 6);
            let curForce = this.movesToDo[randInd][1] + Math.floor(Math.random() * 3) - 1;
            let curAngle = this.movesToDo[randInd][0] + Math.floor(Math.random() * 10) - 5;
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
            for (let i = randInd; i < randInd + 5; i++) {
                this.movesToDo[i][0] = 0;
                this.movesToDo[i][1] = curForce;
            }
        }
    }
}