var Bullet = function(x,y, direction){
	this.x = x;
	this.y = y;
	this.width = 5;
	this.height = 5;
	var speed = 5;
	this.element = $("<div class=\"bullet\"></div>");
	this.xVelocity = Math.cos(direction / 57.2957795) * speed;
	this.yVelocity = Math.sin(direction / 57.2957795) * speed;
}

Bullet.prototype = new Sprite(); 

Bullet.prototype.remove = function(){
	this.element.remove();
	this.destroyed = true;
}

Bullet.prototype.outOfBounds = function(){
	this.remove();
}