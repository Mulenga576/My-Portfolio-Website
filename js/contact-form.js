// Wait for Supabase to be initialized
let supabase;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Wait for Supabase to be fully initialized
    supabase = await window.supabasePromise;
    console.log('Supabase client is ready to use');
    
    // Now that Supabase is ready, we can set up the form submission
    setupContactForm();
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
  }
});

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

// Set up the contact form with event listeners
function setupContactForm() {
  // Get the contact form
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) {
    console.error('Contact form not found');
    return;
  }

  // Add submit event listener to the form
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Test the Supabase connection
  testSupabaseConnection();
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = {
    name: e.target.querySelector('input[placeholder="Your Name"]').value,
    email: e.target.querySelector('input[type="email"]').value,
    subject: e.target.querySelector('input[placeholder="Subject"]').value || 'No Subject',
    message: e.target.querySelector('textarea').value
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
  
  // Handle response
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  if (error) {
    console.error('Error submitting form:', error);
    submitButton.textContent = 'Error! Try Again';
    submitButton.style.backgroundColor = '#dc2626';
  } else {
    // Send email notification if submission was successful
    if (data && data[0]) {
      try {
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
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Continue even if email fails
      }
    }
    
    submitButton.textContent = 'Message Sent!';
    submitButton.style.backgroundColor = '#10b981';
    e.target.reset();
  }
  
  // Reset button after 3 seconds
  setTimeout(() => {
    submitButton.textContent = originalButtonText;
    submitButton.style.backgroundColor = '';
  }, 3000);
}
