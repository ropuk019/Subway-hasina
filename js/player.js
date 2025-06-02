class Player {
  constructor(game) {
    this.game = game;
    this.width = CONFIG.PLAYER_WIDTH;
    this.height = CONFIG.PLAYER_HEIGHT;
    this.x = CONFIG.PLAYER_INITIAL_X;
    this.y = CONFIG.PLAYER_INITIAL_Y;
    this.vy = 0;
    this.weight = 1;
    this.isJumping = false;
    this.isSliding = false;
    this.hasShield = false;
    
    // Animation properties
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 3;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000/this.fps;
    
    // Load sprites
    this.sprites = {
      idle: this.loadImage('idle'),
      run: Array.from({length: 4}, (_, i) => this.loadImage(`run${i + 1}`)),
      jump: this.loadImage('jump'),
      slide: this.loadImage('slide')
    };
    this.currentSprite = this.sprites.idle;
  }

  loadImage(name) {
    const image = new Image();
    image.src = `assets/images/hasina/${name}.png`;
    return image;
  }

  update() {
    // Vertical movement
    if (this.isJumping) {
      this.y += this.vy;
      this.vy += CONFIG.GRAVITY;
      
      if (this.y > CONFIG.PLAYER_INITIAL_Y) {
        this.y = CONFIG.PLAYER_INITIAL_Y;
        this.vy = 0;
        this.isJumping = false;
      }
    }
    
    // Animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += 16; // Approximately 60 FPS
    }
    
    // Update sprite based on state
    if (this.isJumping) {
      this.currentSprite = this.sprites.jump;
    } else if (this.isSliding) {
      this.currentSprite = this.sprites.slide;
    } else {
      this.currentSprite = this.sprites.run[this.frameX];
    }
  }

  draw(ctx) {
    if (this.hasShield) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 2;
      ctx.arc(this.x + this.width/2, this.y + this.height/2, 
              Math.max(this.width, this.height)/1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    
    ctx.drawImage(this.currentSprite, this.x, this.y, this.width, this.height);
  }

  jump() {
    if (!this.isJumping && !this.isSliding) {
      this.isJumping = true;
      this.vy = CONFIG.JUMP_FORCE;
      const audio = new Audio(CONFIG.SOUND_EFFECTS.jump);
      audio.play();
    }
  }

  slide() {
    if (!this.isSliding && !this.isJumping) {
      this.isSliding = true;
      const audio = new Audio(CONFIG.SOUND_EFFECTS.slide);
      audio.play();
      
      setTimeout(() => {
        this.isSliding = false;
      }, 1000);
    }
  }

  setShield(duration) {
    this.hasShield = true;
    setTimeout(() => {
      this.hasShield = false;
    }, duration);
  }

  checkCollision(obstacle) {
    const adjustedHeight = this.isSliding ? this.height * 0.5 : this.height;
    const adjustedY = this.isSliding ? this.y + this.height * 0.5 : this.y;
    
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      adjustedY < obstacle.y + obstacle.height &&
      adjustedY + adjustedHeight > obstacle.y
    );
  }

  reset() {
    this.y = CONFIG.PLAYER_INITIAL_Y;
    this.vy = 0;
    this.isJumping = false;
    this.isSliding = false;
    this.hasShield = false;
  }
}