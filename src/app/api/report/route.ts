import { NextResponse, type NextRequest } from "next/server";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { validateEmail, sanitize } from "@/lib/validation";
import { log } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-auth";
import { generateReportData, type ReportInput } from "@/lib/report-engine";
import { sendReportEmail } from "@/lib/resend";
import ReportDocument from "@/lib/pdf/ReportDocument";
import type { QuickMaturityAnswer } from "@/lib/maturity-scorer";
import { getCountryData } from "@/i18n/country";
import { COUNTRY_TO_LOCALE, type EUCountryCode, type Locale, isValidLocale } from "@/i18n/config";
import { getPDFMessages } from "@/i18n/pdf";

/* ══════════════════════════════════════════════════════════════
   POST /api/report — Generate personalized compliance report
   ══════════════════════════════════════════════════════════════ */

const reportLimiter = createRateLimiter({ windowMs: 60_000, max: 3 });

export async function POST(request: NextRequest) {
  /* ── Rate limit ── */
  const ip = getClientIp(request);
  if (reportLimiter.isLimited(ip)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    );
  }

  try {
    /* ── Auth check — require login for report generation ── */
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
    const countryName = sanitize(body.countryName, 100) ?? undefined;

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
      countryName,
    };

    /* ── Resolve locale: explicit param > country mapping > "de" fallback ── */
    const rawLocale = sanitize(body.locale, 5);
    const locale: Locale = rawLocale && isValidLocale(rawLocale)
      ? rawLocale
      : country && country in COUNTRY_TO_LOCALE
        ? COUNTRY_TO_LOCALE[country]!
        : "de";

    /* ── Load PDF translations ── */
    const t = await getPDFMessages(locale);

    /* ── Generate report data ── */
    const reportData = generateReportData(input, t);

    /* ── Populate country-specific regulation data (async) ── */
    if (reportData.countryContext && country) {
      try {
        const countryDataFull = await getCountryData(country as EUCountryCode);
        if (countryDataFull?.regulations) {
          reportData.countryContext.regulationData = {};
          for (const reg of reportData.regulations) {
            const regData = countryDataFull.regulations[reg.key as import("@/i18n/country/types").RegulationKey];
            if (regData) {
              reportData.countryContext.regulationData[reg.key] = regData;
            }
          }
        }
      } catch {
        // Country data loading failed — continue with basic context
      }
    }

    log.info("[report]", "Report data generated", {
      email: email.replace(/(.{2}).*(@.*)/, "$1***$2"),
      regulations: reportData.regulations.length,
      grade: reportData.maturityGrade.letter,
      country: country ?? "none",
      locale,
    });

    /* ── Generate PDF ── */
    let pdfBuffer: Buffer | null = null;
    try {
      /* @react-pdf/renderer types expect Document element directly;
         our wrapper component returns <Document> internally, so we cast. */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfElement = React.createElement(ReportDocument, { data: reportData, t }) as any;
      const pdfStream = await pdf(pdfElement).toBuffer();

      // toBuffer() may return Buffer or ReadableStream depending on version
      if (Buffer.isBuffer(pdfStream)) {
        pdfBuffer = pdfStream;
      } else {
        // ReadableStream → Buffer
        const reader = (pdfStream as unknown as ReadableStream<Uint8Array>).getReader();
        const chunks: Uint8Array[] = [];
        let done = false;
        while (!done) {
          const result = await reader.read();
          done = result.done;
          if (result.value) chunks.push(result.value);
        }
        pdfBuffer = Buffer.concat(chunks);
      }

      log.info("[report]", "PDF generated", { sizeKB: Math.round(pdfBuffer.length / 1024) });
    } catch (pdfErr) {
      log.error("[report]", "PDF generation failed, continuing without PDF", {
        error: pdfErr instanceof Error ? pdfErr.message : String(pdfErr),
      });
    }

    /* ── Store report in Supabase (non-blocking — don't fail if DB not ready) ── */
    const reportToken = crypto.randomUUID();
    let storagePath: string | null = null;

    try {
      const supabase = getSupabaseAdmin();

      // Upload PDF to Supabase Storage (only if PDF was generated)
      if (pdfBuffer) {
        storagePath = `reports/${reportToken}.pdf`;
        const { error: uploadError } = await supabase.storage
          .from("reports")
          .upload(storagePath, pdfBuffer, {
            contentType: "application/pdf",
            upsert: false,
          });

        if (uploadError) {
          log.warn("[report]", "PDF storage upload failed", { error: uploadError.message });
          storagePath = null;
        }
      }

      // Insert report metadata (with user_id if authenticated)
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
        cost_estimate: { costs: reportData.costs, totalMin: reportData.totalCostMin, totalMax: reportData.totalCostMax },
        maturity_grade: reportData.maturityGrade.letter,
        pdf_storage_path: storagePath,
        gdpr_consent: true,
        commercial_consent: input.commercialConsent,
        user_id: user.id,
      });

      if (dbError) {
        log.warn("[report]", "DB insert failed, continuing", { error: dbError.message });
      }
    } catch (dbErr) {
      log.warn("[report]", "Supabase operations failed, continuing", {
        error: dbErr instanceof Error ? dbErr.message : String(dbErr),
      });
    }

    /* ── Send email with PDF attachment ── */
    let emailSent = false;
    if (pdfBuffer) {
      const emailResult = await sendReportEmail(email, contactName, companyName, reportData, pdfBuffer, locale);
      emailSent = emailResult.success;
      if (!emailResult.success) {
        log.error("[report]", "Email send failed", { error: emailResult.error });
      }
    } else {
      log.warn("[report]", "Skipping email — no PDF generated");
    }

    return NextResponse.json({
      success: true,
      reportToken,
      regulationsCount: reportData.regulations.length,
      maturityGrade: reportData.maturityGrade.letter,
      emailSent,
    });
  } catch (err) {
    log.error("[report]", "Unexpected error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten." },
      { status: 500 },
    );
  }
}
