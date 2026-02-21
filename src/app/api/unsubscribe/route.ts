import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";

/**
 * GET /api/unsubscribe?token=xxx — Unsubscribe from Compliance-Briefing
 *
 * DSGVO Art. 7 Abs. 3: Der Widerruf muss so einfach sein wie die Einwilligung.
 * This endpoint allows one-click unsubscribe via link in emails.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token || token.length < 32) {
    return NextResponse.json(
      { error: "Ungültiger Abmelde-Link." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: subscriber, error: fetchError } = await supabase
    .from("subscribers")
    .select("id, status, email")
    .eq("unsubscribe_token", token)
    .single();

  if (fetchError || !subscriber) {
    return NextResponse.json(
      { error: "Ungültiger oder bereits verwendeter Abmelde-Link." },
      { status: 404 },
    );
  }

  if (subscriber.status === "unsubscribed") {
    return NextResponse.json(
      {
        message: "Sie sind bereits abgemeldet.",
        email: subscriber.email,
      },
      { status: 200 },
    );
  }

  /* Deactivate subscriber */
  const { error: updateError } = await supabase
    .from("subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("id", subscriber.id);

  if (updateError) {
    log.error("[unsubscribe]", "Update failed", { code: updateError.code, message: updateError.message });
    return NextResponse.json(
      { error: "Ein Fehler bei der Abmeldung. Bitte versuchen Sie es erneut." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Sie wurden erfolgreich abgemeldet. Sie erhalten keine weiteren E-Mails vom Compliance-Briefing.",
      email: subscriber.email,
    },
    { status: 200 },
  );
}
