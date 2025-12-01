/**
 * Contact Form Handler
 * Handles form validation and submission with Matrix-themed styling
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

/**
 * @typedef {Object} FormData
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid
 * @property {Map<string, string>} errors
 */

class ContactFormController {
  constructor() {
    this.form = null;
    this.fields = {
      name: null,
      email: null,
      subject: null,
      message: null
    };
    this.errors = {
      name: null,
      email: null,
      subject: null,
      message: null
    };
    this.formMessage = null;
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  /**
   * Initialize the contact form controller
   */
  init() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;

    // Get form fields
    this.fields.name = document.getElementById('name');
    this.fields.email = document.getElementById('email');
    this.fields.subject = document.getElementById('subject');
    this.fields.message = document.getElementById('message');

    // Get error elements
    this.errors.name = document.getElementById('name-error');
    this.errors.email = document.getElementById('email-error');
    this.errors.subject = document.getElementById('subject-error');
    this.errors.message = document.getElementById('message-error');

    // Get form message element
    this.formMessage = document.getElementById('form-message');

    // Bind event listeners
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Add focus/blur listeners for neon glow effect on inputs
    Object.values(this.fields).forEach(field => {
      if (field) {
        field.addEventListener('focus', () => this.handleFocus(field));
        field.addEventListener('blur', () => this.handleBlur(field));
        field.addEventListener('input', () => this.clearFieldError(field));
      }
    });
  }


  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  handleSubmit(e) {
    e.preventDefault();
    
    const formData = this.getFormData();
    const validation = this.validate(formData);

    if (!validation.isValid) {
      this.displayErrors(validation.errors);
      return;
    }

    // Simulate form submission (no backend)
    this.submit(formData);
  }

  /**
   * Get form data from inputs
   * @returns {FormData}
   */
  getFormData() {
    return {
      name: this.fields.name?.value || '',
      email: this.fields.email?.value || '',
      subject: this.fields.subject?.value || '',
      message: this.fields.message?.value || ''
    };
  }

  /**
   * Validate form data
   * @param {FormData} data - Form data to validate
   * @returns {ValidationResult}
   */
  validate(data) {
    const errors = new Map();

    // Validate name (required)
    if (!data.name || data.name.trim() === '') {
      errors.set('name', 'Name is required');
    }

    // Validate email (required + format)
    if (!data.email || data.email.trim() === '') {
      errors.set('email', 'Email is required');
    } else if (!this.emailRegex.test(data.email)) {
      errors.set('email', 'Please enter a valid email');
    }

    // Validate subject (required)
    if (!data.subject || data.subject.trim() === '') {
      errors.set('subject', 'Subject is required');
    }

    // Validate message (required)
    if (!data.message || data.message.trim() === '') {
      errors.set('message', 'Message is required');
    }

    return {
      isValid: errors.size === 0,
      errors
    };
  }

  /**
   * Display validation errors with red neon glow styling
   * @param {Map<string, string>} errors - Map of field names to error messages
   */
  displayErrors(errors) {
    // Clear all previous errors first
    this.clearAllErrors();

    // Display new errors
    errors.forEach((message, fieldName) => {
      const field = this.fields[fieldName];
      const errorElement = this.errors[fieldName];

      if (field) {
        field.classList.add('error');
      }

      if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('visible');
      }
    });
  }

  /**
   * Clear error for a specific field
   * @param {HTMLElement} field - The input field
   */
  clearFieldError(field) {
    const fieldName = field.id;
    const errorElement = this.errors[fieldName];

    field.classList.remove('error');
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
  }

  /**
   * Clear all error states
   */
  clearAllErrors() {
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      const errorElement = this.errors[fieldName];

      if (field) {
        field.classList.remove('error');
      }

      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
      }
    });

    // Hide form message
    if (this.formMessage) {
      this.formMessage.classList.remove('visible', 'success', 'error');
    }
  }

  /**
   * Handle input focus - add neon glow effect
   * @param {HTMLElement} field - The focused field
   */
  handleFocus(field) {
    // Focus styling is handled by CSS :focus pseudo-class
    // This method can be extended for additional effects
  }

  /**
   * Handle input blur
   * @param {HTMLElement} field - The blurred field
   */
  handleBlur(field) {
    // Blur handling - can be extended for validation on blur
  }

  /**
   * Submit form data (simulated - no backend)
   * @param {FormData} data - Validated form data
   */
  async submit(data) {
    // Simulate async submission
    try {
      // In a real implementation, this would send data to a server
      // For now, we simulate a successful submission
      await this.simulateSubmission();
      
      this.showSuccess();
      this.clearForm();
    } catch (error) {
      this.showError('Failed to send message. Please try again.');
    }
  }

  /**
   * Simulate form submission delay
   * @returns {Promise<void>}
   */
  simulateSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }

  /**
   * Show success message with green neon glow styling
   */
  showSuccess() {
    if (this.formMessage) {
      this.formMessage.textContent = 'Message sent successfully!';
      this.formMessage.classList.remove('error');
      this.formMessage.classList.add('success', 'visible');
    }
  }

  /**
   * Show error message with red neon glow styling
   * @param {string} message - Error message to display
   */
  showError(message) {
    if (this.formMessage) {
      this.formMessage.textContent = message;
      this.formMessage.classList.remove('success');
      this.formMessage.classList.add('error', 'visible');
    }
  }

  /**
   * Clear all form fields
   */
  clearForm() {
    if (this.form) {
      this.form.reset();
    }
    this.clearAllErrors();
  }
}

// Export for use in main.js and testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ContactFormController };
}
