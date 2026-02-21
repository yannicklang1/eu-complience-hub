"use client";

import { useState } from "react";
import Link from "next/link";
import { useCookieConsent } from "@/hooks/useCookieConsent";

/**
 * DSGVO/TDDDG-compliant cookie consent banner with granular categories.
 *
 * Legal compliance:
 * - DSGVO Art. 6/7 (explicit, freely-given, informed, specific consent)
 * - TKG 2021 §165 Abs. 3 (necessary cookies exempt from consent)
 * - TDDDG §25 (consent for storage access)
 * - EDPB Guidelines 05/2020 (reject equally prominent as accept)
 * - No pre-checked optional categories
 * - No cookie wall — site is accessible without consent
 */
export default function CookieConsent() {
  const { consent, loaded, acceptAll, acceptNecessary, acceptCustom } =
    useCookieConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Don't render until loaded from localStorage, and hide if already decided
  if (!loaded || consent !== null) return null;

  function handleSaveCustom() {
    acceptCustom({ analytics, marketing });
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 animate-slide-up-sm"
    >
      <div
        className="max-w-2xl mx-auto rounded-2xl border border-white/[0.08] p-6 sm:p-7 shadow-2xl"
        style={{
          background: "rgba(6, 12, 26, 0.97)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0A2540, #0D3068)" }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="#FACC15"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h3 className="font-[Syne] font-bold text-white text-sm">
            Datenschutz-Einstellungen
          </h3>
        </div>

        {/* Text */}
        <p className="text-[13px] text-white/45 leading-relaxed mb-5">
          Wir verwenden Cookies und ähnliche Technologien. Technisch notwendige
          Cookies sind für den Betrieb erforderlich (§&nbsp;165 Abs.&nbsp;3 TKG
          2021). Analyse- und Werbe-Cookies setzen wir nur mit Ihrer
          ausdrücklichen Einwilligung.{" "}
          <Link
            href="/datenschutz"
            className="text-[#FACC15]/80 hover:text-[#FACC15] underline underline-offset-2 transition-colors"
          >
            Datenschutzerklärung
          </Link>
        </p>

        {/* ─── Detailed Category Toggles ─── */}
        {showDetails && (
          <div className="mb-5 space-y-3">
            {/* Necessary — always on */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div>
                <div className="text-sm font-semibold text-white/80">
                  Notwendig
                </div>
                <div className="text-[11px] text-white/30 mt-0.5">
                  Betrieb der Website. Kann nicht deaktiviert werden.
                </div>
              </div>
              <div className="relative w-11 h-6 rounded-full bg-emerald-500/30 cursor-not-allowed flex-shrink-0">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-emerald-400 shadow-sm" />
              </div>
            </div>

            {/* Analytics */}
            <div
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06] transition-colors"
              onClick={() => setAnalytics(!analytics)}
            >
              <div>
                <div className="text-sm font-semibold text-white/80">
                  Analyse
                </div>
                <div className="text-[11px] text-white/30 mt-0.5">
                  Anonyme Nutzungsstatistiken zur Verbesserung der Website.
                </div>
              </div>
              <button
                role="switch"
                aria-checked={analytics}
                aria-label="Analyse-Cookies"
                onClick={(e) => {
                  e.stopPropagation();
                  setAnalytics(!analytics);
                }}
                className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 ${
                  analytics ? "bg-[#FACC15]/40" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full shadow-sm transition-all duration-200 ${
                    analytics
                      ? "right-0.5 bg-[#FACC15]"
                      : "left-0.5 bg-white/40"
                  }`}
                />
              </button>
            </div>

            {/* Marketing */}
            <div
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] cursor-pointer hover:bg-white/[0.06] transition-colors"
              onClick={() => setMarketing(!marketing)}
            >
              <div>
                <div className="text-sm font-semibold text-white/80">
                  Werbung
                </div>
                <div className="text-[11px] text-white/30 mt-0.5">
                  Personalisierte Werbung und Anzeigen.
                </div>
              </div>
              <button
                role="switch"
                aria-checked={marketing}
                aria-label="Werbe-Cookies"
                onClick={(e) => {
                  e.stopPropagation();
                  setMarketing(!marketing);
                }}
                className={`relative w-11 h-6 rounded-full flex-shrink-0 transition-colors duration-200 ${
                  marketing ? "bg-[#FACC15]/40" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full shadow-sm transition-all duration-200 ${
                    marketing
                      ? "right-0.5 bg-[#FACC15]"
                      : "left-0.5 bg-white/40"
                  }`}
                />
              </button>
            </div>

            {/* Save custom */}
            <button
              onClick={handleSaveCustom}
              className="w-full px-5 py-3 rounded-xl text-sm font-[Syne] font-bold text-[#0A2540] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #FACC15, #EAB308)",
                boxShadow: "0 4px 16px rgba(250,204,21,0.2)",
              }}
            >
              Auswahl speichern
            </button>
          </div>
        )}

        {/* ─── Main Buttons (shown when details are hidden) ─── */}
        {!showDetails && (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptNecessary}
              className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-sm font-medium transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 hover:text-white"
            >
              Nur notwendige
            </button>
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-sm font-medium transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 hover:text-white"
            >
              Einstellungen
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
        )}
      </div>
    </div>
  );
}
