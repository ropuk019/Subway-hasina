class Obstacle {
  constructor(game) {
    this.game = game;
    this.width = Math.random() * (CONFIG.OBSTACLE_MAX_WIDTH - CONFIG.OBSTACLE_MIN_WIDTH) + CONFIG.OBSTACLE_MIN_WIDTH;
    this.height = Math.random() * (CONFIG.OBSTACLE_MAX_HEIGHT - CONFIG.OBSTACLE_MIN_HEIGHT) + CONFIG.OBSTACLE_MIN_HEIGHT;
    this.x = this.game.canvas.width;
    this.y = CONFIG.PLAYER_INITIAL_Y + CONFIG.PLAYER_HEIGHT - this.height;
    this.active = true;
    
    // Load random obstacle sprite
    const obstacleNumber = Math.floor(Math.random() * 3) + 1;
    this.image = new Image();
    this.image.src = `assets/images/obstacles/obstacle${obstacleNumber}.png`;
  }

  update() {
    this.x -= this.game.gameSpeed;
    if (this.x + this.width < 0) {
      this.active = false;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
