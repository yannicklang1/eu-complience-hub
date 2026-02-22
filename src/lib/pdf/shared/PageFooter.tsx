/* ══════════════════════════════════════════════════════════════
   PageFooter — Fixed footer for all white PDF pages
   Shows site name, page number, and generation disclaimer
   ══════════════════════════════════════════════════════════════ */

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { tReplace, type PDFMessages } from "@/i18n/pdf";
import { COLORS } from "./styles";

interface PageFooterProps {
  generatedAt: string;
  t: PDFMessages;
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

export default function PageFooter({ generatedAt, t }: PageFooterProps) {
  return (
    <View style={footerStyles.footer} fixed>
      <View style={footerStyles.row}>
        <Text style={footerStyles.siteName}>
          {t.footer.siteName}
        </Text>
        <Text
          style={footerStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            tReplace(t.footer.pageOf, { page: pageNumber, total: totalPages })
          }
        />
      </View>
      <Text style={footerStyles.disclaimer}>
        {tReplace(t.footer.generatedAt, { date: generatedAt })}
      </Text>
    </View>
  );
}
