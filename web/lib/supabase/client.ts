import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (anon key). Cookie handling is managed
 * automatically by @supabase/ssr in the browser runtime.
 */
export function getBrowserSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
