/* ══════════════════════════════════════════════════════════════
   RegulationSection — Detail section for a single regulation
   Rendered once per hoch/mittel regulation in the report
   ══════════════════════════════════════════════════════════════ */

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "./shared/styles";
import type { EvaluatedRegulation } from "@/lib/regulation-evaluator";
import type { RegulationChecklist } from "@/data/checklist-data";

interface RegulationSectionProps {
  regulation: EvaluatedRegulation;
  checklist?: RegulationChecklist;
}

const RELEVANCE_STYLES: Record<
  "hoch" | "mittel" | "niedrig",
  { bg: string; text: string; label: string }
> = {
  hoch: { bg: "#dcfce7", text: "#166534", label: "Hohe Relevanz" },
  mittel: { bg: "#fef9c3", text: "#854d0e", label: "Mittlere Relevanz" },
  niedrig: { bg: "#f1f5f9", text: "#64748b", label: "Niedrige Relevanz" },
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
    fontSize: 9,
    color: COLORS.textLight,
    width: 14,
    marginTop: 1,
  },
  checkText: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
    flex: 1,
  },
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
  guideLink: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.info,
    marginTop: 8,
  },
});

export default function RegulationSection({
  regulation,
  checklist,
}: RegulationSectionProps) {
  const relevanceStyle = RELEVANCE_STYLES[regulation.relevance];

  return (
    <View style={secStyles.container} wrap={false}>
      <View style={secStyles.innerWrapper}>
        {/* Colored left border bar */}
        <View
          style={[secStyles.leftBar, { backgroundColor: regulation.color }]}
        />

        <View style={secStyles.content}>
          {/* Header with name and relevance badge */}
          <View style={secStyles.header}>
            <View style={secStyles.titleGroup}>
              <Text style={secStyles.regName}>{regulation.name}</Text>
              <Text style={secStyles.regSubtitle}>{regulation.subtitle}</Text>
            </View>
            <Text
              style={[
                secStyles.badge,
                {
                  backgroundColor: relevanceStyle.bg,
                  color: relevanceStyle.text,
                },
              ]}
            >
              {relevanceStyle.label}
            </Text>
          </View>

          {/* Reason */}
          <Text style={secStyles.sectionLabel}>Warum relevant</Text>
          <Text style={secStyles.reasonText}>{regulation.reason}</Text>

          {/* Checklist items */}
          {checklist && checklist.items.length > 0 && (
            <View style={secStyles.checklistContainer}>
              <Text style={secStyles.sectionLabel}>Checkliste</Text>
              {checklist.items.map((item) => (
                <View key={item.id} style={secStyles.checkItem}>
                  <Text style={secStyles.checkBullet}>{"\u2610"}</Text>
                  <Text style={secStyles.checkText}>{item.text}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Key fact: deadline */}
          {checklist?.deadline && (
            <View style={secStyles.factRow}>
              <Text style={secStyles.factIcon}>{"\u23F0"}</Text>
              <Text style={secStyles.factText}>
                Frist: {checklist.deadline}
              </Text>
            </View>
          )}

          {/* Guide reference */}
          <Text style={secStyles.guideLink}>
            Ausfuehrlicher Guide: eu-compliance-hub.eu{regulation.href}
          </Text>
        </View>
      </View>
    </View>
  );
}
