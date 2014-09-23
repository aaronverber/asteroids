var Gameboard = function(){
	this.height = $(window).innerHeight() - 100;
	this.width = $(window).innerWidth() - 100;
	this.element = $("<div id=\"gameboard\"></div>");
}

Gameboard.prototype.render = function(game){
	if(game){
		game.append(this.element);
	}
	if(this.width > 1820){
		this.element.css({
			width: 1820 + "px"
		})
	}
	else {
		this.element.css({
			width: this.width + "px"
		})
	}

	if(this.height > 980){
		this.element.css({
			height: 980 + "px"
		})
	}
	else {
		this.element.css({
			height: this.height + "px"
		})
	}
}