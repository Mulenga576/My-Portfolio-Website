// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

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