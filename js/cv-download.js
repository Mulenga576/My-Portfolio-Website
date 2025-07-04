document.addEventListener('DOMContentLoaded', function() {
  const downloadCvBtn = document.getElementById('download-cv');
  
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      // Path to the CV file - including the 'public' directory in the URL
      const cvUrl = 'public/downloads/Mulenga_Mpikula_Silence_CV.pdf';
      const fullUrl = window.location.hostname === 'file' ? 
        window.location.href.split('/').slice(0, -1).join('/') + '/' + cvUrl : 
        '/' + cvUrl;
      
      console.log('Attempting to download CV from:', fullUrl);
      
      try {
        // Try to fetch the file first
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Create blob and download
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Mulenga_Mpikula_Silence_CV.pdf';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
        
        showNotification('CV download started!', 'success');
      } catch (error) {
        console.error('Download error:', error);
        showNotification('Failed to download CV. Please try again or contact me.', 'error');
        // Fallback to opening in new tab
        window.open(fullUrl, '_blank');
      }
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
