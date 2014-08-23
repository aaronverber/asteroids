$(function(){
	var asteroids = [];
	var bullets = [];
	var gameboard = $("#gameboard");
	for (var i = 0; i < 5; i++){
		asteroids.push(new Asteroid());
		asteroids[i].render(gameboard);
	}

	var spaceship = new Spaceship();
	spaceship.render(gameboard);
	

	$(document).keydown(function(e) {
	    switch(e.which) {
	    	case 32: // bullet
	    		var bullet = new Bullet(spaceship.x, spaceship.y, spaceship.rotation-90);
	    		bullet.render(gameboard);
	    		bullets.push(bullet);
	    	break;
	        case 37: // left
	        	spaceship.rotate(-10);
	        break;
	        case 38: // up
	        	spaceship.move(5);
	        break;

	        case 39: // right
	        	spaceship.rotate(10);
	        break;

	        case 40: // down
	        	spaceship.move(-5);
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	setInterval(function(){
		for (var i = 0; i < asteroids.length; i++){
			asteroids[i].update();	
		}
		for (var i = 0; i < bullets.length; i++){
			var bullet = bullets[i];
			if(!bullet.destroyed){
				bullet.update();
			} else{
				bullet.remove();
			}
		}
		bullets = _.filter(bullets, function(bullet){
			return !bullet.destroyed;
		});
		spaceship.update();
	}, 16)
});