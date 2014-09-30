var Bullet = function(x,y, direction, gameboard){
	this.x = x;
	this.y = y;
	this.width = 5;
	this.height = 5;
	this.rotation = 0;
	var speed = 5;
	this.element = $("<img src=\"images/bullet.png\" class=\"bullet\">");
	this.xVelocity = Math.cos(direction / 57.2957795) * speed;
	this.yVelocity = Math.sin(direction / 57.2957795) * speed;
	this.gameboard = gameboard;
}

Bullet.prototype = new Sprite(); 

Bullet.prototype.remove = function(){
	this.element.remove();
	this.destroyed = true;
}

Bullet.prototype.outOfBounds = function(){
	this.remove();
}