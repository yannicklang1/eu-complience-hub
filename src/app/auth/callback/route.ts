import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-auth";

/* ══════════════════════════════════════════════════════════════
   GET /auth/callback — OAuth & Magic Link redirect handler

   After a user signs in via Google/email-confirm, Supabase
   redirects here with a ?code= param. We exchange it for a session
   cookie, then redirect the user to their intended destination.
   ══════════════════════════════════════════════════════════════ */

/**
 * Validate the "next" redirect path to prevent open-redirect attacks.
 * Only allows relative paths starting with "/" and blocks protocol-relative
 * URLs ("//evil.com") or any external URLs.
 */
function safeRedirectPath(raw: string | null): string {
  const fallback = "/portal";
  if (!raw) return fallback;

  // Must start with exactly one "/" (not "//")
  if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;

  // Block any embedded protocol or backslash tricks
  if (/[:\\]/.test(raw.split("?")[0] ?? "")) return fallback;

  return raw;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeRedirectPath(searchParams.get("next"));

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
