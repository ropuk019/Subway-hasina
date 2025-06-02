class Coin {
  constructor(game) {
    this.game = game;
    this.width = CONFIG.COIN_WIDTH;
    this.height = CONFIG.COIN_HEIGHT;
    this.x = this.game.canvas.width;
    this.y = Math.random() * (this.game.canvas.height - 100) + 50;
    this.active = true;
    
    this.image = new Image();
    this.image.src = 'assets/images/coin.png';
  }

  update() {
    this.x -= this.game.gameSpeed;
    if (this.x + this.width < 0) {
      this.active = false;
    }

    if (this.checkCollision()) {
      this.collect();
    }
  }

  draw(ctx) {
    if (!this.active) return;
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

  collect() {
    if (!this.active) return;
    this.active = false;
    this.game.addScore(CONFIG.COIN_VALUE);
    const audio = new Audio(CONFIG.SOUND_EFFECTS.coin);
    audio.play();
    this.game.createParticleEffect(this.x, this.y, '#FFD700');
  }
}