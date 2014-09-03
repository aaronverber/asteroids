var Asteroid = function(){
	this.x = Math.round(Math.random()*500);
	this.y = Math.round(Math.random()*500);
	this.speed = Math.round(Math.random()*2);
	this.direction = Math.round(Math.random()*360);
	this.element = $("<img src=\"images/asteroid.png\" class=\"asteroid\">");
};

Asteroid.prototype = new Sprite;

Asteroid.prototype.explode = function(){
	this.element.remove();
	this.destroyed = true;
	if (this.width <= 15){
		return [];
	}
	var childAsteroids = [];
	for (var i = 0; i < 3; i++){
		var asteroid = new Asteroid();
		asteroid.x = this.x;
		asteroid.y = this.y;
		asteroid.scale = 1;
		asteroid.width = this.width / 2;
		asteroid.height = this.height / 2;
		console.log(asteroid.width);
		childAsteroids.push(asteroid);
	}
	return childAsteroids;
};