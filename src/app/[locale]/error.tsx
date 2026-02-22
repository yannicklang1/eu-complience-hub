"use client";

import Link from "next/link";
import { useTranslations } from "@/i18n/use-translations";

export default function Error({
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
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="font-[Syne] font-[800] text-2xl sm:text-3xl text-white mb-4">
          Ein Fehler ist aufgetreten
        </h1>

        <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Die Seite konnte leider nicht geladen werden. Bitte versuchen Sie es
          erneut oder kehren Sie zur Startseite zurück.
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

        {/* Error digest for debugging */}
        {error.digest && (
          <p className="mt-8 text-[10px] text-white/15 font-mono">
            Fehler-ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
