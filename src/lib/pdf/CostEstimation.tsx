/* ══════════════════════════════════════════════════════════════
   CostEstimation — Enhanced cost page with fine comparison & ROI
   Shows per-regulation costs + total vs fine exposure comparison
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { tReplace, type PDFMessages } from "@/i18n/pdf";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { RegulationCost } from "@/lib/cost-estimator";

interface CostEstimationProps {
  costs: RegulationCost[];
  totalMin: number;
  totalMax: number;
  companySize: string;
  generatedAt: string;
  /* New premium props */
  totalFineExposure?: number;
  relevantRegulationNames?: string[];
  t: PDFMessages;
}

const costStyles = StyleSheet.create({
  /* Total box */
  totalBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontFamily: "DMSans",
    fontSize: 10,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  totalValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 22,
    color: COLORS.gold,
  },
  totalDetail: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textLight,
    textAlign: "right",
  },
  /* Fine comparison row */
  comparisonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  comparisonBox: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
  },
  comparisonLabel: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  comparisonValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 16,
    marginBottom: 2,
  },
  comparisonDetail: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    lineHeight: 1.4,
  },
  roiBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  roiLabel: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textLight,
  },
  roiValue: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 16,
    color: COLORS.gold,
  },
  roiArrow: {
    fontFamily: "DMSans",
    fontSize: 14,
    color: COLORS.gold,
  },
  /* Regulation blocks */
  regBlock: {
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  regHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.offWhite,
  },
  regHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  regColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  regName: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 11,
    color: COLORS.navy,
  },
  regRange: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.textPrimary,
  },
  breakdownContainer: {
    padding: 10,
    paddingTop: 6,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
  },
  breakdownItem: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textSecondary,
    flex: 1,
  },
  breakdownCost: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textPrimary,
    textAlign: "right",
    width: 100,
  },
  breakdownDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  /* Synergy note */
  noteBox: {
    marginTop: 16,
    backgroundColor: "#f0fdf4",
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  noteTitle: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9,
    color: "#166534",
    marginBottom: 4,
  },
  noteText: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: "#15803d",
    lineHeight: 1.6,
  },
});

function formatEuro(amount: number, t: PDFMessages): string {
  if (amount >= 1_000_000_000) {
    const b = amount / 1_000_000_000;
    return `${b % 1 === 0 ? b.toFixed(0) : b.toFixed(1)} ${t.risk.billion} EUR`;
  }
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} ${t.risk.million} EUR`;
  }
  if (amount >= 1000) {
    const k = amount / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k EUR`;
  }
  const localeTag = t.locale === "de" ? "de-AT" : t.locale;
  return `${amount.toLocaleString(localeTag)} EUR`;
}

function formatRange(min: number, max: number, t: PDFMessages): string {
  const localeTag = t.locale === "de" ? "de-AT" : t.locale;
  const fmt = (n: number) => {
    if (n >= 1000) {
      const k = n / 1000;
      return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k EUR`;
    }
    return `${n.toLocaleString(localeTag)} EUR`;
  };
  return `${fmt(min)} – ${fmt(max)}`;
}

/** Build dynamic synergy text referencing actual regulation pairs */
function buildSynergyText(regulationNames: string[], t: PDFMessages): string {
  if (regulationNames.length < 2) {
    return t.engine.synergyBasic;
  }

  const examples = regulationNames.slice(0, 3).join(" + ");
  const synergies: string[] = [];

  const hasNIS2 = regulationNames.some((n) => n.includes("NIS2"));
  const hasDORA = regulationNames.some((n) => n.includes("DORA"));
  const hasDSGVO = regulationNames.some((n) => n.includes("DSGVO"));
  const hasCRA = regulationNames.some((n) => n.includes("CRA"));
  const hasCSRD = regulationNames.some((n) => n.includes("CSRD"));

  if (hasNIS2 && hasDORA) synergies.push(t.engine.synergyISMS);
  if (hasDSGVO && hasNIS2) synergies.push(t.engine.synergyRisk);
  if (hasCRA && hasNIS2) synergies.push(t.engine.synergySecurity);
  if (hasCSRD) synergies.push(t.engine.synergySustainability);
  if (synergies.length === 0) synergies.push(t.engine.synergyDefault);

  return tReplace(t.engine.synergyTemplate, {
    examples,
    measures: synergies.slice(0, 3).join(", "),
  });
}

export default function CostEstimation({
  costs,
  totalMin,
  totalMax,
  companySize,
  generatedAt,
  totalFineExposure = 0,
  relevantRegulationNames = [],
  t,
}: CostEstimationProps) {
  const sizeLabel = t.cost.sizeLabels[companySize] ?? companySize;
  const avgCost = Math.round((totalMin + totalMax) / 2);
  const roiMultiple =
    totalFineExposure > 0 && avgCost > 0
      ? Math.round(totalFineExposure / avgCost)
      : 0;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.cost.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {tReplace(t.cost.subtitle, { sizeLabel })}
      </Text>

      {/* ── Total Range Box ── */}
      <View style={costStyles.totalBox}>
        <View>
          <Text style={costStyles.totalLabel}>{t.cost.totalCosts}</Text>
          <Text style={costStyles.totalValue}>
            {formatRange(totalMin, totalMax, t)}
          </Text>
        </View>
        <View>
          <Text style={costStyles.totalDetail}>
            {tReplace(t.cost.regulationsCount, { count: costs.length })}
          </Text>
          <Text style={costStyles.totalDetail}>{t.cost.exclSynergies}</Text>
        </View>
      </View>

      {/* ── Fine vs Cost Comparison ── */}
      {totalFineExposure > 0 && (
        <>
          <View style={costStyles.comparisonRow}>
            <View
              style={[
                costStyles.comparisonBox,
                {
                  backgroundColor: "#f0fdf4",
                  borderColor: "#bbf7d0",
                },
              ]}
            >
              <Text
                style={[
                  costStyles.comparisonLabel,
                  { color: "#16a34a" },
                ]}
              >
                {t.cost.complianceInvestment}
              </Text>
              <Text
                style={[
                  costStyles.comparisonValue,
                  { color: "#16a34a" },
                ]}
              >
                {formatEuro(avgCost, t)}
              </Text>
              <Text
                style={[
                  costStyles.comparisonDetail,
                  { color: "#15803d" },
                ]}
              >
                {t.cost.avgCostsLabel}
              </Text>
            </View>
            <View
              style={[
                costStyles.comparisonBox,
                {
                  backgroundColor: "#fef2f2",
                  borderColor: "#fecaca",
                },
              ]}
            >
              <Text
                style={[
                  costStyles.comparisonLabel,
                  { color: "#dc2626" },
                ]}
              >
                {t.cost.fineRisk}
              </Text>
              <Text
                style={[
                  costStyles.comparisonValue,
                  { color: "#dc2626" },
                ]}
              >
                {formatEuro(totalFineExposure, t)}
              </Text>
              <Text
                style={[
                  costStyles.comparisonDetail,
                  { color: "#b91c1c" },
                ]}
              >
                {t.cost.cumulativeFines}
              </Text>
            </View>
          </View>

          {/* ROI indicator */}
          {roiMultiple > 1 && (
            <View style={costStyles.roiBox}>
              <Text style={costStyles.roiLabel}>
                {t.cost.fineRiskIs}
              </Text>
              <Text style={costStyles.roiValue}>{roiMultiple}x</Text>
              <Text style={costStyles.roiLabel}>
                {t.cost.timesHigher}
              </Text>
              <Text style={costStyles.roiArrow}>{"\u2192"}</Text>
              <Text
                style={[costStyles.roiLabel, { color: COLORS.gold }]}
              >
                {t.cost.clearBusinessCase}
              </Text>
            </View>
          )}
        </>
      )}

      {/* ── Per-Regulation Breakdown ── */}
      {costs.map((cost) => (
        <View key={cost.key} style={costStyles.regBlock} wrap={false}>
          <View style={costStyles.regHeader}>
            <View style={costStyles.regHeaderLeft}>
              <View
                style={[
                  costStyles.regColorDot,
                  { backgroundColor: cost.color },
                ]}
              />
              <Text style={costStyles.regName}>{cost.name}</Text>
            </View>
            <Text style={costStyles.regRange}>
              {formatRange(cost.minCost, cost.maxCost, t)}
            </Text>
          </View>

          <View style={costStyles.breakdownContainer}>
            {cost.breakdown.map((item, i) => (
              <View key={i}>
                <View style={costStyles.breakdownRow}>
                  <Text style={costStyles.breakdownItem}>{item.item}</Text>
                  <Text style={costStyles.breakdownCost}>
                    {formatRange(item.min, item.max, t)}
                  </Text>
                </View>
                {i < cost.breakdown.length - 1 && (
                  <View style={costStyles.breakdownDivider} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* ── Dynamic Synergy Note ── */}
      <View style={costStyles.noteBox}>
        <Text style={costStyles.noteTitle}>{t.cost.synergiesTitle}</Text>
        <Text style={costStyles.noteText}>
          {buildSynergyText(relevantRegulationNames, t)}
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
