import type { CountryData } from "./types";

const BG: CountryData = {
  code: "BG",
  nameLocal: "България",
  nameEN: "Bulgaria",
  nameDE: "Bulgarien",
  flag: "🇧🇬",
  languages: ["bg"],
  euMemberSince: 2007,
  dpaName: "Комисия за защита на личните данни (КЗЛД)",
  dpaUrl: "https://www.cpdp.bg",
  csirtName: "CERT Bulgaria",
  csirtUrl: "https://www.govcert.bg",
  regulations: {
    nis2: {
      authority: "Държавна агенция \"Електронно управление\" (ДАЕУ)",
      authorityUrl: "https://www.e-gov.bg",
      implementationStatus: "pending",
    },
    dora: {
      authority: "Българска народна банка (БНБ) / КФН",
      authorityUrl: "https://www.bnb.bg",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Закон за защита на личните данни (ЗЗЛД)",
      authority: "Комисия за защита на личните данни (КЗЛД)",
      authorityUrl: "https://www.cpdp.bg",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Комисия за регулиране на съобщенията (КРС)",
      authorityUrl: "https://www.crc.bg",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Комисия за финансов надзор (КФН)",
      authorityUrl: "https://www.fsc.bg",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Комисия за регулиране на съобщенията (КРС) / ДАЕУ",
      authorityUrl: "https://www.crc.bg",
      implementationStatus: "pending",
      nationalNotes: "Bulgarien designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Комисия за финансов надзор (КФН)",
      authorityUrl: "https://www.fsc.bg",
      implementationStatus: "implemented",
      nationalNotes: "Bulgarien hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Държавна агенция \"Електронно управление\" (ДАЕУ)",
      authorityUrl: "https://www.e-gov.bg",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). ДАЕУ wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Министерство на труда и социалната политика",
      authorityUrl: "https://www.mlsp.government.bg",
      implementationStatus: "pending",
      nationalNotes: "Bulgarien setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Комисия за защита на потребителите (КЗП)",
      authorityUrl: "https://kzp.bg",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. KZP führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Комисия за защита на личните данни (КЗЛД) / КРС",
      authorityUrl: "https://www.cpdp.bg",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. КЗЛД und КРС koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Комисия за защита на личните данни (КЗЛД)",
      authorityUrl: "https://www.cpdp.bg",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Bulgarien wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Държавна агенция \"Електронно управление\" (ДАЕУ)",
      authorityUrl: "https://www.e-gov.bg",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Bulgarien baut digitale Identitätslösungen über das E-Government-Portal auf.",
    },
    ehds: {
      authority: "Министерство на здравеопазването / НЗИС",
      authorityUrl: "https://www.mh.government.bg",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Bulgarien baut auf dem nationalen Gesundheitsinformationssystem (НЗИС) auf.",
    },
    "green-claims": {
      authority: "Комисия за защита на потребителите (КЗП)",
      authorityUrl: "https://kzp.bg",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in bulgarisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Министерство на правосъдието",
      authorityUrl: "https://www.justice.government.bg",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Министерство на околната среда и водите",
      authorityUrl: "https://www.moew.government.bg",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default BG;
