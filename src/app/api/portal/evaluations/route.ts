import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";

/* ═══════════════════════════════════════════════════════════
   GET /api/portal/evaluations — User's saved evaluations
   POST /api/portal/evaluations — Save a new evaluation
   DELETE /api/portal/evaluations — Delete an evaluation
   ═══════════════════════════════════════════════════════════ */

export async function GET() {
  try {
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
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Nicht authentifiziert", loginRequired: true }, { status: 401 });
    }

    const body = await request.json();
    const { tool_id, tool_name, inputs, results, summary } = body;

    if (!tool_id || !tool_name) {
      return NextResponse.json({ error: "tool_id und tool_name erforderlich" }, { status: 400 });
    }

    const { data: evaluation, error } = await getSupabaseAdmin()
      .from("user_evaluations")
      .insert({
        user_id: user.id,
        tool_id,
        tool_name,
        inputs: inputs ?? {},
        results: results ?? {},
        summary: summary ?? null,
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
