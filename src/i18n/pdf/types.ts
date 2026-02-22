/* ══════════════════════════════════════════════════════════════
   PDFMessages — Type definition for all PDF report translations
   Every translatable string in the PDF report is defined here.
   ══════════════════════════════════════════════════════════════ */

export interface PDFMessages {
  locale: string;

  /* ── Cover Page ── */
  cover: {
    label: string; // "EU Compliance Hub"
    title: string; // "Ihr persoenlicher"
    titleAccent: string; // "Compliance-Report"
    preparedFor: string; // "Erstellt fuer"
    dateLabel: string; // "Erstellungsdatum: "
    countryLabel: string; // "Land: "
    referenceLabel: string; // "Referenz: "
    confidential: string; // "Vertraulich"
    disclaimer: string;
    branding: string; // "eu-compliance-hub.eu"
    page: string; // "Seite 1"
  };

  /* ── Table of Contents ── */
  toc: {
    title: string; // "Inhaltsverzeichnis"
    subtitle: string;
    methodologyTitle: string; // "Methodik"
    methodologyText: string;
    reportNr: string; // "Report-Nr"
  };

  /* ── Executive Summary ── */
  exec: {
    title: string; // "Auf einen Blick"
    subtitle: string;
    cumulativeFineRisk: string; // "Kumuliertes Bussgeldrisiko"
    upTo: string; // "bis zu"
    basedOnRegs: string; // "Basierend auf {{count}} relevanten Regulierungen und Ihrem geschaetzten Jahresumsatz"
    maturityLabel: string; // "Reifegrad"
    regulationsLabel: string; // "Regulierungen"
    highMedLow: string; // "{{high}} hoch, {{medium}} mittel, {{low}} niedrig"
    costEstLabel: string; // "Kosten (gesch.)"
    implementationCosts: string; // "Implementierungskosten"
    nextDeadlineLabel: string; // "Naechste Frist"
    noUrgent: string; // "Keine dringend"
    regOverview: string; // "Regulierungs-Uebersicht ({{count}} bewertet)"
    criticalRisks: string; // "Kritische Risiken"
    fineUpTo: string; // "Bussgeld bis {{amount}}"
    priorityActions: string; // "Prioritaere Handlungsempfehlungen"
    relevanceHigh: string; // "Hoch"
    relevanceMedium: string; // "Mittel"
    relevanceLow: string; // "Niedrig"
    /* Risk level labels for critical risk badges */
    riskLevelCritical: string; // "Kritisch"
    riskLevelHigh: string; // "Hoch"
    riskLevelMedium: string; // "Mittel"
  };

  /* ── Company Profile ── */
  profile: {
    title: string; // "Unternehmensprofil & Bewertungsumfang"
    subtitle: string;
    companyLabel: string; // "Unternehmen"
    contactLabel: string; // "Ansprechpartner"
    sizeLabel: string; // "Unternehmensgroesse"
    revenueLabel: string; // "Jahresumsatz (ca.)"
    industryLabel: string; // "Branche"
    countryLabel: string; // "Land"
    sectorsTitle: string; // "Branchen & Sektoren"
    activitiesTitle: string; // "Aktivitaeten & Taetigkeiten"
    dataTypesTitle: string; // "Verarbeitete Datentypen"
    regulationsEvaluated: string; // "Regulierungen\nbewertet"
    highRelevance: string; // "Hohe\nRelevanz"
    mediumRelevance: string; // "Mittlere\nRelevanz"
    lowRelevance: string; // "Niedrige\nRelevanz"
    methodologyNote: string;
    sizeLabels: Record<string, string>;
    sectorLabels: Record<string, string>;
    activityLabels: Record<string, string>;
    dataLabels: Record<string, string>;
    revenueLabels: Record<string, string>;
  };

  /* ── Risk Exposure ── */
  risk: {
    title: string; // "Risikoexposition & Bussgeldrisiko"
    subtitle: string;
    cumulativeFineRisk: string; // "Kumuliertes Bussgeldrisiko"
    roiLabel: string; // "ROI: Compliance-Investition"
    roiValue: string; // "{{multiple}}x Risikominimierung"
    complianceInvestment: string; // "Compliance-Investition"
    complianceInvestmentDesc: string;
    fineRisk: string; // "Bussgeldrisiko"
    fineRiskDesc: string; // "Kumulierte Hoechststrafen bei Non-Compliance"
    disclaimer: string;
    billion: string; // "Mrd."
    million: string; // "Mio."
    /* Fine calculation templates */
    calcPercent: string; // "{{percent}}% des Jahresumsatzes ({{amount}})"
    calcFixed: string; // "Festbetrag: {{amount}}"
    calcUpTo: string; // "Bis zu {{amount}}"
    calcUpToPercent: string; // "Bis zu {{percent}}% des Jahresumsatzes"
  };

  /* ── Regulation Section ── */
  regulation: {
    analysisTitle: string; // "Regulierungsanalyse"
    analysisSubtitle: string; // "Detailauswertung der fuer Sie relevanten EU-Regulierungen"
    countryFocus: string; // "Laenderfokus: {{country}}"
    whyRelevant: string; // "Warum relevant"
    fineLabel: string; // "Bussgeld: "
    checklistTitle: string; // "Compliance-Checkliste"
    checklistStatus: string; // "({{compliant}} erfuellt, {{partial}} teilweise)"
    deadlineLabel: string; // "Frist: "
    authorityLabel: string; // "Behoerde: "
    nationalLawLabel: string; // "Nationales Gesetz: "
    nationalFinesLabel: string; // "Bussgelder: "
    guideLabel: string; // "Ausfuehrlicher Guide: "
    legendCompliant: string; // "Erfuellt"
    legendPartial: string; // "Teilweise"
    legendOpen: string; // "Offen"
    relevanceHighLabel: string; // "Hohe Relevanz"
    relevanceMediumLabel: string; // "Mittlere Relevanz"
    relevanceLowLabel: string; // "Niedrige Relevanz"
    priorityImmediate: string; // "Sofort"
    priorityShortTerm: string; // "Kurzfristig"
    priorityMediumTerm: string; // "Mittelfristig"
  };

  /* ── Maturity Assessment ── */
  maturity: {
    title: string; // "Reifegrad-Bewertung"
    subtitle: string; // "Compliance-Reifegrad Ihres Unternehmens"
    categoryTitle: string; // "Bewertung nach Kategorie"
    points: string; // "{{score}} / {{max}} Punkte"
    scaleTitle: string; // "Bewertungsskala"
    gradeLabels: { letter: string; label: string }[];
    /** Translated grade labels keyed by letter (A-E) for maturityGrade.label override */
    gradeLetterLabels: Record<string, string>;
    /** Translated category names keyed by category ID */
    categoryLabels: Record<string, string>;
    // Dynamic grade descriptions
    gradeExcellent: string; // percentage >= 80
    gradeGood: string; // >= 60
    gradeBasic: string; // >= 40
    gradeBeginner: string; // >= 20
    gradeCritical: string; // < 20
    // Recommendation boxes
    recoGoodTitle: string;
    recoGoodText: string;
    recoBasicTitle: string;
    recoBasicText: string;
    recoCriticalTitle: string;
    recoCriticalText: string;
  };

  /* ── Cost Estimation ── */
  cost: {
    title: string; // "Kostenschaetzung"
    subtitle: string; // "Geschaetzte Implementierungskosten — {{sizeLabel}}"
    totalCosts: string; // "Geschaetzte Gesamtkosten"
    regulationsCount: string; // "{{count}} Regulierungen"
    exclSynergies: string; // "exkl. Synergien"
    complianceInvestment: string; // "Compliance-Investition"
    avgCostsLabel: string; // "Durchschnittliche Umsetzungskosten"
    fineRisk: string; // "Bussgeldrisiko"
    cumulativeFines: string; // "Kumulierte Hoechststrafen"
    fineRiskIs: string; // "Bussgeldrisiko ist"
    timesHigher: string; // "hoeher als die Compliance-Investition"
    clearBusinessCase: string; // "Klarer Business Case"
    synergiesTitle: string; // "Synergieeffekte"
    sizeLabels: Record<string, string>;
    /** Translated cost breakdown item names keyed by "{regKey}-{index}" */
    breakdownItems: Record<string, string>;
  };

  /* ── Deadline Timeline ── */
  deadlines: {
    title: string; // "Ihre Fristen-Uebersicht"
    subtitle: string; // "Relevante EU-Regulierungsfristen fuer Ihr Unternehmen"
    noDeadlines: string; // "Keine relevanten Fristen identifiziert."
    today: string; // "HEUTE"
    daysPassed: string; // "{{days}} Tage vergangen"
    todayLabel: string; // "Heute"
    inDays: string; // "in {{days}} Tagen"
    /** Translated deadline titles keyed by "{reg}-{iso}" e.g. "DSA-2024-02-17" */
    titles: Record<string, string>;
    /** Translated deadline descriptions keyed by "{reg}-{iso}" */
    descs: Record<string, string>;
  };

  /* ── Action Roadmap ── */
  roadmap: {
    title: string; // "Massnahmenplan"
    subtitle: string;
    phase1Label: string; // "Phase 1"
    phase1Time: string; // "Sofort (0-30 Tage)"
    phase2Label: string; // "Phase 2"
    phase2Time: string; // "Kurzfristig (1-3 Monate)"
    phase3Label: string; // "Phase 3"
    phase3Time: string; // "Mittelfristig (3-6 Monate)"
    effortLabel: string; // "Aufwand: "
    effortLow: string; // "Gering"
    effortMedium: string; // "Mittel"
    effortHigh: string; // "Hoch"
    quickWinsTitle: string; // "Quick Wins"
    quickWinsText: string;
  };

  /* ── Software Recommendations ── */
  software: {
    title: string; // "Empfohlene Tools & Software"
    subtitle: string;
    dachFocus: string; // "DACH-Fokus"
    dachPresent: string; // "DACH-praesent"
    international: string; // "International"
    disclaimerText: string;
    disclaimerUrl: string; // "eu-compliance-hub.eu/tools"
  };

  /* ── Next Steps ── */
  nextSteps: {
    title: string; // "Naechste Schritte"
    subtitle: string;
    guidesTitle: string; // "Ihre relevanten Guides"
    ctaTitle: string; // "Wir unterstuetzen Sie"
    ctaText: string;
    ctaToolsLabel: string; // "Alle Tools"
    ctaNewsletterLabel: string; // "Newsletter"
    ctaContactLabel: string; // "Kontakt"
    branding: string; // "EU Compliance Hub — Ihr Navigator durch die EU-Regulierungslandschaft"
  };

  /* ── Shared Footer ── */
  footer: {
    siteName: string; // "EU Compliance Hub | eu-compliance-hub.eu"
    pageOf: string; // "Seite {{page}} von {{total}}"
    generatedAt: string; // "Erstellt am {{date}} — Keine Rechtsberatung"
  };

  /* ── TOC Section Names (dynamic) ── */
  tocSections: {
    executiveSummary: string;
    executiveSummaryDesc: string;
    companyProfile: string;
    companyProfileDesc: string;
    riskExposure: string;
    riskExposureDesc: string;
    regulationAnalysis: string;
    regulationAnalysisDesc: string; // "Detailauswertung fuer {{count}} relevante Regulierungen"
    maturityAssessment: string;
    maturityAssessmentDesc: string;
    costEstimation: string;
    costEstimationDesc: string;
    deadlineOverview: string;
    deadlineOverviewDesc: string;
    actionPlan: string;
    actionPlanDesc: string;
    softwareRecs: string;
    softwareRecsDesc: string;
    nextSteps: string;
    nextStepsDesc: string;
  };

  /* ── Report Engine Strings ── */
  engine: {
    /* Roadmap actions (templates with {{name}}, {{days}}, etc.) */
    appointComplianceOfficer: string;
    deadlineUrgent: string; // "{{title}}: Frist in {{days}} Tagen — sofortige Massnahmen einleiten"
    gapAnalysis: string; // "Gap-Analyse und Bestandsaufnahme fuer {{name}} durchfuehren"
    coreImplementation: string; // "Kernmassnahmen fuer {{name}}-Compliance implementieren"
    trainingProgram: string;
    assessAndPlan: string; // "{{name}}-Anforderungen bewerten und priorisierte Umsetzung planen"
    establishReviews: string;
    /* Roadmap role labels */
    roleManagement: string; // "Geschaeftsfuehrung"
    roleComplianceTeam: string; // "Compliance-Team"
    roleDeptIT: string; // "Fachabteilung + IT"
    roleHRCompliance: string; // "HR / Compliance"
    /* Roadmap phase labels */
    phaseImmediate: string; // "Sofort (0-30 Tage)"
    phaseShortTerm: string; // "Kurzfristig (1-3 Monate)"
    phaseMediumTerm: string; // "Mittelfristig (3-6 Monate)"
    /* Phase fixed names */
    governanceLabel: string; // "Governance"
    trainingLabel: string; // "Schulungen"
    auditLabel: string; // "Audit"
    /* Top actions */
    defineResponsibilities: string;
    deadlinePriority: string; // "{{title}} hat hoechste Prioritaet — Frist in {{days}} Tagen"
    immediateMeasures: string; // "Sofortmassnahmen fuer {{names}} einleiten"
    minimizeFineRisk: string; // "Bussgeldrisiko von bis zu {{amount}} durch proaktive Compliance minimieren"
    planBudget: string; // "Compliance-Budget von {{range}} einplanen"
    establishRegularReviews: string;
    /* Synergy text */
    synergyBasic: string;
    synergyTemplate: string; // "Bei gleichzeitiger Umsetzung von {{examples}} koennen ..."
    synergyISMS: string; // "ISMS-Aufbau (NIS2 + DORA)"
    synergyRisk: string; // "Risikomanagement-Framework"
    synergySecurity: string; // "Security-by-Design Prozesse"
    synergySustainability: string; // "Nachhaltigkeits-Governance"
    synergyDefault: string; // "Governance-Strukturen und Schulungen"
  };

  /* ── Regulation Names (localized) ── */
  regNames: Record<string, string>;

  /* ── Regulation Subtitles (localized) ── */
  regSubtitles: Record<string, string>;

  /* ── Checklist Item Texts (keyed by item ID) ── */
  checklistItems: Record<string, string>;

  /* ── Regulation Evaluator Reason Templates ── */
  eval: {
    /* NIS2 entity categories */
    essentialEntity: string; // "wesentliche Einrichtung"
    importantEntity: string; // "wichtige Einrichtung"
    /* DSGVO */
    dsgvoBase: string; // "Als {{sizeLabel}} verarbeiten Sie {{dataTypes}} mit EU-Bezug."
    dsgvoSensitive: string; // sensitive data suffix
    dsgvoStandard: string; // standard data suffix
    /* NIS2 */
    nis2CriticalInfra: string;
    nis2SectorSize: string; // "Als {{sizeLabel}} im Sektor {{sectors}} fallen Sie als \"{{category}}\" unter NIS2 Art. 3."
    nis2Suffix: string; // risk management + reporting obligations
    nis2BelowThreshold: string;
    /* AI Act */
    aiActBase: string;
    aiActSensitive: string;
    aiActBanned: string;
    /* DORA */
    doraDirect: string;
    doraProvider: string;
    /* CRA */
    craBase: string;
    craManufacturing: string;
    /* CSRD */
    csrdDirect: string;
    csrdIndirect: string;
    /* DSA */
    dsaReason: string;
    /* MiCA */
    micaReason: string;
    /* Data Act */
    dataActIoT: string;
    dataActManufacturer: string;
    /* ePrivacy */
    eprivacyDirect: string;
    eprivacyIndirect: string;
    /* eIDAS */
    eidasDirect: string;
    eidasPublic: string;
    /* Produkthaftung */
    produkthaftungReason: string;
    /* EHDS */
    ehdsReason: string;
  };
}
