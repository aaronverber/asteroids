var Bullet = function(x,y, direction){
	this.x = x;
	this.y = y;
	this.width = 5;
	this.height = 5;
	this.direction = direction;
	this.speed = 5;
	this.element = $("<div class=\"bullet\"></div>");
}

Bullet.prototype = new Sprite(); 

Bullet.prototype.remove = function(){
	this.element.remove();
	this.destroyed = true;
}