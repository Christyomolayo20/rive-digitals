import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedBrowserClient: SupabaseClient | null = null;

/**
 * Browser-safe Supabase client (uses NEXT_PUBLIC env vars).
 */
export function getBrowserSupabaseClient(): SupabaseClient | null {
  if (typeof window === "undefined") return null;
  if (cachedBrowserClient) return cachedBrowserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    cachedBrowserClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return cachedBrowserClient;
  }

  return null;
}
