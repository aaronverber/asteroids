var Sprite = function(){
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = 50;
	this.scale = 1;
	this.rotation = 0.001;
	this.xVelocity = 0;
	this.yVelocity = 0;
}

Sprite.prototype.render = function(gameboard){
	if(gameboard){
		gameboard.append(this.element);
	}
	this.element.css({
		"-webkit-transform":"translate("+this.x+"px,"+this.y+"px) scale("+this.scale+") rotate("+this.rotation+"deg)", 
		"-webkit-transform-origin":(this.width/2) + "px "+(this.height/2)+"px",
		width: this.width,
		height: this.height
	})
}

Sprite.prototype.update = function(){
	//var leftVelocity = Math.cos(this.direction / 57.2957795) * this.speed;
	//var topVelocity = Math.sin(this.direction / 57.2957795) * this.speed;
	var outOfBounds = false;
	var left = this.x+this.xVelocity;
	if (left > 500){
		left = -20;
		outOfBounds = true;
	}
	else if (left < -20){
		left = 500;
		outOfBounds = true;
	}
	var top = this.y+this.yVelocity;
	if (top > 500){
		top = -20;
		outOfBounds = true;
	}
	else if (top < -20){
		top = 500;
		outOfBounds = true;
	}
	this.x = left;
	this.y = top;
	this.render();
	if(outOfBounds && this.outOfBounds){
		this.outOfBounds();
	}
}

Sprite.prototype.hitTest = function(sprite){
	function intersectRect(r1, r2) {
	    return !(r2.left > r1.right || 
            r2.right < r1.left || 
            r2.top > r1.bottom ||
            r2.bottom < r1.top);
	}
	var r1 = {
		left:this.x, 
		right:this.x + this.width,
		top:this.y,
		bottom:this.y + this.height
	}
	var r2 = {
		left:sprite.x,
		right:sprite.x + sprite.width,
		top:sprite.y,
		bottom:sprite.y + sprite.height
	}
	return intersectRect(r1, r2);
}

Sprite.prototype.rotate = function(change){
	this.rotation += change;
	this.render();
}

// Sprite.prototype.move = function(speed){
// 	var leftVelocity = Math.cos((this.rotation-90) / 57.2957795) * speed;
// 	var topVelocity = Math.sin((this.rotation-90) / 57.2957795) * speed;
// 	this.x+=leftVelocity;
// 	this.y+=topVelocity;
// 	this.render();
// }

Sprite.prototype.accelerate = function(speed){
	this.xVelocity += Math.cos((this.rotation-90) / 57.2957795) * speed;
	this.yVelocity += Math.sin((this.rotation-90) / 57.2957795) * speed;
}

Sprite.prototype.brake = function(brakePower){
	if (this.xVelocity > 0){
		this.xVelocity -= brakePower;
		if (this.xVelocity < 0){
			this.xVelocity = 0;
		}
	}
	else if (this.xVelocity < 0){
		this.xVelocity += brakePower;
		if (this.xVelocity > 0){
			this.xVelocity = 0;
		}
	}

	if (this.yVelocity > 0){
		this.yVelocity -= brakePower;
		if (this.YVelocity < 0){
			this.YVelocity = 0;
		}
	}
	else if (this.yVelocity < 0){
		this.yVelocity += brakePower;
		if (this.yVelocity > 0){
			this.yVelocity = 0;
		}
	}
}