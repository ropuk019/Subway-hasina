class PowerUp {
  constructor(game, type) {
    this.game = game;
    this.type = type;
    this.width = 30;
    this.height = 30;
    this.x = this.game.canvas.width;
    this.y = Math.random() * (this.game.canvas.height - 100);
    this.speed = CONFIG.GAME_SPEED_INITIAL;
    this.active = true;
    this.collected = false;
    
    // Load power-up image
    this.image = new Image();
    this.image.src = `assets/images/powerups/${type}.png`;
  }

  update() {
    if (!this.active) return;
    this.x -= this.speed;
    
    // Check if power-up is off screen
    if (this.x + this.width < 0) {
      this.active = false;
    }
    
    // Check collision with player
    if (this.checkCollision() && !this.collected) {
      this.collected = true;
      this.applyEffect();
    }
  }

  draw(ctx) {
    if (!this.active || this.collected) return;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkCollision() {
    return (
      this.x < this.game.player.x + this.game.player.width &&
      this.x + this.width > this.game.player.x &&
      this.y < this.game.player.y + this.game.player.height &&
      this.y + this.height > this.game.player.y
    );
  }

  applyEffect() {
    const audio = new Audio(CONFIG.SOUND_EFFECTS.powerup);
    audio.play();
    
    switch(this.type) {
      case 'shield':
        this.game.player.setShield(CONFIG.POWERUP_DURATION);
        break;
      case 'doublePoints':
        this.game.setScoreMultiplier(2, CONFIG.POWERUP_DURATION);
        break;
      case 'slowMotion':
        this.game.setSlowMotion(CONFIG.POWERUP_DURATION);
        break;
    }
    
    // Create particle effect
    this.game.createParticleEffect(this.x, this.y);
  }
}