import { supabase } from './client';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form. Please try again later.');
    }

    return true;
  } catch (error) {
    console.error('Unexpected error in submitContactForm:', error);
    throw error; // Re-throw to be handled by the UI
  }
}
