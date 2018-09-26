let Score_now;
class Snake {
  constructor() {
    this.x_pos_grid = floor(x_size / 2);
    this.y_pos_grid = floor(y_size / 2);
    this.x_speed = 0;
    this.y_speed = 0;
    this.history = [];
    this.len = 0;
    edge_touch=false;
    self_touch=false;
  }
  food_pos_acc(food) {
    if (food.x == this.x_pos_grid && food.y == this.y_pos_grid) {
      return false;
    }
    if (this.history.length != 0) {
      for (var i = 0; i < this.history.length; i++) {
        var pos = this.history[i];
        if (food.x == pos.x && food.y == pos.y) {
          return false;
        }
      }
    }
  }
  eat_food(food) {
    if ((food.x == this.x_pos_grid) && (food.y == this.y_pos_grid)) {
      food_pos();
      (this.len) ++;
    }
  }
  set_dir(x, y) {
    if(this.len<=1)
    {
    this.x_speed = x;
    this.y_speed = y;
    }
    else
		{
      if(!(this.x_speed*x==-1 || this.y_speed*y==-1))
      {
        this.x_speed=x;
        this.y_speed=y;
      }
    }
  }
  get_score() {
    return this.len;
  }
	get_vel()
	{
		return createVector(this.x_speed,this.y_speed);
	}
  update() {
    this.x_pos_grid += this.x_speed;
    this.y_pos_grid += this.y_speed;
  }
  self_check() {
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      if (this.x_pos_grid == pos.x && this.y_pos_grid == pos.y) {
        self_touch = true;
      }
    }
  }
  edge_touch_func() {
    if (this.x_pos_grid > x_size - 1) {
      edge_touch = true;
    } else if (this.x_pos_grid <= 0) {
      edge_touch = true;
    }
    if (this.y_pos_grid > y_size - 1) {
      edge_touch = true;
    } else if (this.y_pos_grid <= 0) {
      edge_touch = true;
    }
  }
  show() {
		this.update();
    this.edge_touch_func();
    this.eat_food(food);
    this.self_check();
    var i;
    if (this.history.length == this.len && this.len != 0) {
      if (this.len == 1) {
        this.history[this.len - 1] = createVector(this.x_pos_grid, this.y_pos_grid);
      } else if (this.len > 1) {
        for (i = 0; i < this.history.length; i++) {
          this.history[i] = this.history[i + 1];
        }
        this.history[this.len - 1] = createVector(this.x_pos_grid, this.y_pos_grid);
      }
    } else {
      this.history[this.len - 1] = createVector(this.x_pos_grid, this.y_pos_grid);
    }

    fill(0);
    for (i = 0; i < this.history.length; i++) {
      push();
      strokeWeight(1);
      stroke(150, 204, 158);
      translate((this.history[i].x * pix_size) + floor(pix_size / 2), (this.history[i].y * pix_size) + floor(pix_size / 2));
      rect(-(pix_size), -(pix_size), (pix_size), (pix_size), 4);
      pop();
    }
    strokeWeight(0);
    push();
    translate((this.x_pos_grid * pix_size) + floor(pix_size / 2), (this.y_pos_grid * pix_size) + floor(pix_size / 2));
    rect(-(pix_size), -(pix_size), (pix_size), (pix_size), 4);
    pop();
  }
}