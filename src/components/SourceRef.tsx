"use client";

import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────────────────
   Source data type — shared across SourceRef + SourceList
   ───────────────────────────────────────────────────────── */

export interface Source {
  id: number;
  title: string;
  url: string;
  desc?: string;
  type?: string;        // "Verordnung" | "EU-Richtlinie" | "Gesetz AT" | "Aufsicht AT" | "Behörde"
  favicon?: string;     // optional override; auto-generated from URL domain otherwise
}

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return "";
  }
}

/** Type → color mapping */
function getTypeBadge(type?: string): { bg: string; text: string } {
  switch (type) {
    case "Verordnung":
      return { bg: "#0A2540/10", text: "#0A2540" };
    case "EU-Richtlinie":
      return { bg: "#0A2540/10", text: "#0A2540" };
    case "Gesetz AT":
      return { bg: "#dc262610", text: "#dc2626" };
    case "Aufsicht AT":
      return { bg: "#dc262610", text: "#b91c1c" };
    case "Behörde":
      return { bg: "#7c3aed10", text: "#7c3aed" };
    case "Leitfaden":
      return { bg: "#059669/10", text: "#059669" };
    default:
      return { bg: "#f4f6fc", text: "#7a8db0" };
  }
}

/* ─────────────────────────────────────────────────────────
   SourceRef — Inline [1] badge with tooltip
   ───────────────────────────────────────────────────────── */

export function SourceRef({
  id,
  sources,
  accent = "#0A2540",
}: {
  id: number;
  sources: Source[];
  accent?: string;
}) {
  const [show, setShow] = useState(false);
  const [above, setAbove] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);

  const source = sources.find((s) => s.id === id);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setAbove(rect.top > 140);
    }
  }, [show]);

  if (!source) return <sup className="text-red-500">[?]</sup>;

  return (
    <span className="relative inline-block" ref={ref}>
      <a
        href={`#source-${id}`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(`source-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
        className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-[5px] text-[10px] font-mono font-bold leading-none no-underline transition-all duration-200 hover:scale-110 -translate-y-[2px]"
        style={{
          background: `${accent}12`,
          color: accent,
          border: `1px solid ${accent}25`,
        }}
      >
        {id}
      </a>

      {/* Tooltip */}
      {show && (
        <span
          className={`absolute z-50 left-1/2 -translate-x-1/2 w-72 pointer-events-none ${
            above ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <span className="block rounded-xl bg-[#0a0f1e]/95 backdrop-blur-md text-white p-3 shadow-lg border border-white/10">
            <span className="flex items-start gap-2.5">
              {/* Favicon — external dynamic domain, next/image not viable */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.favicon || getFaviconUrl(source.url)}
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 rounded-sm mt-0.5 flex-shrink-0"
              />
              <span className="flex-1 min-w-0">
                <span className="block font-[Syne] font-bold text-[12px] text-white leading-tight mb-0.5 truncate">
                  {source.title}
                </span>
                <span className="block text-[10px] text-white/50 font-mono truncate">
                  {getDomain(source.url)}
                </span>
              </span>
            </span>
          </span>
        </span>
      )}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   SourceList — Perplexity-style source cards at page bottom
   ───────────────────────────────────────────────────────── */

export function SourceList({
  sources,
  accent = "#0A2540",
}: {
  sources: Source[];
  accent?: string;
}) {
  return (
    <div className="space-y-2.5">
      {sources.map((source) => (
        <a
          key={source.id}
          id={`source-${source.id}`}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 rounded-2xl border border-[#d8dff0] bg-white p-4 sm:p-5 hover:border-opacity-50 hover:shadow-md transition-all duration-200 scroll-mt-28"
          style={{ ["--hover-border" as string]: accent }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent}50`)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d8dff0")}
        >
          {/* Number badge */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs"
            style={{
              background: `${accent}10`,
              color: accent,
            }}
          >
            {source.id}
          </div>

          {/* Favicon + content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={source.favicon || getFaviconUrl(source.url)}
                alt=""
                width={14}
                height={14}
                className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
              />
              <span className="font-[Syne] font-bold text-[13px] sm:text-sm text-[#060c1a] group-hover:text-[color:var(--accent)] transition-colors truncate"
                style={{ "--accent": accent } as React.CSSProperties}
              >
                {source.title}
              </span>
              {source.type && (
                <span
                  className="text-[9px] px-2 py-0.5 rounded-md font-mono font-bold border flex-shrink-0"
                  style={{
                    background: `${getTypeBadge(source.type).text}08`,
                    color: getTypeBadge(source.type).text,
                    borderColor: `${getTypeBadge(source.type).text}20`,
                  }}
                >
                  {source.type}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#7a8db0] font-mono truncate">
                {getDomain(source.url)}
              </span>
              {source.desc && (
                <>
                  <span className="text-[#d8dff0]">·</span>
                  <span className="text-[12px] text-[#7a8db0] leading-relaxed line-clamp-1">
                    {source.desc}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* External link icon */}
          <svg
            className="w-4 h-4 text-[#c8d0e0] group-hover:text-[color:var(--accent)] transition-colors flex-shrink-0 mt-1"
            style={{ "--accent": accent } as React.CSSProperties}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      ))}
    </div>
  );
}
