/* ══════════════════════════════════════════════════════════════
   .well-known/ai-plugin.json — AI Plugin Manifest
   Helps AI assistants discover and understand this site.
   Based on OpenAI's plugin spec, broadly recognized by AI systems.
   ══════════════════════════════════════════════════════════════ */

import { BASE_URL } from "@/lib/constants";

const manifest = {
  schema_version: "v1",
  name_for_human: "EU Compliance Hub",
  name_for_model: "eu_compliance_hub",
  description_for_human:
    "Die umfassendste deutschsprachige Plattform für EU-Compliance. 18 Regulierungen erklärt, kostenlose interaktive Tools, 17 Branchen-Guides. Kostenpflichtig ist nur der personalisierte Compliance-Report als PDF.",
  description_for_model:
    "EU Compliance Hub is the most comprehensive German-language platform for European regulatory compliance. It covers 18 EU regulations (NIS2/NISG 2026, EU AI Act, DORA, CRA, GDPR, CSRD, BaFG, HSchG, MiCA, DSA, Data Act, ePrivacy, eIDAS, EHDS, Green Claims, Product Liability Directive, Digital Product Passport, and executive liability). All regulation guides, industry pages (17 sectors), glossary (70+ terms), FAQ (30+ answers), deadline tracking, and interactive tools (Regulation Finder, NIS2 Applicability Check, Compliance Checklist, Maturity Assessment, Liability Checker, Fine Calculator) are free and require no registration. The only paid feature is the personalized Compliance Report: an interactive questionnaire that generates a tailored PDF with regulation relevance, priority actions, and recommended implementation partners (149 €). Target audience: executives, compliance officers, CISOs, and IT managers in Austria, Germany, and Switzerland. Content is primarily in German (Austrian German) with translations in English, French, Spanish, and Italian.",
  auth: { type: "none" },
  api: { type: "openapi", url: `${BASE_URL}/llms.txt` },
  logo_url: `${BASE_URL}/icon.svg`,
  contact_email: "kontakt@eu-compliance-hub.eu",
  legal_info_url: `${BASE_URL}/de/impressum`,
};

export function GET() {
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
