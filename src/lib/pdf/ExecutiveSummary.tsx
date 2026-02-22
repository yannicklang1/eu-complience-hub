/* ══════════════════════════════════════════════════════════════
   ExecutiveSummary — Premium "Auf einen Blick" overview page
   Traffic-light regulation grid, fine exposure, critical risks,
   grade circle + mini stats, top priority actions
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { tReplace, type PDFMessages } from "@/i18n/pdf";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { EvaluatedRegulation } from "@/lib/regulation-evaluator";
import type { CriticalRisk } from "@/lib/report-engine";

interface ExecutiveSummaryProps {
  highCount: number;
  mediumCount: number;
  lowCount: number;
  maturityGrade: {
    letter: string;
    label: string;
    color: string;
  };
  maturityPercentage: number;
  totalCostMin: number;
  totalCostMax: number;
  nextDeadline: {
    title: string;
    daysLeft: number;
  } | null;
  topActions: string[];
  generatedAt: string;
  /* New premium props */
  regulations: EvaluatedRegulation[];
  criticalRisks: CriticalRisk[];
  totalFineExposure: number;
  t: PDFMessages;
}

const esStyles = StyleSheet.create({
  /* ── Fine Exposure Banner ── */
  fineBanner: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  fineBannerLeft: {
    flex: 1,
  },
  fineBannerLabel: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: COLORS.textLight,
    marginBottom: 4,
  },
  fineBannerValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 24,
    color: COLORS.gold,
  },
  fineBannerNote: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
    marginTop: 2,
  },
  fineBannerRight: {
    alignItems: "center",
    marginLeft: 16,
  },

  /* ── Mini Stats Row ── */
  miniStatsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  miniStat: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
    backgroundColor: COLORS.offWhite,
  },
  miniStatLabel: {
    fontFamily: "DMSans",
    fontSize: 7,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLORS.textLight,
    marginBottom: 4,
  },
  miniStatValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 18,
    color: COLORS.navy,
    marginBottom: 2,
  },
  miniStatDetail: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textSecondary,
    lineHeight: 1.4,
  },
  miniStatDetailDanger: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.danger,
    fontWeight: 700,
  },

  /* ── Traffic-Light Regulation Grid ── */
  regGridTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.navy,
    marginBottom: 8,
  },
  regGrid: {
    marginBottom: 16,
  },
  regRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  regDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  regRowName: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textPrimary,
    flex: 1,
  },
  regBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 6,
  },
  regBadgeText: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 6.5,
  },

  /* ── Critical Risks ── */
  risksTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.navy,
    marginBottom: 8,
  },
  riskCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  riskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 3,
    marginRight: 8,
  },
  riskContent: {
    flex: 1,
  },
  riskName: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9,
    color: COLORS.textPrimary,
    marginBottom: 1,
  },
  riskFine: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.danger,
    fontWeight: 700,
  },
  riskLevelBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 3,
    marginLeft: 6,
    alignSelf: "flex-start",
  },
  riskLevelText: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  /* ── Actions ── */
  actionsTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.navy,
    marginBottom: 8,
    marginTop: 4,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    paddingLeft: 2,
  },
  actionNumber: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.gold,
    width: 20,
    marginRight: 6,
  },
  actionText: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
    flex: 1,
  },
});

const RELEVANCE_CONFIG: Record<
  "hoch" | "mittel" | "niedrig",
  { bg: string; text: string }
> = {
  hoch: { bg: "#fef2f2", text: "#dc2626" },
  mittel: { bg: "#fefce8", text: "#ca8a04" },
  niedrig: { bg: "#f0fdf4", text: "#16a34a" },
};

const RISK_LEVEL_CONFIG: Record<string, { bg: string; text: string }> = {
  kritisch: { bg: "#fef2f2", text: "#dc2626" },
  hoch: { bg: "#fff7ed", text: "#ea580c" },
  mittel: { bg: "#fefce8", text: "#ca8a04" },
};

function formatEuro(amount: number, t: PDFMessages): string {
  if (amount >= 1_000_000_000) {
    const b = amount / 1_000_000_000;
    return `${b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)} ${t.risk.billion}`;
  }
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} ${t.risk.million}`;
  }
  if (amount >= 1000) {
    const k = amount / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }
  return amount.toLocaleString(t.locale === "de" ? "de-AT" : t.locale);
}

function formatCostRange(min: number, max: number): string {
  const fmt = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
  return `${fmt(min)} – ${fmt(max)} EUR`;
}

export default function ExecutiveSummary({
  highCount,
  mediumCount,
  lowCount,
  maturityGrade,
  maturityPercentage,
  totalCostMin,
  totalCostMax,
  nextDeadline,
  topActions,
  generatedAt,
  regulations,
  criticalRisks,
  totalFineExposure,
  t,
}: ExecutiveSummaryProps) {
  const totalRegs = highCount + mediumCount + lowCount;

  const relevanceLabels: Record<"hoch" | "mittel" | "niedrig", string> = {
    hoch: t.exec.relevanceHigh,
    mittel: t.exec.relevanceMedium,
    niedrig: t.exec.relevanceLow,
  };

  const riskLevelLabels: Record<string, string> = {
    kritisch: t.exec.riskLevelCritical,
    hoch: t.exec.riskLevelHigh,
    mittel: t.exec.riskLevelMedium,
  };

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.exec.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.exec.subtitle}
      </Text>

      {/* ── Fine Exposure Banner ── */}
      {totalFineExposure > 0 && (
        <View style={esStyles.fineBanner}>
          <View style={esStyles.fineBannerLeft}>
            <Text style={esStyles.fineBannerLabel}>
              {t.exec.cumulativeFineRisk}
            </Text>
            <Text style={esStyles.fineBannerValue}>
              {t.exec.upTo} {formatEuro(totalFineExposure, t)} EUR
            </Text>
            <Text style={esStyles.fineBannerNote}>
              {tReplace(t.exec.basedOnRegs, { count: highCount + mediumCount })}
            </Text>
          </View>
          <View style={esStyles.fineBannerRight}>
            <View
              style={[
                esStyles.miniStat,
                {
                  backgroundColor: COLORS.navy,
                  borderColor: "#1e3a5f",
                  padding: 8,
                },
              ]}
            >
              <Text
                style={[
                  esStyles.miniStatLabel,
                  { color: COLORS.textLight },
                ]}
              >
                {t.exec.maturityLabel}
              </Text>
              <Text
                style={[
                  esStyles.miniStatValue,
                  { color: maturityGrade.color, fontSize: 20 },
                ]}
              >
                {maturityGrade.letter}
              </Text>
              <Text
                style={[
                  esStyles.miniStatDetail,
                  { color: COLORS.textLight },
                ]}
              >
                {maturityPercentage}%
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* ── Mini Stats Row ── */}
      <View style={esStyles.miniStatsRow}>
        <View style={esStyles.miniStat}>
          <Text style={esStyles.miniStatLabel}>{t.exec.regulationsLabel}</Text>
          <Text style={esStyles.miniStatValue}>{totalRegs}</Text>
          <Text style={esStyles.miniStatDetail}>
            {tReplace(t.exec.highMedLow, { high: highCount, medium: mediumCount, low: lowCount })}
          </Text>
        </View>
        <View style={esStyles.miniStat}>
          <Text style={esStyles.miniStatLabel}>{t.exec.costEstLabel}</Text>
          <Text style={esStyles.miniStatValue}>
            {formatCostRange(totalCostMin, totalCostMax)}
          </Text>
          <Text style={esStyles.miniStatDetail}>
            {t.exec.implementationCosts}
          </Text>
        </View>
        <View style={esStyles.miniStat}>
          <Text style={esStyles.miniStatLabel}>{t.exec.nextDeadlineLabel}</Text>
          {nextDeadline ? (
            <>
              <Text style={esStyles.miniStatValue}>
                {nextDeadline.daysLeft}d
              </Text>
              <Text
                style={
                  nextDeadline.daysLeft < 90
                    ? esStyles.miniStatDetailDanger
                    : esStyles.miniStatDetail
                }
              >
                {nextDeadline.title}
              </Text>
            </>
          ) : (
            <>
              <Text
                style={[esStyles.miniStatValue, { color: COLORS.success }]}
              >
                —
              </Text>
              <Text style={esStyles.miniStatDetail}>{t.exec.noUrgent}</Text>
            </>
          )}
        </View>
      </View>

      {/* ── Traffic-Light Regulation Grid ── */}
      <Text style={esStyles.regGridTitle}>
        {tReplace(t.exec.regOverview, { count: totalRegs })}
      </Text>
      <View style={esStyles.regGrid}>
        {regulations.map((reg) => {
          const config = RELEVANCE_CONFIG[reg.relevance];
          return (
            <View key={reg.key} style={esStyles.regRow}>
              <View
                style={[esStyles.regDot, { backgroundColor: reg.color }]}
              />
              <Text style={esStyles.regRowName}>{reg.name}</Text>
              <View
                style={[
                  esStyles.regBadge,
                  { backgroundColor: config.bg },
                ]}
              >
                <Text
                  style={[esStyles.regBadgeText, { color: config.text }]}
                >
                  {relevanceLabels[reg.relevance]}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* ── Top Critical Risks ── */}
      {criticalRisks.length > 0 && (
        <>
          <Text style={esStyles.risksTitle}>
            {t.exec.criticalRisks}
          </Text>
          {criticalRisks.slice(0, 3).map((risk, i) => {
            const riskConfig = RISK_LEVEL_CONFIG[risk.riskLevel] ?? RISK_LEVEL_CONFIG.mittel;
            return (
              <View key={i} style={esStyles.riskCard}>
                <View
                  style={[
                    esStyles.riskDot,
                    { backgroundColor: risk.color },
                  ]}
                />
                <View style={esStyles.riskContent}>
                  <Text style={esStyles.riskName}>{risk.regulationName}</Text>
                  <Text style={esStyles.riskFine}>
                    {tReplace(t.exec.fineUpTo, { amount: risk.maxFine })}
                  </Text>
                </View>
                <View
                  style={[
                    esStyles.riskLevelBadge,
                    { backgroundColor: riskConfig.bg },
                  ]}
                >
                  <Text
                    style={[
                      esStyles.riskLevelText,
                      { color: riskConfig.text },
                    ]}
                  >
                    {riskLevelLabels[risk.riskLevel] ?? risk.riskLevel}
                  </Text>
                </View>
              </View>
            );
          })}
        </>
      )}

      {/* ── Top Priority Actions ── */}
      <Text style={esStyles.actionsTitle}>
        {t.exec.priorityActions}
      </Text>
      {topActions.slice(0, 4).map((action, i) => (
        <View key={i} style={esStyles.actionItem} wrap={false}>
          <Text style={esStyles.actionNumber}>{i + 1}.</Text>
          <Text style={esStyles.actionText}>{action}</Text>
        </View>
      ))}

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
