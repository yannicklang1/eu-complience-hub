/* ═══════════════════════════════════════════════════════════════════
   Programmatic SEO — Branchen × Regulierungen Datenbasis
   ~80+ einzigartige Landingpages für Long-Tail Keywords
   ═══════════════════════════════════════════════════════════════════ */

/* ── Regulation definitions ── */
export interface Regulation {
  slug: string;
  name: string;
  fullName: string;
  /** German grammatical article: "der", "die", or "das" */
  artikel: "der" | "die" | "das";
  accent: string;
  guideHref: string;
  maxFine: string;
  deadline: string;
  shortDesc: string;
}

export const regulations: Record<string, Regulation> = {
  nis2: {
    slug: "nis2",
    name: "NIS2 / NISG 2026",
    fullName: "Netz- und Informationssicherheitsgesetz 2026",
    artikel: "das",
    accent: "#0ea5e9",
    guideHref: "/nisg-2026",
    maxFine: "10 Mio. € oder 2% des Jahresumsatzes",
    deadline: "1. Oktober 2026",
    shortDesc: "Cybersicherheits-Pflichten für wesentliche und wichtige Einrichtungen",
  },
  "ai-act": {
    slug: "ai-act",
    name: "EU AI Act",
    fullName: "Verordnung über Künstliche Intelligenz (EU) 2024/1689",
    artikel: "der",
    accent: "#0A2540",
    guideHref: "/eu-ai-act",
    maxFine: "35 Mio. € oder 7% des Jahresumsatzes",
    deadline: "2. August 2026 (Hochrisiko-KI)",
    shortDesc: "Regulierung von KI-Systemen nach Risikoklassen",
  },
  dora: {
    slug: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act (EU) 2022/2554",
    artikel: "der",
    accent: "#10b981",
    guideHref: "/dora",
    maxFine: "5 Mio. € oder 1% des Jahresumsatzes (+ persönliche Haftung)",
    deadline: "17. Januar 2025 (bereits in Kraft)",
    shortDesc: "Digitale Betriebsresilienz für den Finanzsektor",
  },
  cra: {
    slug: "cra",
    name: "CRA",
    fullName: "Cyber Resilience Act (EU) 2024/2847",
    artikel: "der",
    accent: "#8b5cf6",
    guideHref: "/cra",
    maxFine: "15 Mio. € oder 2,5% des Jahresumsatzes",
    deadline: "11. Dezember 2027",
    shortDesc: "Cybersicherheit für Produkte mit digitalen Elementen",
  },
};

/* ── Industry definitions ── */
export interface Branche {
  slug: string;
  name: string;
  icon: string; // SVG icon identifier
  /** Which regulations are especially relevant */
  relevantRegulations: string[];
  /** Typical company size for fine calculation */
  typicalRevenue: number; // in EUR
  typicalRevenueLabel: string;
  /** NIS2 sector classification */
  nis2Sector?: "annex1" | "annex2";
  nis2SectorName?: string;
  /** Short intro for SEO */
  seoDescription: string;
}

export const branchen: Record<string, Branche> = {
  maschinenbau: {
    slug: "maschinenbau",
    name: "Maschinenbau",
    icon: "gear",
    relevantRegulations: ["nis2", "ai-act", "cra"],
    typicalRevenue: 50_000_000,
    typicalRevenueLabel: "50 Mio. €",
    nis2Sector: "annex2",
    nis2SectorName: "Verarbeitendes Gewerbe / Herstellung von Waren",
    seoDescription: "EU-Compliance für Maschinenbauer: NIS2-Pflichten, AI Act für smarte Maschinen, CRA für vernetzte Produkte. Fristen, Strafen und Handlungsschritte.",
  },
  finanzdienstleistung: {
    slug: "finanzdienstleistung",
    name: "Finanzdienstleistung",
    icon: "bank",
    relevantRegulations: ["nis2", "dora", "ai-act"],
    typicalRevenue: 100_000_000,
    typicalRevenueLabel: "100 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Bankwesen / Finanzmarktinfrastrukturen",
    seoDescription: "DORA, NIS2 und AI Act für Finanzdienstleister: IKT-Risikomanagement, Meldepflichten, KI-Scoring und Compliance-Fahrplan.",
  },
  gesundheitswesen: {
    slug: "gesundheitswesen",
    name: "Gesundheitswesen",
    icon: "medical",
    relevantRegulations: ["nis2", "ai-act", "cra"],
    typicalRevenue: 30_000_000,
    typicalRevenueLabel: "30 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Gesundheitssektor",
    seoDescription: "NIS2 und AI Act im Gesundheitswesen: Schutz von Patientendaten, KI-Diagnostik als Hochrisiko-KI, Cybersicherheit für Krankenhäuser.",
  },
  "it-software": {
    slug: "it-software",
    name: "IT & Software",
    icon: "code",
    relevantRegulations: ["nis2", "ai-act", "cra"],
    typicalRevenue: 20_000_000,
    typicalRevenueLabel: "20 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Digitale Infrastruktur / IKT-Dienste",
    seoDescription: "CRA, AI Act und NIS2 für Softwareunternehmen: Sicherheitspflichten für digitale Produkte, KI-Regulierung, Patch-Management.",
  },
  energie: {
    slug: "energie",
    name: "Energiewirtschaft",
    icon: "bolt",
    relevantRegulations: ["nis2", "ai-act"],
    typicalRevenue: 200_000_000,
    typicalRevenueLabel: "200 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Energie (Strom, Öl, Gas, Wasserstoff, Fernwärme)",
    seoDescription: "NIS2-Pflichten für Energieunternehmen: KRITIS-Einstufung, Cybersicherheit für Netzbetreiber, Smart-Grid-KI und Compliance.",
  },
  logistik: {
    slug: "logistik",
    name: "Logistik & Transport",
    icon: "truck",
    relevantRegulations: ["nis2", "ai-act", "cra"],
    typicalRevenue: 80_000_000,
    typicalRevenueLabel: "80 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Verkehr (Luft, Schiene, Wasser, Straße)",
    seoDescription: "NIS2 und AI Act für Logistikunternehmen: Cybersicherheit in Lieferketten, autonome Fahrzeuge, vernetzte Flotten und Meldepflichten.",
  },
  handel: {
    slug: "handel",
    name: "Handel & E-Commerce",
    icon: "cart",
    relevantRegulations: ["ai-act", "cra"],
    typicalRevenue: 40_000_000,
    typicalRevenueLabel: "40 Mio. €",
    seoDescription: "AI Act und CRA für Handelsunternehmen: KI-gestützte Preisgestaltung, Produktsicherheit im E-Commerce, vernetzte IoT-Geräte.",
  },
  telekommunikation: {
    slug: "telekommunikation",
    name: "Telekommunikation",
    icon: "signal",
    relevantRegulations: ["nis2", "ai-act", "cra"],
    typicalRevenue: 500_000_000,
    typicalRevenueLabel: "500 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Digitale Infrastruktur (TK-Anbieter)",
    seoDescription: "NIS2 für Telekommunikationsanbieter: KRITIS-Pflichten, Netzwerksicherheit, 24h-Meldepflicht, CRA für Netzwerkgeräte.",
  },
  pharma: {
    slug: "pharma",
    name: "Pharma & Life Sciences",
    icon: "flask",
    relevantRegulations: ["nis2", "ai-act", "cra"],
    typicalRevenue: 150_000_000,
    typicalRevenueLabel: "150 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Gesundheitssektor (Pharmazeutische Unternehmen)",
    seoDescription: "AI Act und NIS2 für Pharmaunternehmen: KI in der Arzneimittelentwicklung, Cybersicherheit in der Produktion, Lieferkettenschutz.",
  },
  automotive: {
    slug: "automotive",
    name: "Automotive & Mobilität",
    icon: "car",
    relevantRegulations: ["ai-act", "cra", "nis2"],
    typicalRevenue: 300_000_000,
    typicalRevenueLabel: "300 Mio. €",
    nis2Sector: "annex2",
    nis2SectorName: "Verarbeitendes Gewerbe / Herstellung von Waren",
    seoDescription: "AI Act und CRA für die Automobilbranche: Autonomes Fahren als Hochrisiko-KI, Cybersicherheit vernetzter Fahrzeuge, Software-Updates.",
  },
  bauwesen: {
    slug: "bauwesen",
    name: "Bauwesen & Immobilien",
    icon: "crane",
    relevantRegulations: ["ai-act", "cra"],
    typicalRevenue: 25_000_000,
    typicalRevenueLabel: "25 Mio. €",
    seoDescription: "AI Act und CRA im Bauwesen: BIM-KI, smarte Gebäudetechnik, IoT-Sicherheit und Compliance-Pflichten für Bauunternehmen.",
  },
  lebensmittel: {
    slug: "lebensmittel",
    name: "Lebensmittel & Agrar",
    icon: "wheat",
    relevantRegulations: ["nis2", "ai-act"],
    typicalRevenue: 60_000_000,
    typicalRevenueLabel: "60 Mio. €",
    nis2Sector: "annex2",
    nis2SectorName: "Produktion, Verarbeitung und Vertrieb von Lebensmitteln",
    seoDescription: "NIS2 und AI Act für die Lebensmittelbranche: Lieferkettensicherheit, KI in der Qualitätskontrolle, Cybersicherheit in der Produktion.",
  },
  versicherung: {
    slug: "versicherung",
    name: "Versicherungen",
    icon: "shield-check",
    relevantRegulations: ["dora", "nis2", "ai-act"],
    typicalRevenue: 200_000_000,
    typicalRevenueLabel: "200 Mio. €",
    nis2Sector: "annex1",
    nis2SectorName: "Bankwesen / Finanzmarktinfrastrukturen",
    seoDescription: "DORA und AI Act für Versicherungen: IKT-Risikomanagement, KI-Scoring, automatisierte Schadensabwicklung und Compliance.",
  },
  verwaltung: {
    slug: "verwaltung",
    name: "Öffentliche Verwaltung",
    icon: "landmark",
    relevantRegulations: ["nis2", "ai-act"],
    typicalRevenue: 0,
    typicalRevenueLabel: "n/a (öffentlich)",
    nis2Sector: "annex1",
    nis2SectorName: "Öffentliche Verwaltung (Zentralregierung)",
    seoDescription: "NIS2 und AI Act für die öffentliche Verwaltung: Cybersicherheit für Behörden, KI im Verwaltungsverfahren, Transparenzpflichten.",
  },
  beratung: {
    slug: "beratung",
    name: "Beratung & Professional Services",
    icon: "clipboard",
    relevantRegulations: ["ai-act", "nis2"],
    typicalRevenue: 15_000_000,
    typicalRevenueLabel: "15 Mio. €",
    seoDescription: "AI Act und NIS2 für Beratungsunternehmen: KI-gestützte Analysen, Datenschutz bei Kundenberatung, Compliance als Dienstleistung.",
  },
  medien: {
    slug: "medien",
    name: "Medien & Verlagswesen",
    icon: "monitor",
    relevantRegulations: ["ai-act"],
    typicalRevenue: 20_000_000,
    typicalRevenueLabel: "20 Mio. €",
    seoDescription: "AI Act für Medienunternehmen: Generative KI, Deepfake-Kennzeichnung, Transparenzpflichten und Content-Moderation.",
  },
  bildung: {
    slug: "bildung",
    name: "Bildung & Forschung",
    icon: "graduation",
    relevantRegulations: ["ai-act"],
    typicalRevenue: 10_000_000,
    typicalRevenueLabel: "10 Mio. €",
    seoDescription: "AI Act für Bildungseinrichtungen: KI im Prüfungswesen, automatisierte Bewertungen als Hochrisiko-KI, Forschungsausnahmen.",
  },
};

/* ── Branche × Regulation content templates ── */

export interface BranchenRegContent {
  /** SEO page title */
  title: string;
  /** SEO meta description (max 160 chars) */
  metaDescription: string;
  /** Hero subtitle */
  heroSubtitle: string;
  /** Why this regulation matters for this industry */
  relevanceIntro: string;
  /** Key affected areas (3-5 bullet points) */
  affectedAreas: { title: string; description: string }[];
  /** Industry-specific obligations (3-6 items) */
  obligations: { title: string; description: string }[];
  /** Fine calculation context */
  fineContext: string;
  /** 3-step compliance roadmap */
  roadmap: { phase: string; title: string; description: string }[];
  /** FAQ items (3-5) */
  faq: { q: string; a: string }[];
}

/** Generates the content object for a specific industry × regulation combo */
export function getBranchenRegContent(
  branche: Branche,
  regulation: Regulation
): BranchenRegContent {
  const b = branche.name;
  const r = regulation.name;
  const rFull = regulation.fullName;

  // Master template with industry/regulation-specific content
  return contentMap[`${branche.slug}__${regulation.slug}`] ?? generateGenericContent(branche, regulation);
}

/* ── Generic content generator for any combo ── */
function generateGenericContent(b: Branche, r: Regulation): BranchenRegContent {
  const fine = b.typicalRevenue > 0
    ? formatFine(b.typicalRevenue, r.slug)
    : r.maxFine;

  return {
    title: `${r.name} für ${b.name} — Was Sie jetzt wissen müssen`,
    metaDescription: `${r.name} Compliance für ${b.name}: Pflichten, Fristen bis ${r.deadline}, Strafen bis ${r.maxFine}. Konkrete Handlungsschritte für Ihr Unternehmen.`,
    heroSubtitle: `Was ${r.artikel} ${r.fullName} für Unternehmen der Branche ${b.name} bedeutet — und welche Schritte Sie jetzt einleiten müssen.`,
    relevanceIntro: getRelevanceIntro(b, r),
    affectedAreas: getAffectedAreas(b, r),
    obligations: getObligations(b, r),
    fineContext: `Bei einem typischen Jahresumsatz von ${b.typicalRevenueLabel} beträgt das maximale Bußgeld gemäß ${r.name}: ${fine}. Die tatsächliche Höhe richtet sich nach der Schwere des Verstoßes, der Dauer und den ergriffenen Abhilfemaßnahmen.`,
    roadmap: getRoadmap(b, r),
    faq: getFaq(b, r),
  };
}

/* ── Fine calculation helpers ── */
function formatFine(revenue: number, regSlug: string): string {
  const rules: Record<string, { fixed: number; percent: number }> = {
    nis2: { fixed: 10_000_000, percent: 2 },
    "ai-act": { fixed: 35_000_000, percent: 7 },
    dora: { fixed: 5_000_000, percent: 1 },
    cra: { fixed: 15_000_000, percent: 2.5 },
  };
  const rule = rules[regSlug];
  if (!rule) return "siehe Verordnungstext";
  const calc = Math.max(rule.fixed, revenue * rule.percent / 100);
  if (calc >= 1_000_000_000) return `${(calc / 1_000_000_000).toFixed(1)} Mrd. €`;
  if (calc >= 1_000_000) return `${(calc / 1_000_000).toFixed(0)} Mio. €`;
  return `${calc.toLocaleString("de-DE")} €`;
}

export function formatEuro(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} Mrd. €`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)} Mio. €`;
  return `${value.toLocaleString("de-DE")} €`;
}

export function calculateMaxFine(revenue: number, regSlug: string): number {
  const rules: Record<string, { fixed: number; percent: number }> = {
    nis2: { fixed: 10_000_000, percent: 2 },
    "ai-act": { fixed: 35_000_000, percent: 7 },
    dora: { fixed: 5_000_000, percent: 1 },
    cra: { fixed: 15_000_000, percent: 2.5 },
  };
  const rule = rules[regSlug];
  if (!rule) return 0;
  return Math.max(rule.fixed, revenue * rule.percent / 100);
}

/* ── German grammar helpers ── */
/** Akkusativ: der→den, die→die, das→das */
function akkusativ(r: Regulation): string {
  return r.artikel === "der" ? "den" : r.artikel;
}
/** Capitalize first letter */
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ── Content generators per regulation type ── */

function getRelevanceIntro(b: Branche, r: Regulation): string {
  const intros: Record<string, string> = {
    nis2: `Die NIS2-Richtlinie und ihre österreichische Umsetzung als NISG 2026 betreffen Unternehmen der Branche ${b.name} direkt${b.nis2Sector ? ` — als ${b.nis2Sector === "annex1" ? "wesentliche" : "wichtige"} Einrichtung gemäß ${b.nis2Sector === "annex1" ? "Anhang I" : "Anhang II"} (${b.nis2SectorName})` : ""}. Ab dem ${r.deadline} gelten verschärfte Cybersicherheitsanforderungen, persönliche Geschäftsführerhaftung und Meldepflichten innerhalb von 24 Stunden.`,
    "ai-act": `Der EU AI Act reguliert KI-Systeme nach einem risikobasierten Ansatz. Für Unternehmen der ${b.name}-Branche sind insbesondere KI-Systeme relevant, die in Produkten, Entscheidungsprozessen oder der Kundeninteraktion eingesetzt werden. Die Hauptdeadline für Hochrisiko-KI ist der ${r.deadline}.`,
    dora: `DORA (Digital Operational Resilience Act) gilt seit Januar 2025 unmittelbar für Finanzunternehmen und deren kritische IKT-Dienstleister. Für ${b.name}-Unternehmen bedeutet dies: umfassendes IKT-Risikomanagement, Incident Reporting, regelmäßige Penetrationstests und Überprüfung von Drittanbieter-Verträgen.`,
    cra: `Der Cyber Resilience Act betrifft alle Hersteller und Importeure von Produkten mit digitalen Elementen. Für ${b.name}-Unternehmen gilt: Jedes vernetzte Produkt muss Security-by-Design erfüllen, Schwachstellen müssen gemeldet und Updates bereitgestellt werden — vom Entwurf bis zum End-of-Life.`,
  };
  return intros[r.slug] ?? `${cap(r.artikel)} ${r.fullName} hat direkte Auswirkungen auf Unternehmen der Branche ${b.name}. Hier erfahren Sie, welche konkreten Pflichten auf Sie zukommen.`;
}

function getAffectedAreas(b: Branche, r: Regulation): { title: string; description: string }[] {
  const areas: Record<string, { title: string; description: string }[]> = {
    nis2: [
      { title: "Netzwerk- & Informationssicherheit", description: `Umfassendes Sicherheitskonzept für alle IT-Systeme und OT-Anlagen in ${b.name}-Unternehmen. Risikobewertung, Zugangskontrollen und Verschlüsselung.` },
      { title: "Incident Response & Meldepflichten", description: "Innerhalb von 24 Stunden Frühwarnung an die Cybersicherheitsbehörde (BMI), innerhalb von 72 Stunden detaillierter Bericht, Abschlussbericht nach 30 Tagen." },
      { title: "Supply Chain Security", description: `Überprüfung aller IT-Dienstleister und Zulieferer auf Cybersicherheits-Standards. Vertragsklauseln zur Sicherheit in der ${b.name}-Lieferkette.` },
      { title: "Geschäftsführer-Haftung", description: "Persönliche Haftung der Geschäftsleitung bei Nichteinhaltung. Verpflichtende Schulungen für Management zu Cybersicherheitsrisiken." },
    ],
    "ai-act": [
      { title: "KI-Bestandsaufnahme", description: `Inventarisierung aller KI-Systeme die in ${b.name}-Unternehmen eingesetzt oder entwickelt werden — von Chatbots bis zu Entscheidungsunterstützungssystemen.` },
      { title: "Risiko-Klassifizierung", description: `Einstufung jeder KI-Anwendung nach dem 4-Stufen-Modell: unzulässig, hochriskant, begrenztes Risiko oder minimal. Im ${b.name}-Bereich sind häufig Hochrisiko-Systeme betroffen.` },
      { title: "Transparenz & Dokumentation", description: "Technische Dokumentation, Datensatz-Dokumentation, EU-Konformitätserklärung und CE-Kennzeichnung für Hochrisiko-KI-Systeme." },
      { title: "Menschliche Aufsicht", description: `Sicherstellung menschlicher Kontrolle über KI-Entscheidungen — besonders kritisch im ${b.name}-Umfeld bei kundenrelevanten Entscheidungen.` },
    ],
    dora: [
      { title: "IKT-Risikomanagement", description: `Aufbau eines umfassenden IKT-Risikomanagement-Frameworks für alle digitalen Systeme im ${b.name}-Bereich. Regelmäßige Bewertung und Aktualisierung.` },
      { title: "Incident Reporting", description: "Klassifizierung und Meldung schwerwiegender IKT-Vorfälle an die zuständige Aufsichtsbehörde (FMA). Definierte Eskalationsprozesse." },
      { title: "Resilience Testing", description: "Regelmäßige Penetrationstests (TLPT — Threat-Led Penetration Testing) und Schwachstellenanalysen für kritische IKT-Systeme." },
      { title: "Drittanbieter-Management", description: `Überprüfung und Überwachung aller IKT-Dienstleister. Vertragliche Mindestanforderungen an Cloud-Provider und Software-Anbieter im ${b.name}-Ökosystem.` },
    ],
    cra: [
      { title: "Security by Design", description: `Cybersicherheit muss ab der Entwurfsphase in alle vernetzten Produkte des ${b.name}-Bereichs integriert werden — nicht erst nachträglich.` },
      { title: "Schwachstellen-Management", description: "Aktives Schwachstellen-Management über den gesamten Produkt-Lebenszyklus: Erkennung, Behebung und transparente Kommunikation." },
      { title: "Software-Updates", description: `Bereitstellung kostenloser Sicherheitsupdates für mindestens 5 Jahre nach Markteinführung — relevant für alle vernetzten ${b.name}-Produkte.` },
      { title: "Konformitätsbewertung", description: "CE-Kennzeichnung, EU-Konformitätserklärung und bei kritischen Produkten (Klasse I/II) Prüfung durch benannte Stellen." },
    ],
  };
  return areas[r.slug] ?? [];
}

function getObligations(b: Branche, r: Regulation): { title: string; description: string }[] {
  const obls: Record<string, { title: string; description: string }[]> = {
    nis2: [
      { title: "Risikomanagement-Maßnahmen implementieren", description: "Art. 21 NIS2: Technische, operative und organisatorische Maßnahmen nach dem All-Hazards-Ansatz — einschließlich Kryptografie, Zugangskontrollen und Netzwerksegmentierung." },
      { title: "Incident Response Plan erstellen", description: "Prozesse für die Erkennung, Analyse und Bewältigung von Sicherheitsvorfällen definieren. Team benennen, Eskalationswege festlegen." },
      { title: "Meldepflichten einrichten", description: "24h-Frühwarnung, 72h-Bericht und Abschlussbericht an die nationale Cybersicherheitsbehörde (BMI). Meldewege technisch vorbereiten." },
      { title: "Lieferketten-Sicherheit gewährleisten", description: `Sicherheitsanforderungen vertraglich in der ${b.name}-Lieferkette verankern. Regelmäßige Überprüfung von IT-Dienstleistern und Zulieferern.` },
      { title: "Management-Schulungen durchführen", description: "Die Geschäftsleitung muss regelmäßig an Cybersicherheits-Schulungen teilnehmen (Art. 20 NIS2). Dokumentation der Teilnahme." },
      { title: "Business Continuity sicherstellen", description: "Backup-Management, Wiederherstellungspläne, Krisenmanagement und Notfallkommunikation aufbauen und regelmäßig testen." },
    ],
    "ai-act": [
      { title: "KI-Inventar erstellen", description: `Alle KI-Systeme im ${b.name}-Unternehmen erfassen: Einsatzzweck, Risikostufe, Anbieter, eingesetzte Daten, betroffene Personen.` },
      { title: "Risikoklassifizierung durchführen", description: "Jedes KI-System anhand Anhang III des AI Act prüfen: Ist es ein verbotenes System, ein Hochrisiko-System oder mit begrenztem Risiko?" },
      { title: "Qualitätsmanagementsystem aufbauen", description: "Für Hochrisiko-KI: Dokumentiertes QMS mit Datenqualität, Monitoring, Risikomanagement und technischer Dokumentation." },
      { title: "Transparenzpflichten umsetzen", description: "Kennzeichnung von KI-generierten Inhalten, Information betroffener Personen über KI-Einsatz, Bereitstellung von Nutzungsanleitungen." },
      { title: "Menschliche Aufsicht einrichten", description: "Qualifiziertes Personal für die Überwachung von Hochrisiko-KI-Systemen bereitstellen. Override-Möglichkeiten sicherstellen." },
    ],
    dora: [
      { title: "IKT-Risikomanagement-Framework aufbauen", description: "Umfassendes Framework gemäß Art. 5-16 DORA: Identifikation, Schutz, Erkennung, Reaktion und Wiederherstellung aller IKT-Assets." },
      { title: "Incident Management einrichten", description: "Klassifizierungssystem für IKT-Vorfälle, Meldeprozesse an die FMA, Root-Cause-Analyse und Lessons Learned." },
      { title: "Digital Resilience Testing durchführen", description: "Jährliche Tests der IKT-Systeme, bei systemrelevanten Instituten: TLPT (Threat-Led Penetration Testing) alle 3 Jahre." },
      { title: "Drittanbieter-Register führen", description: `Vollständiges Register aller IKT-Dienstleister mit Vertragsbewertung, Risikoanalyse und Exit-Strategien für ${b.name}-Unternehmen.` },
      { title: "Informationsaustausch etablieren", description: "Teilnahme an branchenspezifischen Cyber-Threat-Intelligence-Netzwerken und Informationsaustausch gemäß Art. 45 DORA." },
    ],
    cra: [
      { title: "Cybersicherheit in die Produktentwicklung integrieren", description: `Security-by-Design und Security-by-Default für alle ${b.name}-Produkte mit digitalen Elementen ab der Entwurfsphase.` },
      { title: "Schwachstellen-Management aufbauen", description: "Koordinierte Offenlegung von Schwachstellen (CVD), Kontaktstelle für Sicherheitsforscher, SBOM (Software Bill of Materials) pflegen." },
      { title: "Meldepflichten vorbereiten", description: "Aktiv ausgenutzte Schwachstellen innerhalb von 24h an ENISA melden. Interne Prozesse und Zuständigkeiten definieren." },
      { title: "Konformitätserklärung erstellen", description: "Technische Dokumentation, EU-Konformitätserklärung und CE-Kennzeichnung für jedes betroffene Produkt. Bei Klasse I/II: Drittprüfung." },
      { title: "Update-Strategie definieren", description: "Sicherheitsupdates für die erwartete Produktlebensdauer (mind. 5 Jahre) bereitstellen. Automatische Update-Mechanismen implementieren." },
    ],
  };
  return obls[r.slug] ?? [];
}

function getRoadmap(b: Branche, r: Regulation): { phase: string; title: string; description: string }[] {
  return [
    {
      phase: "Phase 1",
      title: "Bestandsaufnahme & Gap-Analyse",
      description: `Erfassen Sie den Ist-Zustand in Ihrem ${b.name}-Unternehmen: Welche Systeme, Prozesse und Produkte fallen unter ${akkusativ(r)} ${r.name}? Wo bestehen Lücken zu den Anforderungen?`,
    },
    {
      phase: "Phase 2",
      title: "Maßnahmenplan & Priorisierung",
      description: `Auf Basis der Gap-Analyse: Konkrete Maßnahmen definieren, Budget planen, Verantwortliche benennen. Priorisierung nach Risiko und Deadline (${r.deadline}).`,
    },
    {
      phase: "Phase 3",
      title: "Umsetzung & Dokumentation",
      description: `Technische und organisatorische Maßnahmen implementieren, Dokumentation erstellen, Mitarbeiter schulen. Regelmäßiges Monitoring und kontinuierliche Verbesserung.`,
    },
  ];
}

function getFaq(b: Branche, r: Regulation): { q: string; a: string }[] {
  const common = [
    {
      q: `Bis wann muss mein ${b.name}-Unternehmen ${r.name}-konform sein?`,
      a: `Die Hauptdeadline ist der ${r.deadline}. Wir empfehlen, spätestens 12 Monate vorher mit der Umsetzung zu beginnen.`,
    },
    {
      q: `Welche Strafe droht bei Nichteinhaltung des ${r.name}?`,
      a: `Das maximale Bußgeld beträgt ${r.maxFine}. Es gilt der jeweils höhere Betrag. Die tatsächliche Strafe hängt von der Schwere des Verstoßes ab.`,
    },
    {
      q: `Brauche ich externe Berater für die ${r.name}-Compliance?`,
      a: `Das hängt von der Unternehmensgröße und vorhandenen Ressourcen ab. Für eine erste Einschätzung nutzen Sie unsere kostenlosen Tools. Bei komplexen Anforderungen empfehlen wir spezialisierte Compliance-Berater.`,
    },
  ];

  const specific: Record<string, { q: string; a: string }[]> = {
    nis2: [
      { q: `Fällt mein ${b.name}-Unternehmen unter NIS2?`, a: `${b.nis2Sector ? `Unternehmen im Bereich ${b.nis2SectorName} sind gemäß ${b.nis2Sector === "annex1" ? "Anhang I (wesentliche Einrichtung)" : "Anhang II (wichtige Einrichtung)"} erfasst — sofern sie die Größenschwelle überschreiten (>50 Mitarbeiter oder >10 Mio. € Umsatz).` : `Die ${b.name}-Branche ist nicht direkt in den NIS2-Anhängen gelistet. Prüfen Sie mit unserem NIS2-Betroffenheits-Check, ob Ihr konkretes Unternehmen betroffen ist.`}` },
      { q: "Haftet die Geschäftsführung persönlich?", a: "Ja. Gemäß Art. 20 NIS2 / §27 NISG 2026 haftet die Geschäftsleitung persönlich für die Einhaltung der Cybersicherheitspflichten. Management-Schulungen sind verpflichtend." },
    ],
    "ai-act": [
      { q: `Ist KI in der ${b.name}-Branche automatisch Hochrisiko?`, a: "Nicht automatisch. Entscheidend ist der Einsatzzweck: KI-Systeme in den in Anhang III gelisteten Bereichen (z.B. Kreditwürdigkeitsprüfung, kritische Infrastruktur, Personalwesen) sind Hochrisiko-KI." },
      { q: "Gilt der AI Act auch für eingekaufte KI-Software?", a: "Ja. Als 'Betreiber' (Deployer) haben Sie eigene Pflichten: Einsatz gemäß Gebrauchsanweisung, menschliche Aufsicht sicherstellen, Eingabedaten relevant halten und Vorfälle melden." },
    ],
    dora: [
      { q: "Gilt DORA auch für kleine Finanzunternehmen?", a: "Grundsätzlich ja, aber es gilt das Proportionalitätsprinzip: Die Anforderungen richten sich nach Größe, Risikoprofil und Art der Finanzdienstleistungen." },
      { q: "Müssen auch Cloud-Provider DORA einhalten?", a: "Kritische IKT-Drittdienstleister (inkl. Cloud-Provider) werden von den europäischen Aufsichtsbehörden (ESAs) direkt überwacht und müssen eigene Anforderungen erfüllen." },
    ],
    cra: [
      { q: "Gilt der CRA auch für Open-Source-Software?", a: "Nicht-kommerzielle Open-Source-Software ist grundsätzlich ausgenommen. Wird OSS jedoch in einem kommerziellen Produkt verwendet, gelten die CRA-Anforderungen für den kommerziellen Anbieter." },
      { q: "Was bedeutet 'Produkte mit digitalen Elementen'?", a: "Jedes Software- oder Hardware-Produkt, das direkt oder indirekt mit einem Netzwerk verbunden werden kann — von IoT-Geräten über Apps bis zu Industriesteuerungen." },
    ],
  };

  return [...common, ...(specific[r.slug] ?? [])];
}

/* ── Static params for generateStaticParams ── */
export function getAllBranchenGesetzParams(): { branche: string; gesetz: string }[] {
  const params: { branche: string; gesetz: string }[] = [];
  for (const b of Object.values(branchen)) {
    for (const regSlug of b.relevantRegulations) {
      if (regulations[regSlug]) {
        params.push({ branche: b.slug, gesetz: regSlug });
      }
    }
  }
  return params;
}

/* ── Optional: custom content overrides for high-value pages ── */
const contentMap: Record<string, BranchenRegContent> = {
  // Will be populated later for the highest-traffic pages
  // e.g. "finanzdienstleistung__dora": { ... }
};
