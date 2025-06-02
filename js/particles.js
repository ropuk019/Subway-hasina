class ParticleSystem {
  constructor(game) {
    this.game = game;
    this.particles = [];
  }

  createEffect(x, y, color = '#FFD700') {
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  update() {
    this.particles = this.particles.filter(particle => particle.active);
    this.particles.forEach(particle => particle.update());
  }

  draw(ctx) {
    this.particles.forEach(particle => particle.draw(ctx));
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 5 + 2;
    this.speedX = (Math.random() - 0.5) * CONFIG.PARTICLE_SPEED;
    this.speedY = (Math.random() - 0.5) * CONFIG.PARTICLE_SPEED;
    this.active = true;
    this.life = CONFIG.PARTICLE_LIFETIME;
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 16; // Approximately 60 FPS
    this.opacity = this.life / CONFIG.PARTICLE_LIFETIME;
    
    if (this.life <= 0) {
      this.active = false;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}