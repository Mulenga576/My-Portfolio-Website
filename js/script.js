// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Function to handle smooth scrolling
  function scrollToSection(selector, offset = 80) {
    const element = document.querySelector(selector);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Handle navigation link clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
      }
      
      // Scroll to the section
      scrollToSection(targetId);
      
      // Update URL
      history.pushState(null, null, targetId);
    });
  });
  
  // Creative Back to Top Button
  const backToTopBtn = document.createElement('div');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.setAttribute('role', 'button');
  backToTopBtn.tabIndex = 0;
  
  // Add creative content to the button
  backToTopBtn.innerHTML = `
    <div class="back-to-top-arrow">
      <i class="fas fa-arrow-up"></i>
    </div>
    <div class="back-to-top-text">Back to Top</div>
    <div class="back-to-top-particles"></div>
  `;
  
  document.body.appendChild(backToTopBtn);
  
  // Show/hide back to top button with animation
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide based on scroll position
    if (scrollTop > 300) {
      backToTopBtn.classList.add('show');
      
      // Add direction-based animation
      if (scrollTop > lastScrollTop) {
        // Scrolling down
        backToTopBtn.classList.add('scrolling-down');
        backToTopBtn.classList.remove('scrolling-up');
      } else {
        // Scrolling up
        backToTopBtn.classList.add('scrolling-up');
        backToTopBtn.classList.remove('scrolling-down');
      }
    } else {
      backToTopBtn.classList.remove('show');
    }
    
    lastScrollTop = scrollTop;
    
    // Add progress indicator
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    backToTopBtn.style.setProperty('--scroll-progress', `${scrollProgress}%`);
  });
  
  // Back to top functionality with animation
  function scrollToTop() {
    backToTopBtn.classList.add('clicked');
    
    // Add particles animation
    createParticles(backToTopBtn);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset animation after click
    setTimeout(() => {
      backToTopBtn.classList.remove('clicked');
    }, 1000);
  }
  
  // Click and keypress events
  backToTopBtn.addEventListener('click', scrollToTop);
  backToTopBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });
  
  // Create particles effect
  function createParticles(button) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    button.querySelector('.back-to-top-particles').appendChild(particles);
    
    // Remove particles after animation
    setTimeout(() => {
      particles.remove();
    }, 1000);
  }

  // Handle Explore My Journey button click
  const beginJourneyBtn = document.getElementById('begin-journey');
  if (beginJourneyBtn) {
    // Store the current state in a data attribute
    beginJourneyBtn.setAttribute('data-visible', 'true');
    
    beginJourneyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const weekSections = document.querySelectorAll('.week-section');
      const isVisible = beginJourneyBtn.getAttribute('data-visible') === 'true';
      
      // Toggle visibility with animation
      weekSections.forEach((section, index) => {
        if (isVisible) {
          // Add hidden class to trigger fade out
          section.classList.add('hidden');
        } else {
          // Remove hidden class to trigger fade in
          section.classList.remove('hidden');
          
          // Scroll to first section when showing
          if (index === 0) {
            smoothScroll('#week-1', 80);
          }
        }
      });
      
      // Update button text and state
      beginJourneyBtn.textContent = isVisible ? 'Show Journey' : 'Hide Journey';
      beginJourneyBtn.setAttribute('data-visible', String(!isVisible));
    });
  }

  // Handle Get in Touch button click
  const contactBtn = document.getElementById('contact-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll('#contact-section');
    });
  }

  // Set up intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe all week sections for scroll animations
  document.querySelectorAll('.week-section').forEach((section) => {
    observer.observe(section);
  });

  // Add fade-in animation to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '0';
    setTimeout(() => {
      hero.style.transition = 'opacity 1s ease-out';
      hero.style.opacity = '1';
    }, 100);
  }

  // Add hover effect to log entries
  const logEntries = document.querySelectorAll('.log-entry');
  logEntries.forEach(entry => {
    entry.addEventListener('mouseenter', () => {
      entry.style.transform = 'translateY(-5px)';
      entry.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
    });
    
    entry.addEventListener('mouseleave', () => {
      entry.style.transform = 'translateY(0)';
      entry.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
  });

  // Add click effect to task items
  const taskItems = document.querySelectorAll('.day-tasks li');
  taskItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      item.classList.toggle('completed');
      
      // Save completed state to localStorage
      const taskId = item.closest('.week-section').id + '-' + 
                    item.closest('.day-card').querySelector('.day-name').textContent + 
                    '-' + Array.from(item.parentNode.children).indexOf(item);
      
      if (item.classList.contains('completed')) {
        localStorage.setItem(taskId, 'completed');
      } else {
        localStorage.removeItem(taskId);
      }
    });
    
    // Load completed state from localStorage
    const weekId = item.closest('.week-section').id || 'week-1';
    const dayName = item.closest('.day-card').querySelector('.day-name').textContent;
    const taskIndex = Array.from(item.parentNode.children).indexOf(item);
    const taskId = `${weekId}-${dayName}-${taskIndex}`;
    
    if (localStorage.getItem(taskId)) {
      item.classList.add('completed');
    }
  });
  
  // Add week IDs to sections for persistence
  document.querySelectorAll('.week-section').forEach((section, index) => {
    section.id = `week-${index + 1}`;
  });
});