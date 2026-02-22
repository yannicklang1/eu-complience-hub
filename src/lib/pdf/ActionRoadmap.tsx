/* ══════════════════════════════════════════════════════════════
   ActionRoadmap — 3-phase remediation roadmap page
   Phase 1: Sofort (0-30 Tage), Phase 2: Kurzfristig (1-3 Mo),
   Phase 3: Mittelfristig (3-6 Mo)
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { type PDFMessages } from "@/i18n/pdf";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { RoadmapItem } from "@/lib/report-engine";

interface ActionRoadmapProps {
  items: RoadmapItem[];
  generatedAt: string;
  t: PDFMessages;
}

/** Styling-only constants kept at module level (no translatable text) */
const PHASE_COLORS: Record<number, { color: string; bg: string; border: string }> = {
  1: { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  2: { color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
  3: { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
};

const EFFORT_COLORS: Record<string, { bg: string; text: string }> = {
  niedrig: { bg: "#dcfce7", text: "#166534" },
  mittel: { bg: "#fef3c7", text: "#92400e" },
  hoch: { bg: "#fecaca", text: "#991b1b" },
};

const rmStyles = StyleSheet.create({
  phaseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 16,
  },
  phaseLabel: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
  },
  phaseTimeframe: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.navy,
  },
  phaseLine: {
    flex: 1,
    height: 1,
    marginLeft: 8,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },
  itemLeftBar: {
    width: 4,
  },
  itemContent: {
    flex: 1,
    padding: 10,
  },
  itemAction: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9.5,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  regBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  regBadgeText: {
    fontFamily: "DMSans",
    fontSize: 7,
    fontWeight: 700,
    color: COLORS.textSecondary,
  },
  effortBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  effortText: {
    fontFamily: "DMSans",
    fontSize: 7,
    fontWeight: 700,
  },
  responsibleText: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
  },
  quickWinBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#ecfdf5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6ee7b7",
  },
  quickWinTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 10,
    color: "#065f46",
    marginBottom: 4,
  },
  quickWinText: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: "#047857",
    lineHeight: 1.6,
  },
});

/** Get the translated effort label for a given effort key */
function getEffortLabel(effort: string, t: PDFMessages): string {
  if (effort === "niedrig") return t.roadmap.effortLow;
  if (effort === "hoch") return t.roadmap.effortHigh;
  return t.roadmap.effortMedium;
}

/** Get the translated phase label and timeframe for a given phase number */
function getPhaseMeta(phase: number, t: PDFMessages): { label: string; timeframe: string } {
  if (phase === 1) return { label: t.roadmap.phase1Label, timeframe: t.roadmap.phase1Time };
  if (phase === 3) return { label: t.roadmap.phase3Label, timeframe: t.roadmap.phase3Time };
  return { label: t.roadmap.phase2Label, timeframe: t.roadmap.phase2Time };
}

export default function ActionRoadmap({
  items,
  generatedAt,
  t,
}: ActionRoadmapProps) {
  const phases = [1, 2, 3] as const;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.roadmap.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.roadmap.subtitle}
      </Text>

      {phases.map((phase) => {
        const phaseItems = items.filter((item) => item.phase === phase);
        if (phaseItems.length === 0) return null;
        const colors = PHASE_COLORS[phase];
        const meta = getPhaseMeta(phase, t);

        return (
          <View key={phase}>
            {/* Phase Header */}
            <View style={rmStyles.phaseHeader}>
              <Text
                style={[
                  rmStyles.phaseLabel,
                  { backgroundColor: colors.bg, color: colors.color },
                ]}
              >
                {meta.label}
              </Text>
              <Text style={rmStyles.phaseTimeframe}>{meta.timeframe}</Text>
              <View style={[rmStyles.phaseLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Phase Items */}
            {phaseItems.map((item, i) => {
              const effortColors = EFFORT_COLORS[item.effort] ?? EFFORT_COLORS.mittel;
              return (
                <View
                  key={`${phase}-${i}`}
                  style={[rmStyles.itemContainer, { borderColor: colors.border }]}
                  wrap={false}
                >
                  <View style={[rmStyles.itemLeftBar, { backgroundColor: item.color }]} />
                  <View style={rmStyles.itemContent}>
                    <Text style={rmStyles.itemAction}>{item.action}</Text>
                    <View style={rmStyles.itemMeta}>
                      <View style={rmStyles.regBadge}>
                        <Text style={rmStyles.regBadgeText}>{item.regulationName}</Text>
                      </View>
                      <View style={[rmStyles.effortBadge, { backgroundColor: effortColors.bg }]}>
                        <Text style={[rmStyles.effortText, { color: effortColors.text }]}>
                          {t.roadmap.effortLabel}{getEffortLabel(item.effort, t)}
                        </Text>
                      </View>
                      <Text style={rmStyles.responsibleText}>{item.responsible}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        );
      })}

      {/* Quick Wins */}
      <View style={rmStyles.quickWinBox}>
        <Text style={rmStyles.quickWinTitle}>{t.roadmap.quickWinsTitle}</Text>
        <Text style={rmStyles.quickWinText}>
          {t.roadmap.quickWinsText}
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
