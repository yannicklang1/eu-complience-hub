"use client";

export default function AuthError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#060c1a] flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <h1 className="font-[Syne] font-extrabold text-xl text-white mb-3">
          Fehler
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 rounded-xl text-sm font-[Syne] font-bold text-[#0A2540]"
          style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)" }}
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  );
}
