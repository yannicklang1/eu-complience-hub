import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";
import { publicFormLimiter, getClientIp } from "@/lib/rate-limit";
import { sanitize, validateEmail } from "@/lib/validation";
import { sendOptInEmail, sendWelcomeEmail } from "@/lib/resend";
import crypto from "crypto";

/* ══════════════════════════════════════════════════════════════
   POST /api/subscribe — Register new Compliance-Briefing subscriber
   ══════════════════════════════════════════════════════════════ */
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

    /* --- Email validation --- */
    const email = validateEmail(body.email);
    if (!email) {
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
              "Sie erhalten bereits das Compliance-Briefing. Wir benachrichtigen Sie bei kritischen Fristen und Gesetzesänderungen.",
          },
          { status: 200 },
        );
      }

      if (existing.status === "unsubscribed") {
        /* Re-subscribe */
        const opt_in_token = crypto.randomBytes(32).toString("hex");
        const unsubscribe_token = crypto.randomBytes(32).toString("hex");
        const commercial_consent = body.commercial_consent === true;

        await supabase
          .from("subscribers")
          .update({
            status: "pending",
            opt_in_token,
            unsubscribe_token,
            opt_in_confirmed_at: null,
            unsubscribed_at: null,
            commercial_consent,
            commercial_consent_at: commercial_consent ? new Date().toISOString() : null,
            source_page: sanitize(body.source_page),
            country: sanitize(body.country),
          })
          .eq("id", existing.id);

        /* Send double-opt-in email via Resend (fire-and-forget, don't block response) */
        sendOptInEmail(email, opt_in_token).catch(() => {});

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
      if (existing.status === "pending") {
        /* Retrieve existing token for resend */
        const { data: pending } = await supabase
          .from("subscribers")
          .select("opt_in_token")
          .eq("id", existing.id)
          .single();

        if (pending?.opt_in_token) {
          sendOptInEmail(email, pending.opt_in_token).catch(() => {});
        }
      }
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
    const commercial_consent = body.commercial_consent === true;

    const { error: insertError } = await supabase.from("subscribers").insert({
      email,
      status: "pending",
      opt_in_token,
      unsubscribe_token,
      commercial_consent,
      commercial_consent_at: commercial_consent ? new Date().toISOString() : null,
      source: sanitize(body.source) ?? "fristen-radar",
      source_page: sanitize(body.source_page),
      country: sanitize(body.country),
      utm_source: sanitize(body.utm_source),
      utm_medium: sanitize(body.utm_medium),
      utm_campaign: sanitize(body.utm_campaign),
    });

    if (insertError) {
      log.error("[subscribe]", "Insert failed", { code: insertError.code, message: insertError.message });
      const isConnectionError =
        insertError.message?.includes("fetch") ||
        insertError.message?.includes("network") ||
        insertError.code === "PGRST301";
      return NextResponse.json(
        {
          error: isConnectionError
            ? "Der Dienst ist vorübergehend nicht erreichbar. Bitte versuchen Sie es in wenigen Minuten erneut."
            : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        },
        { status: isConnectionError ? 503 : 500 },
      );
    }

    /* Send double-opt-in email via Resend */
    const emailResult = await sendOptInEmail(email, opt_in_token);

    if (!emailResult.success) {
      log.warn("[subscribe]", "Opt-in email failed, subscriber saved as pending", {
        email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
      });
    }

    return NextResponse.json(
      {
        message:
          "Fast geschafft! Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Bitte klicken Sie auf den Link in der E-Mail, um Ihre Anmeldung abzuschließen.",
        requires_confirmation: true,
      },
      { status: 201 },
    );
  } catch (err) {
    log.error("[subscribe]", "Unexpected error", { error: err instanceof Error ? err.message : String(err) });
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
    .select("id, status, email, unsubscribe_token, country")
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
    log.error("[subscribe/verify]", "Update failed", { code: updateError.code, message: updateError.message });
    return NextResponse.json(
      { error: "Ein Fehler bei der Bestätigung. Bitte versuchen Sie es erneut." },
      { status: 500 },
    );
  }

  /* Send welcome email (fire-and-forget) — include country for personalization */
  if (subscriber.unsubscribe_token) {
    sendWelcomeEmail(subscriber.email, subscriber.unsubscribe_token, subscriber.country ?? undefined).catch(() => {});
  }

  return NextResponse.json(
    {
      message:
        "Ihre E-Mail-Adresse wurde bestätigt! Sie erhalten ab sofort das Compliance-Briefing.",
      email: subscriber.email,
    },
    { status: 200 },
  );
}
