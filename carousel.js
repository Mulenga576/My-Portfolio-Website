// Initialize carousels
document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel');
  
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
});
