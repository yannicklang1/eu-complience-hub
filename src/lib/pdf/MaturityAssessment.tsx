/* ══════════════════════════════════════════════════════════════
   MaturityAssessment — Enhanced maturity grade with dynamic text
   References actual relevant regulations in grade descriptions
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import { tReplace, type PDFMessages } from "@/i18n/pdf";
import type { CategoryResult, MaturityGrade } from "@/lib/maturity-scorer";

interface MaturityAssessmentProps {
  results: CategoryResult[];
  percentage: number;
  grade: MaturityGrade;
  generatedAt: string;
  /* New premium props */
  highRegulationNames?: string[];
  t: PDFMessages;
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
  /* Recommendation box */
  recoBox: {
    marginTop: 16,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
  },
  recoTitle: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9.5,
    marginBottom: 6,
  },
  recoText: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    lineHeight: 1.6,
  },
  /* Legend */
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

const GRADE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#f97316", "#ef4444"];

/** Generate dynamic grade description based on actual regulation names */
function buildGradeDescription(
  percentage: number,
  highRegNames: string[],
  weakCategories: string[],
  t: PDFMessages,
): string {
  const regsText =
    highRegNames.length > 0
      ? highRegNames.slice(0, 3).join(", ")
      : "";

  const weakAreasText = weakCategories.length > 0
    ? weakCategories.join(", ")
    : "";

  if (percentage >= 80) {
    return tReplace(t.maturity.gradeExcellent, { regulations: regsText });
  }
  if (percentage >= 60) {
    return tReplace(t.maturity.gradeGood, { regulations: regsText, weakAreas: weakAreasText });
  }
  if (percentage >= 40) {
    return tReplace(t.maturity.gradeBasic, { regulations: regsText, weakAreas: weakAreasText });
  }
  if (percentage >= 20) {
    return tReplace(t.maturity.gradeBeginner, { regulations: regsText, weakAreas: weakAreasText });
  }
  return tReplace(t.maturity.gradeCritical, { regulations: regsText });
}

/** Get recommendation box config based on grade */
function getRecommendation(
  percentage: number,
  t: PDFMessages,
): {
  bg: string;
  border: string;
  titleColor: string;
  textColor: string;
  title: string;
  text: string;
} {
  if (percentage >= 60) {
    return {
      bg: "#f0fdf4",
      border: "#bbf7d0",
      titleColor: "#166534",
      textColor: "#15803d",
      title: t.maturity.recoGoodTitle,
      text: t.maturity.recoGoodText,
    };
  }
  if (percentage >= 40) {
    return {
      bg: "#fffbeb",
      border: "#fde68a",
      titleColor: "#92400e",
      textColor: "#a16207",
      title: t.maturity.recoBasicTitle,
      text: t.maturity.recoBasicText,
    };
  }
  return {
    bg: "#fef2f2",
    border: "#fecaca",
    titleColor: "#991b1b",
    textColor: "#dc2626",
    title: t.maturity.recoCriticalTitle,
    text: t.maturity.recoCriticalText,
  };
}

export default function MaturityAssessment({
  results,
  percentage,
  grade,
  generatedAt,
  highRegulationNames = [],
  t,
}: MaturityAssessmentProps) {
  const applicableResults = results.filter((r) => r.maxScore > 0);

  // Find weak categories (below 40%)
  const weakCategories = applicableResults
    .filter((r) => r.percentage < 40)
    .map((r) => r.title);

  const dynamicDescription = buildGradeDescription(
    percentage,
    highRegulationNames,
    weakCategories,
    t,
  );

  const reco = getRecommendation(percentage, t);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.maturity.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.maturity.subtitle}
      </Text>

      {/* ── Grade Circle + Dynamic Description ── */}
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
          <Text style={matStyles.gradeDescription}>
            {dynamicDescription}
          </Text>
        </View>
      </View>

      {/* ── Category Bars ── */}
      <Text style={matStyles.categoriesTitle}>{t.maturity.categoryTitle}</Text>

      {applicableResults.map((cat) => (
        <View key={cat.id} style={matStyles.categoryRow}>
          <View style={matStyles.categoryLabelCol}>
            <Text style={matStyles.categoryTitle}>{cat.title}</Text>
            <Text style={matStyles.categoryScore}>
              {tReplace(t.maturity.points, { score: cat.score, max: cat.maxScore })}
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

      {/* ── Dynamic Recommendation Box ── */}
      <View
        style={[
          matStyles.recoBox,
          { backgroundColor: reco.bg, borderColor: reco.border },
        ]}
      >
        <Text style={[matStyles.recoTitle, { color: reco.titleColor }]}>
          {reco.title}
        </Text>
        <Text style={[matStyles.recoText, { color: reco.textColor }]}>
          {reco.text}
        </Text>
      </View>

      {/* ── Legend ── */}
      <View style={matStyles.legend}>
        <Text style={matStyles.legendTitle}>{t.maturity.scaleTitle}</Text>
        <View style={matStyles.legendRow}>
          {t.maturity.gradeLabels.map((item, idx) => (
            <View key={item.letter} style={matStyles.legendItem}>
              <View
                style={[matStyles.legendDot, { backgroundColor: GRADE_COLORS[idx] }]}
              />
              <Text style={matStyles.legendLabel}>
                {item.letter}: {item.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
