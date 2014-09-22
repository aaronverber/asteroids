$(function(){
	var asteroids = [];
	var bullets = [];
	var gameboard = $("#gameboard");
	for (var i = 0; i < 5; i++){
		asteroids.push(new Asteroid());
		asteroids[i].render(gameboard);
	}

	var acceleration = 1;
	var spaceship = new Spaceship();
	spaceship.render(gameboard);

	$(document).keydown(function(e) {
		if(spaceship.destroyed){
			return;
		}
	    switch(e.which) {
	    	case 32: // bullet
	    		spaceship.fireGuns();
	    	break;
	        case 37: // left
	        	spaceship.rotate(-10);
	        break;
	        case 38: // up
	        	spaceship.accelerate(acceleration);
	        break;

	        case 39: // right
	        	spaceship.rotate(10);
	        break;

	        case 40: // down
	        	spaceship.accelerate(-acceleration);
	        break;

	        case 16: // shift
	         	spaceship.brake(.1);
	         	console.log(spaceship.xVelocity);
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	setInterval(function(){
		_.each(asteroids, function(asteroid){
			asteroid.update();
			if (spaceship.hitTest(asteroid)){
				spaceship.damage(asteroid);
			}
			else{
				spaceship.nohit(asteroid);
			}
		});
		for (var i = 0; i < bullets.length; i++){
			var bullet = bullets[i];
			if(!bullet.destroyed){
				bullet.update();
				for (var j = 0; j < asteroids.length; j++){
					if(bullet.hitTest(asteroids[j])){
						spaceship.score += 100;
						var newAsteroids = asteroids[j].explode();
						for (var k = 0; k < newAsteroids.length; k++){
							newAsteroids[k].render(gameboard);
							asteroids.push(newAsteroids[k]);
						}
						bullet.remove();
						break;
					}
				}
			} else{
				bullet.remove();
			}
		}
		bullets = _.filter(bullets, function(bullet){
			return !bullet.destroyed;
		});
		asteroids = _.filter(asteroids, function(asteroid){
			return !asteroid.destroyed;
		});
		spaceship.update();
	}, 16)
});