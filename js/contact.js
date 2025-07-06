// ================================================
// CONTACT PAGE SPECIFIC JAVASCRIPT
// ================================================

class ContactPageManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.initializeForm();
        this.initializeContactCards();
        this.initializeSocialLinks();
    }

    initializeForm() {
        if (!this.form) return;

        // Form submission handler
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Real-time validation
        this.setupFormValidation();
        
        // Enhanced form interactions
        this.setupFormInteractions();
    }

    handleFormSubmission() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = this.form.querySelector('.enhanced-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        btnText.style.display = 'none';
        btnIcon.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            this.form.reset();
            
            // Reset button state
            btnText.style.display = 'inline';
            btnIcon.style.display = 'flex';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;

            // Show success message
            window.SiteUtils.showNotification(
                'Message sent successfully! I\'ll get back to you within 24 hours.',
                'success'
            );
        }, 2000);
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Validation rules
        switch (field.type) {
            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email is required';
                } else if (!window.SiteUtils.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'text':
                if (!value && field.required) {
                    isValid = false;
                    errorMessage = `${field.labels[0]?.textContent || 'This field'} is required`;
                }
                break;
                
            case 'select-one':
                if (!value && field.required) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;
        }

        if (field.tagName === 'TEXTAREA') {
            if (!value && field.required) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message should be at least 10 characters long';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Create error element if not exists
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupFormInteractions() {
        // Enhanced focus effects
        const formGroups = this.form.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea, select');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                    }
                });
                
                // If input already has value, keep it focused
                if (input.value) {
                    group.classList.add('focused');
                }
            }
        });
    }

    initializeContactCards() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    initializeSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link-enhanced');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const platform = link.classList[1]; // linkedin, github, etc.
                let url = '#';
                
                switch (platform) {
                    case 'linkedin':
                        url = 'https://linkedin.com/in/kundan-suryawanshi';
                        break;
                    case 'github':
                        url = 'https://github.com/kundan-suryawanshi';
                        break;
                    case 'twitter':
                        url = 'https://twitter.com/kundan_surya';
                        break;
                    case 'instagram':
                        url = 'https://instagram.com/kundan.suryawanshi';
                        break;
                }
                
                if (url !== '#') {
                    window.open(url, '_blank');
                } else {
                    window.SiteUtils.showNotification(
                        `${platform.charAt(0).toUpperCase() + platform.slice(1)} profile will be available soon!`,
                        'info'
                    );
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPageManager();
});

// Add contact-specific styles
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .form-group.focused label {
        transform: translateY(-25px) scale(0.8);
        color: #667eea;
    }

    .form-group {
        position: relative;
    }

    .form-group label {
        position: absolute;
        top: 15px;
        left: 15px;
        transition: all 0.3s ease;
        pointer-events: none;
        color: rgba(255, 255, 255, 0.7);
    }

    .form-group input,
    .form-group textarea,
    .form-group select {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 15px;
        border-radius: 10px;
        width: 100%;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
    }

    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ef4444;
        box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
    }

    .field-error {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .field-error::before {
        content: '⚠';
        font-size: 0.7rem;
    }

    .enhanced-submit-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        padding: 15px 30px;
        border-radius: 50px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 20px;
    }

    .enhanced-submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    .enhanced-submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .btn-loading {
        display: none;
    }
`;
document.head.appendChild(contactStyles);
