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

export function isValidUuid(str) {
  if (!str || typeof str !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/**
 * Capture incoming client profile in Supabase
 */
export async function dbInsertProfile(profileData) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const payload = { ...profileData };
    if (payload.id && !isValidUuid(payload.id)) {
      delete payload.id;
    }
    const { data, error } = await supabase.from('profiles').upsert([payload], { onConflict: 'email' }).select();
    if (error) console.warn('Supabase insert profile notice:', error.message);
    return { data, error };
  } catch (err) {
    console.warn('Supabase insert profile catch:', err);
    return { data: null, error: err };
  }
}

/**
 * Capture new client product listing in Supabase
 */
export async function dbInsertProduct(productData) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const payload = { ...productData };
    if (payload.seller_id && !isValidUuid(payload.seller_id)) {
      delete payload.seller_id;
    }
    const { data, error } = await supabase.from('products').insert([payload]).select();
    if (error) console.warn('Supabase insert product notice:', error.message);
    return { data, error };
  } catch (err) {
    console.warn('Supabase insert product catch:', err);
    return { data: null, error: err };
  }
}

/**
 * Capture new client service listing in Supabase
 */
export async function dbInsertService(serviceData) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const payload = { ...serviceData };
    if (payload.provider_id && !isValidUuid(payload.provider_id)) {
      delete payload.provider_id;
    }
    const { data, error } = await supabase.from('services').insert([payload]).select();
    if (error) console.warn('Supabase insert service notice:', error.message);
    return { data, error };
  } catch (err) {
    console.warn('Supabase insert service catch:', err);
    return { data: null, error: err };
  }
}

/**
 * Capture client order in Supabase
 */
export async function dbInsertOrder(orderData, items = []) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const payload = { ...orderData };
    if (payload.buyer_id && !isValidUuid(payload.buyer_id)) {
      delete payload.buyer_id;
    }
    if (payload.seller_id && !isValidUuid(payload.seller_id)) {
      delete payload.seller_id;
    }
    const { data, error } = await supabase.from('orders').insert([payload]).select().single();
    if (error) {
      console.warn('Supabase insert order notice:', error.message);
      return { data: null, error };
    }
    if (data && items.length > 0) {
      const formattedItems = items.map(item => ({
        order_id: data.id,
        product_id: isValidUuid(item.productId) ? item.productId : null,
        product_name_snapshot: item.productName || item.title || 'Product',
        quantity: item.quantity,
        unit_price: item.unitPrice || item.price,
        line_total: (item.unitPrice || item.price) * item.quantity
      }));
      await supabase.from('order_items').insert(formattedItems);
    }
    return { data, error: null };
  } catch (err) {
    console.warn('Supabase insert order catch:', err);
    return { data: null, error: err };
  }
}

/**
 * Capture client message in Supabase
 */
export async function dbInsertMessage(messageData) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const payload = { ...messageData };
    if (payload.sender_id && !isValidUuid(payload.sender_id)) {
      delete payload.sender_id;
    }
    if (payload.receiver_id && !isValidUuid(payload.receiver_id)) {
      delete payload.receiver_id;
    }
    const { data, error } = await supabase.from('messages').insert([payload]).select();
    if (error) console.warn('Supabase insert message notice:', error.message);
    return { data, error };
  } catch (err) {
    console.warn('Supabase insert message catch:', err);
    return { data: null, error: err };
  }
}

