// ================================================
// PROJECTS PAGE SPECIFIC JAVASCRIPT
// ================================================

class ProjectsPageManager {
    constructor() {
        this.currentFilter = 'all';
        this.projects = [];
        this.init();
    }

    init() {
        this.initializeProjectFilters();
        this.initializeProjectCards();
        this.initializeProjectModals();
        this.initializeProjectSearch();
    }

    initializeProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                this.filterProjects(filter, projectCards);
                this.currentFilter = filter;
            });
        });
    }

    filterProjects(filter, projectCards) {
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category')?.split(' ') || [];
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    initializeProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                const image = card.querySelector('.project-image img');
                const overlay = card.querySelector('.project-overlay');
                
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const image = card.querySelector('.project-image img');
                const overlay = card.querySelector('.project-overlay');
                
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });

            // Project link handlers
            this.setupProjectLinks(card);
        });
    }

    setupProjectLinks(card) {
        const liveBtn = card.querySelector('.btn-live');
        const codeBtn = card.querySelector('.btn-code');
        const detailsBtn = card.querySelector('.btn-details');

        if (liveBtn) {
            liveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const url = liveBtn.getAttribute('href');
                if (url && url !== '#') {
                    window.open(url, '_blank');
                } else {
                    window.SiteUtils.showNotification('Live demo coming soon!', 'info');
                }
            });
        }

        if (codeBtn) {
            codeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const url = codeBtn.getAttribute('href');
                if (url && url !== '#') {
                    window.open(url, '_blank');
                } else {
                    window.SiteUtils.showNotification('Source code will be available soon!', 'info');
                }
            });
        }

        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showProjectDetails(card);
            });
        }
    }

    showProjectDetails(card) {
        const title = card.querySelector('.project-title')?.textContent || 'Project Details';
        const description = card.querySelector('.project-description')?.textContent || 'No description available.';
        const technologies = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
        
        // Create modal content
        const modalContent = `
            <div class="project-modal-overlay">
                <div class="project-modal">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${description}</p>
                        <div class="modal-technologies">
                            <h3>Technologies Used:</h3>
                            <div class="tech-tags">
                                ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        <div class="modal-features">
                            <h3>Key Features:</h3>
                            <ul>
                                <li>Responsive design optimized for all devices</li>
                                <li>Modern user interface with smooth animations</li>
                                <li>Performance optimized for fast loading</li>
                                <li>Cross-browser compatibility</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalContent);
        
        // Setup modal close functionality
        this.setupModalClose();
    }

    setupModalClose() {
        const modal = document.querySelector('.project-modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    initializeProjectModals() {
        // Add modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .project-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 1;
                transition: opacity 0.3s ease;
            }
            
            .project-modal {
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: modalSlideIn 0.3s ease;
            }
            
            @keyframes modalSlideIn {
                from {
                    transform: translateY(-50px) scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-header h2 {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 5px;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: #667eea;
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .modal-technologies,
            .modal-features {
                margin-top: 20px;
            }
            
            .modal-technologies h3,
            .modal-features h3 {
                color: #7dd3fc;
                margin-bottom: 10px;
            }
            
            .tech-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .modal-features ul {
                list-style: none;
                padding: 0;
            }
            
            .modal-features li {
                padding: 8px 0;
                padding-left: 20px;
                position: relative;
                color: rgba(255, 255, 255, 0.8);
            }
            
            .modal-features li::before {
                content: '✨';
                position: absolute;
                left: 0;
            }
        `;
        document.head.appendChild(modalStyles);
    }

    initializeProjectSearch() {
        const searchInput = document.querySelector('.project-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', window.SiteUtils.debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
                const technologies = Array.from(card.querySelectorAll('.tech-tag'))
                    .map(tag => tag.textContent.toLowerCase()).join(' ');
                
                const matchesSearch = title.includes(searchTerm) || 
                                    description.includes(searchTerm) || 
                                    technologies.includes(searchTerm);
                
                if (matchesSearch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsPageManager();
});

// Add project-specific styles
const projectStyles = document.createElement('style');
projectStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-image img {
        transition: transform 0.3s ease;
    }
    
    .project-overlay {
        transition: opacity 0.3s ease;
        opacity: 0;
    }
    
    .filter-btn {
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 25px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 5px;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-color: #667eea;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(projectStyles);
