"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { NavDropdown } from "@/data/navigation";

function BadgeSpan({ badge }: { badge: string }) {
  const cls =
    badge === "Live"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
      : badge === "Update"
      ? "bg-amber-50 text-amber-700 border border-amber-200"
      : "bg-blue-50 text-blue-700 border border-blue-200";
  return (
    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono font-semibold tracking-wide ${cls}`}>
      {badge}
    </span>
  );
}

export default function DropdownMenu({
  dropdown,
  scrolled,
}: {
  dropdown: NavDropdown;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isWide = dropdown.groups.length >= 3;

  /* close on outside click */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${dropdown.label} – Menü ${open ? "schließen" : "öffnen"}`}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-[Syne] font-semibold tracking-[-0.01em] transition-all duration-200 ${
          scrolled
            ? "text-[#3a4a6b] hover:text-[#0A2540] hover:bg-[#0A2540]/[0.04]"
            : "text-white/80 hover:text-white hover:bg-white/[0.08]"
        }`}
      >
        <span>{dropdown.label}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] as const }}
            role="menu"
            className={`absolute top-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-[#0A2540]/[0.08] shadow-[0_12px_40px_rgba(0,30,90,0.12)] z-50 ${
              isWide
                ? "left-1/2 -translate-x-1/2 w-[720px]"
                : "left-1/2 -translate-x-1/2 min-w-[340px]"
            }`}
          >
            {isWide ? (
              /* ── MEGA-MENU: Multi-column layout ── */
              <div className="p-4">
                <div className="grid grid-cols-3 gap-0">
                  {dropdown.groups.map((group, gi) => (
                    <div
                      key={group.id}
                      className={`${gi > 0 ? "border-l border-[#0A2540]/[0.06] pl-3" : ""} ${gi < dropdown.groups.length - 1 ? "pr-3" : ""}`}
                    >
                      {/* Group header with accent line */}
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#0A2540]/[0.06]">
                        <span className="font-mono text-[9px] font-semibold tracking-[0.15em] uppercase text-[#7a8db0]">
                          {group.title}
                        </span>
                        <span className="text-[9px] font-mono text-[#b8c4da]">{group.items.length}</span>
                      </div>

                      {/* Items */}
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all duration-150 hover:bg-[#0A2540]/[0.04] group"
                          >
                            {/* Accent dot */}
                            <div
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: item.accentColor || "#7a8db0" }}
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[12.5px] font-[Syne] font-semibold text-[#1a2340] group-hover:text-[#0A2540] transition-colors truncate">
                                  {item.label}
                                </span>
                                {item.badge && <BadgeSpan badge={item.badge} />}
                              </div>
                              {item.description && (
                                <span className="text-[10.5px] text-[#7a8db0] leading-tight block truncate">
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom bar with link to all */}
                <div className="mt-3 pt-3 border-t border-[#0A2540]/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-[#b8c4da] font-mono">
                    {dropdown.groups.reduce((s, g) => s + g.items.length, 0)} Regulierungen
                  </span>
                  <Link
                    href="/timeline"
                    onClick={() => setOpen(false)}
                    className="text-[11px] font-[Syne] font-semibold text-[#FACC15] hover:text-[#EAB308] transition-colors flex items-center gap-1"
                  >
                    Alle Fristen ansehen
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              /* ── STANDARD: Single-column dropdown ── */
              <div className="py-3 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hidden">
                {dropdown.groups.map((group, gi) => (
                  <div key={group.id}>
                    {gi > 0 && <div className="mx-4 my-2 h-px bg-[#0A2540]/[0.06]" />}
                    <div className="px-4 py-1.5">
                      <span className="font-mono text-[9px] font-semibold tracking-[0.15em] uppercase text-[#7a8db0]">
                        {group.title}
                      </span>
                    </div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-[#0A2540]/[0.04] group"
                      >
                        {/* Accent dot */}
                        {item.accentColor && (
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: item.accentColor }}
                          />
                        )}
                        {!item.accentColor && <div className="w-2 h-2 rounded-full shrink-0 bg-[#7a8db0]/30" />}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-[Syne] font-semibold text-[#1a2340] group-hover:text-[#0A2540] transition-colors">
                              {item.label}
                            </span>
                            {item.badge && <BadgeSpan badge={item.badge} />}
                          </div>
                          {item.description && (
                            <span className="text-[11px] text-[#7a8db0] leading-tight">
                              {item.description}
                            </span>
                          )}
                        </div>

                        <svg
                          className="w-3.5 h-3.5 text-[#7a8db0]/0 group-hover:text-[#7a8db0]/60 transition-all duration-150 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
