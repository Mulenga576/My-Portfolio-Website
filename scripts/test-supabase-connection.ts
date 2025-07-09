// Use CommonJS for this script
require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  // Test 1: Check if we can connect to Supabase
  const { data: versionData, error: versionError } = await supabase.rpc('version');
  
  if (versionError) {
    console.error('❌ Failed to connect to Supabase:', versionError.message);
    return;
  }
  
  console.log('✅ Connected to Supabase. Server version:', versionData);
  
  // Test 2: Check if the contact_submissions table exists and is accessible
  const { data: tableData, error: tableError } = await supabase
    .from('contact_submissions')
    .select('*')
    .limit(1);

  if (tableError) {
    console.error('❌ Error accessing contact_submissions table:', tableError.message);
    console.log('\nPlease make sure you have created the table with the following SQL:');
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
      
      -- Enable RLS (Row Level Security) for better security
      ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
      
      -- Create a policy to allow public inserts (for the contact form)
      CREATE POLICY "Enable insert for all users" 
      ON public.contact_submissions 
      FOR INSERT 
      TO anon 
      WITH CHECK (true);
    `);
    return;
  }
  
  console.log('✅ Successfully accessed contact_submissions table');
  console.log('\n🎉 Your Supabase connection is working correctly!');
  
  // Test 3: Try to insert a test record
  console.log('\nTesting form submission...');
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        { 
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message',
          subject: 'Test Submission'
        },
      ]);

    if (error) throw error;
    
    console.log('✅ Successfully inserted test record');
    console.log('\n🎉 Your contact form is ready to use!');
  } catch (error) {
    console.error('❌ Error inserting test record:', error);
  }
}

testConnection().catch(console.error);
