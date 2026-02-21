"use client";

import Link from "next/link";

export default function VergleichToolError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060c1a] px-6">
      <div className="text-center max-w-lg">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="font-[Syne] font-[800] text-2xl sm:text-3xl text-white mb-4">
          Tool konnte nicht geladen werden
        </h1>
        <p className="text-white/45 text-sm leading-relaxed mb-8">
          Beim Laden dieses Tools ist ein unerwarteter Fehler aufgetreten.
          Bitte versuchen Sie es erneut.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#FACC15] to-[#EAB308] text-[#0A2540] hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200"
          >
            Erneut versuchen
          </button>
          <Link
            href="/tools"
            className="px-6 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:bg-white/5 transition-all duration-200"
          >
            Alle Tools
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
