"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ══════════════════════════════════════════════════════════════
   ReportSuccess — Shown after LemonSqueezy payment redirect
   ══════════════════════════════════════════════════════════════ */

export default function ReportSuccess() {
  const params = useSearchParams();
  const token = params.get("token");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full text-center py-20"
        >
          {/* Animated check */}
          <motion.div
            className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
          >
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d="M12 20l6 6 10-10"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.svg>
          </motion.div>

          <h1 className="font-[Syne] font-extrabold text-3xl text-white mb-4">
            Zahlung erfolgreich!
          </h1>

          <p className="text-slate-400 text-base leading-relaxed mb-3">
            Ihr personalisierter Compliance-Report wird jetzt erstellt.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Sie erhalten den vollst{"\u00E4"}ndigen PDF-Report in wenigen Minuten per E-Mail.
            Alternativ finden Sie ihn in Ihrem Portal.
          </p>

          {/* Status indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/10 border border-emerald-400/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-400">
              Report wird generiert...
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/portal"
              className="px-8 py-3 rounded-xl font-bold text-sm text-slate-900"
              style={{
                background: "linear-gradient(135deg, #FACC15, #EAB308)",
                boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
              }}
            >
              Zum Portal
            </Link>
            <Link
              href="/de/tools"
              className="px-8 py-3 rounded-xl border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/[0.04] transition-all"
            >
              Alle Tools entdecken
            </Link>
          </div>

          {/* Token info */}
          {token && (
            <p className="text-[11px] text-slate-600 mt-8">
              Report-Referenz: {token.slice(0, 8)}...
            </p>
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
