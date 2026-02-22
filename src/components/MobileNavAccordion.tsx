"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { NavDropdown } from "@/data/navigation";
import { useTranslations } from "@/i18n/use-translations";

function BadgeSpan({ badge }: { badge: string }) {
  const cls =
    badge === "Live"
      ? "bg-emerald-100 text-emerald-700"
      : badge === "Update"
      ? "bg-amber-50 text-amber-700"
      : "bg-blue-50 text-blue-700";
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold ${cls}`}>
      {badge}
    </span>
  );
}

export default function MobileNavAccordion({
  dropdown,
  onNavigate,
}: {
  dropdown: NavDropdown;
  onNavigate: () => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { locale } = useTranslations();

  return (
    <div>
      {/* Dropdown label as section title */}
      <div className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7a8db0] mt-4 mb-2 px-1">
        {dropdown.label}
      </div>

      {dropdown.groups.map((group) => {
        const isOpen = openGroup === group.id;
        return (
          <div key={group.id} className="border-b border-[#0A2540]/[0.04]">
            {/* Group header — toggle */}
            <button
              onClick={() => setOpenGroup(isOpen ? null : group.id)}
              className="flex items-center justify-between w-full py-3 text-[#3a4a6b]"
            >
              <span className="text-sm font-semibold font-[Syne]">{group.title}</span>
              <svg
                className={`w-4 h-4 text-[#7a8db0] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Items */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] as const }}
                  className="overflow-hidden"
                >
                  <div className="pb-2 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={`/${locale}${item.href}`}
                        onClick={onNavigate}
                        className="flex items-center justify-between py-2.5 text-[#3a4a6b]"
                      >
                        <div className="flex items-center gap-2">
                          {item.accentColor && (
                            <div
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: item.accentColor }}
                            />
                          )}
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.badge && <BadgeSpan badge={item.badge} />}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
