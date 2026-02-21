import { createClient } from "@supabase/supabase-js";

/* ── Environment validation ── */
function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${key}. Check your .env.local file.`,
    );
  }
  return value;
}

/* ── Public client (for client-side / API routes with anon key) ── */
const supabaseUrl = getEnvOrThrow("NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = getEnvOrThrow("NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ── Admin client (for server-side API routes with service role key) ── */
export function getSupabaseAdmin() {
  const serviceRoleKey = getEnvOrThrow("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
