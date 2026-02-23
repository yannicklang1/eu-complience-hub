import { Resend } from "resend";
import { BASE_URL, SITE_NAME } from "@/lib/constants";
import { log } from "@/lib/logger";
import { COUNTRY_META } from "@/i18n/country";
import type { EUCountryCode } from "@/i18n/config";

/* ══════════════════════════════════════════════════════════════
   Resend Email Service — Double-Opt-In & Transactional Emails
   ══════════════════════════════════════════════════════════════ */

/** Escape user-provided strings before interpolating into HTML templates. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
  country?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    const unsubscribePageUrl = `${BASE_URL}/newsletter/abmeldung?token=${unsubscribeToken}`;
    const unsubscribeApiUrl = `${BASE_URL}/api/unsubscribe?token=${unsubscribeToken}`;

    // Resolve country metadata for personalization
    const countryMeta = country && country in COUNTRY_META
      ? COUNTRY_META[country as EUCountryCode]
      : null;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Willkommen beim ${SITE_NAME} Compliance-Briefing`,
      html: buildWelcomeHtml(unsubscribePageUrl, countryMeta),
      text: buildWelcomeText(unsubscribePageUrl, countryMeta),
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

interface CountryMetaInfo {
  nameDE: string;
  nameEN: string;
  nameLocal: string;
  flag: string;
}

function buildWelcomeHtml(unsubscribeUrl: string, countryMeta: CountryMetaInfo | null): string {
  const countrySection = countryMeta ? `
      <!-- Country-specific note -->
      <div style="margin:0 0 24px;padding:16px;background:rgba(250,204,21,0.06);border:1px solid rgba(250,204,21,0.12);border-radius:8px">
        <div style="font-size:13px;font-weight:700;color:#FACC15;margin-bottom:6px">
          ${countryMeta.flag} Länderspezifisch: ${countryMeta.nameDE}
        </div>
        <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.5">
          Ihre Inhalte werden auf ${countryMeta.nameDE} zugeschnitten — mit nationalen Umsetzungsfristen, zuständigen Behörden und länderspezifischen Besonderheiten.
        </p>
      </div>` : "";

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
${countrySection}
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

function buildWelcomeText(unsubscribeUrl: string, countryMeta: CountryMetaInfo | null): string {
  const countryLine = countryMeta
    ? `\n${countryMeta.flag} Länderspezifisch: ${countryMeta.nameDE}\nIhre Inhalte werden auf ${countryMeta.nameDE} zugeschnitten — mit nationalen Umsetzungsfristen, zuständigen Behörden und länderspezifischen Besonderheiten.\n`
    : "";

  return `${SITE_NAME} – Compliance-Briefing

Willkommen beim Compliance-Briefing!
=====================================

Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Ab sofort erhalten Sie:

- Fristen-Warnungen vor kritischen EU-Regulierungs-Deadlines
- Zusammenfassungen neuer Gesetze und Verordnungen
- Praxistipps zur Umsetzung für Ihr Unternehmen
${countryLine}
Besuchen Sie den Fristen-Radar: ${BASE_URL}/fristen-radar

---
${SITE_NAME} — Europäische Regulierungen. Klar erklärt.
Abmelden: ${unsubscribeUrl}`;
}

/* ── Report Delivery Email ── */

interface ReportEmailData {
  regulations: { name: string; relevance: string }[];
  maturityGrade: { letter: string; label: string };
  totalCostMin: number;
  totalCostMax: number;
}

/** Locale-aware report email strings */
const REPORT_EMAIL_STRINGS: Record<string, {
  subject: string;
  subheading: string;
  greeting: string; // {{name}}, ...
  intro: string; // ... für {{company}} ...
  regsAnalyzed: string;
  highRelevance: string;
  maturityGrade: string;
  estimatedCosts: string;
  fullReportNote: string;
  detailedAnalysis: string;
  costBreakdown: string;
  maturityAndActions: string;
  deadlinesAndSoftware: string;
  ctaButton: string;
  disclaimer: string;
}> = {
  de: {
    subject: "Ihr persönlicher Compliance-Report",
    subheading: "Persönlicher Compliance-Report",
    greeting: "{{name}}, Ihr Compliance-Report ist fertig!",
    intro: "Basierend auf den Angaben für <strong style=\"color:#f8fafc\">{{company}}</strong> haben wir Ihren individuellen Report erstellt.",
    regsAnalyzed: "Regulierungen analysiert",
    highRelevance: "mit hoher Relevanz",
    maturityGrade: "Reifegrad",
    estimatedCosts: "Geschätzte Kosten:",
    fullReportNote: "Ihren vollständigen Report finden Sie im PDF-Anhang dieser E-Mail. Er enthält:",
    detailedAnalysis: "Detaillierte Regulierungs-Analyse",
    costBreakdown: "Kostenaufschlüsselung pro Regulierung",
    maturityAndActions: "Compliance-Reifegrad & Handlungsempfehlungen",
    deadlinesAndSoftware: "Fristen-Übersicht & Software-Empfehlungen",
    ctaButton: "Interaktive Tools entdecken",
    disclaimer: "Dieser Report dient der Orientierung und ersetzt keine Rechtsberatung.",
  },
  en: {
    subject: "Your Personal Compliance Report",
    subheading: "Personal Compliance Report",
    greeting: "{{name}}, your compliance report is ready!",
    intro: "Based on the information for <strong style=\"color:#f8fafc\">{{company}}</strong>, we have created your individual report.",
    regsAnalyzed: "Regulations analyzed",
    highRelevance: "with high relevance",
    maturityGrade: "Maturity Grade",
    estimatedCosts: "Estimated costs:",
    fullReportNote: "You can find your complete report in the PDF attachment of this email. It includes:",
    detailedAnalysis: "Detailed regulatory analysis",
    costBreakdown: "Cost breakdown per regulation",
    maturityAndActions: "Compliance maturity grade & recommendations",
    deadlinesAndSoftware: "Deadline overview & software recommendations",
    ctaButton: "Discover interactive tools",
    disclaimer: "This report is for informational purposes and does not constitute legal advice.",
  },
  fr: {
    subject: "Votre rapport de conformité personnalisé",
    subheading: "Rapport de conformité personnalisé",
    greeting: "{{name}}, votre rapport de conformité est prêt !",
    intro: "Sur la base des informations pour <strong style=\"color:#f8fafc\">{{company}}</strong>, nous avons créé votre rapport individuel.",
    regsAnalyzed: "Réglementations analysées",
    highRelevance: "à haute pertinence",
    maturityGrade: "Niveau de maturité",
    estimatedCosts: "Coûts estimés :",
    fullReportNote: "Vous trouverez votre rapport complet en pièce jointe PDF de cet e-mail. Il comprend :",
    detailedAnalysis: "Analyse réglementaire détaillée",
    costBreakdown: "Ventilation des coûts par réglementation",
    maturityAndActions: "Niveau de maturité & recommandations",
    deadlinesAndSoftware: "Aperçu des délais & recommandations logicielles",
    ctaButton: "Découvrir les outils interactifs",
    disclaimer: "Ce rapport est fourni à titre indicatif et ne constitue pas un conseil juridique.",
  },
  es: {
    subject: "Su informe de cumplimiento personalizado",
    subheading: "Informe de cumplimiento personalizado",
    greeting: "{{name}}, ¡su informe de cumplimiento está listo!",
    intro: "Basándonos en la información de <strong style=\"color:#f8fafc\">{{company}}</strong>, hemos creado su informe individual.",
    regsAnalyzed: "Regulaciones analizadas",
    highRelevance: "con alta relevancia",
    maturityGrade: "Grado de madurez",
    estimatedCosts: "Costes estimados:",
    fullReportNote: "Encontrará su informe completo en el archivo PDF adjunto a este correo. Incluye:",
    detailedAnalysis: "Análisis regulatorio detallado",
    costBreakdown: "Desglose de costes por regulación",
    maturityAndActions: "Grado de madurez y recomendaciones",
    deadlinesAndSoftware: "Resumen de plazos y recomendaciones de software",
    ctaButton: "Descubrir herramientas interactivas",
    disclaimer: "Este informe es orientativo y no constituye asesoramiento jurídico.",
  },
  it: {
    subject: "Il tuo report di conformità personalizzato",
    subheading: "Report di conformità personalizzato",
    greeting: "{{name}}, il tuo report di conformità è pronto!",
    intro: "Sulla base delle informazioni per <strong style=\"color:#f8fafc\">{{company}}</strong>, abbiamo creato il tuo report individuale.",
    regsAnalyzed: "Regolamenti analizzati",
    highRelevance: "ad alta rilevanza",
    maturityGrade: "Grado di maturità",
    estimatedCosts: "Costi stimati:",
    fullReportNote: "Trovi il tuo report completo nell'allegato PDF di questa e-mail. Include:",
    detailedAnalysis: "Analisi normativa dettagliata",
    costBreakdown: "Ripartizione dei costi per regolamento",
    maturityAndActions: "Grado di maturità e raccomandazioni",
    deadlinesAndSoftware: "Panoramica delle scadenze e raccomandazioni software",
    ctaButton: "Scopri gli strumenti interattivi",
    disclaimer: "Questo report è a scopo informativo e non costituisce consulenza legale.",
  },
};

function getReportEmailStrings(locale: string) {
  return REPORT_EMAIL_STRINGS[locale] ?? REPORT_EMAIL_STRINGS.de;
}

export async function sendReportEmail(
  email: string,
  contactName: string,
  companyName: string,
  reportData: ReportEmailData,
  pdfBuffer: Buffer,
  locale: string = "de",
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend();
    const s = getReportEmailStrings(locale);

    const hochCount = reportData.regulations.filter((r) => r.relevance === "hoch").length;
    const totalCount = reportData.regulations.length;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `${SITE_NAME} \u2013 ${s.subject}`,
      html: buildReportHtml(contactName, companyName, hochCount, totalCount, reportData, s),
      text: buildReportText(contactName, companyName, hochCount, totalCount, reportData, s),
      attachments: [
        {
          filename: `Compliance-Report-${companyName.replace(/[^a-zA-Z0-9\u00e4\u00f6\u00fc\u00c4\u00d6\u00dc\u00df -]/g, "")}.pdf`,
          content: pdfBuffer.toString("base64"),
        },
      ],
      tags: [
        { name: "type", value: "compliance-report" },
        { name: "source", value: "report-wizard" },
      ],
    });

    if (error) {
      log.error("[resend]", "Failed to send report email", {
        email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
        error: error.message,
      });
      return { success: false, error: error.message };
    }

    log.info("[resend]", "Report email sent", {
      email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
      locale,
    });
    return { success: true };
  } catch (err) {
    log.error("[resend]", "Unexpected error sending report email", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { success: false, error: "Unexpected error" };
  }
}

function formatCostRange(min: number, max: number): string {
  const fmt = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
  return `${fmt(min)} – ${fmt(max)} €`;
}

function buildReportHtml(
  contactName: string,
  companyName: string,
  hochCount: number,
  totalCount: number,
  data: ReportEmailData,
  s: ReturnType<typeof getReportEmailStrings>,
): string {
  const greeting = s.greeting.replace("{{name}}", escapeHtml(contactName));
  const intro = s.intro.replace("{{company}}", escapeHtml(companyName));

  return `<!DOCTYPE html>
<html lang="de" dir="ltr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${s.subject}</title></head>
<body style="margin:0;padding:0;background-color:#060c1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060c1a;padding:40px 20px">
<tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color:#0f172a;border-radius:12px;border:1px solid rgba(250,204,21,0.15);overflow:hidden">

    <!-- Header -->
    <tr><td style="padding:32px 40px 24px;border-bottom:1px solid rgba(250,204,21,0.1)">
      <div style="font-size:20px;font-weight:700;color:#FACC15;letter-spacing:-0.5px">${SITE_NAME}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:4px">${s.subheading}</div>
    </td></tr>

    <!-- Body -->
    <tr><td style="padding:32px 40px">
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#f8fafc;line-height:1.3">
        ${greeting}
      </h1>
      <p style="margin:0 0 24px;font-size:15px;color:#cbd5e1;line-height:1.6">
        ${intro}
      </p>

      <!-- Stats -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px">
        <tr>
          <td style="padding:12px;background:#0A2540;border-radius:8px;text-align:center;width:33%">
            <div style="font-size:24px;font-weight:800;color:#FACC15">${totalCount}</div>
            <div style="font-size:11px;color:#94a3b8;margin-top:2px">${s.regsAnalyzed}</div>
          </td>
          <td style="width:8px"></td>
          <td style="padding:12px;background:#0A2540;border-radius:8px;text-align:center;width:33%">
            <div style="font-size:24px;font-weight:800;color:${hochCount > 3 ? "#ef4444" : "#FACC15"}">${hochCount}</div>
            <div style="font-size:11px;color:#94a3b8;margin-top:2px">${s.highRelevance}</div>
          </td>
          <td style="width:8px"></td>
          <td style="padding:12px;background:#0A2540;border-radius:8px;text-align:center;width:33%">
            <div style="font-size:24px;font-weight:800;color:#FACC15">${data.maturityGrade.letter}</div>
            <div style="font-size:11px;color:#94a3b8;margin-top:2px">${s.maturityGrade}</div>
          </td>
        </tr>
      </table>

      ${data.totalCostMin > 0 ? `
      <p style="margin:0 0 24px;font-size:14px;color:#cbd5e1;line-height:1.6">
        <span style="color:#94a3b8">${s.estimatedCosts}</span> <strong style="color:#FACC15">${formatCostRange(data.totalCostMin, data.totalCostMax)}</strong>
      </p>
      ` : ""}

      <p style="margin:0 0 24px;font-size:14px;color:#cbd5e1;line-height:1.6">
        ${s.fullReportNote}
      </p>

      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px">
        <tr><td style="padding:5px 0;font-size:13px;color:#cbd5e1"><span style="color:#FACC15;margin-right:8px">&#9679;</span> ${s.detailedAnalysis}</td></tr>
        <tr><td style="padding:5px 0;font-size:13px;color:#cbd5e1"><span style="color:#FACC15;margin-right:8px">&#9679;</span> ${s.costBreakdown}</td></tr>
        <tr><td style="padding:5px 0;font-size:13px;color:#cbd5e1"><span style="color:#FACC15;margin-right:8px">&#9679;</span> ${s.maturityAndActions}</td></tr>
        <tr><td style="padding:5px 0;font-size:13px;color:#cbd5e1"><span style="color:#FACC15;margin-right:8px">&#9679;</span> ${s.deadlinesAndSoftware}</td></tr>
      </table>

      <!-- CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px">
      <tr><td style="border-radius:8px;background:linear-gradient(135deg,#FACC15,#EAB308);padding:1px">
        <a href="${BASE_URL}/tools" target="_blank" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#0f172a;text-decoration:none;border-radius:7px;background:linear-gradient(135deg,#FACC15,#EAB308)">
          ${s.ctaButton} &rarr;
        </a>
      </td></tr></table>
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:20px 40px 24px;background-color:rgba(0,0,0,0.2);border-top:1px solid rgba(250,204,21,0.05)">
      <p style="margin:0;font-size:11px;color:#475569;line-height:1.5;text-align:center">
        ${SITE_NAME} &mdash; eu-compliance-hub.eu<br>
        ${s.disclaimer}
      </p>
    </td></tr>

  </table>
</td></tr></table>
</body></html>`;
}

function buildReportText(
  contactName: string,
  companyName: string,
  hochCount: number,
  totalCount: number,
  data: ReportEmailData,
  s: ReturnType<typeof getReportEmailStrings>,
): string {
  const greeting = s.greeting.replace("{{name}}", contactName);

  return `${SITE_NAME} – ${s.subject}

${greeting}
${"=".repeat(greeting.length)}

${s.intro.replace(/<[^>]*>/g, "").replace("{{company}}", companyName)}

- ${totalCount} ${s.regsAnalyzed}
- ${hochCount} ${s.highRelevance}
- ${s.maturityGrade}: ${data.maturityGrade.label}${data.totalCostMin > 0 ? `\n- ${s.estimatedCosts} ${formatCostRange(data.totalCostMin, data.totalCostMax)}` : ""}

${s.fullReportNote}

- ${s.detailedAnalysis}
- ${s.costBreakdown}
- ${s.maturityAndActions}
- ${s.deadlinesAndSoftware}

${s.ctaButton}: ${BASE_URL}/tools

---
${SITE_NAME} — eu-compliance-hub.eu
${s.disclaimer}`;
}
