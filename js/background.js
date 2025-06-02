class Background {
  constructor(game) {
    this.game = game;
    this.layers = [];
    this.isDayTime = true;
    this.timeElapsed = 0;
    this.cycleDuration = 30000; // 30 seconds per cycle
    this.loadLayers();
  }

  loadLayers() {
    // Parallax background layers
    const layerUrls = [
      'https://raw.githubusercontent.com/ropuk019/Hasina-run-Remastered/main/assets/background/layer1.png',
      'https://raw.githubusercontent.com/ropuk019/Hasina-run-Remastered/main/assets/background/layer2.png',
      'https://raw.githubusercontent.com/ropuk019/Hasina-run-Remastered/main/assets/background/layer3.png'
    ];

    layerUrls.forEach((url, i) => {
      const image = new Image();
      image.src = url;
      this.layers.push({
        image,
        x: 0,
        speed: (i + 1) * 0.5
      });
    });
  }

  update(deltaTime) {
    // Update time cycle
    this.timeElapsed += deltaTime;
    if (this.timeElapsed >= this.cycleDuration) {
      this.timeElapsed = 0;
      this.isDayTime = !this.isDayTime;
    }

    // Update layer positions
    this.layers.forEach(layer => {
      layer.x -= layer.speed * this.game.gameSpeed;
      if (layer.x <= -this.game.canvas.width) {
        layer.x = 0;
      }
    });
  }

  draw(ctx) {
    // Apply day/night overlay
    const darkness = this.isDayTime ? 0 : 0.5;
    const cycleProgress = (this.timeElapsed % this.cycleDuration) / this.cycleDuration;
    const currentDarkness = this.isDayTime ? 
      easeInOut(cycleProgress) * 0.5 : 
      (1 - easeInOut(cycleProgress)) * 0.5;

    // Draw background layers
    this.layers.forEach(layer => {
      // Draw first instance
      ctx.drawImage(layer.image, layer.x, 0, this.game.canvas.width, this.game.canvas.height);
      // Draw second instance for seamless scrolling
      ctx.drawImage(layer.image, layer.x + this.game.canvas.width, 0, this.game.canvas.width, this.game.canvas.height);
    });

    // Apply darkness overlay
    ctx.fillStyle = `rgba(0, 0, 0, ${currentDarkness})`;
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
  }
}