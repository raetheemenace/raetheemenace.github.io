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
   * Note: This is called after entry animation completes, not on page load
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
    if (prefersReducedMotion()) {
      canvas.classList.add('active');
      return null;
    }

    const digitalRain = new DigitalRainRenderer(canvas);
    digitalRain.init();
    digitalRain.start();
    
    // Show the canvas
    canvas.classList.add('active');
    
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
      // All visual components are initialized AFTER entry animation completes
      // to prevent any content from showing during loading/entry screens
      // See hideLoadingScreen() for initialization

      // Only initialize contact form early (it doesn't cause visual leaks)
      controllers.contactForm = initContactForm();

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
   * Matrix Entry Animation - creates the "entering the matrix" effect
   */
  function initMatrixEntry() {
    const canvas = document.getElementById('matrix-entry-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = window.innerWidth < 768 ? 14 : 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50;
    }
    
    let animationId;
    
    function draw() {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < columns; i++) {
        const char = Math.random() > 0.5 ? '0' : '1';
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(char, x, y);
        drops[i] += 0.5;
        
        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
      
      animationId = requestAnimationFrame(draw);
    }
    
    return {
      start: () => { draw(); },
      stop: () => { cancelAnimationFrame(animationId); }
    };
  }

  /**
   * Hide loading screen and show matrix entry transition
   */
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const matrixEntry = document.getElementById('matrix-entry');
    const mainSite = document.getElementById('main-site');
    
    if (loadingScreen && matrixEntry) {
      // Wait for loading bar animation to complete
      setTimeout(() => {
        // FIRST: Activate matrix entry BEFORE fading loading screen
        // This ensures there's no gap where main content is visible
        matrixEntry.classList.add('active');
        const matrixAnim = initMatrixEntry();
        if (matrixAnim) matrixAnim.start();
        
        // THEN: Fade out loading screen (matrix entry is already visible behind it)
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          
          // Remove loading screen from DOM after fade
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 1200);
        }, 100); // Small delay before fading loading screen
        
        // After matrix entry has been showing for a while, start zoom
        setTimeout(() => {
          matrixEntry.classList.add('zoom-in');
          
          // Reveal main site during zoom animation
          setTimeout(() => {
            // Reveal navbar
            const navbar = document.getElementById('navbar');
            if (navbar) {
              navbar.classList.remove('main-site-hidden');
              navbar.classList.add('main-site-visible');
            }
            // Reveal main site content
            if (mainSite) {
              mainSite.classList.remove('main-site-hidden');
              mainSite.classList.add('main-site-visible');
            }
            
            // Initialize all visual components AFTER site is revealed
            const digitalRain = initDigitalRain();
            const navigation = initNavigation();
            const globalScrollObserver = initGlobalScrollObserver();
            const animations = initAnimations();
            const projectCards = initProjectCards();
            
            // Update global controllers
            if (window.portfolioControllers) {
              window.portfolioControllers.digitalRain = digitalRain;
              window.portfolioControllers.navigation = navigation;
              window.portfolioControllers.globalScrollObserver = globalScrollObserver;
              window.portfolioControllers.animations = animations;
              window.portfolioControllers.projectCards = projectCards;
            }
            if (digitalRain) window.digitalRain = digitalRain;
            if (navigation) window.navigationController = navigation;
            if (animations) window.animationController = animations;
          }, 1000);
          
          // Clean up after zoom animation
          setTimeout(() => {
            if (matrixAnim) matrixAnim.stop();
            matrixEntry.style.display = 'none';
          }, 2000);
        }, 1500); // Start zoom after 1.5s of matrix entry
      }, 3800); // Wait for loading bar to complete
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
