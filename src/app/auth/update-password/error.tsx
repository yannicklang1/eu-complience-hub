"use client";

import Link from "next/link";

export default function UpdatePasswordError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#05090f] flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <div className="w-10 h-10 rounded-lg bg-red-400/[0.08] flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-red-400/80" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="text-[15px] font-semibold text-white/70 mb-1.5">Fehler</h1>
        <p className="text-[13px] text-white/30 mb-6 leading-relaxed">
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-md text-[13px] font-semibold text-[#0A2540] hover:shadow-[0_0_20px_rgba(250,204,21,0.12)] transition-all duration-200"
            style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)" }}
          >
            Erneut versuchen
          </button>
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-md text-[13px] font-medium text-white/40 border border-white/[0.08] hover:text-white/60 hover:border-white/[0.15] transition-all duration-200"
          >
            Zur Anmeldung
          </Link>
        </div>
      </div>
    </div>
  );
}
