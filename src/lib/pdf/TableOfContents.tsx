/* ══════════════════════════════════════════════════════════════
   TableOfContents — Professional table of contents page
   Lists all report sections with section numbers
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { PDFMessages } from "@/i18n/pdf";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";

interface TOCItem {
  number: string;
  title: string;
  description: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  generatedAt: string;
  reportId: string;
  t: PDFMessages;
}

const tocStyles = StyleSheet.create({
  reportIdRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
  },
  reportId: {
    fontFamily: "DMSans",
    fontSize: 7.5,
    color: COLORS.textLight,
    letterSpacing: 0.5,
  },
  tocItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  numberCol: {
    width: 32,
    marginRight: 12,
  },
  numberText: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 14,
    color: COLORS.gold,
  },
  contentCol: {
    flex: 1,
  },
  titleText: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.navy,
    marginBottom: 2,
  },
  descText: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
  },
  disclaimer: {
    marginTop: 24,
    padding: 14,
    backgroundColor: COLORS.offWhite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  disclaimerTitle: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 9,
    color: COLORS.navy,
    marginBottom: 4,
  },
  disclaimerText: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
  },
});

export default function TableOfContents({
  items,
  generatedAt,
  reportId,
  t,
}: TableOfContentsProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />

      <View style={tocStyles.reportIdRow}>
        <Text style={tocStyles.reportId}>{t.toc.reportNr}: {reportId}</Text>
      </View>

      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        {t.toc.title}
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        {t.toc.subtitle}
      </Text>

      {items.map((item) => (
        <View key={item.number} style={tocStyles.tocItem} wrap={false}>
          <View style={tocStyles.numberCol}>
            <Text style={tocStyles.numberText}>{item.number}</Text>
          </View>
          <View style={tocStyles.contentCol}>
            <Text style={tocStyles.titleText}>{item.title}</Text>
            <Text style={tocStyles.descText}>{item.description}</Text>
          </View>
        </View>
      ))}

      <View style={tocStyles.disclaimer}>
        <Text style={tocStyles.disclaimerTitle}>{t.toc.methodologyTitle}</Text>
        <Text style={tocStyles.disclaimerText}>
          {t.toc.methodologyText}
        </Text>
      </View>

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}
