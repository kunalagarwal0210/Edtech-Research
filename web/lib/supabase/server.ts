import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

/**
 * Cookie/session-based server client. Reflects the signed-in user via
 * `auth.getUser()`; RLS policies (`auth.uid() = ...`) authorize row access.
 * Next.js 16: `cookies()` is async, so this function is async too.
 */
export async function getServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component render where cookies can't be
            // written; safe to ignore if session refresh is handled elsewhere.
          }
        },
      },
    }
  );
}

/**
 * Service-role server client. Bypasses RLS — never expose to the browser.
 * Use only for trusted server-side work that requires elevated access.
 */
export function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
