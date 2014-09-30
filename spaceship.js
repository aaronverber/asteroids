function getNow(){
	return new Date();
}

function timePlusSeconds(date, seconds){
	var t = new Date(date.getTime());
	t.setSeconds(t.getSeconds() + seconds);
	return t;
}

function timeElapsed(start, difference){
	return getNow().getTime() > timePlusSeconds(start, difference);
}

var Spaceship = function(gameState, gameboard){
	this.health = 10;
	this.element = $("<img src=\"images/spaceshipbase.png\" id=\"spaceship\">");
	this.hitters = [];
	this.score = 0;
	this.shieldTimer = 0;
	this.shieldUses = 3;
	this.lastDrain = new Date();
	this.gameState = gameState;
	this.gameboard = gameboard;
	this.x = gameboard.width / 2;
	this.y = gameboard.height / 2;
}

Spaceship.prototype = new Sprite();

Spaceship.prototype.render = function(gameboard){
	Sprite.prototype.render.call(this, gameboard);
	var playerStats = $("#player-stats");
	playerStats.empty();
	for (var i = 0; i < this.health; i++){
		playerStats.append($('<img class="heart" src="./images/heart.png">'));
	}
	for (var i = 0; i < this.shieldUses; i++){
		playerStats.append($('<img class="shield" src="./images/shield.png">'));
	}
	playerStats.append($("<div id=\"score\"><p>Score: "+this.score+"</p></div>"));
}

Spaceship.prototype.update = function(){
	Sprite.prototype.update.call(this);
	if(this.draining && timeElapsed(this.lastDrain, 1)){
		this.shieldTimer -= 1;
		this.lastDrain = getNow(); //set last drain to now
		if(this.shieldTimer == 0){
			this.draining = false;
			this.element.attr('src',"images/spaceshipbase.png");
		}
	}
}
	

Spaceship.prototype.clearDamage = _.debounce(function(){
	this.element.attr('src',"images/spaceshipbase.png");
}, 100);

Spaceship.prototype.damage = function(asteroid){
	if(_.contains(this.hitters, asteroid)){
		return;
	}
	this.hitters.push(asteroid);
	var self = this;
	if(this.shieldTimer == 0){
		this.clearDamage();
		this.element.attr('src',"images/spaceshipbasedamage.png");
		this.health -= 1;
	}
	else{
		return;
	}
	if(this.health == 0){
		this.destroyed = true;
		this.element.remove();
	}
}

Spaceship.prototype.nohit = function(asteroid){
	this.hitters = _.filter(this.hitters, function(hitter){
		return hitter != asteroid;
	});
}

Spaceship.prototype.fireBullet = function(){
	var bulletOriginRotation = this.rotation * Math.PI / 180;
	var bulletOriginCenterX = this.x + (this.width/2) - 3;
	var bulletOriginCenterY = this.y + (this.height/2) - 2;
	var bulletOriginOffsetY = this.y;
	var bulletOriginX = bulletOriginCenterX + Math.cos(bulletOriginRotation) * (bulletOriginCenterX - bulletOriginCenterX) - Math.sin(bulletOriginRotation) * (bulletOriginOffsetY - bulletOriginCenterY);
	var bulletOriginY = bulletOriginCenterY + Math.sin(bulletOriginRotation) * (bulletOriginCenterX - bulletOriginCenterX) + Math.cos(bulletOriginRotation) * (bulletOriginOffsetY - bulletOriginCenterY);
	console.log(bulletOriginX);
	var bullet = new Bullet(bulletOriginX, bulletOriginY, this.rotation-90, this.gameboard);
	this.gameState.bullets.push(bullet);
	bullet.render();
}

Spaceship.prototype.clearEngines = _.debounce(function(){
	this.element.attr('src',"images/spaceshipbase.png");
}, 200);

Spaceship.prototype.clearShieldEngines = _.debounce(function(){
	this.element.attr('src',"images/spaceshipbaseshields.png");
}, 200);

Spaceship.prototype.fireEngines = function(){
	if(this.draining == true){
		this.clearShieldEngines();
		this.element.attr('src',"images/spaceshipbaseshieldsengines.png")
	}
	else{
		this.clearEngines();
		this.element.attr('src',"images/spaceshipbaseengines.png");
	}

}

Spaceship.prototype.shieldsUp = function(){
	if(this.shieldUses > 0){
		this.shieldTimer = 6;
		this.draining = true;
		this.shieldUses -= 1;
	}
	else{
		return;
	}
	if(this.draining == true){
		this.element.attr('src',"images/spaceshipbaseshields.png");
	}
	else{
		return;
	}
}
