// Performance optimizations
(function() {
  // Preload critical resources
  function preloadCriticalResources() {
    const resources = [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
    ];
    
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource;
      link.onload = () => link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  }

  // Lazy load images
  function lazyLoadImages() {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            if (lazyImage.dataset.srcset) {
              lazyImage.srcset = lazyImage.dataset.srcset;
            }
            lazyImage.classList.remove('lazy');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(lazyImage => {
        lazyImageObserver.observe(lazyImage);
      });
    }
  }

  // Optimize animations for performance
  function optimizeAnimations() {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const hasAnimation = style.animationName !== 'none';
      const hasTransition = style.transition !== 'all 0s ease 0s';
      
      if (hasAnimation || hasTransition) {
        el.style.willChange = 'transform, opacity';
      }
    });
  }

  // Initialize performance optimizations
  document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    lazyLoadImages();
    optimizeAnimations();
  });

  // Add loading="lazy" to iframes
  document.addEventListener('DOMContentLoaded', () => {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (!iframe.loading) {
        iframe.setAttribute('loading', 'lazy');
      }
    });
  });
})();
