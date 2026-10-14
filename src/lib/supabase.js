import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-supabase-project-id.supabase.co' &&
  !supabaseUrl.includes('your-supabase-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper to fetch profiles from Supabase or fallback
 */
export async function dbGetProfiles() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase fetch profiles error:', err);
    return null;
  }
}

/**
 * Helper to fetch products & services from Supabase
 */
export async function dbGetListings() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data: products, error: prodErr } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (prodErr) throw prodErr;

    const { data: services, error: servErr } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (servErr) throw servErr;

    return { products: products || [], services: services || [] };
  } catch (err) {
    console.warn('Supabase fetch listings error:', err);
    return null;
  }
}

/**
 * Helper to fetch orders from Supabase
 */
export async function dbGetOrders() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase fetch orders error:', err);
    return null;
  }
}

/**
 * Helper to fetch messages from Supabase
 */
export async function dbGetMessages() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase fetch messages error:', err);
    return null;
  }
}
