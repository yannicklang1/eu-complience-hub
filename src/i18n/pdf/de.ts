/* ══════════════════════════════════════════════════════════════
   German (DE) — PDF Report translations
   Reference file: all strings extracted from current components
   ══════════════════════════════════════════════════════════════ */

import type { PDFMessages } from "./types";

const de: PDFMessages = {
  locale: "de",

  /* ── Cover Page ── */
  cover: {
    label: "EU Compliance Hub",
    title: "Ihr persönlicher",
    titleAccent: "Compliance-Report",
    preparedFor: "Erstellt für",
    dateLabel: "Erstellungsdatum: ",
    countryLabel: "Land: ",
    referenceLabel: "Referenz: ",
    confidential: "Vertraulich",
    disclaimer:
      "Dieser Report dient der Orientierung und ersetzt keine Rechtsberatung. Die enthaltenen Informationen basieren auf Ihren Angaben und den zum Erstellungszeitpunkt geltenden Regelungen.",
    branding: "eu-compliance-hub.eu",
    page: "Seite 1",
  },

  /* ── Table of Contents ── */
  toc: {
    title: "Inhaltsverzeichnis",
    subtitle: "Übersicht aller Abschnitte Ihres Compliance-Reports",
    methodologyTitle: "Methodik",
    methodologyText:
      "Dieser Report basiert auf dem EU Compliance Hub Assessment Framework. Die Bewertung erfolgt anhand Ihrer Unternehmensangaben, offizieller EU-Verordnungstexte und nationaler Umsetzungsgesetze. Alle Bußgelddaten entsprechen den gesetzlichen Höchstgrenzen. Tatsächliche Sanktionen variieren je nach Mitgliedstaat und Einzelfall.",
    reportNr: "Report-Nr",
  },

  /* ── Executive Summary ── */
  exec: {
    title: "Auf einen Blick",
    subtitle: "Executive Summary — Ihre Compliance-Situation im Überblick",
    cumulativeFineRisk: "Kumuliertes Bußgeldrisiko",
    upTo: "bis zu",
    basedOnRegs:
      "Basierend auf {{count}} relevanten Regulierungen und Ihrem geschätzten Jahresumsatz",
    maturityLabel: "Reifegrad",
    regulationsLabel: "Regulierungen",
    highMedLow: "{{high}} hoch, {{medium}} mittel, {{low}} niedrig",
    costEstLabel: "Kosten (gesch.)",
    implementationCosts: "Implementierungskosten",
    nextDeadlineLabel: "Nächste Frist",
    noUrgent: "Keine dringend",
    regOverview: "Regulierungs-Übersicht ({{count}} bewertet)",
    criticalRisks: "Kritische Risiken",
    fineUpTo: "Bußgeld bis {{amount}}",
    priorityActions: "Prioritäre Handlungsempfehlungen",
    relevanceHigh: "Hoch",
    relevanceMedium: "Mittel",
    relevanceLow: "Niedrig",
    riskLevelCritical: "Kritisch",
    riskLevelHigh: "Hoch",
    riskLevelMedium: "Mittel",
  },

  /* ── Company Profile ── */
  profile: {
    title: "Unternehmensprofil & Bewertungsumfang",
    subtitle: "Grundlage Ihrer personalisierten Compliance-Bewertung",
    companyLabel: "Unternehmen",
    contactLabel: "Ansprechpartner",
    sizeLabel: "Unternehmensgröße",
    revenueLabel: "Jahresumsatz (ca.)",
    industryLabel: "Branche",
    countryLabel: "Land",
    sectorsTitle: "Branchen & Sektoren",
    activitiesTitle: "Aktivitäten & Tätigkeiten",
    dataTypesTitle: "Verarbeitete Datentypen",
    regulationsEvaluated: "Regulierungen\nbewertet",
    highRelevance: "Hohe\nRelevanz",
    mediumRelevance: "Mittlere\nRelevanz",
    lowRelevance: "Niedrige\nRelevanz",
    methodologyNote:
      "Basierend auf dem EU Compliance Hub Assessment Framework. Die Relevanzeinschätzung berücksichtigt Unternehmensgröße, Branche, Datenverarbeitung und spezifische Geschäftstätigkeiten gemäß den offiziellen Anwendungsbereichen der EU-Verordnungen.",
    sizeLabels: {
      micro: "Kleinstunternehmen (< 10 MA)",
      small: "Kleinunternehmen (10\u201349 MA)",
      medium: "Mittleres Unternehmen (50\u2013249 MA)",
      large: "Großunternehmen (250+ MA)",
    },
    sectorLabels: {
      it: "IT / Software / Cloud",
      finance: "Finanzwesen / Versicherung",
      health: "Gesundheitswesen / Pharma",
      energy: "Energie / Versorgung",
      manufacturing: "Produktion / Industrie",
      transport: "Transport / Logistik",
      retail: "Handel / E-Commerce",
      telecom: "Telekommunikation",
      public: "Öffentlicher Sektor",
      other: "Andere Branche",
    },
    activityLabels: {
      ai: "KI-Systeme",
      software: "Digitale Produkte",
      "critical-infra": "Kritische Infrastruktur",
      "online-platform": "Online-Plattform",
      esg: "ESG-Berichterstattung",
      crypto: "Krypto-Assets",
      "cross-border": "Grenzüberschreitend",
      ecommerce: "E-Commerce",
      eid: "eID / Vertrauensdienste",
    },
    dataLabels: {
      personal: "Personenbezogene Daten",
      sensitive: "Besondere Kategorien",
      children: "Daten Minderjähriger",
      financial: "Finanzdaten",
      b2b: "B2B-Daten",
      iot: "IoT-/Sensordaten",
    },
    revenueLabels: {
      "< 2M": "< 2 Mio. EUR",
      "2-10M": "2\u201310 Mio. EUR",
      "10-50M": "10\u201350 Mio. EUR",
      "> 50M": "> 50 Mio. EUR",
    },
  },

  /* ── Risk Exposure ── */
  risk: {
    title: "Risikoexposition & Bußgeldrisiko",
    subtitle:
      "Maximale Bußgeldrisiken basierend auf Ihrem geschätzten Jahresumsatz",
    cumulativeFineRisk: "Kumuliertes Bußgeldrisiko",
    roiLabel: "ROI: Compliance-Investition",
    roiValue: "{{multiple}}x Risikominimierung",
    complianceInvestment: "Compliance-Investition",
    complianceInvestmentDesc:
      "Geschätzte Umsetzungskosten für alle relevanten Regulierungen",
    fineRisk: "Bußgeldrisiko",
    fineRiskDesc: "Kumulierte Höchststrafen bei Non-Compliance",
    disclaimer:
      "Höchststrafen gemäß EU-Verordnungstexten. Bei Regulierungen mit der Regel \"je nachdem welcher Betrag höher ist\" wurde auf Basis eines geschätzten Jahresumsatzes von {{revenue}} gerechnet. Tatsächliche Sanktionen variieren nach Mitgliedstaat, Schwere des Verstoßes und Kooperationsbereitschaft.",
    billion: "Mrd.",
    million: "Mio.",
    calcPercent: "{{percent}}% des Jahresumsatzes ({{amount}})",
    calcFixed: "Festbetrag: {{amount}}",
    calcUpTo: "Bis zu {{amount}}",
    calcUpToPercent: "Bis zu {{percent}}% des Jahresumsatzes",
  },

  /* ── Regulation Section ── */
  regulation: {
    analysisTitle: "Regulierungsanalyse",
    analysisSubtitle:
      "Detailauswertung der für Sie relevanten EU-Regulierungen",
    countryFocus: "Länderfokus: {{country}}",
    whyRelevant: "Warum relevant",
    fineLabel: "Bußgeld: ",
    checklistTitle: "Compliance-Checkliste",
    checklistStatus: "({{compliant}} erfüllt, {{partial}} teilweise)",
    deadlineLabel: "Frist: ",
    authorityLabel: "Behörde: ",
    nationalLawLabel: "Nationales Gesetz: ",
    nationalFinesLabel: "Bußgelder: ",
    guideLabel: "Ausführlicher Guide: ",
    legendCompliant: "Erfüllt",
    legendPartial: "Teilweise",
    legendOpen: "Offen",
    relevanceHighLabel: "Hohe Relevanz",
    relevanceMediumLabel: "Mittlere Relevanz",
    relevanceLowLabel: "Niedrige Relevanz",
    priorityImmediate: "Sofort",
    priorityShortTerm: "Kurzfristig",
    priorityMediumTerm: "Mittelfristig",
  },

  /* ── Maturity Assessment ── */
  maturity: {
    title: "Reifegrad-Bewertung",
    subtitle: "Compliance-Reifegrad Ihres Unternehmens",
    categoryTitle: "Bewertung nach Kategorie",
    points: "{{score}} / {{max}} Punkte",
    scaleTitle: "Bewertungsskala",
    gradeLabels: [
      { letter: "A", label: "80\u2013100% Vorbildlich" },
      { letter: "B", label: "60\u201379% Fortgeschritten" },
      { letter: "C", label: "40\u201359% Grundlegend" },
      { letter: "D", label: "20\u201339% Anfänger" },
      { letter: "E", label: "0\u201319% Kritisch" },
    ],
    gradeLetterLabels: {
      A: "A \u2013 Vorbildlich",
      B: "B \u2013 Fortgeschritten",
      C: "C \u2013 Grundlegend",
      D: "D \u2013 Anfänger",
      E: "E \u2013 Kritisch",
    },
    categoryLabels: {
      governance: "Governance & Organisation",
      datenschutz: "Datenschutz (DSGVO)",
      cybersecurity: "Cybersicherheit (NIS2/CRA)",
      "ki-compliance": "KI & Technologie (AI Act)",
      reporting: "Berichterstattung & Dokumentation",
    },
    gradeExcellent:
      "Ihr Unternehmen zeigt einen vorbildlichen Compliance-Reifegrad. Die Grundlagen für {{regulations}} sind solide implementiert. Fokussieren Sie sich auf kontinuierliche Verbesserung und regelmäßige Audits.",
    gradeGood:
      "Guter Fortschritt bei der Compliance-Umsetzung. Für {{regulations}} bestehen bereits wesentliche Strukturen. {{weakAreas}}",
    gradeBasic:
      "Grundlegende Compliance-Strukturen sind vorhanden, aber für {{regulations}} bestehen wesentliche Lücken. {{weakAreas}} Das Bußgeldrisiko ist bei diesem Reifegrad erhöht.",
    gradeBeginner:
      "Ihr Compliance-Reifegrad zeigt erheblichen Nachholbedarf. Für {{regulations}} fehlen zentrale Maßnahmen. {{weakAreas}} Sofortige Maßnahmen sind dringend empfohlen, um Bußgelder und Haftungsrisiken zu minimieren.",
    gradeCritical:
      "Kritischer Handlungsbedarf: Ihr Unternehmen hat bisher kaum Compliance-Maßnahmen für {{regulations}} umgesetzt. Das Risiko für Bußgelder und persönliche Haftung der Geschäftsführung ist sehr hoch. Sofortige professionelle Beratung wird dringend empfohlen.",
    recoGoodTitle: "Empfehlung: Kontinuierliche Verbesserung",
    recoGoodText:
      "Etablieren Sie regelmäßige Compliance-Reviews (quartalsweise) und halten Sie Ihre Dokumentation aktuell. Schulen Sie neue Mitarbeiter systematisch und überwachen Sie regulatorische Änderungen.",
    recoBasicTitle: "Empfehlung: Strukturierter Aufbau",
    recoBasicText:
      "Definieren Sie klare Compliance-Verantwortlichkeiten und erstellen Sie einen 3-Monats-Plan. Beginnen Sie mit den Regulierungen höchster Relevanz und schließen Sie die größten Lücken zuerst.",
    recoCriticalTitle: "Empfehlung: Sofortige Maßnahmen erforderlich",
    recoCriticalText:
      "Bei diesem Reifegrad besteht akutes Handlungsrisiko. Benennen Sie sofort einen Compliance-Verantwortlichen, lassen Sie eine professionelle Gap-Analyse durchführen und priorisieren Sie die Regulierungen mit höchstem Bußgeldrisiko.",
  },

  /* ── Cost Estimation ── */
  cost: {
    title: "Kostenschätzung",
    subtitle: "Geschätzte Implementierungskosten \u2014 {{sizeLabel}}",
    totalCosts: "Geschätzte Gesamtkosten",
    regulationsCount: "{{count}} Regulierungen",
    exclSynergies: "exkl. Synergien",
    complianceInvestment: "Compliance-Investition",
    avgCostsLabel: "Durchschnittliche Umsetzungskosten",
    fineRisk: "Bußgeldrisiko",
    cumulativeFines: "Kumulierte Höchststrafen",
    fineRiskIs: "Bußgeldrisiko ist",
    timesHigher: "höher als die Compliance-Investition",
    clearBusinessCase: "Klarer Business Case",
    synergiesTitle: "Synergieeffekte",
    sizeLabels: {
      micro: "Kleinstunternehmen",
      small: "Kleinunternehmen",
      medium: "Mittleres Unternehmen",
      large: "Großunternehmen",
    },
    breakdownItems: {
      /* DSGVO */
      "dsgvo-0": "Verarbeitungsverzeichnis & Gap-Analyse",
      "dsgvo-1": "Datenschutzerklärung & Verträge",
      "dsgvo-2": "TOM-Implementierung",
      "dsgvo-3": "Schulungen & Awareness",
      "dsgvo-4": "Datenschutzbeauftragter (extern, jährlich)",
      /* NIS2 */
      "nis2-0": "Risikomanagement & Gap-Analyse",
      "nis2-1": "ISMS-Aufbau / ISO 27001",
      "nis2-2": "Incident-Response-Prozesse",
      "nis2-3": "Lieferketten-Sicherheit",
      "nis2-4": "GF-Schulung & Governance",
      "nis2-5": "Technische Maßnahmen (Monitoring, SIEM)",
      /* AI Act */
      "ai-act-0": "KI-Inventar & Risikobewertung",
      "ai-act-1": "Konformitätsdokumentation",
      "ai-act-2": "Bias-Testing & Monitoring",
      "ai-act-3": "Transparenz-Maßnahmen",
      "ai-act-4": "Schulungen (KI-Kompetenz)",
      /* DORA */
      "dora-0": "IKT-Risikomanagement-Framework",
      "dora-1": "Incident-Reporting-System",
      "dora-2": "Resilience-Testing (TLPT)",
      "dora-3": "Third-Party-Risk-Management",
      "dora-4": "Information-Sharing-Rahmenwerk",
      /* CRA */
      "cra-0": "Security-by-Design-Review",
      "cra-1": "Schwachstellenmanagement (SBOM)",
      "cra-2": "Konformitätsbewertung",
      "cra-3": "Security-Update-Prozesse (5 Jahre)",
      "cra-4": "Dokumentation & CE-Kennzeichnung",
      /* CSRD */
      "csrd-0": "Wesentlichkeitsanalyse (Double Materiality)",
      "csrd-1": "ESG-Datenbeschaffung & KPIs",
      "csrd-2": "ESRS-konformer Bericht",
      "csrd-3": "Prüfung durch Wirtschaftsprüfer",
      "csrd-4": "Software & Tools",
    },
  },

  /* ── Deadline Timeline ── */
  deadlines: {
    title: "Ihre Fristen-Übersicht",
    subtitle: "Relevante EU-Regulierungsfristen für Ihr Unternehmen",
    noDeadlines: "Keine relevanten Fristen identifiziert.",
    today: "HEUTE",
    daysPassed: "{{days}} Tage vergangen",
    todayLabel: "Heute",
    inDays: "in {{days}} Tagen",
    titles: {
      "DSA-2024-02-17": "DSA vollständig in Kraft",
      "MiCA-2024-12-30": "MiCA vollständig in Kraft",
      "DORA-2025-01-17": "DORA in Kraft",
      "CSRD-2025-01-01": "CSRD Wave 2",
      "AI Act-2025-02-02": "AI Act Verbote",
      "BaFG-2025-06-28": "BaFG in Kraft",
      "AI Act-2025-08-02": "AI Act GPAI",
      "Data Act-2025-09-12": "Data Act in Kraft",
      "DORA-2026-03-13": "DORA IKT-Register",
      "CSRD-2026-01-01": "NaBeG AT Phase 1",
      "eIDAS-2026-05-20": "eIDAS 2.0 Wallet",
      "AI Act-2026-08-02": "AI Act Hochrisiko",
      "CRA-2026-09-11": "CRA Phase 1",
      "NISG-2026-10-01": "NISG 2026",
      "NISG-2026-12-31": "NISG Registrierung",
      "EHDS-2027-03-26": "EHDS Primärnutzung",
      "Green Claims-2027-03-27": "Green Claims Umsetzung",
      "CSRD-2027-01-01": "CSRD Wave 3",
      "DPP-2027-06-01": "DPP Batterien",
      "AI Act-2027-08-02": "AI Act Anhang I",
      "PLD-2027-12-09": "PLD Umsetzung",
      "CRA-2027-12-11": "CRA Phase 2",
      "HSchG-2028-01-01": "HSchG Evaluierung",
      "CSRD-2029-01-01": "CSRD Wave 4",
      "DPP-2030-01-01": "DPP Textil & Elektronik",
    },
    descs: {
      "DSA-2024-02-17": "Alle Vermittlungsdienste müssen DSA-Pflichten erfüllen.",
      "MiCA-2024-12-30": "Alle Pflichten für CASP und Token-Emittenten gelten.",
      "DORA-2025-01-17": "Vollumfänglich für alle Finanzinstitute.",
      "CSRD-2025-01-01": "Große Unternehmen (>250 MA) berichten erstmals.",
      "AI Act-2025-02-02": "Verbotene KI-Praktiken treten in Kraft.",
      "BaFG-2025-06-28": "Barrierefreiheitspflicht für digitale Produkte & Dienste.",
      "AI Act-2025-08-02": "GPAI-Pflichten und Governance-Regeln gelten.",
      "Data Act-2025-09-12": "IoT-Datenzugang, Cloud-Switching und B2B-Datenregeln gelten.",
      "DORA-2026-03-13": "Informationsregister bei FMA einzureichen.",
      "CSRD-2026-01-01": "Große PIE-Unternehmen berichten nach ESRS in Österreich.",
      "eIDAS-2026-05-20": "EU Digital Identity Wallets müssen verfügbar sein.",
      "AI Act-2026-08-02": "Vollpflichten für Hochrisiko-KI-Systeme.",
      "CRA-2026-09-11": "Meldepflichten 24h/72h an ENISA.",
      "NISG-2026-10-01": "Alle Pflichten für betroffene Einrichtungen.",
      "NISG-2026-12-31": "Registrierung beim BSC verpflichtend.",
      "EHDS-2027-03-26": "Patientenrechte und Zugang zu eigenen Gesundheitsdaten.",
      "Green Claims-2027-03-27": "Nationale Umsetzung der Anti-Greenwashing-Richtlinie.",
      "CSRD-2027-01-01": "Börsennotierte KMU berichten erstmals nach ESRS.",
      "DPP-2027-06-01": "Digitaler Produktpass für Batterien verpflichtend.",
      "AI Act-2027-08-02": "Restliche Hochrisiko-Systeme (Medizingeräte etc.) reguliert.",
      "PLD-2027-12-09": "Nationale Umsetzung der neuen Produkthaftungsrichtlinie.",
      "CRA-2027-12-11": "CE-Kennzeichnung wird verpflichtend.",
      "HSchG-2028-01-01": "Evaluierung der Hinweisgeberschutz-Maßnahmen.",
      "CSRD-2029-01-01": "Nicht-EU-Unternehmen (>150 Mio. EUR EU-Umsatz) berichten.",
      "DPP-2030-01-01": "Produktpass für Textilien und Elektronik verpflichtend.",
    },
  },

  /* ── Action Roadmap ── */
  roadmap: {
    title: "Maßnahmenplan",
    subtitle:
      "Priorisierter 3-Phasen-Plan für Ihre Compliance-Umsetzung",
    phase1Label: "Phase 1",
    phase1Time: "Sofort (0\u201330 Tage)",
    phase2Label: "Phase 2",
    phase2Time: "Kurzfristig (1\u20133 Monate)",
    phase3Label: "Phase 3",
    phase3Time: "Mittelfristig (3\u20136 Monate)",
    effortLabel: "Aufwand: ",
    effortLow: "Gering",
    effortMedium: "Mittel",
    effortHigh: "Hoch",
    quickWinsTitle: "Quick Wins",
    quickWinsText:
      "Starten Sie mit einer Gap-Analyse der wichtigsten Regulierungen. Viele Maßnahmen (z.B. Schulungen, Dokumentation, Risikoanalysen) wirken regulierungsübergreifend und erzeugen Synergieeffekte von 20\u201340% Kostenersparnis.",
  },

  /* ── Software Recommendations ── */
  software: {
    title: "Empfohlene Tools & Software",
    subtitle:
      "Ausgewählte Lösungen für Ihre relevanten Regulierungen \u2014 sortiert nach DACH-Relevanz",
    dachFocus: "DACH-Fokus",
    dachPresent: "DACH-präsent",
    international: "International",
    disclaimerText:
      "Alle Empfehlungen sind unabhängig und redaktionell ausgewählt. Preise sind Richtwerte und können je nach Unternehmensgröße und Konfiguration variieren. Detaillierte Vergleiche finden Sie auf unserer Website.",
    disclaimerUrl: "eu-compliance-hub.eu/tools",
  },

  /* ── Next Steps ── */
  nextSteps: {
    title: "Nächste Schritte",
    subtitle: "Empfohlene Maßnahmen für Ihre Compliance-Umsetzung",
    guidesTitle: "Ihre relevanten Guides",
    ctaTitle: "Wir unterstützen Sie",
    ctaText:
      "Nutzen Sie unsere kostenlosen interaktiven Tools für eine vertiefte Analyse. Abonnieren Sie unser Compliance-Briefing für aktuelle Regulierungsupdates.",
    ctaToolsLabel: "Alle Tools",
    ctaNewsletterLabel: "Newsletter",
    ctaContactLabel: "Kontakt",
    branding:
      "EU Compliance Hub \u2014 Ihr Navigator durch die EU-Regulierungslandschaft",
  },

  /* ── Shared Footer ── */
  footer: {
    siteName: "EU Compliance Hub | eu-compliance-hub.eu",
    pageOf: "Seite {{page}} von {{total}}",
    generatedAt: "Erstellt am {{date}} \u2014 Keine Rechtsberatung",
  },

  /* ── TOC Section Names ── */
  tocSections: {
    executiveSummary: "Executive Summary",
    executiveSummaryDesc: "Ihre Compliance-Situation auf einen Blick",
    companyProfile: "Unternehmensprofil",
    companyProfileDesc: "Bewertungsgrundlage und Unternehmenskontext",
    riskExposure: "Risikoexposition",
    riskExposureDesc: "Bußgeldrisiko und finanzielle Auswirkungen",
    regulationAnalysis: "Regulierungsanalyse",
    regulationAnalysisDesc:
      "Detailauswertung für {{count}} relevante Regulierungen",
    maturityAssessment: "Reifegrad-Bewertung",
    maturityAssessmentDesc: "Compliance-Reifegrad nach Kategorie",
    costEstimation: "Kostenschätzung",
    costEstimationDesc: "Geschätzte Implementierungskosten und ROI",
    deadlineOverview: "Fristen-Übersicht",
    deadlineOverviewDesc:
      "Chronologische Darstellung aller relevanten Fristen",
    actionPlan: "Maßnahmenplan",
    actionPlanDesc: "3-Phasen-Roadmap für die Compliance-Umsetzung",
    softwareRecs: "Software-Empfehlungen",
    softwareRecsDesc: "Tools und Lösungen für Ihre Regulierungen",
    nextSteps: "Nächste Schritte",
    nextStepsDesc:
      "Handlungsempfehlungen und weiterführende Ressourcen",
  },

  /* ── Report Engine Strings ── */
  engine: {
    appointComplianceOfficer:
      "Compliance-Verantwortlichen benennen und Steuerungsgremium einrichten",
    deadlineUrgent:
      "{{title}}: Frist in {{days}} Tagen \u2014 sofortige Maßnahmen einleiten",
    gapAnalysis:
      "Gap-Analyse und Bestandsaufnahme für {{name}} durchführen",
    coreImplementation:
      "Kernmaßnahmen für {{name}}-Compliance implementieren",
    trainingProgram:
      "Schulungsprogramm für Mitarbeiter und Führungskräfte aufbauen",
    assessAndPlan:
      "{{name}}-Anforderungen bewerten und priorisierte Umsetzung planen",
    establishReviews:
      "Regelmäßige Compliance-Reviews und Audit-Zyklen etablieren",
    roleManagement: "Geschäftsführung",
    roleComplianceTeam: "Compliance-Team",
    roleDeptIT: "Fachabteilung + IT",
    roleHRCompliance: "HR / Compliance",
    phaseImmediate: "Sofort (0\u201330 Tage)",
    phaseShortTerm: "Kurzfristig (1\u20133 Monate)",
    phaseMediumTerm: "Mittelfristig (3\u20136 Monate)",
    governanceLabel: "Governance",
    trainingLabel: "Schulungen",
    auditLabel: "Audit",
    defineResponsibilities:
      "Compliance-Verantwortlichkeiten in der Geschäftsführung definieren und Budget festlegen",
    deadlinePriority:
      "{{title}} hat höchste Priorität \u2014 Frist in {{days}} Tagen",
    immediateMeasures: "Sofortmaßnahmen für {{names}} einleiten",
    minimizeFineRisk:
      "Bußgeldrisiko von bis zu {{amount}} durch proaktive Compliance minimieren",
    planBudget: "Compliance-Budget von {{range}} einplanen",
    establishRegularReviews:
      "Regelmäßige Compliance-Reviews etablieren und Dokumentation pflegen",
    synergyBasic:
      "Bei gleichzeitiger Umsetzung mehrerer Regulierungen können durch Synergien 20\u201340% der Kosten eingespart werden.",
    synergyTemplate:
      "Bei gleichzeitiger Umsetzung von {{examples}} können durch Synergien 20\u201340% der Kosten eingespart werden. Gemeinsame Maßnahmen: {{measures}}.",
    synergyISMS: "ISMS-Aufbau (NIS2 + DORA)",
    synergyRisk: "Risikomanagement-Framework",
    synergySecurity: "Security-by-Design Prozesse",
    synergySustainability: "Nachhaltigkeits-Governance",
    synergyDefault: "Governance-Strukturen und Schulungen",
  },

  /* ── Regulation Names ── */
  regNames: {
    dsgvo: "DSGVO",
    nis2: "NIS2 / NISG 2026",
    "ai-act": "EU AI Act",
    dora: "DORA",
    cra: "Cyber Resilience Act",
    csrd: "CSRD / ESG",
    dsa: "Digital Services Act",
    mica: "MiCA",
    "data-act": "Data Act",
    eprivacy: "ePrivacy",
    eidas: "eIDAS 2.0",
    produkthaftung: "EU-Produkthaftung",
    ehds: "EHDS",
  },

  checklistItems: {
    /* NIS2 */
    "nis2-1": "Betroffenheitsprüfung durchgeführt (Sektor, Größe, Umsatz)",
    "nis2-2": "Risikomanagement-Framework implementiert",
    "nis2-3": "Incident-Response-Plan erstellt (72h-Meldefrist)",
    "nis2-4": "Business Continuity Management (BCM) eingerichtet",
    "nis2-5": "Supply-Chain-Sicherheit bewertet",
    "nis2-6": "Geschäftsleitung im Cybersecurity geschult (Haftung!)",
    "nis2-7": "Technische Maßnahmen: MFA, Verschlüsselung, Netzwerksegmentierung",
    "nis2-8": "Meldepflichten und Kontakt zur Behörde definiert",
    /* DSGVO */
    "dsgvo-1": "Verarbeitungsverzeichnis (Art. 30) aktuell und vollständig",
    "dsgvo-2": "Datenschutz-Folgenabschätzung (DSFA) bei Hochrisiko-Verarbeitung",
    "dsgvo-3": "Auftragsverarbeiter-Verträge (AVV) mit allen Dienstleistern",
    "dsgvo-4": "Einwilligungsmanagement (Cookie-Banner, Opt-In) rechtskonform",
    "dsgvo-5": "Datenschutzerklärung aktuell und vollständig",
    "dsgvo-6": "Betroffenenrechte-Prozess implementiert (Auskunft, Löschung)",
    "dsgvo-7": "Technisch-organisatorische Maßnahmen (TOMs) dokumentiert",
    "dsgvo-8": "Data-Breach-Notifikation (72h) vorbereitet",
    /* AI Act */
    "ai-1": "AI-Systeme inventarisiert und Risikoklasse bestimmt",
    "ai-2": "Verbotene KI-Praktiken ausgeschlossen (Social Scoring etc.)",
    "ai-3": "Hochrisiko-Systeme mit Konformitätsbewertung",
    "ai-4": "Transparenzpflichten für Chatbots/Deepfakes umgesetzt",
    "ai-5": "AI Literacy für Mitarbeiter sichergestellt",
    "ai-6": "Dokumentationspflichten und technische Doku erstellt",
    "ai-7": "Menschliche Aufsicht bei KI-Entscheidungen gewährleistet",
    /* DORA */
    "dora-1": "IKT-Risikomanagement-Rahmenwerk aufgebaut",
    "dora-2": "IKT-Vorfallmeldung an Aufsichtsbehörde vorbereitet",
    "dora-3": "Threat-Led Penetration Testing (TLPT) geplant",
    "dora-4": "Drittparteien-IKT-Risikomanagement implementiert",
    "dora-5": "Register kritischer IKT-Dienstleister geführt",
    "dora-6": "Business-Continuity- und Disaster-Recovery-Pläne getestet",
    /* CRA */
    "cra-1": "Produkte mit digitalen Elementen identifiziert",
    "cra-2": "Security-by-Design in Entwicklungsprozess integriert",
    "cra-3": "Schwachstellen-Management-Prozess eingerichtet",
    "cra-4": "Software-Stückliste (SBOM) erstellt",
    "cra-5": "Sicherheitsupdates für den Supportzeitraum geplant",
    "cra-6": "Konformitätsbewertung für die Produktkategorie vorbereitet",
    /* CSRD */
    "csrd-1": "Betroffenheit nach Unternehmensgröße geprüft",
    "csrd-2": "Doppelte Wesentlichkeitsanalyse durchgeführt",
    "csrd-3": "ESRS-Datenpunkte identifiziert und erfasst",
    "csrd-4": "ESG-Datenerhebungsprozesse aufgesetzt",
    "csrd-5": "Prüfer/Wirtschaftsprüfer für Nachhaltigkeitsbericht ausgewählt",
    "csrd-6": "Taxonomie-Konformität der Wirtschaftstätigkeiten geprüft",
  },

  regSubtitles: {
    dsgvo: "Datenschutz-Grundverordnung",
    nis2: "Netz- und Informationssicherheit",
    "ai-act": "KI-Verordnung",
    dora: "Digital Operational Resilience Act",
    cra: "Cybersicherheit für Produkte",
    csrd: "Nachhaltigkeitsberichterstattung",
    dsa: "Plattformregulierung",
    mica: "Markets in Crypto-Assets",
    "data-act": "Datenzugangsverordnung",
    eprivacy: "Datenschutz in der elektronischen Kommunikation",
    eidas: "Elektronische Identifizierung",
    produkthaftung: "Neue Produkthaftungsrichtlinie",
    ehds: "European Health Data Space",
  },

  eval: {
    essentialEntity: "wesentliche Einrichtung",
    importantEntity: "wichtige Einrichtung",

    dsgvoBase: "Als {{sizeLabel}} verarbeiten Sie {{dataTypes}} mit EU-Bezug.",
    dsgvoSensitive: "Durch die Verarbeitung besonderer Datenkategorien gelten verschärfte Pflichten (Art. 9 DSGVO), insbesondere Datenschutz-Folgenabschätzungen.",
    dsgvoStandard: "Dies umfasst Pflichten zu Verarbeitungsverzeichnis (Art. 30), Betroffenenrechte (Art. 15\u201322) und Datenschutz-Folgenabschätzungen bei Hochrisiko-Verarbeitungen.",

    nis2CriticalInfra: "Als Betreiber kritischer Infrastruktur fallen Sie als „wesentliche Einrichtung\u201c gemäß NIS2 Art. 3 unter die strengsten Pflichten.",
    nis2SectorSize: "Als {{sizeLabel}} im Sektor {{sectors}} fallen Sie als „{{category}}\u201c unter NIS2 Art. 3.",
    nis2Suffix: "Dies umfasst Risikomanagement (Art. 21), Meldepflichten innerhalb 24h/72h (Art. 23) und persönliche Verantwortung der Geschäftsleitung (Art. 20).",
    nis2BelowThreshold: "Ihr Sektor {{sectors}} fällt unter NIS2, aber als {{sizeLabel}} liegen Sie unter den Größenschwellenwerten (50 MA / 10 Mio. EUR Umsatz). Beobachten Sie nationale Umsetzungsgesetze \u2014 einige Mitgliedstaaten können niedrigere Schwellenwerte festlegen.",

    aiActBase: "Als {{sizeLabel}} setzen Sie KI-Systeme ein oder entwickeln solche. Die EU-KI-Verordnung verlangt eine Risikoklassifizierung aller KI-Systeme und stuft bestimmte Anwendungen als hochriskant ein.",
    aiActSensitive: "Durch die Verarbeitung sensibler Daten sind erhöhte Transparenz- und Dokumentationspflichten wahrscheinlich.",
    aiActBanned: "Verbotene KI-Praktiken (Art. 5) gelten bereits seit Februar 2025.",

    doraDirect: "Als {{sizeLabel}} im Finanzsektor fallen Sie direkt unter DORA. Sie müssen ein IKT-Risikomanagement-Framework (Art. 6\u201316) aufbauen, Vorfälle an die Aufsichtsbehörde melden (Art. 17\u201323) und Threat-Led Penetration Tests durchführen.",
    doraProvider: "Als IT-Dienstleister mit Zugang zu Finanzdaten könnten Sie als „kritischer IKT-Drittanbieter\u201c gemäß Art. 31 DORA gelten. Dies umfasst direkte Aufsicht durch europäische Finanzbehörden und strenge vertragliche Anforderungen.",

    craBase: "Als Hersteller von Produkten mit digitalen Elementen fallen Sie unter den Cyber Resilience Act. Sie müssen Security-by-Design (Art. 10) implementieren, eine SBOM (Software Bill of Materials) führen und Sicherheitsupdates während des gesamten Supportzeitraums bereitstellen.",
    craManufacturing: "Als Industrieunternehmen sind zusätzlich die Anforderungen an vernetzte Produktionssysteme relevant.",

    csrdDirect: "Als {{sizeLabel}} in der EU sind Sie gemäß CSRD zur Nachhaltigkeitsberichterstattung nach ESRS verpflichtet. Dies umfasst eine doppelte Wesentlichkeitsanalyse, Scope-1/2/3-Emissionen und eine externe Prüfung durch Wirtschaftsprüfer.",
    csrdIndirect: "Durch Ihre ESG-/Nachhaltigkeitsaktivitäten als {{sizeLabel}} könnte die CSRD-Berichterstattung über die Lieferkette oder freiwillig relevant werden. Ab 2026 sind auch börsennotierte KMU betroffen.",

    dsaReason: "Als Betreiber einer Online-Plattform bzw. eines Marktplatzes fallen Sie unter den DSA. Pflichten umfassen Transparenzberichte (Art. 15), ein Notice-and-Action-System für rechtswidrige Inhalte (Art. 16), Beschwerdeverfahren (Art. 20) und ein Verbot von Dark Patterns (Art. 25).",

    micaReason: "Als {{sizeLabel}} im Bereich Krypto-Assets/Blockchain müssen Sie gemäß MiCA eine Zulassung als CASP (Crypto-Asset Service Provider) beantragen, AML/KYC-Anforderungen erfüllen und die Travel Rule umsetzen. Whitepapers für Token-Emissionen sind genehmigungspflichtig.",

    dataActIoT: "Sie verarbeiten IoT-/Sensordaten und müssen gemäß Data Act (Art. 3\u20137) Nutzern Zugang zu den generierten Daten gewähren. Dies umfasst standardisierte Datenformate, faire Vertragsbedingungen und ein Recht auf Datenweitergabe an Dritte.",
    dataActManufacturer: "Als Produkthersteller im Sektor {{sectors}} könnten Datenzugangspflichten gemäß dem Data Act auf Sie zukommen, insbesondere wenn Ihre Produkte Nutzungsdaten generieren.",

    eprivacyDirect: "Als E-Commerce-Unternehmen gelten für Sie ePrivacy-Pflichten zu Cookies, Tracking und elektronischer Direktwerbung. Ein rechtskonformes Consent-Management (Cookie-Banner mit Opt-In) ist zwingend erforderlich.",
    eprivacyIndirect: "Die ePrivacy-Regelungen zu Cookies und Tracking betreffen auch Ihre Website. Ein DSGVO-konformes Cookie-Banner mit echtem Opt-In ist Pflicht.",

    eidasDirect: "Als Anbieter elektronischer Identifizierung oder Vertrauensdienste müssen Sie die eIDAS-2.0-Anforderungen erfüllen, einschließlich der EU Digital Identity Wallet-Kompatibilität und qualifizierter elektronischer Signaturen.",
    eidasPublic: "Im öffentlichen Sektor wird die EU Digital Identity Wallet ab 2026 verpflichtend akzeptiert. Bereiten Sie Ihre Systeme auf eIDAS-2.0-konforme Identifizierung vor.",

    produkthaftungReason: "Die novellierte EU-Produkthaftungsrichtlinie erstreckt sich erstmals auch auf Software und KI-Systeme als eigenständige Produkte. Als {{sizeLabel}} im Bereich {{sectors}} tragen Sie eine verschuldensunabhängige Haftung für fehlerhafte Produkte \u2014 Beweislasterleichterungen stärken die Position geschädigter Verbraucher.",

    ehdsReason: "Als {{sizeLabel}} im Gesundheitswesen wird der Europäische Gesundheitsdatenraum (EHDS) relevant. Primäre Nutzung (Patientenportabilität) und sekundäre Nutzung (Forschungszugang) erfordern interoperable Systeme und FHIR-kompatible Datenformate.",
  },
};

export default de;
