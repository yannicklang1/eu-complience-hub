import { NextResponse, type NextRequest } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { log } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { createCheckout } from "@/lib/lemonsqueezy";

/* ══════════════════════════════════════════════════════════════
   POST /api/checkout — Create LemonSqueezy checkout session
   ══════════════════════════════════════════════════════════════ */

const checkoutLimiter = createRateLimiter({ windowMs: 60_000, max: 5 });

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (checkoutLimiter.isLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen." },
      { status: 429 },
    );
  }

  try {
    /* ── Auth ── */
    const authSupabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await authSupabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Nicht autorisiert.", loginRequired: true },
        { status: 401 },
      );
    }

    const body = await request.json();
    const reportToken = body.reportToken;

    if (!reportToken || typeof reportToken !== "string" || !/^[0-9a-f-]{36}$/.test(reportToken)) {
      return NextResponse.json({ error: "Ungültiger Report-Token." }, { status: 400 });
    }

    /* ── Verify report belongs to user and is pending ── */
    const supabase = getSupabaseAdmin();
    const { data: report, error: dbError } = await supabase
      .from("reports")
      .select("payment_status, email, user_id")
      .eq("report_token", reportToken)
      .single();

    if (dbError || !report) {
      return NextResponse.json({ error: "Report nicht gefunden." }, { status: 404 });
    }

    if (report.user_id !== user.id) {
      return NextResponse.json({ error: "Zugriff verweigert." }, { status: 403 });
    }

    if (report.payment_status === "paid" || report.payment_status === "free") {
      return NextResponse.json({ error: "Report wurde bereits bezahlt." }, { status: 400 });
    }

    /* ── Create LemonSqueezy checkout ── */
    const result = await createCheckout(reportToken, report.email);

    if ("error" in result) {
      log.error("[checkout]", "Checkout creation failed", { error: result.error });
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    log.info("[checkout]", "Checkout created", {
      reportToken,
      email: report.email.replace(/(.{2}).*(@.*)/, "$1***$2"),
    });

    return NextResponse.json({ checkoutUrl: result.checkoutUrl });
  } catch (err) {
    log.error("[checkout]", "Unexpected error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten." },
      { status: 500 },
    );
  }
}
