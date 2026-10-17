import {createClient,SupabaseClient} from '@supabase/supabase-js';
// Only the publishable/anon key belongs here. Never put the service-role key in frontend code.
const url=import.meta.env.VITE_SUPABASE_URL;const key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isConfigured=Boolean(url&&key);
const client:SupabaseClient|null=isConfigured?createClient(url!,key!):null;
export function db():SupabaseClient{
  if(!client)throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (see SUPABASE_SETUP.md).');
  return client}
