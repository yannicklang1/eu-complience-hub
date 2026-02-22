/* ══════════════════════════════════════════════════════════════
   English (EN) — PDF Report translations
   ══════════════════════════════════════════════════════════════ */

import type { PDFMessages } from "./types";

const en: PDFMessages = {
  locale: "en",

  /* ── Cover Page ── */
  cover: {
    label: "EU Compliance Hub",
    title: "Your personal",
    titleAccent: "Compliance Report",
    preparedFor: "Prepared for",
    dateLabel: "Date: ",
    countryLabel: "Country: ",
    referenceLabel: "Reference: ",
    confidential: "Confidential",
    disclaimer:
      "This report is for guidance purposes and does not constitute legal advice. The information is based on your inputs and the regulations applicable at the time of generation.",
    branding: "eu-compliance-hub.eu",
    page: "Page 1",
  },

  /* ── Table of Contents ── */
  toc: {
    title: "Table of Contents",
    subtitle: "Overview of all sections of your compliance report",
    methodologyTitle: "Methodology",
    methodologyText:
      "This report is based on the EU Compliance Hub Assessment Framework. The assessment considers your company details, official EU regulation texts, and national transposition laws. All fine data reflects statutory maximum limits. Actual penalties vary by member state and individual case.",
    reportNr: "Report No.",
  },

  /* ── Executive Summary ── */
  exec: {
    title: "At a Glance",
    subtitle: "Executive Summary \u2014 Your compliance situation at a glance",
    cumulativeFineRisk: "Cumulative Fine Risk",
    upTo: "up to",
    basedOnRegs:
      "Based on {{count}} relevant regulations and your estimated annual revenue",
    maturityLabel: "Maturity",
    regulationsLabel: "Regulations",
    highMedLow: "{{high}} high, {{medium}} medium, {{low}} low",
    costEstLabel: "Cost (est.)",
    implementationCosts: "Implementation costs",
    nextDeadlineLabel: "Next Deadline",
    noUrgent: "None urgent",
    regOverview: "Regulation Overview ({{count}} evaluated)",
    criticalRisks: "Critical Risks",
    fineUpTo: "Fine up to {{amount}}",
    priorityActions: "Priority Actions",
    relevanceHigh: "High",
    relevanceMedium: "Medium",
    relevanceLow: "Low",
    riskLevelCritical: "Critical",
    riskLevelHigh: "High",
    riskLevelMedium: "Medium",
  },

  /* ── Company Profile ── */
  profile: {
    title: "Company Profile & Assessment Scope",
    subtitle: "Basis of your personalised compliance assessment",
    companyLabel: "Company",
    contactLabel: "Contact Person",
    sizeLabel: "Company Size",
    revenueLabel: "Annual Revenue (approx.)",
    industryLabel: "Industry",
    countryLabel: "Country",
    sectorsTitle: "Industries & Sectors",
    activitiesTitle: "Activities & Operations",
    dataTypesTitle: "Processed Data Types",
    regulationsEvaluated: "Regulations\nevaluated",
    highRelevance: "High\nRelevance",
    mediumRelevance: "Medium\nRelevance",
    lowRelevance: "Low\nRelevance",
    methodologyNote:
      "Based on the EU Compliance Hub Assessment Framework. The relevance assessment considers company size, industry, data processing, and specific business activities in accordance with the official scope of EU regulations.",
    sizeLabels: {
      micro: "Micro enterprise (< 10 employees)",
      small: "Small enterprise (10\u201349 employees)",
      medium: "Medium enterprise (50\u2013249 employees)",
      large: "Large enterprise (250+ employees)",
    },
    sectorLabels: {
      it: "IT / Software / Cloud",
      finance: "Financial Services / Insurance",
      health: "Healthcare / Pharma",
      energy: "Energy / Utilities",
      manufacturing: "Manufacturing / Industry",
      transport: "Transport / Logistics",
      retail: "Retail / E-Commerce",
      telecom: "Telecommunications",
      public: "Public Sector",
      other: "Other Industry",
    },
    activityLabels: {
      ai: "AI Systems",
      software: "Digital Products",
      "critical-infra": "Critical Infrastructure",
      "online-platform": "Online Platform",
      esg: "ESG Reporting",
      crypto: "Crypto Assets",
      "cross-border": "Cross-border",
      ecommerce: "E-Commerce",
      eid: "eID / Trust Services",
    },
    dataLabels: {
      personal: "Personal Data",
      sensitive: "Special Categories",
      children: "Children's Data",
      financial: "Financial Data",
      b2b: "B2B Data",
      iot: "IoT / Sensor Data",
    },
    revenueLabels: {
      "< 2M": "< 2M EUR",
      "2-10M": "2\u201310M EUR",
      "10-50M": "10\u201350M EUR",
      "> 50M": "> 50M EUR",
    },
  },

  /* ── Risk Exposure ── */
  risk: {
    title: "Risk Exposure & Fine Risk",
    subtitle:
      "Maximum fine risks based on your estimated annual revenue",
    cumulativeFineRisk: "Cumulative Fine Risk",
    roiLabel: "ROI: Compliance Investment",
    roiValue: "{{multiple}}x Risk Reduction",
    complianceInvestment: "Compliance Investment",
    complianceInvestmentDesc:
      "Estimated implementation costs for all relevant regulations",
    fineRisk: "Fine Risk",
    fineRiskDesc: "Cumulative maximum penalties for non-compliance",
    disclaimer:
      "Maximum penalties per EU regulation texts. For regulations with the \"whichever is higher\" rule, calculations are based on an estimated annual revenue of {{revenue}}. Actual sanctions vary by member state, severity of infringement, and level of cooperation.",
    billion: "bn",
    million: "m",
    calcPercent: "{{percent}}% of annual revenue ({{amount}})",
    calcFixed: "Fixed amount: {{amount}}",
    calcUpTo: "Up to {{amount}}",
    calcUpToPercent: "Up to {{percent}}% of annual revenue",
  },

  /* ── Regulation Section ── */
  regulation: {
    analysisTitle: "Regulation Analysis",
    analysisSubtitle:
      "Detailed assessment of your relevant EU regulations",
    countryFocus: "Country focus: {{country}}",
    whyRelevant: "Why relevant",
    fineLabel: "Fine: ",
    checklistTitle: "Compliance Checklist",
    checklistStatus: "({{compliant}} compliant, {{partial}} partial)",
    deadlineLabel: "Deadline: ",
    authorityLabel: "Authority: ",
    nationalLawLabel: "National Law: ",
    nationalFinesLabel: "Fines: ",
    guideLabel: "Detailed guide: ",
    legendCompliant: "Compliant",
    legendPartial: "Partial",
    legendOpen: "Open",
    relevanceHighLabel: "High Relevance",
    relevanceMediumLabel: "Medium Relevance",
    relevanceLowLabel: "Low Relevance",
    priorityImmediate: "Immediate",
    priorityShortTerm: "Short-term",
    priorityMediumTerm: "Medium-term",
  },

  /* ── Maturity Assessment ── */
  maturity: {
    title: "Maturity Assessment",
    subtitle: "Your company's compliance maturity level",
    categoryTitle: "Assessment by Category",
    points: "{{score}} / {{max}} Points",
    scaleTitle: "Rating Scale",
    gradeLabels: [
      { letter: "A", label: "80\u2013100% Exemplary" },
      { letter: "B", label: "60\u201379% Advanced" },
      { letter: "C", label: "40\u201359% Basic" },
      { letter: "D", label: "20\u201339% Beginner" },
      { letter: "E", label: "0\u201319% Critical" },
    ],
    gradeLetterLabels: {
      A: "A \u2013 Exemplary",
      B: "B \u2013 Advanced",
      C: "C \u2013 Basic",
      D: "D \u2013 Beginner",
      E: "E \u2013 Critical",
    },
    categoryLabels: {
      governance: "Governance & Organisation",
      datenschutz: "Data Protection (GDPR)",
      cybersecurity: "Cybersecurity (NIS2/CRA)",
      "ki-compliance": "AI & Technology (AI Act)",
      reporting: "Reporting & Documentation",
    },
    gradeExcellent:
      "Your company demonstrates exemplary compliance maturity. The foundations for {{regulations}} are solidly implemented. Focus on continuous improvement and regular audits.",
    gradeGood:
      "Good progress in compliance implementation. Essential structures for {{regulations}} are already in place. {{weakAreas}}",
    gradeBasic:
      "Basic compliance structures exist, but significant gaps remain for {{regulations}}. {{weakAreas}} The fine risk is elevated at this maturity level.",
    gradeBeginner:
      "Your compliance maturity shows considerable need for improvement. Key measures for {{regulations}} are missing. {{weakAreas}} Immediate action is strongly recommended to minimise fines and liability risks.",
    gradeCritical:
      "Critical action required: Your company has barely implemented any compliance measures for {{regulations}}. The risk of fines and personal liability for management is very high. Immediate professional advice is strongly recommended.",
    recoGoodTitle: "Recommendation: Continuous Improvement",
    recoGoodText:
      "Establish regular compliance reviews (quarterly) and keep your documentation up to date. Systematically train new employees and monitor regulatory changes.",
    recoBasicTitle: "Recommendation: Structured Build-up",
    recoBasicText:
      "Define clear compliance responsibilities and create a 3-month plan. Start with the highest-relevance regulations and close the biggest gaps first.",
    recoCriticalTitle: "Recommendation: Immediate Action Required",
    recoCriticalText:
      "At this maturity level, there is an acute risk of penalties. Appoint a compliance officer immediately, commission a professional gap analysis, and prioritise regulations with the highest fine risk.",
  },

  /* ── Cost Estimation ── */
  cost: {
    title: "Cost Estimation",
    subtitle: "Estimated implementation costs \u2014 {{sizeLabel}}",
    totalCosts: "Estimated Total Costs",
    regulationsCount: "{{count}} Regulations",
    exclSynergies: "excl. synergies",
    complianceInvestment: "Compliance Investment",
    avgCostsLabel: "Average implementation costs",
    fineRisk: "Fine Risk",
    cumulativeFines: "Cumulative maximum penalties",
    fineRiskIs: "Fine risk is",
    timesHigher: "higher than the compliance investment",
    clearBusinessCase: "Clear Business Case",
    synergiesTitle: "Synergy Effects",
    sizeLabels: {
      micro: "Micro Enterprise",
      small: "Small Enterprise",
      medium: "Medium Enterprise",
      large: "Large Enterprise",
    },
    breakdownItems: {
      /* GDPR */
      "dsgvo-0": "Records of Processing & Gap Analysis",
      "dsgvo-1": "Privacy Policy & Contracts",
      "dsgvo-2": "TOM Implementation",
      "dsgvo-3": "Training & Awareness",
      "dsgvo-4": "Data Protection Officer (external, annual)",
      /* NIS2 */
      "nis2-0": "Risk Management & Gap Analysis",
      "nis2-1": "ISMS Setup / ISO 27001",
      "nis2-2": "Incident Response Processes",
      "nis2-3": "Supply Chain Security",
      "nis2-4": "Management Training & Governance",
      "nis2-5": "Technical Measures (Monitoring, SIEM)",
      /* AI Act */
      "ai-act-0": "AI Inventory & Risk Assessment",
      "ai-act-1": "Conformity Documentation",
      "ai-act-2": "Bias Testing & Monitoring",
      "ai-act-3": "Transparency Measures",
      "ai-act-4": "Training (AI Literacy)",
      /* DORA */
      "dora-0": "ICT Risk Management Framework",
      "dora-1": "Incident Reporting System",
      "dora-2": "Resilience Testing (TLPT)",
      "dora-3": "Third-Party Risk Management",
      "dora-4": "Information Sharing Framework",
      /* CRA */
      "cra-0": "Security-by-Design Review",
      "cra-1": "Vulnerability Management (SBOM)",
      "cra-2": "Conformity Assessment",
      "cra-3": "Security Update Processes (5 years)",
      "cra-4": "Documentation & CE Marking",
      /* CSRD */
      "csrd-0": "Materiality Analysis (Double Materiality)",
      "csrd-1": "ESG Data Collection & KPIs",
      "csrd-2": "ESRS-compliant Report",
      "csrd-3": "Audit by External Auditor",
      "csrd-4": "Software & Tools",
    },
  },

  /* ── Deadline Timeline ── */
  deadlines: {
    title: "Your Deadline Overview",
    subtitle: "Relevant EU regulation deadlines for your company",
    noDeadlines: "No relevant deadlines identified.",
    today: "TODAY",
    daysPassed: "{{days}} days ago",
    todayLabel: "Today",
    inDays: "in {{days}} days",
    titles: {
      "DSA-2024-02-17": "DSA Fully in Force",
      "MiCA-2024-12-30": "MiCA Fully in Force",
      "DORA-2025-01-17": "DORA in Force",
      "CSRD-2025-01-01": "CSRD Wave 2",
      "AI Act-2025-02-02": "AI Act Prohibitions",
      "BaFG-2025-06-28": "Accessibility Act in Force",
      "AI Act-2025-08-02": "AI Act GPAI",
      "Data Act-2025-09-12": "Data Act in Force",
      "DORA-2026-03-13": "DORA ICT Register",
      "CSRD-2026-01-01": "NaBeG AT Phase 1",
      "eIDAS-2026-05-20": "eIDAS 2.0 Wallet",
      "AI Act-2026-08-02": "AI Act High-Risk",
      "CRA-2026-09-11": "CRA Phase 1",
      "NISG-2026-10-01": "NIS2 Transposition",
      "NISG-2026-12-31": "NIS2 Registration",
      "EHDS-2027-03-26": "EHDS Primary Use",
      "Green Claims-2027-03-27": "Green Claims Transposition",
      "CSRD-2027-01-01": "CSRD Wave 3",
      "DPP-2027-06-01": "DPP Batteries",
      "AI Act-2027-08-02": "AI Act Annex I",
      "PLD-2027-12-09": "PLD Transposition",
      "CRA-2027-12-11": "CRA Phase 2",
      "HSchG-2028-01-01": "Whistleblower Evaluation",
      "CSRD-2029-01-01": "CSRD Wave 4",
      "DPP-2030-01-01": "DPP Textiles & Electronics",
    },
    descs: {
      "DSA-2024-02-17": "All intermediary services must comply with DSA obligations.",
      "MiCA-2024-12-30": "All obligations for CASPs and token issuers apply.",
      "DORA-2025-01-17": "Fully applicable to all financial institutions.",
      "CSRD-2025-01-01": "Large companies (>250 employees) report for the first time.",
      "AI Act-2025-02-02": "Prohibited AI practices come into effect.",
      "BaFG-2025-06-28": "Accessibility obligation for digital products & services.",
      "AI Act-2025-08-02": "GPAI obligations and governance rules apply.",
      "Data Act-2025-09-12": "IoT data access, cloud switching and B2B data rules apply.",
      "DORA-2026-03-13": "Information register to be submitted to FMA.",
      "CSRD-2026-01-01": "Large PIE companies report under ESRS in Austria.",
      "eIDAS-2026-05-20": "EU Digital Identity Wallets must be available.",
      "AI Act-2026-08-02": "Full obligations for high-risk AI systems.",
      "CRA-2026-09-11": "Reporting obligations 24h/72h to ENISA.",
      "NISG-2026-10-01": "All obligations for affected entities.",
      "NISG-2026-12-31": "Registration with BSC mandatory.",
      "EHDS-2027-03-26": "Patient rights and access to personal health data.",
      "Green Claims-2027-03-27": "National transposition of the Anti-Greenwashing Directive.",
      "CSRD-2027-01-01": "Listed SMEs report for the first time under ESRS.",
      "DPP-2027-06-01": "Digital Product Passport for batteries mandatory.",
      "AI Act-2027-08-02": "Remaining high-risk systems (medical devices etc.) regulated.",
      "PLD-2027-12-09": "National transposition of the new Product Liability Directive.",
      "CRA-2027-12-11": "CE marking becomes mandatory.",
      "HSchG-2028-01-01": "Evaluation of whistleblower protection measures.",
      "CSRD-2029-01-01": "Non-EU companies (>EUR 150M EU revenue) report.",
      "DPP-2030-01-01": "Product passport for textiles and electronics mandatory.",
    },
  },

  /* ── Action Roadmap ── */
  roadmap: {
    title: "Action Plan",
    subtitle:
      "Prioritised 3-phase plan for your compliance implementation",
    phase1Label: "Phase 1",
    phase1Time: "Immediate (0\u201330 days)",
    phase2Label: "Phase 2",
    phase2Time: "Short-term (1\u20133 months)",
    phase3Label: "Phase 3",
    phase3Time: "Medium-term (3\u20136 months)",
    effortLabel: "Effort: ",
    effortLow: "Low",
    effortMedium: "Medium",
    effortHigh: "High",
    quickWinsTitle: "Quick Wins",
    quickWinsText:
      "Start with a gap analysis of the most important regulations. Many measures (e.g. training, documentation, risk analyses) apply across regulations and generate synergy effects of 20\u201340% cost savings.",
  },

  /* ── Software Recommendations ── */
  software: {
    title: "Recommended Tools & Software",
    subtitle:
      "Selected solutions for your relevant regulations \u2014 sorted by DACH relevance",
    dachFocus: "DACH Focus",
    dachPresent: "DACH Present",
    international: "International",
    disclaimerText:
      "All recommendations are independent and editorially selected. Prices are indicative and may vary depending on company size and configuration. Detailed comparisons are available on our website.",
    disclaimerUrl: "eu-compliance-hub.eu/tools",
  },

  /* ── Next Steps ── */
  nextSteps: {
    title: "Next Steps",
    subtitle: "Recommended actions for your compliance implementation",
    guidesTitle: "Your relevant guides",
    ctaTitle: "We support you",
    ctaText:
      "Use our free interactive tools for in-depth analysis. Subscribe to our compliance briefing for the latest regulatory updates.",
    ctaToolsLabel: "All Tools",
    ctaNewsletterLabel: "Newsletter",
    ctaContactLabel: "Contact",
    branding:
      "EU Compliance Hub \u2014 Your navigator through the EU regulatory landscape",
  },

  /* ── Shared Footer ── */
  footer: {
    siteName: "EU Compliance Hub | eu-compliance-hub.eu",
    pageOf: "Page {{page}} of {{total}}",
    generatedAt: "Generated on {{date}} \u2014 Not legal advice",
  },

  /* ── TOC Section Names ── */
  tocSections: {
    executiveSummary: "Executive Summary",
    executiveSummaryDesc: "Your compliance situation at a glance",
    companyProfile: "Company Profile",
    companyProfileDesc: "Assessment basis and company context",
    riskExposure: "Risk Exposure",
    riskExposureDesc: "Fine risk and financial impact",
    regulationAnalysis: "Regulation Analysis",
    regulationAnalysisDesc:
      "Detailed assessment of {{count}} relevant regulations",
    maturityAssessment: "Maturity Assessment",
    maturityAssessmentDesc: "Compliance maturity by category",
    costEstimation: "Cost Estimation",
    costEstimationDesc: "Estimated implementation costs and ROI",
    deadlineOverview: "Deadline Overview",
    deadlineOverviewDesc:
      "Chronological overview of all relevant deadlines",
    actionPlan: "Action Plan",
    actionPlanDesc: "3-phase roadmap for compliance implementation",
    softwareRecs: "Software Recommendations",
    softwareRecsDesc: "Tools and solutions for your regulations",
    nextSteps: "Next Steps",
    nextStepsDesc: "Recommended actions and further resources",
  },

  /* ── Report Engine Strings ── */
  engine: {
    appointComplianceOfficer:
      "Appoint a compliance officer and establish a steering committee",
    deadlineUrgent:
      "{{title}}: Deadline in {{days}} days \u2014 initiate immediate action",
    gapAnalysis:
      "Conduct gap analysis and inventory for {{name}}",
    coreImplementation:
      "Implement core {{name}} compliance measures",
    trainingProgram:
      "Establish training programme for employees and management",
    assessAndPlan:
      "Assess {{name}} requirements and plan prioritised implementation",
    establishReviews:
      "Establish regular compliance reviews and audit cycles",
    roleManagement: "Management",
    roleComplianceTeam: "Compliance Team",
    roleDeptIT: "Department + IT",
    roleHRCompliance: "HR / Compliance",
    phaseImmediate: "Immediate (0\u201330 days)",
    phaseShortTerm: "Short-term (1\u20133 months)",
    phaseMediumTerm: "Medium-term (3\u20136 months)",
    governanceLabel: "Governance",
    trainingLabel: "Training",
    auditLabel: "Audit",
    defineResponsibilities:
      "Define compliance responsibilities at management level and allocate budget",
    deadlinePriority:
      "{{title}} is highest priority \u2014 deadline in {{days}} days",
    immediateMeasures: "Initiate immediate measures for {{names}}",
    minimizeFineRisk:
      "Minimise fine risk of up to {{amount}} through proactive compliance",
    planBudget: "Allocate compliance budget of {{range}}",
    establishRegularReviews:
      "Establish regular compliance reviews and maintain documentation",
    synergyBasic:
      "Implementing multiple regulations simultaneously can save 20\u201340% of costs through synergies.",
    synergyTemplate:
      "Implementing {{examples}} simultaneously can save 20\u201340% of costs through synergies. Shared measures: {{measures}}.",
    synergyISMS: "ISMS setup (NIS2 + DORA)",
    synergyRisk: "Risk management framework",
    synergySecurity: "Security-by-design processes",
    synergySustainability: "Sustainability governance",
    synergyDefault: "Governance structures and training",
  },

  /* ── Regulation Names ── */
  regNames: {
    dsgvo: "GDPR",
    nis2: "NIS2",
    "ai-act": "EU AI Act",
    dora: "DORA",
    cra: "Cyber Resilience Act",
    csrd: "CSRD / ESG",
    dsa: "Digital Services Act",
    mica: "MiCA",
    "data-act": "Data Act",
    eprivacy: "ePrivacy",
    eidas: "eIDAS 2.0",
    produkthaftung: "EU Product Liability",
    ehds: "EHDS",
  },

  checklistItems: {
    /* NIS2 */
    "nis2-1": "Impact assessment completed (sector, size, revenue)",
    "nis2-2": "Risk management framework implemented",
    "nis2-3": "Incident response plan created (72h reporting deadline)",
    "nis2-4": "Business Continuity Management (BCM) established",
    "nis2-5": "Supply chain security assessed",
    "nis2-6": "Management trained on cybersecurity (liability!)",
    "nis2-7": "Technical measures: MFA, encryption, network segmentation",
    "nis2-8": "Reporting obligations and authority contacts defined",
    /* GDPR */
    "dsgvo-1": "Records of processing activities (Art. 30) current and complete",
    "dsgvo-2": "Data Protection Impact Assessment (DPIA) for high-risk processing",
    "dsgvo-3": "Data processing agreements (DPA) with all service providers",
    "dsgvo-4": "Consent management (cookie banner, opt-in) legally compliant",
    "dsgvo-5": "Privacy policy current and complete",
    "dsgvo-6": "Data subject rights process implemented (access, deletion)",
    "dsgvo-7": "Technical and organizational measures (TOMs) documented",
    "dsgvo-8": "Data breach notification (72h) prepared",
    /* AI Act */
    "ai-1": "AI systems inventoried and risk class determined",
    "ai-2": "Prohibited AI practices excluded (social scoring etc.)",
    "ai-3": "High-risk systems with conformity assessment",
    "ai-4": "Transparency obligations for chatbots/deepfakes implemented",
    "ai-5": "AI literacy for employees ensured",
    "ai-6": "Documentation obligations and technical documentation created",
    "ai-7": "Human oversight for AI decisions ensured",
    /* DORA */
    "dora-1": "ICT risk management framework established",
    "dora-2": "ICT incident reporting to supervisory authority prepared",
    "dora-3": "Threat-Led Penetration Testing (TLPT) planned",
    "dora-4": "Third-party ICT risk management implemented",
    "dora-5": "Register of critical ICT service providers maintained",
    "dora-6": "Business continuity and disaster recovery plans tested",
    /* CRA */
    "cra-1": "Products with digital elements identified",
    "cra-2": "Security-by-design integrated into development process",
    "cra-3": "Vulnerability management process established",
    "cra-4": "Software Bill of Materials (SBOM) created",
    "cra-5": "Security updates planned for the support period",
    "cra-6": "Conformity assessment for product category prepared",
    /* CSRD */
    "csrd-1": "Applicability by company size verified",
    "csrd-2": "Double materiality analysis completed",
    "csrd-3": "ESRS data points identified and collected",
    "csrd-4": "ESG data collection processes set up",
    "csrd-5": "Auditor for sustainability report selected",
    "csrd-6": "Taxonomy alignment of economic activities verified",
  },

  regSubtitles: {
    dsgvo: "General Data Protection Regulation",
    nis2: "Network and Information Security",
    "ai-act": "AI Regulation",
    dora: "Digital Operational Resilience Act",
    cra: "Cybersecurity for Products",
    csrd: "Sustainability Reporting",
    dsa: "Platform Regulation",
    mica: "Markets in Crypto-Assets",
    "data-act": "Data Access Regulation",
    eprivacy: "Privacy in Electronic Communications",
    eidas: "Electronic Identification",
    produkthaftung: "New Product Liability Directive",
    ehds: "European Health Data Space",
  },

  eval: {
    essentialEntity: "essential entity",
    importantEntity: "important entity",

    dsgvoBase: "As a {{sizeLabel}}, you process {{dataTypes}} with EU scope.",
    dsgvoSensitive: "Processing special categories of data triggers enhanced obligations (Art. 9 GDPR), particularly Data Protection Impact Assessments.",
    dsgvoStandard: "This includes obligations for records of processing activities (Art. 30), data subject rights (Art. 15\u201322), and Data Protection Impact Assessments for high-risk processing.",

    nis2CriticalInfra: "As a critical infrastructure operator, you qualify as an \u201cessential entity\u201d under NIS2 Art. 3, subject to the strictest obligations.",
    nis2SectorSize: "As a {{sizeLabel}} in the {{sectors}} sector, you qualify as a \u201c{{category}}\u201d under NIS2 Art. 3.",
    nis2Suffix: "This includes risk management (Art. 21), incident reporting within 24h/72h (Art. 23), and personal responsibility of management (Art. 20).",
    nis2BelowThreshold: "Your sector {{sectors}} falls under NIS2, but as a {{sizeLabel}} you are below the size thresholds (50 employees / \u20ac10M revenue). Monitor national transposition laws \u2014 some member states may set lower thresholds.",

    aiActBase: "As a {{sizeLabel}}, you deploy or develop AI systems. The EU AI Act requires risk classification of all AI systems and classifies certain applications as high-risk.",
    aiActSensitive: "Processing sensitive data likely triggers enhanced transparency and documentation obligations.",
    aiActBanned: "Prohibited AI practices (Art. 5) have been in effect since February 2025.",

    doraDirect: "As a {{sizeLabel}} in the financial sector, you fall directly under DORA. You must establish an ICT risk management framework (Art. 6\u201316), report incidents to supervisory authorities (Art. 17\u201323), and conduct threat-led penetration testing.",
    doraProvider: "As an IT service provider with access to financial data, you may qualify as a \u201ccritical ICT third-party provider\u201d under Art. 31 DORA. This entails direct oversight by European financial authorities and strict contractual requirements.",

    craBase: "As a manufacturer of products with digital elements, you fall under the Cyber Resilience Act. You must implement security-by-design (Art. 10), maintain a SBOM (Software Bill of Materials), and provide security updates throughout the entire support period.",
    craManufacturing: "As a manufacturing company, additional requirements for connected production systems apply.",

    csrdDirect: "As a {{sizeLabel}} in the EU, you are required to report on sustainability under CSRD using ESRS standards. This includes a double materiality analysis, Scope 1/2/3 emissions, and external assurance by auditors.",
    csrdIndirect: "Through your ESG/sustainability activities as a {{sizeLabel}}, CSRD reporting may become relevant through the supply chain or voluntarily. From 2026, listed SMEs are also affected.",

    dsaReason: "As an operator of an online platform or marketplace, you fall under the DSA. Obligations include transparency reports (Art. 15), a notice-and-action system for illegal content (Art. 16), complaint procedures (Art. 20), and a ban on dark patterns (Art. 25).",

    micaReason: "As a {{sizeLabel}} in the crypto-assets/blockchain sector, you must apply for authorization as a CASP (Crypto-Asset Service Provider) under MiCA, meet AML/KYC requirements, and implement the Travel Rule. Whitepapers for token issuances require approval.",

    dataActIoT: "You process IoT/sensor data and must grant users access to generated data under the Data Act (Art. 3\u20137). This includes standardized data formats, fair contractual terms, and the right to share data with third parties.",
    dataActManufacturer: "As a product manufacturer in the {{sectors}} sector, data access obligations under the Data Act may apply, particularly if your products generate usage data.",

    eprivacyDirect: "As an e-commerce business, ePrivacy obligations regarding cookies, tracking, and electronic direct marketing apply to you. A legally compliant consent management system (cookie banner with opt-in) is mandatory.",
    eprivacyIndirect: "The ePrivacy rules on cookies and tracking also apply to your website. A GDPR-compliant cookie banner with genuine opt-in is required.",

    eidasDirect: "As a provider of electronic identification or trust services, you must meet eIDAS 2.0 requirements, including EU Digital Identity Wallet compatibility and qualified electronic signatures.",
    eidasPublic: "In the public sector, the EU Digital Identity Wallet will be mandatory from 2026. Prepare your systems for eIDAS 2.0-compliant identification.",

    produkthaftungReason: "The revised EU Product Liability Directive now extends to software and AI systems as standalone products. As a {{sizeLabel}} in the {{sectors}} sector, you bear strict liability for defective products \u2014 reversed burden of proof strengthens consumer protection.",

    ehdsReason: "As a {{sizeLabel}} in the healthcare sector, the European Health Data Space (EHDS) becomes relevant. Primary use (patient portability) and secondary use (research access) require interoperable systems and FHIR-compatible data formats.",
  },
};

export default en;
