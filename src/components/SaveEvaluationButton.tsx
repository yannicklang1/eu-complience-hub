"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* ═══════════════════════════════════════════════════════════
   SaveEvaluationButton — Saves tool results to user account
   Shows login prompt if not authenticated
   ═══════════════════════════════════════════════════════════ */

interface SaveEvaluationButtonProps {
  toolId: string;
  toolName: string;
  inputs: Record<string, unknown>;
  results: Record<string, unknown>;
  summary: string;
  /** Variant: "default" = gold accent, "subtle" = ghost button */
  variant?: "default" | "subtle";
  /** Extra CSS classes */
  className?: string;
}

export default function SaveEvaluationButton({
  toolId,
  toolName,
  inputs,
  results,
  summary,
  variant = "default",
  className = "",
}: SaveEvaluationButtonProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data }: { data: { user: unknown } }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  async function handleSave() {
    if (!isLoggedIn) {
      const currentPath = window.location.pathname;
      router.push(`/auth/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }

    setState("saving");
    setErrorMsg("");

    try {
      const res = await fetch("/api/portal/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool_id: toolId, tool_name: toolName, inputs, results, summary }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.loginRequired) {
          const currentPath = window.location.pathname;
          router.push(`/auth/login?next=${encodeURIComponent(currentPath)}`);
          return;
        }
        throw new Error(data.error ?? "Fehler beim Speichern");
      }

      setState("saved");
      // Reset after 3 seconds so user can save again
      setTimeout(() => setState("idle"), 3000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Verbindungsfehler");
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  }

  // Don't show while still checking auth
  if (isLoggedIn === null) return null;

  const baseStyles =
    variant === "default"
      ? "inline-flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-semibold transition-all duration-200"
      : "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-200";

  if (state === "saved") {
    return (
      <div className={`${baseStyles} text-emerald-400/80 bg-emerald-400/[0.06] border border-emerald-400/[0.08] ${className}`}>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Gespeichert
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={`${baseStyles} text-red-400/80 bg-red-400/[0.06] border border-red-400/[0.08] ${className}`}>
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
        {errorMsg}
      </div>
    );
  }

  if (variant === "default") {
    return (
      <button
        onClick={handleSave}
        disabled={state === "saving"}
        className={`${baseStyles} border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white/90 hover:border-white/[0.15] hover:bg-white/[0.05] disabled:opacity-40 ${className}`}
      >
        {state === "saving" ? (
          <>
            <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Wird gespeichert…
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            {isLoggedIn ? "Im Portal speichern" : "Anmelden & speichern"}
          </>
        )}
      </button>
    );
  }

  // Subtle variant
  return (
    <button
      onClick={handleSave}
      disabled={state === "saving"}
      className={`${baseStyles} text-white/30 hover:text-white/60 hover:bg-white/[0.04] disabled:opacity-40 ${className}`}
    >
      {state === "saving" ? (
        <>
          <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Speichern…
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          {isLoggedIn ? "Speichern" : "Anmelden"}
        </>
      )}
    </button>
  );
}
