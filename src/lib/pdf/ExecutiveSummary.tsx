/* ══════════════════════════════════════════════════════════════
   ExecutiveSummary — "Auf einen Blick" overview page
   Shows 4 stat boxes and top priority actions
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";

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
}

const esStyles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.offWhite,
  },
  statLabel: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: COLORS.textLight,
    marginBottom: 6,
  },
  statValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 22,
    color: COLORS.navy,
    marginBottom: 4,
  },
  statDetail: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
  },
  statDetailHigh: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.danger,
  },
  statDetailMedium: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.warning,
  },
  statDetailLow: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
  },
  relevanceRow: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
    marginTop: 2,
  },
  gradeValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 22,
  },
  actionsSection: {
    marginTop: 4,
  },
  actionsTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.navy,
    marginBottom: 12,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingLeft: 4,
  },
  actionNumber: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.gold,
    width: 24,
    marginRight: 8,
  },
  actionText: {
    fontFamily: "DMSans",
    fontSize: 10,
    color: COLORS.textPrimary,
    lineHeight: 1.6,
    flex: 1,
  },
  actionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    marginBottom: 10,
    marginLeft: 32,
  },
  deadlineUrgent: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.danger,
    fontWeight: 700,
  },
  deadlineNormal: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textSecondary,
  },
});

function formatEuro(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k`;
  }
  return amount.toLocaleString("de-AT");
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
}: ExecutiveSummaryProps) {
  const totalRegs = highCount + mediumCount + lowCount;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        Auf einen Blick
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        Zusammenfassung Ihrer Compliance-Situation
      </Text>

      {/* ── 4 Stat Boxes ── */}
      <View style={esStyles.statsRow}>
        {/* Regulations */}
        <View style={esStyles.statBox}>
          <Text style={esStyles.statLabel}>Regulierungen</Text>
          <Text style={esStyles.statValue}>{totalRegs}</Text>
          <View style={esStyles.relevanceRow}>
            <Text style={esStyles.statDetailHigh}>{highCount} hoch</Text>
            <Text style={esStyles.statDetail}> | </Text>
            <Text style={esStyles.statDetailMedium}>{mediumCount} mittel</Text>
            <Text style={esStyles.statDetail}> | </Text>
            <Text style={esStyles.statDetailLow}>{lowCount} niedrig</Text>
          </View>
        </View>

        {/* Maturity */}
        <View style={esStyles.statBox}>
          <Text style={esStyles.statLabel}>Reifegrad</Text>
          <Text style={[esStyles.gradeValue, { color: maturityGrade.color }]}>
            {maturityGrade.letter}
          </Text>
          <Text style={esStyles.statDetail}>
            {maturityPercentage}% — {maturityGrade.label}
          </Text>
        </View>

        {/* Costs */}
        <View style={esStyles.statBox}>
          <Text style={esStyles.statLabel}>Kosten (gesch.)</Text>
          <Text style={esStyles.statValue}>
            {formatEuro(totalCostMin)}
          </Text>
          <Text style={esStyles.statDetail}>
            bis {formatEuro(totalCostMax)} EUR
          </Text>
        </View>

        {/* Next Deadline */}
        <View style={esStyles.statBox}>
          <Text style={esStyles.statLabel}>Naechste Frist</Text>
          {nextDeadline ? (
            <>
              <Text style={esStyles.statValue}>{nextDeadline.daysLeft}</Text>
              <Text
                style={
                  nextDeadline.daysLeft < 90
                    ? esStyles.deadlineUrgent
                    : esStyles.deadlineNormal
                }
              >
                Tage — {nextDeadline.title}
              </Text>
            </>
          ) : (
            <>
              <Text style={[esStyles.statValue, { color: COLORS.success }]}>
                —
              </Text>
              <Text style={esStyles.statDetail}>
                Keine dringenden Fristen
              </Text>
            </>
          )}
        </View>
      </View>

      {/* ── Top Priority Actions ── */}
      <View style={esStyles.actionsSection}>
        <Text style={esStyles.actionsTitle}>
          Prioritaere Handlungsempfehlungen
        </Text>
        {topActions.map((action, i) => (
          <View key={i} wrap={false}>
            <View style={esStyles.actionItem}>
              <Text style={esStyles.actionNumber}>{i + 1}.</Text>
              <Text style={esStyles.actionText}>{action}</Text>
            </View>
            {i < topActions.length - 1 && (
              <View style={esStyles.actionDivider} />
            )}
          </View>
        ))}
      </View>

      <PageFooter generatedAt={generatedAt} />
    </Page>
  );
}
