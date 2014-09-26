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
	this.shields = 0;
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
	playerStats.append($("<div id=\"score\"><p>Score: "+this.score+"</p></div>"));
}

Spaceship.prototype.update = function(){
	Sprite.prototype.update.call(this);
	if(this.draining && timeElapsed(this.lastDrain, 1)){
		this.shields -= 1;
		this.lastDrain = getNow(); //set last drain to now
		if(this.shields == 0){
			this.draining = false;
		}
	}
	console.log(this.shields);
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

Spaceship.prototype.clearEngines = _.debounce(function(){
	this.element.attr('src',"images/spaceshipbase.png");
}, 200);

Spaceship.prototype.fireEngines = function(){
	this.clearEngines();
	this.element.attr('src',"images/spaceshipbaseengines.png");
}

Spaceship.prototype.shieldsUp = function(){
	this.shields = 10;
	this.draining = true;

}
