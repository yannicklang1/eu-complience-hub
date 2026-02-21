"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ── State Machine ── */
type Status = "loading" | "success" | "already" | "error";

interface Result {
  status: Status;
  message: string;
}

/* ── Inner Component (needs Suspense boundary for useSearchParams) ── */
/* eslint-disable react-hooks/set-state-in-effect -- async fetch pattern: setState in effect callback is the standard approach for data fetching */
function UnsubscribeInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [result, setResult] = useState<Result>({
    status: "loading",
    message: "Abmeldung wird verarbeitet\u2026",
  });

  useEffect(() => {
    if (!token || token.length < 32) {
      setResult({
        status: "error",
        message: "Ungültiger Abmelde-Link. Bitte überprüfen Sie den Link in Ihrer E-Mail.",
      });
      return;
    }

    const unsubscribe = async () => {
      try {
        const res = await fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (!res.ok) {
          setResult({
            status: "error",
            message: data.error ?? "Ein Fehler ist aufgetreten.",
          });
          return;
        }

        if (data.message?.includes("bereits")) {
          setResult({ status: "already", message: data.message });
        } else {
          setResult({ status: "success", message: data.message });
        }
      } catch {
        setResult({
          status: "error",
          message: "Verbindungsfehler. Bitte versuchen Sie es erneut.",
        });
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={result.status}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="w-full max-w-lg"
      >
        <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-8 md:p-10 text-center overflow-hidden">
          {/* Ambient glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full pointer-events-none"
            style={{
              background: result.status === "error"
                ? "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(148,163,184,0.10) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Icon */}
          <div className="relative mb-6">
            {result.status === "loading" && <LoadingIcon />}
            {(result.status === "success" || result.status === "already") && <UnsubscribeIcon />}
            {result.status === "error" && <ErrorIcon />}
          </div>

          {/* Title */}
          <h1 className="relative text-xl md:text-2xl font-bold text-slate-50 mb-3">
            {result.status === "loading" && "Abmeldung läuft\u2026"}
            {result.status === "success" && "Erfolgreich abgemeldet"}
            {result.status === "already" && "Bereits abgemeldet"}
            {result.status === "error" && "Abmeldung fehlgeschlagen"}
          </h1>

          {/* Message */}
          <p className="relative text-sm md:text-base text-slate-400 leading-relaxed mb-8">
            {result.message}
          </p>

          {/* Actions */}
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            {(result.status === "success" || result.status === "already") && (
              <>
                <Link
                  href="/fristen-radar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-slate-900 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #EAB308)",
                    boxShadow: "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                  }}
                >
                  Erneut anmelden
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-slate-200 transition-colors"
                >
                  Zur Startseite
                </Link>
              </>
            )}

            {result.status === "error" && (
              <>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-slate-900 transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #EAB308)",
                    boxShadow: "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                  }}
                >
                  Zur Startseite
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-slate-200 transition-colors"
                >
                  Compliance-Report erstellen
                </Link>
              </>
            )}
          </div>

          {/* Retention: What you'll miss — shown on success */}
          {result.status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="relative mt-8 pt-6 border-t border-white/[0.06]"
            >
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Was Sie verpassen werden
              </p>
              <div className="grid gap-3 text-left">
                {[
                  { icon: "\u26A1", text: "Fristen-Warnungen bei kritischen Compliance-Deadlines" },
                  { icon: "\uD83D\uDCCB", text: "Neue Gesetzesänderungen kompakt zusammengefasst" },
                  { icon: "\uD83D\uDEE1\uFE0F", text: "Praxis-Tipps zur Haftungsvermeidung für Geschäftsführer" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-sm flex-shrink-0">{item.icon}</span>
                    <span className="text-xs text-slate-400">{item.text}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 mt-4">
                Sie können sich jederzeit erneut über den{" "}
                <Link href="/fristen-radar" className="text-yellow-400/70 hover:text-yellow-400 transition-colors underline underline-offset-2">
                  Fristen-Radar
                </Link>
                {" "}anmelden.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Status Icons ── */

function LoadingIcon() {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="w-16 h-16 rounded-full border-4 border-slate-600/30 border-t-slate-400"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}

function UnsubscribeIcon() {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
    >
      <div className="w-16 h-16 rounded-full bg-slate-700/30 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <motion.path
            d="M9 16l5 5 9-9"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

function ErrorIcon() {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M11 11l10 10M21 11l-10 10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ── Export with Suspense ── */

export default function UnsubscribeClient() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-8 md:p-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-slate-600/30 border-t-slate-400 animate-spin" />
            </div>
            <h1 className="text-xl font-bold text-slate-50 mb-3">Abmeldung läuft&hellip;</h1>
            <p className="text-sm text-slate-400">Bitte warten Sie einen Moment.</p>
          </div>
        </div>
      }
    >
      <UnsubscribeInner />
    </Suspense>
  );
}
