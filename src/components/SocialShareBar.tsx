"use client";

import { useState, useCallback } from "react";
import { BASE_URL } from "@/lib/constants";
import { useTranslations } from "@/i18n/use-translations";

interface SocialShareBarProps {
  /** Current page path, e.g. "/eu-ai-act" */
  path: string;
  /** Page title for share text */
  title: string;
  /** Accent color for styling */
  accent?: string;
  /** Dark mode for dark-themed pages */
  dark?: boolean;
  /** Custom label instead of "Guide teilen" */
  label?: string;
  /** Custom sublabel */
  sublabel?: string;
}

export default function SocialShareBar({
  path,
  title,
  accent = "#0A2540",
  dark = false,
  label: labelProp,
  sublabel: sublabelProp,
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslations();
  const label = labelProp ?? t("share.label");
  const sublabel = sublabelProp ?? t("share.sublabel");
  const fullUrl = `${BASE_URL}${path}`;
  const shareText = `${title} – EU Compliance Hub`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* Fallback for older browsers */
      const textarea = document.createElement("textarea");
      textarea.value = fullUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [fullUrl]);

  const channels = [
    {
      label: t("share.copyLink"),
      labelCopied: t("share.copied"),
      icon: copied ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.342" />
        </svg>
      ),
      onClick: handleCopy,
      isCopied: copied,
    },
    {
      label: t("share.linkedin"),
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    },
    {
      label: t("share.twitter"),
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      label: t("share.email"),
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      href: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${t("share.emailBody")}\n\n${title}\n${fullUrl}`)}`,
    },
  ];

  return (
    <div
      className={`mt-12 mb-8 rounded-2xl border p-6 sm:p-8 ${
        dark
          ? "border-white/5 bg-slate-900/40"
          : "border-[#e0e5f0] bg-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: dark ? `${accent}20` : `${accent}12` }}
        >
          <svg
            className="w-4.5 h-4.5"
            style={{ color: dark ? "#FACC15" : accent }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
        </div>
        <div>
          <h3 className={`font-[Syne] font-bold text-[15px] ${dark ? "text-white" : "text-[#0A2540]"}`}>
            {label}
          </h3>
          <p className={`text-[12px] ${dark ? "text-slate-400" : "text-[#7a8db0]"}`}>
            {sublabel}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {channels.map((ch) => {
          const isButton = "onClick" in ch && ch.onClick;
          const isCopied = "isCopied" in ch && ch.isCopied;

          if (isButton) {
            return (
              <button
                key={ch.label}
                onClick={ch.onClick}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: isCopied
                    ? dark ? "rgba(5,150,105,0.15)" : "#ecfdf5"
                    : dark ? "rgba(255,255,255,0.04)" : "#f4f6fc",
                  color: isCopied
                    ? "#059669"
                    : dark ? "#94a3b8" : "#3a4a6b",
                  border: isCopied
                    ? dark ? "1px solid rgba(5,150,105,0.3)" : "1px solid #a7f3d0"
                    : dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
                }}
              >
                {ch.icon}
                <span>{isCopied ? ch.labelCopied : ch.label}</span>
              </button>
            );
          }

          return (
            <a
              key={ch.label}
              href={"href" in ch ? ch.href : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                dark
                  ? "bg-white/[0.04] text-slate-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-slate-300"
                  : "bg-[#f4f6fc] text-[#3a4a6b] hover:bg-[#e8ecf4]"
              }`}
            >
              {ch.icon}
              <span>{ch.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
