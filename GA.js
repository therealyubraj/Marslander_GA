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
        let tmpGame = new Game(startingX, startingY, rocketR, points);
        tmpGame.movesToDo = tmp1.movesToDo;
        //tmpGame.mutate(mutationRate);
        newGames.push(tmpGame);
    }
    games = newGames;
    gens++;
}


function readyScore() {
    let sum = 0;
    let bestScore = -Infinity;
    for (let i = 0; i < games.length; i++) {
        games[i].score += 10 / (Math.abs(games[i].rocket.vel.x) + 1);
        games[i].score += 10 / (Math.abs(games[i].rocket.vel.y) + 1);
        games[i].score += 90 / (Math.abs(games[i].rocket.dir) + 1);
        games[i].score += 2000 / (distSq(games[i].rocket.pos.x, games[i].rocket.pos.y, landingX, landingY) + 1);
        games[i].score = Math.max(0, games[i].score);
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

function distSq(x1, y1, x2, y2) {
    return (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}