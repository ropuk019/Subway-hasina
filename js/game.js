class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
    this.gameSpeed = CONFIG.GAME_SPEED_INITIAL;
    this.lastTime = 0;
    this.timeElapsed = 0;
    
    // Initialize systems
    this.player = new Player(this);
    this.obstacles = [];
    this.coins = [];
    this.particles = new ParticleSystem(this);
    this.background = new Background(this);
    
    this.bindControls();
  }

  start() {
    this.running = true;
    this.score = 0;
    this.gameSpeed = CONFIG.GAME_SPEED_INITIAL;
    this.obstacles = [];
    this.coins = [];
    this.timeElapsed = 0;
    this.player.reset();
    this.gameLoop(performance.now());
  }

  gameLoop(timestamp) {
    if (!this.running) return;
    
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.timeElapsed += deltaTime;
    
    this.update(deltaTime);
    this.draw();
    requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  update(deltaTime) {
    this.gameSpeed += CONFIG.GAME_SPEED_INCREMENT;
    this.score += CONFIG.SCORE_INCREMENT * this.gameSpeed;
    
    this.player.update(deltaTime);
    this.background.update(deltaTime);
    this.particles.update();
    
    // Update and filter obstacles
    this.obstacles = this.obstacles.filter(obstacle => obstacle.active);
    this.obstacles.forEach(obstacle => obstacle.update());
    
    // Update and filter coins
    this.coins = this.coins.filter(coin => coin.active);
    this.coins.forEach(coin => coin.update());
    
    // Spawn new obstacles
    if (this.shouldSpawnObstacle()) {
      this.spawnObstacle();
      if (Math.random() < CONFIG.COIN_SPAWN_CHANCE) {
        this.spawnCoin();
      }
    }
    
    this.checkCollisions();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.background.draw(this.ctx);
    this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
    this.coins.forEach(coin => coin.draw(this.ctx));
    this.player.draw(this.ctx);
    this.particles.draw(this.ctx);
    
    this.drawHUD();
  }

  drawHUD() {
    this.ctx.fillStyle = '#FFD700';
    this.ctx.font = '24px "Press Start 2P"';
    this.ctx.fillText(`Score: ${Math.floor(this.score)}`, 20, 40);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px "Press Start 2P"';
    this.ctx.fillText(`High Score: ${Math.floor(this.highScore)}`, this.canvas.width - 300, 40);
  }

  addScore(points) {
    this.score += points;
    // Create score popup effect
    const scoreElement = document.getElementById('score');
    scoreElement.classList.remove('score-popup');
    void scoreElement.offsetWidth; // Trigger reflow
    scoreElement.classList.add('score-popup');
  }

  spawnObstacle() {
    const obstacle = new Obstacle(this);
    this.obstacles.push(obstacle);
  }

  spawnCoin() {
    const coin = new Coin(this);
    this.coins.push(coin);
  }

  shouldSpawnObstacle() {
    return this.obstacles.length === 0 || 
           this.obstacles[this.obstacles.length - 1].x < 
           this.canvas.width - CONFIG.OBSTACLE_MIN_SPACING;
  }

  checkCollisions() {
    for (const obstacle of this.obstacles) {
      if (this.player.checkCollision(obstacle)) {
        this.gameOver();
        break;
      }
    }
  }

  gameOver() {
    this.running = false;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }
    
    const audio = new Audio(CONFIG.SOUND_EFFECTS.gameOver);
    audio.play();
    
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Score: ${Math.floor(this.score)}`;
    
    if (this.score > this.highScore) {
      document.getElementById('new-high-score').classList.remove('hidden');
    }
  }

  bindControls() {
    const jumpButton = document.getElementById('jump-button');
    const slideButton = document.getElementById('slide-button');
    
    // Touch controls
    jumpButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.player.jump();
    });
    
    slideButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.player.slide();
    });
    
    // Keyboard controls
    document.addEventListener('keydown', (event) => {
      switch(event.code) {
        case 'Space':
        case 'ArrowUp':
          event.preventDefault();
          this.player.jump();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.player.slide();
          break;
      }
    });
  }
}