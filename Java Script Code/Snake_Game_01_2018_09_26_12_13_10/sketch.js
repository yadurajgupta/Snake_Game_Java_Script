let snake;
let x_size = 40;
let y_size = 30;
let pix_size = 12;
let edge_touch;
let self_touch;
let food;
let font_Nokia;
let HighScore = 0;
let count = 1;
let is_new_high_score = false;
let is_over = false;
let is_paused = false;
let vel;

function setup1() {
	snake = new Snake();
	is_over = false;
	count = 1;
	is_new_high_score = false;
	is_pause = false;
	food_pos();
}

function preload() {
	font_Nokia = loadFont('Assets/nokiafc22.ttf');
}

function setup() {
	createCanvas(x_size * pix_size, 1.1 * (y_size * pix_size));
	background(150, 204, 180);
	setup1();
}

function keyPressed() {
	if (key === ' ') {
		if (!is_over && !is_paused) {
			vel = snake.get_vel();
			snake.set_dir(0, 0);
			is_paused = true;
			is_over = false;
			show_pause_screen();
		} else if (!is_over && is_paused) {
			snake.set_dir(vel.x, vel.y);
			is_paused = false;
		}
	}
}

function keyPressed_custom() {
	if (!edge_touch) {
		if (keyCode === UP_ARROW) {
			snake.set_dir(0, -1);
		} else if (keyCode === DOWN_ARROW) {
			snake.set_dir(0, 1);
		} else if (keyCode === RIGHT_ARROW) {
			snake.set_dir(1, 0);
		} else if (keyCode === LEFT_ARROW) {
			snake.set_dir(-1, 0);
		}
	}
}

function show_pause_screen() {
	background(150, 204, 180);
	draw_base();
	push();
	translate(width / 2, height / 2.2);
	textSize(20);
	fill(0);
	textAlign(CENTER, CENTER);
	text('PAUSED', 0, 0);
	pop();

}

function draw_base() {
	background(150, 204, 158);
	textFont(font_Nokia);
	textSize(x_size / 2);
	fill(0, 0, 0);
	textAlign(LEFT, CENTER);
	text('HIGHSCORE ' + HighScore, 10, ((2.1 * height / 1.1) / 2) - pix_size / 4);
	textAlign(RIGHT);
	text('SCORE ' + snake.get_score(), width - 10, (((height / 1.1) + (height)) / 2) - pix_size / 4);
	fill(0);
	stroke(0);
	rect(0, 0, pix_size / 2, height);
	rect(0, 0, width, pix_size / 2);
	rect(0, height / 1.1 - pix_size / 2 + 1, width, pix_size / 2);
	rect(0, height - pix_size / 2 + 1, width, pix_size / 2);
	rect(width - pix_size / 2 + 1, 0, pix_size / 2 - 1, height);
}


function draw() {
	keyPressed_custom();

	if (is_paused) {
		show_pause_screen();
	} else {
		draw_base();
		food_show();
		frameRate(10);
		snake.show();

		if (edge_touch || self_touch || is_over) {
			is_over = true;
			if (snake.get_score() > HighScore) {
				draw_base();
				push();
				translate(width / 2, height / 2.2);
				textSize(20);
				fill(0);
				textAlign(CENTER, CENTER);
				text('NEW HIGHSCORE\nPRESS ENTER\nTO CONTINUE', 0, 0);
				pop();
				if (keyCode === ENTER) {
					HighScore = snake.get_score();
					setup1();
				}
			} else {
				draw_base();
				push();
				translate(width / 2, height / 2.2);
				textSize(20);
				fill(0);
				textAlign(CENTER, CENTER);
				text('GAME OVER\nPRESS ENTER\nTO CONTINUE', 0, 0);
				pop();
				if (keyCode === ENTER)
					setup1();
			}
		}
	}
}

function food_pos() {
	var food_x = ceil(random(x_size - 1));
	var food_y = ceil(random(y_size - 1));
	food = createVector(food_x, food_y);
	while (snake.food_pos_acc(food) == false) {
		food_x = floor(random(x_size));
		food_y = floor(random(y_size));
		food = createVector(food_x, food_y);
	}
}

function food_show() {
	fill(255, 0, 0);
	push();
	translate((food.x * pix_size) + floor(pix_size / 2), (food.y * pix_size) + floor(pix_size / 2))
	translate(-pix_size / 2, -pix_size / 2);
	var small_size = pix_size / 6;
	if (count <= 3) {
		fill(0);
		rect(small_size, -small_size, +2 * small_size, +2 * small_size);
		rect(small_size, -small_size, -2 * small_size, -2 * small_size);
		rect(small_size, -small_size, -2 * small_size, +2 * small_size);
		rect(-small_size, +small_size, -2 * small_size, -2 * small_size);
		rect(-small_size, +small_size, +2 * small_size, +2 * small_size);
		pop();
		count++;
	} else if (count > 3) {
		fill(0);
		rect(small_size, -small_size, +2 * small_size, -2 * small_size);
		rect(small_size, -small_size, -2 * small_size, +2 * small_size);
		rect(-small_size, -small_size, -2 * small_size, -2 * small_size);
		rect(-small_size, +small_size, -2 * small_size, +2 * small_size);
		rect(+small_size, +small_size, +2 * small_size, +2 * small_size);
		pop();
		count++;
		if (count == 6) {
			count = 0;
		}
	}
}