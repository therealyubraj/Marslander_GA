class Game {
    moveList = [];
    noOfMoves = 200;
    dead = false;
    landed = false;
    oneTurnSim = 0;
    score = 0;
    fitness = 0;
    scoreDetails = {};

    constructor(rocketX, rocketY, rocketR) {
        this.rocket = new Rocket(rocketX, rocketY, rocketR);
    }

    createMoveList() {
        let groupingMoves = 5;
        let firstAngle = Math.floor(Math.random() * 180) - 90;
        let firstForce = Math.floor(Math.random() * 5);
        this.moveList.push([0, firstForce]);
        for (let i = 1; i < this.noOfMoves; i++) {
            let curForce = this.moveList[i - 1][1];
            let curAngle = this.moveList[i - 1][0];

            if (i % groupingMoves == 0) {
                curForce = Math.floor(Math.random() * 5);
                curAngle += Math.floor(Math.random() * 30) - 15;
            }

            curForce = clamp(curForce, 0, 4);
            curAngle = clamp(curAngle, -90, 90);

            this.moveList.push([0, curForce]);
        }
    }

    simulateTillDeath() {
        let turns = 0;
        while (!this.dead && turns < this.noOfMoves && !this.landed) {
            let rocketPos = this.rocket.pos;
            let collisionTest = terrain.collisionDetection(rocketPos.x, rocketPos.y, this.rocket.r, this.rocket.vel.x, this.rocket.vel.y, this.rocket.dir);
            if (collisionTest == 'HEHE') {
                this.landed = true;
                landingDone = true;
                this.score += 100;
            } else if (collisionTest) {
                this.dead = true;
            }
            this.rocket.applyForce(this.moveList[turns][1], this.moveList[turns][0]);
            this.rocket.moveRocket();
            this.score++;
            turns++;
        }
    }

    simulateOneMove(drawRocket = false) {
        if (!this.dead && this.oneTurnSim < this.noOfMoves) {
            let rocketPos = this.rocket.pos;
            let collisionTest = terrain.collisionDetection(rocketPos.x, rocketPos.y, this.rocket.r, this.rocket.vel.x, this.rocket.vel.y, this.rocket.dir);
            if (collisionTest == 'HEHE') {
                this.landed = true;
                landingDone = true;
            } else if (collisionTest) {
                this.dead = true;
            }
            this.rocket.applyForce(this.moveList[this.oneTurnSim][1], this.moveList[this.oneTurnSim][0]);
            this.rocket.moveRocket();
            if (drawRocket) {
                this.drawGame();
            }
            this.oneTurnSim++;
        }
    }

    drawGame() {
        this.rocket.drawRocket();
    }

    setMoveList(movesToCopy) {
        this.moveList = [];
        for (let i = 0; i < movesToCopy.length; i++) {
            this.moveList.push([movesToCopy[i][0], movesToCopy[i][1]]);
        }
    }

    getScore() {
        return this.score;
    }

    setScore(toSet) {
        this.score = toSet;
    }

    calcFitness() {
        let distScore = Math.floor(600 / (dist(this.rocket.pos.x, this.rocket.pos.y, landingX, landingY) + 1));
        let scoreChange = Math.pow(distScore, 0.2);
        this.score += scoreChange;
        this.scoreDetails.distChanges = scoreChange;

        let yVelScore = Math.floor(verticalVelLimit / (Math.abs(this.rocket.vel.y) + 1) * 100);
        scoreChange = Math.pow(yVelScore, 6);
        if (this.rocket.vel.y < verticalVelLimit) {
            scoreChange *= 20;
        }
        this.score += scoreChange;
        this.scoreDetails.velChanges = scoreChange;
        this.fitness = this.score;
    }


    mutate(MR) {
        for (let i = Math.floor(this.noOfMoves / 2); i < this.noOfMoves; i++) {
            if (Math.random() < MR) {
                let curForce = this.moveList[i][1];
                let curAngle = this.moveList[i][0];
                curForce += Math.floor(Math.random() * 3) - 1;
                curAngle += Math.floor(Math.random() * 10) - 5;

                curForce = clamp(curForce, 0, 4);
                curAngle = clamp(curAngle, -90, 90);

                this.moveList[i][0] = 0;
                this.moveList[i][1] = curForce;
            }
        }
    }
    deepCopy() {
        let newGame = new Game(startingX, startingY, rocketR);
        return newGame;
    }
}