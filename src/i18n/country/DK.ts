import type { CountryData } from "./types";

const DK: CountryData = {
  code: "DK",
  nameLocal: "Danmark",
  nameEN: "Denmark",
  nameDE: "Dänemark",
  flag: "🇩🇰",
  languages: ["da"],
  euMemberSince: 1973,
  dpaName: "Datatilsynet",
  dpaUrl: "https://www.datatilsynet.dk",
  csirtName: "CFCS / Center for Cybersikkerhed",
  csirtUrl: "https://www.cfcs.dk",
  regulations: {
    nis2: {
      nationalLawName: "Lov om cyber- og informationssikkerhed",
      authority: "Center for Cybersikkerhed (CFCS)",
      authorityUrl: "https://www.cfcs.dk",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Finanstilsynet",
      authorityUrl: "https://www.finanstilsynet.dk",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Databeskyttelsesloven",
      authority: "Datatilsynet",
      authorityUrl: "https://www.datatilsynet.dk",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Konkurrence- og Forbrugerstyrelsen",
      authorityUrl: "https://www.kfst.dk",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Finanstilsynet",
      authorityUrl: "https://www.finanstilsynet.dk",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Datatilsynet / Erhvervsstyrelsen",
      authorityUrl: "https://www.datatilsynet.dk",
      implementationStatus: "pending",
      nationalNotes: "Dänemark designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Erhvervsstyrelsen / Finanstilsynet",
      authorityUrl: "https://www.erst.dk",
      implementationStatus: "implemented",
      nationalNotes: "Dänemark hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Center for Cybersikkerhed (CFCS) / Sikkerhedsstyrelsen",
      authorityUrl: "https://www.cfcs.dk",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). CFCS und Sikkerhedsstyrelsen werden als Marktüberwachungsbehörden designiert.",
    },
    bafg: {
      authority: "Erhvervsstyrelsen",
      authorityUrl: "https://www.erst.dk",
      implementationStatus: "pending",
      nationalNotes: "Dänemark setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Sikkerhedsstyrelsen / Forbrugerombudsmanden",
      authorityUrl: "https://www.sik.dk",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. Sikkerhedsstyrelsen führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Datatilsynet / Erhvervsstyrelsen",
      authorityUrl: "https://www.datatilsynet.dk",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. Nationale Durchsetzungsbehörden werden koordiniert.",
    },
    eprivacy: {
      authority: "Datatilsynet",
      authorityUrl: "https://www.datatilsynet.dk",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Dänemark wendet die Cookie-Bestimmungen des Cookiebekendtgørelsen an.",
    },
    eidas: {
      authority: "Digitaliseringsstyrelsen",
      authorityUrl: "https://www.digst.dk",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Dänemark betreibt MitID als nationale digitale Identitätslösung.",
    },
    ehds: {
      authority: "Sundhedsdatastyrelsen",
      authorityUrl: "https://www.sundhedsdatastyrelsen.dk",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Dänemark baut auf dem sundhed.dk-Portal als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Forbrugerombudsmanden",
      authorityUrl: "https://www.forbrugerombudsmanden.dk",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in dänisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Justitsministeriet",
      authorityUrl: "https://www.justitsministeriet.dk",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden. Das dänische Produkthaftungsgesetz (Produktansvarsloven) wird angepasst.",
    },
    dpp: {
      authority: "Miljøstyrelsen",
      authorityUrl: "https://www.mst.dk",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default DK;
