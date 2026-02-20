"use client";

import Link from "next/link";

export interface RecommendedTool {
  name: string;
  logo: string;
  logoUrl?: string;
  tagline: string;
  priceRange: string;
  targetSize: string;
  comparisonSlug: string;
  affiliateUrl: string;
  dachRelevance: number;
}

export const toolSets: Record<string, { title: string; subtitle: string; tools: RecommendedTool[] }> = {
  /* ═══════════ NIS2 / NISG ═══════════ */
  nis2: {
    title: "Empfohlene Tools für NIS2-Compliance",
    subtitle: "ISMS-Software, Incident-Management und Schwachstellen-Monitoring für Ihre NIS2-Umsetzung",
    tools: [
      { name: "DataGuard", logo: "🇩🇪", logoUrl: "/logos/dataguard.png", tagline: "ISMS + DSB aus Deutschland", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.dataguard.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Secjur", logo: "🇩🇪", logoUrl: "/logos/secjur.png", tagline: "KI-gestütztes ISMS aus Deutschland", priceRange: "ab 4.000 €/Jahr", targetSize: "KMU & Startups", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.secjur.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Vanta", logo: "🛡️", logoUrl: "/logos/vanta.png", tagline: "Automatisierte Compliance-Plattform", priceRange: "ab 10.000 €/Jahr", targetSize: "Startups & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.vanta.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Secureframe", logo: "🔒", logoUrl: "/logos/secureframe.png", tagline: "SOC 2 + ISO 27001 Automatisierung", priceRange: "ab 8.000 €/Jahr", targetSize: "Startups & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://secureframe.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "PagerDuty", logo: "🔔", logoUrl: "/logos/pagerduty.png", tagline: "24h-Meldepflicht Incident Management", priceRange: "ab 500 €/Monat", targetSize: "Alle Größen", comparisonSlug: "incident-management-vergleich", affiliateUrl: "https://www.pagerduty.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Snyk", logo: "🐛", logoUrl: "/logos/snyk.png", tagline: "Developer-First Security & SBOM", priceRange: "Kostenlos / ab 500 €/Monat", targetSize: "Entwicklerteams", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://snyk.io/?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ DORA ═══════════ */
  dora: {
    title: "Empfohlene Tools für DORA-Compliance",
    subtitle: "IKT-Risikomanagement, Incident Reporting und TLPT für Finanzunternehmen",
    tools: [
      { name: "ServiceNow", logo: "⚡", logoUrl: "/logos/servicenow.png", tagline: "Enterprise ITSM & Security Operations", priceRange: "ab 25.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "incident-management-vergleich", affiliateUrl: "https://www.servicenow.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Archer (RSA)", logo: "🎯", logoUrl: "/logos/archerirm.png", tagline: "Enterprise GRC & Risikomanagement", priceRange: "ab 30.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "risikomanagement-vergleich", affiliateUrl: "https://www.archerirm.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "LogicGate", logo: "☁️", logoUrl: "/logos/logicgate.png", tagline: "Agiles GRC für den Mittelstand", priceRange: "ab 15.000 €/Jahr", targetSize: "Mittelstand", comparisonSlug: "risikomanagement-vergleich", affiliateUrl: "https://www.logicgate.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "OneTrust", logo: "🌐", logoUrl: "/logos/onetrust.png", tagline: "GRC, Privacy & Third-Party Risk", priceRange: "ab 20.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "risikomanagement-vergleich", affiliateUrl: "https://www.onetrust.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "PagerDuty", logo: "🔔", logoUrl: "/logos/pagerduty.png", tagline: "24h-Incident-Meldung & Eskalation", priceRange: "ab 500 €/Monat", targetSize: "Alle Größen", comparisonSlug: "incident-management-vergleich", affiliateUrl: "https://www.pagerduty.com/?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ AI ACT ═══════════ */
  "ai-act": {
    title: "Empfohlene Tools für AI Act-Compliance",
    subtitle: "KI-Governance, Risikobewertung und Compliance-Management für den EU AI Act",
    tools: [
      { name: "OneTrust", logo: "🌐", logoUrl: "/logos/onetrust.png", tagline: "AI Governance & Privacy Management", priceRange: "ab 20.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.onetrust.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "DataGuard", logo: "🇩🇪", logoUrl: "/logos/dataguard.png", tagline: "DSMS + KI-Compliance aus Deutschland", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.dataguard.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Drata", logo: "✅", logoUrl: "/logos/drata.png", tagline: "Compliance-Automatisierung", priceRange: "ab 12.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://drata.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Vanta", logo: "🛡️", logoUrl: "/logos/vanta.png", tagline: "Continuous Monitoring & AI Compliance", priceRange: "ab 10.000 €/Jahr", targetSize: "Startups & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.vanta.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "SonarQube", logo: "🔍", logoUrl: "/logos/sonarqube.png", tagline: "Code-Qualität & Security für KI-Software", priceRange: "Kostenlos / ab 150 €/Monat", targetSize: "Entwicklerteams", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.sonarsource.com/?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ CRA ═══════════ */
  cra: {
    title: "Empfohlene Tools für CRA-Compliance",
    subtitle: "Schwachstellen-Management, SBOM-Erstellung und Security-by-Design für digitale Produkte",
    tools: [
      { name: "Snyk", logo: "🐛", logoUrl: "/logos/snyk.png", tagline: "Developer-First Security & SBOM", priceRange: "Kostenlos / ab 500 €/Monat", targetSize: "Entwicklerteams", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://snyk.io/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "SonarQube", logo: "🔍", logoUrl: "/logos/sonarqube.png", tagline: "Statische Code-Analyse & Security", priceRange: "Kostenlos / ab 150 €/Monat", targetSize: "Entwicklerteams", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.sonarsource.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Vanta", logo: "🛡️", logoUrl: "/logos/vanta.png", tagline: "Compliance + Vulnerability Tracking", priceRange: "ab 10.000 €/Jahr", targetSize: "Startups & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.vanta.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Secureframe", logo: "🔒", logoUrl: "/logos/secureframe.png", tagline: "Automatisierte Sicherheits-Compliance", priceRange: "ab 8.000 €/Jahr", targetSize: "Startups & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://secureframe.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "RiskOptics ZenGRC", logo: "📊", logoUrl: "/logos/zengrc.png", tagline: "GRC Made Simple", priceRange: "ab 8.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "risikomanagement-vergleich", affiliateUrl: "https://reciprocity.com/?ref=eu-compliance-hub", dachRelevance: 2 },
    ],
  },
  /* ═══════════ DSGVO ═══════════ */
  dsgvo: {
    title: "Empfohlene Tools für DSGVO-Compliance",
    subtitle: "Datenschutz-Management, Consent-Plattformen und Verarbeitungsverzeichnis",
    tools: [
      { name: "DataGuard", logo: "🇩🇪", logoUrl: "/logos/dataguard.png", tagline: "DSMS + externer DSB aus Deutschland", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.dataguard.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "heyData", logo: "🔐", logoUrl: "/logos/heydata.png", tagline: "DSGVO-Komplettlösung für KMU", priceRange: "ab 2.400 €/Jahr", targetSize: "KMU & Startups", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.heydata.eu/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Secjur", logo: "🇩🇪", logoUrl: "/logos/secjur.png", tagline: "KI-gestützter Digital Compliance Office", priceRange: "ab 4.000 €/Jahr", targetSize: "KMU & Startups", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.secjur.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "OneTrust", logo: "🌐", logoUrl: "/logos/onetrust.png", tagline: "Privacy Management & Consent", priceRange: "ab 20.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.onetrust.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Drata", logo: "✅", logoUrl: "/logos/drata.png", tagline: "SOC 2 + DSGVO Automatisierung", priceRange: "ab 12.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://drata.com/?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ CSRD / ESG ═══════════ */
  csrd: {
    title: "Empfohlene Tools für CSRD/ESG-Compliance",
    subtitle: "Nachhaltigkeitsberichterstattung, Carbon Accounting und ESRS-Datenerhebung",
    tools: [
      { name: "Plan A", logo: "🌍", logoUrl: "/logos/plana.png", tagline: "Dekarbonisierung & ESG-Reporting aus Berlin", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "esg-software-vergleich", affiliateUrl: "https://plana.earth/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Sweep", logo: "🌱", logoUrl: "/logos/sweep.png", tagline: "Carbon & ESG-Management", priceRange: "ab 8.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "esg-software-vergleich", affiliateUrl: "https://www.sweep.net/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Tanso", logo: "🇩🇪", logoUrl: "/logos/tanso.png", tagline: "Carbon Accounting für Industrie (DE)", priceRange: "Auf Anfrage", targetSize: "Mittelstand (Industrie)", comparisonSlug: "esg-software-vergleich", affiliateUrl: "https://www.tanso.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Normative", logo: "📊", logoUrl: "/logos/normative.png", tagline: "Datengetriebenes Carbon Accounting", priceRange: "ab 3.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "esg-software-vergleich", affiliateUrl: "https://normative.io/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Greenly", logo: "🌿", logoUrl: "/logos/greenly.png", tagline: "KI-gestütztes ESG für CSRD", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU (50–500 MA)", comparisonSlug: "esg-software-vergleich", affiliateUrl: "https://greenly.earth/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Position Green", logo: "📈", logoUrl: "/logos/positiongreen.png", tagline: "Enterprise Sustainability Platform", priceRange: "ab 10.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "esg-software-vergleich", affiliateUrl: "https://www.positiongreen.com/?ref=eu-compliance-hub", dachRelevance: 4 },
    ],
  },
  /* ═══════════ BaFG / ACCESSIBILITY ═══════════ */
  bafg: {
    title: "Empfohlene Tools für BaFG-Compliance",
    subtitle: "WCAG-Prüfung, Accessibility-Monitoring und Barrierefreiheits-Management",
    tools: [
      { name: "Eye-Able", logo: "👁️", logoUrl: "/logos/eye-able.png", tagline: "Barrierefreiheit aus Nürnberg", priceRange: "ab 1.200 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "accessibility-software-vergleich", affiliateUrl: "https://eye-able.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Siteimprove", logo: "📐", logoUrl: "/logos/siteimprove.png", tagline: "Accessibility & Content Quality", priceRange: "ab 5.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "accessibility-software-vergleich", affiliateUrl: "https://www.siteimprove.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Deque (axe)", logo: "🪓", logoUrl: "/logos/deque.png", tagline: "Automatisierte WCAG-Tests für Entwickler", priceRange: "Kostenlos / Pro auf Anfrage", targetSize: "Entwicklerteams", comparisonSlug: "accessibility-software-vergleich", affiliateUrl: "https://www.deque.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "UserWay", logo: "♿", logoUrl: "/logos/userway.png", tagline: "AI-powered Accessibility Widget", priceRange: "ab 500 €/Jahr", targetSize: "KMU & Startups", comparisonSlug: "accessibility-software-vergleich", affiliateUrl: "https://userway.org/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "AudioEye", logo: "👂", logoUrl: "/logos/audioeye.png", tagline: "Web Accessibility für EAA-Compliance", priceRange: "ab 49 €/Monat", targetSize: "KMU & Mittelstand", comparisonSlug: "accessibility-software-vergleich", affiliateUrl: "https://www.audioeye.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "accessiBe", logo: "♿", logoUrl: "/logos/accessibe.png", tagline: "KI-gestützte Web-Barrierefreiheit", priceRange: "ab 49 €/Monat", targetSize: "KMU & Startups", comparisonSlug: "accessibility-software-vergleich", affiliateUrl: "https://accessibe.com/?ref=eu-compliance-hub", dachRelevance: 2 },
    ],
  },
  /* ═══════════ HSchG / WHISTLEBLOWER ═══════════ */
  hschg: {
    title: "Empfohlene Tools für HSchG-Compliance",
    subtitle: "Whistleblower-Meldekanäle, Case Management und Hinweisgeberschutz",
    tools: [
      { name: "EQS Integrity Line", logo: "📢", logoUrl: "/logos/integrityline.png", tagline: "Marktführer Hinweisgebersystem (DE)", priceRange: "ab 3.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "whistleblower-software-vergleich", affiliateUrl: "https://www.integrityline.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Hintbox", logo: "📬", logoUrl: "/logos/hintbox.png", tagline: "DSGVO-konformes Hinweisgebersystem (DE)", priceRange: "ab 1.500 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "whistleblower-software-vergleich", affiliateUrl: "https://www.hintbox.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Whistly", logo: "🇦🇹", logoUrl: "/logos/whistly.png", tagline: "Österreichisches Hinweisgebersystem", priceRange: "ab 1.200 €/Jahr", targetSize: "KMU & Startups", comparisonSlug: "whistleblower-software-vergleich", affiliateUrl: "https://www.whistly.eu/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "FaceUp", logo: "🗣️", logoUrl: "/logos/faceup.png", tagline: "Whistleblowing für 113 Sprachen", priceRange: "Auf Anfrage", targetSize: "KMU & Mittelstand", comparisonSlug: "whistleblower-software-vergleich", affiliateUrl: "https://www.faceup.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "NAVEX", logo: "🏛️", logoUrl: "/logos/navex.png", tagline: "Globale Whistleblowing-Plattform", priceRange: "Auf Anfrage", targetSize: "Enterprise", comparisonSlug: "whistleblower-software-vergleich", affiliateUrl: "https://www.navex.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Whistleblower Software", logo: "🔐", logoUrl: "/logos/whistleblowersoftware.png", tagline: "E2E-verschlüsselt & ISAE 3000 zertifiziert", priceRange: "ab 99 €/Monat", targetSize: "KMU & Mittelstand", comparisonSlug: "whistleblower-software-vergleich", affiliateUrl: "https://whistleblowersoftware.com/?ref=eu-compliance-hub", dachRelevance: 4 },
    ],
  },
  /* ═══════════ DPP / ESPR ═══════════ */
  dpp: {
    title: "Empfohlene Tools für Digitaler Produktpass (DPP)",
    subtitle: "PLM-Systeme, Supply-Chain-Traceability und DPP-Plattformen für ESPR-Compliance",
    tools: [
      { name: "Siemens Teamcenter", logo: "🏭", logoUrl: "/logos/siemens.png", tagline: "PLM & Digital Twin Plattform", priceRange: "ab 7.000 €/User/Jahr", targetSize: "Enterprise (Industrie)", comparisonSlug: "plm-software-vergleich", affiliateUrl: "https://plm.sw.siemens.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "SAP Green Token", logo: "🏢", logoUrl: "/logos/sap.png", tagline: "Tokenisierte ESG-Daten für Supply Chain", priceRange: "Auf Anfrage", targetSize: "Enterprise", comparisonSlug: "plm-software-vergleich", affiliateUrl: "https://www.sap.com/products/scm/green-token.html?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Catena-X", logo: "🔗", logoUrl: "/logos/catena-x.png", tagline: "Offenes Datenökosystem für DPP (Automotive)", priceRange: "Open Source", targetSize: "Automotive & Industrie", comparisonSlug: "plm-software-vergleich", affiliateUrl: "https://catena-x.net/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Circulor", logo: "♻️", logoUrl: "/logos/circulor.png", tagline: "Supply Chain Traceability & DPP", priceRange: "ab 20.000 €/Jahr", targetSize: "Enterprise & Mittelstand", comparisonSlug: "plm-software-vergleich", affiliateUrl: "https://www.circulor.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Spherity", logo: "🌐", logoUrl: "/logos/spherity.png", tagline: "Decentralized Identity & DPP (DE)", priceRange: "ab 15.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "plm-software-vergleich", affiliateUrl: "https://spherity.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "iPoint Systems", logo: "🏗️", logoUrl: "/logos/ipoint.png", tagline: "Product Sustainability & LCA (DE)", priceRange: "Auf Anfrage", targetSize: "Mittelstand & Enterprise", comparisonSlug: "plm-software-vergleich", affiliateUrl: "https://www.ipoint-systems.com/?ref=eu-compliance-hub", dachRelevance: 5 },
    ],
  },
  /* ═══════════ MiCA ═══════════ */
  mica: {
    title: "Empfohlene Tools für MiCA-Compliance",
    subtitle: "AML/KYC-Systeme, Blockchain-Analyse, Travel Rule und CASP-Compliance",
    tools: [
      { name: "Chainalysis", logo: "🔗", logoUrl: "/logos/chainalysis.png", tagline: "Blockchain-Analyse & Travel Rule", priceRange: "ab 30.000 €/Jahr", targetSize: "Enterprise & Mittelstand", comparisonSlug: "crypto-compliance-vergleich", affiliateUrl: "https://www.chainalysis.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Elliptic", logo: "🔎", logoUrl: "/logos/elliptic.png", tagline: "Krypto-Compliance & AML-Screening", priceRange: "ab 20.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "crypto-compliance-vergleich", affiliateUrl: "https://www.elliptic.co/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "TRM Labs", logo: "🕵️", logoUrl: "/logos/trmlabs.png", tagline: "Blockchain Intelligence & Crypto Crime", priceRange: "Auf Anfrage", targetSize: "Enterprise & Behörden", comparisonSlug: "crypto-compliance-vergleich", affiliateUrl: "https://www.trmlabs.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Notabene", logo: "✈️", logoUrl: "/logos/notabene.png", tagline: "Travel Rule & VASP Compliance", priceRange: "ab 10.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "crypto-compliance-vergleich", affiliateUrl: "https://notabene.id/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Sumsub", logo: "🆔", logoUrl: "/logos/sumsub.png", tagline: "KYC, AML & Transaction Monitoring", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Startups", comparisonSlug: "crypto-compliance-vergleich", affiliateUrl: "https://sumsub.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Crystal", logo: "💎", logoUrl: "/logos/crystal.png", tagline: "All-in-One Blockchain Analytics", priceRange: "Auf Anfrage", targetSize: "Enterprise & Behörden", comparisonSlug: "crypto-compliance-vergleich", affiliateUrl: "https://crystalintelligence.com/?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ GREEN CLAIMS ═══════════ */
  "green-claims": {
    title: "Empfohlene Tools für Green Claims Compliance",
    subtitle: "LCA-Software, Carbon Accounting und Nachhaltigkeitsverifizierung für GCD-konforme Umweltaussagen",
    tools: [
      { name: "Sphera (GaBi)", logo: "🌿", logoUrl: "/logos/sphera.png", tagline: "LCA-Software & Ökobilanz (GaBi)", priceRange: "ab 15.000 €/Jahr", targetSize: "Mittelstand & Enterprise", comparisonSlug: "lca-software-vergleich", affiliateUrl: "https://sphera.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "SimaPro", logo: "📊", logoUrl: "/logos/simapro.png", tagline: "Professionelle LCA für Nachhaltigkeitsexperten", priceRange: "ab 7.000 €/Jahr", targetSize: "Professional & Enterprise", comparisonSlug: "lca-software-vergleich", affiliateUrl: "https://simapro.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "openLCA", logo: "🌱", logoUrl: "/logos/openlca.png", tagline: "Open-Source LCA Software (Berlin)", priceRange: "Kostenlos (Software)", targetSize: "Alle Größen", comparisonSlug: "lca-software-vergleich", affiliateUrl: "https://www.openlca.org/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "ClimatePartner", logo: "🌍", logoUrl: "/logos/climatepartner.png", tagline: "CO₂-Bilanzierung & Klimaschutz (München)", priceRange: "ab 9 €/Tonne CO₂", targetSize: "KMU & Enterprise", comparisonSlug: "lca-software-vergleich", affiliateUrl: "https://www.climatepartner.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Plan A", logo: "🌱", logoUrl: "/logos/plana.png", tagline: "ESG-Plattform & Scope-3-Tracking (Berlin)", priceRange: "ab 500 €/Monat", targetSize: "KMU & Mittelstand", comparisonSlug: "lca-software-vergleich", affiliateUrl: "https://plana.earth/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "iPoint Systems", logo: "🏗️", logoUrl: "/logos/ipoint.png", tagline: "Product Sustainability & automatisierte LCA", priceRange: "Auf Anfrage", targetSize: "Mittelstand & Enterprise", comparisonSlug: "lca-software-vergleich", affiliateUrl: "https://www.ipoint-systems.com/?ref=eu-compliance-hub", dachRelevance: 5 },
    ],
  },
  /* ═══════════ PLD / PRODUKTHAFTUNG ═══════════ */
  pld: {
    title: "Empfohlene Tools für PLD-Compliance",
    subtitle: "Tech-Versicherungen, Produkthaftpflicht und Qualitätsdokumentation für die neue EU-Produkthaftung",
    tools: [
      { name: "exali", logo: "🇩🇪", logoUrl: "/logos/exali.png", tagline: "Digitale Berufshaftpflicht für Tech (DE)", priceRange: "ab 133 €/Jahr", targetSize: "Freelancer & KMU", comparisonSlug: "versicherungs-vergleich", affiliateUrl: "https://www.exali.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Hiscox", logo: "🛡️", logoUrl: "/logos/hiscox.png", tagline: "Cyber- & Produkthaftpflicht", priceRange: "ab 1.200 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "versicherungs-vergleich", affiliateUrl: "https://www.hiscox.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Allianz Cyber", logo: "🏦", logoUrl: "/logos/allianz.png", tagline: "Cyber Insurance & Risikomanagement", priceRange: "Auf Anfrage", targetSize: "Mittelstand & Enterprise", comparisonSlug: "versicherungs-vergleich", affiliateUrl: "https://commercial.allianz.com/solutions/cyber-insurance.html?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Chubb", logo: "🏢", logoUrl: "/logos/chubb.png", tagline: "Tech Insurance & Produkthaftpflicht", priceRange: "Auf Anfrage", targetSize: "Enterprise", comparisonSlug: "versicherungs-vergleich", affiliateUrl: "https://www.chubb.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Vanta", logo: "✅", logoUrl: "/logos/vanta.png", tagline: "Continuous Compliance & Audit-Trail", priceRange: "ab 10.000 €/Jahr", targetSize: "Startups & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.vanta.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Snyk", logo: "🐛", logoUrl: "/logos/snyk.png", tagline: "Security-by-Design für Software-Produkte", priceRange: "Kostenlos / ab 500 €/Monat", targetSize: "Entwicklerteams", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://snyk.io/?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ DSA ═══════════ */
  dsa: {
    title: "Empfohlene Tools für DSA-Compliance",
    subtitle: "Content-Moderation, Transparenz-Reporting und Notice-and-Action für Plattformen",
    tools: [
      { name: "Hive Moderation", logo: "🐝", logoUrl: "/logos/hive.png", tagline: "KI-gestützte Content-Moderation", priceRange: "ab 3.000 €/Monat", targetSize: "Plattformen & Marktplätze", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://thehive.ai/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "Crisp", logo: "💬", logoUrl: "/logos/crisp.png", tagline: "Trust & Safety Plattform", priceRange: "Auf Anfrage", targetSize: "Mittelstand & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.crisp.co/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "OneTrust", logo: "🌐", logoUrl: "/logos/onetrust.png", tagline: "Compliance & Transparency Reporting", priceRange: "ab 20.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.onetrust.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Zendesk", logo: "💛", logoUrl: "/logos/zendesk.png", tagline: "Beschwerdemanagement & Ticketing", priceRange: "ab 55 €/Agent/Monat", targetSize: "Alle Größen", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.zendesk.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "DataGuard", logo: "🇩🇪", logoUrl: "/logos/dataguard.png", tagline: "DSGVO + DSA Compliance Management", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.dataguard.de/?ref=eu-compliance-hub", dachRelevance: 5 },
    ],
  },
  /* ═══════════ EHDS ═══════════ */
  ehds: {
    title: "Empfohlene Tools für EHDS-Compliance",
    subtitle: "Interoperabilität, EHR-Systeme und Gesundheitsdaten-Management für den europäischen Gesundheitsdatenraum",
    tools: [
      { name: "InterSystems", logo: "🏥", logoUrl: "/logos/intersystems.png", tagline: "FHIR-native Gesundheitsdaten-Plattform", priceRange: "Auf Anfrage", targetSize: "Krankenhäuser & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.intersystems.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Dedalus", logo: "🏛️", logoUrl: "/logos/dedalus.png", tagline: "Europas größter Health-IT-Anbieter", priceRange: "Auf Anfrage", targetSize: "Krankenhäuser & Gesundheitseinrichtungen", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.dedalus.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "DataGuard", logo: "🇩🇪", logoUrl: "/logos/dataguard.png", tagline: "DSGVO Art. 9 + EHDS Compliance", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.dataguard.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "OneTrust", logo: "🌐", logoUrl: "/logos/onetrust.png", tagline: "Health Data Governance & Privacy", priceRange: "ab 20.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.onetrust.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Smile CDR", logo: "😊", logoUrl: "/logos/smilecdr.png", tagline: "FHIR Clinical Data Repository", priceRange: "Auf Anfrage", targetSize: "Health-Tech & Kliniken", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://smilecdr.com/?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ DATA ACT ═══════════ */
  "data-act": {
    title: "Empfohlene Tools für Data Act-Compliance",
    subtitle: "IoT-Datenzugang, Cloud-Switching und Daten-Governance für die EU-Datenverordnung",
    tools: [
      { name: "Snowflake", logo: "❄️", logoUrl: "/logos/snowflake.png", tagline: "Cloud Data Platform & Data Sharing", priceRange: "ab 2 €/Credit", targetSize: "Mittelstand & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.snowflake.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "OneTrust", logo: "🌐", logoUrl: "/logos/onetrust.png", tagline: "Data Governance & Privacy Management", priceRange: "ab 20.000 €/Jahr", targetSize: "Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.onetrust.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Collibra", logo: "📊", logoUrl: "/logos/collibra.png", tagline: "Data Intelligence & Governance", priceRange: "Auf Anfrage", targetSize: "Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.collibra.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "DataGuard", logo: "🇩🇪", logoUrl: "/logos/dataguard.png", tagline: "Daten-Compliance aus Deutschland", priceRange: "ab 5.000 €/Jahr", targetSize: "KMU & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.dataguard.de/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "HashiCorp Vault", logo: "🔐", logoUrl: "/logos/hashicorp.png", tagline: "Secrets Management & Data Access", priceRange: "Kostenlos / Enterprise auf Anfrage", targetSize: "Entwicklerteams & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.hashicorp.com/products/vault?ref=eu-compliance-hub", dachRelevance: 3 },
    ],
  },
  /* ═══════════ EPRIVACY ═══════════ */
  eprivacy: {
    title: "Empfohlene Tools für ePrivacy-Compliance",
    subtitle: "Consent Management, Cookie-Banner und Server-Side-Tracking für datenschutzkonformes Marketing",
    tools: [
      { name: "Usercentrics", logo: "🍪", logoUrl: "/logos/usercentrics.png", tagline: "CMP-Marktführer aus München", priceRange: "ab 60 €/Monat", targetSize: "KMU & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://usercentrics.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Cookiebot", logo: "🤖", logoUrl: "/logos/cookiebot.png", tagline: "Automatischer Cookie-Scanner & CMP", priceRange: "ab 12 €/Monat", targetSize: "KMU & Startups", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.cookiebot.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Consentmanager", logo: "✅", logoUrl: "/logos/consentmanager.png", tagline: "DSGVO- & TDDDG-konformes CMP (DE)", priceRange: "ab 18 €/Monat", targetSize: "KMU & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.consentmanager.net/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "JENTIS", logo: "🇦🇹", logoUrl: "/logos/jentis.png", tagline: "Server-Side-Tracking aus Österreich", priceRange: "ab 500 €/Monat", targetSize: "Mittelstand & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.jentis.com/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Stape", logo: "📡", logoUrl: "/logos/stape.png", tagline: "Server-Side GTM Hosting", priceRange: "ab 20 €/Monat", targetSize: "KMU & Startups", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://stape.io/?ref=eu-compliance-hub", dachRelevance: 4 },
    ],
  },
  /* ═══════════ EIDAS 2.0 ═══════════ */
  eidas: {
    title: "Empfohlene Tools für eIDAS 2.0-Compliance",
    subtitle: "Identity Verification, eSignature und Wallet-Integration für die EU Digital Identity",
    tools: [
      { name: "IDnow", logo: "🆔", logoUrl: "/logos/idnow.png", tagline: "Identity Verification aus München", priceRange: "ab 2 €/Verifikation", targetSize: "KMU & Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.idnow.io/?ref=eu-compliance-hub", dachRelevance: 5 },
      { name: "Veriff", logo: "✅", logoUrl: "/logos/veriff.png", tagline: "KI-gestützte Identitätsverifikation", priceRange: "ab 1.50 €/Verifikation", targetSize: "Startups & Mittelstand", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.veriff.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Jumio", logo: "🔍", logoUrl: "/logos/jumio.png", tagline: "End-to-End Identity Orchestration", priceRange: "Auf Anfrage", targetSize: "Enterprise", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.jumio.com/?ref=eu-compliance-hub", dachRelevance: 3 },
      { name: "DocuSign", logo: "📝", logoUrl: "/logos/docusign.png", tagline: "eSignature & CLM Plattform", priceRange: "ab 10 €/Monat", targetSize: "Alle Größen", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://www.docusign.com/?ref=eu-compliance-hub", dachRelevance: 4 },
      { name: "Yousign", logo: "✍️", logoUrl: "/logos/yousign.png", tagline: "EU-konforme eSignature (EIDAS)", priceRange: "ab 9 €/Monat", targetSize: "KMU & Startups", comparisonSlug: "isms-software-vergleich", affiliateUrl: "https://yousign.com/?ref=eu-compliance-hub", dachRelevance: 5 },
    ],
  },
};

export default function ToolRecommendation({
  regulationKey,
  accent = "#0A2540",
}: {
  regulationKey: string;
  accent?: string;
}) {
  const set = toolSets[regulationKey];
  if (!set) return null;

  return (
    <div
      className="rounded-2xl border p-6 sm:p-8 my-8"
      style={{
        background: `linear-gradient(135deg, ${accent}04, ${accent}08)`,
        borderColor: `${accent}15`,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <svg
          className="w-4 h-4 flex-shrink-0"
          style={{ color: accent }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        <h3 className="font-[Syne] font-bold text-base text-[#060c1a]">
          {set.title}
        </h3>
      </div>
      <p className="text-[#7a8db0] text-xs mb-5">{set.subtitle}</p>

      <div className={`grid gap-3 mb-4 ${set.tools.length <= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {set.tools.slice(0, 6).map((tool) => (
          <a
            key={tool.name}
            href={tool.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="rounded-xl border bg-white p-4 hover:shadow-md transition-all hover:-translate-y-0.5 group"
            style={{ borderColor: `${accent}12` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#f4f6fb] border border-[#e8ecf4] flex items-center justify-center flex-shrink-0 overflow-hidden">
                {tool.logoUrl ? (
                  <img
                    src={tool.logoUrl}
                    alt={`${tool.name} Logo`}
                    width={28}
                    height={28}
                    className="object-contain w-7 h-7"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const sibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (sibling) sibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <span
                  className="text-base items-center justify-center"
                  style={{ display: tool.logoUrl ? "none" : "flex" }}
                >
                  {tool.logo}
                </span>
              </div>
              <div>
                <div className="font-[Syne] font-bold text-sm text-[#060c1a] group-hover:text-[#0A2540] transition-colors">
                  {tool.name}
                </div>
                <div className="text-[10px] text-[#7a8db0]">{tool.tagline}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-[Syne] font-bold" style={{ color: accent }}>
                {tool.priceRange}
              </span>
              <span className="text-[#7a8db0]">{tool.targetSize}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t" style={{ borderColor: `${accent}10` }}>
        <Link
          href={`/tools/${set.tools[0]?.comparisonSlug ?? "isms-software-vergleich"}`}
          className="text-xs font-[Syne] font-semibold transition-colors hover:underline"
          style={{ color: accent }}
        >
          Vollst\u00e4ndigen Vergleich ansehen \u2192
        </Link>
        <span className="text-[10px] text-[#7a8db0]">
          * Affiliate-Links \u2014 keine Mehrkosten f\u00fcr Sie
        </span>
      </div>
    </div>
  );
}
