const
	MAX_SPEED = 100,
	MAX_ENEMIES = 10,
	MIN_ENEMIES = 2,
	X_MAX = 505,
	X_MIN = -101,
	X_STEP = 101,
	Y_MIN = -83,
	Y_STEP = 83,
	Y_MAX = 404,
	SPRITES = {
		'boy': 'images/char-boy.png',
		'bug': 'images/enemy-bug.png',
		'cat-girl': 'images/char-cat-girl.png',
		'horn-girl': 'images/char-horn-girl.png',
		'pink-girl': 'images/char-pink-girl.png',
		'princess-girl': 'images/char-princess-girl.png'
	};

class Charchater {
	constructor(sprite) {
		/* 	The image/sprite for our enemies, this uses
			a helper we've provided to easily load images */
		this.sprite = sprite;
		this.init();
	}

	init() {
		this.x = 0;
		this.y = 0;
	}

	render() {
		//render the sprite
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Enemies our player must avoid
class Enemy extends Charchater {
	constructor() {
		super(SPRITES['bug']);
	}

	init() {
		//randmoize the speed of bugs
		this.speed = getRandomInt(MAX_SPEED);
		//let the bugs start out of the screen
		this.x = X_MIN;
		//randmoize the street row, which the bugs would appear
		this.y = getRandomInt(3) * Y_STEP;
	}

	update(dt) {
		/*	multipling the movement by the dt parameter
			which will ensure the game runs at the same speed for
			all computers. */
		this.x += this.speed * dt;

		//let the enemies move in an infinite loop
		if (this.x > X_MAX)
			this.x = X_MIN;
	}

	checkCollisions() {
		/* 	if the distance between the bug and the player is half
			of the step, then there is a collision */
		if (Math.abs(this.x - player.x) < (X_STEP / 2) &&
			Math.abs(this.y - player.y) < (Y_STEP / 2)) {
			player.init();
			score.removeScore();
		}
	}
}

//main Player class
class Player extends Charchater {

	constructor(sprite) {
		super(SPRITES['horn-girl']);
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

	handleInput(key) {
		/* 	checks if the next step is not the min/max of the screen
			if so, let the player do a step in the input direction */
		switch (key) {
			case 'left':
				if (this.x - X_STEP > X_MIN)
				this.x -= X_STEP;
				break;
			case 'right':
				if (this.x + X_STEP < X_MAX)
					this.x += X_STEP;
				break;
			case 'up':
				if (this.y - Y_STEP > Y_MIN)
					this.y -= Y_STEP;
				break;
			case 'down':
				if (this.y < Y_MAX)
					this.y += Y_STEP;
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

/* 	Now instantiating objects.
Place all enemy objects in an array called allEnemies */
var allEnemies = [];

//push random no. of enemies in allEnemies Array
for (let enemies = 0; enemies < getRandomInt(MAX_ENEMIES) + MIN_ENEMIES; enemies++)
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
