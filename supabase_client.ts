import { createClient } from '@supabase/supabase-js';

// These are exposed to the browser, which is safe as per Supabase's security model
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Throw clear error messages in development
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseKey)) {
  console.error('❌ Missing required Supabase environment variables');
  console.error('Please check your environment variables and ensure they are properly set.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Test connection function (for server-side use)
export async function testSupabaseConnection() {
  if (typeof window !== 'undefined') {
    console.warn('testSupabaseConnection should only be used server-side');
    return [];
  }

  try {
    console.log('🔍 Testing Supabase connection...');
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1);
      
    if (error) throw error;
    
    console.log('✅ Connected to Supabase successfully!');
    return data || [];
  } catch (error) {
    console.error('❌ Error connecting to Supabase:');
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}

// Helper function to handle errors consistently
function handleError(error: unknown): never {
  if (error instanceof Error) {
    throw error;
  }
  throw new Error('An unknown error occurred');
}

// Export a type for the contact form submission
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  status?: string;
}

// Function to submit contact form
export async function submitContactForm(formData: ContactFormData) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: formData.subject || 'New Contact Form Submission',
      status: 'new'
    }])
    .select();

  if (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }

  return data?.[0];
}