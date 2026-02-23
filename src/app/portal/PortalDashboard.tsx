"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface Report {
  id: string;
  report_token: string;
  company_name: string;
  contact_name: string | null;
  maturity_grade: string | null;
  evaluated_regulations: EvaluatedRegulation[] | null;
  cost_estimate: CostEstimate | null;
  download_count: number;
  branche: string | null;
  created_at: string;
}

interface EvaluatedRegulation {
  name: string;
  relevance: "high" | "medium" | "low";
}

interface CostEstimate {
  totalMin: number;
  totalMax: number;
}

interface Profile {
  full_name: string | null;
  company_name: string | null;
  avatar_url: string | null;
}

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const GRADE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  A: { bg: "rgba(5,150,105,0.12)", text: "#34d399", label: "Sehr gut" },
  B: { bg: "rgba(34,197,94,0.10)", text: "#4ade80", label: "Gut" },
  C: { bg: "rgba(234,179,8,0.10)", text: "#fbbf24", label: "Mittel" },
  D: { bg: "rgba(249,115,22,0.10)", text: "#fb923c", label: "Mangelhaft" },
  E: { bg: "rgba(239,68,68,0.10)", text: "#f87171", label: "Kritisch" },
};

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function PortalDashboard({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [reports, setReports] = useState<Report[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [reportsRes, profileRes] = await Promise.all([
        fetch("/api/portal/reports"),
        fetch("/api/portal/profile"),
      ]);

      if (!reportsRes.ok || !profileRes.ok) {
        throw new Error("Daten konnten nicht geladen werden.");
      }

      const reportsData = await reportsRes.json();
      const profileData = await profileRes.json();

      setReports(reportsData.reports ?? []);
      setProfile(profileData.profile ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  }

  const displayName =
    profile?.full_name || profile?.company_name || userEmail.split("@")[0];
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalReports = reports.length;
  const latestReport = reports[0];
  const highRelevanceCount = reports.reduce((sum, r) => {
    const regs = r.evaluated_regulations ?? [];
    return sum + regs.filter((reg) => reg.relevance === "high").length;
  }, 0);

  return (
    <div className="min-h-screen bg-[#05090f] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FACC15 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── Header Bar ── */}
      <header className="border-b border-white/[0.06] bg-white/[0.01] backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/de" className="inline-flex items-center gap-2 group">
              <div className="w-6 h-6 rounded-[5px] bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                <span className="text-[8px] font-black text-[#0A2540]">EU</span>
              </div>
              <span className="font-[Syne] font-[800] text-[13px] text-white/80 tracking-tight hidden sm:inline">
                Compliance Hub
              </span>
            </Link>
            <span className="text-[11px] text-white/15 hidden sm:inline">/</span>
            <span className="text-[11px] text-white/30 hidden sm:inline">Portal</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Avatar + Name */}
            <div className="flex items-center gap-2.5">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt=""
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full ring-1 ring-white/[0.08]"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-white/[0.06] ring-1 ring-white/[0.06] flex items-center justify-center">
                  <span className="text-[10px] font-semibold text-white/50">{initials}</span>
                </div>
              )}
              <span className="text-[13px] text-white/50 hidden sm:inline">{displayName}</span>
            </div>

            <div className="w-px h-4 bg-white/[0.06] hidden sm:block" />

            <button
              onClick={handleLogout}
              className="px-2.5 py-1.5 rounded-md text-[11px] text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all duration-200"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-6 py-8 lg:py-10 relative z-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-[Syne] font-[800] text-[20px] text-white/90 tracking-tight">
            Willkommen, {displayName}
          </h1>
          <p className="text-[13px] text-white/30 mt-1">
            Ihre Compliance-Reports und Analysen im Überblick.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-5 h-5 border-[1.5px] border-yellow-400/60 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-md border border-red-400/[0.08] bg-red-400/[0.04] p-5 text-center">
            <p className="text-[13px] text-red-400/80 mb-3" role="alert">{error}</p>
            <button
              onClick={fetchData}
              className="px-3.5 py-1.5 rounded-md text-[12px] font-medium text-white/60 border border-white/[0.08] hover:border-white/[0.15] hover:text-white/80 transition-all duration-200"
            >
              Erneut laden
            </button>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && !error && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="text-[11px] font-medium text-white/25 uppercase tracking-wider mb-2">
                  Reports
                </div>
                <div className="text-[22px] font-[600] text-white/90 tabular-nums">
                  {totalReports}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="text-[11px] font-medium text-white/25 uppercase tracking-wider mb-2">
                  Letzter Report
                </div>
                <div className="text-[22px] font-[600] text-white/90 tabular-nums">
                  {latestReport
                    ? new Date(latestReport.created_at).toLocaleDateString("de-AT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "—"}
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="text-[11px] font-medium text-white/25 uppercase tracking-wider mb-2">
                  Hoch relevant
                </div>
                <div className="text-[22px] font-[600] text-yellow-400/90 tabular-nums">
                  {highRelevanceCount}
                </div>
              </div>
            </div>

            {/* Reports Table */}
            {reports.length > 0 ? (
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <h2 className="text-[13px] font-semibold text-white/70">
                    Ihre Reports
                  </h2>
                  <span className="text-[11px] text-white/20 tabular-nums">
                    {totalReports} {totalReports === 1 ? "Ergebnis" : "Ergebnisse"}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.04]">
                        <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/20 tracking-wider uppercase">
                          Unternehmen
                        </th>
                        <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/20 tracking-wider uppercase">
                          Reifegrad
                        </th>
                        <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/20 tracking-wider uppercase hidden sm:table-cell">
                          Regulierungen
                        </th>
                        <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/20 tracking-wider uppercase hidden md:table-cell">
                          Kosten
                        </th>
                        <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/20 tracking-wider uppercase">
                          Datum
                        </th>
                        <th className="text-right px-4 py-2.5 text-[10px] font-medium text-white/20 tracking-wider uppercase">
                          &nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => {
                        const grade = GRADE_STYLES[report.maturity_grade ?? "C"] ?? GRADE_STYLES.C;
                        const regsCount = report.evaluated_regulations?.length ?? 0;
                        const highCount =
                          report.evaluated_regulations?.filter(
                            (r) => r.relevance === "high",
                          ).length ?? 0;
                        const costMin = report.cost_estimate?.totalMin;
                        const costMax = report.cost_estimate?.totalMax;

                        return (
                          <tr
                            key={report.id}
                            className="border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors duration-150"
                          >
                            <td className="px-4 py-3">
                              <div className="text-[13px] text-white/80 font-medium">
                                {report.company_name}
                              </div>
                              {report.branche && (
                                <div className="text-[11px] text-white/20 mt-0.5">
                                  {report.branche}
                                </div>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold"
                                style={{ color: grade.text, background: grade.bg }}
                              >
                                {report.maturity_grade ?? "—"}
                                <span className="font-normal text-[10px] opacity-60">
                                  {grade.label}
                                </span>
                              </span>
                            </td>

                            <td className="px-4 py-3 hidden sm:table-cell">
                              <span className="text-[13px] text-white/50 tabular-nums">
                                {regsCount}
                              </span>
                              {highCount > 0 && (
                                <span className="text-[11px] text-yellow-400/50 ml-1.5">
                                  {highCount} hoch
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3 hidden md:table-cell">
                              {costMin != null && costMax != null ? (
                                <span className="text-[12px] text-white/40 tabular-nums">
                                  {formatCurrency(costMin)} – {formatCurrency(costMax)}
                                </span>
                              ) : (
                                <span className="text-[12px] text-white/15">—</span>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              <span className="text-[12px] text-white/25 tabular-nums">
                                {new Date(report.created_at).toLocaleDateString("de-AT", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-right">
                              <a
                                href={`/api/report/download?token=${report.report_token}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-white/50 border border-white/[0.08] hover:border-white/[0.15] hover:text-white/80 transition-all duration-200"
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                  />
                                </svg>
                                PDF
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-10 text-center">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-5 h-5 text-white/20"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold text-white/70 mb-1.5">
                  Noch keine Reports
                </h3>
                <p className="text-[13px] text-white/30 mb-6 max-w-sm mx-auto leading-relaxed">
                  Erstellen Sie Ihren ersten Compliance-Report, um Ihre
                  regulatorischen Anforderungen zu analysieren.
                </p>
                <Link
                  href="/de/tools/reifegrad-check"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-semibold text-[#0A2540] hover:shadow-[0_0_20px_rgba(250,204,21,0.12)] transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  }}
                >
                  Report erstellen
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/de/tools"
                className="group rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.10] hover:bg-white/[0.03] transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white/25 group-hover:text-yellow-400/60 transition-colors duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-white/60 group-hover:text-white/80 transition-colors duration-200">
                      Compliance-Tools
                    </h3>
                    <p className="text-[11px] text-white/20 mt-0.5">
                      8 interaktive Tools
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/de/faq"
                className="group rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.10] hover:bg-white/[0.03] transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white/[0.04] flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white/25 group-hover:text-yellow-400/60 transition-colors duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[13px] font-semibold text-white/60 group-hover:text-white/80 transition-colors duration-200">
                      Häufige Fragen
                    </h3>
                    <p className="text-[11px] text-white/20 mt-0.5">
                      Antworten auf Compliance-Fragen
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Account Info */}
            <div className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[11px] font-medium text-white/25 uppercase tracking-wider">
                  Konto
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-white/20 shrink-0">E-Mail</span>
                  <span className="text-white/50 font-mono truncate">{userEmail}</span>
                </div>
                {profile?.full_name && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="text-white/20 shrink-0">Name</span>
                    <span className="text-white/50">{profile.full_name}</span>
                  </div>
                )}
                {profile?.company_name && (
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="text-white/20 shrink-0">Firma</span>
                    <span className="text-white/50">{profile.company_name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-white/20 shrink-0">ID</span>
                  <span className="text-white/15 font-mono text-[10px] truncate">{userId}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

/* ── Helper ── */
function formatCurrency(n: number): string {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}
