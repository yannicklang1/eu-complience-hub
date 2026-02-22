import type { CountryData } from "./types";

const MT: CountryData = {
  code: "MT",
  nameLocal: "Malta",
  nameEN: "Malta",
  nameDE: "Malta",
  flag: "🇲🇹",
  languages: ["mt", "en"],
  euMemberSince: 2004,
  dpaName: "Information and Data Protection Commissioner (IDPC)",
  dpaUrl: "https://idpc.org.mt",
  csirtName: "MCA / CSIRT Malta",
  csirtUrl: "https://mca.org.mt",
  regulations: {
    nis2: {
      authority: "Malta Communications Authority (MCA)",
      authorityUrl: "https://mca.org.mt",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Malta Financial Services Authority (MFSA)",
      authorityUrl: "https://www.mfsa.mt",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Data Protection Act (Chapter 586)",
      authority: "Information and Data Protection Commissioner (IDPC)",
      authorityUrl: "https://idpc.org.mt",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Malta Communications Authority (MCA)",
      authorityUrl: "https://mca.org.mt",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Malta Financial Services Authority (MFSA)",
      authorityUrl: "https://www.mfsa.mt",
      implementationStatus: "implemented",
      nationalNotes: "Malta war Vorreiter bei der Kryptoregulierung und hat die meisten Krypto-Asset-Betreiber in der EU.",
    },
    "ai-act": {
      authority: "Malta Communications Authority (MCA) / MDIA",
      authorityUrl: "https://mca.org.mt",
      implementationStatus: "pending",
      nationalNotes: "Malta designiert nationale Aufsichtsbehörden für den AI Act. Die Malta Digital Innovation Authority (MDIA) koordiniert.",
    },
    csrd: {
      authority: "Malta Financial Services Authority (MFSA)",
      authorityUrl: "https://www.mfsa.mt",
      implementationStatus: "implemented",
      nationalNotes: "Malta hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Malta Communications Authority (MCA) / CSIRT Malta",
      authorityUrl: "https://mca.org.mt",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). MCA wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministry for Social Policy and Children's Rights",
      authorityUrl: "https://socialpolicy.gov.mt",
      implementationStatus: "pending",
      nationalNotes: "Malta setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Malta Competition and Consumer Affairs Authority (MCCAA)",
      authorityUrl: "https://www.mccaa.org.mt",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. MCCAA führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Information and Data Protection Commissioner (IDPC) / MCA",
      authorityUrl: "https://idpc.org.mt",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. IDPC und MCA koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Information and Data Protection Commissioner (IDPC)",
      authorityUrl: "https://idpc.org.mt",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Malta wendet die Electronic Communications (Regulation) Act Bestimmungen an.",
    },
    eidas: {
      authority: "Malta Information Technology Agency (MITA)",
      authorityUrl: "https://www.mita.gov.mt",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Malta betreibt die maltesische eID als digitale Identitätslösung.",
    },
    ehds: {
      authority: "Ministry for Health / eHealth Malta",
      authorityUrl: "https://health.gov.mt",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Malta baut auf dem myHealth-Portal als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Malta Competition and Consumer Affairs Authority (MCCAA)",
      authorityUrl: "https://www.mccaa.org.mt",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in maltesisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministry for Justice",
      authorityUrl: "https://justice.gov.mt",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Environment and Resources Authority (ERA)",
      authorityUrl: "https://era.org.mt",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default MT;
