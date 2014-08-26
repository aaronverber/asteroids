function hits(sprite){
	var hitX = this.x > sprite.x && this.x < (sprite.x + sprite.width);
	var hitY = this.y > sprite.y && this.y < (sprite.y + sprite.width);
	return hitX && hitY;
}