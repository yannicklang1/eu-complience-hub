"use client";

import { useState, type FormEvent } from "react";

/**
 * Fristen-Radar Signup — compact email form with API integration.
 *
 * Variants:
 * - "hero" (default): white text on dark bg (for homepage hero / dark sections)
 * - "card": dark text on white bg (for embedding in light sections)
 */
export default function FristenRadarSignup({
  variant = "hero",
}: {
  variant?: "hero" | "card";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "fristen-radar",
          source_page: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "Fast geschafft! Bitte bestätigen Sie Ihre E-Mail-Adresse.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } catch {
      setStatus("error");
      setMessage("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
    }
  }

  const isHero = variant === "hero";

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center gap-3 py-4 ${isHero ? "text-white" : "text-[#060c1a]"}`}>
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className={`text-sm font-semibold ${isHero ? "text-white" : "text-[#060c1a]"}`}>
          Fast geschafft!
        </p>
        <p className={`text-sm ${isHero ? "text-white/50" : "text-[#7a8db0]"} max-w-sm`}>
          {message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <form
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="ihre@firma.at"
          required
          className={
            isHero
              ? "flex-1 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/30 focus:bg-white/[0.1] focus:shadow-lg focus:shadow-white/5 transition-all duration-300 backdrop-blur-sm"
              : "flex-1 rounded-2xl border border-[#d8dff0] bg-white px-6 py-4 text-sm text-[#060c1a] placeholder:text-[#7a8db0] outline-none focus:border-[#0A2540]/30 focus:ring-2 focus:ring-[#0A2540]/10 transition-all duration-300"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative rounded-2xl px-7 py-4 font-[Syne] font-bold text-sm text-[#0A2540] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)",
            boxShadow: "0 8px 32px rgba(250,204,21,0.35)",
          }}
        >
          <span className="relative z-10">
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Wird gesendet…
              </span>
            ) : (
              "Anmelden"
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </form>

      {status === "error" && (
        <p className="text-sm text-red-400 mt-3">{message}</p>
      )}

      <p className={`font-mono text-[11px] mt-6 tracking-wide ${isHero ? "text-white/20" : "text-[#7a8db0]/60"}`}>
        Nur bei kritischen Fristen. Max. 3×/Monat. Jederzeit abmeldbar. DSGVO-konform.
      </p>
    </div>
  );
}
