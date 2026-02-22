"use client";

import Link from "next/link";

export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060c1a] px-6">
      <div className="text-center max-w-lg">
        {/* Tool Error Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085"
            />
          </svg>
        </div>

        <h1 className="font-[Syne] font-[800] text-2xl sm:text-3xl text-white mb-4">
          Tool konnte nicht geladen werden
        </h1>

        <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Das Compliance-Tool konnte nicht gestartet werden. Bitte versuchen Sie
          es erneut oder wählen Sie ein anderes Tool.
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
            href="/"
            className="px-6 py-3 rounded-xl font-[Syne] font-semibold text-sm text-white/70 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
          >
            Zur Startseite
          </Link>
        </div>

        {/* Quick tool links */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/30 uppercase tracking-widest font-mono mb-4">
            Unsere Tools
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "NIS2-Check", href: "/tools/nis2-betroffenheits-check" },
              { label: "Bußgeld-Rechner", href: "/tools/bussgeld-rechner" },
              { label: "Haftungs-Prüfer", href: "/tools/haftungs-pruefer" },
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
