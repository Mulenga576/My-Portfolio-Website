import { createClient } from '@supabase/supabase-js';

// These are exposed to the browser, which is safe as per Supabase's security model
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Throw clear error messages in development
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseKey)) {
  console.error('❌ Missing required Supabase environment variables');
  console.error('Please check your environment variables and ensure they are properly set.');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
