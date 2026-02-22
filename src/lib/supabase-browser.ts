/* ══════════════════════════════════════════════════════════════
   Supabase Browser Client — for "use client" components only

   This file is safe to import from client components.
   For server-side usage, import from supabase-auth.ts instead.
   ══════════════════════════════════════════════════════════════ */

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}
