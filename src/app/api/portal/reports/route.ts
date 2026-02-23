import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

/* ══════════════════════════════════════════════════════════════
   GET /api/portal/reports — Authenticated user's reports
   ══════════════════════════════════════════════════════════════ */

const portalLimiter = createRateLimiter({ windowMs: 60_000, max: 20 });

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (portalLimiter.isLimited(ip)) {
      return NextResponse.json({ error: "Zu viele Anfragen." }, { status: 429 });
    }

    /* --- Auth --- */
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Nicht authentifiziert." },
        { status: 401 },
      );
    }

    /* --- Fetch reports linked to this user --- */
    const adminClient = getSupabaseAdmin();

    const { data: reports, error: queryError } = await adminClient
      .from("reports")
      .select(
        "id, report_token, company_name, contact_name, maturity_grade, evaluated_regulations, cost_estimate, download_count, branche, created_at",
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (queryError) {
      log.error("[portal/reports]", "Query failed", {
        code: queryError.code,
        message: queryError.message,
      });
      return NextResponse.json(
        { error: "Abfrage fehlgeschlagen." },
        { status: 500 },
      );
    }

    return NextResponse.json({ reports: reports ?? [] });
  } catch (err) {
    log.error("[portal/reports]", "Unexpected error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 },
    );
  }
}
