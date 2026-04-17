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

/** Label maps for the new personalization signals */
const CERT_LABELS: Record<string, string> = {
  "iso-27001": "ISO/IEC 27001",
  "iso-27701": "ISO/IEC 27701",
  "iso-9001": "ISO 9001",
  "soc2": "SOC 2 Type II",
  "tisax": "TISAX",
  "vds": "VdS 10000/10010",
  "bsi": "BSI IT-Grundschutz",
  "c5": "BSI C5",
  "nen-7510": "NEN 7510",
  "none": "Keine",
};

const IT_STACK_LABELS: Record<string, string> = {
  "aws": "AWS",
  "azure": "Microsoft Azure",
  "gcp": "Google Cloud (GCP)",
  "m365": "Microsoft 365",
  "google-workspace": "Google Workspace",
  "saas-heavy": "10+ SaaS-Apps",
  "on-premise": "On-Premise",
  "hybrid": "Hybrid",
  "eu-cloud": "EU-Only Cloud",
};

const EXPORT_LABELS: Record<string, string> = {
  "no-export": "Kein Drittlandstransfer",
  "us": "USA",
  "uk": "UK (Adequacy)",
  "ch": "Schweiz (Adequacy)",
  "india": "Indien",
  "china": "China",
  "other-third": "Andere Drittländer",
};

const INCIDENT_LABELS: Record<string, string> = {
  "no-incidents": "Keine Vorfälle",
  "data-breach": "Datenschutzvorfall",
  "ransomware": "Ransomware",
  "phishing": "Phishing-Angriff",
  "insider": "Insider-Bedrohung",
  "supply-chain": "Lieferketten-Vorfall",
  "audit-finding": "Kritische Audit-Feststellung",
  "dsb-complaint": "Beschwerde bei DSB",
};

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

      {/* Certifications */}
      {(input.certifications ?? []).filter((c) => c !== "none").length > 0 && (
        <View style={cpStyles.scopeSection}>
          <Text style={cpStyles.scopeTitle}>Bestehende Zertifizierungen</Text>
          <View style={cpStyles.tagRow}>
            {(input.certifications ?? []).filter((c) => c !== "none").map((c) => (
              <View key={c} style={[cpStyles.tag, { backgroundColor: "#ecfdf5", borderColor: "#a7f3d0" }]}>
                <Text style={[cpStyles.tagText, { color: "#047857", fontWeight: 700 }]}>
                  {CERT_LABELS[c] ?? c}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* IT Stack */}
      {(input.itStack ?? []).length > 0 && (
        <View style={cpStyles.scopeSection}>
          <Text style={cpStyles.scopeTitle}>IT-Umgebung</Text>
          <View style={cpStyles.tagRow}>
            {(input.itStack ?? []).map((s) => (
              <View key={s} style={cpStyles.tag}>
                <Text style={cpStyles.tagText}>{IT_STACK_LABELS[s] ?? s}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Data Export Countries */}
      {(input.dataExportCountries ?? []).length > 0 && (
        <View style={cpStyles.scopeSection}>
          <Text style={cpStyles.scopeTitle}>Datenexport außerhalb EU/EWR</Text>
          <View style={cpStyles.tagRow}>
            {(input.dataExportCountries ?? []).map((c) => (
              <View
                key={c}
                style={
                  c === "no-export"
                    ? cpStyles.tag
                    : ["us", "india", "china", "other-third"].includes(c)
                    ? [cpStyles.tag, { backgroundColor: "#fef2f2", borderColor: "#fecaca" }]
                    : [cpStyles.tag, { backgroundColor: "#fef3c7", borderColor: "#fde68a" }]
                }
              >
                <Text
                  style={
                    c === "no-export"
                      ? cpStyles.tagText
                      : ["us", "india", "china", "other-third"].includes(c)
                      ? [cpStyles.tagText, { color: "#991b1b", fontWeight: 700 }]
                      : [cpStyles.tagText, { color: "#92400e", fontWeight: 700 }]
                  }
                >
                  {EXPORT_LABELS[c] ?? c}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Incident History */}
      {(input.incidentHistory ?? []).filter((i) => i !== "no-incidents").length > 0 && (
        <View style={cpStyles.scopeSection}>
          <Text style={cpStyles.scopeTitle}>Vorfälle (letzte 24 Monate)</Text>
          <View style={cpStyles.tagRow}>
            {(input.incidentHistory ?? []).filter((i) => i !== "no-incidents").map((i) => (
              <View key={i} style={[cpStyles.tag, { backgroundColor: "#fef2f2", borderColor: "#fecaca" }]}>
                <Text style={[cpStyles.tagText, { color: "#991b1b", fontWeight: 700 }]}>
                  {INCIDENT_LABELS[i] ?? i}
                </Text>
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
