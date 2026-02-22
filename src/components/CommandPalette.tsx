"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/i18n/use-translations";

/* ══════════════════════════════════════════════════════════════
   CommandPalette — Cmd+K global search overlay
   ══════════════════════════════════════════════════════════════ */

interface SearchItem {
  label: string;
  href: string;
  description: string;
  category: string;
  keywords?: string[];
}

const SEARCH_INDEX: SearchItem[] = [
  /* ── Regulierungen ── */
  { label: "NISG 2026", href: "/nisg-2026", description: "NIS2-Umsetzung in Österreich – Cybersicherheit", category: "Regulierungen", keywords: ["nis2", "cyber", "sicherheit", "netz"] },
  { label: "EU AI Act", href: "/eu-ai-act", description: "Europäisches KI-Gesetz", category: "Regulierungen", keywords: ["ki", "künstliche intelligenz", "ai", "hochrisiko"] },
  { label: "DORA", href: "/dora", description: "Digitale Resilienz im Finanzsektor", category: "Regulierungen", keywords: ["finanz", "bank", "resilienz", "ikt"] },
  { label: "CRA", href: "/cra", description: "Cyber Resilience Act – Digitale Produkte", category: "Regulierungen", keywords: ["produkt", "software", "iot", "sbom"] },
  { label: "DSGVO", href: "/dsgvo", description: "Datenschutz-Grundverordnung", category: "Regulierungen", keywords: ["datenschutz", "daten", "privacy", "gdpr"] },
  { label: "CSRD / ESG", href: "/csrd-esg", description: "Nachhaltigkeitsberichterstattung", category: "Regulierungen", keywords: ["nachhaltigkeit", "esg", "bericht", "esrs"] },
  { label: "BaFG", href: "/bafg", description: "Barrierefreiheit für digitale Produkte", category: "Regulierungen", keywords: ["barriere", "wcag", "accessibility", "eaa"] },
  { label: "HSchG", href: "/hschg", description: "Hinweisgeberschutz", category: "Regulierungen", keywords: ["whistleblower", "melde", "hinweis"] },
  { label: "GF-Haftung", href: "/haftungs-check", description: "Geschäftsführer-Haftung bei Compliance-Verstößen", category: "Regulierungen", keywords: ["haftung", "geschäftsführer", "persönlich"] },
  { label: "Green Claims", href: "/green-claims", description: "Anti-Greenwashing-Richtlinie", category: "Regulierungen", keywords: ["green", "umwelt", "klima", "greenwashing"] },
  { label: "MiCA", href: "/mica", description: "Krypto-Assets und Stablecoins", category: "Regulierungen", keywords: ["krypto", "bitcoin", "crypto", "stablecoin"] },
  { label: "Produkthaftung (PLD)", href: "/produkthaftung", description: "Neue EU-Produkthaftungsrichtlinie", category: "Regulierungen", keywords: ["produkt", "haftung", "software", "schaden"] },
  { label: "Digitaler Produktpass", href: "/digitaler-produktpass", description: "DPP / ESPR – Nachhaltigkeit entlang der Wertschöpfungskette", category: "Regulierungen", keywords: ["dpp", "batterie", "textil", "pass"] },
  { label: "DSA", href: "/dsa", description: "Digital Services Act – Plattformregulierung", category: "Regulierungen", keywords: ["plattform", "online", "dienste", "digital"] },
  { label: "Data Act", href: "/data-act", description: "IoT-Daten und Cloud-Switching", category: "Regulierungen", keywords: ["iot", "cloud", "daten", "switching"] },
  { label: "ePrivacy", href: "/eprivacy", description: "Cookie-Regulierung und Tracking", category: "Regulierungen", keywords: ["cookie", "tracking", "kommunikation", "email"] },
  { label: "eIDAS 2.0", href: "/eidas", description: "EU Digital Identity Wallet", category: "Regulierungen", keywords: ["identität", "wallet", "signatur", "ausweis"] },
  { label: "EHDS", href: "/ehds", description: "European Health Data Space", category: "Regulierungen", keywords: ["gesundheit", "health", "patient", "medizin"] },

  /* ── Tools ── */
  { label: "Regulierung-Finder", href: "/tools/regulierung-finder", description: "Welche EU-Gesetze betreffen Sie?", category: "Tools", keywords: ["finder", "welche", "betroffen", "quiz"] },
  { label: "NIS2-Betroffenheits-Check", href: "/tools/nis2-betroffenheits-check", description: "Sind Sie von NIS2 betroffen?", category: "Tools", keywords: ["nis2", "check", "betroffen"] },
  { label: "Compliance-Checkliste", href: "/tools/compliance-checkliste", description: "Interaktive Pflichten-Checkliste", category: "Tools", keywords: ["checkliste", "pflichten", "todo"] },
  { label: "Haftungs-Prüfer", href: "/tools/haftungs-pruefer", description: "Persönliche Haftungsrisiken prüfen", category: "Tools", keywords: ["haftung", "risiko", "geschäftsführer"] },
  { label: "Bußgeld-Rechner", href: "/tools/bussgeld-rechner", description: "Strafrahmen berechnen", category: "Tools", keywords: ["strafe", "bußgeld", "geld", "rechner"] },
  { label: "Kosten-Kalkulator", href: "/tools/kosten-kalkulator", description: "Compliance-Budget planen", category: "Tools", keywords: ["kosten", "budget", "kalkulator", "preis"] },
  { label: "Reifegrad-Check", href: "/tools/reifegrad-check", description: "Compliance-Reifegrad messen", category: "Tools", keywords: ["reife", "maturity", "bewertung"] },
  { label: "Alle Tools", href: "/tools", description: "Übersicht aller interaktiven Tools", category: "Tools", keywords: ["übersicht", "alle"] },

  /* ── Wissen & Referenz ── */
  { label: "Compliance-Glossar", href: "/glossar", description: "70+ Fachbegriffe erklärt", category: "Wissen", keywords: ["glossar", "begriffe", "definition", "lexikon"] },
  { label: "FAQ", href: "/faq", description: "Häufig gestellte Fragen", category: "Wissen", keywords: ["fragen", "antworten", "faq", "hilfe"] },
  { label: "Wissens-Hub", href: "/wissen", description: "Alle Inhalte durchsuchen", category: "Wissen", keywords: ["wissen", "suche", "hub", "übersicht"] },
  { label: "Fristen-Radar", href: "/fristen-radar", description: "Compliance-Deadlines im Blick", category: "Wissen", keywords: ["frist", "deadline", "termin", "radar"] },
  { label: "Compliance-Timeline", href: "/timeline", description: "Alle Fristen 2025–2030", category: "Wissen", keywords: ["timeline", "zeitstrahl", "chronologie"] },
  { label: "Regulierungsvergleich", href: "/vergleich", description: "EU-Regulierungen Seite an Seite", category: "Wissen", keywords: ["vergleich", "matrix", "gegenüber"] },
  { label: "Aktuelles", href: "/aktuelles", description: "News und Updates zur EU-Regulierung", category: "Wissen", keywords: ["news", "aktuell", "neuigkeiten", "update"] },
  { label: "Quellen", href: "/quellen", description: "Amtliche Quellen und Rechtsgrundlagen", category: "Wissen", keywords: ["quelle", "gesetz", "amtsblatt", "eur-lex"] },

  /* ── Branchen ── */
  { label: "Branchen-Compliance", href: "/branchen", description: "Regulierungen nach Branche", category: "Branchen", keywords: ["branche", "industrie", "sektor"] },

  /* ── Info ── */
  { label: "Compliance-Report", href: "/kontakt", description: "Kostenlose Compliance-Analyse für Ihr Unternehmen", category: "Tools", keywords: ["report", "analyse", "pdf", "kontakt", "beratung"] },
  { label: "Newsletter", href: "/newsletter", description: "Compliance-Briefing abonnieren", category: "Info", keywords: ["newsletter", "email", "abonnieren"] },
  { label: "Über uns", href: "/ueber-uns", description: "Team und Mission", category: "Info", keywords: ["über", "team", "mission", "about"] },
];

const CATEGORY_ORDER = ["Regulierungen", "Tools", "Wissen", "Branchen", "Info"];

export default function CommandPalette({ scrolled = false }: { scrolled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t, locale } = useTranslations();

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  /* ── Cmd+K listener ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            setQuery("");
            setActiveIndex(0);
          }
          return !prev;
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* ── Focus input when opening ── */
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  /* ── Filtered results ── */
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);

    return SEARCH_INDEX
      .map((item) => {
        const haystack = [
          item.label,
          item.description,
          item.category,
          ...(item.keywords ?? []),
        ]
          .join(" ")
          .toLowerCase();

        const score = terms.reduce((acc, term) => {
          if (item.label.toLowerCase().includes(term)) return acc + 3;
          if (item.keywords?.some((k) => k.includes(term))) return acc + 2;
          if (haystack.includes(term)) return acc + 1;
          return acc;
        }, 0);

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [query]);

  /* ── Group results by category ── */
  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>();
    for (const item of results) {
      const existing = map.get(item.category) ?? [];
      existing.push(item);
      map.set(item.category, existing);
    }
    return CATEGORY_ORDER
      .filter((cat) => map.has(cat))
      .map((cat) => ({ category: cat, items: map.get(cat)! }));
  }, [results]);

  /* ── Flat list for arrow-key navigation ── */
  const flatResults = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  /* ── Navigate to result ── */
  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(`/${locale}${href}`);
    },
    [router, locale]
  );

  /* ── Keyboard navigation ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && flatResults[activeIndex]) {
        e.preventDefault();
        navigate(flatResults[activeIndex].href);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [flatResults, activeIndex, navigate]
  );

  /* ── Scroll active item into view ── */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      {/* Trigger button (desktop only) */}
      <button
        onClick={openPalette}
        className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] border transition-all cursor-pointer ${
          scrolled
            ? "bg-[#0A2540]/[0.04] border-[#0A2540]/10 text-[#7a8db0] hover:bg-[#0A2540]/[0.08] hover:text-[#3a4a6b]"
            : "bg-white/[0.06] border-white/10 text-slate-400 hover:bg-white/[0.1] hover:text-slate-300"
        }`}
        aria-label={t("search.hint")}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span className="hidden lg:inline">{t("search.placeholder")}</span>
        <kbd className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
          scrolled
            ? "bg-[#0A2540]/[0.04] border-[#0A2540]/10"
            : "bg-white/10 border-white/10"
        }`}>
          ⌘K
        </kbd>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
              className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-xl"
              role="dialog"
              aria-label={t("search.placeholder")}
              aria-modal="true"
            >
              <div className="bg-[#0f1729] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                  <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                    onKeyDown={handleKeyDown}
                    placeholder={t("search.placeholder")}
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <kbd className="px-2 py-1 rounded text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[50vh] overflow-y-auto">
                  {query.trim() === "" && (
                    <div className="px-5 py-8 text-center">
                      <p className="text-sm text-slate-500">
                        {t("search.hint")}
                      </p>
                    </div>
                  )}

                  {query.trim() !== "" && flatResults.length === 0 && (
                    <div className="px-5 py-8 text-center">
                      <p className="text-sm text-slate-500">
                        {t("search.noResults")} &ldquo;{query}&rdquo;
                      </p>
                    </div>
                  )}

                  {grouped.map((group) => {
                    return (
                      <div key={group.category}>
                        <div className="px-5 pt-3 pb-1">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-600">
                            {group.category}
                          </span>
                        </div>
                        {group.items.map((item) => {
                          const globalIndex = flatResults.indexOf(item);
                          const isActive = globalIndex === activeIndex;
                          return (
                            <button
                              key={item.href}
                              data-index={globalIndex}
                              onClick={() => navigate(item.href)}
                              onMouseEnter={() => setActiveIndex(globalIndex)}
                              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors cursor-pointer ${
                                isActive
                                  ? "bg-yellow-400/10"
                                  : "hover:bg-white/[0.03]"
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-semibold truncate ${
                                    isActive ? "text-yellow-400" : "text-slate-200"
                                  }`}
                                >
                                  {item.label}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                  {item.description}
                                </p>
                              </div>
                              {isActive && (
                                <svg className="w-4 h-4 text-yellow-400/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 px-5 py-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10">↓</kbd>
                    <span className="text-[10px] text-slate-600 ml-1">{t("common.next")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10">↵</kbd>
                    <span className="text-[10px] text-slate-600 ml-1">{t("common.readMore")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
