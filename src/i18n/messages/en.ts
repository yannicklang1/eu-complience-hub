/* ─────────────────── English UI Messages ─────────────────── */

import type { Messages } from "./de";

const en: Messages = {
  /* ── Meta ── */
  meta: {
    siteName: "EU Compliance Hub",
    siteDescription: "European Regulations. Clearly Explained.",
    tagline: "We translate Brussels legislation into concrete action steps — for SMEs, startups and enterprises.",
  },

  /* ── Navigation ── */
  nav: {
    regulations: "Regulations",
    tools: "Tools",
    industries: "Industries",
    knowledge: "Knowledge",
    news: "News",
    briefing: "Compliance Briefing",
    report: "Compliance Report",
    reportCreate: "Create Compliance Report",
    allTools: "All Tools",
    contact: "Contact",
    faq: "FAQ",
    aboutUs: "About Us",
    mobile: {
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    groups: {
      coreRegulations: "Core Regulations",
      dataProtection: "Data Protection & Compliance",
      moreRegulations: "More Regulations",
      digitalData: "Digital & Data",
      interactiveTools: "Interactive Tools",
      directoriesRadar: "Directories & Radar",
    },
  },

  /* ── Guide Page Layout ── */
  guide: {
    lastReview: "Last reviewed:",
    officialSources: "official sources",
    factChecked: "Fact-checked",
    quickFacts: "Quick Facts",
    disclaimer: "Not legal advice. All information without warranty.",
    more: "More",
    toc: "Contents",
  },

  /* ── Guide CTA ── */
  cta: {
    getBriefing: "Get Compliance Briefing",
    frequency: "Only for critical deadlines and regulatory changes. Max. 3×/month.",
    gdprNotice: "GDPR-compliant. Cancel anytime. No spam.",
    tools: "Compliance Tools",
    toolsDesc: "8 free tools",
    comparison: "Regulation Comparison",
    comparisonDesc: "Compare side by side",
    faq: "Frequently Asked Questions",
    faqDesc: "20+ answers",
    report: "Compliance Report",
    reportDesc: "Free analysis for your company",
  },

  /* ── Forms ── */
  form: {
    emailPlaceholder: "your@company.com",
    emailAriaLabel: "Email address for Compliance Briefing",
    subscribe: "Subscribe",
    submitBriefing: "Activate Briefing",
    sending: "Sending…",
    invalidEmail: "Please enter a valid email address.",
    confirmEmail: "Almost done! Please confirm your email address.",
    success: "Almost done!",
    error: "An error occurred.",
    connectionError: "Connection error. Please try again later.",
    disclaimer: "Only for critical deadlines and regulatory changes. Max. 3×/month. Cancel anytime. GDPR-compliant. *Occasionally you will also receive recommendations for verified compliance tools (marked as advertisement).",
  },

  /* ── Social Share ── */
  share: {
    label: "Share Guide",
    sublabel: "Share this guide with colleagues and decision-makers",
    copyLink: "Copy link",
    copied: "Copied!",
    linkedin: "LinkedIn",
    twitter: "X / Twitter",
    email: "Email",
    emailBody: "Check out this compliance guide:",
  },

  /* ── Breadcrumbs ── */
  breadcrumb: {
    home: "Home",
    ariaLabel: "Breadcrumb",
  },

  /* ── Cookie Consent ── */
  cookies: {
    title: "Privacy Settings",
    description: "We use cookies and similar technologies to provide you with the best possible experience. For more information, see our",
    privacyLink: "Privacy Policy",
    necessary: "Necessary",
    necessaryDesc: "Website operation. Cannot be disabled.",
    analytics: "Analytics",
    analyticsDesc: "Anonymous usage statistics to improve the website.",
    analyticsAriaLabel: "Analytics cookies",
    marketing: "Marketing",
    marketingDesc: "Personalized advertising and ads.",
    marketingAriaLabel: "Marketing cookies",
    save: "Save selection",
    necessaryOnly: "Necessary only",
    settings: "Settings",
    acceptAll: "Accept all",
  },

  /* ── Footer ── */
  footer: {
    description: "European Regulations. Clearly Explained. We translate Brussels legislation into concrete action steps — for SMEs, startups and enterprises.",
    regulations: "Regulations",
    tools: "Tools",
    aboutUs: "About Us",
    news: "News",
    faq: "FAQ",
    report: "Compliance Report",
    impressum: "Legal Notice",
    privacy: "Privacy Policy",
    disclaimerLink: "Disclaimer",
    cookieSettings: "Cookie Settings",
    legalDisclaimer: "EU Compliance Hub is an independent information portal and is not affiliated with any institutions of the European Union or the Council of Europe. All content is for general information purposes only and does not constitute legal advice. \u201CEU\u201D is used descriptively for the subject area of European regulations.",
    copyright: "EU Compliance Hub. Not legal advice. All information without warranty.",
  },

  /* ── Accessibility ── */
  a11y: {
    mainNav: "Main navigation",
    contentInfo: "Footer",
    backToTop: "Scroll to top",
    skipToContent: "Skip to main content",
  },

  /* ── Search / Command Palette ── */
  search: {
    placeholder: "Search…",
    hint: "Cmd+K to search",
    noResults: "No results",
    categories: {
      regulations: "Regulations",
      tools: "Tools",
      knowledge: "Knowledge",
      legal: "Legal",
    },
  },

  /* ── Country Picker ── */
  country: {
    title: "Select your country",
    subtitle: "We will show you country-specific compliance information",
    confirm: "Confirm",
    change: "Change country",
    detected: "Detected:",
  },

  /* ── Common ── */
  common: {
    readMore: "Read more",
    learnMore: "Learn more",
    download: "Download",
    close: "Close",
    back: "Back",
    next: "Next",
    yes: "Yes",
    no: "No",
    loading: "Loading…",
    error: "Error",
    retry: "Try again",
  },

  /* ── Homepage ── */
  home: {
    /* Hero */
    hero: {
      title1: "European",
      title2: "Compliance.",
      title3: "Finally clear.",
      subtitle: "18 regulations — from NIS2 to AI Act to eIDAS — that directly affect your business. We translate EU Official Journal into concrete checklists, clear deadlines and real solutions.",
      ctaPrimary: "View all regulations",
      ctaSecondary: "Check liability",
    scroll: "Scroll",
    },
    /* Countdown */
    countdown: {
      inForce: "In force",
      daysUntil: "days until",
    },
    /* Ticker */
    ticker: [
      "NIS2 2026 effective from 1 October 2026",
      "EU AI Act: Full obligations from 2 August 2026",
      "DORA: In force since 17 January 2025",
      "CRA Phase 1: Reporting obligations from September 2026",
      "CSRD/ESG: Sustainability reports from 2026 in AT",
      "EAA: Accessibility obligations since 28 June 2025",
      "Whistleblower Protection: From 50 employees",
      "Green Claims: \"Climate neutral\" without proof soon illegal",
      "MiCA: Crypto licenses mandatory since December 2024",
      "DPP: Digital Product Passport from 2027 for batteries",
      "PLD: Software liable as product from December 2027",
      "DSA: Platform regulation for all intermediary services",
      "Data Act: IoT data access & cloud switching from September 2025",
      "eIDAS 2.0: EU Digital Identity Wallet from May 2026",
      "EHDS: European Health Data Space from 2027",
      "ePrivacy: Cookie consent and tracking rules",
      "~4,000 AT companies affected by NIS2",
      "NIS2 fines: up to €10M or 2% revenue",
      "AI Act fines: up to €35M or 7% revenue",
    ],
    /* Stats */
    stats: {
      regulations: "Regulations",
      maxFine: "max. AI Act fine",
      countries: "Countries",
      countryLabel: "EU-wide affected",
      complianceYear: "the compliance year",
      inOverview: "at a glance",
    },
    /* Regulation Pillars */
    pillars: {
      sectionLabel: "Core Pillars",
      title1: "What",
      title2: "affects you.",
      subtitle: "Four regulations. Clear deadlines. Real fines. Here you'll find everything you need to know now.",
      filterAll: "Show all",
      filterLive: "Already active",
      filterUpcoming: "Coming soon",
      maxPenalty: "Max. Penalty",
      affects: "Affects",
    },
    /* Pillar data — translatable fields */
    pillarData: {
      nisg: {
        fullName: "Network and Information Security Act 2026",
        tagline: "Austria's NIS2 implementation",
        statusLabel: "From 1 Oct 2026",
        affected: "~4,000 AT companies",
        keyFacts: ["Registration by 31 Dec 2026", "Self-declaration by 31 Dec 2027", "Federal Cybersecurity Agency", "BGBl. I No. 94/2025"],
      },
      aiact: {
        fullName: "EU Artificial Intelligence Act",
        tagline: "AI regulation for Europe",
        statusLabel: "From 2 Aug 2026",
        affected: "All AI developers & users",
        keyFacts: ["High-risk AI: Employment, Credit", "Prohibited AI systems: immediately", "EU AI Office as supervisor", "Digital Omnibus: possible delay"],
      },
      dora: {
        fullName: "Digital Operational Resilience Act",
        tagline: "Resilience in the financial sector",
        statusLabel: "Since 17 Jan 2025",
        affected: "Financial institutions & ICT providers",
        keyFacts: ["ICT Register: 13 March 2026", "TLPT test cycles running", "FMA as supervisor (AT)", "Applies to 20+ financial entities"],
      },
      cra: {
        fullName: "Cyber Resilience Act",
        tagline: "Security of digital products",
        statusLabel: "Phase 1: Sep 2026",
        affected: "Manufacturers of digital products",
        keyFacts: ["Phase 1: Reporting Sep 2026", "Phase 2: CE marking Dec 2027", "24h vulnerability reporting", "Security-by-Design obligation"],
      },
    },
    /* Secondary regulations */
    secondary: {
      sectionLabel: "More EU Regulations",
      title1: "Data protection, ESG, platforms, data &",
      title2: "more.",
      subtitle: "From data protection to sustainability to digital identity — thirteen more EU regulations that affect your business.",
      readGuide: "Read guide",
      regulations: {
        dsgvo: { tagline: "Data protection in the AI era", badge: "Update 2026" },
        csrd: { tagline: "Sustainability reports", badge: "NaBeG from 2026" },
        bafg: { tagline: "Digital accessibility", badge: "In force" },
        hschg: { tagline: "Whistleblower protection", badge: "In force" },
        greenClaims: { tagline: "Anti-greenwashing", badge: "From 2027" },
        mica: { tagline: "Crypto asset regulation", badge: "In force" },
        dpp: { tagline: "Digital Product Passport", badge: "From 2027" },
        pld: { tagline: "Software product liability", badge: "From 2027" },
        dsa: { tagline: "Platform regulation", badge: "In force" },
        dataAct: { tagline: "IoT & cloud data", badge: "From Sep 2025" },
        eprivacy: { tagline: "Cookie & tracking", badge: "In force" },
        eidas: { tagline: "EU Digital Identity", badge: "From 2026" },
        ehds: { tagline: "Health data", badge: "From 2027" },
      },
    },
    /* Timeline preview */
    timeline: {
      sectionLabel: "Schedule 2025 – 2027",
      title1: "Compliance",
      title2: "Timeline.",
      subtitle: "All important deadlines at a glance. Plan ahead.",
      days: "days",
      ctaTimeline: "View full timeline",
      alreadyInForce: "already in force",
    },
    /* Trust signals */
    trust: {
      regulationsExplained: "EU regulations explained",
      freeTools: "Free tools",
      glossaryEntries: "Glossary entries",
      independentAdFree: "Independent & ad-free",
    },
    /* Quick Start */
    quickStart: {
      sectionLabel: "3 Steps to Compliance",
      title: "How to get started",
      subtitle: "From initial analysis to implementation plan — our workflow systematically guides you through the compliance process.",
      steps: [
        {
          title: "Identify regulations",
          desc: "Use the Regulation Finder to discover in 3 minutes which EU laws apply to your business.",
          cta: "Start quiz",
        },
        {
          title: "Check status",
          desc: "Use the Compliance Checklist to verify which requirements you already meet — and where gaps exist.",
          cta: "Open checklist",
        },
        {
          title: "Plan budget & maturity",
          desc: "Calculate implementation costs and measure your current compliance maturity level.",
          cta: "Calculate costs",
        },
      ],
    },
    /* Tools section */
    tools: {
      sectionLabel: "Guides & Resources",
      title1: "Take",
      title2: "action.",
      subtitle: "Understand personal liability, find funding and discover the right experts.",
      items: [
        { title: "Regulation Finder", desc: "Find out in 3 minutes which EU regulations are relevant to your business — personalized by industry, size and activity.", cta: "Start quiz", badge: "New" },
        { title: "Compliance Checklist", desc: "Check point by point which EU compliance requirements your company already meets.", cta: "Start checklist", badge: "New" },
        { title: "Liability Guide", desc: "Director liability under NIS2, DORA, AI Act & CRA — personal risks and indemnification strategies.", cta: "Read guide", badge: "New" },
        { title: "Deadline Radar", desc: "All EU compliance deadlines at a glance — personalized to your relevant regulations.", cta: "Check deadlines", badge: "Interactive" },
        { title: "Cost Calculator", desc: "Estimate EU compliance costs — tailored to company size, maturity level and regulations.", cta: "Calculate costs", badge: "New" },
        { title: "Compliance Glossary", desc: "Over 45 compliance terms explained clearly — from AI Act to Zero Trust.", cta: "Open glossary", badge: "New" },
      ],
    },
    /* Why Us */
    whyUs: {
      sectionLabel: "Why EU Compliance Hub",
      title1: "No legalese.",
      title2: "Plain language.",
      subtitle: "EU regulations read like Kafka in legal German. We read them for you — and distill the essentials into clear action steps.",
      benefits: [
        { title: "No subscription needed", desc: "All basic information freely available" },
        { title: "Always up to date", desc: "Real-time updates on regulatory changes" },
        { title: "For every company size", desc: "From solo entrepreneurs to large enterprises" },
        { title: "Austria + EU", desc: "National implementations included" },
      ],
      freeBadge: "100% free",
      cardRegulations: "Regulations",
      cardActive: "Active",
      regList: [
        { name: "NISG 2026", label: "Oct 2026" },
        { name: "EU AI Act", label: "Aug 2026" },
        { name: "DORA", label: "Active" },
        { name: "CRA", label: "Sep 2026" },
        { name: "GDPR & AI", label: "Active" },
        { name: "CSRD / ESG", label: "2026" },
        { name: "EAA", label: "Active" },
        { name: "HSchG", label: "Active" },
        { name: "Green Claims", label: "2027" },
        { name: "MiCA", label: "Active" },
        { name: "DPP / ESPR", label: "2027" },
        { name: "PLD", label: "2027" },
        { name: "DSA", label: "Active" },
        { name: "Data Act", label: "Sep 2025" },
        { name: "ePrivacy", label: "Active" },
        { name: "eIDAS 2.0", label: "2026" },
        { name: "EHDS", label: "2027" },
        { name: "Director liability", label: "Active" },
      ],
    },
    /* News preview */
    news: {
      title: "Compliance news",
      subtitle: "New laws, upcoming deadlines and important developments",
      ctaNews: "View all news",
      ctaCompare: "Regulation comparison",
      items: [
        { date: "25 June 2025", label: "NIS2", title: "NISG 2026 published", desc: "Effective 1 October 2026, registration by end of 2026" },
        { date: "28 June 2025", label: "EAA", title: "Accessibility Act in force", desc: "Digital products and services must be accessible" },
        { date: "1 Jan 2026", label: "CSRD", title: "CSRD: Second wave for large companies", desc: "Reporting obligation from 250 employees / €50M revenue" },
      ],
    },
    /* Report CTA */
    report: {
      badge: "Our most important tool",
      title1: "Your personal",
      title2: "Compliance Report.",
      subtitle: "In 5 minutes you'll receive a complete analysis — which regulations apply to your company, what implementation costs, and how to improve your maturity level.",
      benefit1Title: "14 regulations checked",
      benefit1Desc: "Tailored to industry, size & activity",
      benefit2Title: "Cost estimate included",
      benefit2Desc: "Broken down by regulation & company size",
      benefit3Title: "PDF report via email",
      benefit3Desc: "Professionally formatted with software recommendations",
      ctaCreate: "Create Compliance Report",
      ctaSubtitle: "Free. No obligation. Done in 5 minutes.",
      previewTitle: "Compliance Report",
      previewCompany: "Sample Ltd — Feb 2026",
      previewMaturity: "Maturity",
      previewMaturityLabel: "Compliance maturity",
      previewRegulations: "Applicable regulations",
      previewMore: "+3 more",
      previewCost: "Estimated costs",
      previewCostRange: "€45,000 – €120,000",
      previewCostLabel: "Total costs for all applicable regulations",
      pdfDownload: "PDF download",
    },
    /* Newsletter CTA */
    newsletter: {
      title: "Activate Compliance Briefing",
      subtitle: "Your regulatory early warning system — only for critical deadlines and regulatory changes. Maximum 3× per month.",
    },
    /* Aria labels for sections */
    aria: {
      hero: "Hero – EU Compliance Hub",
      stats: "Statistics",
      regulations: "Regulations overview",
      moreRegulations: "More EU regulations",
      timeline: "Timeline preview",
      trust: "Platform in numbers",
      quickStart: "Quick start",
      tools: "Compliance tools",
      whyUs: "Why EU Compliance Hub",
      news: "News and regulation comparison",
      report: "Create compliance report",
      newsletter: "Compliance briefing newsletter",
    },
  },
} as const;

export default en;
