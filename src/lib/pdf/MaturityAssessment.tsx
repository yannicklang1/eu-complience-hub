/* ══════════════════════════════════════════════════════════════
   MaturityAssessment — Maturity grade overview with category bars
   Shows the overall grade and per-category scores
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { CategoryResult, MaturityGrade } from "@/lib/maturity-scorer";

interface MaturityAssessmentProps {
  results: CategoryResult[];
  percentage: number;
  grade: MaturityGrade;
  generatedAt: string;
}

const matStyles = StyleSheet.create({
  gradeSection: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 24,
  },
  gradeCircleOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  gradeCircleInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  gradeLetter: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 38,
    textAlign: "center",
  },
  gradePercentage: {
    fontFamily: "DMSans",
    fontSize: 10,
    textAlign: "center",
    marginTop: -2,
  },
  gradeInfo: {
    flex: 1,
    justifyContent: "center",
  },
  gradeLabel: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 16,
    color: COLORS.navy,
    marginBottom: 6,
  },
  gradeDescription: {
    fontFamily: "DMSans",
    fontSize: 9.5,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
  },
  categoriesTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 13,
    color: COLORS.navy,
    marginBottom: 14,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  categoryLabelCol: {
    width: 160,
    marginRight: 12,
  },
  categoryTitle: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9.5,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  categoryScore: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textSecondary,
  },
  barOuter: {
    flex: 1,
    height: 14,
    backgroundColor: COLORS.borderLight,
    borderRadius: 7,
    overflow: "hidden",
    position: "relative",
  },
  barInner: {
    height: 14,
    borderRadius: 7,
  },
  percentLabel: {
    width: 40,
    textAlign: "right",
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  legend: {
    marginTop: 20,
    backgroundColor: COLORS.offWhite,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  legendTitle: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendLabel: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textSecondary,
  },
});

const GRADE_LEGEND = [
  { letter: "A", label: "80–100% Vorbildlich", color: "#10b981" },
  { letter: "B", label: "60–79% Fortgeschritten", color: "#3b82f6" },
  { letter: "C", label: "40–59% Grundlegend", color: "#f59e0b" },
  { letter: "D", label: "20–39% Anfaenger", color: "#f97316" },
  { letter: "E", label: "0–19% Kritisch", color: "#ef4444" },
];

export default function MaturityAssessment({
  results,
  percentage,
  grade,
  generatedAt,
}: MaturityAssessmentProps) {
  const applicableResults = results.filter((r) => r.maxScore > 0);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        Reifegrad-Bewertung
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        Compliance-Reifegrad Ihres Unternehmens
      </Text>

      {/* ── Grade Circle + Description ── */}
      <View style={matStyles.gradeSection}>
        <View
          style={[
            matStyles.gradeCircleOuter,
            { borderColor: grade.color },
          ]}
        >
          <View style={matStyles.gradeCircleInner}>
            <Text style={[matStyles.gradeLetter, { color: grade.color }]}>
              {grade.letter}
            </Text>
            <Text style={[matStyles.gradePercentage, { color: grade.color }]}>
              {percentage}%
            </Text>
          </View>
        </View>

        <View style={matStyles.gradeInfo}>
          <Text style={matStyles.gradeLabel}>{grade.label}</Text>
          <Text style={matStyles.gradeDescription}>{grade.description}</Text>
        </View>
      </View>

      {/* ── Category Bars ── */}
      <Text style={matStyles.categoriesTitle}>Bewertung nach Kategorie</Text>

      {applicableResults.map((cat) => (
        <View key={cat.id} style={matStyles.categoryRow}>
          <View style={matStyles.categoryLabelCol}>
            <Text style={matStyles.categoryTitle}>{cat.title}</Text>
            <Text style={matStyles.categoryScore}>
              {cat.score} / {cat.maxScore} Punkte
            </Text>
          </View>

          <View style={matStyles.barOuter}>
            <View
              style={[
                matStyles.barInner,
                {
                  width: `${Math.max(cat.percentage, 2)}%`,
                  backgroundColor: cat.color,
                },
              ]}
            />
          </View>

          <Text style={matStyles.percentLabel}>{cat.percentage}%</Text>
        </View>
      ))}

      {/* ── Legend ── */}
      <View style={matStyles.legend}>
        <Text style={matStyles.legendTitle}>Bewertungsskala</Text>
        <View style={matStyles.legendRow}>
          {GRADE_LEGEND.map((item) => (
            <View key={item.letter} style={matStyles.legendItem}>
              <View
                style={[matStyles.legendDot, { backgroundColor: item.color }]}
              />
              <Text style={matStyles.legendLabel}>
                {item.letter}: {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <PageFooter generatedAt={generatedAt} />
    </Page>
  );
}
