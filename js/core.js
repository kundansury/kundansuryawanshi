// ================================================
// CORE JAVASCRIPT - Shared functionality across all pages
// ================================================

// Global Configuration
const SITE_CONFIG = {
    animationSpeed: 300,
    debounceDelay: 100,
    scrollOffset: 80,
    typingSpeed: 100,
    fadeDuration: 500
};

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Debounce function for performance optimization
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

// Email validation utility
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification utility
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
}

// ================================================
// NAVIGATION FUNCTIONALITY
// ================================================

class NavigationManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger, .quantum-hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.setupMobileToggle();
        this.setupNavLinks();
        this.setupActiveHighlighting();
    }

    setupMobileToggle() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });
        }
    }

    setupNavLinks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Close mobile menu
                if (this.hamburger && this.navMenu) {
                    this.hamburger.classList.remove('active');
                    this.navMenu.classList.remove('active');
                }

                const href = link.getAttribute('href');
                
                // If it's an external page, let it navigate normally
                if (href.includes('.html')) {
                    return;
                }
                
                // If it's a section link, prevent default and scroll
                e.preventDefault();
                this.scrollToSection(href);
            });
        });
    }

    scrollToSection(target) {
        const targetSection = document.querySelector(target);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - SITE_CONFIG.scrollOffset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    setupActiveHighlighting() {
        window.addEventListener('scroll', debounce(() => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, SITE_CONFIG.debounceDelay));
    }
}

// ================================================
// GLASSMORPHIC CARD EFFECTS
// ================================================

class CardEffectManager {
    constructor() {
        this.init();
    }

    init() {
        this.initializeTiltEffect();
        this.initializeRippleEffect();
        this.addDynamicStyles();
    }

    initializeTiltEffect() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.transition = 'transform 0.1s ease';
            });

            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth > 768) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    initializeRippleEffect() {
        const interactiveElements = document.querySelectorAll('.glassmorphic-card, .cta-btn, .enhanced-submit-btn, .contact-action-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple-effect');
                
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 10;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ================================================
// FLOATING SYMBOLS ANIMATION
// ================================================

class FloatingSymbolsManager {
    constructor() {
        this.init();
    }

    init() {
        const symbolContainers = document.querySelectorAll('.floating-symbols');
        symbolContainers.forEach(container => {
            this.animateSymbols(container);
        });
    }

    animateSymbols(container) {
        const symbols = container.querySelectorAll('.symbol');
        
        symbols.forEach((symbol, index) => {
            // Set initial random position
            symbol.style.left = Math.random() * 100 + '%';
            symbol.style.top = Math.random() * 100 + '%';
            
            // Apply floating animation
            symbol.style.animation = `float ${3 + Math.random() * 4}s ease-in-out ${index * 0.5}s infinite alternate`;
        });
    }
}

// ================================================
// LAZY LOADING
// ================================================

class LazyLoadManager {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.loadAllImages();
        }
    }

    setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadAllImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ================================================
// DOWNLOAD RESUME FUNCTIONALITY
// ================================================

function initializeResumeDownload() {
    const downloadBtn = document.getElementById('downloadResume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Resume download will be available soon!', 'info');
        });
    }
}

// ================================================
// PARTICLE BACKGROUND SYSTEM
// ================================================

class ParticleSystem {
    constructor(options = {}) {
        this.container = options.container || document.body;
        this.particleCount = options.particleCount || 50;
        this.colors = options.colors || ['#64ffda', '#00bcd4', '#3f51b5'];
        this.speed = options.speed || 1;
        this.particles = [];
        this.isVisible = true;
        
        this.init();
    }
    
    init() {
        // Create particle container
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particle-bg';
        this.container.appendChild(this.particleContainer);
        
        // Create particles
        this.createParticles();
        
        // Handle visibility changes for performance
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
        
        // Responsive particle count
        this.handleResize();
        window.addEventListener('resize', debounce(() => this.handleResize(), 250));
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const opacity = Math.random() * 0.6 + 0.2;
        const duration = (Math.random() * 20 + 15) / this.speed;
        const delay = Math.random() * duration;
        
        // Set styles
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: ${opacity};
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
            box-shadow: 0 0 ${size * 3}px ${color};
        `;
        
        this.particleContainer.appendChild(particle);
        this.particles.push(particle);
    }
    
    handleResize() {
        const width = window.innerWidth;
        let newCount;
        
        if (width < 768) {
            newCount = 20; // Mobile
        } else if (width < 1024) {
            newCount = 35; // Tablet
        } else {
            newCount = 50; // Desktop
        }
        
        if (newCount !== this.particleCount) {
            this.particleCount = newCount;
            this.clearParticles();
            this.createParticles();
        }
    }
    
    clearParticles() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }
    
    destroy() {
        this.clearParticles();
        this.particleContainer.remove();
    }
}

// ================================================
// 3D TILT EFFECTS
// ================================================

function initTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mouseenter', handleTiltEnter);
        element.addEventListener('mousemove', handleTiltMove);
        element.addEventListener('mouseleave', handleTiltLeave);
    });
}

function handleTiltEnter(e) {
    const element = e.currentTarget;
    element.style.transition = 'transform 0.1s ease-out';
}

function handleTiltMove(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    element.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(20px)
        scale3d(1.05, 1.05, 1.05)
    `;
}

function handleTiltLeave(e) {
    const element = e.currentTarget;
    element.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
}

// ================================================
// INITIALIZATION
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    new NavigationManager();
    new CardEffectManager();
    new FloatingSymbolsManager();
    new LazyLoadManager();
    initializeResumeDownload();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize particle system
    new ParticleSystem({
        container: document.body,
        particleCount: 50,
        colors: ['#64ffda', '#00bcd4', '#3f51b5'],
        speed: 1
    });

    // Initialize 3D tilt effects
    initTiltEffects();
});

// ================================================
// EXPORT FOR MODULE USAGE
// ================================================

// Export utilities for page-specific scripts
window.SiteUtils = {
    debounce,
    isValidEmail,
    showNotification,
    SITE_CONFIG
};
