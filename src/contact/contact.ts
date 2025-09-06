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
    // 1. Save to database
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
      .select();

    console.log('Supabase response:', { data, error });

    if (error) {
      console.error('Supabase error details:', error);
      throw new Error(error.message || 'Failed to submit form');
    }
    
    // 2. Send email notification
    try {
      const { data: emailData, error: emailError } = await supabase.functions.invoke('resend', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Form Submission',
          message: formData.message
        }
      });

      if (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't throw here - form submission succeeded even if email failed
      } else {
        console.log('Email sent successfully:', emailData);
      }
    } catch (emailError) {
      console.error('Email function error:', emailError);
      // Continue - form submission succeeded even if email failed
    }
    
    console.log('Form submitted successfully');
    return true;
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    throw error;
  }
}
