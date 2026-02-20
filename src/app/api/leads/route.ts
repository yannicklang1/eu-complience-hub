import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

/* ── Validation helpers ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_TOOLS = ["nis2-check", "haftungs-pruefer", "bussgeld-rechner"] as const;
const VALID_SIZES = ["micro", "small", "medium", "large"] as const;

function sanitize(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, 500) || null;
}

/* ── POST /api/leads ── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    /* --- Required field --- */
    const email = sanitize(body.email);
    if (!email || !EMAIL_RE.test(email)) {
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
      console.error("[leads] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Fehler beim Speichern. Bitte versuchen Sie es erneut." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Lead erfolgreich gespeichert." },
      { status: 201 },
    );
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json(
      { error: "Server-Fehler. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}

/* ── GET /api/leads — Admin read ── */
export async function GET(request: NextRequest) {
  /* Auth: Accept either the ADMIN_SECRET_KEY or the SUPABASE_SERVICE_ROLE_KEY */
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

  const source = url.searchParams.get("source");
  const branche = url.searchParams.get("branche");

  let query = adminClient
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (source) query = query.eq("source_tool", source);
  if (branche) query = query.eq("branche", branche);

  const { data, error, count } = await query;

  if (error) {
    console.error("[leads] Admin query error:", error);
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
