var Sprite = function(){
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = 50;
	this.scale = 1;
	this.speed = 0;
	this.direction = 0;
	this.rotation = 0.001;
}

Sprite.prototype.render = function(gameboard){
	if(gameboard){
		gameboard.append(this.element);
	}
	this.element.css({
		"-webkit-transform":"translate("+this.x+"px,"+this.y+"px) scale("+this.scale+") rotate("+this.rotation+"deg)", 
		"-webkit-transform-origin":(this.width/2) + "px "+(this.height/2)+"px"
	})
}

Sprite.prototype.update = function(){
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
	this.render();
}

Sprite.prototype.hitTest = function(sprite){
	var thisLeft = this.x;
	var thisRight = this.x + this.width;
	var thisTop = this.y;
	var thisBottom = this.y + this.height;

	var spriteLeft = sprite.x;
	var spriteRight = sprite.x + sprite.width;
	var spriteTop = sprite.y;
	var spriteBottom = sprite.y + sprite.height;

	var hitLeft = thisLeft > spriteLeft && thisLeft < spriteRight;
	var hitRight = thisRight > spriteLeft && thisRight < spriteRight;

	var hitTop = thisTop > spriteTop && thisTop < spriteBottom;
	var hitBottom = thisBottom > spriteTop && thisBottom < spriteBottom;

	return (hitLeft || hitRight) && (hitTop || hitBottom);
}

Sprite.prototype.rotate = function(change){
	this.rotation += change;
	this.render();
}

Sprite.prototype.move = function(speed){
	var leftVelocity = Math.cos((this.rotation-90) / 57.2957795) * speed;
	var topVelocity = Math.sin((this.rotation-90) / 57.2957795) * speed;
	this.x+=leftVelocity;
	this.y+=topVelocity;
	this.render();
}