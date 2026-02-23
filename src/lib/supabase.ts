import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "node:crypto";

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

/* ── Admin client (lazy singleton — server-side API routes with service role key) ── */
let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    const serviceRoleKey = getEnvOrThrow("SUPABASE_SERVICE_ROLE_KEY");
    adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return adminClient;
}

/* ── Timing-safe admin key verification ── */
export function verifyAdminKey(headerValue: string | null): boolean {
  const expected = process.env.ADMIN_SECRET_KEY;
  if (!expected || !headerValue) return false;

  const a = Buffer.from(headerValue, "utf-8");
  const b = Buffer.from(expected, "utf-8");

  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
