/* ═══════════════════════════════════════════════════════════════════
   Software-Vergleichsdaten für Affiliate-Seiten
   ═══════════════════════════════════════════════════════════════════ */

export interface SoftwareTool {
  name: string;
  slug: string;
  logo: string; // emoji fallback
  /** Google Favicon URL — auto-generated from domain */
  faviconUrl: string;
  url: string;
  /** Affiliate URL (placeholder — replace with actual tracking links) */
  affiliateUrl: string;
  tagline: string;
  description: string;
  priceRange: string;
  priceNote?: string;
  targetSize: string; // "KMU" | "Mittelstand" | "Enterprise" | "Alle"
  /** Relevant regulations this tool helps with */
  regulations: string[];
  /** Feature ratings 1-5 */
  ratings: {
    usability: number;
    features: number;
    support: number;
    priceValue: number;
    dachRelevance: number;
  };
  pros: string[];
  cons: string[];
  bestFor: string;
  headquarter: string;
}

export interface ComparisonCategory {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Which regulation(s) are these tools most relevant for */
  regulations: string[];
  tools: SoftwareTool[];
  /** Feature comparison matrix headers */
  featureHeaders: string[];
  /** Feature matrix: tool slug → boolean[] matching featureHeaders */
  featureMatrix: Record<string, boolean[]>;
}

/* ── ISMS / Compliance-Management ── */
const ismsTools: SoftwareTool[] = [
  {
    name: "Vanta",
    slug: "vanta",
    logo: "🛡️",
    faviconUrl: "https://www.google.com/s2/favicons?domain=vanta.com&sz=64",
    url: "https://www.vanta.com",
    affiliateUrl: "https://www.vanta.com/?ref=eu-compliance-hub",
    tagline: "Automatisierte Compliance für wachsende Unternehmen",
    description:
      "Vanta automatisiert Security-Compliance und hilft bei SOC 2, ISO 27001, GDPR und mehr. Continuous Monitoring mit 300+ Integrationen verbindet sich mit Ihrem bestehenden Tech-Stack.",
    priceRange: "ab ca. 10.000 €/Jahr",
    priceNote: "Preis abhängig von Unternehmensgröße und Framework",
    targetSize: "Startups & Mittelstand",
    regulations: ["NIS2", "DSGVO", "ISO 27001"],
    ratings: { usability: 5, features: 4, support: 4, priceValue: 3, dachRelevance: 3 },
    pros: [
      "Extrem schnelle Implementierung (Wochen statt Monate)",
      "300+ native Integrationen (AWS, Azure, GitHub, etc.)",
      "Continuous Monitoring mit Echtzeit-Dashboards",
      "Trust Center für Kunden-Transparenz",
    ],
    cons: [
      "Primär US-fokussiert, DACH-spezifische Features ausbaufähig",
      "Preise steigen schnell mit Mitarbeiterzahl",
      "Weniger geeignet für komplexe EU-spezifische Anforderungen",
    ],
    bestFor: "Tech-Unternehmen und Startups die schnell SOC 2 oder ISO 27001 brauchen",
    headquarter: "San Francisco, USA",
  },
  {
    name: "Drata",
    slug: "drata",
    logo: "✅",
    faviconUrl: "https://www.google.com/s2/favicons?domain=drata.com&sz=64",
    url: "https://drata.com",
    affiliateUrl: "https://drata.com/?ref=eu-compliance-hub",
    tagline: "Compliance-Automatisierung auf Autopilot",
    description:
      "Drata bietet kontinuierliche Compliance-Automatisierung mit Fokus auf Evidence Collection und Audit-Readiness. Unterstützt SOC 2, ISO 27001, GDPR, HIPAA und mehr.",
    priceRange: "ab ca. 12.000 €/Jahr",
    priceNote: "Custom Pricing je nach Anforderungen",
    targetSize: "Mittelstand & Enterprise",
    regulations: ["NIS2", "DSGVO", "ISO 27001", "SOC 2"],
    ratings: { usability: 4, features: 5, support: 4, priceValue: 3, dachRelevance: 3 },
    pros: [
      "Umfassende Framework-Abdeckung (16+ Frameworks)",
      "Automatische Evidence Collection",
      "Risk Management Modul integriert",
      "Gute API für Custom-Integrationen",
    ],
    cons: [
      "Komplexeres Setup als Vanta",
      "US-zentrierte Ausrichtung",
      "Höherer Preis bei vollem Funktionsumfang",
    ],
    bestFor: "Mittelständler die mehrere Compliance-Frameworks gleichzeitig managen müssen",
    headquarter: "San Diego, USA",
  },
  {
    name: "DataGuard",
    slug: "dataguard",
    logo: "🇩🇪",
    faviconUrl: "https://www.google.com/s2/favicons?domain=dataguard.de&sz=64",
    url: "https://www.dataguard.de",
    affiliateUrl: "https://www.dataguard.de/?ref=eu-compliance-hub",
    tagline: "Datenschutz & Informationssicherheit aus Deutschland",
    description:
      "DataGuard verbindet Compliance-Software mit persönlicher Beratung durch zertifizierte Datenschutzbeauftragte. Speziell für den DACH-Raum entwickelt mit Fokus auf DSGVO, ISO 27001 und NIS2.",
    priceRange: "ab ca. 5.000 €/Jahr",
    priceNote: "Inkl. externem Datenschutzbeauftragten je nach Paket",
    targetSize: "KMU & Mittelstand",
    regulations: ["DSGVO", "NIS2", "ISO 27001"],
    ratings: { usability: 4, features: 4, support: 5, priceValue: 4, dachRelevance: 5 },
    pros: [
      "Deutschsprachiger Support und Beratung",
      "Externer DSB als Service verfügbar",
      "DSGVO- und NIS2-spezifische Module",
      "Hosting in Deutschland (DSGVO-konform)",
    ],
    cons: [
      "Weniger Integrationen als US-Anbieter",
      "Fokus auf DACH kann international limitieren",
      "Nicht ideal für reine Tech-Compliance (SOC 2)",
    ],
    bestFor: "DACH-Unternehmen die deutschen Support und DSGVO-Expertise brauchen",
    headquarter: "München, Deutschland",
  },
  {
    name: "OneTrust",
    slug: "onetrust",
    logo: "🌐",
    faviconUrl: "https://www.google.com/s2/favicons?domain=onetrust.com&sz=64",
    url: "https://www.onetrust.com",
    affiliateUrl: "https://www.onetrust.com/?ref=eu-compliance-hub",
    tagline: "Enterprise Privacy & Trust Intelligence",
    description:
      "OneTrust ist die umfassendste Plattform für Privacy, Security und Governance. Von Cookie Consent bis Third-Party Risk Management — alles aus einer Hand für große Organisationen.",
    priceRange: "ab ca. 20.000 €/Jahr",
    priceNote: "Enterprise Pricing, stark modulabhängig",
    targetSize: "Enterprise",
    regulations: ["DSGVO", "NIS2", "AI Act", "DORA"],
    ratings: { usability: 3, features: 5, support: 4, priceValue: 2, dachRelevance: 4 },
    pros: [
      "Extrem umfangreiche Feature-Palette",
      "AI Governance Modul für EU AI Act",
      "Third-Party Risk Management integriert",
      "Global skalierbar für multinationale Konzerne",
    ],
    cons: [
      "Hoher Preis, erst ab Enterprise sinnvoll",
      "Komplexes Setup und lange Implementierungszeit",
      "Kann für KMU überdimensioniert sein",
    ],
    bestFor: "Große Unternehmen und Konzerne mit komplexen Multi-Regulierungs-Anforderungen",
    headquarter: "Atlanta, USA (Büro in München)",
  },
];

/* ── Incident Management ── */
const incidentTools: SoftwareTool[] = [
  {
    name: "ServiceNow",
    slug: "servicenow",
    logo: "⚡",
    faviconUrl: "https://www.google.com/s2/favicons?domain=servicenow.com&sz=64",
    url: "https://www.servicenow.com",
    affiliateUrl: "https://www.servicenow.com/?ref=eu-compliance-hub",
    tagline: "Enterprise IT Service Management & Security Operations",
    description:
      "ServiceNow bietet ein umfassendes ITSM- und Security-Operations-Modul mit Incident Response, Vulnerability Management und GRC — ideal für NIS2 und DORA Meldepflichten.",
    priceRange: "ab ca. 25.000 €/Jahr",
    priceNote: "Enterprise-Lizenzierung, modulabhängig",
    targetSize: "Enterprise",
    regulations: ["NIS2", "DORA", "ISO 27001"],
    ratings: { usability: 3, features: 5, support: 4, priceValue: 2, dachRelevance: 4 },
    pros: [
      "Marktführer bei ITSM und Security Operations",
      "NIS2-konforme Incident-Workflows möglich",
      "Integriertes GRC-Modul",
      "Große Partner- und Berater-Landschaft im DACH-Raum",
    ],
    cons: [
      "Sehr hohe Kosten und komplexe Lizenzierung",
      "Lange Implementierungszeit (3-6 Monate)",
      "Überqualifiziert für kleine Unternehmen",
    ],
    bestFor: "Große Organisationen mit bestehender ITSM-Infrastruktur",
    headquarter: "Santa Clara, USA (Büro in Wien & München)",
  },
  {
    name: "PagerDuty",
    slug: "pagerduty",
    logo: "🔔",
    faviconUrl: "https://www.google.com/s2/favicons?domain=pagerduty.com&sz=64",
    url: "https://www.pagerduty.com",
    affiliateUrl: "https://www.pagerduty.com/?ref=eu-compliance-hub",
    tagline: "Incident Management für digitale Operations",
    description:
      "PagerDuty automatisiert die Erkennung und Eskalation von IT-Vorfällen. Mit AIOps und Runbook-Automation ideal für die NIS2-Meldepflicht von 24 Stunden.",
    priceRange: "ab ca. 500 €/Monat",
    priceNote: "Pro User, günstigere Pakete verfügbar",
    targetSize: "Alle",
    regulations: ["NIS2", "DORA"],
    ratings: { usability: 5, features: 4, support: 4, priceValue: 4, dachRelevance: 3 },
    pros: [
      "Schnellstes Alerting und Eskalation am Markt",
      "AIOps reduziert Alert-Fatigue",
      "700+ Integrationen (Monitoring, SIEM, Cloud)",
      "Einfache Implementierung (Stunden statt Wochen)",
    ],
    cons: [
      "Kein vollständiges GRC/Compliance-Tool",
      "Hauptsächlich für IT-Operations, nicht für Business-Compliance",
      "Support primär auf Englisch",
    ],
    bestFor: "IT-Teams die NIS2-Meldepflichten mit schneller Incident-Detection erfüllen wollen",
    headquarter: "San Francisco, USA",
  },
  {
    name: "Jira Service Management",
    slug: "jira-sm",
    logo: "📋",
    faviconUrl: "https://www.google.com/s2/favicons?domain=atlassian.com&sz=64",
    url: "https://www.atlassian.com/software/jira/service-management",
    affiliateUrl: "https://www.atlassian.com/software/jira/service-management?ref=eu-compliance-hub",
    tagline: "ITSM für agile Teams — von Atlassian",
    description:
      "Jira Service Management verbindet ITSM mit Entwickler-Workflows. Incident Management, Change Management und Asset Discovery in einer Plattform, die viele Teams bereits kennen.",
    priceRange: "ab ca. 20 €/Agent/Monat",
    priceNote: "Free Tier für bis zu 3 Agents verfügbar",
    targetSize: "KMU & Mittelstand",
    regulations: ["NIS2", "DORA"],
    ratings: { usability: 4, features: 3, support: 3, priceValue: 5, dachRelevance: 3 },
    pros: [
      "Sehr günstiger Einstieg (Free Tier verfügbar)",
      "Nahtlose Integration mit Jira Software (DevOps)",
      "Flexibel anpassbar über Workflows",
      "Große Community und Marketplace für Add-ons",
    ],
    cons: [
      "Kein dediziertes NIS2/DORA-Modul",
      "Compliance-Features nur über Drittanbieter-Apps",
      "Kann bei großen Organisationen unübersichtlich werden",
    ],
    bestFor: "Entwicklungsteams und KMU die bereits Atlassian-Produkte nutzen",
    headquarter: "Sydney, Australien (Büro in München)",
  },
];

/* ── Risikomanagement ── */
const riskTools: SoftwareTool[] = [
  {
    name: "Archer (RSA)",
    slug: "archer",
    logo: "🎯",
    faviconUrl: "https://www.google.com/s2/favicons?domain=archerirm.com&sz=64",
    url: "https://www.archerirm.com",
    affiliateUrl: "https://www.archerirm.com/?ref=eu-compliance-hub",
    tagline: "Enterprise Integrated Risk Management",
    description:
      "Archer (ehemals RSA Archer) ist der Enterprise-Standard für integriertes Risikomanagement. Umfassende GRC-Plattform für Risikobewertung, Compliance-Tracking und Audit-Management.",
    priceRange: "ab ca. 30.000 €/Jahr",
    priceNote: "Enterprise-Lizenzierung, stark anpassbar",
    targetSize: "Enterprise",
    regulations: ["NIS2", "DORA", "AI Act", "ISO 27001"],
    ratings: { usability: 2, features: 5, support: 4, priceValue: 2, dachRelevance: 4 },
    pros: [
      "Umfassendste GRC-Plattform am Markt",
      "Hochgradig konfigurierbar für jede Regulierung",
      "Bewährt bei Banken, Versicherungen und KRITIS",
      "Starkes Risiko-Quantifizierungs-Modul",
    ],
    cons: [
      "Sehr hoher Preis und lange Implementierung",
      "Veraltete UI, steile Lernkurve",
      "Benötigt dediziertes Admin-Team",
    ],
    bestFor: "Banken, Versicherungen und KRITIS-Unternehmen mit komplexem Risikomanagement",
    headquarter: "Houston, USA",
  },
  {
    name: "LogicGate Risk Cloud",
    slug: "logicgate",
    logo: "☁️",
    faviconUrl: "https://www.google.com/s2/favicons?domain=logicgate.com&sz=64",
    url: "https://www.logicgate.com",
    affiliateUrl: "https://www.logicgate.com/?ref=eu-compliance-hub",
    tagline: "Agiles GRC für den Mittelstand",
    description:
      "LogicGate Risk Cloud bietet eine No-Code-GRC-Plattform die sich schnell an neue Regulierungen anpassen lässt. Ideal für Unternehmen die von Spreadsheets auf eine professionelle Lösung umsteigen.",
    priceRange: "ab ca. 15.000 €/Jahr",
    priceNote: "Modulbasiertes Pricing",
    targetSize: "Mittelstand",
    regulations: ["NIS2", "DORA", "CRA"],
    ratings: { usability: 4, features: 4, support: 4, priceValue: 3, dachRelevance: 3 },
    pros: [
      "No-Code-Plattform — schnelle Anpassung ohne Entwickler",
      "Moderne UI und intuitive Bedienung",
      "Schnelle Implementierung (Wochen statt Monate)",
      "Gute Reporting-Funktionen",
    ],
    cons: [
      "Weniger Tiefe als Enterprise-Lösungen (Archer)",
      "Noch kein dediziertes DACH-Team",
      "Begrenzte lokale Integrationen",
    ],
    bestFor: "Mittelständler die agiles Risikomanagement ohne Programmierung suchen",
    headquarter: "Chicago, USA",
  },
  {
    name: "RiskOptics (ehem. Reciprocity)",
    slug: "riskoptics",
    logo: "📊",
    faviconUrl: "https://www.google.com/s2/favicons?domain=reciprocity.com&sz=64",
    url: "https://reciprocity.com",
    affiliateUrl: "https://reciprocity.com/?ref=eu-compliance-hub",
    tagline: "ZenGRC — GRC Made Simple",
    description:
      "RiskOptics ZenGRC vereinfacht Governance, Risk & Compliance mit einer übersichtlichen Plattform. Gap-Analysen, Kontrollen-Management und Risikobewertung in einem intuitiven Interface.",
    priceRange: "ab ca. 8.000 €/Jahr",
    priceNote: "Günstigster Einstieg in professionelles GRC",
    targetSize: "KMU & Mittelstand",
    regulations: ["NIS2", "ISO 27001", "DSGVO"],
    ratings: { usability: 5, features: 3, support: 3, priceValue: 4, dachRelevance: 2 },
    pros: [
      "Einfachste Bedienung aller GRC-Tools",
      "Günstiger Einstiegspreis",
      "Gute Gap-Analyse-Funktionen",
      "Framework-Mappings (ISO 27001, SOC 2, etc.)",
    ],
    cons: [
      "Weniger Features als Archer oder LogicGate",
      "Begrenzte Automatisierung",
      "Kaum DACH-spezifische Inhalte oder Support",
    ],
    bestFor: "KMU die erstmals ein GRC-Tool einführen und einfachen Einstieg suchen",
    headquarter: "San Francisco, USA",
  },
];

/* ── Comparison Categories ── */
export const comparisonCategories: Record<string, ComparisonCategory> = {
  "isms-software-vergleich": {
    slug: "isms-software-vergleich",
    title: "ISMS & Compliance-Software im Vergleich 2026",
    metaTitle: "ISMS-Software Vergleich 2026 — Vanta vs. Drata vs. DataGuard vs. OneTrust",
    metaDescription:
      "Die 4 besten ISMS- und Compliance-Plattformen für NIS2, DSGVO und ISO 27001 im Vergleich. Features, Preise, Vor- und Nachteile für DACH-Unternehmen.",
    intro:
      "Ein Information Security Management System (ISMS) ist die Basis für NIS2-, DSGVO- und ISO 27001-Compliance. Die richtige Software spart Monate an Aufwand und macht Audits zum Spaziergang. Wir vergleichen die vier führenden Plattformen für den DACH-Raum.",
    regulations: ["NIS2", "DSGVO", "ISO 27001"],
    tools: ismsTools,
    featureHeaders: [
      "ISO 27001",
      "SOC 2",
      "DSGVO-Modul",
      "NIS2-Support",
      "Continuous Monitoring",
      "Externer DSB",
      "API-Integrationen",
      "DACH-Support (DE)",
      "AI Governance",
      "Free Trial",
    ],
    featureMatrix: {
      vanta:     [true,  true,  true,  false, true,  false, true,  false, false, true],
      drata:     [true,  true,  true,  false, true,  false, true,  false, false, true],
      dataguard: [true,  false, true,  true,  true,  true,  false, true,  false, true],
      onetrust:  [true,  false, true,  true,  true,  false, true,  true,  true,  false],
    },
  },
  "incident-management-vergleich": {
    slug: "incident-management-vergleich",
    title: "Incident-Management-Software im Vergleich 2026",
    metaTitle: "Incident Management Vergleich 2026 — ServiceNow vs. PagerDuty vs. Jira SM",
    metaDescription:
      "Incident-Management-Tools für NIS2-Meldepflichten und DORA im Vergleich: ServiceNow, PagerDuty und Jira Service Management. Features, Preise und Empfehlung.",
    intro:
      "NIS2 verlangt eine Frühwarnung innerhalb von 24 Stunden, DORA fordert formalisiertes IKT-Incident-Management. Die richtige Software automatisiert Erkennung, Eskalation und Meldung — und schützt vor Bußgeldern.",
    regulations: ["NIS2", "DORA"],
    tools: incidentTools,
    featureHeaders: [
      "ITSM-Vollsuite",
      "Alerting & Eskalation",
      "AIOps",
      "Change Management",
      "CMDB/Assets",
      "NIS2-Workflows",
      "API-Integrationen",
      "DACH-Support (DE)",
      "Free Tier",
      "On-Premise Option",
    ],
    featureMatrix: {
      servicenow: [true,  true,  true,  true,  true,  true,  true,  true,  false, true],
      pagerduty:  [false, true,  true,  false, false, false, true,  false, true,  false],
      "jira-sm":  [true,  true,  false, true,  true,  false, true,  false, true,  true],
    },
  },
  "risikomanagement-vergleich": {
    slug: "risikomanagement-vergleich",
    title: "Risikomanagement-Software im Vergleich 2026",
    metaTitle: "GRC & Risikomanagement Vergleich 2026 — Archer vs. LogicGate vs. RiskOptics",
    metaDescription:
      "GRC- und Risikomanagement-Tools für NIS2 und DORA im Vergleich: Archer, LogicGate Risk Cloud und RiskOptics ZenGRC. Funktionen, Preise, Empfehlung.",
    intro:
      "NIS2 und DORA fordern ein dokumentiertes Risikomanagement. Die richtige GRC-Software hilft bei Risikobewertung, Kontrollen-Tracking und Audit-Vorbereitung — und macht aus einer Pflicht einen Wettbewerbsvorteil.",
    regulations: ["NIS2", "DORA", "CRA"],
    tools: riskTools,
    featureHeaders: [
      "Risikobewertung",
      "Kontrollen-Management",
      "Audit-Management",
      "No-Code Anpassung",
      "Risiko-Quantifizierung",
      "Third-Party-Risk",
      "Reporting Dashboard",
      "DACH-Support (DE)",
      "Framework-Mappings",
      "Free Trial",
    ],
    featureMatrix: {
      archer:     [true,  true,  true,  false, true,  true,  true,  true,  true,  false],
      logicgate:  [true,  true,  true,  true,  false, true,  true,  false, true,  true],
      riskoptics: [true,  true,  false, false, false, false, true,  false, true,  true],
    },
  },
};

export function getAllComparisonSlugs(): string[] {
  return Object.keys(comparisonCategories);
}
