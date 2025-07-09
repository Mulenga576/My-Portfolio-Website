import { supabase } from '@/lib/supabase/client';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<boolean> {
  console.log('Submitting contact form with data:', formData);
  
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        { 
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: formData.subject || 'New Contact Form Submission',
          status: 'new'
        },
      ])
      .select(); // Add .select() to return the inserted data

    console.log('Supabase response:', { data, error });

    if (error) {
      console.error('Supabase error details:', error);
      throw new Error(error.message || 'Failed to submit form');
    }
    
    console.log('Form submitted successfully');
    return true;
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    throw error; // Re-throw to be handled by the form component
  }
}
