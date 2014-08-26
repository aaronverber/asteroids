var Asteroid = function(){
	this.x = Math.round(Math.random()*500);
	this.y = Math.round(Math.random()*500);
	this.width = 50;
	this.height = 50;
	this.scale = 1;
	this.speed = Math.round(Math.random()*2);
	this.direction = Math.round(Math.random()*360);
	this.element = $("<img src=\"images/asteroid.png\" class=\"asteroid\">");
};

Asteroid.prototype.render = function(gameboard){
	gameboard.append(this.element);
	this.element.css({
		"-webkit-transform":"translate("+this.x+"px,"+this.y+"px) scale("+this.scale+")", 
		"-webkit-transform-origin":"25px 25px"
	})
};

Asteroid.prototype.update = function(){
	var leftVelocity = Math.cos(this.direction / 57.2957795) * this.speed;
	var topVelocity = Math.sin(this.direction / 57.2957795) * this.speed;
	var left = this.x+leftVelocity;
	if (left > 500){
		left = -20;
	}
	else if (left < -20){
		left = 500;
	}
	var top = this.y+topVelocity;
	if (top > 500){
		top = -20;
	}
	else if (top < -20){
		top = 500;
	}
	this.x = left;
	this.y = top;
	this.element.css({
		"-webkit-transform":"translate("+this.x+"px,"+this.y+"px) scale("+this.scale+")", 
	});
};

Asteroid.prototype.explode = function(){
	this.element.remove();
	this.destroyed = true;
	if (this.scale <= .25){
		return [];
	}
	var childAsteroids = [];
	for (var i = 0; i < 3; i++){
		var asteroid = new Asteroid();
		asteroid.x = this.x;
		asteroid.y = this.y;
		asteroid.scale = this.scale / 2;
		childAsteroids.push(asteroid);
	}
	return childAsteroids;
};

Asteroid.prototype.hits = hits;