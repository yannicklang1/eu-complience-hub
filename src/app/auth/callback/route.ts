import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-auth";

/* ══════════════════════════════════════════════════════════════
   GET /auth/callback — OAuth & Magic Link redirect handler

   After a user signs in via Google/Apple/email-confirm, Supabase
   redirects here with a ?code= param. We exchange it for a session
   cookie, then redirect the user to their intended destination.
   ══════════════════════════════════════════════════════════════ */

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/portal";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to login with error on failure
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`);
}
