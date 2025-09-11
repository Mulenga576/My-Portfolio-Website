document.addEventListener('DOMContentLoaded', function() {
  const downloadCvBtn = document.getElementById('download-cv');
  
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Direct download approach - simpler and more reliable
      const cvPath = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:' ? 
        'public/downloads/Mulenga Mpikula Silence CV.pdf' : 
        'downloads/Mulenga%20Mpikula%20Silence%20CV.pdf';
      
      console.log('Downloading CV from:', cvPath);
      
      // Create download link
      const link = document.createElement('a');
      link.href = cvPath;
      link.download = 'Mulenga_Mpikula_Silence_CV.pdf';
      link.target = '_blank';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showNotification('CV download started!', 'success');
    });
  }
  
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.background = type === 'error' ? '#ff4444' : 'var(--primary)';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.style.zIndex = '1000';
    notification.style.transition = 'opacity 0.3s';
    notification.style.opacity = '0';
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    void notification.offsetWidth;
    
    // Fade in
    notification.style.opacity = '1';
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
});
