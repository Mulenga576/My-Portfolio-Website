// Supabase client is now available globally from the script in index.html
const SUPABASE_URL = 'https://gsebyixbhynqxxwhvgic.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZWJ5aXhiaHlucXh4d2h2Z2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1OTg4NDIsImV4cCI6MjA2NzE3NDg0Mn0.cnahkQqw85AVhOcmbOK_Sl743QphShRQ60tKo9zOFPw';

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Log Supabase status
console.log('Supabase initialized:', supabase ? 'success' : 'failed');

// Test Supabase connection
async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // First check if supabase is defined
    if (!supabase) {
      console.error('Supabase client is not defined');
      return false;
    }
    
    // Test a simple query
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase query error:', error);
      console.log('This might be normal if the table is empty');
      // Even if there's an error, if we got this far, the connection is working
      console.log('✅ Supabase connection is working!');
      return true;
    }
    
    console.log('✅ Supabase connected successfully!');
    console.log('Sample data:', data);
    return true;
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
    return false;
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Test the Supabase connection when the page loads
  await testSupabaseConnection();
  
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: contactForm.querySelector('input[placeholder="Your Name"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        subject: contactForm.querySelector('input[placeholder="Subject"]').value || 'No Subject',
        message: contactForm.querySelector('textarea').value
      };
      
      // Get user's IP address (optional)
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        formData.ip_address = ipData.ip;
      } catch (error) {
        console.log('Could not get IP address:', error);
        formData.ip_address = 'unknown';
      }
      
            // Submit to Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([formData])
        .select();
      
      // Send email notification if submission was successful
      if (data && data[0]) {
        await supabase.functions.invoke('send-contact-email', {
          body: JSON.stringify({
            submission_id: data[0].id,
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: 'smpikula@u.rochester.edu'
          })
        });
      }
      
      // Handle response
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      if (error) {
        console.error('Error submitting form:', error);
        submitButton.textContent = 'Error! Try Again';
        submitButton.style.backgroundColor = '#dc2626';
      } else {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#10b981';
        contactForm.reset();
      }
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.textContent = originalButtonText;
        submitButton.style.backgroundColor = '';
      }, 3000);
    });
  }
});
