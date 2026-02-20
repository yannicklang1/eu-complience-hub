/* ═══════════════════════════════════════════════════════════════════
   Compliance-Verzeichnis — Kuratiertes Anbieterverzeichnis
   Dienstleister, Software & Beratung für EU-Compliance in AT/DACH
   ═══════════════════════════════════════════════════════════════════ */

/* ── Type definitions ── */

export type VerzeichnisCategory = "software" | "auditor" | "kanzlei" | "berater";
export type Regulation = "NIS2" | "AI Act" | "DORA" | "CRA" | "DSGVO" | "eIDAS";
export type Region = "AT" | "DE" | "CH" | "EU-weit";
export type CompanySize = "KMU" | "Mittelstand" | "Enterprise" | "Alle";

export interface VerzeichnisEntry {
  id: string;
  name: string;
  category: VerzeichnisCategory;
  logo: string;
  tagline: string;
  description: string;
  regulations: Regulation[];
  regions: Region[];
  targetSize: CompanySize;
  website: string;
  /** Contact CTA — e.g. "Beratung anfragen" or "Demo buchen" */
  ctaLabel: string;
  ctaUrl: string;
  /** Is this a featured/promoted listing? (monetization) */
  featured: boolean;
  /** Price range or "Auf Anfrage" */
  priceInfo: string;
  /** Key selling points (2-4 items) */
  highlights: string[];
  /** City or region */
  location: string;
}

/* ── Category metadata ── */

export interface CategoryMeta {
  category: VerzeichnisCategory;
  label: string;
  labelPlural: string;
  icon: string;
  accent: string;
  description: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    category: "software",
    label: "Compliance-Software",
    labelPlural: "Compliance-Software-Anbieter",
    icon: "\u{1F4BB}",
    accent: "#6366f1",
    description:
      "Digitale Plattformen und Tools, die Compliance-Prozesse automatisieren, dokumentieren und vereinfachen \u2014 von ISMS-Aufbau bis Datenschutz-Management.",
  },
  {
    category: "auditor",
    label: "Zertifizierte Auditoren",
    labelPlural: "Zertifizierte Auditoren & Pr\u00fcfstellen",
    icon: "\uD83D\uDD0D",
    accent: "#059669",
    description:
      "Akkreditierte Zertifizierungsstellen und Auditoren f\u00fcr ISO 27001, NIS2, DORA und weitere EU-Standards \u2014 mit Standort in \u00d6sterreich.",
  },
  {
    category: "kanzlei",
    label: "Kanzleien & Rechtsberatung",
    labelPlural: "Kanzleien & Rechtsberatung",
    icon: "\u2696\uFE0F",
    accent: "#dc2626",
    description:
      "Spezialisierte Rechtsanwaltskanzleien f\u00fcr IT-Recht, Datenschutz und regulatorische Compliance im DACH-Raum und auf EU-Ebene.",
  },
  {
    category: "berater",
    label: "Compliance-Berater",
    labelPlural: "Compliance-Berater & Consultants",
    icon: "\uD83C\uDFAF",
    accent: "#0284c7",
    description:
      "Erfahrene Beratungsunternehmen f\u00fcr Cybersecurity, Risikomanagement und regulatorische Umsetzungsprojekte in \u00d6sterreich und Europa.",
  },
];

/* ── Regulation color map (kept for backward-compat & UI badges) ── */

export const REGULATION_COLORS: Record<
  Regulation,
  { bg: string; text: string; border: string }
> = {
  NIS2: { bg: "#e8ecff", text: "#1e40af", border: "#c7d2fe" },
  "AI Act": { bg: "#f3f0ff", text: "#7c3aed", border: "#e0d4ff" },
  DORA: { bg: "#ecfdf5", text: "#059669", border: "#c6f6d5" },
  CRA: { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa" },
  DSGVO: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  eIDAS: { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
};

/* ── Helper: get category meta ── */

export function getCategoryMeta(
  category: VerzeichnisCategory
): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.category === category);
}

/* ═══════════════════════════════════════════════════════════════════
   Directory entries — 4-5 per category, featured listings first
   ═══════════════════════════════════════════════════════════════════ */

/* ── Software (5 entries) ── */

const softwareEntries: VerzeichnisEntry[] = [
  {
    id: "dataguard",
    name: "DataGuard",
    category: "software",
    logo: "\uD83D\uDEE1\uFE0F",
    tagline: "ISMS & Datenschutz-Plattform aus Deutschland",
    description:
      "DataGuard kombiniert eine leistungsstarke SaaS-Plattform mit pers\u00f6nlicher Expertenberatung. Unternehmen k\u00f6nnen ISO 27001, DSGVO und NIS2-Anforderungen zentral verwalten und automatisiert dokumentieren. Besonders stark im DACH-Markt mit deutschsprachigem Support.",
    regulations: ["NIS2", "DSGVO", "AI Act"],
    regions: ["DE", "AT", "EU-weit"],
    targetSize: "Mittelstand",
    website: "https://www.dataguard.de",
    ctaLabel: "Demo buchen",
    ctaUrl: "https://www.dataguard.de/demo",
    featured: true,
    priceInfo: "ab 450 \u20ac/Monat",
    highlights: [
      "Kombiniert Plattform + Expertenberatung",
      "ISO 27001 Zertifizierung in 50 % weniger Zeit",
      "DSGVO-konformes Verarbeitungsverzeichnis",
      "Deutschsprachiger Kundensupport",
    ],
    location: "M\u00fcnchen, Deutschland",
  },
  {
    id: "onetrust",
    name: "OneTrust",
    category: "software",
    logo: "\uD83C\uDF10",
    tagline: "Privacy, Security & Governance in einer Plattform",
    description:
      "OneTrust ist der weltweit f\u00fchrende Anbieter f\u00fcr Privacy- und Compliance-Management. Die Plattform deckt Datenschutz, KI-Governance, GRC und Third-Party-Risikomanagement ab. Ideal f\u00fcr international t\u00e4tige Konzerne mit komplexen regulatorischen Anforderungen.",
    regulations: ["DSGVO", "AI Act", "NIS2", "DORA"],
    regions: ["EU-weit", "AT", "DE", "CH"],
    targetSize: "Enterprise",
    website: "https://www.onetrust.com",
    ctaLabel: "Demo anfragen",
    ctaUrl: "https://www.onetrust.com/request-demo/",
    featured: true,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Marktf\u00fchrer mit \u00fcber 14.000 Kunden weltweit",
      "KI-Governance-Modul f\u00fcr EU AI Act",
      "Automatisierte Datenmapping-Workflows",
      "Multinationale Compliance in einer Plattform",
    ],
    location: "Atlanta, USA / EU-Niederlassungen",
  },
  {
    id: "secjur",
    name: "Secjur",
    category: "software",
    logo: "\u2699\uFE0F",
    tagline: "Automatisierte Compliance f\u00fcr wachsende Unternehmen",
    description:
      "Secjur bietet eine KI-gest\u00fctzte Compliance-Plattform, die den Aufbau eines ISMS nach ISO 27001 und die Umsetzung von NIS2 weitgehend automatisiert. Der Digital Compliance Office vereinfacht die Zusammenarbeit zwischen Fachbereichen und reduziert den manuellen Aufwand erheblich.",
    regulations: ["NIS2", "DSGVO", "AI Act", "CRA"],
    regions: ["DE", "AT", "CH"],
    targetSize: "Mittelstand",
    website: "https://www.secjur.com",
    ctaLabel: "Kostenlos testen",
    ctaUrl: "https://www.secjur.com/kontakt",
    featured: false,
    priceInfo: "ab 390 \u20ac/Monat",
    highlights: [
      "KI-gest\u00fctzte Dokumentenerstellung",
      "ISO 27001 & TISAX-f\u00e4hig",
      "Integriertes Aufgabenmanagement",
    ],
    location: "Hamburg, Deutschland",
  },
  {
    id: "heydata",
    name: "heyData",
    category: "software",
    logo: "\uD83D\uDCC1",
    tagline: "Datenschutz-Management speziell f\u00fcr KMU",
    description:
      "heyData macht Datenschutz f\u00fcr kleine und mittlere Unternehmen zug\u00e4nglich. Die Plattform bietet ein digitales Datenschutz-Audit, automatische Verarbeitungsverzeichnisse und einen externen Datenschutzbeauftragten als Service. Einfache Einrichtung ohne Vorkenntnisse.",
    regulations: ["DSGVO", "eIDAS"],
    regions: ["DE", "AT", "CH"],
    targetSize: "KMU",
    website: "https://www.heydata.eu",
    ctaLabel: "Jetzt starten",
    ctaUrl: "https://www.heydata.eu/anfrage",
    featured: false,
    priceInfo: "ab 169 \u20ac/Monat",
    highlights: [
      "Externer DSB als Service inklusive",
      "Setup in unter 30 Minuten",
      "Automatisierte Mitarbeiter-Schulungen",
    ],
    location: "Berlin, Deutschland",
  },
  {
    id: "vanta",
    name: "Vanta",
    category: "software",
    logo: "\uD83D\uDD12",
    tagline: "Automatisierte Security-Compliance f\u00fcr moderne Unternehmen",
    description:
      "Vanta automatisiert die Einhaltung von Sicherheitsstandards wie SOC 2, ISO 27001 und DSGVO durch kontinuierliche \u00dcberwachung der IT-Infrastruktur. Die Plattform integriert sich nahtlos mit Cloud-Diensten und liefert Echtzeit-Compliance-Status auf einem zentralen Dashboard.",
    regulations: ["NIS2", "DSGVO", "DORA"],
    regions: ["EU-weit", "AT", "DE"],
    targetSize: "Mittelstand",
    website: "https://www.vanta.com",
    ctaLabel: "Demo buchen",
    ctaUrl: "https://www.vanta.com/contact",
    featured: false,
    priceInfo: "ab 500 \u20ac/Monat",
    highlights: [
      "Continuous Monitoring der IT-Infrastruktur",
      "\u00dcber 300 Integrationen (AWS, Azure, GCP)",
      "Audit-ready Reports auf Knopfdruck",
    ],
    location: "San Francisco, USA / EU-Support",
  },
];

/* ── Auditoren (4 entries) ── */

const auditorEntries: VerzeichnisEntry[] = [
  {
    id: "tuev-austria",
    name: "T\u00dcV Austria",
    category: "auditor",
    logo: "\u2705",
    tagline: "Zertifizierungsstelle f\u00fcr alle relevanten EU-Standards",
    description:
      "Der T\u00dcV Austria ist eine der f\u00fchrenden Pr\u00fcf- und Zertifizierungsorganisationen in \u00d6sterreich. Als akkreditierte Stelle bietet er Zertifizierungen f\u00fcr ISO 27001, NIS2-Konformit\u00e4t, KI-Systeme und weitere EU-Regulierungen. Langj\u00e4hrige Erfahrung und h\u00f6chste Anerkennung bei Beh\u00f6rden.",
    regulations: ["NIS2", "AI Act", "DORA", "CRA", "DSGVO"],
    regions: ["AT", "EU-weit"],
    targetSize: "Alle",
    website: "https://www.tuv.at",
    ctaLabel: "Zertifizierung anfragen",
    ctaUrl: "https://www.tuv.at/kontakt",
    featured: true,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Akkreditierte Zertifizierungsstelle (Akkreditierung Austria)",
      "\u00dcber 150 Jahre Pr\u00fcferfahrung",
      "ISO 27001, ISO 42001 und NIS2-Audits",
      "Standorte in ganz \u00d6sterreich",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "cis",
    name: "CIS - Certification & Information Security Services",
    category: "auditor",
    logo: "\uD83C\uDFC5",
    tagline: "Spezialisiert auf Informationssicherheits-Zertifizierungen",
    description:
      "CIS ist ein auf Informationssicherheit spezialisiertes Zertifizierungsunternehmen mit Sitz in Wien. Als Tochter von Quality Austria bietet CIS akkreditierte Audits f\u00fcr ISO 27001, ISO 27701, NIS und Cloud-Security. Besonders gesch\u00e4tzt f\u00fcr tiefes technisches Know-how der Auditoren.",
    regulations: ["NIS2", "DSGVO", "DORA"],
    regions: ["AT", "DE", "CH"],
    targetSize: "Mittelstand",
    website: "https://www.cis-cert.com",
    ctaLabel: "Audit anfragen",
    ctaUrl: "https://www.cis-cert.com/kontakt",
    featured: true,
    priceInfo: "ab 5.000 \u20ac/Audit",
    highlights: [
      "Spezialisierung auf Informationssicherheit",
      "Akkreditiert nach ISO/IEC 17021",
      "Kombination ISO 27001 + Cloud-Security-Audit",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "austrian-standards",
    name: "Austrian Standards",
    category: "auditor",
    logo: "\uD83D\uDCDC",
    tagline: "\u00d6sterreichs Normungsinstitut mit Zertifizierungsservices",
    description:
      "Austrian Standards ist die zentrale Normungsorganisation in \u00d6sterreich und bietet zus\u00e4tzlich Zertifizierungsdienstleistungen an. Unternehmen profitieren von der N\u00e4he zur Standardentwicklung und erhalten Zugang zu aktuellen Normen-Entw\u00fcrfen und Schulungen rund um EU-Regulierungen.",
    regulations: ["NIS2", "AI Act", "CRA"],
    regions: ["AT"],
    targetSize: "Alle",
    website: "https://www.austrian-standards.at",
    ctaLabel: "Beratung anfragen",
    ctaUrl: "https://www.austrian-standards.at/de/kontakt",
    featured: false,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Direkter Zugang zu EU-Normen und -Entw\u00fcrfen",
      "Schulungen und Seminare zu neuen Regulierungen",
      "Branchenspezifische Zertifizierungsprogramme",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "sgs-austria",
    name: "SGS Austria",
    category: "auditor",
    logo: "\uD83D\uDD2C",
    tagline: "Internationale Pr\u00fcf- und Zertifizierungsgesellschaft",
    description:
      "SGS ist der weltweit gr\u00f6\u00dfte Pr\u00fcf-, Inspektions- und Zertifizierungskonzern. Die \u00f6sterreichische Niederlassung bietet Audits f\u00fcr ISO 27001, Cybersecurity-Assessments und regulatorische Compliance-Pr\u00fcfungen. Internationales Netzwerk mit lokaler Expertise.",
    regulations: ["NIS2", "DORA", "DSGVO", "CRA"],
    regions: ["AT", "EU-weit"],
    targetSize: "Enterprise",
    website: "https://www.sgs.at",
    ctaLabel: "Angebot einholen",
    ctaUrl: "https://www.sgs.at/de-at/kontaktieren-sie-uns",
    featured: false,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Weltweites Netzwerk mit lokaler Pr\u00e4senz",
      "Branchenspezifische Audit-Programme",
      "Kombinierte Zertifizierungen (ISO 27001 + ISO 22301)",
    ],
    location: "Wien, \u00d6sterreich",
  },
];

/* ── Kanzleien (4 entries) ── */

const kanzleiEntries: VerzeichnisEntry[] = [
  {
    id: "schoenherr",
    name: "Sch\u00f6nherr Rechtsanw\u00e4lte",
    category: "kanzlei",
    logo: "\uD83C\uDFDB\uFE0F",
    tagline: "F\u00fchrende Tech & Data Law Kanzlei in CEE",
    description:
      "Sch\u00f6nherr z\u00e4hlt zu den f\u00fchrenden Wirtschaftskanzleien in Zentral- und Osteuropa. Das spezialisierte Tech & Data Law Team ber\u00e4t multinationale Konzerne und Technologieunternehmen bei der Umsetzung von NIS2, AI Act und DSGVO. Tiefe regulatorische Expertise gepaart mit Branchenkenntnis.",
    regulations: ["NIS2", "AI Act", "DSGVO", "DORA", "eIDAS"],
    regions: ["AT", "EU-weit"],
    targetSize: "Enterprise",
    website: "https://www.schoenherr.eu",
    ctaLabel: "Beratung anfragen",
    ctaUrl: "https://www.schoenherr.eu/contact/",
    featured: true,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Top-Ranking im IT- und Datenschutzrecht (Chambers, Legal500)",
      "B\u00fcros in 15 L\u00e4ndern der CEE-Region",
      "Spezialisiertes AI Act Beratungsteam",
      "Erfahrung mit grenz\u00fcberschreitenden Compliance-Projekten",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "freshfields-wien",
    name: "Freshfields (Wien)",
    category: "kanzlei",
    logo: "\uD83D\uDCBC",
    tagline: "Globale Kanzlei mit starker IT/IP-Praxis in Wien",
    description:
      "Freshfields Bruckhaus Deringer geh\u00f6rt zu den weltweit renommiertesten Wirtschaftskanzleien. Das Wiener B\u00fcro verf\u00fcgt \u00fcber ein erfahrenes Team f\u00fcr IT-Recht, IP-Schutz und Datenschutz, das \u00f6sterreichische und internationale Mandanten bei komplexen regulatorischen Fragestellungen unterst\u00fctzt.",
    regulations: ["DSGVO", "AI Act", "NIS2", "DORA"],
    regions: ["AT", "EU-weit", "DE"],
    targetSize: "Enterprise",
    website: "https://www.freshfields.com",
    ctaLabel: "Kontakt aufnehmen",
    ctaUrl: "https://www.freshfields.com/de/kontakt/",
    featured: true,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Magic Circle Kanzlei mit Wiener Standort",
      "Grenz\u00fcberschreitende Datenschutz-Expertise",
      "Regulatory-Erfahrung bei EU-Institutionen",
      "Begleitung bei beh\u00f6rdlichen Verfahren",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "dla-piper",
    name: "DLA Piper",
    category: "kanzlei",
    logo: "\uD83C\uDF0D",
    tagline: "Technology & Data Practice mit globaler Reichweite",
    description:
      "DLA Piper ist eine der gr\u00f6\u00dften Anwaltskanzleien der Welt und verf\u00fcgt \u00fcber eine ausgebaute Technology & Data Practice. Das Wiener Team ber\u00e4t Unternehmen bei der Umsetzung von EU-Digitalregulierung, Datenschutz-Folgenabsch\u00e4tzungen und Cybersecurity-Compliance.",
    regulations: ["DSGVO", "NIS2", "AI Act", "eIDAS"],
    regions: ["AT", "EU-weit", "DE", "CH"],
    targetSize: "Mittelstand",
    website: "https://www.dlapiper.com",
    ctaLabel: "Anfrage senden",
    ctaUrl: "https://www.dlapiper.com/de-at/kontakt",
    featured: false,
    priceInfo: "Auf Anfrage",
    highlights: [
      "B\u00fcros in \u00fcber 40 L\u00e4ndern weltweit",
      "Eigenes Data Protection & Cyber Team",
      "DSGVO-Compliance-Programme f\u00fcr Konzerne",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "bpv-huegel",
    name: "bpv H\u00fcgel Rechtsanw\u00e4lte",
    category: "kanzlei",
    logo: "\uD83D\uDCD6",
    tagline: "IT-Recht & Cybersecurity aus \u00d6sterreich",
    description:
      "bpv H\u00fcgel ist eine renommierte \u00f6sterreichische Wirtschaftskanzlei mit besonderer Expertise im IT- und Technologierecht. Das Team ber\u00e4t Unternehmen bei Cybersecurity-Regulierung, IT-Vertragsrecht und der Umsetzung neuer EU-Vorschriften wie NIS2 und dem Cyber Resilience Act.",
    regulations: ["NIS2", "CRA", "DSGVO"],
    regions: ["AT"],
    targetSize: "Mittelstand",
    website: "https://www.bpv-huegel.com",
    ctaLabel: "Erstberatung anfragen",
    ctaUrl: "https://www.bpv-huegel.com/de/kontakt",
    featured: false,
    priceInfo: "ab 300 \u20ac/Stunde",
    highlights: [
      "\u00d6sterreichische Kanzlei mit Fokus auf IT-Recht",
      "Praxisnahe Beratung f\u00fcr den Mittelstand",
      "Erfahrung mit NIS2-Umsetzungsprojekten",
    ],
    location: "Wien, \u00d6sterreich",
  },
];

/* ── Berater (4 entries) ── */

const beraterEntries: VerzeichnisEntry[] = [
  {
    id: "sec-consult",
    name: "SEC Consult",
    category: "berater",
    logo: "\uD83D\uDD10",
    tagline: "Cybersecurity Consulting aus \u00d6sterreich",
    description:
      "SEC Consult ist einer der f\u00fchrenden Cybersecurity-Berater in Europa mit Hauptsitz in Wien. Das Unternehmen bietet Penetration Testing, Security-Audits und strategische Beratung bei der Umsetzung von NIS2 und DORA. Technische Tiefe kombiniert mit regulatorischem Verst\u00e4ndnis.",
    regulations: ["NIS2", "DORA", "CRA"],
    regions: ["AT", "DE", "EU-weit"],
    targetSize: "Mittelstand",
    website: "https://www.sec-consult.com",
    ctaLabel: "Beratung anfragen",
    ctaUrl: "https://www.sec-consult.com/kontakt/",
    featured: true,
    priceInfo: "ab 1.800 \u20ac/Tag",
    highlights: [
      "Hauptsitz in Wien, B\u00fcros in 10+ L\u00e4ndern",
      "Vulnerability Lab mit \u00fcber 600 ver\u00f6ffentlichten Advisories",
      "NIS2-Readiness-Assessments aus einer Hand",
      "Teil der Eviden / Atos Gruppe",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "kpmg-austria",
    name: "KPMG Austria",
    category: "berater",
    logo: "\uD83D\uDCCA",
    tagline: "Cyber Security Advisory auf Enterprise-Niveau",
    description:
      "KPMG Austria bietet umfassende Cybersecurity- und Compliance-Beratung f\u00fcr gro\u00dfe und mittlere Unternehmen. Das Cyber-Team unterst\u00fctzt bei NIS2-Gap-Analysen, DORA-Implementierung und dem Aufbau von Informationssicherheits-Managementsystemen. Branchenspezifische Frameworks aus der globalen KPMG-Praxis.",
    regulations: ["NIS2", "DORA", "AI Act", "DSGVO"],
    regions: ["AT", "EU-weit"],
    targetSize: "Enterprise",
    website: "https://kpmg.com/at",
    ctaLabel: "Erstgespr\u00e4ch vereinbaren",
    ctaUrl: "https://kpmg.com/at/de/home/kontakt.html",
    featured: true,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Big-4-Beratungshaus mit lokaler Verankerung",
      "Eigenes Cyber-Response-Team in \u00d6sterreich",
      "DORA-Compliance-Programme f\u00fcr Finanzsektor",
      "Zugang zu globalem KPMG-Expertennetzwerk",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "deloitte-austria",
    name: "Deloitte \u00d6sterreich",
    category: "berater",
    logo: "\uD83D\uDEE0\uFE0F",
    tagline: "Cyber Risk Services f\u00fcr \u00f6sterreichische Unternehmen",
    description:
      "Deloitte \u00d6sterreich ber\u00e4t Unternehmen bei der Identifikation und Steuerung von Cyberrisiken. Die Cyber Risk Services umfassen NIS2-Readiness-Assessments, Security-Strategie-Entwicklung und die Implementierung von Governance-Frameworks. Enge Zusammenarbeit mit der globalen Deloitte-Plattform.",
    regulations: ["NIS2", "DORA", "AI Act", "DSGVO", "CRA"],
    regions: ["AT", "EU-weit", "DE"],
    targetSize: "Enterprise",
    website: "https://www2.deloitte.com/at",
    ctaLabel: "Beratung anfragen",
    ctaUrl: "https://www2.deloitte.com/at/de/footerlinks/kontakt.html",
    featured: false,
    priceInfo: "Auf Anfrage",
    highlights: [
      "Multidisziplin\u00e4re Teams (Tech, Legal, Risk)",
      "Eigenes Cyber Intelligence Center",
      "Branchenspezifische NIS2-Umsetzungskonzepte",
    ],
    location: "Wien, \u00d6sterreich",
  },
  {
    id: "sba-research",
    name: "SBA Research",
    category: "berater",
    logo: "\uD83C\uDF93",
    tagline: "Forschungsnahe Security-Beratung aus Wien",
    description:
      "SBA Research ist ein \u00f6sterreichisches Forschungszentrum f\u00fcr Informationssicherheit, das angewandte Forschung mit praxisnaher Beratung verbindet. Das Team unterst\u00fctzt Unternehmen bei Security-Assessments, Secure Software Development und der Bewertung von KI-Systemen nach EU AI Act.",
    regulations: ["NIS2", "AI Act", "CRA"],
    regions: ["AT"],
    targetSize: "KMU",
    website: "https://www.sba-research.org",
    ctaLabel: "Projekt anfragen",
    ctaUrl: "https://www.sba-research.org/contact/",
    featured: false,
    priceInfo: "ab 2.000 \u20ac/Projekt",
    highlights: [
      "Kooperation mit TU Wien und Uni Wien",
      "Forschungsbasierte Methoden und Tools",
      "Spezialisierung auf KI-Sicherheitsbewertungen",
    ],
    location: "Wien, \u00d6sterreich",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   Combined & sorted export
   ═══════════════════════════════════════════════════════════════════ */

/**
 * All directory entries, sorted so that featured listings appear
 * first within each category group.
 */
export const ALL_ENTRIES: VerzeichnisEntry[] = [
  ...softwareEntries,
  ...auditorEntries,
  ...kanzleiEntries,
  ...beraterEntries,
].sort((a, b) => {
  // Primary: group by category (keep intended order: software, auditor, kanzlei, berater)
  const catOrder: Record<VerzeichnisCategory, number> = {
    software: 0,
    auditor: 1,
    kanzlei: 2,
    berater: 3,
  };
  const catDiff = catOrder[a.category] - catOrder[b.category];
  if (catDiff !== 0) return catDiff;

  // Secondary: featured first within each category
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;

  return 0;
});

/* ═══════════════════════════════════════════════════════════════════
   Filter helper
   ═══════════════════════════════════════════════════════════════════ */

export function filterEntries(
  entries: VerzeichnisEntry[],
  filters: {
    category?: VerzeichnisCategory | "all";
    regulation?: Regulation | "all";
    region?: Region | "all";
    search?: string;
  }
): VerzeichnisEntry[] {
  return entries.filter((entry) => {
    // Category filter
    if (filters.category && filters.category !== "all") {
      if (entry.category !== filters.category) return false;
    }

    // Regulation filter
    if (filters.regulation && filters.regulation !== "all") {
      if (!entry.regulations.includes(filters.regulation)) return false;
    }

    // Region filter
    if (filters.region && filters.region !== "all") {
      if (!entry.regions.includes(filters.region)) return false;
    }

    // Free-text search (case-insensitive, matches across multiple fields)
    if (filters.search && filters.search.trim().length > 0) {
      const q = filters.search.toLowerCase().trim();
      const searchable = [
        entry.name,
        entry.tagline,
        entry.description,
        entry.location,
        ...entry.highlights,
        ...entry.regulations,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });
}
