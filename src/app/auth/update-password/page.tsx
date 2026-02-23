"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  // Guard: only allow if user arrived via a password-reset email link
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: unknown } }) => {
      if (!user) {
        router.replace("/auth/reset-password");
        return;
      }
      setHasSession(true);
    });
  }, [router]);

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

  // Show nothing while checking session (prevents flash)
  if (hasSession === null) {
    return (
      <div className="min-h-screen bg-[#05090f] flex items-center justify-center">
        <div className="w-5 h-5 border-[1.5px] border-yellow-400/60 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05090f] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-[-40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #FACC15 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[380px] relative z-10">
        {/* Brand */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
              <span className="text-[10px] font-black text-[#0A2540]">EU</span>
            </div>
            <span className="font-[Syne] font-[800] text-[15px] text-white/90 tracking-tight">
              Compliance Hub
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h1 className="text-[13px] font-semibold text-white/70">Neues Passwort setzen</h1>
          </div>

          <div className="p-6">
            {state === "success" ? (
              <div className="text-center py-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-400/[0.08] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-4.5 h-4.5 text-emerald-400/80" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-[13px] font-semibold text-white/70 mb-1.5">Passwort geändert</h3>
                <p className="text-[12px] text-white/30 leading-relaxed">
                  Sie werden zum Portal weitergeleitet…
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-[11px] font-medium text-white/30 mb-1.5 tracking-wide uppercase"
                  >
                    Neues Passwort
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-white/15 outline-none focus:border-yellow-400/40 focus:bg-white/[0.04] transition-all duration-200"
                    placeholder="Mind. 6 Zeichen"
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-[11px] font-medium text-white/30 mb-1.5 tracking-wide uppercase"
                  >
                    Passwort bestätigen
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-white/15 outline-none focus:border-yellow-400/40 focus:bg-white/[0.04] transition-all duration-200"
                    placeholder="Passwort wiederholen"
                    autoComplete="new-password"
                    required
                    minLength={6}
                  />
                </div>

                {error && (
                  <div
                    className="flex items-start gap-2 text-[12px] text-red-400/90 bg-red-400/[0.06] border border-red-400/[0.08] rounded-md px-3 py-2"
                    role="alert"
                  >
                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full mt-1 rounded-md py-2.5 text-[13px] font-semibold text-[#0A2540] disabled:opacity-40 transition-all duration-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)]"
                  style={{
                    background: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)",
                  }}
                >
                  {state === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Wird gespeichert…
                    </span>
                  ) : (
                    "Passwort ändern"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <Link
            href="/datenschutz"
            className="text-[11px] text-white/15 hover:text-white/30 transition-colors"
          >
            Datenschutz
          </Link>
          <span className="text-white/10 text-[11px]">·</span>
          <Link
            href="/impressum"
            className="text-[11px] text-white/15 hover:text-white/30 transition-colors"
          >
            Impressum
          </Link>
        </div>
      </div>
    </div>
  );
}
