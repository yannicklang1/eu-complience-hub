"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface Lead {
  id: string;
  email: string;
  contact_name: string | null;
  company_name: string | null;
  phone: string | null;
  company_size: string | null;
  branche: string | null;
  country: string | null;
  regulations: string[] | null;
  source_tool: string | null;
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  tool_results: Record<string, unknown> | null;
  gdpr_consent: boolean;
  marketing_consent: boolean;
  opt_in_confirmed: boolean;
  opt_in_token: string | null;
  ip_country: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

interface LeadStats {
  total_leads: number;
  leads_last_7d: number;
  leads_last_30d: number;
  marketing_opted_in: number;
  double_opt_in_confirmed: number;
  unique_tools: number;
  unique_branchen: number;
}

interface ApiResponse {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
  stats: LeadStats | null;
}

type AuthState = "idle" | "loading" | "authenticated" | "error";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const SOURCE_LABELS: Record<string, string> = {
  "nis2-check": "NIS2-Check",
  "haftungs-pruefer": "Haftungs-Prüfer",
  "bussgeld-rechner": "Bußgeld-Rechner",
};

const SIZE_LABELS: Record<string, string> = {
  micro: "Kleinst (<10)",
  small: "Klein (10-49)",
  medium: "Mittel (50-249)",
  large: "Groß (250+)",
};

const COUNTRY_LABELS: Record<string, string> = {
  AT: "🇦🇹 AT", DE: "🇩🇪 DE", BE: "🇧🇪 BE", BG: "🇧🇬 BG",
  HR: "🇭🇷 HR", CY: "🇨🇾 CY", CZ: "🇨🇿 CZ", DK: "🇩🇰 DK",
  EE: "🇪🇪 EE", FI: "🇫🇮 FI", FR: "🇫🇷 FR", GR: "🇬🇷 GR",
  HU: "🇭🇺 HU", IE: "🇮🇪 IE", IT: "🇮🇹 IT", LV: "🇱🇻 LV",
  LT: "🇱🇹 LT", LU: "🇱🇺 LU", MT: "🇲🇹 MT", NL: "🇳🇱 NL",
  PL: "🇵🇱 PL", PT: "🇵🇹 PT", RO: "🇷🇴 RO", SK: "🇸🇰 SK",
  SI: "🇸🇮 SI", ES: "🇪🇸 ES", SE: "🇸🇪 SE",
  CH: "🇨🇭 CH", LI: "🇱🇮 LI",
  OTHER_EU: "🇪🇺 EU", OTHER: "🌍",
};

const ITEMS_PER_PAGE = 25;

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function LeadDashboard() {
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [adminKey, setAdminKey] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterSource, setFilterSource] = useState("");
  const [filterBranche, setFilterBranche] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const fetchLeads = useCallback(
    async (p: number, source: string, branche: string, country: string) => {
      setAuthState("loading");
      try {
        const params = new URLSearchParams({
          page: p.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });
        if (source) params.set("source", source);
        if (branche) params.set("branche", branche);
        if (country) params.set("country", country);

        const res = await fetch(`/api/leads?${params.toString()}`, {
          headers: { "x-admin-key": adminKey },
        });

        if (res.status === 401) {
          setAuthState("error");
          setErrorMessage("Ungültiger Admin-Key.");
          return;
        }

        if (!res.ok) {
          setAuthState("error");
          setErrorMessage(`Fehler: ${res.status}`);
          return;
        }

        const data: ApiResponse = await res.json();
        setLeads(data.leads);
        setTotal(data.total ?? 0);
        setStats(data.stats ?? null);
        setAuthState("authenticated");
      } catch (err) {
        setAuthState("error");
        setErrorMessage(err instanceof Error ? err.message : "Verbindungsfehler");
      }
    },
    [adminKey],
  );

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!adminKey.trim()) return;
    fetchLeads(1, filterSource, filterBranche, filterCountry);
  }

  useEffect(() => {
    if (authState === "authenticated") {
      fetchLeads(page, filterSource, filterBranche, filterCountry);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterSource, filterBranche, filterCountry]);

  function exportCSV() {
    if (leads.length === 0) return;

    const headers = [
      "E-Mail",
      "Name",
      "Unternehmen",
      "Land",
      "Telefon",
      "Größe",
      "Branche",
      "Tool",
      "Marketing",
      "Erstellt",
    ];

    const rows = leads.map((l) => [
      l.email,
      l.contact_name ?? "",
      l.company_name ?? "",
      l.country ?? "",
      l.phone ?? "",
      l.company_size ? SIZE_LABELS[l.company_size] ?? l.company_size : "",
      l.branche ?? "",
      l.source_tool ? SOURCE_LABELS[l.source_tool] ?? l.source_tool : "",
      l.marketing_consent ? "Ja" : "Nein",
      new Date(l.created_at).toLocaleDateString("de-AT"),
    ]);

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ─── Login Screen ─── */
  if (authState !== "authenticated") {
    return (
      <div className="min-h-screen bg-[#f8f9fd] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="rounded-2xl border border-[#d8dff0] bg-white p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A2540] to-[#0D3068] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <h1 className="font-[Syne] font-extrabold text-xl text-[#060c1a]">
                  Lead-Dashboard
                </h1>
                <p className="text-[12px] text-[#7a8db0]">Admin-Zugang erforderlich</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#060c1a] mb-1.5">
                  Service Role Key
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="sb_secret_..."
                  className="w-full px-4 py-3 rounded-lg border border-[#d8dff0] bg-white text-sm text-[#060c1a] placeholder:text-[#7a8db0] focus:outline-none focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/20"
                />
              </div>

              {authState === "error" && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-[13px] text-red-700">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={authState === "loading" || !adminKey.trim()}
                className="w-full py-3 rounded-xl text-sm font-[Syne] font-bold text-white bg-gradient-to-r from-[#0A2540] to-[#0D3068] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authState === "loading" ? "Verbinde..." : "Anmelden"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ─── Dashboard ─── */
  return (
    <div className="min-h-screen bg-[#f8f9fd]">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#e0e5f0] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A2540] to-[#0D3068] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h1 className="font-[Syne] font-bold text-lg text-[#060c1a]">Lead-Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/subscribers"
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#3a4a6b] hover:bg-[#0A2540]/5 transition-all"
            >
              Subscribers
            </Link>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#0A2540] bg-[#0A2540]/5 hover:bg-[#0A2540]/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              CSV Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <StatCard label="Gesamt" value={stats.total_leads} accent="#0A2540" />
            <StatCard label="Letzte 7 Tage" value={stats.leads_last_7d} accent="#0ea5e9" />
            <StatCard label="Letzte 30 Tage" value={stats.leads_last_30d} accent="#10b981" />
            <StatCard label="Marketing Opt-in" value={stats.marketing_opted_in} accent="#d97706" />
            <StatCard
              label="Unique Länder"
              value={new Set(leads.map((l) => l.country).filter(Boolean)).size}
              accent="#8b5cf6"
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <select
            value={filterSource}
            onChange={(e) => {
              setFilterSource(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-[#d8dff0] bg-white text-sm text-[#060c1a] focus:outline-none focus:border-[#0A2540]"
          >
            <option value="">Alle Tools</option>
            {Object.entries(SOURCE_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>

          <select
            value={filterBranche}
            onChange={(e) => {
              setFilterBranche(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-[#d8dff0] bg-white text-sm text-[#060c1a] focus:outline-none focus:border-[#0A2540]"
          >
            <option value="">Alle Branchen</option>
            {[
              "IT & Software",
              "Finanzdienstleistungen",
              "Gesundheitswesen",
              "Energie & Versorgung",
              "Produktion & Industrie",
              "Transport & Logistik",
              "Handel & E-Commerce",
              "Öffentliche Verwaltung",
              "Telekommunikation",
              "Beratung & Dienstleistung",
              "Bildung & Forschung",
              "Sonstige",
            ].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <select
            value={filterCountry}
            onChange={(e) => {
              setFilterCountry(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg border border-[#d8dff0] bg-white text-sm text-[#060c1a] focus:outline-none focus:border-[#0A2540]"
          >
            <option value="">Alle Länder</option>
            {Object.entries(COUNTRY_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>

          <span className="text-[13px] text-[#7a8db0] ml-auto">
            {total} Lead{total !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[#d8dff0] bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8f9fd] border-b border-[#e0e5f0]">
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">E-Mail</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider hidden sm:table-cell">Name</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider hidden md:table-cell">Unternehmen</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">Tool</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider hidden md:table-cell">Land</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider hidden lg:table-cell">Branche</th>
                  <th className="text-left px-4 py-3 font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">Datum</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-[#7a8db0] text-sm">
                      Noch keine Leads vorhanden.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="border-b border-[#f0f2f8] hover:bg-[#f8f9fd] cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-[#060c1a]">{lead.email}</span>
                      </td>
                      <td className="px-4 py-3 text-[#3a4a6b] hidden sm:table-cell">
                        {lead.contact_name ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-[#3a4a6b] hidden md:table-cell">
                        {lead.company_name ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        {lead.source_tool && (
                          <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#0A2540]/8 text-[#0A2540]">
                            {SOURCE_LABELS[lead.source_tool] ?? lead.source_tool}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#3a4a6b] hidden md:table-cell">
                        {lead.country ? COUNTRY_LABELS[lead.country] ?? lead.country : "—"}
                      </td>
                      <td className="px-4 py-3 text-[#3a4a6b] hidden lg:table-cell">
                        {lead.branche ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-[#7a8db0] whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("de-AT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#e0e5f0]">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#3a4a6b] hover:bg-[#f0f2f8] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Zurück
              </button>
              <span className="text-[13px] text-[#7a8db0]">
                Seite {page} von {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#3a4a6b] hover:bg-[#f0f2f8] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Weiter →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-[#d8dff0] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0e5f0]">
                <h2 className="font-[Syne] font-bold text-lg text-[#060c1a]">Lead-Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#f0f2f8] transition-all"
                >
                  <svg className="w-4 h-4 text-[#7a8db0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-5 space-y-4">
                <DetailSection title="Kontakt">
                  <DetailRow label="E-Mail" value={selectedLead.email} />
                  <DetailRow label="Name" value={selectedLead.contact_name} />
                  <DetailRow label="Unternehmen" value={selectedLead.company_name} />
                  <DetailRow label="Telefon" value={selectedLead.phone} />
                </DetailSection>

                <DetailSection title="Unternehmen">
                  <DetailRow label="Land" value={selectedLead.country ? COUNTRY_LABELS[selectedLead.country] ?? selectedLead.country : null} />
                  <DetailRow label="Größe" value={selectedLead.company_size ? SIZE_LABELS[selectedLead.company_size] ?? selectedLead.company_size : null} />
                  <DetailRow label="Branche" value={selectedLead.branche} />
                </DetailSection>

                <DetailSection title="Quelle">
                  <DetailRow label="Tool" value={selectedLead.source_tool ? SOURCE_LABELS[selectedLead.source_tool] ?? selectedLead.source_tool : null} />
                  <DetailRow label="Seite" value={selectedLead.source_page} />
                  <DetailRow label="UTM Source" value={selectedLead.utm_source} />
                  <DetailRow label="UTM Medium" value={selectedLead.utm_medium} />
                  <DetailRow label="UTM Campaign" value={selectedLead.utm_campaign} />
                </DetailSection>

                <DetailSection title="Einwilligungen">
                  <DetailRow label="DSGVO" value={selectedLead.gdpr_consent ? "✅ Ja" : "❌ Nein"} />
                  <DetailRow label="Marketing" value={selectedLead.marketing_consent ? "✅ Ja" : "❌ Nein"} />
                  <DetailRow label="Double Opt-in" value={selectedLead.opt_in_confirmed ? "✅ Bestätigt" : "⏳ Ausstehend"} />
                </DetailSection>

                <DetailSection title="Metadaten">
                  <DetailRow label="Land" value={selectedLead.ip_country} />
                  <DetailRow
                    label="Erstellt"
                    value={new Date(selectedLead.created_at).toLocaleString("de-AT")}
                  />
                </DetailSection>

                {selectedLead.tool_results && (
                  <DetailSection title="Tool-Ergebnisse">
                    <pre className="text-[12px] text-[#3a4a6b] bg-[#f8f9fd] rounded-lg p-3 overflow-x-auto font-mono leading-relaxed">
                      {JSON.stringify(selectedLead.tool_results, null, 2)}
                    </pre>
                  </DetailSection>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-[#d8dff0] bg-white p-4">
      <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="font-[Syne] font-extrabold text-2xl" style={{ color: accent }}>
        {value.toLocaleString("de-AT")}
      </div>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-2">
        {title}
      </div>
      <div className="rounded-lg bg-[#f8f9fd] border border-[#e8ecf4] p-3 space-y-1.5">
        {children}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[12px] text-[#7a8db0] flex-shrink-0">{label}</span>
      <span className="text-[13px] text-[#060c1a] text-right break-all">{value}</span>
    </div>
  );
}
