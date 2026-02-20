"use client";

import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function CookieConsent() {
  const { consent, loaded, acceptAll, acceptNecessary } = useCookieConsent();

  // Don't render until loaded from localStorage, and hide if already decided
  if (!loaded || consent !== null) return null;

  return (
    <div role="dialog" aria-label="Cookie-Einstellungen" className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 animate-slide-up-sm">
      <div
        className="max-w-2xl mx-auto rounded-2xl border border-white/[0.08] p-6 sm:p-7 shadow-2xl"
        style={{
          background: "rgba(6, 12, 26, 0.95)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A2540, #0D3068)" }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#FACC15" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="font-[Syne] font-bold text-white text-sm">
            Datenschutz-Einstellungen
          </h3>
        </div>

        {/* Text */}
        <p className="text-[13px] text-white/45 leading-relaxed mb-5">
          Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer
          Website zu bieten. Technisch notwendige Cookies gewährleisten den
          Betrieb. Analyse-Cookies helfen uns, die Website zu verbessern.{" "}
          <Link href="/datenschutz" className="text-[#FACC15]/80 hover:text-[#FACC15] underline underline-offset-2 transition-colors">
            Mehr erfahren
          </Link>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={acceptNecessary}
            className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-sm font-medium transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 hover:text-white"
          >
            Nur notwendige
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 px-5 py-3 rounded-xl text-sm font-[Syne] font-bold text-[#0A2540] transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              boxShadow: "0 4px 16px rgba(250,204,21,0.2)",
            }}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
