/* ══════════════════════════════════════════════════════════════
   CoverPage — Dark navy cover with gold accent branding
   First page of the compliance report PDF
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "./shared/styles";

interface CoverPageProps {
  companyName: string;
  contactName: string;
  generatedAt: string;
  countryName?: string;
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
  content: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 60,
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
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  dateLabel: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textLight,
  },
  dateValue: {
    fontFamily: "DMSans",
    fontSize: 9,
    fontWeight: 700,
    color: COLORS.white,
  },
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
  branding: {
    fontFamily: "DMSans",
    fontSize: 7,
    color: COLORS.textLight,
    letterSpacing: 1,
  },
});

export default function CoverPage({
  companyName,
  contactName,
  generatedAt,
  countryName,
}: CoverPageProps) {
  return (
    <Page size="A4" style={coverStyles.page}>
      <View style={coverStyles.goldBar} />

      <View style={coverStyles.content}>
        <Text style={coverStyles.label}>EU Compliance Hub</Text>
        <Text style={coverStyles.title}>Ihr persoenlicher</Text>
        <Text style={coverStyles.titleAccent}>Compliance-Report</Text>

        <View style={coverStyles.divider} />

        <Text style={coverStyles.preparedFor}>Erstellt fuer</Text>
        <Text style={coverStyles.companyName}>{companyName}</Text>
        <Text style={coverStyles.contactName}>{contactName}</Text>

        <View style={coverStyles.dateRow}>
          <Text style={coverStyles.dateLabel}>Erstellungsdatum: </Text>
          <Text style={coverStyles.dateValue}>{generatedAt}</Text>
        </View>
        {countryName && (
          <View style={coverStyles.dateRow}>
            <Text style={coverStyles.dateLabel}>Land: </Text>
            <Text style={coverStyles.dateValue}>{countryName}</Text>
          </View>
        )}
      </View>

      <View style={coverStyles.footer}>
        <View style={coverStyles.footerDivider} />
        <Text style={coverStyles.disclaimer}>
          Dieser Report dient der Orientierung und ersetzt keine
          Rechtsberatung. Die enthaltenen Informationen basieren auf Ihren
          Angaben und den zum Erstellungszeitpunkt geltenden Regelungen.
        </Text>
        <Text style={coverStyles.branding}>
          eu-compliance-hub.eu
        </Text>
      </View>
    </Page>
  );
}
