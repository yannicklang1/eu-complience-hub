"use client";

/* ─────────────────── ApplicableLawInfo ───────────────────
 * Shows which jurisdiction's rules apply for a given
 * regulation — crucial for cross-border compliance.
 *
 * EU regulations:  directly applicable in all member states
 * EU directives:   national transposition applies (market principle)
 *
 * Now country-aware: shows national authority, law name,
 * implementation status for the selected country.
 * ─────────────────────────────────────────────────────── */

import type { RegulationKey } from "@/i18n/country/types";
import type { Locale } from "@/i18n/config";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";

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

/* ── Status display helpers ── */
const STATUS_LABELS: Record<string, Record<string, string>> = {
  de: { implemented: "In Kraft", pending: "In Umsetzung", overdue: "Überfällig" },
  en: { implemented: "In Force", pending: "Pending", overdue: "Overdue" },
  fr: { implemented: "En vigueur", pending: "En cours", overdue: "En retard" },
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  implemented: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  overdue: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

const COUNTRY_SECTION_LABELS: Record<string, { authority: string; nationalLaw: string; status: string; notes: string }> = {
  de: { authority: "Zuständige Behörde", nationalLaw: "Nationales Gesetz", status: "Umsetzungsstatus", notes: "Hinweise" },
  en: { authority: "Supervisory Authority", nationalLaw: "National Law", status: "Implementation Status", notes: "Notes" },
  fr: { authority: "Autorité compétente", nationalLaw: "Loi nationale", status: "Statut de mise en œuvre", notes: "Remarques" },
};

export function ApplicableLawInfo({ regulationKey, locale }: ApplicableLawInfoProps) {
  const meta = REG_META[regulationKey];
  const { countryCode, countryData } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];

  if (!meta) return null;

  const l = LABELS[locale] ?? LABELS.en;
  const cl = COUNTRY_SECTION_LABELS[locale] ?? COUNTRY_SECTION_LABELS.en;
  const sl = STATUS_LABELS[locale] ?? STATUS_LABELS.en;

  const instrumentLabel = meta.instrument === "regulation" ? l.regulation : l.directive;

  /* ── Country-specific regulation data ── */
  const regData = countryData?.regulations?.[regulationKey];
  const status = regData?.implementationStatus;
  const statusStyle = status ? STATUS_COLORS[status] : null;
  const statusLabel = status ? sl[status] ?? status : null;

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
    <div className="space-y-3">
      {/* ── Jurisdiction Rule ── */}
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

      {/* ── Country-Specific Info ── */}
      {regData && countryMeta && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base leading-none">{countryMeta.flag}</span>
            <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-[#3a4a6b]">
              {countryMeta.nameDE}
            </span>
            {statusLabel && statusStyle && (
              <span className={`ml-auto px-2 py-0.5 rounded-md text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}>
                {statusLabel}
              </span>
            )}
          </div>

          <div className="space-y-2">
            {/* Authority */}
            {regData.authority && (
              <div>
                <span className="text-[10px] font-semibold text-[#7a8db0] uppercase tracking-wider">{cl.authority}</span>
                {regData.authorityUrl ? (
                  <a
                    href={regData.authorityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[11px] text-indigo-600 hover:text-indigo-800 font-medium mt-0.5 underline underline-offset-2 decoration-indigo-300 hover:decoration-indigo-500 transition-colors"
                  >
                    {regData.authority}
                  </a>
                ) : (
                  <p className="text-[11px] text-[#0A2540] font-medium mt-0.5">{regData.authority}</p>
                )}
              </div>
            )}

            {/* National Law Name */}
            {regData.nationalLawName && (
              <div>
                <span className="text-[10px] font-semibold text-[#7a8db0] uppercase tracking-wider">{cl.nationalLaw}</span>
                <p className="text-[11px] text-[#0A2540] font-mono mt-0.5">{regData.nationalLawName}</p>
              </div>
            )}

            {/* National Deadline */}
            {regData.nationalDeadline && (
              <div>
                <span className="text-[10px] font-semibold text-[#7a8db0] uppercase tracking-wider">Deadline</span>
                <p className="text-[11px] text-[#0A2540] font-semibold mt-0.5">{regData.nationalDeadline}</p>
              </div>
            )}

            {/* National Notes */}
            {regData.nationalNotes && (
              <div className="pt-1 border-t border-slate-200">
                <p className="text-[11px] text-[#4a5a80] leading-relaxed italic">
                  {regData.nationalNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
