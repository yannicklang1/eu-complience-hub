import type { CountryData } from "./types";

const CZ: CountryData = {
  code: "CZ",
  nameLocal: "Česká republika",
  nameEN: "Czech Republic",
  nameDE: "Tschechien",
  flag: "🇨🇿",
  languages: ["cs"],
  euMemberSince: 2004,
  dpaName: "Úřad pro ochranu osobních údajů (ÚOOÚ)",
  dpaUrl: "https://www.uoou.cz",
  csirtName: "NUKIB / CERT-CZ",
  csirtUrl: "https://www.nukib.cz",
  regulations: {
    nis2: {
      nationalLawName: "Zákon o kybernetické bezpečnosti (ZKB)",
      authority: "Národní úřad pro kybernetickou a informační bezpečnost (NUKIB)",
      authorityUrl: "https://www.nukib.cz",
      implementationStatus: "implemented",
      nationalNotes: "Tschechien war einer der ersten EU-Mitgliedsstaaten, der NIS2 vollständig umgesetzt hat.",
    },
    dora: {
      authority: "Česká národní banka (ČNB)",
      authorityUrl: "https://www.cnb.cz",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Zákon č. 110/2019 Sb., o zpracování osobních údajů",
      authority: "Úřad pro ochranu osobních údajů (ÚOOÚ)",
      authorityUrl: "https://www.uoou.cz",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Česká telekomunikační infrastruktura (ČTÚ)",
      authorityUrl: "https://www.ctu.cz",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Česká národní banka (ČNB)",
      authorityUrl: "https://www.cnb.cz",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Ministerstvo průmyslu a obchodu (MPO) / NUKIB",
      authorityUrl: "https://www.mpo.cz",
      implementationStatus: "pending",
      nationalNotes: "Tschechien designiert nationale Aufsichtsbehörden für den AI Act. MPO und NUKIB koordinieren.",
    },
    csrd: {
      authority: "Česká národní banka (ČNB)",
      authorityUrl: "https://www.cnb.cz",
      implementationStatus: "implemented",
      nationalNotes: "Tschechien hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Národní úřad pro kybernetickou a informační bezpečnost (NUKIB)",
      authorityUrl: "https://www.nukib.cz",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). NUKIB wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministerstvo práce a sociálních věcí (MPSV)",
      authorityUrl: "https://www.mpsv.cz",
      implementationStatus: "pending",
      nationalNotes: "Tschechien setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Česká obchodní inspekce (ČOI)",
      authorityUrl: "https://www.coi.cz",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. ČOI führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Úřad pro ochranu osobních údajů (ÚOOÚ) / ČTÚ",
      authorityUrl: "https://www.uoou.cz",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. ÚOOÚ und ČTÚ koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Úřad pro ochranu osobních údajů (ÚOOÚ)",
      authorityUrl: "https://www.uoou.cz",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Tschechien wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Ministerstvo vnitra (MV)",
      authorityUrl: "https://www.mvcr.cz",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Tschechien betreibt eIdentita als nationale digitale Identitätslösung.",
    },
    ehds: {
      authority: "Ministerstvo zdravotnictví (MZ)",
      authorityUrl: "https://www.mzcr.cz",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Tschechien baut auf dem eHealth-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Česká obchodní inspekce (ČOI)",
      authorityUrl: "https://www.coi.cz",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in tschechisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministerstvo spravedlnosti",
      authorityUrl: "https://www.justice.cz",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministerstvo životního prostředí (MŽP)",
      authorityUrl: "https://www.mzp.cz",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default CZ;
