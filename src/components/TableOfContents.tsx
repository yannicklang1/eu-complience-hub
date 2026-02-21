"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface TocItem {
  id: string;
  label: string;
}

export default function TableOfContents({
  items,
  accent = "#0A2540",
}: {
  items: TocItem[];
  accent?: string;
}) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Scrollspy — track which section is in view */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <nav aria-label="Inhaltsverzeichnis">
        <div className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase mb-4 text-[#7a8db0]">
          Inhalt
        </div>
        <div className="space-y-1 relative">
          {/* Active indicator line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#e8ecf4]" />

          {items.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-current={isActive ? "true" : undefined}
                className="relative block w-full text-left pl-4 py-1.5 text-[13px] leading-snug transition-all duration-200"
                style={{
                  color: isActive ? accent : "#7a8db0",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="toc-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                    style={{ background: accent }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile: Floating button + dropdown */}
      <div className="lg:hidden fixed bottom-20 right-4 z-[60]">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Inhaltsverzeichnis schließen" : "Inhaltsverzeichnis öffnen"}
          aria-expanded={mobileOpen}
          className="w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: accent,
            boxShadow: `0 8px 24px ${accent}40`,
          }}
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-64 rounded-2xl bg-white border border-[#d8dff0] shadow-2xl shadow-blue-900/10 p-4 overflow-hidden z-[61]"
          >
            <div className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 text-[#7a8db0]">
              Inhalt
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {items.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left px-3 py-2 rounded-lg text-[13px] transition-all duration-200 hover:bg-[#f4f6fc]"
                  style={{
                    color: activeId === id ? accent : "#3a4a6b",
                    fontWeight: activeId === id ? 600 : 400,
                    background: activeId === id ? `${accent}08` : undefined,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
