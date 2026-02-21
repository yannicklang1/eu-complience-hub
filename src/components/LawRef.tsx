"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

/* ─────────────────────────────────────────────────────────
   EUR-Lex & Austrian law deep-link mapping
   ───────────────────────────────────────────────────────── */

const EUR_LEX_BASES: Record<string, string> = {
  // EU Regulations & Directives
  "NIS2":   "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32022L2555",
  "DORA":   "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32022R2554",
  "AI Act": "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024R1689",
  "CRA":    "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024R2847",
  "DSGVO":  "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679",
  "CSRD":   "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32022L2464",
  "EAA":    "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32019L0882",
  "Whistleblower-RL": "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32019L1937",
  "Produkthaftungsrichtlinie": "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024L2853",
  "DSA":    "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32022R2065",
  "Data Act": "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32023R2854",
  "EHDS":   "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32025R0327",
  "eIDAS":  "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024R1183",
  "eIDAS 2.0": "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32024R1183",
  "ePrivacy-RL": "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32002L0058",
  "MiCA":   "https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32023R1114",
};

/* Full display names for tooltips */
const LAW_FULL_NAMES: Record<string, string> = {
  "NIS2":   "Richtlinie (EU) 2022/2555 — NIS2",
  "DORA":   "Verordnung (EU) 2022/2554 — DORA",
  "AI Act": "Verordnung (EU) 2024/1689 — AI Act",
  "CRA":    "Verordnung (EU) 2024/2847 — Cyber Resilience Act",
  "DSGVO":  "Verordnung (EU) 2016/679 — DSGVO",
  "CSRD":   "Richtlinie (EU) 2022/2464 — CSRD",
  "EAA":    "Richtlinie (EU) 2019/882 — European Accessibility Act",
  "BaFG":   "Barrierefreiheitsstärkungsgesetz — BGBl. I 76/2023",
  "Whistleblower-RL": "Richtlinie (EU) 2019/1937 — Whistleblower-Schutzrichtlinie",
  "HSchG":  "HinweisgeberInnenschutzgesetz — BGBl. I 6/2023",
  "NaBeG":  "Nachhaltigkeitsberichterstattungsgesetz (NaBeG)",
  "Produkthaftungsrichtlinie": "Richtlinie (EU) 2024/2853",
  "GmbHG":  "GmbH-Gesetz (Österreich)",
  "AktG":   "Aktiengesetz (Österreich)",
  "NISG":   "NISG 2026 — BGBl. I Nr. 94/2025",
  "DSA":    "Verordnung (EU) 2022/2065 — Digital Services Act",
  "Data Act": "Verordnung (EU) 2023/2854 — Data Act",
  "EHDS":   "Verordnung (EU) 2025/327 — European Health Data Space",
  "eIDAS":  "Verordnung (EU) 2024/1183 — eIDAS 2.0",
  "eIDAS 2.0": "Verordnung (EU) 2024/1183 — eIDAS 2.0",
  "ePrivacy-RL": "Richtlinie 2002/58/EG — ePrivacy-Richtlinie",
  "MiCA":   "Verordnung (EU) 2023/1114 — MiCA",
  "TKG":    "Telekommunikationsgesetz 2021 (Österreich)",
  "TDDDG":  "Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (Deutschland)",
};

/**
 * Build a deep-link URL for a given law reference.
 *
 * Supports:
 *  - EU regulations via EUR-Lex:  Art. 5 → #art_5, Anhang III → #anx_III
 *  - Austrian GmbHG/AktG via JusLine: § 25 → /paragraf/25
 *  - NISG 2026 via parlament.gv.at
 *  - Custom href override
 */
function buildUrl(law: string, article?: string, paragraph?: string, annex?: string, href?: string): string {
  // Custom override always wins
  if (href) return href;

  // Austrian laws via JusLine
  if (law === "GmbHG" && paragraph) {
    return `https://www.jusline.at/gesetz/gmbhg/paragraf/${paragraph}`;
  }
  if (law === "AktG" && paragraph) {
    return `https://www.jusline.at/gesetz/aktg/paragraf/${paragraph}`;
  }

  // NISG 2026 — Austrian parliament
  if (law === "NISG" || law === "NISG 2026") {
    return "https://www.ris.bka.gv.at/eli/bgbl/I/2025/94";
  }

  // BaFG — Austrian RIS
  if (law === "BaFG") {
    return "https://www.ris.bka.gv.at/eli/bgbl/I/2023/76";
  }

  // HSchG — Austrian RIS
  if (law === "HSchG") {
    return "https://www.ris.bka.gv.at/eli/bgbl/I/2023/6";
  }

  // NaBeG — Austrian RIS
  if (law === "NaBeG") {
    return "https://www.ris.bka.gv.at/eli/bgbl/I/2024/68";
  }

  // EUR-Lex based laws
  const base = EUR_LEX_BASES[law];
  if (!base) return "#";

  // Annex anchor: #anx_I, #anx_II, #anx_III
  if (annex) {
    return `${base}#anx_${annex}`;
  }

  // Article anchor: #art_5, #art_20, #art_99
  if (article) {
    // Extract just the number from "Art. 5" or "5" or "Artikel 5"
    const artNum = article.replace(/^(Art\.?\s*|Artikel\s*)/i, "").trim();
    return `${base}#art_${artNum}`;
  }

  return base;
}

/* Roman numeral helper for display — reserved for future citation formatting */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ROMAN: Record<string, string> = {"I":"I","II":"II","III":"III","IV":"IV","V":"V","VI":"VI","VII":"VII","VIII":"VIII","IX":"IX","X":"X","XI":"XI","XII":"XII","XIII":"XIII"};

/**
 * Build the display text from props.
 * Examples:
 *   law="NIS2" article="20"                → "Art. 20 NIS2"
 *   law="NIS2" article="20" absatz="1"     → "Art. 20 Abs. 1 NIS2"
 *   law="GmbHG" paragraph="25"             → "§ 25 GmbHG"
 *   law="AI Act" annex="III"               → "Anhang III AI Act"
 *   children="custom text"                 → "custom text"
 */
function buildLabel(
  law: string,
  article?: string,
  absatz?: string,
  paragraph?: string,
  annex?: string,
  nr?: string,
  children?: ReactNode,
): ReactNode {
  if (children) return children;

  const parts: string[] = [];

  if (paragraph) {
    parts.push(`\u00A7 ${paragraph} ${law}`);
  } else if (annex) {
    parts.push(`Anhang ${annex} ${law}`);
  } else if (article) {
    const artNum = article.replace(/^(Art\.?\s*|Artikel\s*)/i, "").trim();
    let ref = `Art. ${artNum}`;
    if (absatz) ref += ` Abs. ${absatz}`;
    if (nr) ref += ` Nr. ${nr}`;
    ref += ` ${law}`;
    parts.push(ref);
  } else {
    parts.push(law);
  }

  return parts.join("");
}

/* ─────────────────────────────────────────────────────────
   Tooltip Component
   ───────────────────────────────────────────────────────── */

function Tooltip({ text, visible, anchorRef }: { text: string; visible: boolean; anchorRef: React.RefObject<HTMLElement | null> }) {
  const tipRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<"top" | "bottom">("top");

  useEffect(() => {
    if (!visible || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- positioning based on DOM measurement
    setPos(rect.top < 80 ? "bottom" : "top");
  }, [visible, anchorRef]);

  if (!visible) return null;

  return (
    <div
      ref={tipRef}
      role="tooltip"
      className={`absolute z-50 pointer-events-none px-3 py-2 rounded-xl bg-[#060c1a] text-white text-[11px] font-mono leading-relaxed shadow-xl border border-white/10 whitespace-nowrap max-w-xs ${
        pos === "top"
          ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
          : "top-full left-1/2 -translate-x-1/2 mt-2"
      }`}
      style={{ animationDuration: "150ms" }}
    >
      {/* Arrow */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-[#060c1a] rotate-45 border-white/10 ${
          pos === "top"
            ? "bottom-[-5px] border-r border-b"
            : "top-[-5px] border-l border-t"
        }`}
      />
      <div className="flex items-center gap-2">
        <svg className="w-3 h-3 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
        <span>{text}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LawRef Component
   ───────────────────────────────────────────────────────── */

export interface LawRefProps {
  /** Law identifier: "NIS2", "DORA", "AI Act", "CRA", "GmbHG", "AktG", "NISG", "DSGVO" */
  law: string;
  /** Article number: "5", "20", "99" */
  article?: string;
  /** Sub-paragraph: "1", "2", "2a" */
  absatz?: string;
  /** For Austrian §-laws: paragraph number */
  paragraph?: string;
  /** Annex: "I", "II", "III" */
  annex?: string;
  /** Sub-number: "1" (for Art. 13 Abs. 5 Nr. 1) */
  nr?: string;
  /** Custom URL override */
  href?: string;
  /** Custom display text (overrides auto-generated label) */
  children?: ReactNode;
  /** Optional accent color for the link */
  accent?: string;
}

export default function LawRef({
  law,
  article,
  absatz,
  paragraph,
  annex,
  nr,
  href,
  children,
  accent,
}: LawRefProps) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const url = buildUrl(law, article, paragraph, annex, href);
  const label = buildLabel(law, article, absatz, paragraph, annex, nr, children);
  const fullName = LAW_FULL_NAMES[law] || law;
  const tooltipText = children
    ? `${buildLabel(law, article, absatz, paragraph, annex, nr)} — ${fullName}`
    : `${fullName} — EUR-Lex / Offizieller Volltext`;

  return (
    <span className="relative inline-flex items-baseline">
      <a
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="inline-flex items-baseline gap-0.5 font-semibold transition-all duration-200 decoration-dotted underline underline-offset-[3px] decoration-1 hover:decoration-2 hover:decoration-solid"
        style={{
          color: accent || "#0A2540",
          textDecorationColor: accent ? `${accent}60` : "rgba(10,37,64,0.35)",
        }}
      >
        {label}
        <svg
          className="w-[10px] h-[10px] inline-block flex-shrink-0 opacity-40 transition-opacity duration-200 group-hover:opacity-70 self-center ml-[1px]"
          style={{ marginBottom: "1px" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
      <Tooltip text={tooltipText} visible={hovered} anchorRef={ref} />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Helper: LawRefInline — for use inside paragraphs where
   you just need a quick link without changing the text flow
   ───────────────────────────────────────────────────────── */
export function LawRefInline({
  law,
  article,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  absatz,
  paragraph,
  annex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nr,
  href,
  accent,
}: Omit<LawRefProps, "children">) {
  const url = buildUrl(law, article, paragraph, annex, href);
  const fullName = LAW_FULL_NAMES[law] || law;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${fullName} — Volltext auf EUR-Lex`}
      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-md text-[9px] font-mono font-bold transition-all duration-200 hover:scale-110 no-underline align-middle mx-[1px]"
      style={{
        background: accent ? `${accent}12` : "rgba(10,37,64,0.08)",
        color: accent || "#0A2540",
        border: `1px solid ${accent ? `${accent}25` : "rgba(10,37,64,0.15)"}`,
      }}
    >
      §
    </a>
  );
}
