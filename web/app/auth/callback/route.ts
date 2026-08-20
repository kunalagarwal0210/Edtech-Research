import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

// Exchanges the OAuth `code` for a session (writing the session cookie via
// the getServerSupabase adapter), then redirects to the post-auth page.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await getServerSupabase();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
