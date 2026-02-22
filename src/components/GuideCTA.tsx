"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   GuideCTA — Call-to-action strip for the bottom of guide pages.
   Combines newsletter signup + links to tools + kontakt.
   ══════════════════════════════════════════════════════════════ */

export default function GuideCTA({ accent = "#0A2540" }: { accent?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { t, locale } = useTranslations();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage(t("form.invalidEmail"));
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          commercial_consent: false,
          source: "guide-cta",
          source_page: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? t("form.confirmEmail"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? t("form.error"));
      }
    } catch {
      setStatus("error");
      setMessage(t("form.connectionError"));
    }
  }

  return (
    <div className="mt-12 space-y-4">
      {/* ── Newsletter Signup ── */}
      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{
          background: "white",
          borderColor: `${accent}15`,
          boxShadow: `0 4px 24px ${accent}06`,
        }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}10` }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: accent }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-[Syne] font-bold text-[15px] text-[#0A2540]">
              {t("cta.getBriefing")}
            </h3>
            <p className="text-sm text-[#7a8db0] mt-0.5">
              {t("cta.frequency")}
            </p>
          </div>
        </div>

        {status === "success" ? (
          <div className="flex items-center gap-2 py-2">
            <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <p className="text-sm text-emerald-700 font-medium">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={t("form.emailPlaceholder")}
              aria-label={t("form.emailAriaLabel")}
              required
              className="flex-1 rounded-xl border border-[#d8dff0] bg-[#f8f9fc] px-4 py-2.5 text-sm text-[#0A2540] placeholder:text-[#a0aec0] outline-none focus:border-[#0A2540]/30 focus:ring-2 focus:ring-[#0A2540]/5 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              style={{ background: accent }}
            >
              {status === "loading" ? "..." : t("form.subscribe")}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-red-500 mt-2" role="alert">{message}</p>
        )}

        <p className="text-[11px] text-[#a0aec0] mt-3">
          {t("cta.gdprNotice")}
        </p>
      </div>

      {/* ── Quick Links ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link
          href={`/${locale}/tools`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e0e5f0] bg-white hover:border-[#d0d8ec] transition-colors"
        >
          <span className="text-lg">⚡</span>
          <div>
            <p className="text-sm font-semibold text-[#0A2540] group-hover:text-[#1a365d]">
              {t("cta.tools")}
            </p>
            <p className="text-[11px] text-[#7a8db0]">{t("cta.toolsDesc")}</p>
          </div>
        </Link>
        <Link
          href={`/${locale}/vergleich`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e0e5f0] bg-white hover:border-[#d0d8ec] transition-colors"
        >
          <span className="text-lg">🔀</span>
          <div>
            <p className="text-sm font-semibold text-[#0A2540] group-hover:text-[#1a365d]">
              {t("cta.comparison")}
            </p>
            <p className="text-[11px] text-[#7a8db0]">{t("cta.comparisonDesc")}</p>
          </div>
        </Link>
        <Link
          href={`/${locale}/faq`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e0e5f0] bg-white hover:border-[#d0d8ec] transition-colors"
        >
          <span className="text-lg">❓</span>
          <div>
            <p className="text-sm font-semibold text-[#0A2540] group-hover:text-[#1a365d]">
              {t("cta.faq")}
            </p>
            <p className="text-[11px] text-[#7a8db0]">{t("cta.faqDesc")}</p>
          </div>
        </Link>
        <Link
          href={`/${locale}/kontakt`}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[#e0e5f0] bg-white hover:border-[#d0d8ec] transition-colors"
        >
          <svg className="w-5 h-5 text-[#0A2540] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-[#0A2540] group-hover:text-[#1a365d]">
              {t("cta.report")}
            </p>
            <p className="text-[11px] text-[#7a8db0]">{t("cta.reportDesc")}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
