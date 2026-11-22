/**
 * Dynamic Project Rotation System
 * Rotates projects from "My Work" section into "Featured Projects" every 24 hours
 */

class ProjectRotation {
    constructor() {
        this.rotationKey = 'projectRotationData';
        this.rotationInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Projects from "My Work" section that can be rotated into Featured Projects
        this.portfolioProjects = [
            {
                id: 'uwc-zambia',
                title: 'UWC Zambia Website',
                category: 'Web Development',
                description: 'Redesigned and developed the official website for UWC Zambia, improving user experience and accessibility with modern web technologies.',
                image: 'assets/images/vitor-paladini-NfdrYl4u6_I-unsplash.jpg',
                icon: 'fas fa-globe',
                tech: [
                    { icon: 'fab fa-html5', name: 'HTML5' },
                    { icon: 'fab fa-css3-alt', name: 'CSS3' },
                    { icon: 'fab fa-js', name: 'JavaScript' },
                    { icon: 'fas fa-mobile-alt', name: 'Responsive' },
                    { icon: 'fas fa-paint-brush', name: 'UI/UX' }
                ],
                demo: { href: 'https://zm.uwc.org/', label: 'Visit UWC Zambia' }
            },
            {
                id: 'internship-tracker',
                title: 'Internship Tracker',
                category: 'Web Development',
                description: 'Developed a comprehensive web application to track internship applications, interviews, and progress with intuitive dashboard and analytics.',
                image: 'assets/images/arthur-hinton-YbgLm_O7mGQ-unsplash.jpg',
                icon: 'fas fa-briefcase',
                tech: [
                    { icon: 'fab fa-html5', name: 'HTML' },
                    { icon: 'fab fa-css3-alt', name: 'CSS' },
                    { icon: 'fab fa-js', name: 'JavaScript' },
                    { icon: 'fas fa-chart-bar', name: 'Analytics' },
                    { icon: 'fas fa-database', name: 'Local Storage' }
                ],
                demo: { href: 'internship-tracker.html', label: 'View Tracker' },
                source: {
                    href: 'https://github.com/Mulenga576/My-Portfolio-Website/blob/main/internship-tracker.html',
                    label: 'View Source'
                }
            },
            {
                id: 'business-dashboard',
                title: 'Business Intelligence Dashboard',
                category: 'Data Visualization',
                description: 'A sophisticated tech-driven business analytics platform combining real-time data visualization with comprehensive financial tracking and performance metrics.',
                image: 'assets/images/empire-tracker-dashboard.png',
                icon: 'fas fa-chart-line',
                tech: [
                    { icon: 'fas fa-chart-bar', name: 'Chart.js' },
                    { icon: 'fab fa-js', name: 'JavaScript' },
                    { icon: 'fas fa-database', name: 'Data Analytics' },
                    { icon: 'fas fa-tachometer-alt', name: 'Dashboard' },
                    { icon: 'fas fa-coins', name: 'Financial' }
                ],
                demo: { href: 'https://sage-mooncake-0a475c.netlify.app/', label: 'View Demo' }
            }
        ];

        // Original featured projects (placeholders that get replaced)
        this.featuredProjects = [
            {
                id: 'financial-analysis',
                title: 'Financial Market Analysis',
                category: 'Data Science',
                description: 'Conducted comprehensive analysis of financial markets using Python, identifying key trends and investment opportunities through advanced data visualization techniques and machine learning models.',
                icon: 'fas fa-chart-line',
                tech: [
                    { icon: 'fab fa-python', name: 'Python' },
                    { icon: 'fas fa-database', name: 'Pandas' },
                    { icon: 'fas fa-chart-bar', name: 'Matplotlib' },
                    { icon: 'fas fa-project-diagram', name: 'NumPy' },
                    { icon: 'fas fa-brain', name: 'Scikit-learn' }
                ]
            },
            {
                id: 'ecommerce-platform',
                title: 'E-commerce Platform',
                category: 'Web Development',
                description: 'Developed a full-stack e-commerce platform with user authentication, real-time inventory management, and secure payment processing using modern web technologies.',
                icon: 'fas fa-laptop-code',
                tech: [
                    { icon: 'fab fa-react', name: 'React' },
                    { icon: 'fab fa-node-js', name: 'Node.js' },
                    { icon: 'fas fa-database', name: 'MongoDB' },
                    { icon: 'fas fa-bolt', name: 'Express' },
                    { icon: 'fas fa-credit-card', name: 'Stripe' }
                ]
            },
            {
                id: 'fitness-tracker',
                title: 'Fitness Tracker App',
                category: 'Mobile Development',
                description: 'Created a cross-platform fitness tracking application with personalized workout plans, progress analytics, and integration with health devices.',
                icon: 'fas fa-mobile-alt',
                tech: [
                    { icon: 'fab fa-react', name: 'React Native' },
                    { icon: 'fas fa-fire', name: 'Firebase' },
                    { icon: 'fas fa-chart-line', name: 'Recharts' },
                    { icon: 'fas fa-heartbeat', name: 'HealthKit' },
                    { icon: 'fas fa-database', name: 'SQLite' }
                ]
            }
        ];

        this.init();
    }

    init() {
        this.checkAndRotateProjects();
        // Set up interval to check every hour (in case page stays open)
        setInterval(() => this.checkAndRotateProjects(), 60 * 60 * 1000);
    }

    checkAndRotateProjects() {
        const rotationData = this.getRotationData();
        const now = Date.now();

        // Check if it's time to rotate (24 hours have passed)
        if (!rotationData.lastRotation || (now - rotationData.lastRotation) >= this.rotationInterval) {
            this.rotateProject();
        } else {
            // Apply the current rotation if it exists
            if (rotationData.currentRotation) {
                this.applyRotation(rotationData.currentRotation);
            }
        }
    }

    rotateProject() {
        const rotationData = this.getRotationData();
        
        // Get next project to rotate in
        const nextProjectIndex = (rotationData.lastProjectIndex + 1) % this.portfolioProjects.length;
        const projectToRotate = this.portfolioProjects[nextProjectIndex];
        
        // Get random position to replace (0, 1, or 2)
        const positionToReplace = Math.floor(Math.random() * 3);
        
        const newRotationData = {
            lastRotation: Date.now(),
            lastProjectIndex: nextProjectIndex,
            currentRotation: {
                project: projectToRotate,
                position: positionToReplace,
                originalProject: this.featuredProjects[positionToReplace]
            }
        };

        // Save rotation data
        localStorage.setItem(this.rotationKey, JSON.stringify(newRotationData));
        
        // Apply the rotation
        this.applyRotation(newRotationData.currentRotation);
        
        console.log(`🔄 Project rotated: ${projectToRotate.title} replaced position ${positionToReplace}`);
    }

    applyRotation(rotation) {
        const { position } = rotation;
        // Older saved rotations contain a copy of the project. Use its ID to load current links.
        const project = this.portfolioProjects.find(({ id }) => id === rotation.project?.id);
        const experienceCards = document.querySelectorAll('.experience-card');
        
        if (project && experienceCards[position]) {
            this.updateExperienceCard(experienceCards[position], project);
        }
    }

    updateExperienceCard(cardElement, project) {
        // Add rotation indicator
        cardElement.setAttribute('data-rotated', 'true');
        cardElement.style.position = 'relative';
        
        // Add rotation badge
        if (!cardElement.querySelector('.rotation-badge')) {
            const badge = document.createElement('div');
            badge.className = 'rotation-badge';
            badge.innerHTML = '<i class="fas fa-sync-alt"></i> Featured Today';
            cardElement.appendChild(badge);
        }

        // Update icon
        const iconElement = cardElement.querySelector('.experience-icon i');
        if (iconElement) {
            iconElement.className = project.icon;
        }

        // Update title and category
        const titleElement = cardElement.querySelector('.experience-header h3');
        const categoryElement = cardElement.querySelector('.experience-category');
        if (titleElement) titleElement.textContent = project.title;
        if (categoryElement) categoryElement.textContent = project.category;

        // Update description
        const descriptionElement = cardElement.querySelector('.experience-description');
        if (descriptionElement) descriptionElement.textContent = project.description;

        // Update tech stack
        const techList = cardElement.querySelector('.experience-tech');
        if (techList) {
            techList.innerHTML = project.tech.map(tech => 
                `<li><i class="${tech.icon}"></i> ${tech.name}</li>`
            ).join('');
        }

        this.updateProjectLink(cardElement, 'demo', project.demo, 'Demo unavailable');
        this.updateProjectLink(cardElement, 'source', project.source, 'Source unavailable');
    }

    updateProjectLink(cardElement, type, destination, unavailableLabel) {
        const attribute = 'data-project-' + type;
        const current = cardElement.querySelector('[' + attribute + ']');
        if (!current) return;

        const element = document.createElement(destination ? 'a' : 'span');
        element.setAttribute(attribute, '');
        element.className = destination ? 'experience-link' : 'experience-link-status';
        element.textContent = destination ? destination.label : unavailableLabel;
        if (destination) element.href = destination.href;
        current.replaceWith(element);
    }

    getRotationData() {
        const stored = localStorage.getItem(this.rotationKey);
        return stored ? JSON.parse(stored) : {
            lastRotation: null,
            lastProjectIndex: -1,
            currentRotation: null
        };
    }

    // Method to manually trigger rotation (for testing)
    forceRotation() {
        localStorage.removeItem(this.rotationKey);
        this.rotateProject();
    }

    // Method to reset rotation system
    resetRotation() {
        localStorage.removeItem(this.rotationKey);
        location.reload();
    }

    // Get rotation status for debugging
    getRotationStatus() {
        const data = this.getRotationData();
        const now = Date.now();
        const timeUntilNext = data.lastRotation ? 
            this.rotationInterval - (now - data.lastRotation) : 0;
        
        return {
            lastRotation: data.lastRotation ? new Date(data.lastRotation) : null,
            timeUntilNextRotation: timeUntilNext > 0 ? timeUntilNext : 0,
            currentProject: data.currentRotation?.project?.title || 'None',
            currentPosition: data.currentRotation?.position ?? 'None'
        };
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectRotation = new ProjectRotation();
    
    // Add console commands for debugging (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🎯 Project Rotation System Loaded');
        console.log('Debug commands:');
        console.log('- projectRotation.forceRotation() - Force immediate rotation');
        console.log('- projectRotation.resetRotation() - Reset rotation system');
        console.log('- projectRotation.getRotationStatus() - Get current status');
    }
});
