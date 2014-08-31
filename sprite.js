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
		"-webkit-transform-origin":"25px 25px"
	})
}

Sprite.prototype.update = function(){
	if(this.x > 500){
		this.x = -20;
	}
	else if(this.x < -20){
		this.x = 500;
	}
	if(this.y > 500){
		this.y = -20;
	}
	else if(this.y < -20){
		this.y = 500;
	}
}

Sprite.prototype.hitTest = function(other){

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