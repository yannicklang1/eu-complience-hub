import { NextResponse, type NextRequest } from "next/server";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import { log } from "@/lib/logger";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyWebhookSignature, extractCustomData } from "@/lib/lemonsqueezy";
import { generateReportData, type ReportInput } from "@/lib/report-engine";
import { sendReportEmail } from "@/lib/resend";
import ReportDocument from "@/lib/pdf/ReportDocument";
import { COUNTRY_TO_LOCALE, type Locale } from "@/i18n/config";
import { getPDFMessages } from "@/i18n/pdf";

/* ══════════════════════════════════════════════════════════════
   POST /api/webhooks/lemonsqueezy — Handle payment events
   NO auth middleware — verified via HMAC signature
   ══════════════════════════════════════════════════════════════ */

export async function POST(request: NextRequest) {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  /* ── Verify HMAC signature ── */
  const signature = request.headers.get("x-signature") ?? "";
  const valid = await verifyWebhookSignature(rawBody, signature);
  if (!valid) {
    log.warn("[webhook-ls]", "Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  /* ── Only process order_created events ── */
  const eventName = (payload.meta as Record<string, unknown> | undefined)?.event_name;
  if (eventName !== "order_created") {
    log.info("[webhook-ls]", "Ignored event", { event: String(eventName) });
    return NextResponse.json({ ok: true });
  }

  /* ── Extract custom data ── */
  const customData = extractCustomData(payload);
  if (!customData) {
    log.error("[webhook-ls]", "Missing custom_data in webhook");
    return NextResponse.json({ error: "Missing custom_data" }, { status: 400 });
  }

  const { report_token, user_email } = customData;
  const orderId = String(
    (payload.data as Record<string, unknown> | undefined)?.id ?? "",
  );

  log.info("[webhook-ls]", "Processing order", {
    reportToken: report_token,
    orderId,
    email: user_email.replace(/(.{2}).*(@.*)/, "$1***$2"),
  });

  try {
    const supabase = getSupabaseAdmin();

    /* ── Load report from DB ── */
    const { data: report, error: dbError } = await supabase
      .from("reports")
      .select("*")
      .eq("report_token", report_token)
      .single();

    if (dbError || !report) {
      log.error("[webhook-ls]", "Report not found", { reportToken: report_token });
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    /* ── Prevent double-processing ── */
    if (report.payment_status === "paid") {
      log.info("[webhook-ls]", "Already processed", { reportToken: report_token });
      return NextResponse.json({ ok: true });
    }

    /* ── Mark as paid ── */
    await supabase
      .from("reports")
      .update({
        payment_status: "paid",
        lemonsqueezy_order_id: orderId,
      })
      .eq("report_token", report_token);

    /* ── Reconstruct ReportInput from stored data ── */
    const input: ReportInput = report.report_input as ReportInput;
    if (!input || !input.companyName) {
      log.error("[webhook-ls]", "No stored report_input", { reportToken: report_token });
      return NextResponse.json({ ok: true }); // still 200 — payment recorded
    }

    /* ── Resolve locale ── */
    const country = input.country;
    const locale: Locale = country && country in COUNTRY_TO_LOCALE
      ? COUNTRY_TO_LOCALE[country]!
      : "de";
    const t = await getPDFMessages(locale);

    /* ── Generate full report data (loads country data internally) ── */
    const reportData = await generateReportData(input, t);

    /* ── Generate PDF ── */
    let pdfBuffer: Buffer | null = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfElement = React.createElement(ReportDocument, { data: reportData, t }) as any;
      const pdfStream = await pdf(pdfElement).toBuffer();

      if (Buffer.isBuffer(pdfStream)) {
        pdfBuffer = pdfStream;
      } else {
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

      log.info("[webhook-ls]", "PDF generated", { sizeKB: Math.round(pdfBuffer.length / 1024) });
    } catch (pdfErr) {
      log.error("[webhook-ls]", "PDF generation failed", {
        error: pdfErr instanceof Error ? pdfErr.message : String(pdfErr),
      });
    }

    /* ── Upload to Supabase Storage ── */
    let storagePath: string | null = null;
    if (pdfBuffer) {
      storagePath = `reports/${report_token}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from("reports")
        .upload(storagePath, pdfBuffer, {
          contentType: "application/pdf",
          upsert: true, // overwrites if re-processed
        });

      if (uploadError) {
        log.warn("[webhook-ls]", "Storage upload failed", { error: uploadError.message });
        storagePath = null;
      } else {
        await supabase
          .from("reports")
          .update({ pdf_storage_path: storagePath })
          .eq("report_token", report_token);
      }
    }

    /* ── Send email with PDF ── */
    if (pdfBuffer) {
      const emailResult = await sendReportEmail(
        user_email,
        input.contactName,
        input.companyName,
        reportData,
        pdfBuffer,
        locale,
      );
      if (!emailResult.success) {
        log.error("[webhook-ls]", "Email send failed", { error: emailResult.error });
      } else {
        log.info("[webhook-ls]", "Email sent", {
          email: user_email.replace(/(.{2}).*(@.*)/, "$1***$2"),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    log.error("[webhook-ls]", "Unexpected error", {
      error: err instanceof Error ? err.message : String(err),
    });
    // Return 200 so LemonSqueezy doesn't retry — payment is recorded
    return NextResponse.json({ ok: true });
  }
}
