import type { CountryData } from "./types";

const IE: CountryData = {
  code: "IE",
  nameLocal: "Éire / Ireland",
  nameEN: "Ireland",
  nameDE: "Irland",
  flag: "🇮🇪",
  languages: ["en", "ga"],
  euMemberSince: 1973,
  dpaName: "Data Protection Commission (DPC)",
  dpaUrl: "https://www.dataprotection.ie",
  csirtName: "NCSC Ireland",
  csirtUrl: "https://www.ncsc.gov.ie",
  regulations: {
    nis2: {
      nationalLawName: "Cybersecurity Bill (in progress)",
      authority: "National Cyber Security Centre (NCSC)",
      authorityUrl: "https://www.ncsc.gov.ie",
      implementationStatus: "pending",
      nationalNotes: "Irland setzt NIS2 durch ein eigenes Cybersicherheitsgesetz um.",
    },
    dora: {
      authority: "Central Bank of Ireland",
      authorityUrl: "https://www.centralbank.ie",
      implementationStatus: "implemented",
      nationalNotes: "DORA seit Januar 2025 unmittelbar anwendbar. Central Bank of Ireland beaufsichtigt Finanzunternehmen.",
    },
    dsgvo: {
      nationalLawName: "Data Protection Act 2018",
      authority: "Data Protection Commission (DPC)",
      authorityUrl: "https://www.dataprotection.ie",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
      nationalNotes: "Irland ist federführende Aufsichtsbehörde für viele große Tech-Unternehmen (Meta, Google, Apple, LinkedIn) aufgrund deren EU-Hauptsitz.",
    },
    dsa: {
      authority: "Coimisiún na Meán (Online Safety)",
      authorityUrl: "https://www.cnam.ie",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Central Bank of Ireland",
      authorityUrl: "https://www.centralbank.ie",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "AI Authority (in Gründung unter dem AI Act Implementation Bill)",
      authorityUrl: "https://www.gov.ie",
      implementationStatus: "pending",
      nationalNotes: "Irland richtet eine eigene AI Authority als Marktüberwachungsbehörde für den AI Act ein.",
    },
    csrd: {
      authority: "Irish Auditing and Accounting Supervisory Authority (IAASA)",
      authorityUrl: "https://www.iaasa.ie",
      implementationStatus: "implemented",
      nationalNotes: "Irland hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "National Cyber Security Centre (NCSC)",
      authorityUrl: "https://www.ncsc.gov.ie",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). NCSC wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Department of Enterprise, Trade and Employment (DETE)",
      authorityUrl: "https://enterprise.gov.ie",
      implementationStatus: "pending",
      nationalNotes: "Irland setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Das DETE koordiniert die nationale Umsetzung.",
    },
    hschg: {
      authority: "Competition and Consumer Protection Commission (CCPC)",
      authorityUrl: "https://www.ccpc.ie",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. CCPC führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Data Protection Commission (DPC) / ComReg",
      authorityUrl: "https://www.dataprotection.ie",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. DPC und ComReg koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Data Protection Commission (DPC)",
      authorityUrl: "https://www.dataprotection.ie",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Irland wendet die ePrivacy Regulations 2011 (S.I. 336/2011) an.",
    },
    eidas: {
      authority: "Department of Public Expenditure, NDP Delivery and Reform",
      authorityUrl: "https://www.gov.ie",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Irland betreibt MyGovID als digitale Identitätslösung.",
    },
    ehds: {
      authority: "Department of Health / Health Service Executive (HSE)",
      authorityUrl: "https://www.gov.ie/health",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Irland baut auf der bestehenden eHealth-Infrastruktur auf.",
    },
    "green-claims": {
      authority: "Competition and Consumer Protection Commission (CCPC)",
      authorityUrl: "https://www.ccpc.ie",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in irisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Department of Justice",
      authorityUrl: "https://www.justice.ie",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden. Der Liability for Defective Products Act 1991 wird modernisiert.",
    },
    dpp: {
      authority: "Department of the Environment, Climate and Communications (DECC)",
      authorityUrl: "https://www.gov.ie/decc",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default IE;
