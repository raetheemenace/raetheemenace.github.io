/**
 * Navigation Controller
 * Handles fixed navbar with scroll behavior, smooth scrolling, and mobile menu
 * Requirements: 2.3, 2.4, 2.5
 */

class NavigationController {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.navLinks = document.getElementById('nav-links');
    this.navLinksAnchors = document.querySelectorAll('.nav-links a');
    this.scrollThreshold = 50;
    this.isMenuOpen = false;
  }

  /**
   * Initialize the navigation controller
   */
  init() {
    if (!this.navbar || !this.hamburger || !this.navLinks) {
      console.warn('Navigation elements not found');
      return;
    }

    this.setupScrollHandler();
    this.setupMobileMenu();
    this.setupSmoothScroll();
  }

  /**
   * Setup scroll handler for fixed navbar with semi-transparent background
   * Requirement 2.3: Fixed navbar with semi-transparent dark background on scroll
   */
  setupScrollHandler() {
    const handleScroll = () => {
      if (window.scrollY > this.scrollThreshold) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /**
   * Setup hamburger menu toggle for mobile
   * Requirement 2.5: Hamburger menu for viewport < 768px
   */
  setupMobileMenu() {
    this.hamburger.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.hamburger.contains(e.target) && 
          !this.navLinks.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  /**
   * Toggle mobile menu open/closed state
   */
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.hamburger.classList.toggle('active', this.isMenuOpen);
    this.navLinks.classList.toggle('active', this.isMenuOpen);
    this.hamburger.setAttribute('aria-expanded', this.isMenuOpen.toString());
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    this.isMenuOpen = false;
    this.hamburger.classList.remove('active');
    this.navLinks.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
  }

  /**
   * Setup smooth scroll to sections on link click
   * Requirement 2.4: Smooth-scroll to corresponding section on nav link click
   */
  setupSmoothScroll() {
    this.navLinksAnchors.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          this.smoothScrollTo(href.substring(1));
          this.closeMobileMenu();
        }
      });
    });

    const logoLink = document.querySelector('.nav-logo');
    if (logoLink) {
      logoLink.addEventListener('click', (e) => {
        const href = logoLink.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          this.smoothScrollTo(href.substring(1));
        }
      });
    }
  }

  /**
   * Smooth scroll to a section by ID
   * @param {string} sectionId - The ID of the section to scroll to
   */
  smoothScrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    
    if (section) {
      const navbarHeight = this.navbar ? this.navbar.offsetHeight : 0;
      const targetPosition = section.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NavigationController };
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const navigationController = new NavigationController();
  navigationController.init();
});
