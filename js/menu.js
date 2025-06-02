class MenuManager {
  constructor(game) {
    this.game = game;
    this.screens = {
      main: document.getElementById('main-menu'),
      heroes: document.getElementById('heroes-screen'),
      game: document.getElementById('game-screen'),
      gameOver: document.getElementById('game-over')
    };
    
    this.bindEvents();
  }

  bindEvents() {
    // Main menu buttons
    document.getElementById('play-button').addEventListener('click', () => this.startGame());
    document.getElementById('heroes-button').addEventListener('click', () => this.showScreen('heroes'));
    
    // Heroes screen
    document.getElementById('back-button').addEventListener('click', () => this.showScreen('main'));
    
    // Game over screen
    document.getElementById('restart-button').addEventListener('click', () => this.startGame());
    document.getElementById('menu-button').addEventListener('click', () => this.showScreen('main'));
    
    // Handle hero selection
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(card => {
      if (!card.classList.contains('locked')) {
        card.addEventListener('click', () => this.selectHero(card.dataset.hero));
      }
    });
  }

  showScreen(screenName) {
    Object.values(this.screens).forEach(screen => screen.classList.add('hidden'));
    this.screens[screenName].classList.remove('hidden');
  }

  startGame() {
    this.showScreen('game');
    this.game.start();
  }

  selectHero(heroName) {
    document.querySelectorAll('.hero-card').forEach(card => {
      card.classList.remove('active');
    });
    document.querySelector(`[data-hero="${heroName}"]`).classList.add('active');
  }

  showGameOver() {
    this.showScreen('gameOver');
  }
}