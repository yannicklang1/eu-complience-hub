/* ══════════════════════════════════════════════════════════════
   Supabase Browser Client — for "use client" components only

   This file is safe to import from client components.
   For server-side usage, import from supabase-auth.ts instead.
   ══════════════════════════════════════════════════════════════ */

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Singleton is safe here: @supabase/ssr's createBrowserClient manages session
// refresh and token rotation automatically via cookies. The client instance
// does not hold stale auth state — it reads the current session from cookies
// on every request, so re-creating it is unnecessary.
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}
