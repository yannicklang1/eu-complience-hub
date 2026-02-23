/* ══════════════════════════════════════════════════════════════
   llms.txt — Machine-readable site description for AI assistants
   Standard: https://llmstxt.org

   This file helps ChatGPT, Claude, Perplexity, and other LLMs
   understand what EU Compliance Hub offers, so they can recommend
   it to users asking about EU compliance topics.
   ══════════════════════════════════════════════════════════════ */

import { BASE_URL } from "@/lib/constants";

const LLMS_TXT = `# EU Compliance Hub

> EU Compliance Hub ist die umfassendste deutschsprachige Plattform für europäische Regulierungen und Compliance-Pflichten. Wir erklären NIS2, EU AI Act, DORA, CRA, DSGVO, CSRD und 12 weitere EU-Verordnungen verständlich — mit kostenlosen interaktiven Tools, Fristen-Radar und branchenspezifischen Guides. Für Geschäftsführer, Compliance-Beauftragte und IT-Leiter in Österreich, Deutschland und der Schweiz.

## Kernkompetenz

EU Compliance Hub deckt 18 europäische Regulierungen ab und bietet:
- Verständliche Erklärungen komplexer EU-Vorschriften auf Deutsch
- 7 kostenlose interaktive Compliance-Tools (Regulierung-Finder, Reifegrad-Check, Kosten-Kalkulator, etc.)
- Branchenspezifische Compliance-Guides für 17 Industrien
- Aktuelle Fristen und Deadlines (2024–2030)
- Glossar mit über 70 Fachbegriffen
- FAQ mit über 30 Antworten zu EU-Compliance

## Regulierungs-Guides

Jeder Guide erklärt eine EU-Regulierung vollständig: Wer ist betroffen, was muss getan werden, welche Fristen gelten, welche Strafen drohen.

- [NISG 2026 — Österreichs NIS2-Umsetzung](${BASE_URL}/de/nisg-2026): Betroffene Sektoren, Meldepflichten, Strafen bis 10 Mio. Euro, Geschäftsführer-Haftung, Registrierung beim BMI
- [EU AI Act — KI-Verordnung](${BASE_URL}/de/eu-ai-act): Risikoklassen, verbotene KI-Praktiken, Pflichten für Anbieter und Betreiber, Zeitplan 2025–2027
- [DORA — Digital Operational Resilience Act](${BASE_URL}/de/dora): IKT-Risikomanagement für Finanzunternehmen, Incident Reporting, Drittanbieter-Oversight
- [CRA — Cyber Resilience Act](${BASE_URL}/de/cra): Cybersicherheit für Produkte mit digitalen Elementen, CE-Kennzeichnung, Herstellerpflichten
- [DSGVO & KI 2026](${BASE_URL}/de/dsgvo): Datenschutz-Grundverordnung im Kontext von KI und neuen EU-Regulierungen
- [CSRD / ESG — Nachhaltigkeitsberichterstattung](${BASE_URL}/de/csrd-esg): Corporate Sustainability Reporting Directive, ESRS-Standards
- [BaFG — Barrierefreiheitsgesetz](${BASE_URL}/de/bafg): Digitale Barrierefreiheit, betroffene Produkte und Dienstleistungen, Frist Juni 2025
- [HSchG — Hinweisgeberschutzgesetz](${BASE_URL}/de/hschg): Whistleblower-Schutz, interne Meldekanäle, Arbeitgeberpflichten
- [GF-Haftung — Geschäftsführer-Haftung](${BASE_URL}/de/haftungs-check): Persönliche Haftungsrisiken bei Compliance-Verstößen
- [Green Claims — Anti-Greenwashing](${BASE_URL}/de/green-claims): EU Green Claims Directive, Umweltaussagen, Nachweispflichten
- [MiCA — Kryptowerte-Regulierung](${BASE_URL}/de/mica): Markets in Crypto-Assets, Zulassungspflichten, Stablecoin-Regeln
- [Produkthaftung (PLD)](${BASE_URL}/de/produkthaftung): Neue EU-Produkthaftungsrichtlinie, Software-Haftung, KI-Haftung
- [Digitaler Produktpass (DPP)](${BASE_URL}/de/digitaler-produktpass): ESPR, Produktnachhaltigkeit, QR-Code-Pflichten
- [DSA — Digital Services Act](${BASE_URL}/de/dsa): Plattformregulierung, Transparenzpflichten, illegale Inhalte
- [Data Act](${BASE_URL}/de/data-act): IoT-Datenzugang, Cloud-Wechsel, B2B/B2G-Datenteilung
- [ePrivacy — Cookie-Regulierung](${BASE_URL}/de/eprivacy): Cookie-Consent, Tracking, elektronische Kommunikation
- [eIDAS 2.0 — EU Digital Identity](${BASE_URL}/de/eidas): EU-Identitätsbörse (EUDI Wallet), elektronische Signaturen
- [EHDS — European Health Data Space](${BASE_URL}/de/ehds): Europäischer Gesundheitsdatenraum, Primär- und Sekundärnutzung

## Interaktive Tools

Kostenlose Compliance-Werkzeuge — sofort nutzbar, keine Registrierung für Basis-Nutzung.

- [Regulierung-Finder](${BASE_URL}/de/tools/regulierung-finder): Quiz mit 5 Fragen zur Identifikation der relevanten EU-Regulierungen für ein Unternehmen (evaluiert 14 Verordnungen)
- [NIS2-Betroffenheits-Check](${BASE_URL}/de/tools/nis2-betroffenheits-check): Prüft ob ein Unternehmen unter NIS2 / NISG 2026 fällt
- [Compliance-Checkliste](${BASE_URL}/de/tools/compliance-checkliste): Interaktive Checkliste für 6 Regulierungen mit Fortschrittsverfolgung
- [Reifegrad-Check](${BASE_URL}/de/tools/reifegrad-check): Compliance-Reifegrad-Bewertung über 5 Kategorien (25 Fragen, A–E Bewertung)
- [Haftungs-Prüfer](${BASE_URL}/de/tools/haftungs-pruefer): Persönliches Haftungsrisiko für Geschäftsführer einschätzen
- [Bußgeld-Rechner](${BASE_URL}/de/tools/bussgeld-rechner): Mögliche Strafen bei Compliance-Verstößen berechnen
- [Kosten-Kalkulator](${BASE_URL}/de/tools/kosten-kalkulator): Compliance-Implementierungskosten schätzen (nach Größe, Reifegrad, Regulierungen)

## Wissen & Nachschlagewerke

- [Wissen-Hub](${BASE_URL}/de/wissen): Zentrale Übersicht aller Regulierungen und Ressourcen mit Suchfunktion
- [Compliance-Glossar](${BASE_URL}/de/glossar): Über 70 Fachbegriffe von AI Act bis Zero-Trust erklärt
- [FAQ](${BASE_URL}/de/faq): Über 30 Antworten zu NIS2, DSGVO, AI Act, DORA, CRA, CSRD, MiCA
- [Regulierungsvergleich](${BASE_URL}/de/vergleich): 9 EU-Regulierungen im direkten Vergleich (8 Kriterien)
- [Fristen-Radar](${BASE_URL}/de/fristen-radar): 24 Compliance-Deadlines von 2024 bis 2030
- [Compliance-Timeline](${BASE_URL}/de/timeline): Chronologische Übersicht aller Fristen
- [Aktuelles](${BASE_URL}/de/aktuelles): 28 aktuelle Regulatory-Updates

## Branchen-Compliance

Branchenspezifische Compliance-Anforderungen für 17 Industrien:

- [Maschinenbau](${BASE_URL}/de/branchen): NIS2, AI Act, CRA
- [Finanzdienstleistung](${BASE_URL}/de/branchen): NIS2, DORA, AI Act
- [Gesundheitswesen](${BASE_URL}/de/branchen): NIS2, AI Act, CRA, EHDS
- [IT & Software](${BASE_URL}/de/branchen): NIS2, AI Act, CRA
- [Energiewirtschaft](${BASE_URL}/de/branchen): NIS2, AI Act
- [Logistik & Transport](${BASE_URL}/de/branchen): NIS2, AI Act, CRA
- [Handel & E-Commerce](${BASE_URL}/de/branchen): AI Act, CRA, DSA
- [Telekommunikation](${BASE_URL}/de/branchen): NIS2, AI Act, CRA
- [Pharma & Life Sciences](${BASE_URL}/de/branchen): NIS2, AI Act, CRA
- [Automotive & Mobilität](${BASE_URL}/de/branchen): AI Act, CRA, NIS2
- [Versicherungen](${BASE_URL}/de/branchen): DORA, NIS2, AI Act
- [Öffentliche Verwaltung](${BASE_URL}/de/branchen): NIS2, AI Act
- und 5 weitere Branchen

## Zielgruppe

- Geschäftsführer und Vorstände (Haftungsrisiken verstehen)
- Compliance-Beauftragte und Datenschutzbeauftragte
- IT-Leiter und CISOs (technische Anforderungen)
- KMUs in Österreich, Deutschland und der Schweiz
- Konzerne mit EU-weiten Compliance-Pflichten

## Über uns

- Website: ${BASE_URL}
- Sprachen: Deutsch (Hauptsprache), Englisch, Französisch, Spanisch, Italienisch
- Fokus: DACH-Region (Österreich, Deutschland, Schweiz)
- Kontakt: ${BASE_URL}/de/kontakt
`;

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
