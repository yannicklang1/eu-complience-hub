"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* ═══════════════════════════════════════════════════════════
   AuthForm — Premium Login / Register
   ═══════════════════════════════════════════════════════════ */

type AuthMode = "login" | "register";
type AuthState = "idle" | "loading" | "success" | "error";

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/portal";
  const urlError = searchParams.get("error");

  const [mode, setMode] = useState<AuthMode>("login");
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: { user: unknown } }) => {
      if (data.user) router.replace(next);
    });
  }, [supabase, router, next]);

  const urlErrorMessage =
    urlError === "auth_callback_failed"
      ? "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."
      : "";

  async function handleOAuth(provider: "google" | "apple") {
    setAuthState("loading");
    setError("");
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setAuthState("error");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthState("loading");
    setError("");
    setSuccessMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Bitte alle Felder ausfüllen.");
      setAuthState("error");
      return;
    }
    if (password.length < 6) {
      setError("Passwort muss mindestens 6 Zeichen lang sein.");
      setAuthState("error");
      return;
    }

    if (mode === "register") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      if (signUpError) {
        setError(signUpError.message);
        setAuthState("error");
        return;
      }
      setSuccessMessage(
        "Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail-Adresse.",
      );
      setAuthState("success");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(
          signInError.message.includes("Invalid login")
            ? "Ungültige E-Mail oder Passwort."
            : signInError.message,
        );
        setAuthState("error");
        return;
      }
      router.replace(next);
    }
  }

  const isLoading = authState === "loading";

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
          {/* Tab */}
          <div className="flex border-b border-white/[0.06]">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setSuccessMessage("");
                  setAuthState("idle");
                }}
                className={`flex-1 py-3.5 text-[13px] font-medium transition-all relative ${
                  mode === m
                    ? "text-white"
                    : "text-white/30 hover:text-white/50"
                }`}
              >
                {m === "login" ? "Anmelden" : "Registrieren"}
                {mode === m && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-yellow-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Google OAuth */}
            <button
              onClick={() => handleOAuth("google")}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-white/80 hover:bg-white/[0.06] hover:border-white/[0.12] disabled:opacity-40 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Mit Google fortfahren
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[11px] text-white/20 font-mono uppercase tracking-widest">
                oder
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "register" && (
                <div>
                  <label
                    htmlFor="full-name"
                    className="block text-[11px] font-medium text-white/30 mb-1.5 tracking-wide uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-white/15 outline-none focus:border-yellow-400/40 focus:bg-white/[0.04] transition-all duration-200"
                    placeholder="Max Mustermann"
                    autoComplete="name"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-medium text-white/30 mb-1.5 tracking-wide uppercase"
                >
                  E-Mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-white/15 outline-none focus:border-yellow-400/40 focus:bg-white/[0.04] transition-all duration-200"
                  placeholder="name@unternehmen.at"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-medium text-white/30 tracking-wide uppercase"
                  >
                    Passwort
                  </label>
                  {mode === "login" && (
                    <Link
                      href="/auth/reset-password"
                      className="text-[11px] text-white/20 hover:text-yellow-400/70 transition-colors"
                    >
                      Vergessen?
                    </Link>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-white/15 outline-none focus:border-yellow-400/40 focus:bg-white/[0.04] transition-all duration-200"
                  placeholder={mode === "register" ? "Mind. 6 Zeichen" : "••••••••"}
                  autoComplete={
                    mode === "register" ? "new-password" : "current-password"
                  }
                  required
                  minLength={6}
                />
              </div>

              {/* Error */}
              {(error || urlErrorMessage) && (
                <div
                  className="flex items-start gap-2 text-[12px] text-red-400/90 bg-red-400/[0.06] border border-red-400/[0.08] rounded-md px-3 py-2"
                  role="alert"
                >
                  <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  {error || urlErrorMessage}
                </div>
              )}

              {/* Success */}
              {successMessage && (
                <div
                  className="flex items-start gap-2 text-[12px] text-emerald-400/90 bg-emerald-400/[0.06] border border-emerald-400/[0.08] rounded-md px-3 py-2"
                  role="alert"
                >
                  <svg className="w-3.5 h-3.5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  {successMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-1 rounded-md py-2.5 text-[13px] font-semibold text-[#0A2540] disabled:opacity-40 transition-all duration-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)]"
                style={{
                  background:
                    "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)",
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Wird verarbeitet…
                  </span>
                ) : mode === "login" ? (
                  "Anmelden"
                ) : (
                  "Konto erstellen"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-[12px] text-white/25">
            {mode === "login" ? "Noch kein Konto? " : "Bereits ein Konto? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setSuccessMessage("");
              }}
              className="text-white/40 hover:text-yellow-400/70 transition-colors"
            >
              {mode === "login" ? "Registrieren" : "Anmelden"}
            </button>
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
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
    </div>
  );
}
