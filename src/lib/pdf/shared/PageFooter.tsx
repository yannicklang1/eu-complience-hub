/* ══════════════════════════════════════════════════════════════
   PageFooter — Fixed footer for all white PDF pages
   Shows site name, page number, and generation disclaimer
   ══════════════════════════════════════════════════════════════ */

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS } from "./styles";

interface PageFooterProps {
  generatedAt: string;
}

const footerStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 20,
    left: 45,
    right: 45,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  siteName: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textSecondary,
  },
  pageNumber: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textSecondary,
  },
  disclaimer: {
    fontFamily: "DMSans",
    fontSize: 6.5,
    color: COLORS.textLight,
    marginTop: 3,
  },
});

export default function PageFooter({ generatedAt }: PageFooterProps) {
  return (
    <View style={footerStyles.footer} fixed>
      <View style={footerStyles.row}>
        <Text style={footerStyles.siteName}>
          EU Compliance Hub | eu-compliance-hub.eu
        </Text>
        <Text
          style={footerStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Seite ${pageNumber} von ${totalPages}`
          }
        />
      </View>
      <Text style={footerStyles.disclaimer}>
        Erstellt am {generatedAt} — Keine Rechtsberatung
      </Text>
    </View>
  );
}
