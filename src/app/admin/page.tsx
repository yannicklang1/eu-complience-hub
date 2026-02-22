"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminAuth } from "./AdminAuthProvider";

/* ═══════════════════════════════════════════════════════════
   Admin Overview Page — Combined stats from all dashboards
   ═══════════════════════════════════════════════════════════ */

interface OverviewStats {
  leads: { total: number; last7d: number; last30d: number } | null;
  subscribers: { total: number; active: number; pending: number } | null;
  reports: { total: number; totalDownloads: number } | null;
}

export default function AdminOverviewPage() {
  const { adminKey } = useAdminAuth();
  const [stats, setStats] = useState<OverviewStats>({
    leads: null,
    subscribers: null,
    reports: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const headers = { "x-admin-key": adminKey };

      try {
        const [leadsRes, subsRes, reportsRes] = await Promise.all([
          fetch("/api/leads?page=1&limit=1", { headers }),
          fetch("/api/admin/subscribers?page=1&limit=1", { headers }),
          fetch("/api/admin/reports?page=1&limit=1", { headers }),
        ]);

        if (leadsRes.ok) {
          const data = await leadsRes.json();
          setStats((s) => ({
            ...s,
            leads: {
              total: data.stats?.total_leads ?? 0,
              last7d: data.stats?.leads_last_7d ?? 0,
              last30d: data.stats?.leads_last_30d ?? 0,
            },
          }));
        }

        if (subsRes.ok) {
          const data = await subsRes.json();
          setStats((s) => ({
            ...s,
            subscribers: {
              total: data.stats?.total ?? 0,
              active: data.stats?.active ?? 0,
              pending: data.stats?.pending ?? 0,
            },
          }));
        }

        if (reportsRes.ok) {
          const data = await reportsRes.json();
          setStats((s) => ({
            ...s,
            reports: {
              total: data.stats?.total ?? 0,
              totalDownloads: data.stats?.total_downloads ?? 0,
            },
          }));
        }
      } catch {
        // Stats loading failed — show what we have
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [adminKey]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="font-[Syne] font-extrabold text-2xl text-white">Übersicht</h1>
        <p className="text-sm text-slate-400 mt-1">
          Zusammenfassung aller Admin-Bereiche
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Leads Card */}
          <Link
            href="/admin/leads"
            className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 hover:border-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[Syne] font-bold text-white group-hover:text-yellow-400 transition-colors">
                Leads
              </h2>
              <svg className="w-5 h-5 text-slate-600 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.leads?.total ?? "—"}
            </div>
            <div className="space-y-1 text-[12px] font-mono">
              <div className="text-slate-500">
                Letzte 7 Tage:{" "}
                <span className="text-yellow-400">{stats.leads?.last7d ?? 0}</span>
              </div>
              <div className="text-slate-500">
                Letzte 30 Tage:{" "}
                <span className="text-slate-300">{stats.leads?.last30d ?? 0}</span>
              </div>
            </div>
          </Link>

          {/* Subscribers Card */}
          <Link
            href="/admin/subscribers"
            className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 hover:border-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[Syne] font-bold text-white group-hover:text-yellow-400 transition-colors">
                Subscribers
              </h2>
              <svg className="w-5 h-5 text-slate-600 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.subscribers?.total ?? "—"}
            </div>
            <div className="space-y-1 text-[12px] font-mono">
              <div className="text-slate-500">
                Aktiv:{" "}
                <span className="text-green-400">{stats.subscribers?.active ?? 0}</span>
              </div>
              <div className="text-slate-500">
                Ausstehend:{" "}
                <span className="text-amber-400">{stats.subscribers?.pending ?? 0}</span>
              </div>
            </div>
          </Link>

          {/* Reports Card */}
          <Link
            href="/admin/reports"
            className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 hover:border-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-[Syne] font-bold text-white group-hover:text-yellow-400 transition-colors">
                Reports
              </h2>
              <svg className="w-5 h-5 text-slate-600 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stats.reports?.total ?? "—"}
            </div>
            <div className="space-y-1 text-[12px] font-mono">
              <div className="text-slate-500">
                Downloads gesamt:{" "}
                <span className="text-slate-300">{stats.reports?.totalDownloads ?? 0}</span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
