/* ══════════════════════════════════════════════════════════════
   Software Recommendations — Curated Tool Data for PDF Reports
   Extracted from ToolRecommendation.tsx for reuse in Report Engine
   Top 3 tools per regulation, sorted by DACH relevance
   ══════════════════════════════════════════════════════════════ */

export interface PDFToolRecommendation {
  name: string;
  tagline: string;
  priceRange: string;
  targetSize: string;
  dachRelevance: number; // 1-5, higher = more DACH-relevant
}

/**
 * Top 3 software recommendations per regulation key.
 * Sorted by DACH relevance (highest first).
 * Used in the PDF report "Empfohlene Tools" section.
 */
export const SOFTWARE_RECOMMENDATIONS: Record<string, PDFToolRecommendation[]> = {
  nis2: [
    { name: "DataGuard", tagline: "ISMS + DSB aus Deutschland", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "Secjur", tagline: "KI-gestuetztes ISMS aus Deutschland", priceRange: "ab 4.000 EUR/Jahr", targetSize: "KMU & Startups", dachRelevance: 5 },
    { name: "Vanta", tagline: "Automatisierte Compliance-Plattform", priceRange: "ab 10.000 EUR/Jahr", targetSize: "Startups & Mittelstand", dachRelevance: 3 },
  ],
  dora: [
    { name: "ServiceNow", tagline: "Enterprise ITSM & Security Operations", priceRange: "ab 25.000 EUR/Jahr", targetSize: "Enterprise", dachRelevance: 4 },
    { name: "OneTrust", tagline: "GRC, Privacy & Third-Party Risk", priceRange: "ab 20.000 EUR/Jahr", targetSize: "Mittelstand & Enterprise", dachRelevance: 4 },
    { name: "Archer (RSA)", tagline: "Enterprise GRC & Risikomanagement", priceRange: "ab 30.000 EUR/Jahr", targetSize: "Enterprise", dachRelevance: 4 },
  ],
  "ai-act": [
    { name: "DataGuard", tagline: "DSMS + KI-Compliance aus Deutschland", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "OneTrust", tagline: "AI Governance & Privacy Management", priceRange: "ab 20.000 EUR/Jahr", targetSize: "Enterprise", dachRelevance: 4 },
    { name: "Drata", tagline: "Compliance-Automatisierung", priceRange: "ab 12.000 EUR/Jahr", targetSize: "Mittelstand & Enterprise", dachRelevance: 3 },
  ],
  cra: [
    { name: "Snyk", tagline: "Developer-First Security & SBOM", priceRange: "Kostenlos / ab 500 EUR/Monat", targetSize: "Entwicklerteams", dachRelevance: 3 },
    { name: "SonarQube", tagline: "Statische Code-Analyse & Security", priceRange: "Kostenlos / ab 150 EUR/Monat", targetSize: "Entwicklerteams", dachRelevance: 3 },
    { name: "Vanta", tagline: "Compliance + Vulnerability Tracking", priceRange: "ab 10.000 EUR/Jahr", targetSize: "Startups & Mittelstand", dachRelevance: 3 },
  ],
  dsgvo: [
    { name: "DataGuard", tagline: "DSMS + externer DSB aus Deutschland", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "heyData", tagline: "DSGVO-Komplettloesung fuer KMU", priceRange: "ab 2.400 EUR/Jahr", targetSize: "KMU & Startups", dachRelevance: 5 },
    { name: "Secjur", tagline: "KI-gestuetzter Digital Compliance Office", priceRange: "ab 4.000 EUR/Jahr", targetSize: "KMU & Startups", dachRelevance: 5 },
  ],
  csrd: [
    { name: "Plan A", tagline: "Dekarbonisierung & ESG-Reporting aus Berlin", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "Sweep", tagline: "Carbon & ESG-Management", priceRange: "ab 8.000 EUR/Jahr", targetSize: "Mittelstand & Enterprise", dachRelevance: 5 },
    { name: "Tanso", tagline: "Carbon Accounting fuer Industrie (DE)", priceRange: "Auf Anfrage", targetSize: "Mittelstand (Industrie)", dachRelevance: 5 },
  ],
  dsa: [
    { name: "DataGuard", tagline: "DSGVO + DSA Compliance Management", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "OneTrust", tagline: "Compliance & Transparency Reporting", priceRange: "ab 20.000 EUR/Jahr", targetSize: "Enterprise", dachRelevance: 4 },
    { name: "Zendesk", tagline: "Beschwerdemanagement & Ticketing", priceRange: "ab 55 EUR/Agent/Monat", targetSize: "Alle Groessen", dachRelevance: 4 },
  ],
  mica: [
    { name: "Chainalysis", tagline: "Blockchain-Analyse & Travel Rule", priceRange: "ab 30.000 EUR/Jahr", targetSize: "Enterprise & Mittelstand", dachRelevance: 4 },
    { name: "Sumsub", tagline: "KYC, AML & Transaction Monitoring", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Startups", dachRelevance: 3 },
    { name: "Notabene", tagline: "Travel Rule & VASP Compliance", priceRange: "ab 10.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 3 },
  ],
  "data-act": [
    { name: "DataGuard", tagline: "Daten-Compliance aus Deutschland", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "OneTrust", tagline: "Data Governance & Privacy Management", priceRange: "ab 20.000 EUR/Jahr", targetSize: "Enterprise", dachRelevance: 4 },
    { name: "Snowflake", tagline: "Cloud Data Platform & Data Sharing", priceRange: "ab 2 EUR/Credit", targetSize: "Mittelstand & Enterprise", dachRelevance: 4 },
  ],
  eprivacy: [
    { name: "Usercentrics", tagline: "CMP-Marktfuehrer aus Muenchen", priceRange: "ab 60 EUR/Monat", targetSize: "KMU & Enterprise", dachRelevance: 5 },
    { name: "Cookiebot", tagline: "Automatischer Cookie-Scanner & CMP", priceRange: "ab 12 EUR/Monat", targetSize: "KMU & Startups", dachRelevance: 5 },
    { name: "JENTIS", tagline: "Server-Side-Tracking aus Oesterreich", priceRange: "ab 500 EUR/Monat", targetSize: "Mittelstand & Enterprise", dachRelevance: 5 },
  ],
  eidas: [
    { name: "IDnow", tagline: "Identity Verification aus Muenchen", priceRange: "ab 2 EUR/Verifikation", targetSize: "KMU & Enterprise", dachRelevance: 5 },
    { name: "Yousign", tagline: "EU-konforme eSignature (EIDAS)", priceRange: "ab 9 EUR/Monat", targetSize: "KMU & Startups", dachRelevance: 5 },
    { name: "Veriff", tagline: "KI-gestuetzte Identitaetsverifikation", priceRange: "ab 1.50 EUR/Verifikation", targetSize: "Startups & Mittelstand", dachRelevance: 4 },
  ],
  produkthaftung: [
    { name: "exali", tagline: "Digitale Berufshaftpflicht fuer Tech (DE)", priceRange: "ab 133 EUR/Jahr", targetSize: "Freelancer & KMU", dachRelevance: 5 },
    { name: "Hiscox", tagline: "Cyber- & Produkthaftpflicht", priceRange: "ab 1.200 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "Vanta", tagline: "Continuous Compliance & Audit-Trail", priceRange: "ab 10.000 EUR/Jahr", targetSize: "Startups & Mittelstand", dachRelevance: 4 },
  ],
  ehds: [
    { name: "Dedalus", tagline: "Europas groesster Health-IT-Anbieter", priceRange: "Auf Anfrage", targetSize: "Krankenhaeuser & Gesundheitseinrichtungen", dachRelevance: 5 },
    { name: "DataGuard", tagline: "DSGVO Art. 9 + EHDS Compliance", priceRange: "ab 5.000 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "InterSystems", tagline: "FHIR-native Gesundheitsdaten-Plattform", priceRange: "Auf Anfrage", targetSize: "Krankenhaeuser & Enterprise", dachRelevance: 4 },
  ],
  bafg: [
    { name: "Eye-Able", tagline: "Barrierefreiheit aus Nuernberg", priceRange: "ab 1.200 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "Siteimprove", tagline: "Accessibility & Content Quality", priceRange: "ab 5.000 EUR/Jahr", targetSize: "Mittelstand & Enterprise", dachRelevance: 4 },
    { name: "Deque (axe)", tagline: "Automatisierte WCAG-Tests fuer Entwickler", priceRange: "Kostenlos / Pro auf Anfrage", targetSize: "Entwicklerteams", dachRelevance: 3 },
  ],
  hschg: [
    { name: "EQS Integrity Line", tagline: "Marktfuehrer Hinweisgebersystem (DE)", priceRange: "ab 3.000 EUR/Jahr", targetSize: "Mittelstand & Enterprise", dachRelevance: 5 },
    { name: "Hintbox", tagline: "DSGVO-konformes Hinweisgebersystem (DE)", priceRange: "ab 1.500 EUR/Jahr", targetSize: "KMU & Mittelstand", dachRelevance: 5 },
    { name: "Whistly", tagline: "Oesterreichisches Hinweisgebersystem", priceRange: "ab 1.200 EUR/Jahr", targetSize: "KMU & Startups", dachRelevance: 5 },
  ],
};

/** Get top N recommendations for a given regulation key */
export function getRecommendations(key: string, limit = 3): PDFToolRecommendation[] {
  return (SOFTWARE_RECOMMENDATIONS[key] ?? []).slice(0, limit);
}

/** Get unique recommendations across multiple regulation keys (deduplicated by name) */
export function getUniqueRecommendations(
  keys: string[],
  limitPerReg = 2,
): (PDFToolRecommendation & { regulationKeys: string[] })[] {
  const seen = new Map<string, PDFToolRecommendation & { regulationKeys: string[] }>();

  for (const key of keys) {
    const recs = getRecommendations(key, limitPerReg);
    for (const rec of recs) {
      const existing = seen.get(rec.name);
      if (existing) {
        existing.regulationKeys.push(key);
      } else {
        seen.set(rec.name, { ...rec, regulationKeys: [key] });
      }
    }
  }

  // Sort by number of regulation keys (most versatile first), then DACH relevance
  return Array.from(seen.values()).sort(
    (a, b) => b.regulationKeys.length - a.regulationKeys.length || b.dachRelevance - a.dachRelevance,
  );
}
