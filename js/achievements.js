class AchievementSystem {
  constructor(game) {
    this.game = game;
    this.achievements = CONFIG.ACHIEVEMENTS;
    this.unlockedAchievements = new Set();
    this.notifications = [];
  }

  update(score) {
    this.achievements.forEach(achievement => {
      if (score >= achievement.score && !this.unlockedAchievements.has(achievement.name)) {
        this.unlockAchievement(achievement);
      }
    });
    
    // Update notifications
    this.notifications = this.notifications.filter(notification => {
      notification.duration -= 16;
      return notification.duration > 0;
    });
  }

  unlockAchievement(achievement) {
    this.unlockedAchievements.add(achievement.name);
    
    // Play achievement sound
    const audio = new Audio(CONFIG.SOUND_EFFECTS.achievement);
    audio.play();
    
    // Add notification
    this.notifications.push({
      text: `Achievement Unlocked: ${achievement.name}!`,
      duration: 3000
    });
    
    // Save to local storage
    this.saveAchievements();
  }

  draw(ctx) {
    // Draw notifications
    ctx.save();
    ctx.fillStyle = '#FFD700';
    ctx.font = '20px "Press Start 2P"';
    
    this.notifications.forEach((notification, index) => {
      const opacity = Math.min(1, notification.duration / 500);
      ctx.globalAlpha = opacity;
      ctx.fillText(notification.text, 20, 50 + (index * 30));
    });
    
    ctx.restore();
  }

  saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(Array.from(this.unlockedAchievements)));
  }

  loadAchievements() {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      this.unlockedAchievements = new Set(JSON.parse(saved));
    }
  }
}