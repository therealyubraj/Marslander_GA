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
let terrain;

let testGame = new Game(startingX, startingY, rocketR);
let landingDone = false;

let games = [];
let popnSize = 500;
let gens = 0;
let mutationRate = 0.01;

function setup() {
	frameRate(60);
	createCanvas(900, 900);
	background(0);
	angleMode(DEGREES);
	terrain = new Terrain(points);

	for (let i = 0; i < popnSize; i++) {
		let tmpGame = new Game(startingX, startingY, rocketR);
		tmpGame.createMoveList();
		games.push(tmpGame);
	}
	//simulateOneGeneration();
}


function draw() {
	background(0);
	terrain.drawTerrain();

	simulateOneGeneration();
	if (landingDone) {
		background(255, 0, 0);
		console.error("--------------------------------------------------------------");
		noLoop();
	}
}

function mousePressed() {
	//console.error(games);
	//simulateOneGeneration();
}

function clamp(val, min, max) {
	let toRet = val;
	if (toRet > max) {
		toRet = max;
	}
	if (toRet < min) {
		toRet = min;
	}
	return toRet;
}