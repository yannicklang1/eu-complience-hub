/* ══════════════════════════════════════════════════════════════
   CostEstimation — Cost breakdown table for compliance budget
   Shows per-regulation costs and total range
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { RegulationCost } from "@/lib/cost-estimator";

interface CostEstimationProps {
  costs: RegulationCost[];
  totalMin: number;
  totalMax: number;
  companySize: string;
  generatedAt: string;
}

const COMPANY_SIZE_LABELS: Record<string, string> = {
  micro: "Kleinstunternehmen",
  small: "Kleinunternehmen",
  medium: "Mittleres Unternehmen",
  large: "Grossunternehmen",
};

const costStyles = StyleSheet.create({
  totalBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
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

function formatEuro(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k EUR`;
  }
  return `${amount.toLocaleString("de-AT")} EUR`;
}

function formatRange(min: number, max: number): string {
  return `${formatEuro(min)} – ${formatEuro(max)}`;
}

export default function CostEstimation({
  costs,
  totalMin,
  totalMax,
  companySize,
  generatedAt,
}: CostEstimationProps) {
  const sizeLabel = COMPANY_SIZE_LABELS[companySize] ?? companySize;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        Kostenschaetzung
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        Geschaetzte Implementierungskosten basierend auf Unternehmensgroesse: {sizeLabel}
      </Text>

      {/* ── Total Range Box ── */}
      <View style={costStyles.totalBox}>
        <View>
          <Text style={costStyles.totalLabel}>Geschaetzte Gesamtkosten</Text>
          <Text style={costStyles.totalValue}>
            {formatRange(totalMin, totalMax)}
          </Text>
        </View>
        <View>
          <Text style={costStyles.totalDetail}>
            {costs.length} Regulierungen
          </Text>
          <Text style={costStyles.totalDetail}>
            exkl. Synergien
          </Text>
        </View>
      </View>

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
              {formatRange(cost.minCost, cost.maxCost)}
            </Text>
          </View>

          <View style={costStyles.breakdownContainer}>
            {cost.breakdown.map((item, i) => (
              <View key={i}>
                <View style={costStyles.breakdownRow}>
                  <Text style={costStyles.breakdownItem}>{item.item}</Text>
                  <Text style={costStyles.breakdownCost}>
                    {formatRange(item.min, item.max)}
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

      {/* ── Synergy Note ── */}
      <View style={costStyles.noteBox}>
        <Text style={costStyles.noteTitle}>Synergieeffekte</Text>
        <Text style={costStyles.noteText}>
          Bei gleichzeitiger Umsetzung mehrerer Regulierungen (z.B. DSGVO +
          NIS2) koennen durch Synergien 20–40% der Kosten eingespart werden.
          Gemeinsame Massnahmen wie ISMS-Aufbau, Risikomanagement und
          Schulungen profitieren von Skaleneffekten.
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} />
    </Page>
  );
}
