"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAdBlockDetect } from "@/hooks/useAdBlockDetect";

/* Pages that should NEVER show the adblock overlay */
const EXEMPT_PATHS = [
  "/",
  "/impressum",
  "/datenschutz",
  "/haftungsausschluss",
];

export default function AdBlockOverlay() {
  const pathname = usePathname();
  const { detected, loaded, dismissCount, dismiss, recheck, shouldShowPaywall } =
    useAdBlockDetect();

  /* Don't render on exempt pages */
  if (EXEMPT_PATHS.includes(pathname)) return null;

  /* Still loading or no adblocker detected */
  if (!loaded || !detected) return null;

  /* ─── Hard Paywall (after 3 dismissals) ─── */
  if (shouldShowPaywall) {
    return (
      <div role="dialog" aria-label="Adblocker-Hinweis" className="fixed inset-0 z-[200] flex items-center justify-center p-6">
        {/* Backdrop with heavy blur */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(4, 10, 24, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md w-full rounded-3xl bg-white p-8 sm:p-10 shadow-2xl text-center"
        >
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0A2540, #0D3068)" }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          <h2 className="font-[Syne] font-extrabold text-xl sm:text-2xl text-[#060c1a] mb-3">
            Adblocker erkannt
          </h2>
          <p className="text-[15px] text-[#5a6a8a] leading-relaxed mb-8">
            Wir finanzieren unsere kostenlosen Compliance-Guides durch Werbung.
            Bitte deaktivieren Sie Ihren Adblocker, um weiterlesen zu können.
          </p>

          {/* CTA */}
          <button
            onClick={recheck}
            className="w-full px-6 py-4 rounded-2xl font-[Syne] font-bold text-[15px] text-[#0A2540] transition-all duration-300 hover:-translate-y-0.5 mb-3"
            style={{
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              boxShadow: "0 4px 20px rgba(250,204,21,0.3)",
            }}
          >
            Adblocker deaktiviert — erneut prüfen
          </button>

          {/* Secondary */}
          <p className="text-[12px] text-[#7a8db0] mt-4 leading-relaxed">
            Alternativ: Premium-Zugang kommt bald.
          </p>
        </motion.div>
      </div>
    );
  }

  /* ─── Soft Overlay (dismissible) ─── */
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
      >
        <div
          className="max-w-2xl mx-auto rounded-2xl border border-white/[0.08] p-6 sm:p-7 shadow-2xl"
          style={{
            background: "rgba(6, 12, 26, 0.95)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0A2540, #0D3068)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="#FACC15"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="font-[Syne] font-bold text-white text-sm">
              Adblocker erkannt
            </h3>
          </div>

          {/* Text */}
          <p className="text-[13px] text-white/45 leading-relaxed mb-4">
            Wir finanzieren diesen kostenlosen Compliance-Guide über Werbung.
            Bitte deaktivieren Sie Ihren Adblocker, damit wir dieses Angebot
            weiterhin kostenlos bereitstellen können.
          </p>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((dismissCount + 1) / 3) * 100}%`,
                  background: "linear-gradient(90deg, #FACC15, #EAB308)",
                }}
              />
            </div>
            <span className="text-[11px] text-white/30 font-mono">
              {3 - dismissCount} verbleibend
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={dismiss}
              className="flex-1 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white/70 text-sm font-medium transition-all duration-200 hover:bg-white/[0.08] hover:border-white/20 hover:text-white"
            >
              Später
            </button>
            <button
              onClick={recheck}
              className="flex-1 px-5 py-3 rounded-xl text-sm font-[Syne] font-bold text-[#0A2540] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #FACC15, #EAB308)",
                boxShadow: "0 4px 16px rgba(250,204,21,0.2)",
              }}
            >
              Adblocker deaktiviert
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
