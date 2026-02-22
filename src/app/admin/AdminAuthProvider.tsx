"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   Admin Auth Context — Shared authentication for all admin dashboards
   ═══════════════════════════════════════════════════════════ */

interface AdminAuthContext {
  adminKey: string;
  isAuthenticated: boolean;
}

const AdminAuthCtx = createContext<AdminAuthContext>({
  adminKey: "",
  isAuthenticated: false,
});

export function useAdminAuth() {
  return useContext(AdminAuthCtx);
}

export default function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!adminKey.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Validate key against any admin API
      const res = await fetch("/api/admin/subscribers?page=1&limit=1", {
        headers: { "x-admin-key": adminKey },
      });

      if (res.status === 401) {
        setError("Ungültiger Admin-Key.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(`Fehler: ${res.status}`);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060c1a] flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/5 bg-slate-900/60 p-8"
        >
          <h1 className="font-[Syne] font-extrabold text-xl text-white mb-2">
            Admin-Portal
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            Admin-Key eingeben, um auf das Dashboard zuzugreifen.
          </p>

          <label htmlFor="admin-key" className="block text-xs font-medium text-slate-400 mb-2">
            Admin-Key
          </label>
          <input
            id="admin-key"
            type="password"
            value={adminKey}
            onChange={(e) => {
              setAdminKey(e.target.value);
              if (error) setError("");
            }}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-yellow-400/30 transition-colors"
            placeholder="••••••••"
          />

          {error && (
            <p className="text-sm text-red-400 mt-3" role="alert">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-xl py-3 text-sm font-[Syne] font-bold text-[#0A2540] disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
            }}
          >
            {loading ? "Lade…" : "Anmelden"}
          </button>

          <div className="mt-4 text-center">
            <Link
              href="/de"
              className="text-xs text-slate-500 hover:text-yellow-400 transition-colors"
            >
              Zurück zur Website
            </Link>
          </div>
        </form>
      </div>
    );
  }

  return (
    <AdminAuthCtx.Provider value={{ adminKey, isAuthenticated }}>
      {children}
    </AdminAuthCtx.Provider>
  );
}
