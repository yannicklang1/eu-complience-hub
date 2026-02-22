"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/i18n/use-translations";

/**
 * Floating "Back to Top" button — appears after scrolling 600px.
 * Smooth scrolls to top. Positioned above cookie banner / adblock overlay.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslations();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      data-back-to-top=""
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("a11y.backToTop")}
      className="fixed bottom-24 right-6 z-[80] w-11 h-11 rounded-full bg-[#0A2540]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#0A2540] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
}
