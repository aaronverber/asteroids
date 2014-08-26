var Bullet = function(x,y, direction){
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.speed = 5;
	this.element = $("<div class=\"bullet\"></div>");
}

Bullet.prototype.render = function(gameboard){
	gameboard.append(this.element);
	this.element.css({
		left: this.x,
		top: this.y
	})
}

Bullet.prototype.update = function(){
	var leftVelocity = Math.cos(this.direction / 57.2957795) * this.speed;
	var topVelocity = Math.sin(this.direction / 57.2957795) * this.speed;
	var left = this.element.position().left+leftVelocity;
	if (left > 500){
		this.destroyed = true;
	}
	else if (left < -20){
		this.destroyed = true;
	}
	var top = this.element.position().top+topVelocity;
	if (top > 500){
		this.destroyed = true;
	}
	else if (top < -20){
		this.destroyed = true;
	}
	this.x = left;
	this.y = top;
	this.element.css({
		left: left,
		top: top,
	});
}

Bullet.prototype.remove = function(){
	this.element.remove();
	this.destroyed = true;
}

Bullet.prototype.hits = hits;