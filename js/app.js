const
	maxSpeed = 100,
	maxEnemies = 10,
	minEnemies = 2,
	stepX = 101,
	stepY = 83,
	minX = -101,
	maxX = 505,
	minY = -83,
	maxY = 404;

// Enemies our player must avoid
class Enemy {
	constructor() {
		/* 	The image/sprite for our enemies, this uses
			a helper we've provided to easily load images */
		this.sprite = 'images/enemy-bug.png';
		this.init();
	}

	init() {
		//randmoize the speed of bugs
		this.speed = getRandomInt(maxSpeed);
		//let the bugs start out of the screen
		this.x = minX;
		//randmoize the street row, which the bugs would appear
		this.y = getRandomInt(3) * stepY;
	}

	update(dt) {
		/*	multipling the movement by the dt parameter
			which will ensure the game runs at the same speed for
			all computers. */
		this.x += this.speed * dt;

		//let the enemies move in an infinite loop
		if (this.x > maxX)
			this.x = minX;
	}

	render() {
		//render the sprite
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	checkCollisions() {
		/* 	if the distance between the bug and the player is half
			of the step, then there is a collision */
		if (Math.abs(this.x - player.x) < (stepX / 2) &&
			Math.abs(this.y - player.y) < (stepY / 2)) {
			player.init();
			score.removeScore();
		}
	}
}

//main Player class
class Player {

	constructor(sprite) {
		this.sprite = this.selectSprite(sprite);
		this.init();
	}

	selectSprite(sprite) {
		switch (sprite) {
			case 'cat-girl':
				return 'images/char-cat-girl.png';
				break;
			case 'horn-girl':
				return 'images/char-horn-girl.png';
				break;
			case 'pink-girl':
				return 'images/char-pink-girl.png';
				break;
			case 'princess-girl':
				return 'images/char-princess-girl.png';
				break;
			case 'boy':
			default:
				return 'images/char-boy.png';
		}
	}

	init() {
		//initial position
		this.x = 202;
		this.y = 404;
	}

	update() {
		//win when reaching the water
		if (this.y < 0) {
			this.init();
			score.addScore();
		}
	}

	render() {
		//render the sprite
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	handleInput(key) {
		/* 	checks if the next step is not the min/max of the screen
			if so, let the player do a step in the input direction */
		switch (key) {
			case 'left':
				if (this.x - stepX > minX)
					this.x -= stepX;
				break;
			case 'right':
				if (this.x + stepX < maxX)
					this.x += stepX;
				break;
			case 'up':
				if (this.y - stepY > minY)
					this.y -= stepY;
				break;
			case 'down':
				if (this.y < maxY)
					this.y += stepY;
		}
	}
}

class Score {
	constructor() {
		this.value = 0;
	}

	update() {
		document.getElementById('score').innerHTML = score.value;

	}

	addScore() {
		this.value++;
		this.update();
	}


	removeScore() {
		this.value = 0;
		this.update();
	}

	getScore() {
		return this.value;
	}
}

var scoreProxy = new Proxy(Score, {
	get(target, propName) {
		return target[propName];
	}
});



/* 	Now instantiating objects.
Place all enemy objects in an array called allEnemies */
var allEnemies = [];

//push random no. of enemies in allEnemies Array
for (let enemies = 0; enemies < getRandomInt(maxEnemies) + minEnemies; enemies++)
	allEnemies.push(new Enemy());

//Place the player object in a variable called player
var player = new Player('horn-girl');

//create score
var score = new Score();

/*	This listens for key presses and sends the keys to your
	Player.handleInput() method */
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

//function to get random integer >= 1
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max) + 1);
}
