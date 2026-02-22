"use client";

import { useState, useEffect, useCallback } from "react";
import { useAdminAuth } from "../AdminAuthProvider";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface Report {
  id: string;
  report_token: string;
  email: string;
  contact_name: string | null;
  company_name: string;
  company_size: string | null;
  branche: string | null;
  maturity_grade: string | null;
  evaluated_regulations: { name: string; relevance: string }[] | null;
  cost_estimate: { totalMin: number; totalMax: number } | null;
  download_count: number;
  pdf_storage_path: string | null;
  created_at: string;
}

interface Stats {
  total: number;
  with_pdf: number;
  total_downloads: number;
}

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const GRADE_STYLES: Record<string, { bg: string; text: string }> = {
  A: { bg: "rgba(5,150,105,0.15)", text: "#059669" },
  B: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
  C: { bg: "rgba(234,179,8,0.15)", text: "#EAB308" },
  D: { bg: "rgba(249,115,22,0.15)", text: "#f97316" },
  E: { bg: "rgba(239,68,68,0.15)", text: "#ef4444" },
};

const ITEMS_PER_PAGE = 25;

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function ReportsAdminPage() {
  const { adminKey } = useAdminAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterGrade, setFilterGrade] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const fetchReports = useCallback(
    async (p: number, grade: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: p.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });
        if (grade) params.set("grade", grade);

        const res = await fetch(`/api/admin/reports?${params.toString()}`, {
          headers: { "x-admin-key": adminKey },
        });

        if (!res.ok) return;

        const data = await res.json();
        setReports(data.reports ?? []);
        setTotal(data.total ?? 0);
        setStats(data.stats ?? null);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    },
    [adminKey],
  );

  useEffect(() => {
    fetchReports(page, filterGrade);
  }, [page, filterGrade, fetchReports]);

  function exportCSV() {
    if (reports.length === 0) return;

    const headers = [
      "E-Mail", "Name", "Unternehmen", "Branche", "Reifegrad",
      "Regulierungen", "Kosten Min", "Kosten Max", "Downloads", "PDF", "Erstellt",
    ];
    const rows = reports.map((r) => [
      r.email,
      r.contact_name ?? "",
      r.company_name,
      r.branche ?? "",
      r.maturity_grade ?? "",
      String(r.evaluated_regulations?.length ?? 0),
      String(r.cost_estimate?.totalMin ?? ""),
      String(r.cost_estimate?.totalMax ?? ""),
      String(r.download_count),
      r.pdf_storage_path ? "Ja" : "Nein",
      new Date(r.created_at).toLocaleDateString("de-AT"),
    ]);

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reports_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-[Syne] font-extrabold text-2xl text-white">
            Reports
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Alle generierten Compliance-Reports
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-xl text-xs font-medium text-[#0A2540] bg-yellow-400 hover:bg-yellow-300 transition-colors"
        >
          CSV Export
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">Gesamt</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
            <div className="text-2xl font-bold text-white">{stats.with_pdf}</div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">Mit PDF</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
            <div className="text-2xl font-bold text-white">{stats.total_downloads}</div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">Downloads</div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filterGrade}
          onChange={(e) => {
            setFilterGrade(e.target.value);
            setPage(1);
          }}
          aria-label="Reifegrad filtern"
          className="rounded-xl border border-white/10 bg-white/5 text-sm text-white px-4 py-2 outline-none"
        >
          <option value="">Alle Reifegrade</option>
          {["A", "B", "C", "D", "E"].map((g) => (
            <option key={g} value={g}>
              Reifegrad {g}
            </option>
          ))}
        </select>

        <div className="flex-1" />

        <span className="text-xs text-slate-500 self-center font-mono">
          {total} Ergebnis{total !== 1 ? "se" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                  Unternehmen
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                  E-Mail
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                  Reifegrad
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase hidden sm:table-cell">
                  Regulierungen
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase hidden md:table-cell">
                  Downloads
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                  Erstellt
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    Keine Reports gefunden.
                  </td>
                </tr>
              ) : (
                reports.map((r) => {
                  const grade = GRADE_STYLES[r.maturity_grade ?? "C"] ?? GRADE_STYLES.C;
                  const regsCount = r.evaluated_regulations?.length ?? 0;

                  return (
                    <tr
                      key={r.id}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-white/80 text-[13px] font-medium">
                          {r.company_name}
                        </div>
                        {r.branche && (
                          <div className="text-[11px] text-slate-600">{r.branche}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/60 font-mono text-[12px]">
                        {r.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold"
                          style={{ color: grade.text, background: grade.bg }}
                        >
                          {r.maturity_grade ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[13px] font-mono hidden sm:table-cell">
                        {regsCount}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[13px] font-mono hidden md:table-cell">
                        {r.download_count}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-[12px] font-mono">
                        {new Date(r.created_at).toLocaleDateString("de-AT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-4 py-2 rounded-lg text-xs text-slate-400 border border-white/10 disabled:opacity-30 hover:border-white/20 transition-colors"
          >
            Zurück
          </button>
          <span className="text-xs text-slate-500 font-mono px-4">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg text-xs text-slate-400 border border-white/10 disabled:opacity-30 hover:border-white/20 transition-colors"
          >
            Weiter
          </button>
        </div>
      )}
    </div>
  );
}
