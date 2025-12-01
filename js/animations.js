/**
 * Animation Controller
 * Handles glitch, typewriter, and fade-in effects
 * 
 * Requirements: 1.1, 1.2, 3.1, 3.2, 10.2
 */

/**
 * Global Intersection Observer Configuration
 * Requirements: 10.2 - Trigger section reveal animations using intersection observers
 */
const OBSERVER_CONFIG = {
  root: null,           // Use viewport as root
  rootMargin: '0px',    // No margin
  threshold: 0.1        // Trigger when 10% of element is visible
};

/**
 * Animation class mappings for scroll-triggered animations
 * Maps CSS classes to their visible state classes
 */
const ANIMATION_CLASSES = {
  'fade-in': 'visible',
  'slide-in-left': 'visible',
  'fade-in-stagger': 'visible',
  'pulse-glow': 'visible',
  'skill-reveal': 'visible',
  'typewriter-scroll': 'typewriter-active'
};

/**
 * AnimationController class manages all page animations
 */
class AnimationController {
  constructor() {
    this.glitchElements = [];
    this.typewriterElements = [];
    this.fadeElements = [];
    this.observer = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize the animation controller
   */
  init() {
    this.glitchElements = document.querySelectorAll('.glitch');
    this.typewriterElements = document.querySelectorAll('.typewriter');
    this.fadeElements = document.querySelectorAll('.fade-in');
    
    // Set up glitch effects
    this.setupGlitchEffects();
    
    // Set up typewriter effects for hero section (immediate)
    this.setupHeroTypewriter();
    
    // Set up Intersection Observer for scroll-triggered animations
    this.setupIntersectionObserver();
    
    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  /**
   * Set up glitch effects on elements
   * Glitch animation is handled via CSS keyframes
   */
  setupGlitchEffects() {
    this.glitchElements.forEach(element => {
      // Ensure data-text attribute is set for CSS pseudo-elements
      if (!element.dataset.text) {
        element.dataset.text = element.textContent;
      }
    });
  }

  /**
   * Set up typewriter effect for hero section elements
   * Cycles through multiple names/aliases
   */
  setupHeroTypewriter() {
    const heroTypewriter = document.querySelector('.hero-section .typewriter');
    if (heroTypewriter && !this.reducedMotion) {
      this.triggerCyclingTypewriter(heroTypewriter, [
        'John Raven Unera',
        'Rae',
        'B4Y0N3TTA',
        'Raven'
      ], 100);
    }
  }

  /**
   * Trigger cycling typewriter effect that loops through multiple texts
   * @param {HTMLElement} element - Element to apply typewriter effect
   * @param {string[]} texts - Array of texts to cycle through
   * @param {number} speed - Typing speed in milliseconds per character
   */
  triggerCyclingTypewriter(element, texts, speed = 100) {
    if (this.reducedMotion) {
      element.textContent = texts[0];
      element.style.borderRight = 'none';
      return;
    }

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const deleteSpeed = 50;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    const animate = () => {
      const currentText = texts[textIndex];
      
      if (!isDeleting) {
        // Typing
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            isDeleting = true;
            animate();
          }, pauseBeforeDelete);
          return;
        }
        setTimeout(animate, speed);
      } else {
        // Deleting
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          // Finished deleting, move to next text
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(animate, pauseBeforeType);
          return;
        }
        setTimeout(animate, deleteSpeed);
      }
    };

    // Start animation after initial delay
    setTimeout(animate, 500);
  }

  /**
   * Set up Intersection Observer for scroll-triggered animations
   * Requirements: 10.2 - Trigger section reveal animations using intersection observers
   */
  setupIntersectionObserver() {
    // Use global observer configuration
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Handle fade-in elements
          if (element.classList.contains('fade-in')) {
            this.triggerFadeIn(element);
            
            // Also trigger child animations in about section
            if (element.classList.contains('about-content')) {
              this.triggerAboutAnimations(element);
            }
          }
          
          // Handle slide-in-left elements (experience cards)
          if (element.classList.contains('slide-in-left')) {
            this.triggerSlideInLeft(element);
          }
          
          // Handle fade-in-stagger elements (project cards)
          if (element.classList.contains('fade-in-stagger')) {
            this.triggerFadeInStagger(element);
          }
          
          // Handle pulse-glow elements (award badges)
          if (element.classList.contains('pulse-glow')) {
            this.triggerPulseGlow(element);
          }
          
          // Handle typewriter elements (non-hero)
          if (element.classList.contains('typewriter') && 
              !element.closest('.hero-section') &&
              !element.dataset.animated) {
            this.triggerTypewriter(element, element.textContent, 50);
          }
          
          // Handle typewriter-scroll elements (triggered on scroll)
          if (element.classList.contains('typewriter-scroll') &&
              !element.dataset.animated) {
            this.triggerScrollTypewriter(element);
          }
          
          // Handle skill-reveal elements (skill items)
          if (element.classList.contains('skill-reveal')) {
            this.triggerSkillReveal(element);
          }
          
          // Unobserve after animation triggered
          this.observer.unobserve(element);
        }
      });
    }, OBSERVER_CONFIG);

    // Observe fade-in elements
    this.fadeElements.forEach(element => {
      this.observer.observe(element);
    });

    // Observe typewriter elements (except hero which animates immediately)
    this.typewriterElements.forEach(element => {
      if (!element.closest('.hero-section')) {
        this.observer.observe(element);
      }
    });
    
    // Observe typewriter-scroll elements
    const typewriterScrollElements = document.querySelectorAll('.typewriter-scroll');
    typewriterScrollElements.forEach(element => {
      this.observer.observe(element);
    });
    
    // Observe slide-in-left elements (experience cards)
    const slideInLeftElements = document.querySelectorAll('.slide-in-left');
    slideInLeftElements.forEach(element => {
      this.observer.observe(element);
    });
    
    // Observe fade-in-stagger elements (project cards)
    const fadeInStaggerElements = document.querySelectorAll('.fade-in-stagger');
    fadeInStaggerElements.forEach(element => {
      this.observer.observe(element);
    });
    
    // Observe pulse-glow elements (award badges)
    const pulseGlowElements = document.querySelectorAll('.pulse-glow');
    pulseGlowElements.forEach(element => {
      this.observer.observe(element);
    });
    
    // Observe skill-reveal elements (skill items)
    const skillRevealElements = document.querySelectorAll('.skill-reveal');
    skillRevealElements.forEach(element => {
      this.observer.observe(element);
    });
  }
  
  /**
   * Trigger animations for about section content
   * @param {HTMLElement} aboutContent - The about-content container element
   */
  triggerAboutAnimations(aboutContent) {
    // Find and animate description and aspirations paragraphs with staggered delay
    const description = aboutContent.querySelector('.about-description');
    const aspirations = aboutContent.querySelector('.about-aspirations');
    
    if (description) {
      setTimeout(() => {
        description.classList.add('visible');
      }, 500);
    }
    
    if (aspirations) {
      setTimeout(() => {
        aspirations.classList.add('visible');
      }, 1000);
    }
  }
  
  /**
   * Trigger typewriter effect for scroll-triggered elements
   * @param {HTMLElement} element - Element to apply typewriter effect
   */
  triggerScrollTypewriter(element) {
    if (this.reducedMotion) {
      element.style.borderRight = 'none';
      return;
    }
    
    // Mark as animated to prevent re-triggering
    element.dataset.animated = 'true';
    
    // Get the text from data attribute or content
    const text = element.dataset.text || element.textContent;
    element.textContent = '';
    element.classList.add('typewriter-active');
    
    let charIndex = 0;
    const speed = 30; // Faster for longer text
    
    const typeChar = () => {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        // Animation complete - remove cursor
        element.style.borderRight = 'none';
        element.classList.remove('typewriter-active');
      }
    };
    
    // Start typing
    setTimeout(typeChar, 300);
  }


  /**
   * Trigger glitch effect on an element
   * @param {HTMLElement} element - Element to apply glitch effect
   */
  triggerGlitch(element) {
    if (this.reducedMotion) return;
    
    // Add glitch class if not present
    if (!element.classList.contains('glitch')) {
      element.classList.add('glitch');
    }
    
    // Ensure data-text is set
    if (!element.dataset.text) {
      element.dataset.text = element.textContent;
    }
  }

  /**
   * Trigger typewriter effect on an element
   * @param {HTMLElement} element - Element to apply typewriter effect
   * @param {string} text - Text to type out
   * @param {number} speed - Typing speed in milliseconds per character
   */
  triggerTypewriter(element, text, speed = 100) {
    if (this.reducedMotion) {
      element.textContent = text;
      element.style.borderRight = 'none';
      return;
    }

    // Mark as animated to prevent re-triggering
    element.dataset.animated = 'true';
    
    // Store original text and clear element
    const originalText = text || element.textContent;
    element.textContent = '';
    element.style.width = 'auto';
    element.style.animation = 'none';
    
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex < originalText.length) {
        element.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, speed);
      } else {
        // Animation complete - keep cursor blinking
        element.style.animation = 'blink-caret 0.75s step-end infinite';
      }
    };
    
    // Start typing after a small delay
    setTimeout(typeChar, 500);
  }

  /**
   * Trigger fade-in animation on an element
   * @param {HTMLElement} element - Element to fade in
   */
  triggerFadeIn(element) {
    if (this.reducedMotion) {
      element.classList.add('visible');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      return;
    }
    
    // Add visible class to trigger CSS transition
    element.classList.add('visible');
  }

  /**
   * Trigger slide-in from left animation on an element
   * Requirements: 4.3 - Experience cards slide-in from left on scroll
   * @param {HTMLElement} element - Element to slide in
   */
  triggerSlideInLeft(element) {
    if (this.reducedMotion) {
      element.classList.add('visible');
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      return;
    }
    
    // Add visible class to trigger CSS transition
    element.classList.add('visible');
  }

  /**
   * Trigger staggered fade-in animation on an element
   * Requirements: 5.4 - Project cards staggered fade-in on scroll
   * @param {HTMLElement} element - Element to fade in with stagger
   */
  triggerFadeInStagger(element) {
    if (this.reducedMotion) {
      element.classList.add('visible');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      return;
    }
    
    // Add visible class to trigger CSS transition (delay handled by CSS)
    element.classList.add('visible');
  }

  /**
   * Trigger pulse glow animation on an element
   * Requirements: 6.3 - Award items animate with glowing pulse effect on scroll
   * @param {HTMLElement} element - Element to apply pulse glow effect
   */
  triggerPulseGlow(element) {
    if (this.reducedMotion) {
      element.classList.add('visible');
      element.style.opacity = '1';
      element.style.transform = 'scale(1)';
      // Disable the pulse animation for reduced motion
      element.style.animation = 'none';
      return;
    }
    
    // Add visible class to trigger CSS transition and pulse animation
    element.classList.add('visible');
  }

  /**
   * Trigger skill reveal animation on an element
   * Requirements: 7.4 - Skill items animate with loading/reveal effect on scroll
   * @param {HTMLElement} element - Element to apply skill reveal effect
   */
  triggerSkillReveal(element) {
    if (this.reducedMotion) {
      element.classList.add('visible');
      element.style.opacity = '1';
      element.style.transform = 'translateX(0)';
      return;
    }
    
    // Add visible class to trigger CSS transition (delay handled by CSS)
    element.classList.add('visible');
  }

  /**
   * Manually trigger animation on a specific element
   * @param {HTMLElement} element - Element to animate
   * @param {string} type - Animation type: 'glitch', 'typewriter', or 'fade'
   */
  animate(element, type) {
    switch (type) {
      case 'glitch':
        this.triggerGlitch(element);
        break;
      case 'typewriter':
        this.triggerTypewriter(element, element.textContent);
        break;
      case 'fade':
        this.triggerFadeIn(element);
        break;
      default:
        console.warn(`Unknown animation type: ${type}`);
    }
  }

  /**
   * Clean up observer when no longer needed
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

/**
 * ProjectCardController class manages 3D tilt effects on project cards
 * Requirements: 5.3 - 3D tilt effect with neon glow borders on hover
 */
class ProjectCardController {
  constructor() {
    this.cards = [];
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.maxTilt = 15; // Maximum tilt angle in degrees
  }

  /**
   * Initialize the project card controller
   */
  init() {
    this.cards = document.querySelectorAll('[data-tilt]');
    
    if (this.reducedMotion) {
      return; // Don't apply tilt effects if reduced motion is preferred
    }
    
    this.cards.forEach(card => {
      this.setupCard(card);
    });
    
    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        this.resetAllCards();
      }
    });
  }

  /**
   * Set up event listeners for a single card
   * @param {HTMLElement} card - Card element to set up
   */
  setupCard(card) {
    card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
    card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
  }

  /**
   * Handle mouse move event for tilt effect
   * @param {MouseEvent} event - Mouse event
   * @param {HTMLElement} card - Card element
   */
  handleMouseMove(event, card) {
    if (this.reducedMotion) return;
    
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to card center (-1 to 1)
    const mouseX = (event.clientX - centerX) / (rect.width / 2);
    const mouseY = (event.clientY - centerY) / (rect.height / 2);
    
    // Apply tilt effect
    this.applyTiltEffect(card, mouseX, mouseY);
  }

  /**
   * Handle mouse enter event
   * @param {HTMLElement} card - Card element
   */
  handleMouseEnter(card) {
    if (this.reducedMotion) return;
    card.style.transition = 'transform 0.1s ease-out';
  }

  /**
   * Handle mouse leave event - reset card position
   * @param {HTMLElement} card - Card element
   */
  handleMouseLeave(card) {
    if (this.reducedMotion) return;
    
    card.style.transition = 'transform 0.3s ease-out';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }

  /**
   * Apply 3D tilt effect to card
   * @param {HTMLElement} card - Card element
   * @param {number} x - Normalized X position (-1 to 1)
   * @param {number} y - Normalized Y position (-1 to 1)
   */
  applyTiltEffect(card, x, y) {
    // Calculate rotation angles (inverted for natural feel)
    const rotateY = x * this.maxTilt;
    const rotateX = -y * this.maxTilt;
    
    // Apply transform with perspective for 3D effect
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  /**
   * Reset all cards to default position
   */
  resetAllCards() {
    this.cards.forEach(card => {
      card.style.transform = '';
      card.style.transition = '';
    });
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    this.cards.forEach(card => {
      card.removeEventListener('mousemove', this.handleMouseMove);
      card.removeEventListener('mouseleave', this.handleMouseLeave);
      card.removeEventListener('mouseenter', this.handleMouseEnter);
    });
    this.cards = [];
  }
}

/**
 * Global Scroll Animation Observer
 * A standalone observer for registering elements for scroll-triggered animations
 * Requirements: 10.2 - Set up global observer for section reveal animations
 */
class GlobalScrollObserver {
  constructor() {
    this.observer = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  /**
   * Initialize the global observer
   */
  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleIntersection(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, OBSERVER_CONFIG);

    // Listen for reduced motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  /**
   * Handle element intersection - trigger appropriate animation
   * @param {HTMLElement} element - The intersecting element
   */
  handleIntersection(element) {
    // Find which animation class the element has and add the visible state
    for (const [animClass, visibleClass] of Object.entries(ANIMATION_CLASSES)) {
      if (element.classList.contains(animClass)) {
        if (this.reducedMotion) {
          // For reduced motion, show immediately without animation
          element.style.opacity = '1';
          element.style.transform = 'none';
        }
        element.classList.add(visibleClass);
        break;
      }
    }
  }

  /**
   * Register an element for scroll-triggered animation
   * @param {HTMLElement} element - Element to observe
   */
  observe(element) {
    if (this.observer && element) {
      this.observer.observe(element);
    }
  }

  /**
   * Register multiple elements for scroll-triggered animation
   * @param {NodeList|Array} elements - Elements to observe
   */
  observeAll(elements) {
    if (elements) {
      elements.forEach(element => this.observe(element));
    }
  }

  /**
   * Stop observing an element
   * @param {HTMLElement} element - Element to unobserve
   */
  unobserve(element) {
    if (this.observer && element) {
      this.observer.unobserve(element);
    }
  }

  /**
   * Clean up the observer
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    AnimationController, 
    ProjectCardController, 
    GlobalScrollObserver,
    OBSERVER_CONFIG,
    ANIMATION_CLASSES
  };
}

// Create global instances
window.AnimationController = AnimationController;
window.ProjectCardController = ProjectCardController;
window.GlobalScrollObserver = GlobalScrollObserver;
window.OBSERVER_CONFIG = OBSERVER_CONFIG;
window.ANIMATION_CLASSES = ANIMATION_CLASSES;
