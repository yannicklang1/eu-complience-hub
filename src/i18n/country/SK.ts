import type { CountryData } from "./types";

const SK: CountryData = {
  code: "SK",
  nameLocal: "Slovensko",
  nameEN: "Slovakia",
  nameDE: "Slowakei",
  flag: "🇸🇰",
  languages: ["sk"],
  euMemberSince: 2004,
  dpaName: "Úrad na ochranu osobných údajov Slovenskej republiky (ÚOOÚ SR)",
  dpaUrl: "https://dataprotection.gov.sk",
  csirtName: "SK-CERT / NBÚ",
  csirtUrl: "https://www.sk-cert.sk",
  regulations: {
    nis2: {
      nationalLawName: "Zákon o kybernetickej bezpečnosti",
      authority: "Národný bezpečnostný úrad (NBÚ)",
      authorityUrl: "https://www.nbu.gov.sk",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Národná banka Slovenska (NBS)",
      authorityUrl: "https://www.nbs.sk",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Zákon č. 18/2018 Z. z. o ochrane osobných údajov",
      authority: "Úrad na ochranu osobných údajov SR (ÚOOÚ SR)",
      authorityUrl: "https://dataprotection.gov.sk",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Úrad pre reguláciu elektronických komunikácií a poštových služieb (RÚ)",
      authorityUrl: "https://www.teleoff.gov.sk",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Národná banka Slovenska (NBS)",
      authorityUrl: "https://www.nbs.sk",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Úrad pre reguláciu elektronických komunikácií (RÚ) / NBÚ",
      authorityUrl: "https://www.teleoff.gov.sk",
      implementationStatus: "pending",
      nationalNotes: "Die Slowakei designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Národná banka Slovenska (NBS)",
      authorityUrl: "https://www.nbs.sk",
      implementationStatus: "implemented",
      nationalNotes: "Die Slowakei hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Národný bezpečnostný úrad (NBÚ)",
      authorityUrl: "https://www.nbu.gov.sk",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). NBÚ wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministerstvo práce, sociálnych vecí a rodiny SR",
      authorityUrl: "https://www.employment.gov.sk",
      implementationStatus: "pending",
      nationalNotes: "Die Slowakei setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Slovenská obchodná inšpekcia (SOI)",
      authorityUrl: "https://www.soi.sk",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. SOI führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Úrad na ochranu osobných údajov SR (ÚOOÚ SR) / RÚ",
      authorityUrl: "https://dataprotection.gov.sk",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. Nationale Durchsetzungsbehörden werden koordiniert.",
    },
    eprivacy: {
      authority: "Úrad na ochranu osobných údajov SR (ÚOOÚ SR)",
      authorityUrl: "https://dataprotection.gov.sk",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Die Slowakei wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Národný bezpečnostný úrad (NBÚ)",
      authorityUrl: "https://www.nbu.gov.sk",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Die Slowakei betreibt den Elektronický občiansky preukaz (eID) als digitale Identitätslösung.",
    },
    ehds: {
      authority: "Ministerstvo zdravotníctva SR / NCZI",
      authorityUrl: "https://www.health.gov.sk",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Die Slowakei baut auf dem NCZI-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Slovenská obchodná inšpekcia (SOI)",
      authorityUrl: "https://www.soi.sk",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in slowakisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministerstvo spravodlivosti SR",
      authorityUrl: "https://www.justice.gov.sk",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministerstvo životného prostredia SR",
      authorityUrl: "https://www.minzp.sk",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default SK;
