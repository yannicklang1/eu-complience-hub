/* ══════════════════════════════════════════════════════════════
   NextSteps — Final page with action items, guide links, and CTA
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { EvaluatedRegulation } from "@/lib/regulation-evaluator";

interface NextStepsProps {
  topActions: string[];
  regulations: EvaluatedRegulation[];
  generatedAt: string;
}

const nsStyles = StyleSheet.create({
  actionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    backgroundColor: COLORS.offWhite,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.navy,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 1,
  },
  actionNumberText: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 13,
    color: COLORS.gold,
    textAlign: "center",
  },
  actionContent: {
    flex: 1,
  },
  actionText: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 10.5,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
  },
  guidesSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  guidesTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 13,
    color: COLORS.navy,
    marginBottom: 10,
  },
  guideRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingLeft: 4,
  },
  guideDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  guideName: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9.5,
    color: COLORS.textPrimary,
    width: 130,
  },
  guideUrl: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.info,
    flex: 1,
  },
  ctaBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 10,
    padding: 20,
    marginTop: 8,
  },
  ctaTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 15,
    color: COLORS.gold,
    marginBottom: 8,
  },
  ctaText: {
    fontFamily: "DMSans",
    fontSize: 9.5,
    color: COLORS.textLight,
    lineHeight: 1.7,
    marginBottom: 12,
  },
  ctaContact: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.white,
    lineHeight: 1.6,
  },
  ctaUrl: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.gold,
    marginTop: 4,
  },
  toolsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
    flexWrap: "wrap",
  },
  toolBadge: {
    backgroundColor: "#1e3a5f",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  toolBadgeText: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
  },
  brandingFooter: {
    marginTop: 20,
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  brandingText: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 1.6,
  },
});

const TOOLS = [
  { name: "Regulierung-Finder", path: "/tools/regulierung-finder" },
  { name: "Compliance-Checkliste", path: "/tools/compliance-checkliste" },
  { name: "Kosten-Kalkulator", path: "/tools/kosten-kalkulator" },
  { name: "Reifegrad-Check", path: "/tools/reifegrad-check" },
];

export default function NextSteps({
  topActions,
  regulations,
  generatedAt,
}: NextStepsProps) {
  const hochRegulations = regulations.filter((r) => r.relevance === "hoch");
  const mittelRegulations = regulations.filter((r) => r.relevance === "mittel");
  const guideRegulations = [...hochRegulations, ...mittelRegulations].slice(0, 8);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        Naechste Schritte
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        Empfohlene Massnahmen fuer Ihre Compliance-Umsetzung
      </Text>

      {/* ── Numbered Action Items ── */}
      {topActions.slice(0, 3).map((action, i) => (
        <View key={i} style={nsStyles.actionCard} wrap={false}>
          <View style={nsStyles.actionNumberCircle}>
            <Text style={nsStyles.actionNumberText}>{i + 1}</Text>
          </View>
          <View style={nsStyles.actionContent}>
            <Text style={nsStyles.actionText}>{action}</Text>
          </View>
        </View>
      ))}

      {/* ── Guide Links ── */}
      {guideRegulations.length > 0 && (
        <View style={nsStyles.guidesSection}>
          <Text style={nsStyles.guidesTitle}>
            Ihre relevanten Guides
          </Text>
          {guideRegulations.map((reg) => (
            <View key={reg.key} style={nsStyles.guideRow}>
              <View
                style={[nsStyles.guideDot, { backgroundColor: reg.color }]}
              />
              <Text style={nsStyles.guideName}>{reg.name}</Text>
              <Text style={nsStyles.guideUrl}>
                eu-compliance-hub.eu{reg.href}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* ── CTA Box ── */}
      <View style={nsStyles.ctaBox}>
        <Text style={nsStyles.ctaTitle}>
          Wir unterstuetzen Sie
        </Text>
        <Text style={nsStyles.ctaText}>
          Nutzen Sie unsere kostenlosen interaktiven Tools fuer eine vertiefte
          Analyse. Abonnieren Sie unseren Newsletter fuer aktuelle
          Regulierungsupdates oder kontaktieren Sie uns direkt fuer
          individuelle Beratung.
        </Text>
        <Text style={nsStyles.ctaContact}>
          Kontakt: eu-compliance-hub.eu/kontakt
        </Text>
        <Text style={nsStyles.ctaContact}>
          Newsletter: eu-compliance-hub.eu/newsletter
        </Text>
        <Text style={nsStyles.ctaUrl}>
          eu-compliance-hub.eu/tools
        </Text>

        <View style={nsStyles.toolsRow}>
          {TOOLS.map((tool) => (
            <View key={tool.path} style={nsStyles.toolBadge}>
              <Text style={nsStyles.toolBadgeText}>{tool.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Branding Footer ── */}
      <View style={nsStyles.brandingFooter}>
        <Text style={nsStyles.brandingText}>
          EU Compliance Hub — Ihr Navigator durch die EU-Regulierungslandschaft
        </Text>
        <Text style={nsStyles.brandingText}>
          eu-compliance-hub.eu
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} />
    </Page>
  );
}
