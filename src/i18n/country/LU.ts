import type { CountryData } from "./types";

const LU: CountryData = {
  code: "LU",
  nameLocal: "Lëtzebuerg / Luxembourg",
  nameEN: "Luxembourg",
  nameDE: "Luxemburg",
  flag: "🇱🇺",
  languages: ["lb", "fr", "de"],
  euMemberSince: 1957,
  dpaName: "Commission Nationale pour la Protection des Données (CNPD)",
  dpaUrl: "https://cnpd.public.lu",
  csirtName: "GOVCERT.LU / CIRCL",
  csirtUrl: "https://www.govcert.lu",
  regulations: {
    nis2: {
      nationalLawName: "Loi sur la cybersécurité",
      authority: "Institut Luxembourgeois de Régulation (ILR) / GOVCERT.LU",
      authorityUrl: "https://www.ilr.lu",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Commission de Surveillance du Secteur Financier (CSSF)",
      authorityUrl: "https://www.cssf.lu",
      implementationStatus: "implemented",
      nationalNotes: "Die CSSF ist eine führende EU-Finanzaufsichtsbehörde aufgrund der Rolle Luxemburgs als bedeutender Finanzplatz.",
    },
    dsgvo: {
      nationalLawName: "Loi du 1er août 2018 portant organisation de la Commission nationale pour la protection des données",
      authority: "Commission Nationale pour la Protection des Données (CNPD)",
      authorityUrl: "https://cnpd.public.lu",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Institut Luxembourgeois de Régulation (ILR)",
      authorityUrl: "https://www.ilr.lu",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Commission de Surveillance du Secteur Financier (CSSF)",
      authorityUrl: "https://www.cssf.lu",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Institut Luxembourgeois de Régulation (ILR) / CNPD",
      authorityUrl: "https://www.ilr.lu",
      implementationStatus: "pending",
      nationalNotes: "Luxemburg designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Commission de Surveillance du Secteur Financier (CSSF)",
      authorityUrl: "https://www.cssf.lu",
      implementationStatus: "implemented",
      nationalNotes: "Luxemburg hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "GOVCERT.LU / ILR",
      authorityUrl: "https://www.govcert.lu",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). GOVCERT.LU wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Ministère du Travail, de l'Emploi et de l'Économie sociale et solidaire",
      authorityUrl: "https://mteess.gouvernement.lu",
      implementationStatus: "pending",
      nationalNotes: "Luxemburg setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Institut Luxembourgeois de la Normalisation, de l'Accréditation, de la Sécurité (ILNAS)",
      authorityUrl: "https://ilnas.gouvernement.lu",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. ILNAS führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Commission Nationale pour la Protection des Données (CNPD) / ILR",
      authorityUrl: "https://cnpd.public.lu",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. CNPD und ILR koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Commission Nationale pour la Protection des Données (CNPD)",
      authorityUrl: "https://cnpd.public.lu",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Luxemburg wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Institut Luxembourgeois de la Normalisation, de l'Accréditation, de la Sécurité (ILNAS)",
      authorityUrl: "https://ilnas.gouvernement.lu",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Luxemburg betreibt LuxTrust und GouvID als digitale Identitätslösungen.",
    },
    ehds: {
      authority: "Ministère de la Santé / Agence eSanté",
      authorityUrl: "https://www.esante.lu",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Luxemburg baut auf der Agence eSanté und dem Dossier de Soins Partagé (DSP) als Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Ministère de l'Économie / ILNAS",
      authorityUrl: "https://meco.gouvernement.lu",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in luxemburgisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Ministère de la Justice",
      authorityUrl: "https://mj.gouvernement.lu",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Ministère de l'Environnement, du Climat et de la Biodiversité",
      authorityUrl: "https://mecb.gouvernement.lu",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default LU;
