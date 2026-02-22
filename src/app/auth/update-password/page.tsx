"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");

    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein.");
      setState("error");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein.");
      setState("error");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setState("error");
      return;
    }

    setState("success");
    setTimeout(() => router.replace("/portal"), 2000);
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
          <p className="text-sm text-slate-400 mt-2">Neues Passwort setzen</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
          {state === "success" ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Passwort geändert</h3>
              <p className="text-sm text-slate-400">
                Sie werden zum Portal weitergeleitet…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-xs font-medium text-slate-400 mb-1.5">
                  Neues Passwort
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-yellow-400/30 transition-colors"
                  placeholder="Mind. 6 Zeichen"
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-xs font-medium text-slate-400 mb-1.5">
                  Passwort bestätigen
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-yellow-400/30 transition-colors"
                  placeholder="Passwort wiederholen"
                  autoComplete="new-password"
                  required
                  minLength={6}
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
                {state === "loading" ? "Wird gespeichert…" : "Passwort ändern"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
