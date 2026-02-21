/* ══════════════════════════════════════════════════════════════
   Maturity Scorer — Shared Logic
   Extracted from ReifegradTool.tsx for reuse in
   Report Engine + API routes
   ══════════════════════════════════════════════════════════════ */

export interface MaturityCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: { id: string; text: string }[];
}

export type Rating = 0 | 1 | 2 | 3; // 0=n/a, 1=not, 2=partial, 3=fully

export const RATING_LABELS: Record<Rating, string> = {
  0: "Nicht zutreffend",
  1: "Nicht umgesetzt",
  2: "Teilweise umgesetzt",
  3: "Vollständig umgesetzt",
};

export const RATING_COLORS: Record<Rating, string> = {
  0: "#64748b",
  1: "#ef4444",
  2: "#f59e0b",
  3: "#10b981",
};

export const MATURITY_CATEGORIES: MaturityCategory[] = [
  {
    id: "governance",
    title: "Governance & Organisation",
    icon: "🏛️",
    color: "#6366f1",
    questions: [
      { id: "g1", text: "Es gibt eine klar definierte Compliance-Verantwortung (Person/Abteilung)" },
      { id: "g2", text: "Die Geschäftsleitung wird regelmäßig über Compliance-Themen informiert" },
      { id: "g3", text: "Es existiert ein dokumentiertes Compliance-Management-System (CMS)" },
      { id: "g4", text: "Compliance-Richtlinien sind allen Mitarbeitern zugänglich" },
      { id: "g5", text: "Es gibt ein Budget für Compliance-Maßnahmen" },
    ],
  },
  {
    id: "datenschutz",
    title: "Datenschutz (DSGVO)",
    icon: "🔒",
    color: "#2563eb",
    questions: [
      { id: "d1", text: "Ein Verarbeitungsverzeichnis (Art. 30 DSGVO) ist vorhanden und aktuell" },
      { id: "d2", text: "Datenschutz-Folgenabschätzungen werden bei Bedarf durchgeführt" },
      { id: "d3", text: "Es gibt einen Prozess für Betroffenenanfragen (Auskunft, Löschung etc.)" },
      { id: "d4", text: "Auftragsverarbeitungs-Verträge (AVV) sind mit allen Dienstleistern geschlossen" },
      { id: "d5", text: "Datenpannen werden innerhalb von 72 Stunden gemeldet" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersicherheit (NIS2/CRA)",
    icon: "🛡️",
    color: "#dc2626",
    questions: [
      { id: "c1", text: "Ein ISMS (z.B. ISO 27001) ist implementiert oder in Planung" },
      { id: "c2", text: "Regelmäßige Risikoanalysen für IT-Systeme werden durchgeführt" },
      { id: "c3", text: "Es gibt einen dokumentierten Incident-Response-Plan" },
      { id: "c4", text: "Mitarbeiter werden regelmäßig zu IT-Sicherheit geschult" },
      { id: "c5", text: "Lieferketten-Risiken werden systematisch bewertet" },
    ],
  },
  {
    id: "ki-compliance",
    title: "KI & Technologie (AI Act)",
    icon: "🤖",
    color: "#7c3aed",
    questions: [
      { id: "k1", text: "Eingesetzte KI-Systeme sind inventarisiert und klassifiziert" },
      { id: "k2", text: "Es gibt Richtlinien für den verantwortungsvollen KI-Einsatz" },
      { id: "k3", text: "Menschliche Aufsicht über KI-Entscheidungen ist gewährleistet" },
      { id: "k4", text: "Betroffene werden über den KI-Einsatz informiert" },
      { id: "k5", text: "KI-Systeme werden auf Bias und Diskriminierung geprüft" },
    ],
  },
  {
    id: "reporting",
    title: "Berichterstattung & Dokumentation",
    icon: "📊",
    color: "#16a34a",
    questions: [
      { id: "r1", text: "Compliance-Maßnahmen werden dokumentiert und nachvollziehbar aufbewahrt" },
      { id: "r2", text: "Nachhaltigkeits-/ESG-Berichterstattung ist etabliert oder in Planung" },
      { id: "r3", text: "Regelmäßige interne Audits finden statt" },
      { id: "r4", text: "Ein Hinweisgebersystem (Whistleblowing) ist eingerichtet" },
      { id: "r5", text: "Compliance-Schulungen werden dokumentiert und deren Wirksamkeit geprüft" },
    ],
  },
];

export interface CategoryResult extends MaturityCategory {
  score: number;
  maxScore: number;
  percentage: number;
}

export interface MaturityGrade {
  label: string;
  letter: string;
  color: string;
  description: string;
}

/* ── Scoring ── */
export function calculateResults(ratings: Record<string, Rating>): CategoryResult[] {
  return MATURITY_CATEGORIES.map((cat) => {
    const applicable = cat.questions.filter((q) => (ratings[q.id] ?? 0) !== 0);
    if (applicable.length === 0) return { ...cat, score: 0, maxScore: 0, percentage: 0 };
    const score = applicable.reduce((sum, q) => sum + ((ratings[q.id] ?? 0) as number), 0);
    const maxScore = applicable.length * 3;
    return { ...cat, score, maxScore, percentage: Math.round((score / maxScore) * 100) };
  });
}

export function getOverallPercentage(results: CategoryResult[]): number {
  const applicableResults = results.filter((r) => r.maxScore > 0);
  if (applicableResults.length === 0) return 0;
  const totalScore = applicableResults.reduce((s, r) => s + r.score, 0);
  const totalMax = applicableResults.reduce((s, r) => s + r.maxScore, 0);
  return totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
}

export function getOverallGrade(percentage: number): MaturityGrade {
  if (percentage >= 80) return { letter: "A", label: "A – Vorbildlich", color: "#10b981", description: "Ihr Unternehmen ist hervorragend aufgestellt. Fokussieren Sie auf kontinuierliche Verbesserung und bleiben Sie bei Gesetzesänderungen am Ball." };
  if (percentage >= 60) return { letter: "B", label: "B – Fortgeschritten", color: "#3b82f6", description: "Gute Grundlage vorhanden. Schließen Sie die verbleibenden Lücken systematisch und dokumentieren Sie alle Maßnahmen." };
  if (percentage >= 40) return { letter: "C", label: "C – Grundlegend", color: "#f59e0b", description: "Erste Maßnahmen sind umgesetzt, aber es gibt deutlichen Handlungsbedarf. Priorisieren Sie die Bereiche mit dem niedrigsten Score." };
  if (percentage >= 20) return { letter: "D", label: "D – Anfänger", color: "#f97316", description: "Erhebliche Compliance-Lücken bestehen. Beginnen Sie mit den kritischsten Regulierungen (DSGVO, ggf. NIS2) und bauen Sie schrittweise auf." };
  return { letter: "E", label: "E – Kritisch", color: "#ef4444", description: "Dringender Handlungsbedarf. Das Risiko für Bußgelder und Haftung ist hoch. Suchen Sie professionelle Beratung und starten Sie sofort mit grundlegenden Maßnahmen." };
}

/* ── Quick maturity check (condensed version for report wizard) ── */
export interface QuickMaturityAnswer {
  category: string;
  level: 0 | 1 | 2 | 3; // 0=n/a, 1=nicht, 2=teilweise, 3=vollständig
}

export function calculateQuickMaturity(answers: QuickMaturityAnswer[]): {
  results: CategoryResult[];
  overallPercentage: number;
  grade: MaturityGrade;
} {
  // Map quick answers to full ratings format
  const ratings: Record<string, Rating> = {};
  const categoryMap: Record<string, string> = {
    governance: "g1",
    datenschutz: "d1",
    cybersecurity: "c1",
    "ki-compliance": "k1",
    reporting: "r1",
  };

  for (const answer of answers) {
    const questionId = categoryMap[answer.category];
    if (questionId) {
      ratings[questionId] = answer.level;
    }
  }

  const results = calculateResults(ratings);
  const overallPercentage = getOverallPercentage(results);
  const grade = getOverallGrade(overallPercentage);

  return { results, overallPercentage, grade };
}
