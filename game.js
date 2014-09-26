$(function(){
	var asteroids = [];
	var state = {
		bullets: []
	};

	var game = $("#game");
	var gameboard = new Gameboard();
	gameboard.render(game);
	console.log(gameboard.width);

	for (var i = 0; i < Math.floor(((gameboard.width / gameboard.height)*5) + gameboard.height / 100); i++){
		asteroids.push(new Asteroid(gameboard));
		asteroids[i].render();
	}

	var acceleration = 1;
	var spaceship = new Spaceship(state, gameboard);
	spaceship.render();

	$(document).keydown(function(e) {
		if(spaceship.destroyed){
			return;
		}
	    switch(e.which) {
	    	case 32: // bullet
				spaceship.fireBullet(gameboard);
		    break;
	        case 37: // left
	        	spaceship.rotate(-10);
	        break;
	        case 38: // up
	        	spaceship.accelerate(acceleration);
	        	spaceship.fireEngines();
	        break;

	        case 39: // right
	        	spaceship.rotate(10);
	        break;

	        case 40: // down
	        	spaceship.accelerate(-acceleration);
	        break;

	        case 16: // shift
	         	spaceship.brake(.1);
	        break;

	        case 17: // shields up, captain?
	        	spaceship.shieldsUp();
	        break;

	        default: return; // exit this handler for other keys
	    }
	    e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	setInterval(function(){
		_.each(asteroids, function(asteroid){
			asteroid.update();
			if (spaceship.hitTest(asteroid)){
				if(spaceship.shields > 0){
					return;
				}
				else{
					spaceship.damage(asteroid);
					console.log("damage check works");
				};
			}
			else{
				spaceship.nohit(asteroid);
			}
		});
		
		for (var i = 0; i < state.bullets.length; i++){
			var bullet = state.bullets[i];
			if(!bullet.destroyed){
				bullet.update();
				for (var j = 0; j < asteroids.length; j++){
					if(bullet.hitTest(asteroids[j])){
						spaceship.score += 100;
						var newAsteroids = asteroids[j].explode();
						for (var k = 0; k < newAsteroids.length; k++){
							newAsteroids[k].render();
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

		state.bullets = _.filter(state.bullets, function(bullet){
			return !bullet.destroyed;
		});
		asteroids = _.filter(asteroids, function(asteroid){
			return !asteroid.destroyed;
		});
		spaceship.update();
	}, 16)
});