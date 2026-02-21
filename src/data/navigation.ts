/* ─────────────────── Central Navigation Data ─────────────────── */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: "Neu" | "Live" | "Update";
  accentColor?: string;
}

export interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

export interface NavDropdown {
  label: string;
  groups: NavGroup[];
}

/* ── Regulierungen Dropdown ── */
export const regulierungenDropdown: NavDropdown = {
  label: "Regulierungen",
  groups: [
    {
      id: "kernsaeulen",
      title: "Kernsäulen",
      items: [
        { label: "NISG 2026", href: "/nisg-2026", description: "Cybersicherheit", badge: "Neu", accentColor: "#1e40af" },
        { label: "EU AI Act", href: "/eu-ai-act", description: "KI-Regulierung", accentColor: "#7c3aed" },
        { label: "DORA", href: "/dora", description: "Finanzsektor", badge: "Live", accentColor: "#059669" },
        { label: "CRA", href: "/cra", description: "Digitale Produkte", accentColor: "#ea580c" },
      ],
    },
    {
      id: "datenschutz-compliance",
      title: "Datenschutz & Compliance",
      items: [
        { label: "DSGVO & KI 2026", href: "/dsgvo", description: "Datenschutz + KI", badge: "Update", accentColor: "#7c3aed" },
        { label: "CSRD / ESG", href: "/csrd-esg", description: "Nachhaltigkeitsberichte", badge: "Neu", accentColor: "#16a34a" },
        { label: "BaFG", href: "/bafg", description: "Barrierefreiheit", badge: "Live", accentColor: "#2563eb" },
        { label: "HSchG", href: "/hschg", description: "Hinweisgeberschutz", accentColor: "#d97706" },
      ],
    },
    {
      id: "weitere",
      title: "Weitere Regulierungen",
      items: [
        { label: "GF-Haftung", href: "/haftungs-check", description: "Geschäftsführer-Haftung" },
        { label: "Green Claims", href: "/green-claims", description: "Anti-Greenwashing", badge: "Neu", accentColor: "#059669" },
        { label: "MiCA", href: "/mica", description: "Krypto-Assets", badge: "Neu", accentColor: "#f59e0b" },
        { label: "Produkthaftung (PLD)", href: "/produkthaftung", description: "Software & KI Haftung", badge: "Neu", accentColor: "#ef4444" },
        { label: "Digitaler Produktpass", href: "/digitaler-produktpass", description: "DPP / ESPR", badge: "Neu", accentColor: "#14b8a6" },
      ],
    },
    {
      id: "digital-daten",
      title: "Digital & Daten",
      items: [
        { label: "DSA", href: "/dsa", description: "Plattformregulierung", badge: "Neu", accentColor: "#6366f1" },
        { label: "Data Act", href: "/data-act", description: "IoT & Cloud-Daten", badge: "Neu", accentColor: "#0ea5e9" },
        { label: "ePrivacy", href: "/eprivacy", description: "Cookie & Tracking", badge: "Neu", accentColor: "#a855f7" },
        { label: "eIDAS 2.0", href: "/eidas", description: "EU Digital Identity", badge: "Neu", accentColor: "#0891b2" },
        { label: "EHDS", href: "/ehds", description: "Gesundheitsdaten", badge: "Neu", accentColor: "#ec4899" },
      ],
    },
  ],
};

/* ── Tools Dropdown ── */
export const toolsDropdown: NavDropdown = {
  label: "Tools",
  groups: [
    {
      id: "interaktive-tools",
      title: "Interaktive Tools",
      items: [
        { label: "Regulierung-Finder", href: "/tools/regulierung-finder", description: "Welche Gesetze gelten?", badge: "Neu" },
        { label: "NIS2-Check", href: "/tools/nis2-betroffenheits-check", description: "Betroffenheit prüfen", badge: "Neu" },
        { label: "Compliance-Checkliste", href: "/tools/compliance-checkliste", description: "Alle Pflichten prüfen", badge: "Neu" },
        { label: "Haftungs-Prüfer", href: "/tools/haftungs-pruefer", description: "Persönliches Risiko" },
        { label: "Bußgeld-Rechner", href: "/tools/bussgeld-rechner", description: "Strafrahmen berechnen" },
        { label: "Kosten-Kalkulator", href: "/tools/kosten-kalkulator", description: "Compliance-Budget planen", badge: "Neu" },
        { label: "Reifegrad-Check", href: "/tools/reifegrad-check", description: "Compliance-Reifegrad messen", badge: "Neu" },
      ],
    },
    {
      id: "verzeichnisse",
      title: "Verzeichnisse & Radar",
      items: [
        { label: "Software-Vergleich", href: "/tools/isms-software-vergleich", description: "ISMS & Compliance Tools" },
        { label: "Compliance-Verzeichnis", href: "/compliance-verzeichnis", description: "Auditoren & Berater" },
        { label: "Compliance-Glossar", href: "/glossar", description: "Fachbegriffe erklärt", badge: "Neu" },
        { label: "Fristen-Radar", href: "/fristen-radar", description: "Deadlines im Blick", badge: "Neu" },
        { label: "Compliance-Timeline", href: "/timeline", description: "Alle Fristen 2025–2027", badge: "Neu" },
        { label: "Regulierungsvergleich", href: "/vergleich", description: "Regulierungen vergleichen", badge: "Neu" },
      ],
    },
  ],
};

/* ── Flat footer arrays (derived) ── */
export const footerRegulations: NavItem[] = regulierungenDropdown.groups.flatMap(
  (g) => g.items.filter((item) => item.href !== "/haftungs-check")
);

export const footerTools: NavItem[] = [
  { label: "Alle Tools", href: "/tools" },
  { label: "Branchen-Compliance", href: "/branchen" },
  { label: "Haftungs-Check", href: "/haftungs-check" },
  ...toolsDropdown.groups.flatMap((g) =>
    g.items.filter(
      (item) =>
        !item.href.includes("nis2-betroffenheits-check") &&
        !item.href.includes("haftungs-pruefer") &&
        !item.href.includes("bussgeld-rechner")
    )
  ),
];
