const CONFIG = {
  // Canvas settings
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 300,
  
  // Player settings
  PLAYER_WIDTH: 50,
  PLAYER_HEIGHT: 60,
  PLAYER_INITIAL_X: 100,
  PLAYER_INITIAL_Y: 240,
  GRAVITY: 0.8,
  JUMP_FORCE: -15,
  
  // Game settings
  GAME_SPEED_INITIAL: 5,
  GAME_SPEED_INCREMENT: 0.001,
  SCORE_INCREMENT: 0.2,
  DAY_NIGHT_CYCLE: 120000, // 2 minutes in milliseconds
  
  // Obstacle settings
  OBSTACLE_MIN_SPACING: 300,
  OBSTACLE_MAX_SPACING: 500,
  OBSTACLE_MIN_WIDTH: 30,
  OBSTACLE_MAX_WIDTH: 50,
  OBSTACLE_MIN_HEIGHT: 40,
  OBSTACLE_MAX_HEIGHT: 70,
  
  // Collectible settings
  COIN_WIDTH: 30,
  COIN_HEIGHT: 30,
  COIN_VALUE: 10,
  COIN_SPAWN_CHANCE: 0.3,
  
  // Sound effects
  SOUND_EFFECTS: {
    jump: 'assets/audio/jump.mp3',
    coin: 'assets/audio/coin.mp3',
    gameOver: 'assets/audio/gameover.mp3'
  }
};