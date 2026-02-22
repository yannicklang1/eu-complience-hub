import type { CountryData } from "./types";

const RO: CountryData = {
  code: "RO",
  nameLocal: "România",
  nameEN: "Romania",
  nameDE: "Rumänien",
  flag: "🇷🇴",
  languages: ["ro"],
  euMemberSince: 2007,
  dpaName: "Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)",
  dpaUrl: "https://www.dataprotection.ro",
  csirtName: "DNSC / CERT-RO",
  csirtUrl: "https://dnsc.ro",
  regulations: {
    nis2: {
      authority: "Directoratul Național de Securitate Cibernetică (DNSC)",
      authorityUrl: "https://dnsc.ro",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Banca Națională a României (BNR) / ASF",
      authorityUrl: "https://www.bnr.ro",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Legea nr. 190/2018",
      authority: "Autoritatea Națională de Supraveghere (ANSPDCP)",
      authorityUrl: "https://www.dataprotection.ro",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Autoritatea Națională pentru Administrare și Reglementare în Comunicații (ANCOM)",
      authorityUrl: "https://www.ancom.ro",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Autoritatea de Supraveghere Financiară (ASF)",
      authorityUrl: "https://asfromania.ro",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Autoritatea Națională pentru Administrare și Reglementare în Comunicații (ANCOM)",
      authorityUrl: "https://www.ancom.ro",
      implementationStatus: "pending",
      nationalNotes: "Rumänien designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Autoritatea de Supraveghere Financiară (ASF)",
      authorityUrl: "https://asfromania.ro",
      implementationStatus: "implemented",
      nationalNotes: "Rumänien hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Directoratul Național de Securitate Cibernetică (DNSC)",
      authorityUrl: "https://dnsc.ro",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). DNSC wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministerul Muncii și Solidarității Sociale",
      authorityUrl: "https://www.mmuncii.ro",
      implementationStatus: "pending",
      nationalNotes: "Rumänien setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Autoritatea Națională pentru Protecția Consumatorilor (ANPC)",
      authorityUrl: "https://www.anpc.gov.ro",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. ANPC führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "ANSPDCP / ANCOM",
      authorityUrl: "https://www.dataprotection.ro",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. ANSPDCP und ANCOM koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Autoritatea Națională de Supraveghere (ANSPDCP)",
      authorityUrl: "https://www.dataprotection.ro",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Rumänien wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Autoritatea pentru Digitalizarea României (ADR)",
      authorityUrl: "https://www.adr.gov.ro",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Rumänien baut digitale Identitätslösungen über ADR auf.",
    },
    ehds: {
      authority: "Ministerul Sănătății",
      authorityUrl: "https://www.ms.ro",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Rumänien baut auf dem eHealth-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Autoritatea Națională pentru Protecția Consumatorilor (ANPC)",
      authorityUrl: "https://www.anpc.gov.ro",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in rumänisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministerul Justiției",
      authorityUrl: "https://www.just.ro",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministerul Mediului, Apelor și Pădurilor",
      authorityUrl: "https://www.mmediu.ro",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default RO;
