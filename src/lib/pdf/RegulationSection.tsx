/* ══════════════════════════════════════════════════════════════
   RegulationSection — Enhanced detail section for a regulation
   Maturity-aware checklists, per-reg fine exposure, priority badge
   ══════════════════════════════════════════════════════════════ */

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "./shared/styles";
import { tReplace, type PDFMessages } from "@/i18n/pdf";
import type { EvaluatedRegulation } from "@/lib/regulation-evaluator";
import type { RegulationChecklist } from "@/data/checklist-data";
import type { CountryRegulationData } from "@/i18n/country/types";
import type { ChecklistItemStatus } from "@/lib/report-engine";
import type { FineExposureResult } from "@/data/fine-data";

interface RegulationSectionProps {
  regulation: EvaluatedRegulation;
  checklist?: RegulationChecklist;
  countryRegData?: CountryRegulationData;
  countryName?: string;
  /* New premium props */
  checklistStatuses?: ChecklistItemStatus[];
  fineExposure?: FineExposureResult;
  priority?: "sofort" | "kurzfristig" | "mittelfristig";
  t: PDFMessages;
}

const RELEVANCE_COLORS: Record<
  "hoch" | "mittel" | "niedrig",
  { bg: string; text: string }
> = {
  hoch: { bg: "#fef2f2", text: "#dc2626" },
  mittel: { bg: "#fefce8", text: "#854d0e" },
  niedrig: { bg: "#f1f5f9", text: "#64748b" },
};

const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  sofort: { bg: "#fef2f2", text: "#dc2626" },
  kurzfristig: { bg: "#fff7ed", text: "#ea580c" },
  mittelfristig: { bg: "#f0fdf4", text: "#16a34a" },
};

const STATUS_SYMBOLS: Record<string, { char: string; color: string }> = {
  compliant: { char: "\u2611", color: "#16a34a" },
  partial: { char: "\u25D0", color: "#f59e0b" },
  unchecked: { char: "\u2610", color: COLORS.textLight },
};

const secStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  innerWrapper: {
    flexDirection: "row",
  },
  leftBar: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  titleGroup: {
    flex: 1,
    marginRight: 10,
  },
  regName: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.navy,
    marginBottom: 2,
  },
  regSubtitle: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textSecondary,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 4,
    alignItems: "flex-start",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 7.5,
    fontFamily: "DMSans",
    fontWeight: 700,
  },
  sectionLabel: {
    fontFamily: "DMSans",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: COLORS.textLight,
    marginBottom: 4,
    marginTop: 10,
  },
  reasonText: {
    fontFamily: "DMSans",
    fontSize: 10,
    color: COLORS.textPrimary,
    lineHeight: 1.6,
  },
  /* Fine exposure inline */
  fineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fef2f2",
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  fineIcon: {
    fontFamily: "DMSans",
    fontSize: 10,
    marginRight: 6,
  },
  fineText: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: "#dc2626",
    fontWeight: 700,
    flex: 1,
  },
  fineArticle: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  /* Checklist */
  checklistContainer: {
    marginTop: 10,
    backgroundColor: COLORS.offWhite,
    borderRadius: 6,
    padding: 12,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  checkBullet: {
    fontFamily: "DMSans",
    fontSize: 10,
    width: 16,
    marginTop: 0,
  },
  checkText: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
    flex: 1,
  },
  checkTextCompliant: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: "#16a34a",
    lineHeight: 1.5,
    flex: 1,
  },
  checkTextPartial: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: "#92400e",
    lineHeight: 1.5,
    flex: 1,
  },
  /* Deadline fact */
  factRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fffbeb",
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  factIcon: {
    fontFamily: "DMSans",
    fontSize: 10,
    marginRight: 6,
  },
  factText: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 1.5,
  },
  /* Country info */
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#eff6ff",
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  countryLabel: {
    fontFamily: "DMSans",
    fontSize: 8,
    fontWeight: 700,
    color: "#1e40af",
    marginRight: 4,
  },
  countryValue: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 1.5,
  },
  /* Guide link */
  guideLink: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.info,
    marginTop: 8,
  },
  /* Maturity legend inline */
  maturityLegend: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  legendText: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textLight,
  },
});

export default function RegulationSection({
  regulation,
  checklist,
  countryRegData,
  countryName,
  checklistStatuses,
  fineExposure,
  priority,
  t,
}: RegulationSectionProps) {
  const relevanceColors = RELEVANCE_COLORS[regulation.relevance];
  const priorityColors = priority ? PRIORITY_COLORS[priority] : null;

  const RELEVANCE_LABELS: Record<"hoch" | "mittel" | "niedrig", string> = {
    hoch: t.regulation.relevanceHighLabel,
    mittel: t.regulation.relevanceMediumLabel,
    niedrig: t.regulation.relevanceLowLabel,
  };

  const PRIORITY_LABELS: Record<string, string> = {
    sofort: t.regulation.priorityImmediate,
    kurzfristig: t.regulation.priorityShortTerm,
    mittelfristig: t.regulation.priorityMediumTerm,
  };

  // Use maturity-aware statuses if available, otherwise fall back to plain checklist
  const items = checklistStatuses ?? checklist?.items.map((item) => ({
    id: item.id,
    text: item.text,
    status: "unchecked" as const,
  })) ?? [];

  const compliantCount = items.filter((i) => i.status === "compliant").length;
  const partialCount = items.filter((i) => i.status === "partial").length;
  const hasMaturityData = compliantCount > 0 || partialCount > 0;

  return (
    <View style={secStyles.container} wrap={false}>
      <View style={secStyles.innerWrapper}>
        <View
          style={[secStyles.leftBar, { backgroundColor: regulation.color }]}
        />

        <View style={secStyles.content}>
          {/* Header: Name + Badges */}
          <View style={secStyles.header}>
            <View style={secStyles.titleGroup}>
              <Text style={secStyles.regName}>{regulation.name}</Text>
              <Text style={secStyles.regSubtitle}>{regulation.subtitle}</Text>
            </View>
            <View style={secStyles.badgeRow}>
              {priorityColors && priority && (
                <Text
                  style={[
                    secStyles.badge,
                    {
                      backgroundColor: priorityColors.bg,
                      color: priorityColors.text,
                    },
                  ]}
                >
                  {PRIORITY_LABELS[priority]}
                </Text>
              )}
              <Text
                style={[
                  secStyles.badge,
                  {
                    backgroundColor: relevanceColors.bg,
                    color: relevanceColors.text,
                  },
                ]}
              >
                {RELEVANCE_LABELS[regulation.relevance]}
              </Text>
            </View>
          </View>

          {/* Why relevant */}
          <Text style={secStyles.sectionLabel}>{t.regulation.whyRelevant}</Text>
          <Text style={secStyles.reasonText}>{regulation.reason}</Text>

          {/* Fine exposure */}
          {fineExposure && (
            <View style={secStyles.fineRow}>
              <Text style={secStyles.fineIcon}>{"\u26A0"}</Text>
              <Text style={secStyles.fineText}>
                {t.regulation.fineLabel}{fineExposure.calculation}
              </Text>
              <Text style={secStyles.fineArticle}>
                {fineExposure.article}
              </Text>
            </View>
          )}

          {/* Maturity-aware checklist */}
          {items.length > 0 && (
            <View style={secStyles.checklistContainer}>
              <Text style={secStyles.sectionLabel}>
                {t.regulation.checklistTitle}
                {hasMaturityData
                  ? ` ${tReplace(t.regulation.checklistStatus, { compliant: compliantCount, partial: partialCount })}`
                  : ""}
              </Text>
              {items.map((item) => {
                const status = STATUS_SYMBOLS[item.status] ?? STATUS_SYMBOLS.unchecked;
                const textStyle =
                  item.status === "compliant"
                    ? secStyles.checkTextCompliant
                    : item.status === "partial"
                      ? secStyles.checkTextPartial
                      : secStyles.checkText;
                return (
                  <View key={item.id} style={secStyles.checkItem}>
                    <Text
                      style={[secStyles.checkBullet, { color: status.color }]}
                    >
                      {status.char}
                    </Text>
                    <Text style={textStyle}>{item.text}</Text>
                  </View>
                );
              })}

              {/* Mini legend */}
              {hasMaturityData && (
                <View style={secStyles.maturityLegend}>
                  <View style={secStyles.legendItem}>
                    <Text style={{ color: "#16a34a", fontSize: 9 }}>
                      {"\u2611"}
                    </Text>
                    <Text style={secStyles.legendText}>{t.regulation.legendCompliant}</Text>
                  </View>
                  <View style={secStyles.legendItem}>
                    <Text style={{ color: "#f59e0b", fontSize: 9 }}>
                      {"\u25D0"}
                    </Text>
                    <Text style={secStyles.legendText}>{t.regulation.legendPartial}</Text>
                  </View>
                  <View style={secStyles.legendItem}>
                    <Text style={{ color: COLORS.textLight, fontSize: 9 }}>
                      {"\u2610"}
                    </Text>
                    <Text style={secStyles.legendText}>{t.regulation.legendOpen}</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Deadline */}
          {checklist?.deadline && (
            <View style={secStyles.factRow}>
              <Text style={secStyles.factIcon}>{"\u23F0"}</Text>
              <Text style={secStyles.factText}>
                {t.regulation.deadlineLabel}{checklist.deadline}
              </Text>
            </View>
          )}

          {/* Country-specific info */}
          {countryRegData && countryName && (
            <View style={secStyles.countryRow}>
              <View style={{ flex: 1 }}>
                <Text style={secStyles.countryLabel}>{countryName}:</Text>
                {countryRegData.authority && (
                  <Text style={secStyles.countryValue}>
                    {t.regulation.authorityLabel}{countryRegData.authority}
                  </Text>
                )}
                {countryRegData.nationalLawName && (
                  <Text style={secStyles.countryValue}>
                    {t.regulation.nationalLawLabel}{countryRegData.nationalLawName}
                  </Text>
                )}
                {countryRegData.nationalFines && (
                  <Text style={secStyles.countryValue}>
                    {t.regulation.nationalFinesLabel}{countryRegData.nationalFines}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Guide reference */}
          <Text style={secStyles.guideLink}>
            {t.regulation.guideLabel}eu-compliance-hub.eu{regulation.href}
          </Text>
        </View>
      </View>
    </View>
  );
}
