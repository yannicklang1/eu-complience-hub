"use client";

import Link from "next/link";
import { useTranslations } from "@/i18n/use-translations";

export default function BranchenError({
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
        {/* Branchen Error Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
            />
          </svg>
        </div>

        <h1 className="font-[Syne] font-[800] text-2xl sm:text-3xl text-white mb-4">
          Brancheninfo nicht verfügbar
        </h1>

        <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Die Brancheninformationen konnten nicht geladen werden. Bitte
          versuchen Sie es erneut oder wählen Sie eine andere Branche.
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
            href={`/${locale}/branchen`}
            className="px-6 py-3 rounded-xl font-[Syne] font-semibold text-sm text-white/70 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
          >
            Alle Branchen
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-[10px] text-white/15 font-mono">
            Fehler-ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
