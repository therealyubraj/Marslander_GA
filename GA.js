function simulatePopulation() {
    for (let i = 0; i < populationSize; i++) {
        games[i].simulateTillEnd();
    }
}

function createNewPopn() {
    readyScore();
    let newGames = [];
    for (let i = 0; i < games.length; i++) {
        let tmp1 = games[pickOne()];
        let tmp2 = games[pickOne()];
        let tmpGame = new Game(startingX, startingY, rocketR, points);
        for (let j = 0; j < tmp1.movesToDo.length; j++) {
            if (Math.random() < 0.5) {
                tmpGame.movesToDo.push(tmp1.movesToDo[j]);
            } else {
                tmpGame.movesToDo.push(tmp2.movesToDo[j]);
            }
        }
        tmpGame.mutate(mutationRate);
        newGames.push(tmpGame);
    }
    games = newGames;
    gens++;
}


function readyScore() {
    let sum = 0;
    let bestScore = -Infinity;
    for (let i = 0; i < games.length; i++) {
        games[i].score -= Math.abs(games[i].rocket.vel.x);
        games[i].score -= Math.abs(games[i].rocket.vel.y);
        games[i].score -= Math.abs(games[i].rocket.dir);
        if (Math.abs(games[i].rocket.vel.y) > 3) {
            games[i].score -= 50;
        }
        if (Math.abs(games[i].rocket.vel.x) > 2) {
            games[i].score -= 50;
        }
        if (Math.abs(games[i].rocket.dir) > 15) {
            games[i].score -= 100;
        }
        sum += games[i].score;
        if (games[i].score > bestScore) {
            bestScore = games[i].score;
            bestGame = games[i];
        }
    }
    for (let i = 0; i < games.length; i++) {
        games[i].score /= sum;
    }
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r -= games[index].score;
        if (index >= populationSize - 1) {
            break;
        }
        index++;
    }
    index--;
    return index;
}