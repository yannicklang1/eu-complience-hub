"use client";

/* ─────────────────── ApplicableLawInfo ───────────────────
 * Shows which jurisdiction's rules apply for a given
 * regulation — crucial for cross-border compliance.
 *
 * EU regulations:  directly applicable in all member states
 * EU directives:   national transposition applies (market principle)
 * ─────────────────────────────────────────────────────── */

import type { RegulationKey } from "@/i18n/country/types";
import type { Locale } from "@/i18n/config";

/* ── Regulation metadata ── */
type LegalInstrument = "regulation" | "directive";

interface RegulationMeta {
  instrument: LegalInstrument;
  /** Which principle determines which country's rules apply */
  jurisdictionRule: "direct" | "market" | "establishment" | "mixed";
}

/**
 * Classify each regulation by instrument type and jurisdiction rule.
 *
 * - "direct": EU Regulation — directly applicable, same rules everywhere
 * - "market":  Applies where goods/services are offered (Marktortprinzip)
 * - "establishment": Applies where the entity is established (Sitzlandprinzip)
 * - "mixed": Combination — e.g. DSGVO uses establishment + targeting
 */
const REG_META: Partial<Record<RegulationKey, RegulationMeta>> = {
  /* ── Regulations (directly applicable) ── */
  dora:          { instrument: "regulation", jurisdictionRule: "direct" },
  "ai-act":      { instrument: "regulation", jurisdictionRule: "market" },
  cra:           { instrument: "regulation", jurisdictionRule: "market" },
  dsgvo:         { instrument: "regulation", jurisdictionRule: "mixed" },
  mica:          { instrument: "regulation", jurisdictionRule: "direct" },
  dsa:           { instrument: "regulation", jurisdictionRule: "mixed" },
  "data-act":    { instrument: "regulation", jurisdictionRule: "direct" },
  eidas:         { instrument: "regulation", jurisdictionRule: "direct" },

  /* ── Directives (national transposition) ── */
  nis2:          { instrument: "directive", jurisdictionRule: "establishment" },
  csrd:          { instrument: "directive", jurisdictionRule: "establishment" },
  bafg:          { instrument: "directive", jurisdictionRule: "establishment" },
  hschg:         { instrument: "directive", jurisdictionRule: "market" },
  produkthaftung:{ instrument: "directive", jurisdictionRule: "market" },
  eprivacy:      { instrument: "directive", jurisdictionRule: "establishment" },
  ehds:          { instrument: "regulation", jurisdictionRule: "direct" },
  "green-claims":{ instrument: "directive", jurisdictionRule: "market" },
  dpp:           { instrument: "regulation", jurisdictionRule: "market" },
};

/* ── Translations ── */
const LABELS: Record<string, {
  heading: string;
  regulation: string;
  directive: string;
  directDesc: string;
  marketDesc: string;
  establishmentDesc: string;
  mixedDesc: string;
  crossBorderNote: string;
}> = {
  de: {
    heading: "Anwendbares Recht",
    regulation: "EU-Verordnung",
    directive: "EU-Richtlinie",
    directDesc: "Diese Verordnung gilt unmittelbar und einheitlich in allen EU-Mitgliedstaaten. Es gibt keine nationalen Umsetzungsunterschiede.",
    marketDesc: "Es gilt das Recht des Landes, in dem Sie Ihre Produkte oder Dienstleistungen anbieten (Marktortprinzip). Sind Sie in mehreren EU-Ländern aktiv, müssen Sie die jeweiligen nationalen Anforderungen jedes Marktes beachten.",
    establishmentDesc: "Es gilt vorrangig das Recht des Landes, in dem Ihr Unternehmen seinen Sitz hat (Sitzlandprinzip). Die nationale Aufsichtsbehörde Ihres Sitzlandes ist primär zuständig.",
    mixedDesc: "Es gilt das Recht des Sitzlandes (Niederlassungsprinzip), aber auch des Landes, in dem Sie Personen gezielt ansprechen (Targeting-Prinzip). Bei grenzüberschreitender Tätigkeit können mehrere nationale Aufsichtsbehörden zuständig sein.",
    crossBorderNote: "Als Unternehmen mit Sitz in einem EU-Land, das in anderen Mitgliedstaaten aktiv ist, müssen Sie unter Umständen die Vorschriften mehrerer Länder beachten. Wählen Sie oben das jeweilige Zielland, um die länderspezifischen Anforderungen zu sehen.",
  },
  en: {
    heading: "Applicable Law",
    regulation: "EU Regulation",
    directive: "EU Directive",
    directDesc: "This regulation is directly applicable and uniform across all EU member states. There are no national implementation differences.",
    marketDesc: "The law of the country where you offer your products or services applies (market location principle). If you operate in multiple EU countries, you must comply with each market's national requirements.",
    establishmentDesc: "The law of the country where your company is established primarily applies (establishment principle). Your home country's supervisory authority has primary jurisdiction.",
    mixedDesc: "The law of your country of establishment applies, but also the law of the country where you target individuals (targeting principle). Cross-border activities may involve multiple national supervisory authorities.",
    crossBorderNote: "As a company based in one EU country operating in other member states, you may need to comply with the regulations of multiple countries. Select the target country above to see country-specific requirements.",
  },
  fr: {
    heading: "Droit applicable",
    regulation: "Règlement UE",
    directive: "Directive UE",
    directDesc: "Ce règlement est directement applicable et uniforme dans tous les États membres. Il n'y a pas de différences de transposition nationale.",
    marketDesc: "Le droit du pays où vous proposez vos produits ou services s'applique (principe du lieu de marché). Si vous opérez dans plusieurs pays, vous devez respecter les exigences nationales de chaque marché.",
    establishmentDesc: "Le droit du pays où votre entreprise est établie s'applique principalement (principe d'établissement). L'autorité de contrôle de votre pays d'origine est compétente.",
    mixedDesc: "Le droit de votre pays d'établissement s'applique, mais aussi celui du pays où vous ciblez des personnes (principe de ciblage). Les activités transfrontalières peuvent impliquer plusieurs autorités nationales.",
    crossBorderNote: "En tant qu'entreprise basée dans un pays de l'UE opérant dans d'autres États membres, vous pouvez devoir respecter les réglementations de plusieurs pays.",
  },
};

interface ApplicableLawInfoProps {
  regulationKey: RegulationKey;
  locale: Locale;
}

export function ApplicableLawInfo({ regulationKey, locale }: ApplicableLawInfoProps) {
  const meta = REG_META[regulationKey];
  if (!meta) return null;

  const l = LABELS[locale] ?? LABELS.en;

  const instrumentLabel = meta.instrument === "regulation" ? l.regulation : l.directive;

  let ruleDesc: string;
  let ruleIcon: string;
  let ruleBg: string;

  switch (meta.jurisdictionRule) {
    case "direct":
      ruleDesc = l.directDesc;
      ruleIcon = "🟢";
      ruleBg = "bg-emerald-50 border-emerald-200";
      break;
    case "market":
      ruleDesc = l.marketDesc;
      ruleIcon = "🟡";
      ruleBg = "bg-amber-50 border-amber-200";
      break;
    case "establishment":
      ruleDesc = l.establishmentDesc;
      ruleIcon = "🔵";
      ruleBg = "bg-blue-50 border-blue-200";
      break;
    case "mixed":
      ruleDesc = l.mixedDesc;
      ruleIcon = "🟠";
      ruleBg = "bg-orange-50 border-orange-200";
      break;
  }

  return (
    <div className={`rounded-xl border p-4 ${ruleBg}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm leading-none" aria-hidden="true">{ruleIcon}</span>
        <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-[#3a4a6b]">
          {l.heading}
        </span>
      </div>
      <div className="text-[11px] font-semibold text-[#0A2540] mb-1.5">
        {instrumentLabel}
      </div>
      <p className="text-[11px] text-[#4a5a80] leading-relaxed">
        {ruleDesc}
      </p>
    </div>
  );
}
