import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";
import { adminLimiter, getClientIp } from "@/lib/rate-limit";

/* ══════════════════════════════════════════════════════════════
   GET /api/admin/subscribers — Admin subscriber list
   ══════════════════════════════════════════════════════════════ */
export async function GET(request: NextRequest) {
  /* --- Rate limiting (brute-force protection) --- */
  if (adminLimiter.isLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    );
  }

  /* --- Auth --- */
  const authHeader = request.headers.get("x-admin-key");
  const adminKey = process.env.ADMIN_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!adminKey || authHeader !== adminKey) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const adminClient = getSupabaseAdmin();

  /* --- Query params --- */
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "50", 10), 200);
  const offset = (page - 1) * limit;
  const status = url.searchParams.get("status"); // active, pending, unsubscribed
  const country = url.searchParams.get("country");

  let query = adminClient
    .from("subscribers")
    .select("id, email, status, source, source_page, country, commercial_consent, created_at, opt_in_confirmed_at, unsubscribed_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && ["active", "pending", "unsubscribed"].includes(status)) {
    query = query.eq("status", status);
  }
  if (country) query = query.eq("country", country);

  const { data, error, count } = await query;

  if (error) {
    log.error("[admin/subscribers]", "Query failed", { code: error.code, message: error.message });
    return NextResponse.json({ error: "Abfrage fehlgeschlagen." }, { status: 500 });
  }

  /* --- Aggregate stats --- */
  const { count: totalActive } = await adminClient
    .from("subscribers")
    .select("id", { count: "exact", head: true })
    .eq("status", "active");

  const { count: totalPending } = await adminClient
    .from("subscribers")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: totalUnsubscribed } = await adminClient
    .from("subscribers")
    .select("id", { count: "exact", head: true })
    .eq("status", "unsubscribed");

  const { count: commercialOptIn } = await adminClient
    .from("subscribers")
    .select("id", { count: "exact", head: true })
    .eq("status", "active")
    .eq("commercial_consent", true);

  return NextResponse.json({
    subscribers: data,
    total: count,
    page,
    limit,
    stats: {
      total: (totalActive ?? 0) + (totalPending ?? 0) + (totalUnsubscribed ?? 0),
      active: totalActive ?? 0,
      pending: totalPending ?? 0,
      unsubscribed: totalUnsubscribed ?? 0,
      commercial_opt_in: commercialOptIn ?? 0,
    },
  });
}
