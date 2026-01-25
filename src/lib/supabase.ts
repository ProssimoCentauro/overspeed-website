import { createClient } from '@supabase/supabase-js';

export const getSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Use service role key if available (server-side) for admin operations
    const key = (typeof window === 'undefined' && supabaseServiceKey)
        ? supabaseServiceKey
        : supabaseAnonKey;

    return createClient(supabaseUrl, key);
};

export const supabase = getSupabaseClient();
