/* ══════════════════════════════════════════════════════════════
   SoftwareRecommendations — Tool recommendations page
   Shows top tools per regulation for the PDF report
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { type PDFMessages } from "@/i18n/pdf";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { ReportSoftwareRec } from "@/lib/report-engine";

interface SoftwareRecommendationsProps {
  recommendations: ReportSoftwareRec[];
  regulationNames: Record<string, string>;
  generatedAt: string;
  t: PDFMessages;
}

const swStyles = StyleSheet.create({
  toolCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    marginBottom: 8,
    overflow: "hidden",
  },
  toolContent: {
    flex: 1,
    padding: 10,
  },
  toolHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  toolName: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 11,
    color: COLORS.navy,
  },
  toolPrice: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 8.5,
    color: COLORS.gold,
    backgroundColor: "#fefce8",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  toolTagline: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  toolMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  regTag: {
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 3,
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  regTagText: {
    fontFamily: "DMSans",
    fontSize: 6.5,
    color: COLORS.textSecondary,
    fontWeight: 700,
  },
  targetTag: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textLight,
  },
  dachBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  dachDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  dachText: {
    fontFamily: "DMSans",
    fontSize: 6.5,
    color: COLORS.textLight,
  },
  noteBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.offWhite,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  noteText: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
  },
  noteUrl: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.info,
    marginTop: 4,
  },
});

function getDachLabel(relevance: number, t: PDFMessages): string {
  if (relevance >= 5) return t.software.dachFocus;
  if (relevance >= 4) return t.software.dachPresent;
  return t.software.international;
}

function getDachColor(relevance: number): string {
  if (relevance >= 5) return "#16a34a";
  if (relevance >= 4) return "#f59e0b";
  return "#94a3b8";
}

export default function SoftwareRecommendations({
  recommendations,
  regulationNames,
  generatedAt,
  t,
}: SoftwareRecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.software.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.software.subtitle}
      </Text>

      {recommendations.map((rec) => (
        <View key={rec.name} style={swStyles.toolCard} wrap={false}>
          <View style={swStyles.toolContent}>
            {/* Header: Name + Price */}
            <View style={swStyles.toolHeader}>
              <Text style={swStyles.toolName}>{rec.name}</Text>
              <Text style={swStyles.toolPrice}>{rec.priceRange}</Text>
            </View>

            {/* Tagline */}
            <Text style={swStyles.toolTagline}>{rec.tagline}</Text>

            {/* Meta: Regulation Tags + Target + DACH */}
            <View style={swStyles.toolMeta}>
              {rec.regulationKeys.map((key) => (
                <View key={key} style={swStyles.regTag}>
                  <Text style={swStyles.regTagText}>
                    {regulationNames[key] ?? key}
                  </Text>
                </View>
              ))}
              <Text style={swStyles.targetTag}>{rec.targetSize}</Text>
              <View style={swStyles.dachBadge}>
                <View
                  style={[
                    swStyles.dachDot,
                    { backgroundColor: getDachColor(rec.dachRelevance) },
                  ]}
                />
                <Text style={swStyles.dachText}>
                  {getDachLabel(rec.dachRelevance, t)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}

      {/* Disclaimer Note */}
      <View style={swStyles.noteBox}>
        <Text style={swStyles.noteText}>
          {t.software.disclaimerText}
        </Text>
        <Text style={swStyles.noteUrl}>
          {t.software.disclaimerUrl}
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
