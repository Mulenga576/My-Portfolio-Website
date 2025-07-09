// Simple test script to verify Supabase connection
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

console.log('Testing Supabase connection...');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Test connection by checking the contact_submissions table
async function testConnection() {
  try {
    console.log('Testing access to contact_submissions table...');
    
    // Test table access
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .limit(1);
      
    if (error) {
      if (error.code === '42P01') { // Table doesn't exist
        console.error('❌ The contact_submissions table does not exist.');
        console.log('\nPlease create the table with this SQL in your Supabase SQL editor:');
        console.log(`
          CREATE TABLE public.contact_submissions (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'new',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
          
          CREATE POLICY "Enable insert for all users" 
          ON public.contact_submissions 
          FOR INSERT 
          TO anon 
          WITH CHECK (true);
        `);
      } else {
        console.error('❌ Error accessing Supabase:', error.message);
      }
      return;
    }
    
    console.log('✅ Successfully connected to Supabase and accessed contact_submissions table!');
    console.log('\n🎉 Your Supabase connection is working correctly!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testConnection();
