"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* ═══════════════════════════════════════════════════════════
   AuthForm — Login / Register with Email + OAuth (Google, Apple)
   ═══════════════════════════════════════════════════════════ */

type AuthMode = "login" | "register";
type AuthState = "idle" | "loading" | "success" | "error";

const PROVIDER_CONFIG = [
  {
    id: "google" as const,
    label: "Google",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    id: "apple" as const,
    label: "Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
  },
];

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/portal";
  const urlError = searchParams.get("error");

  const [mode, setMode] = useState<AuthMode>("login");
  const [authState, setAuthState] = useState<AuthState>("idle");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const supabase = createSupabaseBrowserClient();

  // Check if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: { user: unknown } }) => {
      if (data.user) router.replace(next);
    });
  }, [supabase, router, next]);

  // Show URL error (initial state, not a reactive effect)
  const urlErrorMessage = urlError === "auth_callback_failed"
    ? "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."
    : "";

  /* ── OAuth Sign-In ── */
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

  /* ── Email/Password Submit ── */
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

      setSuccessMessage("Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail-Adresse.");
      setAuthState("success");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login")) {
          setError("Ungültige E-Mail oder Passwort.");
        } else {
          setError(signInError.message);
        }
        setAuthState("error");
        return;
      }

      router.replace(next);
    }
  }

  return (
    <div className="min-h-screen bg-[#060c1a] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/de" className="inline-block">
            <h2 className="font-[Syne] font-extrabold text-xl text-white">
              EU Compliance Hub
            </h2>
          </Link>
          <p className="text-sm text-slate-400 mt-2">
            {mode === "login"
              ? "Melden Sie sich an, um auf Ihre Reports zuzugreifen."
              : "Erstellen Sie ein Konto, um Ihre Reports zu verwalten."}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
          {/* Tab Toggle */}
          <div className="flex rounded-xl bg-white/5 p-1 mb-6">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError("");
                  setSuccessMessage("");
                  setAuthState("idle");
                }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  mode === m
                    ? "bg-yellow-400 text-[#0A2540] shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {m === "login" ? "Anmelden" : "Registrieren"}
              </button>
            ))}
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            {PROVIDER_CONFIG.map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleOAuth(provider.id)}
                disabled={authState === "loading"}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-50 transition-colors"
              >
                {provider.icon}
                <span>
                  Mit {provider.label} {mode === "login" ? "anmelden" : "registrieren"}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-500 font-medium">oder</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label htmlFor="full-name" className="block text-xs font-medium text-slate-400 mb-1.5">
                  Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-yellow-400/30 transition-colors"
                  placeholder="Max Mustermann"
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-400 mb-1.5">
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-yellow-400/30 transition-colors"
                placeholder="ihre@email.at"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-medium text-slate-400">
                  Passwort
                </label>
                {mode === "login" && (
                  <Link
                    href="/auth/reset-password"
                    className="text-xs text-yellow-400/70 hover:text-yellow-400 transition-colors"
                  >
                    Passwort vergessen?
                  </Link>
                )}
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-yellow-400/30 transition-colors"
                placeholder={mode === "register" ? "Mind. 6 Zeichen" : "••••••••"}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                required
                minLength={6}
              />
            </div>

            {/* Error */}
            {(error || urlErrorMessage) && (
              <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2" role="alert">
                {error || urlErrorMessage}
              </p>
            )}

            {/* Success */}
            {successMessage && (
              <p className="text-sm text-green-400 bg-green-400/10 rounded-lg px-3 py-2" role="alert">
                {successMessage}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={authState === "loading"}
              className="w-full rounded-xl py-3.5 text-sm font-[Syne] font-bold text-[#0A2540] disabled:opacity-50 transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #FACC15, #EAB308)",
              }}
            >
              {authState === "loading"
                ? "Wird geladen…"
                : mode === "login"
                  ? "Anmelden"
                  : "Konto erstellen"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          {mode === "login"
            ? "Noch kein Konto? "
            : "Bereits ein Konto? "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError("");
              setSuccessMessage("");
            }}
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            {mode === "login" ? "Jetzt registrieren" : "Jetzt anmelden"}
          </button>
        </p>

        <p className="text-center text-xs text-slate-600 mt-4">
          <Link href="/de/datenschutz" className="hover:text-slate-400 transition-colors">
            Datenschutz
          </Link>
          {" · "}
          <Link href="/de/impressum" className="hover:text-slate-400 transition-colors">
            Impressum
          </Link>
        </p>
      </div>
    </div>
  );
}
