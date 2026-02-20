import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import crypto from "crypto";

/* ── Validation ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, 500) || null;
}

/* ══════════════════════════════════════════════════════════════
   POST /api/subscribe — Register new Fristen-Radar subscriber
   ══════════════════════════════════════════════════════════════ */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    /* --- Email validation --- */
    const email = sanitize(body.email)?.toLowerCase();
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Bitte geben Sie eine gültige E-Mail-Adresse ein." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();

    /* --- Check if already subscribed --- */
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.status === "active") {
        return NextResponse.json(
          {
            message:
              "Sie sind bereits für den Fristen-Radar angemeldet. Sie erhalten Benachrichtigungen bei kritischen Fristen.",
          },
          { status: 200 },
        );
      }

      if (existing.status === "unsubscribed") {
        /* Re-subscribe */
        const opt_in_token = crypto.randomBytes(32).toString("hex");
        const unsubscribe_token = crypto.randomBytes(32).toString("hex");

        await supabase
          .from("subscribers")
          .update({
            status: "pending",
            opt_in_token,
            unsubscribe_token,
            opt_in_confirmed_at: null,
            unsubscribed_at: null,
            source_page: sanitize(body.source_page),
          })
          .eq("id", existing.id);

        // TODO: Send double-opt-in email via Resend
        // await sendOptInEmail(email, opt_in_token);

        return NextResponse.json(
          {
            message:
              "Willkommen zurück! Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte bestätigen Sie Ihre Anmeldung.",
            requires_confirmation: true,
          },
          { status: 200 },
        );
      }

      /* status === "pending" — resend confirmation */
      // TODO: Resend opt-in email
      return NextResponse.json(
        {
          message:
            "Sie haben sich bereits angemeldet. Bitte überprüfen Sie Ihren Posteingang und bestätigen Sie Ihre E-Mail-Adresse.",
          requires_confirmation: true,
        },
        { status: 200 },
      );
    }

    /* --- New subscriber --- */
    const opt_in_token = crypto.randomBytes(32).toString("hex");
    const unsubscribe_token = crypto.randomBytes(32).toString("hex");

    const { error: insertError } = await supabase.from("subscribers").insert({
      email,
      status: "pending",
      opt_in_token,
      unsubscribe_token,
      source: sanitize(body.source) ?? "fristen-radar",
      source_page: sanitize(body.source_page),
      utm_source: sanitize(body.utm_source),
      utm_medium: sanitize(body.utm_medium),
      utm_campaign: sanitize(body.utm_campaign),
    });

    if (insertError) {
      console.error("[subscribe] Insert error:", insertError);
      return NextResponse.json(
        { error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." },
        { status: 500 },
      );
    }

    // TODO: Send double-opt-in email via Resend
    // await sendOptInEmail(email, opt_in_token);

    return NextResponse.json(
      {
        message:
          "Fast geschafft! Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte klicken Sie auf den Link in der E-Mail, um Ihre Anmeldung abzuschließen.",
        requires_confirmation: true,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten." },
      { status: 500 },
    );
  }
}

/* ══════════════════════════════════════════════════════════════
   GET /api/subscribe?token=xxx — Confirm double-opt-in
   ══════════════════════════════════════════════════════════════ */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token || token.length < 32) {
    return NextResponse.json(
      { error: "Ungültiger Bestätigungslink." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: subscriber, error: fetchError } = await supabase
    .from("subscribers")
    .select("id, status, email")
    .eq("opt_in_token", token)
    .single();

  if (fetchError || !subscriber) {
    return NextResponse.json(
      { error: "Ungültiger oder abgelaufener Bestätigungslink." },
      { status: 404 },
    );
  }

  if (subscriber.status === "active") {
    return NextResponse.json(
      {
        message: "Ihre E-Mail-Adresse wurde bereits bestätigt. Sie sind angemeldet!",
        email: subscriber.email,
      },
      { status: 200 },
    );
  }

  /* Activate subscriber */
  const { error: updateError } = await supabase
    .from("subscribers")
    .update({
      status: "active",
      opt_in_confirmed_at: new Date().toISOString(),
    })
    .eq("id", subscriber.id);

  if (updateError) {
    console.error("[subscribe/verify] Update error:", updateError);
    return NextResponse.json(
      { error: "Ein Fehler bei der Bestätigung. Bitte versuchen Sie es erneut." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Ihre E-Mail-Adresse wurde bestätigt! Sie erhalten ab sofort den Fristen-Radar.",
      email: subscriber.email,
    },
    { status: 200 },
  );
}
