/* ══════════════════════════════════════════════════════════════
   CompanyProfile — Company profile and assessment scope page
   Mirrors all wizard inputs and shows what was evaluated
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { ReportInput } from "@/lib/report-engine";
import type { PDFMessages } from "@/i18n/pdf";

interface CompanyProfileProps {
  input: ReportInput;
  totalRegulations: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  countryName?: string;
  countryFlag?: string;
  generatedAt: string;
  t: PDFMessages;
}

const cpStyles = StyleSheet.create({
  infoBox: {
    backgroundColor: COLORS.navy,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textLight,
    width: 120,
  },
  infoValue: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 8.5,
    color: COLORS.white,
    flex: 1,
  },
  scopeSection: {
    marginBottom: 16,
  },
  scopeTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.navy,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 10,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tagText: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textPrimary,
  },
  tagHighlight: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  tagHighlightText: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 7.5,
    color: "#92400e",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  summaryBox: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  summaryNumber: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 22,
    marginBottom: 2,
  },
  summaryLabel: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  methodNote: {
    marginTop: 16,
    padding: 12,
    backgroundColor: COLORS.offWhite,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  methodText: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
  },
});

export default function CompanyProfile({
  input,
  totalRegulations,
  highCount,
  mediumCount,
  lowCount,
  countryName,
  countryFlag,
  generatedAt,
  t,
}: CompanyProfileProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.profile.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.profile.subtitle}
      </Text>

      {/* Company Info Box */}
      <View style={cpStyles.infoBox}>
        <View style={cpStyles.infoRow}>
          <Text style={cpStyles.infoLabel}>{t.profile.companyLabel}</Text>
          <Text style={cpStyles.infoValue}>{input.companyName}</Text>
        </View>
        <View style={cpStyles.infoRow}>
          <Text style={cpStyles.infoLabel}>{t.profile.contactLabel}</Text>
          <Text style={cpStyles.infoValue}>{input.contactName}</Text>
        </View>
        <View style={cpStyles.infoRow}>
          <Text style={cpStyles.infoLabel}>{t.profile.sizeLabel}</Text>
          <Text style={cpStyles.infoValue}>{t.profile.sizeLabels[input.companySize] ?? input.companySize}</Text>
        </View>
        {input.annualRevenue && (
          <View style={cpStyles.infoRow}>
            <Text style={cpStyles.infoLabel}>{t.profile.revenueLabel}</Text>
            <Text style={cpStyles.infoValue}>{t.profile.revenueLabels[input.annualRevenue] ?? input.annualRevenue}</Text>
          </View>
        )}
        <View style={cpStyles.infoRow}>
          <Text style={cpStyles.infoLabel}>{t.profile.industryLabel}</Text>
          <Text style={cpStyles.infoValue}>{input.branche || input.sectors.map((s) => t.profile.sectorLabels[s] ?? s).join(", ")}</Text>
        </View>
        {countryName && (
          <View style={[cpStyles.infoRow, { marginBottom: 0 }]}>
            <Text style={cpStyles.infoLabel}>{t.profile.countryLabel}</Text>
            <Text style={cpStyles.infoValue}>{countryFlag ? `${countryFlag} ` : ""}{countryName}</Text>
          </View>
        )}
      </View>

      {/* Sectors */}
      <View style={cpStyles.scopeSection}>
        <Text style={cpStyles.scopeTitle}>{t.profile.sectorsTitle}</Text>
        <View style={cpStyles.tagRow}>
          {input.sectors.map((s) => (
            <View key={s} style={cpStyles.tag}>
              <Text style={cpStyles.tagText}>{t.profile.sectorLabels[s] ?? s}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Activities */}
      {input.activities.length > 0 && (
        <View style={cpStyles.scopeSection}>
          <Text style={cpStyles.scopeTitle}>{t.profile.activitiesTitle}</Text>
          <View style={cpStyles.tagRow}>
            {input.activities.map((a) => (
              <View key={a} style={cpStyles.tagHighlight}>
                <Text style={cpStyles.tagHighlightText}>{t.profile.activityLabels[a] ?? a}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Data Types */}
      {input.dataTypes.length > 0 && (
        <View style={cpStyles.scopeSection}>
          <Text style={cpStyles.scopeTitle}>{t.profile.dataTypesTitle}</Text>
          <View style={cpStyles.tagRow}>
            {input.dataTypes.map((d) => (
              <View key={d} style={cpStyles.tag}>
                <Text style={cpStyles.tagText}>{t.profile.dataLabels[d] ?? d}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Assessment Scope Summary */}
      <View style={cpStyles.summaryRow}>
        <View style={cpStyles.summaryBox}>
          <Text style={[cpStyles.summaryNumber, { color: COLORS.navy }]}>{totalRegulations}</Text>
          <Text style={cpStyles.summaryLabel}>{t.profile.regulationsEvaluated}</Text>
        </View>
        <View style={cpStyles.summaryBox}>
          <Text style={[cpStyles.summaryNumber, { color: COLORS.danger }]}>{highCount}</Text>
          <Text style={cpStyles.summaryLabel}>{t.profile.highRelevance}</Text>
        </View>
        <View style={cpStyles.summaryBox}>
          <Text style={[cpStyles.summaryNumber, { color: COLORS.warning }]}>{mediumCount}</Text>
          <Text style={cpStyles.summaryLabel}>{t.profile.mediumRelevance}</Text>
        </View>
        <View style={cpStyles.summaryBox}>
          <Text style={[cpStyles.summaryNumber, { color: COLORS.textLight }]}>{lowCount}</Text>
          <Text style={cpStyles.summaryLabel}>{t.profile.lowRelevance}</Text>
        </View>
      </View>

      {/* Methodology Note */}
      <View style={cpStyles.methodNote}>
        <Text style={cpStyles.methodText}>
          {t.profile.methodologyNote}
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
