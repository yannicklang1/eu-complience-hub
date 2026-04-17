/* ══════════════════════════════════════════════════════════════
   Regulation Evaluator — Shared Logic
   Extracted from RegulierungFinderTool.tsx for reuse in
   Report Engine + API routes
   Dynamic reason texts reference actual company answers
   ══════════════════════════════════════════════════════════════ */

export interface Answer {
  questionId: string;
  values: string[];
}

/** Optional deep-personalization signals (added in v2 — questions 6-11) */
export interface PersonalizationSignals {
  /** Active certifications (iso-27001, soc2, tisax, vds, bsi, c5, …) */
  certifications?: string[];
  /** IT stack (aws, azure, gcp, m365, on-premise, hybrid, eu-cloud) */
  itStack?: string[];
  /** Third-country data export (us, uk, ch, india, china, other-third, no-export) */
  dataExportCountries?: string[];
  /** Incident history last 24 months (data-breach, ransomware, phishing, …) */
  incidentHistory?: string[];
  /** Product categories (batteries, textiles, electronics, ebooks, terminals, medical, …) */
  productCategories?: string[];
  /** Marketing claims (climate-neutral, sustainable, green, recyclable, eco-labels, offset) */
  marketingClaims?: string[];
  /** Is the entity listed / Public Interest Entity? */
  isListed?: boolean;
}

export interface EvaluatedRegulation {
  key: string;
  name: string;
  subtitle: string;
  href: string;
  relevance: "hoch" | "mittel" | "niedrig";
  color: string;
  reason: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: "single" | "multi";
  options: { value: string; label: string; description?: string }[];
}

/* ── Label Lookups ── */
const SIZE_LABELS: Record<string, string> = {
  micro: "Kleinstunternehmen (< 10 MA)",
  small: "Kleinunternehmen (10–49 MA)",
  medium: "Mittleres Unternehmen (50–249 MA)",
  large: "Grossunternehmen (250+ MA)",
};

const SECTOR_LABELS: Record<string, string> = {
  it: "IT/Software",
  finance: "Finanzwesen",
  health: "Gesundheitswesen",
  energy: "Energie",
  manufacturing: "Produktion/Industrie",
  transport: "Transport/Logistik",
  retail: "Handel/E-Commerce",
  telecom: "Telekommunikation",
  public: "Oeffentlicher Sektor",
  other: "Andere",
};

const DATA_LABELS: Record<string, string> = {
  personal: "personenbezogene Daten",
  sensitive: "besondere Datenkategorien (Gesundheit, Biometrie)",
  children: "Daten von Minderjaehrigen",
  financial: "Finanzdaten",
  b2b: "B2B-Geschaeftsdaten",
  iot: "IoT-/Sensordaten",
};

/* ── Questions ── */
export const QUESTIONS: Question[] = [
  {
    id: "size",
    title: "Wie groß ist Ihr Unternehmen?",
    subtitle: "Mitarbeiterzahl und Jahresumsatz bestimmen viele Pflichten",
    type: "single",
    options: [
      { value: "micro", label: "Kleinstunternehmen", description: "< 10 Mitarbeiter, < 2 Mio. € Umsatz" },
      { value: "small", label: "Kleinunternehmen", description: "10–49 Mitarbeiter, < 10 Mio. € Umsatz" },
      { value: "medium", label: "Mittleres Unternehmen", description: "50–249 Mitarbeiter, < 50 Mio. € Umsatz" },
      { value: "large", label: "Großunternehmen", description: "250+ Mitarbeiter oder > 50 Mio. € Umsatz" },
    ],
  },
  {
    id: "sector",
    title: "In welcher Branche sind Sie tätig?",
    subtitle: "Wählen Sie alle zutreffenden Bereiche",
    type: "multi",
    options: [
      { value: "it", label: "IT / Software / Cloud" },
      { value: "finance", label: "Finanzwesen / Versicherung" },
      { value: "health", label: "Gesundheitswesen / Pharma" },
      { value: "energy", label: "Energie / Versorgung" },
      { value: "manufacturing", label: "Produktion / Industrie" },
      { value: "transport", label: "Transport / Logistik" },
      { value: "retail", label: "Handel / E-Commerce" },
      { value: "telecom", label: "Telekommunikation" },
      { value: "public", label: "Öffentlicher Sektor" },
      { value: "other", label: "Andere Branche" },
    ],
  },
  {
    id: "data",
    title: "Welche Daten verarbeiten Sie?",
    subtitle: "Wählen Sie alle zutreffenden Kategorien",
    type: "multi",
    options: [
      { value: "personal", label: "Personenbezogene Daten", description: "Kunden, Mitarbeiter, Nutzer" },
      { value: "sensitive", label: "Besondere Kategorien", description: "Gesundheit, Religion, Biometrie" },
      { value: "children", label: "Daten von Minderjährigen" },
      { value: "financial", label: "Finanzdaten / Zahlungsdaten" },
      { value: "b2b", label: "Nur B2B-/Geschäftsdaten" },
      { value: "iot", label: "IoT-/Sensordaten" },
    ],
  },
  {
    id: "activities",
    title: "Welche Aktivitäten treffen auf Sie zu?",
    subtitle: "Wählen Sie alle zutreffenden Tätigkeiten",
    type: "multi",
    options: [
      { value: "ai", label: "Einsatz oder Entwicklung von KI-Systemen" },
      { value: "software", label: "Software- oder Hardware-Produkte mit digitalen Elementen" },
      { value: "critical-infra", label: "Betrieb kritischer Infrastruktur" },
      { value: "online-platform", label: "Online-Plattform / Marktplatz / Soziales Netzwerk" },
      { value: "esg", label: "Nachhaltigkeitsberichterstattung / ESG" },
      { value: "crypto", label: "Krypto-Assets / Blockchain / DeFi" },
      { value: "cross-border", label: "Grenzüberschreitender Datenverkehr" },
      { value: "ecommerce", label: "Elektronischer Geschäftsverkehr" },
      { value: "eid", label: "Elektronische Identifizierung / Vertrauensdienste" },
    ],
  },
  {
    id: "location",
    title: "Wo ist Ihr Unternehmen ansässig / tätig?",
    subtitle: "Wählen Sie alle zutreffenden Regionen",
    type: "multi",
    options: [
      { value: "at", label: "Österreich" },
      { value: "de", label: "Deutschland" },
      { value: "eu", label: "Anderer EU-/EWR-Staat" },
      { value: "non-eu", label: "Außerhalb der EU (mit EU-Kunden)" },
    ],
  },
];

/* ── Helper: format sector list ── */
function formatSectors(sectors: string[], max = 3): string {
  const labels = sectors.map((s) => SECTOR_LABELS[s] ?? s).slice(0, max);
  return labels.join(", ") + (sectors.length > max ? ` (+${sectors.length - max})` : "");
}

/* ── Helper: format data types ── */
function formatDataTypes(data: string[], max = 3): string {
  const labels = data.map((d) => DATA_LABELS[d] ?? d).slice(0, max);
  return labels.join(", ");
}

/* ── Evaluation Logic ── */
export function evaluateRegulations(
  answers: Answer[],
  signals: PersonalizationSignals = {},
): EvaluatedRegulation[] {
  const get = (id: string): string[] =>
    answers.find((a) => a.questionId === id)?.values ?? [];

  const size = get("size")[0] ?? "small";
  const sectors = get("sector");
  const data = get("data");
  const activities = get("activities");
  const locations = get("location");

  const certs = signals.certifications ?? [];
  const itStack = signals.itStack ?? [];
  const exports = signals.dataExportCountries ?? [];
  const incidents = signals.incidentHistory ?? [];
  const products = signals.productCategories ?? [];
  const claims = signals.marketingClaims ?? [];
  const isListed = signals.isListed ?? false;

  /* Product-based derived signals */
  const hasPhysicalProducts = products.length > 0 && !products.includes("none");
  const hasDPPProducts = ["batteries", "textiles", "electronics", "furniture", "building", "chemicals"].some((p) => products.includes(p));
  const hasBaFGProducts = products.includes("ebooks") || products.includes("terminals");
  const hasHardwareProducts = products.some((p) => ["hardware-consumer", "hardware-b2b", "electronics", "medical"].includes(p));
  const hasSoftwareProducts = products.includes("software-product");
  const hasMedicalDevices = products.includes("medical");

  const hasClaims = claims.length > 0 && !claims.includes("none");
  const hasStrongClaims = claims.some((c) => ["climate-neutral", "sustainable", "green"].includes(c));

  const hasISO27001 = certs.includes("iso-27001") || certs.includes("iso-27701");
  const hasTISAX = certs.includes("tisax");
  const hasSOC2 = certs.includes("soc2");
  const hasVdS = certs.includes("vds");
  const hasBSI = certs.includes("bsi") || certs.includes("c5");
  const hasStrongCert = hasISO27001 || hasTISAX || hasSOC2 || hasBSI;
  const hasBasicCert = hasStrongCert || hasVdS;

  const hasUSExport = exports.includes("us");
  const hasRiskyExport = exports.includes("india") || exports.includes("china") || exports.includes("other-third");

  const hasUSCloud = itStack.some((s) => ["aws", "azure", "gcp", "m365", "google-workspace"].includes(s));
  const hasEUCloud = itStack.includes("eu-cloud");

  const hadDataBreach = incidents.includes("data-breach") || incidents.includes("dsb-complaint");
  const hadRansomware = incidents.includes("ransomware");

  const results: EvaluatedRegulation[] = [];
  const isEU = locations.some((l) => ["at", "de", "eu"].includes(l));
  const hasEUCustomers = locations.includes("non-eu") || isEU;
  const sizeLabel = SIZE_LABELS[size] ?? size;

  /* ── DSGVO ── */
  if (data.some((d) => ["personal", "sensitive", "children", "financial"].includes(d)) && hasEUCustomers) {
    const relevantData = data.filter((d) => ["personal", "sensitive", "children", "financial"].includes(d));
    const hasSensitive = data.includes("sensitive") || data.includes("children");
    let reason = `Als ${sizeLabel} verarbeiten Sie ${formatDataTypes(relevantData)} mit EU-Bezug.`;
    if (hasSensitive) {
      reason += ` Durch die Verarbeitung besonderer Datenkategorien gelten verschaerfte Pflichten (Art. 9 DSGVO), insbesondere Datenschutz-Folgenabschaetzungen.`;
    } else {
      reason += ` Dies umfasst Pflichten zu Verarbeitungsverzeichnis (Art. 30), Betroffenenrechte (Art. 15–22) und Datenschutz-Folgenabschaetzungen bei Hochrisiko-Verarbeitungen.`;
    }
    /* Personalize: US cloud + data export = Kapitel V kritisch */
    if (hasUSExport || hasUSCloud) {
      reason += ` Durch die Nutzung US-amerikanischer Anbieter/Datentransfers greift DSGVO Kapitel V (Art. 44–49): EU-US Data Privacy Framework (DPF) oder Standardvertragsklauseln (SCC) mit Transfer Impact Assessment (TIA) sind zwingend erforderlich.`;
    }
    if (hasRiskyExport) {
      reason += ` Datentransfers in Drittländer ohne Angemessenheitsbeschluss (z.B. Indien, China) erfordern SCC + TIA und ggf. zusätzliche Schutzmaßnahmen.`;
    }
    if (hadDataBreach) {
      reason += ` Dokumentierter Datenschutzvorfall in den letzten 24 Monaten — DSB-Kommunikation, Dokumentation nach Art. 33/34 und verschärfte Aufsichtsprüfungen sind wahrscheinlich.`;
    }
    if (hasISO27001) {
      reason += ` Vorhandene ISO/IEC 27001-Zertifizierung kann als Basis für TOMs (Art. 32) angerechnet werden — Gap vor allem bei Privacy-by-Design (Art. 25).`;
    }
    results.push({
      key: "dsgvo",
      name: "DSGVO",
      subtitle: "Datenschutz-Grundverordnung",
      href: "/dsgvo",
      relevance: "hoch",
      color: "#2563eb",
      reason,
    });
  }

  /* ── NIS2 / NISG 2026 ── */
  const nis2Sectors = ["it", "energy", "health", "transport", "finance", "telecom", "public"];
  const isNis2Sector = sectors.some((s) => nis2Sectors.includes(s));
  const isNis2Size = ["medium", "large"].includes(size);
  const isCriticalInfra = activities.includes("critical-infra");
  const matchedNis2Sectors = sectors.filter((s) => nis2Sectors.includes(s));

  if ((isNis2Sector && isNis2Size) || isCriticalInfra) {
    let reason: string;
    if (isCriticalInfra) {
      reason = `Als Betreiber kritischer Infrastruktur fallen Sie als "wesentliche Einrichtung" gemaess NIS2 Art. 3 unter die strengsten Pflichten.`;
    } else {
      const category = size === "large" ? "wesentliche Einrichtung" : "wichtige Einrichtung";
      reason = `Als ${sizeLabel} im Sektor ${formatSectors(matchedNis2Sectors)} fallen Sie als "${category}" unter NIS2 Art. 3.`;
    }
    reason += ` Dies umfasst Risikomanagement (Art. 21), Meldepflichten innerhalb 24h/72h (Art. 23) und persoenliche Verantwortung der Geschaeftsleitung (Art. 20).`;
    /* Personalize: certifications reduce effort, incidents increase priority */
    if (hasISO27001) {
      reason += ` Ihre ISO/IEC 27001-Zertifizierung deckt etwa 60–75% der NIS2 Art. 21-Maßnahmen ab — Lücken insbesondere bei Lieferantensicherheit (Art. 21 Abs. 2 lit. d) und GF-Schulung (Art. 20).`;
    } else if (hasBasicCert) {
      reason += ` Mit VdS 10000/10010 als Basis lassen sich die 10 NIS2-Kernmaßnahmen pragmatisch ausrollen — ISO 27001 ist nicht zwingend, aber beschleunigt Audits.`;
    }
    if (hadRansomware || hadDataBreach) {
      reason += ` Dokumentierter Sicherheitsvorfall in den letzten 24 Monaten — NIS2 Art. 23 Meldepflicht wäre rückwirkend relevant gewesen; Priorität für Incident-Response-Prozesse steigt.`;
    }
    if (hasUSCloud && !hasEUCloud) {
      reason += ` Starker US-Cloud-Anteil erhöht Third-Party-Risk — NIS2 Art. 21 Abs. 2 lit. d verlangt explizites Lieferantenrisikomanagement.`;
    }
    results.push({
      key: "nis2",
      name: "NIS2 / NISG 2026",
      subtitle: "Netz- und Informationssicherheit",
      href: "/nisg-2026",
      relevance: "hoch",
      color: "#dc2626",
      reason,
    });
  } else if (isNis2Sector && !isNis2Size) {
    results.push({
      key: "nis2",
      name: "NIS2 / NISG 2026",
      subtitle: "Netz- und Informationssicherheit",
      href: "/nisg-2026",
      relevance: "niedrig",
      color: "#dc2626",
      reason: `Ihr Sektor ${formatSectors(matchedNis2Sectors)} faellt unter NIS2, aber als ${sizeLabel} liegen Sie unter den Groessenschwellenwerten (50 MA / 10 Mio. EUR Umsatz). Beobachten Sie nationale Umsetzungsgesetze — einige Mitgliedstaaten koennen niedrigere Schwellenwerte festlegen.`,
    });
  }

  /* ── AI Act ── */
  if (activities.includes("ai")) {
    const hasSensitiveAI = data.includes("sensitive") || data.includes("children");
    let reason = `Als ${sizeLabel} setzen Sie KI-Systeme ein oder entwickeln solche. Die EU-KI-Verordnung verlangt eine Risikoklassifizierung aller KI-Systeme und stuft bestimmte Anwendungen als hochriskant ein.`;
    if (hasSensitiveAI) {
      reason += ` Durch die Verarbeitung sensibler Daten sind erhoehte Transparenz- und Dokumentationspflichten wahrscheinlich.`;
    }
    reason += ` Verbotene KI-Praktiken (Art. 5) gelten bereits seit Februar 2025.`;
    results.push({
      key: "ai-act",
      name: "EU AI Act",
      subtitle: "KI-Verordnung",
      href: "/eu-ai-act",
      relevance: "hoch",
      color: "#7c3aed",
      reason,
    });
  }

  /* ── DORA ── */
  if (sectors.includes("finance") || (sectors.includes("it") && data.includes("financial"))) {
    const isDirect = sectors.includes("finance");
    let reason: string;
    if (isDirect) {
      reason = `Als ${sizeLabel} im Finanzsektor fallen Sie direkt unter DORA. Sie muessen ein IKT-Risikomanagement-Framework (Art. 6–16) aufbauen, Vorfaelle an die Aufsichtsbehoerde melden (Art. 17–23) und Threat-Led Penetration Tests durchfuehren.`;
    } else {
      reason = `Als IT-Dienstleister mit Zugang zu Finanzdaten koennten Sie als "kritischer IKT-Drittanbieter" gemaess Art. 31 DORA gelten. Dies umfasst direkte Aufsicht durch europaeische Finanzbehoerden und strenge vertragliche Anforderungen.`;
    }
    results.push({
      key: "dora",
      name: "DORA",
      subtitle: "Digital Operational Resilience Act",
      href: "/dora",
      relevance: isDirect ? "hoch" : "mittel",
      color: "#0891b2",
      reason,
    });
  }

  /* ── CRA — nur echte Produkt-Hersteller (Software-Produkt/Hardware/Medical/IoT) ── */
  {
    const craRelevant =
      hasSoftwareProducts ||
      hasHardwareProducts ||
      (activities.includes("software") && hasPhysicalProducts) ||
      (sectors.includes("manufacturing") && (activities.includes("ai") || hasPhysicalProducts));
    if (craRelevant) {
      let reason = `Als Hersteller/Inverkehrbringer von Produkten mit digitalen Elementen fallen Sie unter den Cyber Resilience Act (VO 2024/2847). Pflichten: Security-by-Design (Art. 10), SBOM (Software Bill of Materials), 24h-Meldung aktiv ausgenutzter Schwachstellen an ENISA (ab Sep. 2026), kostenlose Sicherheitsupdates über den gesamten Supportzeitraum, CE-Kennzeichnung ab 11. Dez. 2027.`;
      if (hasMedicalDevices) {
        reason += ` Als Hersteller von Medizinprodukten fallen Sie unter die strengeren Annex-III-Vorgaben (Klasse I oder II).`;
      }
      if (hasSoftwareProducts && !hasHardwareProducts) {
        reason += ` Hinweis: Reine SaaS-Dienste sind ausgenommen — der CRA trifft Software-Produkte, die "in Verkehr gebracht" werden (z.B. Plugins, Apps zum Download, Firmware).`;
      }
      if (sectors.includes("manufacturing")) {
        reason += ` Als Industrieunternehmen sind zusätzlich die Anforderungen an vernetzte Produktionssysteme (OT/IoT) relevant.`;
      }
      results.push({
        key: "cra",
        name: "Cyber Resilience Act",
        subtitle: "Cybersicherheit für Produkte",
        href: "/cra",
        relevance: "hoch",
        color: "#ea580c",
        reason,
      });
    }
  }

  /* ── CSRD / ESG (Omnibus-konforme Schwelle: >1.000 MA + (>50M Umsatz ODER >25M Bilanzsumme)) ── */
  {
    // Post-Omnibus threshold: only 1000+ MA. "large" in unserem Schema = 250+ MA → reicht nicht zwingend.
    // Wenn employeeCount explizit "1000+" ist (bekommen wir aktuell nicht getrennt) oder sehr klar large + isListed, direct.
    const isDirectCSRD = isListed || (size === "large" && isEU); // konservative Annahme: listed = höchstes Risiko
    const isScopeRelevant = activities.includes("esg") || isDirectCSRD;
    if (isScopeRelevant) {
      let reason: string;
      if (isDirectCSRD) {
        const trigger = isListed
          ? "Als börsennotiertes/PIE-Unternehmen fallen Sie unter erweiterte Offenlegungspflichten."
          : `Als ${sizeLabel} in der EU sind Sie potenziell direkt betroffen.`;
        reason = `${trigger} Nach dem am 24. Februar 2026 final verabschiedeten EU-Omnibus-Paket gilt die CSRD-Berichtspflicht nur noch fuer Unternehmen mit > 1.000 Mitarbeitern und > 50 Mio. € Umsatz oder > 25 Mio. € Bilanzsumme. Pflichten: doppelte Wesentlichkeitsanalyse, ESRS-Berichterstattung, Scope-1/2/3-Emissionen, externe Pruefung.`;
      } else {
        reason = `Durch Ihre ESG-/Nachhaltigkeitsaktivitaeten als ${sizeLabel} kann die CSRD-Berichterstattung ueber die Lieferkette (VSME-Standard) relevant werden. Seit dem EU-Omnibus-Paket (Feb. 2026) sind boersennotierte KMU komplett vom Anwendungsbereich ausgenommen; Lieferkettenanfragen an geschuetzte KMU sind auf VSME-Informationen begrenzt.`;
      }
      results.push({
        key: "csrd",
        name: "CSRD / ESG",
        subtitle: "Nachhaltigkeitsberichterstattung",
        href: "/csrd-esg",
        relevance: isDirectCSRD ? "hoch" : "mittel",
        color: "#16a34a",
        reason,
      });
    }
  }

  /* ── Green Claims Directive + Empowering Consumers Directive ── */
  if (hasClaims) {
    let reason: string;
    if (hasStrongClaims) {
      reason = `Als ${sizeLabel} verwenden Sie explizite Umweltaussagen ("klimaneutral", "nachhaltig", "grün"). Die Green Claims Directive und die Empowering Consumers Directive (EU 2024/825) verlangen wissenschaftliche Nachweise, Substantiierung nach Lebenszyklusanalyse und unabhängige Verifizierung. Ohne Nachweis: Verbot der Aussage ab März 2026, Bußgelder bis 4% Umsatz (UWG/national).`;
    } else {
      reason = `Als ${sizeLabel} bewerben Sie Produkte mit Umwelt- oder Nachhaltigkeitsmerkmalen. Die Empowering Consumers Directive verlangt, dass jede umweltbezogene Aussage eindeutig, substantiiert und belegbar ist. CO2-Kompensation darf ab 2026 nicht mehr als Alleinstellungsmerkmal vermarktet werden.`;
    }
    results.push({
      key: "green-claims",
      name: "Green Claims",
      subtitle: "Anti-Greenwashing-Richtlinie",
      href: "/green-claims",
      relevance: hasStrongClaims ? "hoch" : "mittel",
      color: "#059669",
      reason,
    });
  }

  /* ── Digitaler Produktpass (DPP / ESPR) ── */
  if (hasDPPProducts) {
    const affectedCategories = products.filter((p) =>
      ["batteries", "textiles", "electronics", "furniture", "building", "chemicals"].includes(p),
    );
    const categoryNames: Record<string, string> = {
      batteries: "Batterien (ab Feb. 2027)",
      textiles: "Textilien (ab 2027/2028)",
      electronics: "Elektronik (ab 2028)",
      furniture: "Möbel (ESPR)",
      building: "Bauprodukte (ESPR + BauPVO)",
      chemicals: "Chemikalien (ESPR)",
    };
    const catsText = affectedCategories.map((c) => categoryNames[c] ?? c).join(", ");
    const reason = `Als Hersteller/Inverkehrbringer von ${catsText} fallen Sie unter die Ecodesign-for-Sustainable-Products-Regulation (ESPR) und den Digitalen Produktpass (DPP). Pflichten: Produktdaten in maschinenlesbarer Form (QR/NFC), Reparierbarkeits-, Recyclingfähigkeits- und Haltbarkeitsangaben, CO2-Fußabdruck je Produkt. Erste Delegated Acts für Batterien treten Februar 2027 in Kraft.`;
    results.push({
      key: "dpp",
      name: "Digitaler Produktpass / ESPR",
      subtitle: "Ecodesign for Sustainable Products",
      href: "/digitaler-produktpass",
      relevance: "hoch",
      color: "#14b8a6",
      reason,
    });
  }

  /* ── BaFG (Barrierefreiheit) — Services + spezifische Produkte ── */
  {
    const hasBaFGService = activities.includes("ecommerce") || sectors.includes("finance") || sectors.includes("telecom");
    if (hasBaFGService || hasBaFGProducts) {
      const isMicro = size === "micro";
      const trigger = hasBaFGProducts
        ? `Sie stellen ${products.includes("ebooks") ? "E-Books" : ""}${products.includes("ebooks") && products.includes("terminals") ? " und " : ""}${products.includes("terminals") ? "Self-Service-/Zahlungsterminals" : ""} her — diese Produkte sind explizit im Anwendungsbereich des EAA.`
        : `Als Anbieter digitaler Dienste (E-Commerce/Bank/Telekom) fallen Sie unter die Service-Pflichten des EAA.`;
      results.push({
        key: "bafg",
        name: "BaFG",
        subtitle: "Barrierefreiheitsgesetz / European Accessibility Act",
        href: "/bafg",
        relevance: isMicro && !hasBaFGProducts ? "mittel" : "hoch",
        color: "#2563eb",
        reason: isMicro && !hasBaFGProducts
          ? `Das Barrierefreiheitsgesetz (EAA) gilt seit 28. Juni 2025. ${trigger} Als Kleinstunternehmen (< 10 MA / < 2 Mio. € Umsatz) sind Sie fuer Dienstleistungen ausgenommen — bei Produkten (Hardware/E-Books) gelten jedoch weiterhin Anforderungen an Barrierefreiheit (WCAG 2.1 AA / EN 301 549).`
          : `Das Barrierefreiheitsgesetz (EAA) ist seit 28. Juni 2025 in Kraft. ${trigger} Als ${sizeLabel} muessen Sie eine Konformitaetserklaerung (EAA Annex II), technische Dokumentation und einen Barriere-Meldekanal bereithalten. Barrierefreiheit nach WCAG 2.1 AA / EN 301 549.`,
      });
    }
  }

  /* ── HSchG (Hinweisgeberschutz) — Schwelle 50 MA ── */
  if (size === "medium" || size === "large") {
    results.push({
      key: "hschg",
      name: "HSchG / HinSchG",
      subtitle: "Hinweisgeberschutz (Whistleblower)",
      href: "/hschg",
      relevance: size === "large" ? "hoch" : "mittel",
      color: "#a855f7",
      reason: `Als ${sizeLabel} (ab 50 Mitarbeitern) muessen Sie gemaess HSchG (AT) / HinSchG (DE) einen internen Meldekanal fuer Hinweisgeber einrichten. Dies umfasst anonyme Meldemoeglichkeiten, Bearbeitung binnen 3 Monaten und Schutz vor Repressalien. Fuer 50–249 MA sind gemeinsame Meldestellen zulaessig. Strafen bis 40.000 € (AT) / 500.000 € (DE).`,
    });
  }

  /* ── DSA ── */
  if (activities.includes("online-platform")) {
    results.push({
      key: "dsa",
      name: "Digital Services Act",
      subtitle: "Plattformregulierung",
      href: "/dsa",
      relevance: "hoch",
      color: "#6366f1",
      reason: `Als Betreiber einer Online-Plattform bzw. eines Marktplatzes fallen Sie unter den DSA. Pflichten umfassen Transparenzberichte (Art. 15), ein Notice-and-Action-System fuer rechtswidrige Inhalte (Art. 16), Beschwerdeverfahren (Art. 20) und ein Verbot von Dark Patterns (Art. 25).`,
    });
  }

  /* ── MiCA ── */
  if (activities.includes("crypto")) {
    results.push({
      key: "mica",
      name: "MiCA",
      subtitle: "Markets in Crypto-Assets",
      href: "/mica",
      relevance: "hoch",
      color: "#f59e0b",
      reason: `Als ${sizeLabel} im Bereich Krypto-Assets/Blockchain muessen Sie gemaess MiCA eine Zulassung als CASP (Crypto-Asset Service Provider) beantragen, AML/KYC-Anforderungen erfuellen und die Travel Rule umsetzen. Whitepapers fuer Token-Emissionen sind genehmigungspflichtig.`,
    });
  }

  /* ── Data Act ── */
  if (data.includes("iot") || (sectors.includes("manufacturing") && hasEUCustomers)) {
    const isIoT = data.includes("iot");
    let reason: string;
    if (isIoT) {
      reason = `Sie verarbeiten IoT-/Sensordaten und muessen gemaess Data Act (Art. 3–7) Nutzern Zugang zu den generierten Daten gewaehren. Dies umfasst standardisierte Datenformate, faire Vertragsbedingungen und ein Recht auf Datenweitergabe an Dritte.`;
    } else {
      reason = `Als Produkthersteller im Sektor ${formatSectors(sectors)} koennten Datenzugangspflichten gemaess dem Data Act auf Sie zukommen, insbesondere wenn Ihre Produkte Nutzungsdaten generieren.`;
    }
    results.push({
      key: "data-act",
      name: "Data Act",
      subtitle: "Datenzugangsverordnung",
      href: "/data-act",
      relevance: isIoT ? "hoch" : "mittel",
      color: "#0d9488",
      reason,
    });
  }

  /* ── ePrivacy ── */
  if (activities.includes("ecommerce") || data.includes("personal")) {
    const isDirectlyAffected = activities.includes("ecommerce");
    results.push({
      key: "eprivacy",
      name: "ePrivacy",
      subtitle: "Datenschutz in der elektronischen Kommunikation",
      href: "/eprivacy",
      relevance: isDirectlyAffected ? "mittel" : "niedrig",
      color: "#8b5cf6",
      reason: isDirectlyAffected
        ? `Als E-Commerce-Unternehmen gelten fuer Sie ePrivacy-Pflichten zu Cookies, Tracking und elektronischer Direktwerbung. Ein rechtskonformes Consent-Management (Cookie-Banner mit Opt-In) ist zwingend erforderlich.`
        : `Die ePrivacy-Regelungen zu Cookies und Tracking betreffen auch Ihre Website. Ein DSGVO-konformes Cookie-Banner mit echtem Opt-In ist Pflicht.`,
    });
  }

  /* ── eIDAS ── */
  if (activities.includes("eid") || sectors.includes("public")) {
    const isEid = activities.includes("eid");
    results.push({
      key: "eidas",
      name: "eIDAS 2.0",
      subtitle: "Elektronische Identifizierung",
      href: "/eidas",
      relevance: isEid ? "hoch" : "mittel",
      color: "#059669",
      reason: isEid
        ? `Als Anbieter elektronischer Identifizierung oder Vertrauensdienste muessen Sie die eIDAS-2.0-Anforderungen erfuellen, einschliesslich der EU Digital Identity Wallet-Kompatibilitaet und qualifizierter elektronischer Signaturen.`
        : `Im oeffentlichen Sektor wird die EU Digital Identity Wallet ab 2026 verpflichtend akzeptiert. Bereiten Sie Ihre Systeme auf eIDAS-2.0-konforme Identifizierung vor.`,
    });
  }

  /* ── Produkthaftung — bei Software-Produkten, Hardware, Manufacturing ── */
  if (hasSoftwareProducts || hasHardwareProducts || activities.includes("software") || sectors.includes("manufacturing")) {
    const trigger = hasSoftwareProducts
      ? "Software-Produkte unterliegen erstmals der verschuldensunabhängigen Produkthaftung."
      : hasHardwareProducts
      ? "Ihre Hardware-Produkte fallen unter die novellierte EU-Produkthaftung."
      : `Als ${sizeLabel} im Bereich ${formatSectors(sectors)} tragen Sie die neue Produkthaftung.`;
    results.push({
      key: "produkthaftung",
      name: "EU-Produkthaftung",
      subtitle: "Neue Produkthaftungsrichtlinie",
      href: "/produkthaftung",
      relevance: hasSoftwareProducts || hasMedicalDevices ? "hoch" : "mittel",
      color: "#b91c1c",
      reason: `${trigger} Die novellierte EU-Produkthaftungsrichtlinie (EU 2024/2853, Umsetzung bis Dez. 2026) erstreckt sich erstmals auch auf Software, KI-Systeme und digitale Bauteile als eigenständige Produkte. Beweislasterleichterungen stärken die Position geschädigter Verbraucher; Herstellerhaftung nun auch für mangelhafte Sicherheitsupdates.`,
    });
  }

  /* ── EHDS ── */
  if (sectors.includes("health")) {
    results.push({
      key: "ehds",
      name: "EHDS",
      subtitle: "European Health Data Space",
      href: "/ehds",
      relevance: "mittel",
      color: "#0ea5e9",
      reason: `Als ${sizeLabel} im Gesundheitswesen wird der Europaeische Gesundheitsdatenraum (EHDS) relevant. Primaere Nutzung (Patientenportabilitaet) und sekundaere Nutzung (Forschungszugang) erfordern interoperable Systeme und FHIR-kompatible Datenformate.`,
    });
  }

  /* ── Sort by relevance ── */
  const order = { hoch: 0, mittel: 1, niedrig: 2 };
  results.sort((a, b) => order[a.relevance] - order[b.relevance]);

  return results;
}
