import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, verifyAdminKey } from "@/lib/supabase";
import { log } from "@/lib/logger";
import { publicFormLimiter, adminLimiter, getClientIp } from "@/lib/rate-limit";
import { sanitize, validateEmail } from "@/lib/validation";

/* ── Validation helpers ── */
const VALID_TOOLS = ["nis2-check", "haftungs-pruefer", "bussgeld-rechner"] as const;
const VALID_SIZES = ["micro", "small", "medium", "large"] as const;

/* ── POST /api/leads ── */
export async function POST(request: NextRequest) {
  try {
    /* --- Rate limiting --- */
    if (publicFormLimiter.isLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
        { status: 429 },
      );
    }

    const body = await request.json();

    /* --- Required field --- */
    const email = validateEmail(body.email);
    if (!email) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse." },
        { status: 400 },
      );
    }

    /* --- GDPR consent must be true --- */
    if (body.gdpr_consent !== true) {
      return NextResponse.json(
        { error: "Datenschutz-Einwilligung ist erforderlich." },
        { status: 400 },
      );
    }

    /* --- Optional fields (sanitised) --- */
    const contact_name = sanitize(body.contact_name);
    const company_name = sanitize(body.company_name);
    const phone = sanitize(body.phone);

    const company_size = VALID_SIZES.includes(body.company_size)
      ? body.company_size
      : null;

    const branche = sanitize(body.branche);
    const country = sanitize(body.country);

    const source_tool = VALID_TOOLS.includes(body.source_tool)
      ? body.source_tool
      : sanitize(body.source_tool);

    const source_page = sanitize(body.source_page);
    const utm_source = sanitize(body.utm_source);
    const utm_medium = sanitize(body.utm_medium);
    const utm_campaign = sanitize(body.utm_campaign);

    /* --- Tool results (JSON, max 10 KB) --- */
    let tool_results = null;
    if (body.tool_results && typeof body.tool_results === "object") {
      const json = JSON.stringify(body.tool_results);
      if (json.length <= 10_000) {
        tool_results = body.tool_results;
      }
    }

    /* --- Extract country from headers (GDPR-compliant: no full IP) --- */
    const ip_country =
      request.headers.get("cf-ipcountry") ??
      request.headers.get("x-vercel-ip-country") ??
      null;

    const user_agent = (request.headers.get("user-agent") ?? "").slice(0, 500);

    /* --- Generate double opt-in token --- */
    const opt_in_token = crypto.randomUUID();

    /* --- Insert into Supabase (service_role bypasses RLS) --- */
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("leads").insert({
      email,
      contact_name,
      company_name,
      phone,
      company_size,
      branche,
      country,
      source_tool,
      source_page,
      utm_source,
      utm_medium,
      utm_campaign,
      tool_results,
      gdpr_consent: true,
      marketing_consent: body.marketing_consent === true,
      opt_in_token,
      ip_country,
      user_agent,
    });

    if (error) {
      log.error("[leads]", "Insert failed", { code: error.code, message: error.message });
      const isConnectionError =
        error.message?.includes("fetch") ||
        error.message?.includes("network") ||
        error.code === "PGRST301";
      return NextResponse.json(
        {
          error: isConnectionError
            ? "Der Dienst ist vorübergehend nicht erreichbar. Bitte versuchen Sie es in wenigen Minuten erneut."
            : "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
        },
        { status: isConnectionError ? 503 : 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Lead erfolgreich gespeichert." },
      { status: 201 },
    );
  } catch (err) {
    log.error("[leads]", "Unexpected error", { error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json(
      { error: "Server-Fehler. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}

/* ── GET /api/leads — Admin read ── */
export async function GET(request: NextRequest) {
  /* --- Rate limiting (brute-force protection for admin key) --- */
  if (adminLimiter.isLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    );
  }

  /* Auth: Timing-safe comparison against ADMIN_SECRET_KEY */
  if (!verifyAdminKey(request.headers.get("x-admin-key"))) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const adminClient = getSupabaseAdmin();

  /* --- Query params --- */
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "50", 10), 200);
  const offset = (page - 1) * limit;

  const source = url.searchParams.get("source");
  const branche = url.searchParams.get("branche");
  const country = url.searchParams.get("country");

  let query = adminClient
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (source) query = query.eq("source_tool", source);
  if (branche) query = query.eq("branche", branche);
  if (country) query = query.eq("country", country);

  const { data, error, count } = await query;

  if (error) {
    log.error("[leads]", "Admin query failed", { code: error.code, message: error.message });
    return NextResponse.json({ error: "Abfrage fehlgeschlagen." }, { status: 500 });
  }

  /* --- Stats --- */
  const { data: stats } = await adminClient.from("lead_stats").select("*").single();

  return NextResponse.json({
    leads: data,
    total: count,
    page,
    limit,
    stats,
  });
}
