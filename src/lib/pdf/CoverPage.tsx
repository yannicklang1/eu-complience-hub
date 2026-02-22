/* ══════════════════════════════════════════════════════════════
   CoverPage — Enhanced dark navy cover with gold accent branding
   Report-Nr, VERTRAULICH stamp, country flag, professional layout
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { PDFMessages } from "@/i18n/pdf";
import { COLORS } from "./shared/styles";

interface CoverPageProps {
  companyName: string;
  contactName: string;
  generatedAt: string;
  countryName?: string;
  /* New premium props */
  reportId?: string;
  countryFlag?: string;
  t: PDFMessages;
}

const coverStyles = StyleSheet.create({
  page: {
    fontFamily: "DMSans",
    backgroundColor: COLORS.navy,
    paddingHorizontal: 50,
    paddingVertical: 0,
    position: "relative",
  },
  goldBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: COLORS.gold,
  },
  /* Report ID + VERTRAULICH header row */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  reportIdText: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  vertraulichBadge: {
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  vertraulichText: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 7,
    color: COLORS.gold,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  /* Main content */
  content: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
  },
  label: {
    fontFamily: "DMSans",
    fontSize: 8,
    letterSpacing: 2.5,
    textTransform: "uppercase",
    color: COLORS.gold,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 34,
    color: COLORS.white,
    lineHeight: 1.15,
    marginBottom: 6,
  },
  titleAccent: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 34,
    color: COLORS.gold,
    lineHeight: 1.15,
    marginBottom: 30,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: COLORS.gold,
    marginBottom: 28,
    borderRadius: 1,
  },
  preparedFor: {
    fontFamily: "DMSans",
    fontSize: 10,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  companyName: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 20,
    color: COLORS.white,
    marginBottom: 4,
  },
  contactName: {
    fontFamily: "DMSans",
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaLabel: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textLight,
  },
  metaValue: {
    fontFamily: "DMSans",
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.white,
  },
  countryFlag: {
    fontFamily: "DMSans",
    fontSize: 11,
    marginRight: 4,
  },
  /* Footer */
  footer: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
  },
  footerDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#1e3a5f",
    marginBottom: 14,
  },
  disclaimer: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
    lineHeight: 1.6,
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  branding: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textLight,
    letterSpacing: 1,
  },
  pageCount: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textLight,
  },
});

export default function CoverPage({
  companyName,
  contactName,
  generatedAt,
  countryName,
  reportId,
  countryFlag,
  t,
}: CoverPageProps) {
  return (
    <Page size="A4" style={coverStyles.page}>
      <View style={coverStyles.goldBar} />

      {/* ── Header: Report ID + VERTRAULICH ── */}
      <View style={coverStyles.headerRow}>
        {reportId ? (
          <Text style={coverStyles.reportIdText}>
            {t.toc.reportNr}: {reportId}
          </Text>
        ) : (
          <Text style={coverStyles.reportIdText} />
        )}
        <View style={coverStyles.vertraulichBadge}>
          <Text style={coverStyles.vertraulichText}>{t.cover.confidential}</Text>
        </View>
      </View>

      {/* ── Main Content ── */}
      <View style={coverStyles.content}>
        <Text style={coverStyles.label}>{t.cover.label}</Text>
        <Text style={coverStyles.title}>{t.cover.title}</Text>
        <Text style={coverStyles.titleAccent}>{t.cover.titleAccent}</Text>

        <View style={coverStyles.divider} />

        <Text style={coverStyles.preparedFor}>{t.cover.preparedFor}</Text>
        <Text style={coverStyles.companyName}>{companyName}</Text>
        <Text style={coverStyles.contactName}>{contactName}</Text>

        <View style={coverStyles.metaRow}>
          <Text style={coverStyles.metaLabel}>{t.cover.dateLabel}</Text>
          <Text style={coverStyles.metaValue}>{generatedAt}</Text>
        </View>
        {countryName && (
          <View style={coverStyles.metaRow}>
            <Text style={coverStyles.metaLabel}>{t.cover.countryLabel}</Text>
            {countryFlag && (
              <Text style={coverStyles.countryFlag}>{countryFlag}</Text>
            )}
            <Text style={coverStyles.metaValue}>{countryName}</Text>
          </View>
        )}
        {reportId && (
          <View style={coverStyles.metaRow}>
            <Text style={coverStyles.metaLabel}>{t.cover.referenceLabel}</Text>
            <Text style={coverStyles.metaValue}>{reportId}</Text>
          </View>
        )}
      </View>

      {/* ── Footer ── */}
      <View style={coverStyles.footer}>
        <View style={coverStyles.footerDivider} />
        <Text style={coverStyles.disclaimer}>
          {t.cover.disclaimer}
        </Text>
        <View style={coverStyles.footerRow}>
          <Text style={coverStyles.branding}>{t.cover.branding}</Text>
          <Text style={coverStyles.pageCount}>{t.cover.page}</Text>
        </View>
      </View>
    </Page>
  );
}
