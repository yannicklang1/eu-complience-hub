"use client";

import { useState } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");

    const supabase = createSupabaseBrowserClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setState("error");
      return;
    }

    setState("success");
  }

  return (
    <div className="min-h-screen bg-[#060c1a] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/de" className="inline-block">
            <h2 className="font-[Syne] font-extrabold text-xl text-white">
              EU Compliance Hub
            </h2>
          </Link>
          <p className="text-sm text-slate-400 mt-2">
            Passwort zurücksetzen
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
          {state === "success" ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">E-Mail gesendet</h3>
              <p className="text-sm text-slate-400 mb-6">
                Wenn ein Konto mit dieser E-Mail existiert, erhalten Sie einen Link zum Zurücksetzen.
              </p>
              <Link
                href="/auth/login"
                className="text-sm text-yellow-400/70 hover:text-yellow-400 transition-colors"
              >
                Zurück zur Anmeldung
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-400 mb-4">
                Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Link zum Zurücksetzen Ihres Passworts.
              </p>

              <div>
                <label htmlFor="reset-email" className="block text-xs font-medium text-slate-400 mb-1.5">
                  E-Mail
                </label>
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-yellow-400/30 transition-colors"
                  placeholder="ihre@email.at"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full rounded-xl py-3.5 text-sm font-[Syne] font-bold text-[#0A2540] disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)" }}
              >
                {state === "loading" ? "Wird gesendet…" : "Link senden"}
              </button>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-xs text-slate-500 hover:text-yellow-400 transition-colors"
                >
                  Zurück zur Anmeldung
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
