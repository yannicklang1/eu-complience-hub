/* ══════════════════════════════════════════════════════════════
   NextSteps — Simplified final page with CTA + guide links
   Clean and focused on driving action
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { PDFMessages } from "@/i18n/pdf";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { EvaluatedRegulation } from "@/lib/regulation-evaluator";

interface NextStepsProps {
  topActions: string[];
  regulations: EvaluatedRegulation[];
  generatedAt: string;
  t: PDFMessages;
}

const nsStyles = StyleSheet.create({
  actionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    backgroundColor: COLORS.offWhite,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionNumberCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.navy,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginTop: 1,
  },
  actionNumberText: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.gold,
    textAlign: "center",
  },
  actionContent: {
    flex: 1,
  },
  actionText: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 10,
    color: COLORS.textPrimary,
    lineHeight: 1.5,
  },
  guidesSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  guidesTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.navy,
    marginBottom: 10,
  },
  guideRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
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
    fontSize: 9,
    color: COLORS.textPrimary,
    width: 120,
  },
  guideUrl: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.info,
    flex: 1,
  },
  ctaBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 10,
    padding: 20,
    marginTop: 4,
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
  ctaLinksRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 12,
  },
  ctaLink: {
    flex: 1,
  },
  ctaLinkLabel: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  ctaLinkUrl: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9,
    color: COLORS.gold,
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

export default function NextSteps({
  topActions,
  regulations,
  generatedAt,
  t,
}: NextStepsProps) {
  const hochRegulations = regulations.filter((r) => r.relevance === "hoch");
  const mittelRegulations = regulations.filter(
    (r) => r.relevance === "mittel",
  );
  const guideRegulations = [...hochRegulations, ...mittelRegulations].slice(
    0,
    6,
  );

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.nextSteps.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.nextSteps.subtitle}
      </Text>

      {/* ── Top 3 Actions ── */}
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
          <Text style={nsStyles.guidesTitle}>{t.nextSteps.guidesTitle}</Text>
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
          {t.nextSteps.ctaTitle}
        </Text>
        <Text style={nsStyles.ctaText}>
          {t.nextSteps.ctaText}
        </Text>

        <View style={nsStyles.ctaLinksRow}>
          <View style={nsStyles.ctaLink}>
            <Text style={nsStyles.ctaLinkLabel}>{t.nextSteps.ctaToolsLabel}</Text>
            <Text style={nsStyles.ctaLinkUrl}>
              eu-compliance-hub.eu/tools
            </Text>
          </View>
          <View style={nsStyles.ctaLink}>
            <Text style={nsStyles.ctaLinkLabel}>{t.nextSteps.ctaNewsletterLabel}</Text>
            <Text style={nsStyles.ctaLinkUrl}>
              eu-compliance-hub.eu/newsletter
            </Text>
          </View>
          <View style={nsStyles.ctaLink}>
            <Text style={nsStyles.ctaLinkLabel}>{t.nextSteps.ctaContactLabel}</Text>
            <Text style={nsStyles.ctaLinkUrl}>
              eu-compliance-hub.eu/kontakt
            </Text>
          </View>
        </View>
      </View>

      {/* ── Branding Footer ── */}
      <View style={nsStyles.brandingFooter}>
        <Text style={nsStyles.brandingText}>
          {t.nextSteps.branding}
        </Text>
        <Text style={nsStyles.brandingText}>eu-compliance-hub.eu</Text>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
