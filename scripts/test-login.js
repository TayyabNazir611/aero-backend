import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  });

  if (error) {
    console.log('Login failed:', error.message);
    return;
  }

  console.log('Login successful!');
  console.log('User ID:', data.user.id);
  console.log('Access token:', data.session.access_token);
};

login();