// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Set up canvas
  const canvas = document.getElementById('game-canvas');
  canvas.width = CONFIG.CANVAS_WIDTH;
  canvas.height = CONFIG.CANVAS_HEIGHT;
  
  // Initialize game
  const game = new Game(canvas);
  
  // Initialize menu manager
  const menuManager = new MenuManager(game);
  
  // Handle mobile devices
  if (isMobileDevice()) {
    lockScreenOrientation();
  }
  
  // Handle window resize
  window.addEventListener('resize', debounce(() => {
    const container = document.getElementById('game-container');
    const scale = Math.min(
      window.innerWidth / CONFIG.CANVAS_WIDTH,
      window.innerHeight / CONFIG.CANVAS_HEIGHT
    );
    
    container.style.transform = `scale(${scale})`;
  }, 250));
  
  // Trigger initial resize
  window.dispatchEvent(new Event('resize'));
});