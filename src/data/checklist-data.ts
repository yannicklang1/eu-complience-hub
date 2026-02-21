/* ══════════════════════════════════════════════════════════════
   Checklist Data — Shared Module
   Extracted from ChecklistTool.tsx for reuse in
   Report Engine + API routes
   ══════════════════════════════════════════════════════════════ */

export interface CheckItem {
  id: string;
  text: string;
  hint?: string;
}

export interface RegulationChecklist {
  key: string;
  title: string;
  shortTitle: string;
  description: string;
  accent: string;
  icon: string;
  href: string;
  deadline?: string;
  items: CheckItem[];
}

export const CHECKLIST_REGULATIONS: RegulationChecklist[] = [
  {
    key: "nis2",
    title: "NIS2 / NISG 2026",
    shortTitle: "NIS2",
    description: "Netz- und Informationssicherheit für wesentliche und wichtige Einrichtungen",
    accent: "#3b82f6",
    icon: "🛡️",
    href: "/nisg-2026",
    deadline: "17. Oktober 2025",
    items: [
      { id: "nis2-1", text: "Betroffenheitsprüfung durchgeführt (Sektor, Größe, Umsatz)", hint: "Nutzen Sie unseren NIS2 Betroffenheits-Check" },
      { id: "nis2-2", text: "Risikomanagement-Framework implementiert" },
      { id: "nis2-3", text: "Incident-Response-Plan erstellt (72h-Meldefrist)" },
      { id: "nis2-4", text: "Business Continuity Management (BCM) eingerichtet" },
      { id: "nis2-5", text: "Supply-Chain-Sicherheit bewertet" },
      { id: "nis2-6", text: "Geschäftsleitung im Cybersecurity geschult (Haftung!)" },
      { id: "nis2-7", text: "Technische Maßnahmen: MFA, Verschlüsselung, Netzwerksegmentierung" },
      { id: "nis2-8", text: "Meldepflichten und Kontakt zur Behörde definiert" },
    ],
  },
  {
    key: "dsgvo",
    title: "DSGVO",
    shortTitle: "DSGVO",
    description: "Datenschutz-Grundverordnung — Schutz personenbezogener Daten",
    accent: "#8b5cf6",
    icon: "🔒",
    href: "/dsgvo",
    items: [
      { id: "dsgvo-1", text: "Verarbeitungsverzeichnis (Art. 30) aktuell und vollständig" },
      { id: "dsgvo-2", text: "Datenschutz-Folgenabschätzung (DSFA) bei Hochrisiko-Verarbeitung" },
      { id: "dsgvo-3", text: "Auftragsverarbeiter-Verträge (AVV) mit allen Dienstleistern" },
      { id: "dsgvo-4", text: "Einwilligungsmanagement (Cookie-Banner, Opt-In) rechtskonform" },
      { id: "dsgvo-5", text: "Datenschutzerklärung aktuell und vollständig" },
      { id: "dsgvo-6", text: "Betroffenenrechte-Prozess implementiert (Auskunft, Löschung)" },
      { id: "dsgvo-7", text: "Technisch-organisatorische Maßnahmen (TOMs) dokumentiert" },
      { id: "dsgvo-8", text: "Data-Breach-Notifikation (72h) vorbereitet" },
    ],
  },
  {
    key: "ai-act",
    title: "EU AI Act",
    shortTitle: "AI Act",
    description: "KI-Verordnung — Regulierung von Künstlicher Intelligenz",
    accent: "#06b6d4",
    icon: "🤖",
    href: "/eu-ai-act",
    deadline: "August 2025 (Verbote), August 2026 (Hochrisiko)",
    items: [
      { id: "ai-1", text: "AI-Systeme inventarisiert und Risikoklasse bestimmt" },
      { id: "ai-2", text: "Verbotene KI-Praktiken ausgeschlossen (Social Scoring etc.)" },
      { id: "ai-3", text: "Hochrisiko-Systeme mit Konformitätsbewertung" },
      { id: "ai-4", text: "Transparenzpflichten für Chatbots/Deepfakes umgesetzt" },
      { id: "ai-5", text: "AI Literacy für Mitarbeiter sichergestellt" },
      { id: "ai-6", text: "Dokumentationspflichten und technische Doku erstellt" },
      { id: "ai-7", text: "Menschliche Aufsicht bei KI-Entscheidungen gewährleistet" },
    ],
  },
  {
    key: "dora",
    title: "DORA",
    shortTitle: "DORA",
    description: "Digital Operational Resilience Act — IT-Resilienz im Finanzsektor",
    accent: "#f59e0b",
    icon: "🏦",
    href: "/dora",
    deadline: "17. Januar 2025 (in Kraft)",
    items: [
      { id: "dora-1", text: "IKT-Risikomanagement-Rahmenwerk aufgebaut" },
      { id: "dora-2", text: "IKT-Vorfallmeldung an Aufsichtsbehörde vorbereitet" },
      { id: "dora-3", text: "Threat-Led Penetration Testing (TLPT) geplant" },
      { id: "dora-4", text: "Drittparteien-IKT-Risikomanagement implementiert" },
      { id: "dora-5", text: "Register kritischer IKT-Dienstleister geführt" },
      { id: "dora-6", text: "Business-Continuity- und Disaster-Recovery-Pläne getestet" },
    ],
  },
  {
    key: "cra",
    title: "Cyber Resilience Act",
    shortTitle: "CRA",
    description: "Cybersicherheit für Produkte mit digitalen Elementen",
    accent: "#ef4444",
    icon: "🖥️",
    href: "/cra",
    deadline: "September 2026 (Meldepflichten), September 2027 (vollständig)",
    items: [
      { id: "cra-1", text: "Produkte mit digitalen Elementen identifiziert" },
      { id: "cra-2", text: "Security-by-Design in Entwicklungsprozess integriert" },
      { id: "cra-3", text: "Schwachstellen-Management-Prozess eingerichtet" },
      { id: "cra-4", text: "Software-Stückliste (SBOM) erstellt" },
      { id: "cra-5", text: "Sicherheitsupdates für den Supportzeitraum geplant" },
      { id: "cra-6", text: "Konformitätsbewertung für die Produktkategorie vorbereitet" },
    ],
  },
  {
    key: "csrd",
    title: "CSRD / ESG",
    shortTitle: "CSRD",
    description: "Nachhaltigkeitsberichterstattung nach European Sustainability Reporting Standards",
    accent: "#10b981",
    icon: "🌿",
    href: "/csrd-esg",
    deadline: "Ab 2024 (große Unternehmen), Ab 2025 (KMU)",
    items: [
      { id: "csrd-1", text: "Betroffenheit nach Unternehmensgröße geprüft" },
      { id: "csrd-2", text: "Doppelte Wesentlichkeitsanalyse durchgeführt" },
      { id: "csrd-3", text: "ESRS-Datenpunkte identifiziert und erfasst" },
      { id: "csrd-4", text: "ESG-Datenerhebungsprozesse aufgesetzt" },
      { id: "csrd-5", text: "Prüfer/Wirtschaftsprüfer für Nachhaltigkeitsbericht ausgewählt" },
      { id: "csrd-6", text: "Taxonomie-Konformität der Wirtschaftstätigkeiten geprüft" },
    ],
  },
];
