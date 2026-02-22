"use client";

export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#060c1a] flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h2 className="font-[Syne] font-extrabold text-lg text-white mb-2">
          Etwas ist schiefgelaufen
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          {error.message || "Ein unerwarteter Fehler ist aufgetreten."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-[#0A2540] hover:brightness-110 transition-all"
          style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)" }}
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
