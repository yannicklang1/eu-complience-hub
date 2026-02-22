"use client";

/* ─────────────────── CountryPicker Modal ─────────────────── */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EUCountryCode } from "@/i18n/config";
import { EU_COUNTRY_CODES, COUNTRY_META } from "@/i18n/country/index";
import { useCountry } from "@/i18n/country-context";

interface CountryPickerProps {
  locale?: string;
  /** If true, shows as modal on first visit */
  autoShow?: boolean;
}

const LABELS: Record<string, {
  title: string;
  subtitle: string;
  search: string;
  confirm: string;
  noResults: string;
}> = {
  de: {
    title: "Ihr Land auswählen",
    subtitle: "Wir zeigen Ihnen länderspezifische Compliance-Informationen, nationale Behörden und Umsetzungsfristen.",
    search: "Land suchen...",
    confirm: "Bestätigen",
    noResults: "Kein Land gefunden",
  },
  en: {
    title: "Select your country",
    subtitle: "We'll show you country-specific compliance information, national authorities and implementation deadlines.",
    search: "Search country...",
    confirm: "Confirm",
    noResults: "No country found",
  },
  fr: {
    title: "Sélectionnez votre pays",
    subtitle: "Nous vous montrerons des informations de conformité spécifiques à votre pays, les autorités nationales et les délais de mise en œuvre.",
    search: "Rechercher un pays...",
    confirm: "Confirmer",
    noResults: "Aucun pays trouvé",
  },
  es: {
    title: "Seleccione su país",
    subtitle: "Le mostraremos información de cumplimiento específica de su país, autoridades nacionales y plazos de implementación.",
    search: "Buscar país...",
    confirm: "Confirmar",
    noResults: "No se encontró ningún país",
  },
  it: {
    title: "Seleziona il tuo paese",
    subtitle: "Ti mostreremo informazioni di conformità specifiche per il tuo paese, autorità nazionali e scadenze di implementazione.",
    search: "Cerca paese...",
    confirm: "Conferma",
    noResults: "Nessun paese trovato",
  },
};

const COUNTRY_SHOWN_KEY = "eu_country_picker_shown";

export function CountryPicker({ locale = "de", autoShow = false }: CountryPickerProps) {
  const { countryCode, setCountry } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<EUCountryCode>(countryCode);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const labels = LABELS[locale] ?? LABELS.en;

  // Auto-show on first visit
  useEffect(() => {
    if (!autoShow) return;
    const shown = sessionStorage.getItem(COUNTRY_SHOWN_KEY);
    if (!shown) {
      setIsOpen(true);
    }
  }, [autoShow]);

  // Sync selected with context
  useEffect(() => {
    setSelected(countryCode);
  }, [countryCode]);

  // Focus search on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filtered = EU_COUNTRY_CODES.filter((code) => {
    const meta = COUNTRY_META[code];
    const q = search.toLowerCase();
    return (
      meta.nameDE.toLowerCase().includes(q) ||
      meta.nameEN.toLowerCase().includes(q) ||
      meta.nameLocal.toLowerCase().includes(q) ||
      code.toLowerCase().includes(q)
    );
  });

  const handleConfirm = () => {
    setCountry(selected);
    sessionStorage.setItem(COUNTRY_SHOWN_KEY, "1");
    setIsOpen(false);
    setSearch("");
  };

  const handleClose = () => {
    sessionStorage.setItem(COUNTRY_SHOWN_KEY, "1");
    setIsOpen(false);
    setSearch("");
  };

  const currentMeta = COUNTRY_META[countryCode];

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        aria-label={`Land wechseln: ${currentMeta?.nameDE ?? countryCode}`}
        title={`Land: ${currentMeta?.nameDE ?? countryCode}`}
      >
        <span className="text-base leading-none">{currentMeta?.flag ?? "🇪🇺"}</span>
        <span className="hidden sm:inline">{currentMeta?.nameDE ?? countryCode}</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-label={labels.title}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-2xl rounded-2xl bg-[#0f1117] border border-white/10 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 pb-4 border-b border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">{labels.title}</h2>
                      <p className="mt-1 text-sm text-white/60">{labels.subtitle}</p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="shrink-0 rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
                      aria-label="Schließen"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="mt-4 relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      ref={searchRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={labels.search}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/30 transition-colors"
                    />
                  </div>
                </div>

                {/* Country Grid */}
                <div className="p-4 max-h-[400px] overflow-y-auto">
                  {filtered.length === 0 ? (
                    <p className="text-center text-white/40 py-8">{labels.noResults}</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {filtered.map((code) => {
                        const meta = COUNTRY_META[code];
                        const isSelected = code === selected;
                        const displayName = locale === "de" ? meta.nameDE : meta.nameEN;
                        return (
                          <button
                            key={code}
                            onClick={() => setSelected(code)}
                            className={[
                              "flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-all",
                              isSelected
                                ? "bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37]"
                                : "bg-white/5 border border-transparent text-white/70 hover:bg-white/10 hover:text-white",
                            ].join(" ")}
                          >
                            <span className="text-lg leading-none">{meta.flag}</span>
                            <span className="truncate font-medium">{displayName}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-4 pt-0 flex justify-end gap-3">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#d4af37] text-black hover:bg-[#b8962e] transition-colors"
                  >
                    {COUNTRY_META[selected]?.flag} {labels.confirm}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
