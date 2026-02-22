import type { CountryData } from "./types";

const LV: CountryData = {
  code: "LV",
  nameLocal: "Latvija",
  nameEN: "Latvia",
  nameDE: "Lettland",
  flag: "🇱🇻",
  languages: ["lv"],
  euMemberSince: 2004,
  dpaName: "Datu valsts inspekcija (DVI)",
  dpaUrl: "https://www.dvi.gov.lv",
  csirtName: "CERT.LV",
  csirtUrl: "https://cert.lv",
  regulations: {
    nis2: {
      nationalLawName: "Informācijas tehnoloģiju drošības likums (ITD likums)",
      authority: "Informācijas tehnoloģiju drošības incidents atbildes institūcija (CERT.LV)",
      authorityUrl: "https://cert.lv",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Finanšu un kapitāla tirgus komisija (FKTK)",
      authorityUrl: "https://www.fktk.lv",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Fizisko personu datu apstrādes likums",
      authority: "Datu valsts inspekcija (DVI)",
      authorityUrl: "https://www.dvi.gov.lv",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Sabiedrisko pakalpojumu regulēšanas komisija (SPRK)",
      authorityUrl: "https://www.sprk.gov.lv",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Finanšu un kapitāla tirgus komisija (FKTK)",
      authorityUrl: "https://www.fktk.lv",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Sabiedrisko pakalpojumu regulēšanas komisija (SPRK) / DVI",
      authorityUrl: "https://www.sprk.gov.lv",
      implementationStatus: "pending",
      nationalNotes: "Lettland designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Finanšu un kapitāla tirgus komisija (FKTK)",
      authorityUrl: "https://www.fktk.lv",
      implementationStatus: "implemented",
      nationalNotes: "Lettland hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "CERT.LV / Aizsardzības ministrija",
      authorityUrl: "https://cert.lv",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). CERT.LV wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Labklājības ministrija",
      authorityUrl: "https://www.lm.gov.lv",
      implementationStatus: "pending",
      nationalNotes: "Lettland setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Patērētāju tiesību aizsardzības centrs (PTAC)",
      authorityUrl: "https://www.ptac.gov.lv",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. PTAC führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Datu valsts inspekcija (DVI) / SPRK",
      authorityUrl: "https://www.dvi.gov.lv",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. DVI und SPRK koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Datu valsts inspekcija (DVI)",
      authorityUrl: "https://www.dvi.gov.lv",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Lettland wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Vides aizsardzības un reģionālās attīstības ministrija (VARAM)",
      authorityUrl: "https://www.varam.gov.lv",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Lettland betreibt eID und eParaksts als digitale Identitätslösungen.",
    },
    ehds: {
      authority: "Veselības ministrija / Nacionālais veselības dienests (NVD)",
      authorityUrl: "https://www.vm.gov.lv",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Lettland baut auf dem e-Veselība-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Patērētāju tiesību aizsardzības centrs (PTAC)",
      authorityUrl: "https://www.ptac.gov.lv",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in lettisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Tieslietu ministrija",
      authorityUrl: "https://www.tm.gov.lv",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Vides aizsardzības un reģionālās attīstības ministrija (VARAM)",
      authorityUrl: "https://www.varam.gov.lv",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default LV;
