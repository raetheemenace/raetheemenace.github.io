/**
 * Main Application Entry Point
 * Initializes all components on page load
 * 
 * Requirements: All - Final integration of all components
 * 
 * Initialization Order:
 * 1. Digital Rain (background animation)
 * 2. Navigation Controller (fixed navbar, smooth scroll, mobile menu)
 * 3. Animation Controller (glitch, typewriter, fade effects, Intersection Observer)
 * 4. Contact Form Handler (validation and submission)
 * 5. Project Card Controller (3D tilt effects)
 */

(function() {
  'use strict';

  /**
   * Check if reduced motion is preferred
   * @returns {boolean}
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize Digital Rain background animation
   * Requirements: 1.3, 10.4 - Digital rain with binary numbers using Canvas
   */
  function initDigitalRain() {
    if (typeof DigitalRainRenderer === 'undefined') {
      console.warn('DigitalRainRenderer not available');
      return null;
    }

    const canvas = document.getElementById('digital-rain');
    if (!canvas) {
      console.warn('Digital rain canvas element not found');
      return null;
    }

    // Skip animation initialization if reduced motion is preferred
    // (digital-rain.js handles this internally, but we double-check here)
    if (prefersReducedMotion()) {
      return null;
    }

    const digitalRain = new DigitalRainRenderer(canvas);
    digitalRain.init();
    digitalRain.start();
    
    return digitalRain;
  }

  /**
   * Initialize Navigation Controller
   * Requirements: 2.3, 2.4, 2.5 - Fixed navbar, smooth scroll, hamburger menu
   */
  function initNavigation() {
    if (typeof NavigationController === 'undefined') {
      console.warn('NavigationController not available');
      return null;
    }

    const navigationController = new NavigationController();
    navigationController.init();
    
    return navigationController;
  }

  /**
   * Initialize Animation Controller with Intersection Observer
   * Requirements: 1.1, 1.2, 3.1, 3.2, 10.2 - Glitch, typewriter, fade effects
   */
  function initAnimations() {
    if (typeof AnimationController === 'undefined') {
      console.warn('AnimationController not available');
      return null;
    }

    const animationController = new AnimationController();
    animationController.init();
    
    return animationController;
  }

  /**
   * Initialize Global Scroll Observer for section reveal animations
   * Requirements: 10.2 - Trigger section reveal animations using intersection observers
   */
  function initGlobalScrollObserver() {
    if (typeof GlobalScrollObserver === 'undefined') {
      console.warn('GlobalScrollObserver not available');
      return null;
    }

    const globalScrollObserver = new GlobalScrollObserver();
    
    return globalScrollObserver;
  }

  /**
   * Initialize Contact Form Handler
   * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5 - Form validation and submission
   */
  function initContactForm() {
    if (typeof ContactFormController === 'undefined') {
      console.warn('ContactFormController not available');
      return null;
    }

    const contactFormController = new ContactFormController();
    contactFormController.init();
    
    return contactFormController;
  }

  /**
   * Initialize Project Card Controller for 3D tilt effects
   * Requirements: 5.3 - 3D tilt effect with neon glow borders on hover
   */
  function initProjectCards() {
    if (typeof ProjectCardController === 'undefined') {
      console.warn('ProjectCardController not available');
      return null;
    }

    const projectCardController = new ProjectCardController();
    projectCardController.init();
    
    return projectCardController;
  }

  /**
   * Main initialization function
   * Orchestrates the initialization of all components
   */
  function init() {
    // Store references to all controllers for potential cleanup/access
    const controllers = {
      digitalRain: null,
      navigation: null,
      animations: null,
      globalScrollObserver: null,
      contactForm: null,
      projectCards: null
    };

    try {
      // 1. Initialize Digital Rain (background - lowest priority for user interaction)
      controllers.digitalRain = initDigitalRain();

      // 2. Initialize Navigation (critical for user navigation)
      controllers.navigation = initNavigation();

      // 3. Initialize Global Scroll Observer (for section reveals)
      controllers.globalScrollObserver = initGlobalScrollObserver();

      // 4. Initialize Animation Controller (visual effects)
      controllers.animations = initAnimations();

      // 5. Initialize Contact Form Handler (user interaction)
      controllers.contactForm = initContactForm();

      // 6. Initialize Project Card tilt effects (visual enhancement)
      controllers.projectCards = initProjectCards();

      // Expose controllers globally for debugging and potential external access
      window.portfolioControllers = controllers;

      // Also expose individual controllers for backward compatibility
      if (controllers.digitalRain) window.digitalRain = controllers.digitalRain;
      if (controllers.navigation) window.navigationController = controllers.navigation;
      if (controllers.animations) window.animationController = controllers.animations;
      if (controllers.globalScrollObserver) window.globalScrollObserver = controllers.globalScrollObserver;
      if (controllers.contactForm) window.contactFormController = controllers.contactForm;
      if (controllers.projectCards) window.projectCardController = controllers.projectCards;

    } catch (error) {
      console.error('Error initializing portfolio components:', error);
    }
  }

  /**
   * Hide loading screen after animations complete
   */
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      // Wait for loading bar animation to complete (1.5s delay + 2s animation = 3.5s)
      // Add extra buffer for smoother experience
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after fade out animation (1.2s transition + buffer)
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 1400);
      }, 3800);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      hideLoadingScreen();
    });
  } else {
    // DOM is already ready
    init();
    hideLoadingScreen();
  }
})();
