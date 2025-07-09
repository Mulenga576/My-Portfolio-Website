import { testSupabaseConnection } from './supabase_client.js';

// Run the test
console.log('Starting Supabase connection test...');
testSupabaseConnection()
  .then(() => console.log('✅ Test completed successfully!'))
  .catch((error) => {
    console.error('❌ Test failed with errors:');
    console.error(error);
  });
