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

const STATUS_STYLES: Record<string, { bg: string; border: string; fill?: string }> = {
  compliant: { bg: "#16a34a", border: "#16a34a", fill: "#ffffff" },
  partial: { bg: "#f59e0b", border: "#f59e0b" },
  unchecked: { bg: "#ffffff", border: COLORS.textLight },
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
  fineIconBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#dc2626",
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  fineIconText: {
    fontFamily: "DMSans",
    fontSize: 8,
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1,
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
  checkBox: {
    width: 9,
    height: 9,
    borderRadius: 2,
    borderWidth: 1.2,
    marginRight: 7,
    marginTop: 2,
  },
  checkBoxInnerDash: {
    width: 5,
    height: 1.4,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 3.3,
    left: 1.5,
  },
  checkBoxInnerTick: {
    width: 2,
    height: 5,
    borderRightWidth: 1.4,
    borderBottomWidth: 1.4,
    borderColor: "#ffffff",
    position: "absolute",
    top: 1.3,
    left: 3,
    transform: "rotate(45deg)",
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
  factDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d97706",
    marginRight: 8,
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
    gap: 4,
  },
  legendBox: {
    width: 8,
    height: 8,
    borderRadius: 2,
    borderWidth: 1,
  },
  legendTick: {
    width: 2,
    height: 4,
    borderRightWidth: 1.2,
    borderBottomWidth: 1.2,
    borderColor: "#ffffff",
    position: "absolute",
    top: 0.8,
    left: 2.4,
    transform: "rotate(45deg)",
  },
  legendDash: {
    width: 4,
    height: 1.2,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 2.8,
    left: 1.2,
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
    <View style={secStyles.container}>
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
              <View style={secStyles.fineIconBadge}>
                <Text style={secStyles.fineIconText}>!</Text>
              </View>
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
                const s = STATUS_STYLES[item.status] ?? STATUS_STYLES.unchecked;
                const textStyle =
                  item.status === "compliant"
                    ? secStyles.checkTextCompliant
                    : item.status === "partial"
                      ? secStyles.checkTextPartial
                      : secStyles.checkText;
                return (
                  <View key={item.id} style={secStyles.checkItem}>
                    <View
                      style={[
                        secStyles.checkBox,
                        { backgroundColor: s.bg, borderColor: s.border },
                      ]}
                    >
                      {item.status === "compliant" && <View style={secStyles.checkBoxInnerTick} />}
                      {item.status === "partial" && <View style={secStyles.checkBoxInnerDash} />}
                    </View>
                    <Text style={textStyle}>{item.text}</Text>
                  </View>
                );
              })}

              {/* Mini legend */}
              {hasMaturityData && (
                <View style={secStyles.maturityLegend}>
                  <View style={secStyles.legendItem}>
                    <View style={[secStyles.legendBox, { backgroundColor: "#16a34a", borderColor: "#16a34a" }]}>
                      <View style={secStyles.legendTick} />
                    </View>
                    <Text style={secStyles.legendText}>{t.regulation.legendCompliant}</Text>
                  </View>
                  <View style={secStyles.legendItem}>
                    <View style={[secStyles.legendBox, { backgroundColor: "#f59e0b", borderColor: "#f59e0b" }]}>
                      <View style={secStyles.legendDash} />
                    </View>
                    <Text style={secStyles.legendText}>{t.regulation.legendPartial}</Text>
                  </View>
                  <View style={secStyles.legendItem}>
                    <View style={[secStyles.legendBox, { backgroundColor: "#ffffff", borderColor: COLORS.textLight }]} />
                    <Text style={secStyles.legendText}>{t.regulation.legendOpen}</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Deadline */}
          {checklist?.deadline && (
            <View style={secStyles.factRow}>
              <View style={secStyles.factDot} />
              <Text style={secStyles.factText}>
                {t.regulation.deadlineLabel}{checklist.deadline}
              </Text>
            </View>
          )}

          {/* Country-specific info */}
          {countryRegData && countryName && (
            <View style={secStyles.countryRow}>
              <View style={{ flex: 1 }}>
                <Text style={secStyles.countryLabel}>Nationale Umsetzung in {countryName}:</Text>
                {countryRegData.nationalLawName && (
                  <Text style={secStyles.countryValue}>
                    {t.regulation.nationalLawLabel}{countryRegData.nationalLawName}
                  </Text>
                )}
                {countryRegData.authority && (
                  <Text style={secStyles.countryValue}>
                    {t.regulation.authorityLabel}{countryRegData.authority}
                  </Text>
                )}
                {countryRegData.nationalDeadline && (
                  <Text style={secStyles.countryValue}>
                    Nationale Frist: {countryRegData.nationalDeadline}
                  </Text>
                )}
                {countryRegData.nationalFines && (
                  <Text style={secStyles.countryValue}>
                    {t.regulation.nationalFinesLabel}{countryRegData.nationalFines}
                  </Text>
                )}
                {countryRegData.nationalNotes && (
                  <Text style={[secStyles.countryValue, { marginTop: 4, color: COLORS.textSecondary }]}>
                    {countryRegData.nationalNotes}
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
