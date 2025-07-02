document.addEventListener('DOMContentLoaded', function() {
  const downloadCvBtn = document.getElementById('download-cv');
  
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Replace this with the actual path to your CV file
      const cvUrl = 'path/to/your/cv.pdf';
      
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'Mulenga_Mpikula_Silence_CV.pdf';
      
      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: Add a small notification
      const notification = document.createElement('div');
      notification.textContent = 'Downloading CV...';
      notification.style.position = 'fixed';
      notification.style.bottom = '20px';
      notification.style.right = '20px';
      notification.style.padding = '10px 20px';
      notification.style.background = 'var(--primary)';
      notification.style.color = 'white';
      notification.style.borderRadius = '4px';
      notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      notification.style.zIndex = '1000';
      notification.style.transition = 'opacity 0.3s';
      
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    });
  }
});
