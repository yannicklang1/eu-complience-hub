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
  A: { bg: "rgba(5,150,105,0.15)", text: "#059669", label: "Sehr gut" },
  B: { bg: "rgba(34,197,94,0.15)", text: "#22c55e", label: "Gut" },
  C: { bg: "rgba(234,179,8,0.15)", text: "#EAB308", label: "Mittel" },
  D: { bg: "rgba(249,115,22,0.15)", text: "#f97316", label: "Mangelhaft" },
  E: { bg: "rgba(239,68,68,0.15)", text: "#ef4444", label: "Kritisch" },
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
    <div className="min-h-screen bg-[#060c1a]">
      {/* ── Header Bar ── */}
      <header className="border-b border-white/5 bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/de" className="font-[Syne] font-extrabold text-lg text-white">
              EU Compliance Hub
            </Link>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              / Mein Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="flex items-center gap-2">
              {profile?.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-400">{initials}</span>
                </div>
              )}
              <span className="text-sm text-slate-300 hidden sm:inline">{displayName}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 border border-white/10 hover:border-white/20 hover:text-white transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-[Syne] font-extrabold text-2xl text-white">
            Willkommen, {displayName}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Hier finden Sie alle Ihre Compliance-Reports.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm text-red-400 mb-4" role="alert">{error}</p>
            <button
              onClick={fetchData}
              className="px-4 py-2 rounded-xl text-xs font-medium text-white border border-white/10 hover:border-white/20 transition-colors"
            >
              Erneut laden
            </button>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && !error && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl border border-white/5 bg-slate-900/40 p-5">
                <div className="text-2xl font-bold text-white">{totalReports}</div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  {totalReports === 1 ? "Report erstellt" : "Reports erstellt"}
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/40 p-5">
                <div className="text-2xl font-bold text-white">
                  {latestReport
                    ? new Date(latestReport.created_at).toLocaleDateString("de-AT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "—"}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">Letzter Report</div>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/40 p-5">
                <div className="text-2xl font-bold text-yellow-400">{highRelevanceCount}</div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  Hochrelevante Regulierungen
                </div>
              </div>
            </div>

            {/* Reports Table */}
            {reports.length > 0 ? (
              <div className="rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                  <h2 className="font-[Syne] font-bold text-white text-sm">
                    Ihre Reports
                  </h2>
                  <span className="text-xs text-slate-500 font-mono">
                    {totalReports} {totalReports === 1 ? "Ergebnis" : "Ergebnisse"}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-5 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                          Unternehmen
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                          Reifegrad
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase hidden sm:table-cell">
                          Regulierungen
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase hidden md:table-cell">
                          Geschätzte Kosten
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                          Erstellt
                        </th>
                        <th className="text-right px-5 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                          Aktion
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
                            className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="px-5 py-4">
                              <div className="text-white/90 font-medium text-[13px]">
                                {report.company_name}
                              </div>
                              {report.branche && (
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                  {report.branche}
                                </div>
                              )}
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold"
                                style={{ color: grade.text, background: grade.bg }}
                              >
                                {report.maturity_grade ?? "—"}
                                <span className="font-normal text-[10px] opacity-70">
                                  {grade.label}
                                </span>
                              </span>
                            </td>

                            <td className="px-5 py-4 hidden sm:table-cell">
                              <span className="text-white/70 text-[13px] font-mono">
                                {regsCount}
                              </span>
                              {highCount > 0 && (
                                <span className="text-yellow-400/70 text-[11px] ml-1">
                                  ({highCount} hoch)
                                </span>
                              )}
                            </td>

                            <td className="px-5 py-4 hidden md:table-cell">
                              {costMin != null && costMax != null ? (
                                <span className="text-white/60 text-[13px] font-mono">
                                  {formatCurrency(costMin)} – {formatCurrency(costMax)}
                                </span>
                              ) : (
                                <span className="text-slate-600 text-[13px]">—</span>
                              )}
                            </td>

                            <td className="px-5 py-4">
                              <span className="text-slate-500 text-[12px] font-mono">
                                {new Date(report.created_at).toLocaleDateString("de-AT", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                })}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-right">
                              <a
                                href={`/api/report/download?token=${report.report_token}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0A2540] hover:brightness-110 transition-all"
                                style={{
                                  background: "linear-gradient(135deg, #FACC15, #EAB308)",
                                }}
                              >
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
              <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-7 h-7 text-yellow-400"
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
                <h3 className="font-[Syne] font-bold text-white text-lg mb-2">
                  Noch keine Reports
                </h3>
                <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
                  Erstellen Sie Ihren ersten Compliance-Report, um Ihre regulatorischen
                  Anforderungen zu analysieren.
                </p>
                <Link
                  href="/de/tools/reifegrad-check"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-[#0A2540] hover:brightness-110 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #EAB308)",
                  }}
                >
                  Report erstellen
                  <svg
                    className="w-4 h-4"
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
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/de/tools"
                className="rounded-xl border border-white/5 bg-slate-900/40 p-5 hover:border-white/10 transition-colors group"
              >
                <h3 className="font-[Syne] font-bold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors">
                  Compliance-Tools
                </h3>
                <p className="text-[12px] text-slate-500">
                  8 interaktive Tools für Ihre Compliance-Analyse
                </p>
              </Link>

              <Link
                href="/de/faq"
                className="rounded-xl border border-white/5 bg-slate-900/40 p-5 hover:border-white/10 transition-colors group"
              >
                <h3 className="font-[Syne] font-bold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors">
                  Häufige Fragen
                </h3>
                <p className="text-[12px] text-slate-500">
                  Antworten auf die wichtigsten Compliance-Fragen
                </p>
              </Link>
            </div>

            {/* Account Info */}
            <div className="mt-8 rounded-xl border border-white/5 bg-slate-900/40 p-5">
              <h3 className="font-[Syne] font-bold text-white text-sm mb-3">Konto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                <div>
                  <span className="text-slate-500">E-Mail:</span>{" "}
                  <span className="text-white/80 font-mono">{userEmail}</span>
                </div>
                {profile?.full_name && (
                  <div>
                    <span className="text-slate-500">Name:</span>{" "}
                    <span className="text-white/80">{profile.full_name}</span>
                  </div>
                )}
                {profile?.company_name && (
                  <div>
                    <span className="text-slate-500">Unternehmen:</span>{" "}
                    <span className="text-white/80">{profile.company_name}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">User-ID:</span>{" "}
                  <span className="text-white/40 font-mono text-[11px]">{userId}</span>
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
