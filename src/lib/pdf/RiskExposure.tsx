/* ══════════════════════════════════════════════════════════════
   RiskExposure — Fine exposure and risk dashboard page
   Per-regulation fines, total exposure, ROI comparison
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import { tReplace, type PDFMessages } from "@/i18n/pdf";
import type { FineExposureResult } from "@/data/fine-data";

interface RiskExposureProps {
  fineExposures: FineExposureResult[];
  totalFineExposure: number;
  totalCostMin: number;
  totalCostMax: number;
  estimatedRevenue: number;
  generatedAt: string;
  t: PDFMessages;
}

const reStyles = StyleSheet.create({
  totalBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    padding: 18,
    marginBottom: 18,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  totalLabel: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textLight,
    marginBottom: 4,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  totalValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 28,
    color: COLORS.gold,
  },
  roiBox: {
    alignItems: "flex-end",
  },
  roiLabel: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  roiValue: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.success,
  },
  fineRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  fineColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  fineNameCol: {
    flex: 1,
  },
  fineName: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.navy,
    marginBottom: 1,
  },
  fineCalc: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textSecondary,
  },
  fineAmountCol: {
    width: 100,
    alignItems: "flex-end",
  },
  fineAmount: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 11,
    color: COLORS.danger,
  },
  fineArticle: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textLight,
    marginTop: 1,
  },
  barContainer: {
    width: 80,
    height: 8,
    backgroundColor: COLORS.borderLight,
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 10,
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },
  comparisonSection: {
    marginTop: 18,
    flexDirection: "row",
    gap: 10,
  },
  compBox: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  compLabel: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  compValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 16,
    marginBottom: 2,
  },
  compDetail: {
    fontFamily: "DMSans",
    fontSize: 8,
    lineHeight: 1.5,
  },
  disclaimer: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#fff7ed",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  disclaimerText: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: "#9a3412",
    lineHeight: 1.6,
  },
});

function formatFineEUR(amount: number, t: PDFMessages): string {
  if (amount >= 1_000_000_000) {
    const b = amount / 1_000_000_000;
    return `${b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)} ${t.risk.billion} EUR`;
  }
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} ${t.risk.million} EUR`;
  }
  if (amount >= 1000) {
    return `${Math.round(amount / 1000)}k EUR`;
  }
  const localeTag = t.locale === "de" ? "de-AT" : t.locale;
  return `${amount.toLocaleString(localeTag)} EUR`;
}

function formatCostRange(min: number, max: number): string {
  const fmt = (n: number) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(n));
  return `${fmt(min)} – ${fmt(max)} EUR`;
}

/** Color map for regulation keys */
const REG_COLORS: Record<string, string> = {
  "ai-act": "#7c3aed",
  dsgvo: "#2563eb",
  cra: "#ea580c",
  nis2: "#dc2626",
  dora: "#0891b2",
  csrd: "#16a34a",
  dsa: "#6366f1",
  mica: "#f59e0b",
  "data-act": "#0d9488",
};

export default function RiskExposure({
  fineExposures,
  totalFineExposure,
  totalCostMin,
  totalCostMax,
  estimatedRevenue,
  generatedAt,
  t,
}: RiskExposureProps) {
  const maxFine = fineExposures.length > 0 ? fineExposures[0].maxFine : 1;
  const roiMultiple = totalCostMax > 0 ? Math.round(totalFineExposure / totalCostMax) : 0;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.risk.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.risk.subtitle}
      </Text>

      {/* Total Exposure Box */}
      <View style={reStyles.totalBox}>
        <View style={reStyles.totalRow}>
          <View>
            <Text style={reStyles.totalLabel}>{t.risk.cumulativeFineRisk}</Text>
            <Text style={reStyles.totalValue}>{formatFineEUR(totalFineExposure, t)}</Text>
          </View>
          {roiMultiple > 1 && (
            <View style={reStyles.roiBox}>
              <Text style={reStyles.roiLabel}>{t.risk.roiLabel}</Text>
              <Text style={reStyles.roiValue}>
                {tReplace(t.risk.roiValue, { multiple: roiMultiple })}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Per-Regulation Fines */}
      {fineExposures.map((fine) => {
        const barWidth = Math.max((fine.maxFine / maxFine) * 100, 3);
        const color = REG_COLORS[fine.key] ?? COLORS.textSecondary;

        return (
          <View key={fine.key} style={reStyles.fineRow} wrap={false}>
            <View style={[reStyles.fineColorDot, { backgroundColor: color }]} />
            <View style={reStyles.fineNameCol}>
              <Text style={reStyles.fineName}>{fine.name}</Text>
              <Text style={reStyles.fineCalc}>{fine.calculation}</Text>
            </View>
            <View style={reStyles.barContainer}>
              <View
                style={[
                  reStyles.barFill,
                  { width: `${barWidth}%`, backgroundColor: color },
                ]}
              />
            </View>
            <View style={reStyles.fineAmountCol}>
              <Text style={reStyles.fineAmount}>{formatFineEUR(fine.maxFine, t)}</Text>
              <Text style={reStyles.fineArticle}>{fine.article}</Text>
            </View>
          </View>
        );
      })}

      {/* Cost vs Fine Comparison */}
      <View style={reStyles.comparisonSection}>
        <View style={[reStyles.compBox, { borderColor: "#bbf7d0", backgroundColor: "#f0fdf4" }]}>
          <Text style={[reStyles.compLabel, { color: "#166534" }]}>{t.risk.complianceInvestment}</Text>
          <Text style={[reStyles.compValue, { color: "#16a34a" }]}>
            {formatCostRange(totalCostMin, totalCostMax)}
          </Text>
          <Text style={[reStyles.compDetail, { color: "#15803d" }]}>
            {t.risk.complianceInvestmentDesc}
          </Text>
        </View>
        <View style={[reStyles.compBox, { borderColor: "#fecaca", backgroundColor: "#fef2f2" }]}>
          <Text style={[reStyles.compLabel, { color: "#991b1b" }]}>{t.risk.fineRisk}</Text>
          <Text style={[reStyles.compValue, { color: "#dc2626" }]}>
            {formatFineEUR(totalFineExposure, t)}
          </Text>
          <Text style={[reStyles.compDetail, { color: "#b91c1c" }]}>
            {t.risk.fineRiskDesc}
          </Text>
        </View>
      </View>

      {/* Disclaimer */}
      <View style={reStyles.disclaimer}>
        <Text style={reStyles.disclaimerText}>
          {tReplace(t.risk.disclaimer, { revenue: formatFineEUR(estimatedRevenue, t) })}
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
