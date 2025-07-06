// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const downloadResumeBtn = document.getElementById('downloadResume');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links (for single page sections)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's an external page, let it navigate normally
        if (href.includes('.html')) {
            return;
        }
        
        // If it's a section link, prevent default and scroll
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe cards and other elements for staggered animations
document.querySelectorAll('.project-card, .position-card, .cert-card, .achievement-card, .internship-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            border-left: 4px solid #3b82f6;
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        }
        
        .notification-success {
            border-left-color: #10b981;
        }
        
        .notification-error {
            border-left-color: #ef4444;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
        }
        
        .notification-message {
            color: #1e293b;
            font-weight: 500;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #64748b;
            cursor: pointer;
            margin-left: 1rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Download resume functionality
downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // You would replace this with actual resume download logic
    showNotification('Resume download feature coming soon! Please contact me directly for my resume.', 'info');
    
    // Uncomment and modify this when you have an actual resume file
    // const link = document.createElement('a');
    // link.href = 'path/to/your/resume.pdf';
    // link.download = 'Kundan_Suryawanshi_Resume.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero section animations
window.addEventListener('load', () => {
    // Add entrance animations to hero elements
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            heroText.style.transition = 'all 1s ease-out';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            heroImage.style.transition = 'all 1s ease-out';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
    
    // Start typing animation for hero title after other animations
    setTimeout(() => {
        startTypingAnimation();
    }, 1500);
});

// Typing animation for hero title
function startTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const skillTexts = [
        'AI & Data Science Student',
        'Machine Learning Enthusiast',
        'Blockchain Developer',
        'IoT Innovator',
        'Cloud Computing Advocate',
        'Full Stack Developer',
        'Tech Leader & President',
        'Problem Solver'
    ];
    
    const typingSpeed = 80; // milliseconds between each character
    const deletingSpeed = 40; // milliseconds between each character deletion
    const pauseDuration = 1500; // pause at the end before switching
    const switchPause = 500; // pause before starting next text
    
    let currentTextIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let charIndex = 0;
    
    function typeText() {
        const fullText = skillTexts[currentTextIndex];
        
        if (!isDeleting && charIndex < fullText.length) {
            // Typing
            currentText += fullText.charAt(charIndex);
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        }
        
        heroTitle.textContent = currentText;
        
        // Add cursor effect
        heroTitle.style.borderRight = '2px solid #3b82f6';
        heroTitle.style.animation = 'blink 1s infinite';
        
        let nextTimeout = isDeleting ? deletingSpeed : typingSpeed;
        
        // If finished typing
        if (!isDeleting && charIndex === fullText.length) {
            nextTimeout = pauseDuration;
            isDeleting = true;
        }
        // If finished deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % skillTexts.length; // Move to next text
            nextTimeout = switchPause;
        }
        
        setTimeout(typeText, nextTimeout);
    }
    
    // Clear the original text and start typing
    heroTitle.textContent = '';
    typeText();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const parallax = scrolled * 0.5;
    
    if (heroSection) {
        heroSection.style.transform = `translateY(${parallax}px)`;
    }
});

// Counter animation for achievements
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animations when achievement section is visible
const achievementSection = document.querySelector('.achievements');
let countersAnimated = false;

const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            // Add any counter elements here if needed
            countersAnimated = true;
        }
    });
});

if (achievementSection) {
    achievementObserver.observe(achievementSection);
}

// Social links functionality
document.addEventListener('DOMContentLoaded', () => {
    // Update social links with actual URLs
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach((icon, index) => {
        const iconClass = icon.querySelector('i').className;
        
        if (iconClass.includes('facebook')) {
            icon.href = 'https://facebook.com/kundan.suryawanshi';
        } else if (iconClass.includes('instagram')) {
            icon.href = 'https://instagram.com/kundan_suryawanshi';
        } else if (iconClass.includes('twitter')) {
            icon.href = 'https://twitter.com/kundan_sury';
        } else if (iconClass.includes('linkedin')) {
            icon.href = 'https://linkedin.com/in/kundan-suryawanshi';
        }
        
        icon.target = '_blank';
        icon.rel = 'noopener noreferrer';
    });
    
    // Update other social links in footer and other sections
    const linkedinLinks = document.querySelectorAll('a[href="#"]:has(.fa-linkedin)');
    const githubLinks = document.querySelectorAll('a[href="#"]:has(.fa-github)');
    const leetcodeLinks = document.querySelectorAll('a[href="#"]:has(.fa-code)');
    
    linkedinLinks.forEach(link => {
        link.href = 'https://linkedin.com/in/kundan-suryawanshi';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
    
    githubLinks.forEach(link => {
        link.href = 'https://github.com/kundansury';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
    
    leetcodeLinks.forEach(link => {
        link.href = 'https://leetcode.com/kundan_suryawanshi';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });
});

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images (when you add actual images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
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
}

// Initialize lazy loading
lazyLoadImages();

// Add loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .loader-content {
            text-align: center;
            color: #3b82f6;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #e2e8f0;
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loaderStyles;
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                style.remove();
            }, 300);
        }, 500);
    });
}

// Show loading animation
document.addEventListener('DOMContentLoaded', showLoading);

// Performance optimization: Debounce scroll events
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

// Use debounced scroll handlers for better performance
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-dependent functions here
}, 16); // 60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Multi-page navigation active state
document.addEventListener('DOMContentLoaded', () => {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Update active navigation based on current page
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'home.html') ||
            (currentPage === 'index.html' && linkHref === 'home.html')) {
            link.classList.add('active');
        }
    });
    
    // Initialize enhanced overview card effects
    addDynamicStyles();
    initializeCardTilt();
    initializeScrollAnimations();
    initializeCardInteractions();
    createParticleEffect();
    
    // Initialize enhanced hero effects
    addHeroDynamicStyles();
    initializeHeroEffects();
    
    // Add performance observer for smooth animations
    if ('IntersectionObserver' in window) {
        console.log('✨ Enhanced overview cards and hero section initialized with 3D effects');
    } else {
        console.log('⚠️ Using fallback animations for older browsers');
    }
});

console.log('🚀 Portfolio website loaded successfully!');

// Enhanced 3D Tilt Effect for Overview Cards
function initializeCardTilt() {
    const cards = document.querySelectorAll('.overview-card[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transformStyle = 'preserve-3d';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-20px)
                scale3d(1.05, 1.05, 1.05)
            `;
            
            // Add glowing effect
            const glowIntensity = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / 100;
            card.style.boxShadow = `
                0 40px 80px rgba(0, 0, 0, 0.3),
                0 0 ${60 + glowIntensity * 20}px rgba(59, 130, 246, ${0.2 + glowIntensity * 0.1}),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Reset transition after animation
            setTimeout(() => {
                card.style.transition = '';
            }, 400);
        });
    });
}

// Scroll-triggered animations for Overview Cards
function initializeScrollAnimations() {
    const cards = document.querySelectorAll('.overview-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation
                const delay = Array.from(cards).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Particle effect for overview section background
function createParticleEffect() {
    const overviewSection = document.querySelector('.quick-overview');
    if (!overviewSection) return;
    
    // Create floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: linear-gradient(45deg, rgba(96, 165, 250, 0.6), rgba(52, 211, 153, 0.6));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 15}s linear infinite;
            z-index: 1;
            pointer-events: none;
        `;
        overviewSection.appendChild(particle);
    }
}

// Enhanced card hover effects with sound and haptic feedback
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.overview-card');
    
    cards.forEach(card => {
        const cardIcon = card.querySelector('.card-icon');
        const cardFeatures = card.querySelectorAll('.card-features li');
        
        card.addEventListener('mouseenter', () => {
            // Animate features list
            cardFeatures.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(10px)';
                    feature.style.color = '#f1f5f9';
                }, index * 50);
            });
            
            // Icon pulse effect
            if (cardIcon) {
                cardIcon.style.animation = 'iconPulse 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset features
            cardFeatures.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = '#e2e8f0';
            });
            
            // Reset icon
            if (cardIcon) {
                cardIcon.style.animation = '';
            }
        });
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: rippleEffect 0.6s linear;
            `;
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS animations for particles and effects
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes iconPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1) rotateY(180deg); }
            100% { transform: scale(1) rotateY(360deg); }
        }
        
        @keyframes rippleEffect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        .floating-particle {
            filter: blur(1px);
        }
        
        /* Enhanced card background animations */
        .overview-card .card-background {
            background-size: 200% 200%;
            animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Performance optimizations */
        .overview-card {
            will-change: transform;
            backface-visibility: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Hero Section Functionality
function initializeHeroEffects() {
    const hero = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image-circle');
    const heroName = document.querySelector('.hero-name');
    const heroTitle = document.querySelector('.hero-title');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    if (!hero) return;
    
    // Create floating tech symbols
    createFloatingSymbols();
    
    // Add mouse parallax effect to hero
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 10;
        const tiltY = (0.5 - x) * 10;
        
        if (heroText) {
            heroText.style.transform = `translateX(${tiltY * 2}px) translateY(${tiltX * 2}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `translateX(${tiltY * -3}px) translateY(${tiltX * -3}px) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;
        }
    });
    
    // Reset transforms when mouse leaves
    hero.addEventListener('mouseleave', () => {
        if (heroText) {
            heroText.style.transform = '';
        }
        if (heroImage) {
            heroImage.style.transform = '';
        }
    });
    
    // Enhanced typing effect for hero title
    if (heroTitle) {
        const titles = [
            'AI & Data Science Student',
            'Machine Learning Enthusiast',
            'Blockchain Developer',
            'Full Stack Developer',
            'Innovation Leader'
        ];
        
        let currentTitleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentTitle = titles[currentTitleIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                heroTitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentCharIndex === currentTitle.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                typeSpeed = 500; // Pause before starting new title
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after initial load
        setTimeout(typeEffect, 1000);
    }
    
    // Add ripple effect to social icons
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: socialRipple 0.6s linear;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add 3D hover effect to hero image
    if (heroImage) {
        heroImage.addEventListener('mousemove', (e) => {
            const rect = heroImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            heroImage.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = '';
        });
    }
}

// Create floating tech symbols in the background
function createFloatingSymbols() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const symbols = ['⚡', '🚀', '💻', '🔬', '🎯', '⭐', '🔮', '💡', '🌟', '⚙️'];
    
    for (let i = 0; i < 8; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'floating-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            color: rgba(96, 165, 250, 0.1);
            pointer-events: none;
            z-index: 1;
            animation: floatSymbol ${Math.random() * 20 + 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(symbol);
    }
}

// Add CSS for new animations
function addHeroDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes socialRipple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
        
        @keyframes floatSymbol {
            0% {
                transform: translateY(100vh) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) translateX(50px) rotate(360deg);
                opacity: 0;
            }
        }
        
        /* Enhanced button hover effects */
        .btn {
            will-change: transform;
        }
        
        .btn:active {
            transform: translateY(-1px) scale(0.98);
        }
        
        /* Profile placeholder enhanced animation */
        .profile-placeholder {
            will-change: transform;
        }
        
        /* Smooth hero transitions */
        .hero-text, .hero-image-circle {
            will-change: transform;
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialize all advanced features
function initializeAdvancedFeatures() {
    initializeCardTilt();
    initializeScrollAnimations();
    createParticleEffect();
    initializeCardInteractions();
    addDynamicStyles();
    initializeHeroEffects();
    addHeroDynamicStyles();
}

// Call this function to initialize everything
initializeAdvancedFeatures();
