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
        console.log('Setting up mobile toggle...');
        console.log('Hamburger element:', this.hamburger);
        console.log('Nav menu element:', this.navMenu);
        
        if (this.hamburger && this.navMenu) {
            console.log('Both elements found, adding click listener');
            
            this.hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Hamburger clicked!');
                console.log('Before toggle - Hamburger active:', this.hamburger.classList.contains('active'));
                console.log('Before toggle - Menu active:', this.navMenu.classList.contains('active'));
                
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
                
                console.log('After toggle - Hamburger active:', this.hamburger.classList.contains('active'));
                console.log('After toggle - Menu active:', this.navMenu.classList.contains('active'));
                
                // Force show menu if active
                if (this.navMenu.classList.contains('active')) {
                    this.navMenu.style.left = '0';
                    this.navMenu.style.display = 'flex';
                } else {
                    this.navMenu.style.left = '-100%';
                }
            });
            
            // Also add touch event for mobile devices
            this.hamburger.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.hamburger.click();
            });
        } else {
            console.error('Hamburger or nav menu element not found!');
            console.error('Available elements:', {
                hamburger: document.querySelector('.hamburger'),
                navMenu: document.querySelector('.nav-menu'),
                allHamburgers: document.querySelectorAll('.hamburger'),
                allNavMenus: document.querySelectorAll('.nav-menu')
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
// RESPONSIVE FUNCTIONALITY
// ================================================

// Mobile Navigation Toggle
function initMobileNavigation() {
    console.log('Backup mobile navigation initialization...');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Found elements:', { hamburger, navMenu, navLinksCount: navLinks.length });
    
    if (hamburger && navMenu) {
        // Remove any existing event listeners
        hamburger.removeEventListener('click', handleHamburgerClick);
        
        // Add new event listener
        hamburger.addEventListener('click', handleHamburgerClick);
        hamburger.addEventListener('touchend', handleHamburgerTouch);
        
        console.log('Mobile navigation initialized successfully');
    } else {
        console.error('Mobile navigation elements not found');
        
        // Try to find elements after a delay
        setTimeout(() => {
            const delayedHamburger = document.querySelector('.hamburger');
            const delayedNavMenu = document.querySelector('.nav-menu');
            
            if (delayedHamburger && delayedNavMenu) {
                delayedHamburger.addEventListener('click', handleHamburgerClick);
                delayedHamburger.addEventListener('touchend', handleHamburgerTouch);
                console.log('Mobile navigation initialized with delay');
            }
        }, 500);
    }
}

function handleHamburgerClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Hamburger click handler called');
    
    if (hamburger && navMenu) {
        const isActive = hamburger.classList.contains('active');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        // Force styles
        if (!isActive) {
            navMenu.style.left = '0';
            navMenu.style.display = 'flex';
            navMenu.style.transform = 'translateX(0)';
            navMenu.style.visibility = 'visible';
            navMenu.style.opacity = '1';
        } else {
            navMenu.style.left = '-100%';
            navMenu.style.transform = 'translateX(-100%)';
        }
        
        console.log('Menu toggled:', !isActive ? 'opened' : 'closed');
    }
}

function handleHamburgerTouch(e) {
    e.preventDefault();
    e.stopPropagation();
    // Trigger click event
    setTimeout(() => handleHamburgerClick(e), 50);
}

// Responsive Behavior Handler
function handleResponsiveBehavior() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;

    // Adjust particle count based on device
    if (isMobile) {
        // Reduce particles on mobile for performance
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 10) particle.style.display = 'none';
        });
    } else if (isTablet) {
        // Medium particle count on tablet
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 20) particle.style.display = 'none';
            else particle.style.display = 'block';
        });
    } else {
        // Full particles on desktop
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.display = 'block';
        });
    }

    // Adjust scroll behavior
    if (isMobile) {
        // Disable some hover effects on mobile
        document.body.classList.add('mobile-device');
    } else {
        document.body.classList.remove('mobile-device');
    }
}

// Touch and Gesture Support
function initTouchSupport() {
    // Add touch classes for better touch device support
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Handle orientation changes
    window.addEventListener('orientationchange', debounce(() => {
        setTimeout(() => {
            handleResponsiveBehavior();
            window.scrollTo(0, window.scrollY); // Fix scroll position
        }, 100);
    }, 250));
}

// Responsive Image Loading
function initResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Responsive Font Size Adjustment
function adjustFontSizes() {
    const screenWidth = window.innerWidth;
    const root = document.documentElement;

    if (screenWidth <= 480) {
        root.style.fontSize = '14px';
    } else if (screenWidth <= 768) {
        root.style.fontSize = '15px';
    } else if (screenWidth <= 1024) {
        root.style.fontSize = '16px';
    } else {
        root.style.fontSize = '16px';
    }
}

// Responsive Grid Adjustments
function adjustGridLayouts() {
    const grids = document.querySelectorAll('.responsive-grid');
    const screenWidth = window.innerWidth;

    grids.forEach(grid => {
        if (screenWidth <= 768) {
            grid.style.gridTemplateColumns = '1fr';
        } else if (screenWidth <= 1024) {
            grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        }
    });
}

// Performance Optimization for Mobile
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity
        document.body.classList.add('reduced-animations');
        
        // Disable expensive effects
        const expensiveElements = document.querySelectorAll('.expensive-animation');
        expensiveElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
        
        // Optimize scroll events
        let ticking = false;
        function updateScroll() {
            // Minimal scroll updates for mobile
            ticking = false;
        }
        
        document.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    }
}

// Initialize Responsive Features
function initResponsiveFeatures() {
    initMobileNavigation();
    initTouchSupport();
    initResponsiveImages();
    handleResponsiveBehavior();
    adjustFontSizes();
    adjustGridLayouts();
    optimizeForMobile();

    // Handle window resize
    const handleResize = debounce(() => {
        handleResponsiveBehavior();
        adjustFontSizes();
        adjustGridLayouts();
        optimizeForMobile();
    }, 250);

    window.addEventListener('resize', handleResize);
    
    // Handle device orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            handleResize();
        }, 100);
    });
}

// ================================================
// THEME TOGGLE FUNCTIONALITY
// ================================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle theme classes or functionality here
            console.log('Theme toggle clicked');
            
            // Toggle icon
            if (themeIcon) {
                if (themeIcon.classList.contains('fa-sun')) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                } else {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }
        });
    }
}

// ================================================
// INITIALIZATION
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing...');
    
    // Initialize core functionality
    new NavigationManager();
    
    // Initialize backup mobile navigation
    initMobileNavigation();
    
    // Initialize theme toggle
    initThemeToggle();
    
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

    // Initialize responsive features
    initResponsiveFeatures();
    
    // Initialize theme toggle
    initThemeToggle();
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

// Debug function to test navigation visibility
function debugNavigation() {
    console.log('=== NAVIGATION DEBUG ===');
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navLogo = document.querySelector('.nav-logo');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('Navbar:', navbar, navbar ? getComputedStyle(navbar).display : 'null');
    console.log('Nav Container:', navContainer, navContainer ? getComputedStyle(navContainer).display : 'null');
    console.log('Nav Logo:', navLogo, navLogo ? getComputedStyle(navLogo).display : 'null');
    console.log('Hamburger:', hamburger, hamburger ? getComputedStyle(hamburger).display : 'null');
    console.log('Nav Menu:', navMenu, navMenu ? getComputedStyle(navMenu).display : 'null');
    
    // Force show navigation
    if (navbar) {
        navbar.style.display = 'flex';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.width = '100%';
        navbar.style.zIndex = '10000';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
    
    if (navContainer) {
        navContainer.style.display = 'flex';
        navContainer.style.justifyContent = 'space-between';
        navContainer.style.alignItems = 'center';
        navContainer.style.width = '100%';
        navContainer.style.padding = '0.75rem 20px';
    }
    
    if (navLogo) {
        navLogo.style.display = 'flex';
        navLogo.style.opacity = '1';
        navLogo.style.visibility = 'visible';
    }
    
    if (hamburger) {
        hamburger.style.display = 'flex';
        hamburger.style.opacity = '1';
        hamburger.style.visibility = 'visible';
        hamburger.style.background = 'rgba(255, 255, 255, 0.1)';
        hamburger.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        hamburger.style.padding = '0.5rem';
        hamburger.style.borderRadius = '8px';
    }
    
    console.log('Navigation forced to be visible');
}

// Call debug function on page load
window.addEventListener('load', () => {
    setTimeout(debugNavigation, 100);
});

// Also expose it to window for manual testing
window.debugNavigation = debugNavigation;

// Simple direct hamburger menu handler
function setupSimpleHamburgerMenu() {
    console.log('Setting up simple hamburger menu...');
    
    // Wait for elements to be available
    setTimeout(() => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            console.log('Simple handler: Found hamburger and nav menu');
            
            // Remove any existing listeners to avoid duplicates
            hamburger.onclick = null;
            
            // Add simple click handler
            hamburger.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Simple handler: Hamburger clicked');
                
                // Toggle classes
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
                
                // Force show/hide with inline styles
                if (hamburger.classList.contains('active')) {
                    navMenu.style.cssText = `
                        left: 0 !important;
                        display: flex !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        transform: translateX(0) !important;
                        position: fixed !important;
                        top: 70px !important;
                        width: 100% !important;
                        height: calc(100vh - 70px) !important;
                        background: rgba(10, 10, 10, 0.98) !important;
                        backdrop-filter: blur(30px) !important;
                        flex-direction: column !important;
                        justify-content: flex-start !important;
                        align-items: center !important;
                        padding: 2rem 1rem !important;
                        gap: 1rem !important;
                        z-index: 9999 !important;
                        transition: all 0.3s ease !important;
                    `;
                    console.log('Simple handler: Menu opened');
                } else {
                    navMenu.style.cssText = `
                        left: -100% !important;
                        transform: translateX(-100%) !important;
                    `;
                    console.log('Simple handler: Menu closed');
                }
            };
            
            // Also add touch handler for mobile
            hamburger.addEventListener('touchstart', function(e) {
                e.preventDefault();
                hamburger.click();
            });
            
            console.log('Simple hamburger menu setup complete');
        } else {
            console.error('Simple handler: Could not find hamburger or nav menu');
        }
    }, 200);
}

// Call this function multiple times to ensure it works
window.addEventListener('DOMContentLoaded', setupSimpleHamburgerMenu);
window.addEventListener('load', setupSimpleHamburgerMenu);
setTimeout(setupSimpleHamburgerMenu, 500);
setTimeout(setupSimpleHamburgerMenu, 1000);
