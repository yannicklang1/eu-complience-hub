"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Single Accordion Item ─── */
function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
  accent = "#0A2540",
  index,
}: {
  title: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  accent?: string;
  index: number;
}) {
  const panelId = `accordion-panel-${index}`;
  const headingId = `accordion-heading-${index}`;

  return (
    <div className="border border-[#d8dff0] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#b8c4e0]">
      <button
        id={headingId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#f8f9fd] cursor-pointer"
      >
        <span className="font-[Syne] font-bold text-[15px] text-[#060c1a] leading-snug pr-4">
          {title}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? accent : "#f0f2f8",
            color: isOpen ? "#ffffff" : accent,
          }}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-[15px] text-[#3a4a6b] leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Accordion Group ─── */
export default function AccordionSection({
  items,
  accent = "#0A2540",
  allowMultiple = false,
}: {
  items: { title: ReactNode; content: ReactNode }[];
  accent?: string;
  allowMultiple?: boolean;
}) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          title={item.title}
          isOpen={openItems.has(i)}
          onToggle={() => toggle(i)}
          accent={accent}
          index={i}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
