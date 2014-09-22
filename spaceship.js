var Spaceship = function(){
	this.health = 10;
	this.element = $("<img src=\"images/newspaceship.png\" id=\"spaceship\">");
	this.hitters = [];
	this.score = 0;
}

Spaceship.prototype = new Sprite();

Spaceship.prototype.render = function(gameboard){
	Sprite.prototype.render.call(this, gameboard);
	var playerStats = $("#player-stats");
	playerStats.empty();
	for (var i = 0; i < this.health; i++){
		playerStats.append($('<img class="heart" src="./images/heart.png">'));
	}
	playerStats.append($("<p>Score: "+this.score+"</p>"));
}
	

Spaceship.prototype.clearDamage = _.debounce(function(){
	this.element.css({background: 'transparent'});
}, 100);


Spaceship.prototype.damage = function(asteroid){
	if(_.contains(this.hitters, asteroid)){
		return;
	}
	this.hitters.push(asteroid);
	var self = this;
	this.element.css({
		background: 'red'
	});
	this.clearDamage();
	console.log("damage!");
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