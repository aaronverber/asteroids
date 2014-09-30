var Asteroid = function(gameboard){
	this.x = Math.round(Math.random()*gameboard.width);
	this.y = Math.round(Math.random()*gameboard.height);
	this.xVelocity = Math.round(Math.random()*2-1);
	this.yVelocity = Math.round(Math.random()*2-1);
	this.rotationSpeed = Math.random()*4-2;
	this.element = $("<img src=\"images/newasteroid.png\" class=\"asteroid\">");
	this.gameboard = gameboard;
};

Asteroid.prototype = new Sprite();

Asteroid.prototype.update = function(){
	this.rotation += this.rotationSpeed;
	Sprite.prototype.update.call(this);
}

Asteroid.prototype.explode = function(){
	this.element.remove();
	this.destroyed = true;
	if (this.width <= 15){
		return [];
	}
	var childAsteroids = [];
	for (var i = 0; i < 3; i++){
		var asteroid = new Asteroid(this.gameboard);
		asteroid.x = this.x;
		asteroid.y = this.y;
		asteroid.scale = 1;
		asteroid.width = this.width / 2;
		asteroid.height = this.height / 2;
		childAsteroids.push(asteroid);
	}
	return childAsteroids;
};