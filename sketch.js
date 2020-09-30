let points = [
	[0, 450],
	[150, 490],
	[300, 200],
	[450, 800],
	[700, 800],
	[900, 900]
];
let scaleFac = 0.001;
let verticalVelLimit = 4;
let horizontalVelLimit = 2;
let startingX = 600,
	startingY = 200,
	rocketR = 30;

let landingX = 600,
	landingY = 800;

let games = [];
let reachedTarget = false;
let populationSize = 500;
let turns = 0;
let mutationRate = 0.01;
let bestGame = 0;
let stopEver = false;
let gens = 0;

let testingRocket = new Rocket(400, 400, 30);


function setup() {
	frameRate(60);
	createCanvas(900, 900);
	background(0);
	angleMode(DEGREES);
	for (let i = 0; i < populationSize; i++) {
		games.push(new Game(startingX, startingY, rocketR, points));
		games[i].createMoveList();
	}
}


function draw() {
	if (!reachedTarget && !stopEver) {
		for (let i = 0; i < 30; i++) {
			ellipse(15, 15, 15, 15);
			simulatePopulation();
			createNewPopn();
		}
	}
	if (stopEver) {
		background(0);
		bestGame.simulateOneTurn();
		bestGame.drawGame();
	}
	turns++;
}

function mousePressed() {
	stopEver = !stopEver;
	bestGame.dead = false;
	bestGame.rocket = new Rocket(startingX, startingY, rocketR);
	bestGame.turns = 0;
}