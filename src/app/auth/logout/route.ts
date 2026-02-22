import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-auth";

/* ══════════════════════════════════════════════════════════════
   POST /auth/logout — Sign out and redirect to login
   ══════════════════════════════════════════════════════════════ */

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/auth/login`, { status: 303 });
}
