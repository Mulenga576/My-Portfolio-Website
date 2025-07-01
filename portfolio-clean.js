// Typing Animation
function initTypingAnimation() {
  const typedTextSpan = document.querySelector("#typed");
  if (!typedTextSpan) return;
  
  const textArray = ["Web Developer", "Data Scientist", "Math Enthusiast", "Finance Analyst"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = textArray[textArrayIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingDelay);
    } else {
      const delay = isDeleting ? erasingDelay : typingDelay;
      setTimeout(type, delay);
    }
  }

  // Start typing effect after a short delay
  setTimeout(type, 1000);
}

// Initialize carousels
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  if (carousels.length === 0) return;
  
  carousels.forEach(carousel => {
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.dot');
    let currentIndex = 0;
    let autoSlideInterval;

    // Function to show slide by index
    function showSlide(index) {
      // Wrap around if index is out of bounds
      if (index >= items.length) {
        index = 0;
      } else if (index < 0) {
        index = items.length - 1;
      }
      
      // Update active state
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      
      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentIndex = index;
      
      // Reset auto-slide timer
      resetAutoSlide();
    }
    
    // Next slide
    function nextSlide() {
      showSlide(currentIndex + 1);
    }
    
    // Previous slide
    function prevSlide() {
      showSlide(currentIndex - 1);
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Start with first slide active and begin auto-slide
    showSlide(0);
    startAutoSlide();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeThreshold = 50; // Minimum distance to consider it a swipe
      
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous slide
        prevSlide();
      }
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
      });
    });
  }
}

// Portfolio filtering
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Show/hide portfolio items based on filter
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            // Trigger reflow for animation
            void item.offsetWidth;
            item.classList.add('animate__animated', 'animate__fadeIn');
          } else {
            item.style.display = 'none';
            item.classList.remove('animate__animated', 'animate__fadeIn');
          }
        });
      });
    });
  }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize components
  initTypingAnimation();
  initCarousels();
  initSmoothScrolling();
  initMobileMenu();
  initPortfolioFilter();
});
