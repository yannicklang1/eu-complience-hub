import type { CountryData } from "./types";

const LT: CountryData = {
  code: "LT",
  nameLocal: "Lietuva",
  nameEN: "Lithuania",
  nameDE: "Litauen",
  flag: "🇱🇹",
  languages: ["lt"],
  euMemberSince: 2004,
  dpaName: "Valstybinė duomenų apsaugos inspekcija (VDAI)",
  dpaUrl: "https://vdai.lrv.lt",
  csirtName: "NKSC / CERT-LT",
  csirtUrl: "https://www.nksc.lt",
  regulations: {
    nis2: {
      nationalLawName: "Kibernetinio saugumo įstatymas",
      authority: "Nacionalinis kibernetinio saugumo centras (NKSC)",
      authorityUrl: "https://www.nksc.lt",
      implementationStatus: "implemented",
    },
    dora: {
      authority: "Lietuvos bankas",
      authorityUrl: "https://www.lb.lt",
      implementationStatus: "implemented",
    },
    dsgvo: {
      nationalLawName: "Asmens duomenų teisinės apsaugos įstatymas",
      authority: "Valstybinė duomenų apsaugos inspekcija (VDAI)",
      authorityUrl: "https://vdai.lrv.lt",
      implementationStatus: "implemented",
      nationalFines: "Bis zu 20 Mio. € oder 4 % des weltweiten Jahresumsatzes",
    },
    dsa: {
      authority: "Ryšių reguliavimo tarnyba (RRT)",
      authorityUrl: "https://www.rrt.lt",
      implementationStatus: "implemented",
    },
    mica: {
      authority: "Lietuvos bankas",
      authorityUrl: "https://www.lb.lt",
      implementationStatus: "implemented",
    },
    "ai-act": {
      authority: "Ryšių reguliavimo tarnyba (RRT) / VDAI",
      authorityUrl: "https://www.rrt.lt",
      implementationStatus: "pending",
      nationalNotes: "Litauen designiert nationale Aufsichtsbehörden für den AI Act.",
    },
    csrd: {
      authority: "Lietuvos bankas",
      authorityUrl: "https://www.lb.lt",
      implementationStatus: "implemented",
      nationalNotes: "Litauen hat die CSRD umgesetzt. Große börsennotierte Unternehmen berichten ab GJ 2024.",
    },
    cra: {
      authority: "Nacionalinis kibernetinio saugumo centras (NKSC)",
      authorityUrl: "https://www.nksc.lt",
      implementationStatus: "pending",
      nationalNotes: "Der CRA gilt ab August 2025 (Grundpflichten). NKSC wird voraussichtlich als Marktüberwachungsbehörde designiert.",
    },
    bafg: {
      authority: "Socialinės apsaugos ir darbo ministerija",
      authorityUrl: "https://socmin.lrv.lt",
      implementationStatus: "pending",
      nationalNotes: "Litauen setzt die EU-Lieferkettenrichtlinie (CSDDD) um. Ein nationales Sorgfaltspflichtengesetz ist in Vorbereitung.",
    },
    hschg: {
      authority: "Valstybinė vartotojų teisių apsaugos tarnyba (VVTAT)",
      authorityUrl: "https://www.vvtat.lt",
      implementationStatus: "implemented",
      nationalNotes: "Das EU-Produktsicherheitsgesetz (GPSR) gilt seit Dezember 2024 direkt. VVTAT führt Marktüberwachung durch.",
    },
    "data-act": {
      authority: "Valstybinė duomenų apsaugos inspekcija (VDAI) / RRT",
      authorityUrl: "https://vdai.lrv.lt",
      nationalDeadline: "12. September 2025",
      implementationStatus: "pending",
      nationalNotes: "Der Data Act gilt ab September 2025. VDAI und RRT koordinieren die nationale Durchsetzung.",
    },
    eprivacy: {
      authority: "Valstybinė duomenų apsaugos inspekcija (VDAI)",
      authorityUrl: "https://vdai.lrv.lt",
      implementationStatus: "pending",
      nationalNotes: "Die ePrivacy-Verordnung ist noch nicht verabschiedet. Litauen wendet das Gesetz über elektronische Kommunikation an.",
    },
    eidas: {
      authority: "Informacinės visuomenės plėtros komitetas (IVPK)",
      authorityUrl: "https://ivpk.lrv.lt",
      implementationStatus: "implemented",
      nationalNotes: "eIDAS 2.0 schafft den Rahmen für die EUDI-Wallet. Litauen nutzt den elektronischen Personalausweis als digitale Identitätslösung.",
    },
    ehds: {
      authority: "Sveikatos apsaugos ministerija / E. sveikatos agentūra",
      authorityUrl: "https://sam.lrv.lt",
      implementationStatus: "pending",
      nationalNotes: "Der EHDS ist in Umsetzung. Litauen baut auf dem ESPBI-System als nationale Gesundheitsdateninfrastruktur auf.",
    },
    "green-claims": {
      authority: "Valstybinė vartotojų teisių apsaugos tarnyba (VVTAT)",
      authorityUrl: "https://www.vvtat.lt",
      implementationStatus: "pending",
      nationalNotes: "Die Green Claims Directive wird voraussichtlich 2026 in litauisches Recht umgesetzt.",
    },
    produkthaftung: {
      authority: "Teisingumo ministerija",
      authorityUrl: "https://tm.lrv.lt",
      implementationStatus: "pending",
      nationalNotes: "Die neue EU-Produkthaftungsrichtlinie muss bis Dezember 2026 umgesetzt werden.",
    },
    dpp: {
      authority: "Aplinkos ministerija",
      authorityUrl: "https://am.lrv.lt",
      implementationStatus: "pending",
      nationalNotes: "Der Digitale Produktpass wird stufenweise ab 2027 eingeführt.",
    },
  },
};

export default LT;
