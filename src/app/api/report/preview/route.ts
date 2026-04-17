import { NextResponse, type NextRequest } from "next/server";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { validateEmail, sanitize } from "@/lib/validation";
import { log } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { generateReportData, type ReportInput } from "@/lib/report-engine";
import type { QuickMaturityAnswer } from "@/lib/maturity-scorer";
import { COUNTRY_TO_LOCALE, type Locale, isValidLocale } from "@/i18n/config";
import { getPDFMessages } from "@/i18n/pdf";

/* ══════════════════════════════════════════════════════════════
   POST /api/report/preview — Free preview (no PDF generation)
   Saves report input + evaluates regulations.
   Returns summary data for the on-screen preview.
   ══════════════════════════════════════════════════════════════ */

const previewLimiter = createRateLimiter({ windowMs: 60_000, max: 3 });

export async function POST(request: NextRequest) {
  /* ── Rate limit ── */
  const ip = getClientIp(request);
  if (previewLimiter.isLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    );
  }

  try {
    /* ── Auth check ── */
    const authSupabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await authSupabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Bitte melden Sie sich an, um einen Report zu erstellen.", loginRequired: true },
        { status: 401 },
      );
    }

    const body = await request.json();

    /* ── Validate required fields ── */
    const email = validateEmail(body.email);
    if (!email) {
      return NextResponse.json({ error: "Ungültige E-Mail-Adresse." }, { status: 400 });
    }

    const contactName = sanitize(body.contactName, 200);
    const companyName = sanitize(body.companyName, 200);
    if (!contactName || !companyName) {
      return NextResponse.json({ error: "Name und Firmenname sind erforderlich." }, { status: 400 });
    }

    if (!body.gdprConsent) {
      return NextResponse.json({ error: "DSGVO-Einwilligung ist erforderlich." }, { status: 400 });
    }

    const validSizes = ["micro", "small", "medium", "large"];
    const companySize = validSizes.includes(body.companySize) ? body.companySize : "small";

    /* ── Build report input ── */
    const country = sanitize(body.country, 5) ?? undefined;

    const input: ReportInput = {
      contactName,
      email,
      companyName,
      phone: sanitize(body.phone, 50) ?? undefined,
      companySize,
      branche: sanitize(body.branche, 100) ?? "Sonstige",
      annualRevenue: sanitize(body.annualRevenue, 50) ?? undefined,
      sectors: Array.isArray(body.sectors)
        ? body.sectors.filter((s: unknown) => typeof s === "string" && s.length <= 100).slice(0, 15)
        : [],
      dataTypes: Array.isArray(body.dataTypes)
        ? body.dataTypes.filter((d: unknown) => typeof d === "string" && d.length <= 100).slice(0, 10)
        : [],
      activities: Array.isArray(body.activities)
        ? body.activities.filter((a: unknown) => typeof a === "string" && a.length <= 200).slice(0, 15)
        : [],
      locations: Array.isArray(body.locations)
        ? body.locations.filter((l: unknown) => typeof l === "string" && l.length <= 100).slice(0, 10)
        : [],
      certifications: Array.isArray(body.certifications)
        ? body.certifications.filter((c: unknown) => typeof c === "string" && c.length <= 50).slice(0, 10)
        : [],
      itStack: Array.isArray(body.itStack)
        ? body.itStack.filter((i: unknown) => typeof i === "string" && i.length <= 50).slice(0, 10)
        : [],
      dataExportCountries: Array.isArray(body.dataExportCountries)
        ? body.dataExportCountries.filter((c: unknown) => typeof c === "string" && c.length <= 50).slice(0, 10)
        : [],
      incidentHistory: Array.isArray(body.incidentHistory)
        ? body.incidentHistory.filter((i: unknown) => typeof i === "string" && i.length <= 50).slice(0, 10)
        : [],
      productCategories: Array.isArray(body.productCategories)
        ? body.productCategories.filter((p: unknown) => typeof p === "string" && p.length <= 50).slice(0, 15)
        : [],
      marketingClaims: Array.isArray(body.marketingClaims)
        ? body.marketingClaims.filter((m: unknown) => typeof m === "string" && m.length <= 50).slice(0, 10)
        : [],
      isListed: Boolean(body.isListed),
      maturityAnswers: Array.isArray(body.maturityAnswers)
        ? body.maturityAnswers.filter(
            (a: unknown): a is QuickMaturityAnswer => {
              if (typeof a !== "object" || a === null || !("category" in a) || !("level" in a)) return false;
              const level = (a as Record<string, unknown>).level;
              return typeof level === "number" && level >= 0 && level <= 3;
            },
          ).slice(0, 5)
        : [],
      urgency: sanitize(body.urgency, 50) ?? "exploring",
      message: sanitize(body.message, 2000) ?? undefined,
      gdprConsent: true,
      commercialConsent: Boolean(body.commercialConsent),
      country,
      countryName: sanitize(body.countryName, 100) ?? undefined,
    };

    /* ── Resolve locale ── */
    const rawLocale = sanitize(body.locale, 5);
    const locale: Locale = rawLocale && isValidLocale(rawLocale)
      ? rawLocale
      : country && country in COUNTRY_TO_LOCALE
        ? COUNTRY_TO_LOCALE[country]!
        : "de";

    const t = await getPDFMessages(locale);

    /* ── Generate report data (evaluation only, no PDF) ── */
    const reportData = await generateReportData(input, t);

    log.info("[report-preview]", "Preview generated", {
      email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
      regulations: reportData.regulations.length,
      grade: reportData.maturityGrade.letter,
    });

    /* ── Store in DB with payment_status='pending' ── */
    const reportToken = crypto.randomUUID();

    try {
      const supabase = getSupabaseAdmin();
      const { error: dbError } = await supabase.from("reports").insert({
        report_token: reportToken,
        email,
        contact_name: contactName,
        company_name: companyName,
        company_size: companySize,
        branche: input.branche,
        country: input.country ?? null,
        country_name: input.countryName ?? null,
        evaluated_regulations: reportData.regulations,
        cost_estimate: null,
        maturity_grade: reportData.maturityGrade.letter,
        pdf_storage_path: null, // no PDF yet
        gdpr_consent: true,
        commercial_consent: input.commercialConsent,
        user_id: user.id,
        payment_status: "pending",
        report_input: input, // stored so webhook can re-generate
      });

      if (dbError) {
        log.warn("[report-preview]", "DB insert failed", { error: dbError.message });
      }
    } catch (dbErr) {
      log.warn("[report-preview]", "Supabase insert failed", {
        error: dbErr instanceof Error ? dbErr.message : String(dbErr),
      });
    }

    /* ── Return preview data (free) ── */
    return NextResponse.json({
      success: true,
      reportToken,
      regulations: reportData.regulations.map((r) => ({
        key: r.key,
        name: r.name,
        subtitle: r.subtitle,
        href: r.href,
        relevance: r.relevance,
        color: r.color,
        reason: r.reason,
      })),
      regulationsCount: reportData.regulations.length,
      highCount: reportData.highRelevanceCount,
      mediumCount: reportData.mediumRelevanceCount,
      maturityGrade: reportData.maturityGrade.letter,
      /** Top 3 roadmap actions — gives users concrete next-step guidance */
      topActions: reportData.roadmapItems.slice(0, 3).map((r) => ({
        phaseLabel: r.phaseLabel,
        action: r.action,
        regulationName: r.regulationName,
        effort: r.effort,
        color: r.color,
      })),
      nextDeadline: reportData.nextCriticalDeadline
        ? {
            label: reportData.nextCriticalDeadline.title,
            date: reportData.nextCriticalDeadline.iso,
            daysUntil: reportData.nextCriticalDeadline.daysLeft,
          }
        : null,
    });
  } catch (err) {
    log.error("[report-preview]", "Unexpected error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten." },
      { status: 500 },
    );
  }
}
