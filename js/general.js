// ================================================
// GENERAL PAGES JAVASCRIPT (About, Leadership, Certifications, Achievements, Experience)
// ================================================

class GeneralPageManager {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.init();
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('about')) return 'about';
        if (path.includes('leadership')) return 'leadership';
        if (path.includes('certifications')) return 'certifications';
        if (path.includes('achievements')) return 'achievements';
        if (path.includes('experience')) return 'experience';
        return 'general';
    }

    init() {
        this.initializeScrollAnimations();
        this.initializeTimelineAnimations();
        this.initializeSkillAnimations();
        this.initializeCardInteractions();
        
        // Page-specific initializations
        switch (this.currentPage) {
            case 'about':
                this.initializeAboutPage();
                break;
            case 'experience':
                this.initializeExperiencePage();
                break;
            case 'achievements':
                this.initializeAchievementsPage();
                break;
        }
    }

    initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animations for different elements
                    if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    }
                    
                    if (entry.target.classList.contains('skill-category')) {
                        this.animateSkillBars(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll(`
            .glassmorphic-card,
            .timeline-item,
            .skill-category,
            .achievement-card,
            .cert-card,
            .position-card,
            .experience-card,
            .activity-category
        `).forEach(el => {
            observer.observe(el);
        });
    }

    initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item, .experience-card');
        
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }

    animateTimelineItem(item) {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        
        if (dot) {
            setTimeout(() => {
                dot.style.transform = 'scale(1.2)';
                dot.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
                
                setTimeout(() => {
                    dot.style.transform = 'scale(1)';
                }, 300);
            }, 200);
        }
        
        if (content) {
            content.style.animation = 'slideInFromSide 0.6s ease forwards';
        }
    }

    initializeSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item, .tech-tag');
        
        skillItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.05)';
                item.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '';
            });
        });
    }

    animateSkillBars(category) {
        const skillBars = category.querySelectorAll('.skill-bar-fill');
        
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage') || '90';
            
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, index * 100);
        });
    }

    initializeCardInteractions() {
        const cards = document.querySelectorAll(`
            .achievement-card,
            .cert-card,
            .position-card,
            .experience-card,
            .activity-category,
            .skill-category
        `);
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card);
            });
        });
    }

    enhanceCardHover(card) {
        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3), 0 0 30px rgba(120, 119, 198, 0.2)';
        
        // Enhance badges
        const badge = card.querySelector('.achievement-badge, .cert-badge, .position-badge, .experience-badge');
        if (badge) {
            badge.style.transform = 'scale(1.1)';
            badge.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        }
        
        // Animate icons
        const icon = card.querySelector('.achievement-icon, .cert-icon, .position-icon, .experience-icon, .category-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    }

    resetCardHover(card) {
        card.style.boxShadow = '';
        
        const badge = card.querySelector('.achievement-badge, .cert-badge, .position-badge, .experience-badge');
        if (badge) {
            badge.style.transform = 'scale(1)';
            badge.style.boxShadow = '';
        }
        
        const icon = card.querySelector('.achievement-icon, .cert-icon, .position-icon, .experience-icon, .category-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    initializeAboutPage() {
        // Personal info animations
        const personalInfo = document.querySelector('.personal-info');
        if (personalInfo) {
            const infoItems = personalInfo.querySelectorAll('li');
            infoItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.classList.add('fade-in-item');
            });
        }

        // Skills progress animation
        this.initializeSkillProgress();
    }

    initializeSkillProgress() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-fill');
                    const percentage = progressBar.getAttribute('data-percentage');
                    
                    setTimeout(() => {
                        progressBar.style.width = percentage + '%';
                    }, 200);
                    
                    observer.unobserve(entry.target);
                }
            });
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    initializeExperiencePage() {
        // Experience timeline enhancements
        const experienceCards = document.querySelectorAll('.experience-card');
        
        experienceCards.forEach(card => {
            const techTags = card.querySelectorAll('.tech-tag, .technologies-used span');
            
            techTags.forEach((tag, index) => {
                tag.style.animationDelay = `${index * 0.1}s`;
                tag.addEventListener('click', () => {
                    this.showTechnologyInfo(tag.textContent);
                });
            });
        });
    }

    showTechnologyInfo(tech) {
        window.SiteUtils.showNotification(
            `${tech} - Click to learn more about this technology!`,
            'info'
        );
    }

    initializeAchievementsPage() {
        // Achievement card special effects
        const achievementCards = document.querySelectorAll('.achievement-card');
        
        achievementCards.forEach(card => {
            if (card.classList.contains('featured')) {
                this.addSparkleEffect(card);
            }
        });
    }

    addSparkleEffect(element) {
        const sparkles = ['✨', '⭐', '💫', '🌟'];
        
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10';
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GeneralPageManager();
});

// Add general page styles
const generalStyles = document.createElement('style');
generalStyles.textContent = `
    .animate-in {
        opacity: 1;
        transform: translateY(0) scale(1);
        transition: all 0.6s ease;
    }

    .glassmorphic-card:not(.animate-in),
    .timeline-item:not(.animate-in),
    .achievement-card:not(.animate-in),
    .cert-card:not(.animate-in),
    .position-card:not(.animate-in),
    .experience-card:not(.animate-in) {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }

    @keyframes slideInFromSide {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0);
        }
    }

    .fade-in-item {
        animation: fadeInUp 0.6s ease forwards;
    }

    .skill-fill {
        transition: width 1s ease-in-out;
        width: 0%;
    }

    .tech-tag,
    .skill-item {
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .achievement-icon,
    .cert-icon,
    .position-icon,
    .experience-icon,
    .category-icon {
        transition: all 0.3s ease;
    }

    .achievement-badge,
    .cert-badge,
    .position-badge,
    .experience-badge {
        transition: all 0.3s ease;
    }

    .timeline-dot {
        transition: all 0.3s ease;
    }

    .sparkle {
        font-size: 12px;
        user-select: none;
    }
`;
document.head.appendChild(generalStyles);
