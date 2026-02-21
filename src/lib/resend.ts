import { Resend } from "resend";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import { log } from "@/lib/logger";

/* ══════════════════════════════════════════════════════════════
   Resend Email Service — Double-Opt-In & Transactional Emails
   ══════════════════════════════════════════════════════════════ */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "EU Compliance Hub <noreply@eu-compliance-hub.eu>";

function getResend(): Resend {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(RESEND_API_KEY);
}

/* ── Double-Opt-In Confirmation Email ── */

export async function sendOptInEmail(
  email: string,
  optInToken: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    const confirmUrl = `${BASE_URL}/newsletter/bestaetigung?token=${optInToken}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `${SITE_NAME} – Bitte bestätigen Sie Ihre Anmeldung`,
      html: buildOptInHtml(confirmUrl),
      text: buildOptInText(confirmUrl),
      headers: {
        "X-Entity-Ref-ID": optInToken,
      },
      tags: [
        { name: "type", value: "double-opt-in" },
        { name: "source", value: "compliance-briefing" },
      ],
    });

    if (error) {
      log.error("[resend]", "Failed to send opt-in email", {
        email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
        error: error.message,
      });
      return { success: false, error: error.message };
    }

    log.info("[resend]", "Opt-in email sent", {
      email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
    });
    return { success: true };
  } catch (err) {
    log.error("[resend]", "Unexpected error sending opt-in email", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { success: false, error: "Unexpected error" };
  }
}

/* ── Welcome Email (after confirmation) ── */

export async function sendWelcomeEmail(
  email: string,
  unsubscribeToken: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    const unsubscribePageUrl = `${BASE_URL}/newsletter/abmeldung?token=${unsubscribeToken}`;
    const unsubscribeApiUrl = `${BASE_URL}/api/unsubscribe?token=${unsubscribeToken}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Willkommen beim ${SITE_NAME} Compliance-Briefing`,
      html: buildWelcomeHtml(unsubscribePageUrl),
      text: buildWelcomeText(unsubscribePageUrl),
      headers: {
        /* List-Unsubscribe header points to API for one-click mail client unsubscribe */
        "List-Unsubscribe": `<${unsubscribeApiUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      tags: [
        { name: "type", value: "welcome" },
        { name: "source", value: "compliance-briefing" },
      ],
    });

    if (error) {
      log.error("[resend]", "Failed to send welcome email", {
        email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
        error: error.message,
      });
      return { success: false, error: error.message };
    }

    log.info("[resend]", "Welcome email sent", {
      email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
    });
    return { success: true };
  } catch (err) {
    log.error("[resend]", "Unexpected error sending welcome email", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { success: false, error: "Unexpected error" };
  }
}

/* ══════════════════════════════════════════════════════════════
   Email Templates — Inline HTML (no external images, fast load)
   ══════════════════════════════════════════════════════════════ */

function buildOptInHtml(confirmUrl: string): string {
  return `<!DOCTYPE html>
<html lang="de" dir="ltr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>E-Mail bestätigen</title></head>
<body style="margin:0;padding:0;background-color:#060c1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060c1a;padding:40px 20px">
<tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#0f172a;border-radius:12px;border:1px solid rgba(250,204,21,0.15);overflow:hidden">

    <!-- Header -->
    <tr><td style="padding:32px 40px 24px;border-bottom:1px solid rgba(250,204,21,0.1)">
      <div style="font-size:20px;font-weight:700;color:#FACC15;letter-spacing:-0.5px">${SITE_NAME}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:4px">Compliance-Briefing</div>
    </td></tr>

    <!-- Body -->
    <tr><td style="padding:32px 40px">
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#f8fafc;line-height:1.3">
        Bitte bestätigen Sie Ihre Anmeldung
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:#cbd5e1;line-height:1.6">
        Sie haben sich für das <strong style="color:#f8fafc">Compliance-Briefing</strong> des EU Compliance Hub angemeldet. Klicken Sie auf den Button, um Ihre E-Mail-Adresse zu bestätigen:
      </p>

      <!-- CTA Button -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px">
      <tr><td style="border-radius:8px;background:linear-gradient(135deg,#FACC15,#EAB308);padding:1px">
        <a href="${confirmUrl}" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#0f172a;text-decoration:none;border-radius:7px;background:linear-gradient(135deg,#FACC15,#EAB308)">
          Anmeldung bestätigen &rarr;
        </a>
      </td></tr></table>

      <p style="margin:0 0 16px;font-size:13px;color:#64748b;line-height:1.6">
        Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:
      </p>
      <p style="margin:0 0 24px;font-size:12px;color:#FACC15;word-break:break-all;line-height:1.5">
        ${confirmUrl}
      </p>

      <div style="border-top:1px solid rgba(250,204,21,0.1);padding-top:20px;margin-top:8px">
        <p style="margin:0;font-size:12px;color:#475569;line-height:1.5">
          <strong>Nicht angemeldet?</strong> Ignorieren Sie diese E-Mail einfach. Der Link ist 48 Stunden gültig und wird danach automatisch ungültig.
        </p>
      </div>
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:20px 40px 24px;background-color:rgba(0,0,0,0.2);border-top:1px solid rgba(250,204,21,0.05)">
      <p style="margin:0;font-size:11px;color:#475569;line-height:1.5;text-align:center">
        ${SITE_NAME} &mdash; Europäische Regulierungen. Klar erklärt.<br>
        Diese E-Mail wurde automatisch versendet.
      </p>
    </td></tr>

  </table>
</td></tr></table>
</body></html>`;
}

function buildOptInText(confirmUrl: string): string {
  return `${SITE_NAME} – Compliance-Briefing

Bitte bestätigen Sie Ihre Anmeldung
=====================================

Sie haben sich für das Compliance-Briefing des EU Compliance Hub angemeldet.
Bitte bestätigen Sie Ihre E-Mail-Adresse, indem Sie den folgenden Link aufrufen:

${confirmUrl}

Falls Sie sich nicht angemeldet haben, ignorieren Sie diese E-Mail einfach.
Der Link ist 48 Stunden gültig.

---
${SITE_NAME} — Europäische Regulierungen. Klar erklärt.`;
}

function buildWelcomeHtml(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="de" dir="ltr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Willkommen</title></head>
<body style="margin:0;padding:0;background-color:#060c1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060c1a;padding:40px 20px">
<tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#0f172a;border-radius:12px;border:1px solid rgba(250,204,21,0.15);overflow:hidden">

    <!-- Header -->
    <tr><td style="padding:32px 40px 24px;border-bottom:1px solid rgba(250,204,21,0.1)">
      <div style="font-size:20px;font-weight:700;color:#FACC15;letter-spacing:-0.5px">${SITE_NAME}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:4px">Compliance-Briefing</div>
    </td></tr>

    <!-- Body -->
    <tr><td style="padding:32px 40px">
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#f8fafc;line-height:1.3">
        Willkommen beim Compliance-Briefing!
      </h1>
      <p style="margin:0 0 20px;font-size:15px;color:#cbd5e1;line-height:1.6">
        Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Ab sofort erhalten Sie:
      </p>

      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px">
        <tr><td style="padding:6px 0;font-size:14px;color:#cbd5e1;line-height:1.5">
          <span style="color:#FACC15;margin-right:8px">&#9679;</span>
          Fristen-Warnungen vor kritischen EU-Regulierungs-Deadlines
        </td></tr>
        <tr><td style="padding:6px 0;font-size:14px;color:#cbd5e1;line-height:1.5">
          <span style="color:#FACC15;margin-right:8px">&#9679;</span>
          Zusammenfassungen neuer Gesetze und Verordnungen
        </td></tr>
        <tr><td style="padding:6px 0;font-size:14px;color:#cbd5e1;line-height:1.5">
          <span style="color:#FACC15;margin-right:8px">&#9679;</span>
          Praxistipps zur Umsetzung für Ihr Unternehmen
        </td></tr>
      </table>

      <!-- CTA to site -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px">
      <tr><td style="border-radius:8px;background:linear-gradient(135deg,#FACC15,#EAB308);padding:1px">
        <a href="${BASE_URL}/fristen-radar" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#0f172a;text-decoration:none;border-radius:7px;background:linear-gradient(135deg,#FACC15,#EAB308)">
          Fristen-Radar ansehen &rarr;
        </a>
      </td></tr></table>
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:20px 40px 24px;background-color:rgba(0,0,0,0.2);border-top:1px solid rgba(250,204,21,0.05)">
      <p style="margin:0 0 8px;font-size:11px;color:#475569;line-height:1.5;text-align:center">
        ${SITE_NAME} &mdash; Europäische Regulierungen. Klar erklärt.
      </p>
      <p style="margin:0;font-size:11px;color:#475569;line-height:1.5;text-align:center">
        <a href="${unsubscribeUrl}" style="color:#64748b;text-decoration:underline">Vom Compliance-Briefing abmelden</a>
      </p>
    </td></tr>

  </table>
</td></tr></table>
</body></html>`;
}

function buildWelcomeText(unsubscribeUrl: string): string {
  return `${SITE_NAME} – Compliance-Briefing

Willkommen beim Compliance-Briefing!
=====================================

Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Ab sofort erhalten Sie:

- Fristen-Warnungen vor kritischen EU-Regulierungs-Deadlines
- Zusammenfassungen neuer Gesetze und Verordnungen
- Praxistipps zur Umsetzung für Ihr Unternehmen

Besuchen Sie den Fristen-Radar: ${BASE_URL}/fristen-radar

---
${SITE_NAME} — Europäische Regulierungen. Klar erklärt.
Abmelden: ${unsubscribeUrl}`;
}
