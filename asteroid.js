var Asteroid = function(){
	this.x = Math.round(Math.random()*500);
	this.y = Math.round(Math.random()*500);
	this.speed = Math.round(Math.random()*2);
	this.direction = Math.round(Math.random()*360);
	this.element = $("<img src=\"images/asteroid.png\" class=\"asteroid\">");
};

Asteroid.prototype.render = function(gameboard){
	gameboard.append(this.element);
	this.element.css({
		left:this.x,
		top:this.y
	})
};

Asteroid.prototype.update = function(){
	var leftVelocity = Math.cos(this.direction / 57.2957795) * this.speed;
	var topVelocity = Math.sin(this.direction / 57.2957795) * this.speed;
	var left = this.element.position().left+leftVelocity;
	if (left > 500){
		left = -20;
	}
	else if (left < -20){
		left = 500;
	}
	var top = this.element.position().top+topVelocity;
	if (top > 500){
		top = -20;
	}
	else if (top < -20){
		top = 500;
	}
	this.element.css({
		left: left,
		top: top,
	});
};