function simulateOneGeneration() {
    readyScore();
    let newGames = [];
    games.sort((a, b) => b.score - a.score);

    let bestGame = games[0];
    let bestYVel = Math.abs(bestGame.rocket.vel.y);

    //let worstGame = games[popnSize - 1];
    //let worstYVel = Math.abs(worstGame.rocket.vel.y);
    //console.error(bestYVel, worstYVel);
    if (bestYVel < 5) {
        mutationRate = 0.01;
    } else if (bestYVel >= 5 && bestYVel < 10) {
        mutationRate = 0.1;
    } else {
        mutationRate = 1;
    }
    for (let i = 0; i < games.length; i++) {
        let indToCopy1 = pickOne();
        games[indToCopy1].mutate(mutationRate);
        let tmpNewGame = new Game(startingX, startingY, rocketR);
        for (let j = 0; j < tmpNewGame.noOfMoves; j++) {
            let indToPush = indToCopy1;
            let toPush = [games[indToPush].moveList[j][0], games[indToPush].moveList[j][1]];
            tmpNewGame.moveList.push(toPush);
        }
        newGames.push(tmpNewGame);
    }
    games = newGames;
    gens++;
}

function readyScore() {
    let velocities = [];
    games.forEach((g) => {
        g.simulateTillDeath();
        g.calcFitness();
    });

    let sum = 0;
    for (let i = 0; i < games.length; i++) {
        sum += games[i].getScore();
        velocities.push([games[i].rocket.vel.x, games[i].rocket.vel.y]);
    }
    velocities.sort((a, b) => b[1] - a[1]);
    console.error(velocities[0], velocities[popnSize - 1]);
    for (let i = 0; i < games.length; i++) {
        let normScore = games[i].getScore() / sum;
        games[i].setScore(normScore);
    }
}

function pickOne() {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r -= games[index].getScore();
        if (index >= popnSize - 1) {
            break;
        }
        index++;
    }
    index--;
    return index;
}