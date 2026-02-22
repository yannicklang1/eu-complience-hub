/* ══════════════════════════════════════════════════════════════
   Supabase Auth Helpers — Server-side only

   Two factory functions for server contexts:
   - Server Components / Route Handlers / Server Actions
   - Middleware

   For client components ("use client"), import from supabase-browser.ts instead.
   Existing supabase.ts (admin + anon clients) stays untouched.
   ══════════════════════════════════════════════════════════════ */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* ── Server-side client (Server Components, Route Handlers, Server Actions) ── */

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // setAll can throw in Server Components (read-only context).
          // This is expected — the middleware handles session refresh.
        }
      },
    },
  });
}

/* ── Middleware client (for session refresh in middleware.ts) ── */

export function createSupabaseMiddlewareClient(
  request: NextRequest,
  response: NextResponse,
) {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        }
      },
    },
  });
}
