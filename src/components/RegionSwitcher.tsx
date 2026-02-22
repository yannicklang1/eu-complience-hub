"use client";

/* ─────────────────── RegionSwitcher ───────────────────
 * Unified Country + Language selector.
 * Replaces the separate LocaleSwitcher + CountryPicker buttons
 * with a single compact trigger that opens a dropdown panel.
 * ─────────────────────────────────────────────────────── */

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LOCALES, LOCALE_NAMES, LOCALE_FLAGS } from "@/i18n/config";
import type { Locale, EUCountryCode } from "@/i18n/config";
import { EU_COUNTRY_CODES, COUNTRY_META } from "@/i18n/country/index";
import { useCountry } from "@/i18n/country-context";

/* ── Localized labels ── */
const LABELS: Record<string, {
  country: string;
  language: string;
  search: string;
  noResults: string;
}> = {
  de: { country: "Land", language: "Sprache", search: "Land suchen…", noResults: "Kein Land gefunden" },
  en: { country: "Country", language: "Language", search: "Search country…", noResults: "No country found" },
  fr: { country: "Pays", language: "Langue", search: "Rechercher…", noResults: "Aucun pays trouvé" },
  es: { country: "País", language: "Idioma", search: "Buscar país…", noResults: "No encontrado" },
  it: { country: "Paese", language: "Lingua", search: "Cerca paese…", noResults: "Nessun paese" },
};

interface RegionSwitcherProps {
  currentLocale: Locale;
  scrolled: boolean;
}

export function RegionSwitcher({ currentLocale, scrolled }: RegionSwitcherProps) {
  const { countryCode, setCountry } = useCountry();
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<"country" | "language">("country");
  const [search, setSearch] = useState("");

  const labels = LABELS[currentLocale] ?? LABELS.en;
  const currentCountryMeta = COUNTRY_META[countryCode];

  /* ── Close on outside click ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* ── Close on Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  /* ── Focus search on country tab ── */
  useEffect(() => {
    if (isOpen && tab === "country") {
      setTimeout(() => searchRef.current?.focus(), 80);
    }
  }, [isOpen, tab]);

  /* ── Handlers ── */
  const switchLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === currentLocale) {
        setIsOpen(false);
        return;
      }
      const segments = pathname.split("/");
      segments[1] = newLocale;
      const newPath = segments.join("/") || `/${newLocale}`;
      setIsOpen(false);
      setSearch("");
      router.push(newPath);
    },
    [currentLocale, pathname, router],
  );

  const selectCountry = useCallback(
    (code: EUCountryCode) => {
      setCountry(code);
      setIsOpen(false);
      setSearch("");
    },
    [setCountry],
  );

  /* ── Filtered countries ── */
  const filtered = EU_COUNTRY_CODES.filter((code) => {
    if (!search) return true;
    const meta = COUNTRY_META[code];
    const q = search.toLowerCase();
    return (
      meta.nameDE.toLowerCase().includes(q) ||
      meta.nameEN.toLowerCase().includes(q) ||
      meta.nameLocal.toLowerCase().includes(q) ||
      code.toLowerCase().includes(q)
    );
  });

  return (
    <div ref={ref} className="relative">
      {/* ── Trigger ── */}
      <button
        onClick={() => { setIsOpen((v) => !v); setTab("country"); }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={`${currentCountryMeta?.nameDE ?? countryCode} · ${LOCALE_NAMES[currentLocale]}`}
        className={[
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
          scrolled
            ? "text-[#3a4a6b] hover:bg-[#0A2540]/[0.06] hover:text-[#0A2540]"
            : "text-white/80 hover:bg-white/[0.1] hover:text-white",
        ].join(" ")}
      >
        <span className="text-base leading-none">{currentCountryMeta?.flag ?? "🇪🇺"}</span>
        <span className="uppercase text-[11px] tracking-wide font-semibold">{currentLocale}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Dropdown Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-[340px] rounded-2xl bg-white border border-gray-200/80 shadow-2xl overflow-hidden z-[100]"
          >
            {/* ── Tabs ── */}
            <div className="flex border-b border-gray-100">
              {(["country", "language"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setSearch(""); }}
                  className={[
                    "flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors",
                    tab === t
                      ? "text-[#0A2540] border-b-2 border-[#d4af37] bg-[#0A2540]/[0.02]"
                      : "text-[#7a8db0] hover:text-[#0A2540] hover:bg-gray-50",
                  ].join(" ")}
                >
                  {t === "country" ? labels.country : labels.language}
                </button>
              ))}
            </div>

            {/* ── Country Tab ── */}
            {tab === "country" && (
              <div>
                {/* Search */}
                <div className="px-3 pt-3 pb-2">
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      ref={searchRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={labels.search}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm text-[#0A2540] placeholder-gray-400 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Grid */}
                <div className="px-3 pb-3 max-h-[280px] overflow-y-auto">
                  {filtered.length === 0 ? (
                    <p className="text-center text-gray-400 py-6 text-sm">{labels.noResults}</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-1">
                      {filtered.map((code) => {
                        const meta = COUNTRY_META[code];
                        const isActive = code === countryCode;
                        const displayName = currentLocale === "de" ? meta.nameDE : meta.nameEN;
                        return (
                          <button
                            key={code}
                            onClick={() => selectCountry(code)}
                            className={[
                              "flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-[13px] transition-all",
                              isActive
                                ? "bg-[#d4af37]/10 text-[#0A2540] font-semibold ring-1 ring-[#d4af37]/30"
                                : "text-[#3a4a6b] hover:bg-gray-50 hover:text-[#0A2540]",
                            ].join(" ")}
                          >
                            <span className="text-base leading-none shrink-0">{meta.flag}</span>
                            <span className="truncate">{displayName}</span>
                            {isActive && (
                              <svg className="w-3 h-3 ml-auto text-[#d4af37] shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Language Tab ── */}
            {tab === "language" && (
              <div className="p-3">
                <div className="space-y-1">
                  {LOCALES.map((locale) => {
                    const isActive = locale === currentLocale;
                    return (
                      <button
                        key={locale}
                        onClick={() => switchLocale(locale)}
                        className={[
                          "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                          isActive
                            ? "bg-[#d4af37]/10 text-[#0A2540] font-semibold ring-1 ring-[#d4af37]/30"
                            : "text-[#3a4a6b] hover:bg-gray-50 hover:text-[#0A2540]",
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
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
