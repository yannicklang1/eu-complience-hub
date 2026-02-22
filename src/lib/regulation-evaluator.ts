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
export function evaluateRegulations(answers: Answer[]): EvaluatedRegulation[] {
  const get = (id: string): string[] =>
    answers.find((a) => a.questionId === id)?.values ?? [];

  const size = get("size")[0] ?? "small";
  const sectors = get("sector");
  const data = get("data");
  const activities = get("activities");
  const locations = get("location");

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

  /* ── CRA ── */
  if (activities.includes("software") || (sectors.includes("manufacturing") && activities.includes("ai"))) {
    let reason = `Als Hersteller von Produkten mit digitalen Elementen fallen Sie unter den Cyber Resilience Act. Sie muessen Security-by-Design (Art. 10) implementieren, eine SBOM (Software Bill of Materials) fuehren und Sicherheitsupdates waehrend des gesamten Supportzeitraums bereitstellen.`;
    if (sectors.includes("manufacturing")) {
      reason += ` Als Industrieunternehmen sind zusaetzlich die Anforderungen an vernetzte Produktionssysteme relevant.`;
    }
    results.push({
      key: "cra",
      name: "Cyber Resilience Act",
      subtitle: "Cybersicherheit fuer Produkte",
      href: "/cra",
      relevance: "hoch",
      color: "#ea580c",
      reason,
    });
  }

  /* ── CSRD / ESG ── */
  if (activities.includes("esg") || (size === "large" && isEU)) {
    const isDirectCSRD = size === "large";
    let reason: string;
    if (isDirectCSRD) {
      reason = `Als ${sizeLabel} in der EU sind Sie gemaess CSRD zur Nachhaltigkeitsberichterstattung nach ESRS verpflichtet. Dies umfasst eine doppelte Wesentlichkeitsanalyse, Scope-1/2/3-Emissionen und eine externe Pruefung durch Wirtschaftspruefer.`;
    } else {
      reason = `Durch Ihre ESG-/Nachhaltigkeitsaktivitaeten als ${sizeLabel} koennte die CSRD-Berichterstattung ueber die Lieferkette oder freiwillig relevant werden. Ab 2026 sind auch boersennotierte KMU betroffen.`;
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

  /* ── Produkthaftung ── */
  if (activities.includes("software") || sectors.includes("manufacturing")) {
    results.push({
      key: "produkthaftung",
      name: "EU-Produkthaftung",
      subtitle: "Neue Produkthaftungsrichtlinie",
      href: "/produkthaftung",
      relevance: "mittel",
      color: "#b91c1c",
      reason: `Die novellierte EU-Produkthaftungsrichtlinie erstreckt sich erstmals auch auf Software und KI-Systeme als eigenstaendige Produkte. Als ${sizeLabel} im Bereich ${formatSectors(sectors)} tragen Sie eine verschuldensunabhaengige Haftung fuer fehlerhafte Produkte — Beweislasterleichterungen staerken die Position geschaedigter Verbraucher.`,
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
