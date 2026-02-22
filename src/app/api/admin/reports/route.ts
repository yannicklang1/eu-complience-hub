import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { log } from "@/lib/logger";
import { adminLimiter, getClientIp } from "@/lib/rate-limit";

/* ══════════════════════════════════════════════════════════════
   GET /api/admin/reports — Admin reports list with stats
   ══════════════════════════════════════════════════════════════ */

export async function GET(request: NextRequest) {
  /* --- Rate limiting --- */
  if (adminLimiter.isLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    );
  }

  /* --- Auth --- */
  const authHeader = request.headers.get("x-admin-key");
  const adminKey = process.env.ADMIN_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!adminKey || authHeader !== adminKey) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const adminClient = getSupabaseAdmin();

  /* --- Query params --- */
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "50", 10), 200);
  const offset = (page - 1) * limit;
  const grade = url.searchParams.get("grade"); // A, B, C, D, E

  let query = adminClient
    .from("reports")
    .select(
      "id, report_token, email, contact_name, company_name, company_size, branche, maturity_grade, evaluated_regulations, cost_estimate, download_count, pdf_storage_path, created_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (grade && ["A", "B", "C", "D", "E"].includes(grade)) {
    query = query.eq("maturity_grade", grade);
  }

  const { data, error, count } = await query;

  if (error) {
    log.error("[admin/reports]", "Query failed", { code: error.code, message: error.message });
    return NextResponse.json({ error: "Abfrage fehlgeschlagen." }, { status: 500 });
  }

  /* --- Aggregate stats --- */
  const { count: totalReports } = await adminClient
    .from("reports")
    .select("id", { count: "exact", head: true });

  const { count: withPdf } = await adminClient
    .from("reports")
    .select("id", { count: "exact", head: true })
    .not("pdf_storage_path", "is", null);

  // Sum download_count via raw query or manual sum
  const { data: downloadSum } = await adminClient
    .from("reports")
    .select("download_count");

  const totalDownloads = (downloadSum ?? []).reduce(
    (sum, r) => sum + ((r as { download_count: number }).download_count ?? 0),
    0,
  );

  return NextResponse.json({
    reports: data,
    total: count,
    page,
    limit,
    stats: {
      total: totalReports ?? 0,
      with_pdf: withPdf ?? 0,
      total_downloads: totalDownloads,
    },
  });
}
