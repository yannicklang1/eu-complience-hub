import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";

/* ══════════════════════════════════════════════════════════════
   GET /api/report/download?token=xxx — Download PDF report
   ══════════════════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token || !/^[0-9a-f-]{36}$/.test(token)) {
    return NextResponse.json({ error: "Ungültiger Token." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();

    /* ── Look up report ── */
    const { data: report, error: dbError } = await supabase
      .from("reports")
      .select("pdf_storage_path, company_name, download_count")
      .eq("report_token", token)
      .single();

    if (dbError || !report) {
      return NextResponse.json({ error: "Report nicht gefunden." }, { status: 404 });
    }

    if (!report.pdf_storage_path) {
      return NextResponse.json({ error: "PDF nicht verfügbar." }, { status: 404 });
    }

    /* ── Fetch PDF from storage ── */
    const { data: pdfData, error: storageError } = await supabase.storage
      .from("reports")
      .download(report.pdf_storage_path);

    if (storageError || !pdfData) {
      log.error("[report-download]", "PDF download failed", { error: storageError?.message });
      return NextResponse.json({ error: "PDF konnte nicht geladen werden." }, { status: 500 });
    }

    /* ── Increment download counter ── */
    await supabase
      .from("reports")
      .update({ download_count: (report.download_count ?? 0) + 1 })
      .eq("report_token", token);

    /* ── Return PDF ── */
    const buffer = await pdfData.arrayBuffer();
    const fileName = `Compliance-Report-${(report.company_name ?? "Report").replace(/[^a-zA-Z0-9äöüÄÖÜß -]/g, "")}.pdf`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    log.error("[report-download]", "Unexpected error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Ein unerwarteter Fehler ist aufgetreten." },
      { status: 500 },
    );
  }
}
