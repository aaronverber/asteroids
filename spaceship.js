var Spaceship = function(){
	this.health = 3;
	this.element = $("<img src=\"images/newspaceship.png\" id=\"spaceship\">");
}

Spaceship.prototype = new Sprite();

// Spaceship.prototype.render = function(gameboard){
// 	gameboard.append(this.element);
// 	var playerStats = $("#player-stats");
// 	for (var i = 0; i < this.health; i++){
// 		playerStats.append($('<img class="heart" src="./images/heart.png">'));
// 	}
// }
	

Spaceship.prototype.clearDamage = _.debounce(function(){
	this.element.css({background: 'transparent'});
}, 100);


Spaceship.prototype.damage = function(){
	var self = this;
	this.element.css({
		background: 'red'
	});
	this.clearDamage();
	console.log("damage!")
}