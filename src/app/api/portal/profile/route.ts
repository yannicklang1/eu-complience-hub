import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";

/* ══════════════════════════════════════════════════════════════
   GET /api/portal/profile — Current user's profile
   ══════════════════════════════════════════════════════════════ */

export async function GET() {
  try {
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

    const adminClient = getSupabaseAdmin();
    const { data: profile, error: queryError } = await adminClient
      .from("profiles")
      .select("full_name, company_name, avatar_url")
      .eq("id", user.id)
      .single();

    if (queryError && queryError.code !== "PGRST116") {
      // PGRST116 = no rows — profile may not exist yet
      log.error("[portal/profile]", "Query failed", {
        code: queryError.code,
        message: queryError.message,
      });
      return NextResponse.json(
        { error: "Profil konnte nicht geladen werden." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      profile: profile ?? {
        full_name: user.user_metadata?.full_name ?? null,
        company_name: null,
        avatar_url: user.user_metadata?.avatar_url ?? null,
      },
    });
  } catch (err) {
    log.error("[portal/profile]", "Unexpected error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 },
    );
  }
}

/* ══════════════════════════════════════════════════════════════
   PATCH /api/portal/profile — Update user profile
   ══════════════════════════════════════════════════════════════ */

export async function PATCH(request: NextRequest) {
  try {
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

    const body = await request.json();
    const updates: Record<string, string> = {};

    // Only allow specific fields
    if (typeof body.full_name === "string") {
      updates.full_name = body.full_name.trim().slice(0, 200);
    }
    if (typeof body.company_name === "string") {
      updates.company_name = body.company_name.trim().slice(0, 200);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Keine Änderungen." },
        { status: 400 },
      );
    }

    const adminClient = getSupabaseAdmin();
    const { error: updateError } = await adminClient
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email ?? "",
          ...updates,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

    if (updateError) {
      log.error("[portal/profile]", "Update failed", {
        code: updateError.code,
        message: updateError.message,
      });
      return NextResponse.json(
        { error: "Aktualisierung fehlgeschlagen." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    log.error("[portal/profile]", "Unexpected error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 },
    );
  }
}
