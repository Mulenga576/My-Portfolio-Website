// Wait for the DOM to be fully loaded before initializing the form
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('Initializing contact form...');
    
    // Wait for Supabase to be initialized
    const supabase = await window.supabasePromise;
    
    if (!supabase) {
      console.error('Failed to initialize Supabase');
      return;
    }

    console.log('Supabase client is ready to use');
    
    // Test the connection first
    await testSupabaseConnection(supabase);
    
    // Set up the contact form
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) {
      console.error('Contact form not found');
      return;
    }
    
    // Add event listener for form submission
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: e.target.querySelector('input[placeholder="Your Name"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        subject: e.target.querySelector('input[placeholder="Subject"]').value || 'No Subject',
        message: e.target.querySelector('textarea').value
      };
      
      // Get the submit button
      const submitButton = e.target.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      
      // Disable button while submitting
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      try {
        // Get user's IP address (optional)
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          formData.ip_address = ipData.ip;
        } catch (error) {
          console.log('Could not get IP address:', error);
          formData.ip_address = 'unknown';
        }
        
        console.log('Submitting form data:', formData);
        
        // Submit to Supabase
        const { data, error } = await supabase
          .from('contact_submissions')
          .insert([formData])
          .select();
        
        if (error) throw error;
        
        console.log('Form submitted successfully:', data);
        
        // Send email notification if submission was successful
        if (data && data[0]) {
          try {
            console.log('Sending email notification...');
            const SUPABASE_URL = 'https://gsebyixbhynqxxwhvgic.supabase.co';
            const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZWJ5aXhiaHlucXh4d2h2Z2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1OTg4NDIsImV4cCI6MjA2NzE3NDg0Mn0.cnahkQqw85AVhOcmbOK_Sl743QphShRQ60tKo9zOFPw';
            
            const emailResponse = await fetch(`${SUPABASE_URL}/functions/v1/send-contact-email`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
              },
              body: JSON.stringify({
                submission_id: data[0].id,
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'smpikula@u.rochester.edu'
              })
            });
            
            const result = await emailResponse.json();
            console.log('Email notification response:', result);
          } catch (emailError) {
            console.error('Error sending email notification:', emailError);
            // Continue even if email fails
          }
        }
        
        // Show success message
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#10b981';
        e.target.reset();
        
      } catch (error) {
        console.error('Error submitting form:', error);
        submitButton.textContent = 'Error! Try Again';
        submitButton.style.backgroundColor = '#dc2626';
      } finally {
        // Re-enable the button
        submitButton.disabled = false;
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
          submitButton.style.backgroundColor = '';
        }, 3000);
      }
    });
    
    console.log('Contact form initialized successfully');
    
  } catch (error) {
    console.error('Error initializing contact form:', error);
  }
});

// Test Supabase connection
async function testSupabaseConnection(supabase) {
  try {
    console.log('Testing Supabase connection...');
    
    if (!supabase) {
      console.error('Supabase client is not defined');
      return false;
    }
    
    // Test a simple query
    console.log('Executing test query...');
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .limit(1);
      
    if (error) {
      console.error('Supabase query error:', error);
      console.log('This might be normal if the table is empty');
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
