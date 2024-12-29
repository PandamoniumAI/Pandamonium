const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://dojdyydsanxoblgjmzmq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvamR5eWRzYW54b2JsZ2ptem1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMDUxNTQsImV4cCI6MjA0ODg4MTE1NH0.mONIXEuP2lF7Hu9J34D9f4yQWuFuPTC5tE-rpbAJTxg';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);