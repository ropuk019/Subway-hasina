// Utility functions
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Handle screen orientation
function lockScreenOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape')
      .catch(err => console.log('Orientation lock failed:', err));
  }
}

// Handle fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Error attempting to enable fullscreen:', err);
    });
  } else {
    document.exitFullscreen();
  }
}