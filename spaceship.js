var Spaceship = function(gameState, gameboard){
	this.health = 10;
	this.element = $("<img src=\"images/spaceshipbase.png\" id=\"spaceship\">");
	this.hitters = [];
	this.score = 0;
	this.gameState = gameState;
	this.gameboard = gameboard;
}

Spaceship.prototype = new Sprite();

Spaceship.prototype.render = function(gameboard){
	Sprite.prototype.render.call(this, gameboard);
	var playerStats = $("#player-stats");
	playerStats.empty();
	for (var i = 0; i < this.health; i++){
		playerStats.append($('<img class="heart" src="./images/heart.png">'));
	}
	playerStats.append($("<div id=\"score\"><p>Score: "+this.score+"</p></div>"));
}

Spaceship.prototype.update = function(){
	Sprite.prototype.update.call(this);
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
	this.clearDamage();
	this.element.attr('src',"images/spaceshipbasedamage.png");
	this.health -= 1;
	console.log(this.health);
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
	var bullet = new Bullet(this.x + (this.width/2), this.y - 7, this.rotation-90, this.gameboard);
	this.gameState.bullets.push(bullet);
	bullet.render();
}