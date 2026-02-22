"use client";

import Link from "next/link";
import { useTranslations } from "@/i18n/use-translations";

export default function FristenRadarError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useTranslations();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060c1a] px-6">
      <div className="text-center max-w-lg">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="font-[Syne] font-[800] text-2xl sm:text-3xl text-white mb-4">
          Fristen-Radar nicht verfügbar
        </h1>

        <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Der Fristen-Radar konnte nicht geladen werden. Bitte versuchen Sie
          es erneut.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl font-[Syne] font-bold text-sm text-[#0A2540] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              boxShadow: "0 4px 16px rgba(250,204,21,0.3)",
            }}
          >
            Erneut versuchen
          </button>
          <Link
            href={`/${locale}`}
            className="px-6 py-3 rounded-xl font-[Syne] font-semibold text-sm text-white/70 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
          >
            Zur Startseite
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-[10px] text-white/15 font-mono">
            Fehler-ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
