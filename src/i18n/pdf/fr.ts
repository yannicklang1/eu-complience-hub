/* ══════════════════════════════════════════════════════════════
   French (FR) — PDF Report translations
   ══════════════════════════════════════════════════════════════ */

import type { PDFMessages } from "./types";

const fr: PDFMessages = {
  locale: "fr",

  /* ── Cover Page ── */
  cover: {
    label: "EU Compliance Hub",
    title: "Votre rapport",
    titleAccent: "Compliance personnalis\u00e9",
    preparedFor: "Pr\u00e9par\u00e9 pour",
    dateLabel: "Date de cr\u00e9ation : ",
    countryLabel: "Pays : ",
    referenceLabel: "R\u00e9f\u00e9rence : ",
    confidential: "Confidentiel",
    disclaimer:
      "Ce rapport est fourni \u00e0 titre indicatif et ne constitue pas un conseil juridique. Les informations pr\u00e9sent\u00e9es reposent sur vos d\u00e9clarations et les r\u00e9glementations en vigueur au moment de la g\u00e9n\u00e9ration.",
    branding: "eu-compliance-hub.eu",
    page: "Page 1",
  },

  /* ── Table of Contents ── */
  toc: {
    title: "Table des mati\u00e8res",
    subtitle: "Vue d\u2019ensemble de toutes les sections de votre rapport de conformit\u00e9",
    methodologyTitle: "M\u00e9thodologie",
    methodologyText:
      "Ce rapport repose sur le cadre d\u2019\u00e9valuation de l\u2019EU Compliance Hub. L\u2019\u00e9valuation prend en compte les donn\u00e9es de votre entreprise, les textes officiels des r\u00e8glements europ\u00e9ens et les lois nationales de transposition. Toutes les donn\u00e9es relatives aux amendes correspondent aux plafonds l\u00e9gaux. Les sanctions r\u00e9elles varient selon l\u2019\u00c9tat membre et le cas particulier.",
    reportNr: "Rapport n\u00b0",
  },

  /* ── Executive Summary ── */
  exec: {
    title: "En un coup d\u2019\u0153il",
    subtitle: "R\u00e9sum\u00e9 ex\u00e9cutif \u2014 Votre situation de conformit\u00e9 en un coup d\u2019\u0153il",
    cumulativeFineRisk: "Risque d\u2019amende cumul\u00e9",
    upTo: "jusqu\u2019\u00e0",
    basedOnRegs:
      "Bas\u00e9 sur {{count}} r\u00e9glementations pertinentes et votre chiffre d\u2019affaires annuel estim\u00e9",
    maturityLabel: "Maturit\u00e9",
    regulationsLabel: "R\u00e9glementations",
    highMedLow: "{{high}} \u00e9lev\u00e9(es), {{medium}} moyen(nes), {{low}} faible(s)",
    costEstLabel: "Co\u00fbts (est.)",
    implementationCosts: "Co\u00fbts de mise en \u0153uvre",
    nextDeadlineLabel: "\u00c9ch\u00e9ance suivante",
    noUrgent: "Aucune urgente",
    regOverview: "Vue d\u2019ensemble des r\u00e9glementations ({{count}} \u00e9valu\u00e9es)",
    criticalRisks: "Risques critiques",
    fineUpTo: "Amende jusqu\u2019\u00e0 {{amount}}",
    priorityActions: "Actions prioritaires recommand\u00e9es",
    relevanceHigh: "\u00c9lev\u00e9e",
    relevanceMedium: "Moyenne",
    relevanceLow: "Faible",
    riskLevelCritical: "Critique",
    riskLevelHigh: "Élevé",
    riskLevelMedium: "Moyen",
  },

  /* ── Company Profile ── */
  profile: {
    title: "Profil de l\u2019entreprise & p\u00e9rim\u00e8tre d\u2019\u00e9valuation",
    subtitle: "Base de votre \u00e9valuation de conformit\u00e9 personnalis\u00e9e",
    companyLabel: "Entreprise",
    contactLabel: "Interlocuteur",
    sizeLabel: "Taille de l\u2019entreprise",
    revenueLabel: "Chiffre d\u2019affaires annuel (env.)",
    industryLabel: "Secteur d\u2019activit\u00e9",
    countryLabel: "Pays",
    sectorsTitle: "Secteurs & industries",
    activitiesTitle: "Activit\u00e9s & op\u00e9rations",
    dataTypesTitle: "Types de donn\u00e9es trait\u00e9es",
    regulationsEvaluated: "R\u00e9glementations\n\u00e9valu\u00e9es",
    highRelevance: "Pertinence\n\u00e9lev\u00e9e",
    mediumRelevance: "Pertinence\nmoyenne",
    lowRelevance: "Pertinence\nfaible",
    methodologyNote:
      "Bas\u00e9 sur le cadre d\u2019\u00e9valuation de l\u2019EU Compliance Hub. L\u2019\u00e9valuation de la pertinence prend en compte la taille de l\u2019entreprise, le secteur d\u2019activit\u00e9, le traitement des donn\u00e9es et les activit\u00e9s sp\u00e9cifiques conform\u00e9ment aux champs d\u2019application officiels des r\u00e8glements europ\u00e9ens.",
    sizeLabels: {
      micro: "Micro-entreprise (< 10 employ\u00e9s)",
      small: "Petite entreprise (10\u201349 employ\u00e9s)",
      medium: "Moyenne entreprise (50\u2013249 employ\u00e9s)",
      large: "Grande entreprise (250+ employ\u00e9s)",
    },
    sectorLabels: {
      it: "IT / Logiciels / Cloud",
      finance: "Services financiers / Assurance",
      health: "Sant\u00e9 / Pharma",
      energy: "\u00c9nergie / Services publics",
      manufacturing: "Industrie / Production",
      transport: "Transport / Logistique",
      retail: "Commerce / E-commerce",
      telecom: "T\u00e9l\u00e9communications",
      public: "Secteur public",
      other: "Autre secteur",
    },
    activityLabels: {
      ai: "Syst\u00e8mes d\u2019IA",
      software: "Produits num\u00e9riques",
      "critical-infra": "Infrastructure critique",
      "online-platform": "Plateforme en ligne",
      esg: "Reporting ESG",
      crypto: "Crypto-actifs",
      "cross-border": "Transfrontalier",
      ecommerce: "E-commerce",
      eid: "eID / Services de confiance",
    },
    dataLabels: {
      personal: "Donn\u00e9es personnelles",
      sensitive: "Cat\u00e9gories particuli\u00e8res",
      children: "Donn\u00e9es de mineurs",
      financial: "Donn\u00e9es financi\u00e8res",
      b2b: "Donn\u00e9es B2B",
      iot: "Donn\u00e9es IoT / capteurs",
    },
    revenueLabels: {
      "< 2M": "< 2 M EUR",
      "2-10M": "2\u201310 M EUR",
      "10-50M": "10\u201350 M EUR",
      "> 50M": "> 50 M EUR",
    },
  },

  /* ── Risk Exposure ── */
  risk: {
    title: "Exposition aux risques & risque d\u2019amende",
    subtitle:
      "Risques d\u2019amende maximaux bas\u00e9s sur votre chiffre d\u2019affaires annuel estim\u00e9",
    cumulativeFineRisk: "Risque d\u2019amende cumul\u00e9",
    roiLabel: "ROI : investissement conformit\u00e9",
    roiValue: "{{multiple}}x r\u00e9duction du risque",
    complianceInvestment: "Investissement conformit\u00e9",
    complianceInvestmentDesc:
      "Co\u00fbts de mise en \u0153uvre estim\u00e9s pour toutes les r\u00e9glementations pertinentes",
    fineRisk: "Risque d\u2019amende",
    fineRiskDesc: "Sanctions maximales cumul\u00e9es en cas de non-conformit\u00e9",
    disclaimer:
      "Sanctions maximales conform\u00e9ment aux textes des r\u00e8glements europ\u00e9ens. Pour les r\u00e9glementations avec la r\u00e8gle du \u00ab montant le plus \u00e9lev\u00e9 \u00bb, le calcul repose sur un chiffre d\u2019affaires annuel estim\u00e9 de {{revenue}}. Les sanctions r\u00e9elles varient selon l\u2019\u00c9tat membre, la gravit\u00e9 de l\u2019infraction et le degr\u00e9 de coop\u00e9ration.",
    billion: "Mrd",
    million: "M",
    calcPercent: "{{percent}}\u202f% du chiffre d\u2019affaires annuel ({{amount}})",
    calcFixed: "Montant fixe\u202f: {{amount}}",
    calcUpTo: "Jusqu\u2019\u00e0 {{amount}}",
    calcUpToPercent: "Jusqu\u2019\u00e0 {{percent}}\u202f% du chiffre d\u2019affaires annuel",
  },

  /* ── Regulation Section ── */
  regulation: {
    analysisTitle: "Analyse r\u00e9glementaire",
    analysisSubtitle:
      "\u00c9valuation d\u00e9taill\u00e9e des r\u00e9glementations europ\u00e9ennes pertinentes pour votre entreprise",
    countryFocus: "Pays cibl\u00e9 : {{country}}",
    whyRelevant: "Pourquoi pertinent",
    fineLabel: "Amende : ",
    checklistTitle: "Checklist de conformit\u00e9",
    checklistStatus: "({{compliant}} conforme(s), {{partial}} partiel(les))",
    deadlineLabel: "\u00c9ch\u00e9ance : ",
    authorityLabel: "Autorit\u00e9 : ",
    nationalLawLabel: "Loi nationale : ",
    nationalFinesLabel: "Amendes : ",
    guideLabel: "Guide d\u00e9taill\u00e9 : ",
    legendCompliant: "Conforme",
    legendPartial: "Partiel",
    legendOpen: "En attente",
    relevanceHighLabel: "Pertinence \u00e9lev\u00e9e",
    relevanceMediumLabel: "Pertinence moyenne",
    relevanceLowLabel: "Pertinence faible",
    priorityImmediate: "Imm\u00e9diat",
    priorityShortTerm: "Court terme",
    priorityMediumTerm: "Moyen terme",
  },

  /* ── Maturity Assessment ── */
  maturity: {
    title: "\u00c9valuation de la maturit\u00e9",
    subtitle: "Niveau de maturit\u00e9 en conformit\u00e9 de votre entreprise",
    categoryTitle: "\u00c9valuation par cat\u00e9gorie",
    points: "{{score}} / {{max}} points",
    scaleTitle: "\u00c9chelle de notation",
    gradeLabels: [
      { letter: "A", label: "80\u2013100% Exemplaire" },
      { letter: "B", label: "60\u201379% Avanc\u00e9" },
      { letter: "C", label: "40\u201359% Basique" },
      { letter: "D", label: "20\u201339% D\u00e9butant" },
      { letter: "E", label: "0\u201319% Critique" },
    ],
    gradeLetterLabels: {
      A: "A \u2013 Exemplaire",
      B: "B \u2013 Avancé",
      C: "C \u2013 Élémentaire",
      D: "D \u2013 Débutant",
      E: "E \u2013 Critique",
    },
    categoryLabels: {
      governance: "Gouvernance & Organisation",
      datenschutz: "Protection des données (RGPD)",
      cybersecurity: "Cybersécurité (NIS2/CRA)",
      "ki-compliance": "IA & Technologie (AI Act)",
      reporting: "Reporting & Documentation",
    },
    gradeExcellent:
      "Votre entreprise fait preuve d\u2019une maturit\u00e9 exemplaire en mati\u00e8re de conformit\u00e9. Les bases pour {{regulations}} sont solidement mises en \u0153uvre. Concentrez-vous sur l\u2019am\u00e9lioration continue et les audits r\u00e9guliers.",
    gradeGood:
      "Bonne progression dans la mise en \u0153uvre de la conformit\u00e9. Les structures essentielles pour {{regulations}} sont d\u00e9j\u00e0 en place. {{weakAreas}}",
    gradeBasic:
      "Des structures de conformit\u00e9 de base existent, mais des lacunes importantes subsistent pour {{regulations}}. {{weakAreas}} Le risque d\u2019amende est \u00e9lev\u00e9 \u00e0 ce niveau de maturit\u00e9.",
    gradeBeginner:
      "Votre maturit\u00e9 en conformit\u00e9 r\u00e9v\u00e8le un besoin consid\u00e9rable d\u2019am\u00e9lioration. Des mesures essentielles pour {{regulations}} font d\u00e9faut. {{weakAreas}} Des actions imm\u00e9diates sont vivement recommand\u00e9es pour minimiser les amendes et les risques de responsabilit\u00e9.",
    gradeCritical:
      "Action critique requise : votre entreprise n\u2019a quasiment mis en \u0153uvre aucune mesure de conformit\u00e9 pour {{regulations}}. Le risque d\u2019amendes et de responsabilit\u00e9 personnelle de la direction est tr\u00e8s \u00e9lev\u00e9. Un conseil professionnel imm\u00e9diat est vivement recommand\u00e9.",
    recoGoodTitle: "Recommandation : am\u00e9lioration continue",
    recoGoodText:
      "Mettez en place des revues de conformit\u00e9 r\u00e9guli\u00e8res (trimestrielles) et maintenez votre documentation \u00e0 jour. Formez syst\u00e9matiquement les nouveaux collaborateurs et surveillez les \u00e9volutions r\u00e9glementaires.",
    recoBasicTitle: "Recommandation : mise en place structur\u00e9e",
    recoBasicText:
      "D\u00e9finissez des responsabilit\u00e9s claires en mati\u00e8re de conformit\u00e9 et \u00e9tablissez un plan sur 3 mois. Commencez par les r\u00e9glementations les plus pertinentes et comblez d\u2019abord les lacunes les plus importantes.",
    recoCriticalTitle: "Recommandation : action imm\u00e9diate requise",
    recoCriticalText:
      "\u00c0 ce niveau de maturit\u00e9, le risque de sanctions est aigu. D\u00e9signez imm\u00e9diatement un responsable conformit\u00e9, faites r\u00e9aliser une analyse des \u00e9carts professionnelle et priorisez les r\u00e9glementations pr\u00e9sentant le risque d\u2019amende le plus \u00e9lev\u00e9.",
  },

  /* ── Cost Estimation ── */
  cost: {
    title: "Estimation des co\u00fbts",
    subtitle: "Co\u00fbts de mise en \u0153uvre estim\u00e9s \u2014 {{sizeLabel}}",
    totalCosts: "Co\u00fbts totaux estim\u00e9s",
    regulationsCount: "{{count}} r\u00e9glementations",
    exclSynergies: "hors synergies",
    complianceInvestment: "Investissement conformit\u00e9",
    avgCostsLabel: "Co\u00fbts moyens de mise en \u0153uvre",
    fineRisk: "Risque d\u2019amende",
    cumulativeFines: "Sanctions maximales cumul\u00e9es",
    fineRiskIs: "Le risque d\u2019amende est",
    timesHigher: "sup\u00e9rieur \u00e0 l\u2019investissement conformit\u00e9",
    clearBusinessCase: "Business case \u00e9vident",
    synergiesTitle: "Effets de synergie",
    sizeLabels: {
      micro: "Micro-entreprise",
      small: "Petite entreprise",
      medium: "Moyenne entreprise",
      large: "Grande entreprise",
    },
    breakdownItems: {
      "dsgvo-0": "Registre des traitements & analyse des écarts",
      "dsgvo-1": "Politique de confidentialité & contrats",
      "dsgvo-2": "Mise en œuvre des mesures techniques et organisationnelles",
      "dsgvo-3": "Formations & sensibilisation",
      "dsgvo-4": "Délégué à la protection des données (externe, annuel)",
      "nis2-0": "Gestion des risques & analyse des écarts",
      "nis2-1": "Mise en place SMSI / ISO 27001",
      "nis2-2": "Processus de réponse aux incidents",
      "nis2-3": "Sécurité de la chaîne d'approvisionnement",
      "nis2-4": "Formation direction & gouvernance",
      "nis2-5": "Mesures techniques (monitoring, SIEM)",
      "ai-act-0": "Inventaire IA & évaluation des risques",
      "ai-act-1": "Documentation de conformité",
      "ai-act-2": "Tests de biais & monitoring",
      "ai-act-3": "Mesures de transparence",
      "ai-act-4": "Formations (compétences IA)",
      "dora-0": "Cadre de gestion des risques TIC",
      "dora-1": "Système de notification des incidents",
      "dora-2": "Tests de résilience (TLPT)",
      "dora-3": "Gestion des risques tiers",
      "dora-4": "Cadre de partage d'informations",
      "cra-0": "Revue Security-by-Design",
      "cra-1": "Gestion des vulnérabilités (SBOM)",
      "cra-2": "Évaluation de conformité",
      "cra-3": "Processus de mises à jour sécurité (5 ans)",
      "cra-4": "Documentation & marquage CE",
      "csrd-0": "Analyse de matérialité (double matérialité)",
      "csrd-1": "Collecte de données ESG & KPIs",
      "csrd-2": "Rapport conforme ESRS",
      "csrd-3": "Audit par commissaire aux comptes",
      "csrd-4": "Logiciels & outils",
    },
  },

  /* ── Deadline Timeline ── */
  deadlines: {
    title: "Aper\u00e7u de vos \u00e9ch\u00e9ances",
    subtitle: "\u00c9ch\u00e9ances r\u00e9glementaires europ\u00e9ennes pertinentes pour votre entreprise",
    noDeadlines: "Aucune \u00e9ch\u00e9ance pertinente identifi\u00e9e.",
    today: "AUJOURD\u2019HUI",
    daysPassed: "il y a {{days}} jours",
    todayLabel: "Aujourd\u2019hui",
    inDays: "dans {{days}} jours",
    titles: {
      "DSA-2024-02-17": "DSA pleinement en vigueur",
      "MiCA-2024-12-30": "MiCA pleinement en vigueur",
      "DORA-2025-01-17": "DORA en vigueur",
      "CSRD-2025-01-01": "CSRD Vague 2",
      "AI Act-2025-02-02": "AI Act Interdictions",
      "BaFG-2025-06-28": "Loi accessibilité en vigueur",
      "AI Act-2025-08-02": "AI Act GPAI",
      "Data Act-2025-09-12": "Data Act en vigueur",
      "DORA-2026-03-13": "DORA Registre TIC",
      "CSRD-2026-01-01": "NaBeG AT Phase 1",
      "eIDAS-2026-05-20": "eIDAS 2.0 Portefeuille",
      "AI Act-2026-08-02": "AI Act Haut risque",
      "CRA-2026-09-11": "CRA Phase 1",
      "NISG-2026-10-01": "NIS2 Transposition",
      "NISG-2026-12-31": "NIS2 Enregistrement",
      "EHDS-2027-03-26": "EHDS Utilisation primaire",
      "Green Claims-2027-03-27": "Green Claims Transposition",
      "CSRD-2027-01-01": "CSRD Vague 3",
      "DPP-2027-06-01": "DPP Batteries",
      "AI Act-2027-08-02": "AI Act Annexe I",
      "PLD-2027-12-09": "PLD Transposition",
      "CRA-2027-12-11": "CRA Phase 2",
      "HSchG-2028-01-01": "Évaluation lanceurs d'alerte",
      "CSRD-2029-01-01": "CSRD Vague 4",
      "DPP-2030-01-01": "DPP Textiles & Électronique",
    },
    descs: {
      "DSA-2024-02-17": "Tous les services intermédiaires doivent respecter les obligations du DSA.",
      "MiCA-2024-12-30": "Toutes les obligations pour les CASP et émetteurs de jetons s'appliquent.",
      "DORA-2025-01-17": "Pleinement applicable à tous les établissements financiers.",
      "CSRD-2025-01-01": "Les grandes entreprises (>250 employés) font leur premier rapport.",
      "AI Act-2025-02-02": "Les pratiques d'IA interdites entrent en vigueur.",
      "BaFG-2025-06-28": "Obligation d'accessibilité pour les produits et services numériques.",
      "AI Act-2025-08-02": "Les obligations GPAI et les règles de gouvernance s'appliquent.",
      "Data Act-2025-09-12": "Accès aux données IoT, changement de cloud et règles B2B s'appliquent.",
      "DORA-2026-03-13": "Registre d'information à soumettre à la FMA.",
      "CSRD-2026-01-01": "Les grandes entreprises PIE rapportent selon ESRS en Autriche.",
      "eIDAS-2026-05-20": "Les portefeuilles d'identité numérique UE doivent être disponibles.",
      "AI Act-2026-08-02": "Obligations complètes pour les systèmes d'IA à haut risque.",
      "CRA-2026-09-11": "Obligations de notification 24h/72h à l'ENISA.",
      "NISG-2026-10-01": "Toutes les obligations pour les entités concernées.",
      "NISG-2026-12-31": "Enregistrement auprès du BSC obligatoire.",
      "EHDS-2027-03-26": "Droits des patients et accès aux données de santé personnelles.",
      "Green Claims-2027-03-27": "Transposition nationale de la directive anti-greenwashing.",
      "CSRD-2027-01-01": "Les PME cotées rapportent pour la première fois selon ESRS.",
      "DPP-2027-06-01": "Passeport numérique des produits pour les batteries obligatoire.",
      "AI Act-2027-08-02": "Systèmes à haut risque restants (dispositifs médicaux etc.) réglementés.",
      "PLD-2027-12-09": "Transposition nationale de la nouvelle directive responsabilité des produits.",
      "CRA-2027-12-11": "Le marquage CE devient obligatoire.",
      "HSchG-2028-01-01": "Évaluation des mesures de protection des lanceurs d'alerte.",
      "CSRD-2029-01-01": "Les entreprises non-UE (>150 M EUR de CA UE) rapportent.",
      "DPP-2030-01-01": "Passeport produit pour textiles et électronique obligatoire.",
    },
  },

  /* ── Action Roadmap ── */
  roadmap: {
    title: "Plan d\u2019action",
    subtitle:
      "Plan en 3 phases prioris\u00e9 pour votre mise en conformit\u00e9",
    phase1Label: "Phase 1",
    phase1Time: "Imm\u00e9diat (0\u201330 jours)",
    phase2Label: "Phase 2",
    phase2Time: "Court terme (1\u20133 mois)",
    phase3Label: "Phase 3",
    phase3Time: "Moyen terme (3\u20136 mois)",
    effortLabel: "Effort : ",
    effortLow: "Faible",
    effortMedium: "Moyen",
    effortHigh: "\u00c9lev\u00e9",
    quickWinsTitle: "Quick Wins",
    quickWinsText:
      "Commencez par une analyse des \u00e9carts des r\u00e9glementations les plus importantes. De nombreuses mesures (p. ex. formations, documentation, analyses de risques) sont transversales et g\u00e9n\u00e8rent des effets de synergie de 20\u201340% d\u2019\u00e9conomies.",
  },

  /* ── Software Recommendations ── */
  software: {
    title: "Outils & logiciels recommand\u00e9s",
    subtitle:
      "Solutions s\u00e9lectionn\u00e9es pour vos r\u00e9glementations pertinentes \u2014 tri\u00e9es par pertinence DACH",
    dachFocus: "DACH Focus",
    dachPresent: "DACH pr\u00e9sent",
    international: "International",
    disclaimerText:
      "Toutes les recommandations sont ind\u00e9pendantes et s\u00e9lectionn\u00e9es par la r\u00e9daction. Les prix sont indicatifs et peuvent varier selon la taille de l\u2019entreprise et la configuration. Des comparatifs d\u00e9taill\u00e9s sont disponibles sur notre site web.",
    disclaimerUrl: "eu-compliance-hub.eu/tools",
  },

  /* ── Next Steps ── */
  nextSteps: {
    title: "Prochaines \u00e9tapes",
    subtitle: "Actions recommand\u00e9es pour votre mise en conformit\u00e9",
    guidesTitle: "Vos guides pertinents",
    ctaTitle: "Nous vous accompagnons",
    ctaText:
      "Utilisez nos outils interactifs gratuits pour une analyse approfondie. Abonnez-vous \u00e0 notre briefing conformit\u00e9 pour les derni\u00e8res mises \u00e0 jour r\u00e9glementaires.",
    ctaToolsLabel: "Tous les outils",
    ctaNewsletterLabel: "Newsletter",
    ctaContactLabel: "Contact",
    branding:
      "EU Compliance Hub \u2014 Votre navigateur \u00e0 travers le paysage r\u00e9glementaire europ\u00e9en",
  },

  /* ── Shared Footer ── */
  footer: {
    siteName: "EU Compliance Hub | eu-compliance-hub.eu",
    pageOf: "Page {{page}} sur {{total}}",
    generatedAt: "G\u00e9n\u00e9r\u00e9 le {{date}} \u2014 Ne constitue pas un conseil juridique",
  },

  /* ── TOC Section Names ── */
  tocSections: {
    executiveSummary: "R\u00e9sum\u00e9 ex\u00e9cutif",
    executiveSummaryDesc: "Votre situation de conformit\u00e9 en un coup d\u2019\u0153il",
    companyProfile: "Profil de l\u2019entreprise",
    companyProfileDesc: "Base d\u2019\u00e9valuation et contexte de l\u2019entreprise",
    riskExposure: "Exposition aux risques",
    riskExposureDesc: "Risque d\u2019amende et impact financier",
    regulationAnalysis: "Analyse r\u00e9glementaire",
    regulationAnalysisDesc:
      "\u00c9valuation d\u00e9taill\u00e9e de {{count}} r\u00e9glementations pertinentes",
    maturityAssessment: "\u00c9valuation de la maturit\u00e9",
    maturityAssessmentDesc: "Maturit\u00e9 en conformit\u00e9 par cat\u00e9gorie",
    costEstimation: "Estimation des co\u00fbts",
    costEstimationDesc: "Co\u00fbts de mise en \u0153uvre estim\u00e9s et ROI",
    deadlineOverview: "Aper\u00e7u des \u00e9ch\u00e9ances",
    deadlineOverviewDesc:
      "Pr\u00e9sentation chronologique de toutes les \u00e9ch\u00e9ances pertinentes",
    actionPlan: "Plan d\u2019action",
    actionPlanDesc: "Feuille de route en 3 phases pour la mise en conformit\u00e9",
    softwareRecs: "Recommandations logicielles",
    softwareRecsDesc: "Outils et solutions pour vos r\u00e9glementations",
    nextSteps: "Prochaines \u00e9tapes",
    nextStepsDesc: "Actions recommand\u00e9es et ressources compl\u00e9mentaires",
  },

  /* ── Report Engine Strings ── */
  engine: {
    appointComplianceOfficer:
      "D\u00e9signer un responsable conformit\u00e9 et mettre en place un comit\u00e9 de pilotage",
    deadlineUrgent:
      "{{title}} : \u00e9ch\u00e9ance dans {{days}} jours \u2014 engager des mesures imm\u00e9diates",
    gapAnalysis:
      "R\u00e9aliser une analyse des \u00e9carts et un \u00e9tat des lieux pour {{name}}",
    coreImplementation:
      "Mettre en \u0153uvre les mesures fondamentales de conformit\u00e9 {{name}}",
    trainingProgram:
      "Mettre en place un programme de formation pour les collaborateurs et la direction",
    assessAndPlan:
      "\u00c9valuer les exigences {{name}} et planifier une mise en \u0153uvre prioris\u00e9e",
    establishReviews:
      "\u00c9tablir des revues de conformit\u00e9 r\u00e9guli\u00e8res et des cycles d\u2019audit",
    roleManagement: "Direction",
    roleComplianceTeam: "\u00c9quipe conformit\u00e9",
    roleDeptIT: "Service m\u00e9tier + IT",
    roleHRCompliance: "RH / Conformit\u00e9",
    phaseImmediate: "Imm\u00e9diat (0\u201330 jours)",
    phaseShortTerm: "Court terme (1\u20133 mois)",
    phaseMediumTerm: "Moyen terme (3\u20136 mois)",
    governanceLabel: "Gouvernance",
    trainingLabel: "Formations",
    auditLabel: "Audit",
    defineResponsibilities:
      "D\u00e9finir les responsabilit\u00e9s en mati\u00e8re de conformit\u00e9 au niveau de la direction et allouer le budget",
    deadlinePriority:
      "{{title}} est la priorit\u00e9 la plus \u00e9lev\u00e9e \u2014 \u00e9ch\u00e9ance dans {{days}} jours",
    immediateMeasures: "Engager des mesures imm\u00e9diates pour {{names}}",
    minimizeFineRisk:
      "Minimiser le risque d\u2019amende pouvant atteindre {{amount}} gr\u00e2ce \u00e0 une conformit\u00e9 proactive",
    planBudget: "Pr\u00e9voir un budget conformit\u00e9 de {{range}}",
    establishRegularReviews:
      "\u00c9tablir des revues de conformit\u00e9 r\u00e9guli\u00e8res et maintenir la documentation",
    synergyBasic:
      "La mise en \u0153uvre simultan\u00e9e de plusieurs r\u00e9glementations permet de r\u00e9aliser 20\u201340% d\u2019\u00e9conomies gr\u00e2ce aux synergies.",
    synergyTemplate:
      "La mise en \u0153uvre simultan\u00e9e de {{examples}} permet de r\u00e9aliser 20\u201340% d\u2019\u00e9conomies gr\u00e2ce aux synergies. Mesures communes : {{measures}}.",
    synergyISMS: "Mise en place ISMS (NIS2 + DORA)",
    synergyRisk: "Cadre de gestion des risques",
    synergySecurity: "Processus Security-by-Design",
    synergySustainability: "Gouvernance durabilit\u00e9",
    synergyDefault: "Structures de gouvernance et formations",
  },

  /* ── Regulation Names ── */
  regNames: {
    dsgvo: "RGPD",
    nis2: "NIS2",
    "ai-act": "R\u00e8glement europ\u00e9en sur l\u2019IA",
    dora: "DORA",
    cra: "Cyber Resilience Act",
    csrd: "CSRD / ESG",
    dsa: "Digital Services Act",
    mica: "MiCA",
    "data-act": "Data Act",
    eprivacy: "ePrivacy",
    eidas: "eIDAS 2.0",
    produkthaftung: "Responsabilit\u00e9 du fait des produits (UE)",
    ehds: "EHDS",
  },

  checklistItems: {
    /* NIS2 */
    "nis2-1": "Analyse d\u2019impact r\u00e9alis\u00e9e (secteur, taille, chiffre d\u2019affaires)",
    "nis2-2": "Cadre de gestion des risques mis en \u0153uvre",
    "nis2-3": "Plan de r\u00e9ponse aux incidents cr\u00e9\u00e9 (d\u00e9lai de signalement de 72h)",
    "nis2-4": "Gestion de la continuit\u00e9 d\u2019activit\u00e9 (BCM) \u00e9tablie",
    "nis2-5": "S\u00e9curit\u00e9 de la cha\u00eene d\u2019approvisionnement \u00e9valu\u00e9e",
    "nis2-6": "Direction form\u00e9e \u00e0 la cybers\u00e9curit\u00e9 (responsabilit\u00e9 !)",
    "nis2-7": "Mesures techniques : MFA, chiffrement, segmentation r\u00e9seau",
    "nis2-8": "Obligations de signalement et contacts des autorit\u00e9s d\u00e9finis",
    /* RGPD */
    "dsgvo-1": "Registre des activit\u00e9s de traitement (art. 30) \u00e0 jour et complet",
    "dsgvo-2": "Analyse d\u2019impact relative \u00e0 la protection des donn\u00e9es (DPIA) pour les traitements \u00e0 haut risque",
    "dsgvo-3": "Contrats de sous-traitance (DPA) avec tous les prestataires",
    "dsgvo-4": "Gestion du consentement (banni\u00e8re de cookies, opt-in) conforme",
    "dsgvo-5": "Politique de confidentialit\u00e9 \u00e0 jour et compl\u00e8te",
    "dsgvo-6": "Processus d\u2019exercice des droits des personnes concern\u00e9es mis en place (acc\u00e8s, effacement)",
    "dsgvo-7": "Mesures techniques et organisationnelles (TOMs) document\u00e9es",
    "dsgvo-8": "Notification de violation de donn\u00e9es (72h) pr\u00e9par\u00e9e",
    /* R\u00e8glement sur l\u2019IA */
    "ai-1": "Syst\u00e8mes d\u2019IA inventori\u00e9s et classe de risque d\u00e9termin\u00e9e",
    "ai-2": "Pratiques d\u2019IA interdites exclues (notation sociale, etc.)",
    "ai-3": "Syst\u00e8mes \u00e0 haut risque soumis \u00e0 \u00e9valuation de conformit\u00e9",
    "ai-4": "Obligations de transparence pour chatbots/deepfakes mises en \u0153uvre",
    "ai-5": "Ma\u00eetrise de l\u2019IA assur\u00e9e pour les collaborateurs",
    "ai-6": "Obligations de documentation et documentation technique cr\u00e9\u00e9es",
    "ai-7": "Supervision humaine des d\u00e9cisions de l\u2019IA assur\u00e9e",
    /* DORA */
    "dora-1": "Cadre de gestion des risques TIC \u00e9tabli",
    "dora-2": "Signalement des incidents TIC \u00e0 l\u2019autorit\u00e9 de surveillance pr\u00e9par\u00e9",
    "dora-3": "Tests de p\u00e9n\u00e9tration fond\u00e9s sur la menace (TLPT) planifi\u00e9s",
    "dora-4": "Gestion des risques li\u00e9s aux prestataires TIC tiers mise en \u0153uvre",
    "dora-5": "Registre des prestataires de services TIC critiques tenu \u00e0 jour",
    "dora-6": "Plans de continuit\u00e9 d\u2019activit\u00e9 et de reprise apr\u00e8s sinistre test\u00e9s",
    /* CRA */
    "cra-1": "Produits comportant des \u00e9l\u00e9ments num\u00e9riques identifi\u00e9s",
    "cra-2": "S\u00e9curit\u00e9 d\u00e8s la conception int\u00e9gr\u00e9e au processus de d\u00e9veloppement",
    "cra-3": "Processus de gestion des vuln\u00e9rabilit\u00e9s \u00e9tabli",
    "cra-4": "Nomenclature logicielle (SBOM) cr\u00e9\u00e9e",
    "cra-5": "Mises \u00e0 jour de s\u00e9curit\u00e9 planifi\u00e9es pour la p\u00e9riode de support",
    "cra-6": "\u00c9valuation de conformit\u00e9 pour la cat\u00e9gorie de produit pr\u00e9par\u00e9e",
    /* CSRD */
    "csrd-1": "Applicabilit\u00e9 v\u00e9rifi\u00e9e selon la taille de l\u2019entreprise",
    "csrd-2": "Analyse de double mat\u00e9rialit\u00e9 r\u00e9alis\u00e9e",
    "csrd-3": "Points de donn\u00e9es ESRS identifi\u00e9s et collect\u00e9s",
    "csrd-4": "Processus de collecte des donn\u00e9es ESG mis en place",
    "csrd-5": "Auditeur pour le rapport de durabilit\u00e9 s\u00e9lectionn\u00e9",
    "csrd-6": "Alignement taxonomique des activit\u00e9s \u00e9conomiques v\u00e9rifi\u00e9",
  },

  /* ── Regulation Subtitles ── */
  regSubtitles: {
    dsgvo: "R\u00e8glement G\u00e9n\u00e9ral sur la Protection des Donn\u00e9es",
    nis2: "S\u00e9curit\u00e9 des r\u00e9seaux et de l\u2019information",
    "ai-act": "R\u00e9glementation de l\u2019IA",
    dora: "R\u00e9silience op\u00e9rationnelle num\u00e9rique",
    cra: "Cybers\u00e9curit\u00e9 des produits",
    csrd: "Reporting de durabilit\u00e9",
    dsa: "R\u00e9glementation des plateformes",
    mica: "March\u00e9s de crypto-actifs",
    "data-act": "R\u00e9glementation de l\u2019acc\u00e8s aux donn\u00e9es",
    eprivacy: "Protection de la vie priv\u00e9e dans les communications \u00e9lectroniques",
    eidas: "Identification \u00e9lectronique",
    produkthaftung: "Nouvelle directive sur la responsabilit\u00e9 du fait des produits",
    ehds: "Espace europ\u00e9en des donn\u00e9es de sant\u00e9",
  },

  /* ── Regulation Evaluator Reason Templates ── */
  eval: {
    essentialEntity: "entit\u00e9 essentielle",
    importantEntity: "entit\u00e9 importante",

    dsgvoBase: "En tant que {{sizeLabel}}, vous traitez {{dataTypes}} avec une port\u00e9e UE.",
    dsgvoSensitive: "Le traitement de cat\u00e9gories particuli\u00e8res de donn\u00e9es entra\u00eene des obligations renforc\u00e9es (art. 9 RGPD), notamment des analyses d\u2019impact relatives \u00e0 la protection des donn\u00e9es.",
    dsgvoStandard: "Cela inclut les obligations de tenue du registre des activit\u00e9s de traitement (art. 30), les droits des personnes concern\u00e9es (art. 15\u201322) et les analyses d\u2019impact pour les traitements \u00e0 haut risque.",

    nis2CriticalInfra: "En tant qu\u2019op\u00e9rateur d\u2019infrastructure critique, vous \u00eates qualifi\u00e9 d\u2019\u00ab\u202fentit\u00e9 essentielle\u202f\u00bb au titre de l\u2019art. 3 NIS2, soumis aux obligations les plus strictes.",
    nis2SectorSize: "En tant que {{sizeLabel}} dans le secteur {{sectors}}, vous \u00eates qualifi\u00e9 de \u00ab\u202f{{category}}\u202f\u00bb au titre de l\u2019art. 3 NIS2.",
    nis2Suffix: "Cela inclut la gestion des risques (art. 21), le signalement des incidents sous 24h/72h (art. 23) et la responsabilit\u00e9 personnelle de la direction (art. 20).",
    nis2BelowThreshold: "Votre secteur {{sectors}} rel\u00e8ve de NIS2, mais en tant que {{sizeLabel}} vous \u00eates en dessous des seuils (50 employ\u00e9s / 10\u202fM\u20ac de chiffre d\u2019affaires). Surveillez la transposition nationale \u2014 certains \u00c9tats membres peuvent fixer des seuils inf\u00e9rieurs.",

    aiActBase: "En tant que {{sizeLabel}}, vous d\u00e9ployez ou d\u00e9veloppez des syst\u00e8mes d\u2019IA. Le r\u00e8glement europ\u00e9en sur l\u2019IA exige une classification des risques de tous les syst\u00e8mes d\u2019IA et classe certaines applications comme \u00e0 haut risque.",
    aiActSensitive: "Le traitement de donn\u00e9es sensibles entra\u00eene probablement des obligations renforc\u00e9es de transparence et de documentation.",
    aiActBanned: "Les pratiques d\u2019IA interdites (art. 5) sont en vigueur depuis f\u00e9vrier 2025.",

    doraDirect: "En tant que {{sizeLabel}} dans le secteur financier, vous relevez directement de DORA. Vous devez \u00e9tablir un cadre de gestion des risques TIC (art. 6\u201316), signaler les incidents aux autorit\u00e9s de surveillance (art. 17\u201323) et r\u00e9aliser des tests de p\u00e9n\u00e9tration fond\u00e9s sur la menace.",
    doraProvider: "En tant que prestataire de services informatiques avec acc\u00e8s aux donn\u00e9es financi\u00e8res, vous pouvez \u00eatre qualifi\u00e9 de \u00ab\u202fprestataire tiers TIC critique\u202f\u00bb au titre de l\u2019art. 31 DORA. Cela implique une surveillance directe par les autorit\u00e9s financi\u00e8res europ\u00e9ennes et des exigences contractuelles strictes.",

    craBase: "En tant que fabricant de produits comportant des \u00e9l\u00e9ments num\u00e9riques, vous relevez du Cyber Resilience Act. Vous devez mettre en \u0153uvre la s\u00e9curit\u00e9 d\u00e8s la conception (art. 10), maintenir un SBOM (nomenclature logicielle) et fournir des mises \u00e0 jour de s\u00e9curit\u00e9 pendant toute la p\u00e9riode de support.",
    craManufacturing: "En tant qu\u2019entreprise industrielle, des exigences suppl\u00e9mentaires s\u2019appliquent pour les syst\u00e8mes de production connect\u00e9s.",

    csrdDirect: "En tant que {{sizeLabel}} dans l\u2019UE, vous \u00eates tenu de publier un reporting de durabilit\u00e9 selon les normes ESRS dans le cadre de la CSRD. Cela inclut une analyse de double mat\u00e9rialit\u00e9, les \u00e9missions Scope 1/2/3 et une assurance externe par des auditeurs.",
    csrdIndirect: "Par vos activit\u00e9s ESG/durabilit\u00e9 en tant que {{sizeLabel}}, le reporting CSRD peut devenir pertinent via la cha\u00eene d\u2019approvisionnement ou sur base volontaire. \u00c0 partir de 2026, les PME cot\u00e9es sont \u00e9galement concern\u00e9es.",

    dsaReason: "En tant qu\u2019op\u00e9rateur d\u2019une plateforme en ligne ou d\u2019une place de march\u00e9, vous relevez du DSA. Les obligations comprennent des rapports de transparence (art. 15), un syst\u00e8me de notification et d\u2019action pour les contenus illicites (art. 16), des proc\u00e9dures de r\u00e9clamation (art. 20) et l\u2019interdiction des dark patterns (art. 25).",

    micaReason: "En tant que {{sizeLabel}} dans le secteur des crypto-actifs/blockchain, vous devez demander un agr\u00e9ment en tant que CASP (prestataire de services sur crypto-actifs) au titre de MiCA, respecter les exigences AML/KYC et mettre en \u0153uvre la Travel Rule. Les livres blancs pour les \u00e9missions de jetons n\u00e9cessitent une approbation.",

    dataActIoT: "Vous traitez des donn\u00e9es IoT/capteurs et devez accorder aux utilisateurs l\u2019acc\u00e8s aux donn\u00e9es g\u00e9n\u00e9r\u00e9es en vertu du Data Act (art. 3\u20137). Cela inclut des formats de donn\u00e9es standardis\u00e9s, des conditions contractuelles \u00e9quitables et le droit de partager les donn\u00e9es avec des tiers.",
    dataActManufacturer: "En tant que fabricant de produits dans le secteur {{sectors}}, les obligations d\u2019acc\u00e8s aux donn\u00e9es du Data Act peuvent s\u2019appliquer, notamment si vos produits g\u00e9n\u00e8rent des donn\u00e9es d\u2019utilisation.",

    eprivacyDirect: "En tant qu\u2019entreprise de commerce \u00e9lectronique, les obligations ePrivacy relatives aux cookies, au tra\u00e7age et au marketing direct \u00e9lectronique s\u2019appliquent \u00e0 vous. Un syst\u00e8me de gestion du consentement conforme (banni\u00e8re de cookies avec opt-in) est obligatoire.",
    eprivacyIndirect: "Les r\u00e8gles ePrivacy sur les cookies et le tra\u00e7age s\u2019appliquent \u00e9galement \u00e0 votre site web. Une banni\u00e8re de cookies conforme au RGPD avec un v\u00e9ritable opt-in est requise.",

    eidasDirect: "En tant que fournisseur de services d\u2019identification \u00e9lectronique ou de confiance, vous devez respecter les exigences d\u2019eIDAS 2.0, y compris la compatibilit\u00e9 avec le portefeuille d\u2019identit\u00e9 num\u00e9rique europ\u00e9en et les signatures \u00e9lectroniques qualifi\u00e9es.",
    eidasPublic: "Dans le secteur public, le portefeuille d\u2019identit\u00e9 num\u00e9rique europ\u00e9en sera obligatoire \u00e0 partir de 2026. Pr\u00e9parez vos syst\u00e8mes pour une identification conforme \u00e0 eIDAS 2.0.",

    produkthaftungReason: "La directive r\u00e9vis\u00e9e de l\u2019UE sur la responsabilit\u00e9 du fait des produits s\u2019\u00e9tend d\u00e9sormais aux logiciels et syst\u00e8mes d\u2019IA en tant que produits autonomes. En tant que {{sizeLabel}} dans le secteur {{sectors}}, vous \u00eates soumis \u00e0 une responsabilit\u00e9 stricte pour les produits d\u00e9fectueux \u2014 l\u2019inversion de la charge de la preuve renforce la protection des consommateurs.",

    ehdsReason: "En tant que {{sizeLabel}} dans le secteur de la sant\u00e9, l\u2019Espace europ\u00e9en des donn\u00e9es de sant\u00e9 (EHDS) devient pertinent. L\u2019utilisation primaire (portabilit\u00e9 des patients) et secondaire (acc\u00e8s pour la recherche) exigent des syst\u00e8mes interop\u00e9rables et des formats de donn\u00e9es compatibles FHIR.",
  },
};

export default fr;
