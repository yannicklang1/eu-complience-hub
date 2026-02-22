import type { CountryData } from "./types";

const EE: CountryData = {
  code: "EE",
  nameLocal: "Eesti",
  nameEN: "Estonia",
  nameDE: "Estland",
  flag: "🇪🇪",
  languages: ["et"],
  euMemberSince: 2004,
  dpaName: "Andmekaitse Inspektsioon (AKI)",
  dpaUrl: "https://www.aki.ee",
  csirtName: "RIA / CERT-EE",
  csirtUrl: "https://www.ria.ee",
  regulations: {
    nis2: {
      nationalLawName: "Küberturvalisuse seadus (KütS)",
      authority: "Riigi Infosüsteemi Amet (RIA)",
      authorityUrl: "https://www.ria.ee",
      implementationStatus: "implemented",
      nationalNotes: "Estland war eines der ersten EU-Länder, das NIS2 vollständig umgesetzt hat — aufbauend auf der starken digitalen Infrastruktur.",
    },
    dora: {
      authority: "Finantsinspektsioon (FI)",
      authorityUrl: "https://www.fi.ee",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Isikuandmete kaitse seadus (IKS)",
      authority: "Andmekaitse Inspektsioon (AKI)",
      authorityUrl: "https://www.aki.ee",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
      nationalNotes: "Estland ist digitaler Vorreiter mit e-Residency, X-Road-Infrastruktur und fortschrittlichen E-Government-Diensten.",
    },
    dsa: {
      authority: "Tarbijakaitse ja Tehnilise Järelevalve Amet (TTJA)",
      authorityUrl: "https://www.ttja.ee",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Finantsinspektsioon (FI)",
      authorityUrl: "https://www.fi.ee",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Tarbijakaitse ja Tehnilise Järelevalve Amet (TTJA) / AKI",
      authorityUrl: "https://www.ttja.ee",
      implementationStatus: "pending",
      nationalNotes: "Estland designiert nationale Aufsichtsbehörden für den AI Act. TTJA und AKI koordinieren.",
    },
    csrd: {
      authority: "Finantsinspektsioon (FI)",
      authorityUrl: "https://www.fi.ee",
      implementationStatus: "implemented",
      nationalNotes: "Estland hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Riigi Infosüsteemi Amet (RIA)",
      authorityUrl: "https://www.ria.ee",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). RIA wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Sotsiaalministeerium",
      authorityUrl: "https://www.sm.ee",
      implementationStatus: "pending",
      nationalNotes: "Estland setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Tarbijakaitse ja Tehnilise Järelevalve Amet (TTJA)",
      authorityUrl: "https://www.ttja.ee",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. TTJA führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Andmekaitse Inspektsioon (AKI) / TTJA",
      authorityUrl: "https://www.aki.ee",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. AKI und TTJA koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Andmekaitse Inspektsioon (AKI)",
      authorityUrl: "https://www.aki.ee",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Estland wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Riigi Infosüsteemi Amet (RIA)",
      authorityUrl: "https://www.ria.ee",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Estland betreibt e-ID und e-Residency als digitale Identitätslösungen — weltweit führend.",
    },
    ehds: {
      authority: "Sotsiaalministeerium / Tervise Infosüsteemide Keskus (TEHIK)",
      authorityUrl: "https://www.tehik.ee",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Estland baut auf dem Patienten-Portal (digilugu.ee) und X-Road als Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Tarbijakaitse ja Tehnilise Järelevalve Amet (TTJA)",
      authorityUrl: "https://www.ttja.ee",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in estnisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Justiitsministeerium",
      authorityUrl: "https://www.just.ee",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Kliimaministeerium",
      authorityUrl: "https://www.kliimaministeerium.ee",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default EE;
