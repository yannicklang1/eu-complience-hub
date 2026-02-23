import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";

/* ═══════════════════════════════════════════════════════════
   GET /api/portal/evaluations — User's saved evaluations
   POST /api/portal/evaluations — Save a new evaluation
   DELETE /api/portal/evaluations — Delete an evaluation
   ═══════════════════════════════════════════════════════════ */

/** Rate limiter for portal evaluations (20 req / min — generous for normal use) */
const portalLimiter = createRateLimiter({ windowMs: 60_000, max: 20 });

/** Max JSONB payload size (100 KB stringified) */
const MAX_JSON_SIZE = 100_000;

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (portalLimiter.isLimited(ip)) {
      return NextResponse.json({ error: "Zu viele Anfragen. Bitte warten." }, { status: 429 });
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
    }

    const { data: evaluations, error } = await getSupabaseAdmin()
      .from("user_evaluations")
      .select("id, tool_id, tool_name, summary, inputs, results, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      log.error("[evaluations]", "Fetch failed", { error: error.message, userId: user.id });
      return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 });
    }

    return NextResponse.json({ evaluations: evaluations ?? [] });
  } catch (err) {
    log.error("[evaluations]", "GET error", { error: err instanceof Error ? err.message : "unknown" });
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (portalLimiter.isLimited(ip)) {
      return NextResponse.json({ error: "Zu viele Anfragen. Bitte warten." }, { status: 429 });
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nicht authentifiziert", loginRequired: true }, { status: 401 });
    }

    const body = await request.json();
    const { tool_id, tool_name, inputs, results, summary } = body;

    // Required fields
    if (!tool_id || typeof tool_id !== "string" || !tool_name || typeof tool_name !== "string") {
      return NextResponse.json({ error: "tool_id und tool_name erforderlich" }, { status: 400 });
    }

    // Length limits on text fields
    if (tool_id.length > 100 || tool_name.length > 200) {
      return NextResponse.json({ error: "Eingabedaten zu lang" }, { status: 400 });
    }

    if (summary && typeof summary === "string" && summary.length > 1000) {
      return NextResponse.json({ error: "Zusammenfassung zu lang (max. 1000 Zeichen)" }, { status: 400 });
    }

    // Size limits on JSONB fields
    const inputsStr = JSON.stringify(inputs ?? {});
    const resultsStr = JSON.stringify(results ?? {});
    if (inputsStr.length > MAX_JSON_SIZE || resultsStr.length > MAX_JSON_SIZE) {
      return NextResponse.json({ error: "Eingabedaten zu groß (max. 100 KB)" }, { status: 400 });
    }

    const { data: evaluation, error } = await getSupabaseAdmin()
      .from("user_evaluations")
      .insert({
        user_id: user.id,
        tool_id: tool_id.slice(0, 100),
        tool_name: tool_name.slice(0, 200),
        inputs: inputs ?? {},
        results: results ?? {},
        summary: typeof summary === "string" ? summary.slice(0, 1000) : null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      log.error("[evaluations]", "Insert failed", { error: error.message, userId: user.id, tool_id });
      return NextResponse.json({ error: "Fehler beim Speichern" }, { status: 500 });
    }

    return NextResponse.json({ success: true, evaluation });
  } catch (err) {
    log.error("[evaluations]", "POST error", { error: err instanceof Error ? err.message : "unknown" });
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (portalLimiter.isLimited(ip)) {
      return NextResponse.json({ error: "Zu viele Anfragen. Bitte warten." }, { status: 429 });
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nicht authentifiziert" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID erforderlich" }, { status: 400 });
    }

    // Validate UUID format
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin()
      .from("user_evaluations")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      log.error("[evaluations]", "Delete failed", { error: error.message, userId: user.id, id });
      return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    log.error("[evaluations]", "DELETE error", { error: err instanceof Error ? err.message : "unknown" });
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}
