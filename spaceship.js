var Spaceship = function(){
	this.x = 0;
	this.y = 0;
	this.height = 50;
	this.width = 50;
	this.rotation = 0;
	this.health = 3;
	this.element = $("<img src=\"images/spaceship.png\" id=\"spaceship\">");
}

Spaceship.prototype.render = function(gameboard){
	gameboard.append(this.element);
	var playerStats = $("#player-stats");
	for (var i = 0; i < this.health; i++){
		playerStats.append($('<img class="heart" src="./images/heart.png">'));
	}
}
	
Spaceship.prototype.update = function(){
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

Spaceship.prototype.setTransform = function(){
	var x = this.x;
	var y = this.y;
	var rotation = this.rotation;
	this.element.css({
		"-webkit-transform":"translate("+x+"px,"+y+"px) rotate("+rotation+"deg)", 
		"-webkit-transform-origin":"25px 25px"
	});
}

Spaceship.prototype.rotate = function(change){
	this.rotation += change;
	this.setTransform();
}

Spaceship.prototype.move = function(speed){
	var leftVelocity = Math.cos((this.rotation-90) / 57.2957795) * speed;
	var topVelocity = Math.sin((this.rotation-90) / 57.2957795) * speed;
	this.x+=leftVelocity;
	this.y+=topVelocity;
	this.setTransform();
}

Spaceship.prototype.damage = function(){
	console.log("damage!")
}