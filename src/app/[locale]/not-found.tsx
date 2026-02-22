"use client";

import Link from "next/link";
import { useTranslations } from "@/i18n/use-translations";

export default function NotFound() {
  const { locale } = useTranslations();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060c1a] px-6">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <div
          className="font-[Syne] font-[800] text-[120px] sm:text-[160px] leading-none mb-4"
          style={{
            background: "linear-gradient(135deg, #FACC15, #EAB308)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: 0.3,
          }}
        >
          404
        </div>

        <h1 className="font-[Syne] font-[800] text-2xl sm:text-3xl text-white mb-4">
          Seite nicht gefunden
        </h1>

        <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
          Nutzen Sie unsere Navigation, um die gewünschte Regulierung zu finden.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="px-6 py-3 rounded-xl font-[Syne] font-bold text-sm text-[#0A2540] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              boxShadow: "0 4px 16px rgba(250,204,21,0.3)",
            }}
          >
            Zur Startseite
          </Link>
          <Link
            href={`/${locale}/fristen-radar`}
            className="px-6 py-3 rounded-xl font-[Syne] font-semibold text-sm text-white/70 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
          >
            Fristen-Radar
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/30 uppercase tracking-widest font-mono mb-4">
            Beliebte Regulierungen
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "NISG 2026", href: `/${locale}/nisg-2026` },
              { label: "AI Act", href: `/${locale}/eu-ai-act` },
              { label: "DORA", href: `/${locale}/dora` },
              { label: "DSGVO", href: `/${locale}/dsgvo` },
              { label: "CRA", href: `/${locale}/cra` },
              { label: "CSRD/ESG", href: `/${locale}/csrd-esg` },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-xs text-white/50 border border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:text-white/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <p className="text-[11px] text-white/30 uppercase tracking-widest font-mono mb-4 mt-6">
            Interaktive Tools
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "Regulierung-Finder", href: `/${locale}/tools/regulierung-finder` },
              { label: "Compliance-Checkliste", href: `/${locale}/tools/compliance-checkliste` },
              { label: "Alle Tools", href: `/${locale}/tools` },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-lg text-xs text-yellow-400/50 border border-yellow-400/10 bg-yellow-400/[0.03] hover:border-yellow-400/25 hover:text-yellow-400/80 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
