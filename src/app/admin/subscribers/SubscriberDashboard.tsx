"use client";

import { useState, useEffect, useCallback } from "react";
import { useAdminAuth } from "../AdminAuthProvider";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface Subscriber {
  id: string;
  email: string;
  status: "active" | "pending" | "unsubscribed";
  source: string | null;
  source_page: string | null;
  commercial_consent: boolean;
  created_at: string;
  opt_in_confirmed_at: string | null;
  unsubscribed_at: string | null;
}

interface Stats {
  total: number;
  active: number;
  pending: number;
  unsubscribed: number;
  commercial_opt_in: number;
}

interface ApiResponse {
  subscribers: Subscriber[];
  total: number;
  page: number;
  limit: number;
  stats: Stats | null;
}


/* ═══════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════ */

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Aktiv", color: "#059669", bg: "rgba(5,150,105,0.12)" },
  pending: { label: "Ausstehend", color: "#d97706", bg: "rgba(217,119,6,0.12)" },
  unsubscribed: { label: "Abgemeldet", color: "#dc2626", bg: "rgba(220,38,38,0.12)" },
};

const ITEMS_PER_PAGE = 25;

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function SubscriberDashboard() {
  const { adminKey } = useAdminAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const fetchSubscribers = useCallback(
    async (p: number, status: string) => {
      try {
        const params = new URLSearchParams({
          page: p.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });
        if (status) params.set("status", status);

        const res = await fetch(`/api/admin/subscribers?${params.toString()}`, {
          headers: { "x-admin-key": adminKey },
        });

        if (!res.ok) return;

        const data: ApiResponse = await res.json();
        setSubscribers(data.subscribers);
        setTotal(data.total ?? 0);
        setStats(data.stats ?? null);
      } catch {
        // silent
      }
    },
    [adminKey],
  );

  useEffect(() => {
    // Data fetching on filter/page change — setState in callback is intentional
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSubscribers(page, filterStatus);
  }, [page, filterStatus, fetchSubscribers]);

  function exportCSV() {
    if (subscribers.length === 0) return;

    const headers = ["E-Mail", "Status", "Quelle", "Commercial Consent", "Erstellt", "Bestätigt", "Abgemeldet"];
    const rows = subscribers.map((s) => [
      s.email,
      s.status,
      s.source ?? "",
      s.commercial_consent ? "Ja" : "Nein",
      new Date(s.created_at).toLocaleDateString("de-AT"),
      s.opt_in_confirmed_at ? new Date(s.opt_in_confirmed_at).toLocaleDateString("de-AT") : "",
      s.unsubscribed_at ? new Date(s.unsubscribed_at).toLocaleDateString("de-AT") : "",
    ]);

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Dashboard ── */
  return (
    <div className="bg-[#060c1a] p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-[Syne] font-extrabold text-2xl text-white">
              Subscriber-Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Newsletter-Abonnenten verwalten
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#0A2540] bg-yellow-400 hover:bg-yellow-300 transition-colors"
            >
              CSV Export
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {[
              { label: "Gesamt", value: stats.total, color: "#94a3b8" },
              { label: "Aktiv", value: stats.active, color: "#059669" },
              { label: "Ausstehend", value: stats.pending, color: "#d97706" },
              { label: "Abgemeldet", value: stats.unsubscribed, color: "#dc2626" },
              { label: "Commercial Opt-in", value: stats.commercial_opt_in, color: "#FACC15" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/5 bg-slate-900/40 p-4"
              >
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] font-mono mt-1" style={{ color: s.color }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
            aria-label="Status filtern"
            className="rounded-xl border border-white/10 bg-white/5 text-sm text-white px-4 py-2 outline-none"
          >
            <option value="">Alle Status</option>
            <option value="active">Aktiv</option>
            <option value="pending">Ausstehend</option>
            <option value="unsubscribed">Abgemeldet</option>
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
                    E-Mail
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase hidden sm:table-cell">
                    Quelle
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase hidden md:table-cell">
                    Commercial
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase">
                    Erstellt
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-mono font-semibold text-slate-500 tracking-wider uppercase hidden lg:table-cell">
                    Bestätigt
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => {
                  const statusInfo = STATUS_LABELS[s.status] ?? STATUS_LABELS.pending;
                  return (
                    <tr
                      key={s.id}
                      className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-white/80 font-mono text-[13px]">
                        {s.email}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                          style={{ color: statusInfo.color, background: statusInfo.bg }}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[12px] hidden sm:table-cell">
                        {s.source ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[12px] hidden md:table-cell">
                        {s.commercial_consent ? (
                          <span className="text-yellow-400">Ja</span>
                        ) : (
                          <span className="text-slate-600">Nein</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-[12px] font-mono">
                        {new Date(s.created_at).toLocaleDateString("de-AT", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-[12px] font-mono hidden lg:table-cell">
                        {s.opt_in_confirmed_at
                          ? new Date(s.opt_in_confirmed_at).toLocaleDateString("de-AT", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : "—"}
                      </td>
                    </tr>
                  );
                })}

                {subscribers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                      Keine Subscriber gefunden.
                    </td>
                  </tr>
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
    </div>
  );
}
