import type { CountryData } from "./types";

const BE: CountryData = {
  code: "BE",
  nameLocal: "België / Belgique / Belgien",
  nameEN: "Belgium",
  nameDE: "Belgien",
  flag: "🇧🇪",
  languages: ["nl", "fr", "de"],
  euMemberSince: 1957,
  dpaName: "Gegevensbeschermingsautoriteit / Autorité de protection des données (GBA/APD)",
  dpaUrl: "https://www.gegevensbeschermingsautoriteit.be",
  csirtName: "CCB / CERT.be",
  csirtUrl: "https://ccb.be",
  regulations: {
    nis2: {
      nationalLawName: "Wet betreffende de maatregelen voor een hoog gemeenschappelijk niveau van cyberbeveiliging",
      authority: "Centre for Cybersecurity Belgium (CCB)",
      authorityUrl: "https://ccb.be",
      implementationStatus: "implemented",
      nationalNotes: "Belgien hat NIS2 umgesetzt. CCB ist die nationale Cybersicherheitsbehörde.",
    },
    dora: {
      authority: "Nationale Bank van België (NBB) / FSMA",
      authorityUrl: "https://www.nbb.be",
      implementationStatus: "implemented",
      nationalNotes: "DORA seit Januar 2025 unmittelbar anwendbar. NBB und FSMA beaufsichtigen belgische Finanzunternehmen.",
    },
    dsgvo: {
      nationalLawName: "Wet van 30 juli 2018 betreffende de bescherming van natuurlijke personen",
      authority: "Gegevensbeschermingsautoriteit (GBA)",
      authorityUrl: "https://www.gegevensbeschermingsautoriteit.be",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Belgisch Instituut voor postdiensten en telecommunicatie (BIPT)",
      authorityUrl: "https://www.bipt.be",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Autorité des services et marchés financiers (FSMA)",
      authorityUrl: "https://www.fsma.be",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "SPF Économie / Conseil consultatif belge de l'intelligence artificielle",
      authorityUrl: "https://economie.fgov.be",
      implementationStatus: "pending",
      nationalNotes: "Belgien designiert nationale Aufsichtsbehörden für den AI Act. Die SPF Économie koordiniert.",
    },
    csrd: {
      authority: "Autorité des services et marchés financiers (FSMA)",
      authorityUrl: "https://www.fsma.be",
      implementationStatus: "implemented",
      nationalNotes: "Belgien hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Centre for Cybersecurity Belgium (CCB)",
      authorityUrl: "https://ccb.be",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). CCB wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "SPF Économie, P.M.E., Classes moyennes et Énergie",
      authorityUrl: "https://economie.fgov.be",
      implementationStatus: "pending",
      nationalNotes: "Belgien setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "SPF Économie — Direction générale de l'Inspection économique",
      authorityUrl: "https://economie.fgov.be",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Die Wirtschaftsinspektion führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Gegevensbeschermingsautoriteit (GBA) / BIPT",
      authorityUrl: "https://www.gegevensbeschermingsautoriteit.be",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. GBA und BIPT koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Gegevensbeschermingsautoriteit (GBA)",
      authorityUrl: "https://www.gegevensbeschermingsautoriteit.be",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Belgien wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "SPF Stratégie et Appui (BOSA)",
      authorityUrl: "https://bosa.belgium.be",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Belgien betreibt itsme und den belgischen eID als digitale Identitätslösungen.",
    },
    ehds: {
      authority: "SPF Santé publique / Plateforme eHealth",
      authorityUrl: "https://www.ehealth.fgov.be",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Belgien baut auf der eHealth-Plattform als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "SPF Économie — Direction générale de l'Inspection économique",
      authorityUrl: "https://economie.fgov.be",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in belgisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "SPF Justice",
      authorityUrl: "https://justitie.belgium.be",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "SPF Santé publique, Sécurité de la Chaîne alimentaire et Environnement",
      authorityUrl: "https://www.health.belgium.be",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default BE;
