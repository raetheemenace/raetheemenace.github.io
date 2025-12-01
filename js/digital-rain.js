/**
 * Digital Rain Background Animation
 * Matrix-style binary rain effect using HTML5 Canvas
 * 
 * Requirements: 1.3, 10.4
 */

/**
 * DigitalRainRenderer - Canvas-based binary rain animation
 * Renders falling binary characters (0s and 1s) at varying speeds
 */
class DigitalRainRenderer {
  /**
   * @param {HTMLCanvasElement} canvas - The canvas element to render on
   * @param {Object} config - Optional configuration overrides
   */
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Configuration with defaults
    this.config = {
      fontSize: config.fontSize || 20,
      color: config.color || '#00FF41',
      fadeColor: config.fadeColor || 'rgba(13, 13, 13, 0.03)',
      characters: config.characters || '01',
      minSpeed: config.minSpeed || 0.2,
      maxSpeed: config.maxSpeed || 0.6,
      ...config
    };
    
    // Animation state
    this.columns = 0;
    this.drops = [];
    this.speeds = [];
    this.characters = []; // Store current character for each column
    this.charChangeCounters = []; // Counter for when to change characters
    this.animationId = null;
    this.isRunning = false;
    this.lastFrameTime = 0;
    this.targetFPS = 15; // Slower FPS for more visible character changes
    this.frameInterval = 1000 / this.targetFPS;
    
    // Bind methods for event handlers
    this.handleResize = this.resize.bind(this);
  }

  /**
   * Initialize the renderer - set up canvas dimensions and drop arrays
   */
  init() {
    this.resize();
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Handle canvas resize - recalculate columns and reset drops
   */
  resize() {
    // Set canvas to full window size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Calculate number of columns based on font size
    this.columns = Math.floor(this.canvas.width / this.config.fontSize);
    
    // Initialize drops array - each drop starts at random Y position
    this.drops = [];
    this.speeds = [];
    this.characters = [];
    this.charChangeCounters = [];
    
    for (let i = 0; i < this.columns; i++) {
      // Random starting position (negative values start above viewport)
      this.drops[i] = Math.random() * -100;
      // Random speed for each column
      this.speeds[i] = this.config.minSpeed + Math.random() * (this.config.maxSpeed - this.config.minSpeed);
      // Initialize character and change counter
      this.characters[i] = this.getRandomCharacter();
      this.charChangeCounters[i] = Math.floor(Math.random() * 10) + 5; // Change every 5-15 frames
    }
  }

  /**
   * Get a random binary character (0 or 1)
   * @returns {string} A single character from the characters set
   */
  getRandomCharacter() {
    const chars = this.config.characters;
    return chars[Math.floor(Math.random() * chars.length)];
  }

  /**
   * Draw a single frame of the animation
   */
  draw() {
    const ctx = this.ctx;
    const { fontSize, color, fadeColor } = this.config;
    
    // Create fade effect by drawing semi-transparent background
    ctx.fillStyle = fadeColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Set text properties
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    
    // Draw each column
    for (let i = 0; i < this.columns; i++) {
      // Decrement change counter and change character when it reaches 0
      this.charChangeCounters[i]--;
      if (this.charChangeCounters[i] <= 0) {
        this.characters[i] = this.getRandomCharacter();
        this.charChangeCounters[i] = Math.floor(Math.random() * 10) + 5; // Reset counter
      }
      
      // Calculate position
      const x = i * fontSize;
      const y = this.drops[i] * fontSize;
      
      // Draw the character (use stored character for slower changes)
      ctx.fillText(this.characters[i], x, y);
      
      // Move drop down by its speed
      this.drops[i] += this.speeds[i];
      
      // Reset drop to top when it goes off screen (with some randomness)
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
        // Randomize speed when resetting
        this.speeds[i] = this.config.minSpeed + Math.random() * (this.config.maxSpeed - this.config.minSpeed);
      }
    }
  }

  /**
   * Animation loop using requestAnimationFrame
   * Throttled to target FPS for consistent performance
   * @param {number} timestamp - Current timestamp from requestAnimationFrame
   */
  animate(timestamp) {
    if (!this.isRunning) return;
    
    // Calculate time elapsed since last frame
    const elapsed = timestamp - this.lastFrameTime;
    
    // Only draw if enough time has passed (throttle to target FPS)
    if (elapsed >= this.frameInterval) {
      this.draw();
      this.lastFrameTime = timestamp - (elapsed % this.frameInterval);
    }
    
    // Request next frame
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Start the animation
   */
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    
    // Initial draw to fill canvas with fade color
    this.ctx.fillStyle = this.config.fadeColor.replace('0.05', '1');
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Start animation loop
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Stop the animation
   */
  stop() {
    this.isRunning = false;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Clean up resources and event listeners
   */
  destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
  }
}

// Export for module usage (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DigitalRainRenderer };
}

// Auto-initialize when DOM is ready (can be overridden by main.js)
let digitalRainInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('digital-rain');
  if (canvas && !digitalRainInstance) {
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (reducedMotion) {
      // For reduced motion, show a static dimmed canvas instead of animation
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = 'rgba(13, 13, 13, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a few static characters for visual effect without animation
      ctx.fillStyle = 'rgba(0, 255, 65, 0.3)';
      ctx.font = '14px "Share Tech Mono", monospace';
      const columns = Math.floor(canvas.width / 14);
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < Math.floor(canvas.height / 14); j++) {
          if (Math.random() > 0.95) {
            ctx.fillText(Math.random() > 0.5 ? '0' : '1', i * 14, j * 14);
          }
        }
      }
      return;
    }
    
    digitalRainInstance = new DigitalRainRenderer(canvas);
    digitalRainInstance.init();
    digitalRainInstance.start();
    
    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches && digitalRainInstance) {
        digitalRainInstance.stop();
      } else if (!e.matches && digitalRainInstance) {
        digitalRainInstance.start();
      }
    });
  }
});
