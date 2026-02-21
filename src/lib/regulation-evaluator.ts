/* ══════════════════════════════════════════════════════════════
   Regulation Evaluator — Shared Logic
   Extracted from RegulierungFinderTool.tsx for reuse in
   Report Engine + API routes
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

  /* ── DSGVO ── */
  if (data.some((d) => ["personal", "sensitive", "children", "financial"].includes(d)) && hasEUCustomers) {
    results.push({
      key: "dsgvo",
      name: "DSGVO",
      subtitle: "Datenschutz-Grundverordnung",
      href: "/dsgvo",
      relevance: "hoch",
      color: "#2563eb",
      reason: "Sie verarbeiten personenbezogene Daten mit EU-Bezug.",
    });
  }

  /* ── NIS2 / NISG 2026 ── */
  const nis2Sectors = ["it", "energy", "health", "transport", "finance", "telecom", "public"];
  const isNis2Sector = sectors.some((s) => nis2Sectors.includes(s));
  const isNis2Size = ["medium", "large"].includes(size);
  const isCriticalInfra = activities.includes("critical-infra");

  if ((isNis2Sector && isNis2Size) || isCriticalInfra) {
    results.push({
      key: "nis2",
      name: "NIS2 / NISG 2026",
      subtitle: "Netz- und Informationssicherheit",
      href: "/nisg-2026",
      relevance: "hoch",
      color: "#dc2626",
      reason: isNis2Size
        ? "Ihr Unternehmen fällt aufgrund von Branche und Größe unter NIS2."
        : "Sie betreiben kritische Infrastruktur.",
    });
  } else if (isNis2Sector && !isNis2Size) {
    results.push({
      key: "nis2",
      name: "NIS2 / NISG 2026",
      subtitle: "Netz- und Informationssicherheit",
      href: "/nisg-2026",
      relevance: "niedrig",
      color: "#dc2626",
      reason: "Ihre Branche fällt unter NIS2, aber Ihr Unternehmen liegt unter den Schwellenwerten.",
    });
  }

  /* ── AI Act ── */
  if (activities.includes("ai")) {
    results.push({
      key: "ai-act",
      name: "EU AI Act",
      subtitle: "KI-Verordnung",
      href: "/eu-ai-act",
      relevance: "hoch",
      color: "#7c3aed",
      reason: "Sie setzen KI-Systeme ein oder entwickeln solche.",
    });
  }

  /* ── DORA ── */
  if (sectors.includes("finance") || (sectors.includes("it") && data.includes("financial"))) {
    results.push({
      key: "dora",
      name: "DORA",
      subtitle: "Digital Operational Resilience Act",
      href: "/dora",
      relevance: sectors.includes("finance") ? "hoch" : "mittel",
      color: "#0891b2",
      reason: sectors.includes("finance")
        ? "Als Finanzunternehmen fallen Sie direkt unter DORA."
        : "Als IT-Dienstleister für Finanzunternehmen könnten Sie als kritischer IKT-Drittanbieter gelten.",
    });
  }

  /* ── CRA ── */
  if (activities.includes("software") || (sectors.includes("manufacturing") && activities.includes("ai"))) {
    results.push({
      key: "cra",
      name: "Cyber Resilience Act",
      subtitle: "Cybersicherheit für Produkte",
      href: "/cra",
      relevance: "hoch",
      color: "#ea580c",
      reason: "Sie stellen Produkte mit digitalen Elementen her oder vertreiben diese.",
    });
  }

  /* ── CSRD / ESG ── */
  if (activities.includes("esg") || (size === "large" && isEU)) {
    results.push({
      key: "csrd",
      name: "CSRD / ESG",
      subtitle: "Nachhaltigkeitsberichterstattung",
      href: "/csrd-esg",
      relevance: size === "large" ? "hoch" : "mittel",
      color: "#16a34a",
      reason: size === "large"
        ? "Als großes EU-Unternehmen sind Sie zur Nachhaltigkeitsberichterstattung verpflichtet."
        : "Nachhaltigkeitsberichterstattung könnte für Sie relevant werden.",
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
      reason: "Als Online-Plattform oder Marktplatz fallen Sie unter den DSA.",
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
      reason: "Sie sind im Bereich Krypto-Assets / Blockchain tätig.",
    });
  }

  /* ── Data Act ── */
  if (data.includes("iot") || (sectors.includes("manufacturing") && hasEUCustomers)) {
    results.push({
      key: "data-act",
      name: "Data Act",
      subtitle: "Datenzugangsverordnung",
      href: "/data-act",
      relevance: data.includes("iot") ? "hoch" : "mittel",
      color: "#0d9488",
      reason: data.includes("iot")
        ? "Sie verarbeiten IoT-/Sensordaten und müssen Datenzugang gewähren."
        : "Als Produkthersteller könnten Datenzugangspflichten auf Sie zukommen.",
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
        ? "Für elektronischen Geschäftsverkehr gelten ePrivacy-Pflichten (Cookies, Tracking)."
        : "Cookie-/Tracking-Regelungen betreffen auch Ihre Website.",
    });
  }

  /* ── eIDAS ── */
  if (activities.includes("eid") || sectors.includes("public")) {
    results.push({
      key: "eidas",
      name: "eIDAS 2.0",
      subtitle: "Elektronische Identifizierung",
      href: "/eidas",
      relevance: activities.includes("eid") ? "hoch" : "mittel",
      color: "#059669",
      reason: activities.includes("eid")
        ? "Sie bieten elektronische Identifizierung oder Vertrauensdienste an."
        : "Im öffentlichen Sektor sind eIDAS-konforme Identifizierungen relevant.",
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
      reason: "Die neue Produkthaftungsrichtlinie erstreckt sich auch auf Software und digitale Produkte.",
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
      reason: "Im Gesundheitswesen wird der EU-Gesundheitsdatenraum relevant.",
    });
  }

  /* ── Sort by relevance ── */
  const order = { hoch: 0, mittel: 1, niedrig: 2 };
  results.sort((a, b) => order[a.relevance] - order[b.relevance]);

  return results;
}
