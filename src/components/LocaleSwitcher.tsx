"use client";

/* ─────────────────── LocaleSwitcher ─────────────────── */

import { useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LOCALES, LOCALE_NAMES, LOCALE_FLAGS } from "@/i18n/config";
import type { Locale } from "@/i18n/config";

interface LocaleSwitcherProps {
  currentLocale: Locale;
  scrolled?: boolean;
}

export function LocaleSwitcher({ currentLocale, scrolled = false }: LocaleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const switchLocale = (newLocale: Locale) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    // Replace current locale segment in pathname
    const segments = pathname.split("/");
    // segments[0] = "", segments[1] = currentLocale, segments[2..] = rest
    segments[1] = newLocale;
    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
  };

  const flag = LOCALE_FLAGS[currentLocale];
  const name = LOCALE_NAMES[currentLocale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Sprache: ${name}`}
        className={[
          "flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors",
          scrolled
            ? "text-[#3a4a6b] hover:bg-[#0A2540]/[0.04] hover:text-[#0A2540]"
            : "text-white/80 hover:bg-white/10 hover:text-white",
        ].join(" ")}
      >
        <span className="text-base leading-none">{flag}</span>
        <span className="hidden sm:inline uppercase text-xs tracking-wide">{currentLocale}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            aria-label="Sprache auswählen"
            className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl bg-white border border-gray-200 shadow-xl overflow-hidden z-[100]"
          >
            {LOCALES.map((locale) => {
              const isActive = locale === currentLocale;
              return (
                <li key={locale} role="option" aria-selected={isActive}>
                  <button
                    onClick={() => switchLocale(locale)}
                    className={[
                      "flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm transition-colors text-left",
                      isActive
                        ? "bg-[#0A2540]/[0.06] text-[#0A2540] font-semibold"
                        : "text-[#3a4a6b] hover:bg-[#0A2540]/[0.04] hover:text-[#0A2540]",
                    ].join(" ")}
                  >
                    <span className="text-base leading-none">{LOCALE_FLAGS[locale]}</span>
                    <span>{LOCALE_NAMES[locale]}</span>
                    {isActive && (
                      <svg className="w-3.5 h-3.5 ml-auto text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
