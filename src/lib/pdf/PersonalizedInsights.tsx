/* ══════════════════════════════════════════════════════════════
   PersonalizedInsights — THE differentiator page
   Synthesizes wizard signals (certs, IT stack, exports, incidents)
   into concrete, company-specific insights and a gap-summary.
   This is what makes the report worth 149 €.
   ══════════════════════════════════════════════════════════════ */

import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { COLORS, styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import type { ReportInput } from "@/lib/report-engine";
import type { EvaluatedRegulation } from "@/lib/regulation-evaluator";
import type { PDFMessages } from "@/i18n/pdf";

interface PersonalizedInsightsProps {
  input: ReportInput;
  regulations: EvaluatedRegulation[];
  maturityPercentage: number;
  generatedAt: string;
  t: PDFMessages;
}

const piStyles = StyleSheet.create({
  intro: {
    backgroundColor: COLORS.offWhite,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.gold,
    padding: 14,
    marginBottom: 18,
  },
  introText: {
    fontFamily: "DMSans",
    fontSize: 9,
    color: COLORS.textPrimary,
    lineHeight: 1.55,
  },
  insightGroup: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  groupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  groupTitle: {
    fontFamily: "Syne",
    fontWeight: 700,
    fontSize: 12,
    color: COLORS.navy,
  },
  insightRow: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
  },
  insightIconBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  insightIconText: {
    fontFamily: "Syne",
    fontWeight: 800,
    fontSize: 11,
  },
  insightText: {
    flex: 1,
  },
  insightLabel: {
    fontFamily: "DMSans",
    fontWeight: 700,
    fontSize: 8.5,
    color: COLORS.navy,
    marginBottom: 2,
  },
  insightDesc: {
    fontFamily: "DMSans",
    fontSize: 8,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
  },
  noSignal: {
    fontFamily: "DMSans",
    fontSize: 8.5,
    color: COLORS.textSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});

/* ── Signal generators: based on wizard inputs, produce human insights ── */

interface Insight {
  label: string;
  description: string;
  severity: "positive" | "warning" | "critical" | "neutral";
}

function buildCertInsights(certs: string[]): Insight[] {
  const items: Insight[] = [];
  const active = certs.filter((c) => c !== "none");
  if (active.length === 0) {
    items.push({
      label: "Keine Zertifizierungen dokumentiert",
      description: "Ohne Managementsystem-Basis starten Sie NIS2/DORA/CRA bei Null. ISO/IEC 27001 oder VdS 10000 sind die pragmatischsten Startpunkte für KMU.",
      severity: "warning",
    });
    return items;
  }
  if (certs.includes("iso-27001")) {
    items.push({
      label: "ISO/IEC 27001 — Starkes Fundament",
      description: "Deckt etwa 60–75% der NIS2 Art. 21-Maßnahmen. Gap-Arbeit v.a. bei Lieferantensicherheit, Business Continuity, GF-Schulung (Art. 20 NIS2).",
      severity: "positive",
    });
  }
  if (certs.includes("iso-27701")) {
    items.push({
      label: "ISO/IEC 27701 — Privacy-Plus",
      description: "Reduziert DSGVO-Gap erheblich. Art. 30 VVT, Art. 32 TOMs, Art. 35 DSFA sind prüfbar dokumentiert. Behörden erkennen 27701 als TOM-Nachweis.",
      severity: "positive",
    });
  }
  if (certs.includes("soc2")) {
    items.push({
      label: "SOC 2 Type II — US-Markt vorbereitet",
      description: "Gut für B2B-Vertrieb in die USA. Für NIS2 nicht ausreichend — ergänzen Sie ISO 27001 oder BSI IT-Grundschutz für EU-Anerkennung.",
      severity: "neutral",
    });
  }
  if (certs.includes("tisax")) {
    items.push({
      label: "TISAX — Automotive-konform",
      description: "Erfüllt Großteil der NIS2 Art. 21-Anforderungen, reicht aber bei Meldepflichten (Art. 23) und Governance (Art. 20) nicht aus.",
      severity: "positive",
    });
  }
  if (certs.includes("vds")) {
    items.push({
      label: "VdS 10000/10010 — Pragmatische KMU-Basis",
      description: "Ideal für 10–250 MA. Kann als Einstieg für NIS2 dienen, für \"wesentliche\" Einrichtungen reicht es langfristig nicht.",
      severity: "neutral",
    });
  }
  if (certs.includes("bsi") || certs.includes("c5")) {
    items.push({
      label: "BSI IT-Grundschutz / C5",
      description: "Besonders wertvoll für Behörden-Zulieferer und Cloud-Anbieter. Deckt NIS2-Anforderungen vollständig ab.",
      severity: "positive",
    });
  }
  return items;
}

function buildStackInsights(stack: string[]): Insight[] {
  const items: Insight[] = [];
  if (stack.length === 0) return items;

  const hasUSCloud = stack.some((s) => ["aws", "azure", "gcp", "m365", "google-workspace"].includes(s));
  const hasEUCloud = stack.includes("eu-cloud");
  const hasOnPrem = stack.includes("on-premise");
  const hasHybrid = stack.includes("hybrid");

  if (hasUSCloud && !hasEUCloud) {
    items.push({
      label: "US-Cloud-Stack ohne EU-Alternative",
      description: "DSGVO Kap. V zwingend: EU-US Data Privacy Framework oder SCC + TIA. Bei sensiblen Daten: EU-Cloud-Option (OVH, Hetzner, IONOS) evaluieren.",
      severity: "warning",
    });
  }
  if (stack.includes("m365")) {
    items.push({
      label: "Microsoft 365 — Sonderprüfung erforderlich",
      description: "EU-US DPF (seit Juli 2023 aktiv) reicht als Grundlage. Zusätzlich: Data Residency auf EU, Customer Lockbox aktivieren, M365-DSFA dokumentieren.",
      severity: "warning",
    });
  }
  if (stack.includes("saas-heavy")) {
    items.push({
      label: "SaaS-lastiger Betrieb — TPRM kritisch",
      description: "Bei 10+ Drittanbietern verlangen NIS2 Art. 21 Abs. 2 lit. d und DORA Art. 28–30 ein formales Third-Party-Risk-Management inkl. Vertragspflichten.",
      severity: "warning",
    });
  }
  if (hasEUCloud && !hasUSCloud) {
    items.push({
      label: "EU-Only Cloud-Strategie",
      description: "Datenschutzrechtlich risikoarm. Kein Transfer Impact Assessment nötig. Prüfen Sie Resilience bei DORA-Pflichten (Art. 12 Backup-Anforderungen).",
      severity: "positive",
    });
  }
  if (hasOnPrem || hasHybrid) {
    items.push({
      label: hasHybrid ? "Hybride Umgebung" : "On-Premise-Betrieb",
      description: "Interner Perimeter-Schutz entscheidend. Patch-Management, Backup-Strategie (3-2-1) und physische Zugangskontrolle sind Kernthemen der NIS2-Prüfung.",
      severity: "neutral",
    });
  }
  return items;
}

function buildExportInsights(exports: string[]): Insight[] {
  const items: Insight[] = [];
  if (exports.includes("no-export") && exports.length === 1) {
    items.push({
      label: "Kein Drittlandstransfer",
      description: "DSGVO Kapitel V nicht relevant. Nur interne Auftragsverarbeitungsverträge (Art. 28) und Aufsichtsverträge prüfen.",
      severity: "positive",
    });
    return items;
  }
  if (exports.includes("us")) {
    items.push({
      label: "Datentransfer USA",
      description: "Nutzung von EU-US Data Privacy Framework prüfen (Anbieter muss zertifiziert sein). Alternative: EU-SCC 2021 Modul 2/3 + Transfer Impact Assessment.",
      severity: "critical",
    });
  }
  if (exports.includes("india") || exports.includes("china") || exports.includes("other-third")) {
    items.push({
      label: "Transfer in Drittländer ohne Adequacy",
      description: "SCC + TIA zwingend. Bei China/Indien: zusätzliche Schutzmaßnahmen (Pseudonymisierung, Verschlüsselung, Zugriffsbeschränkungen) dokumentieren.",
      severity: "critical",
    });
  }
  if (exports.includes("uk")) {
    items.push({
      label: "UK-Transfer unter Adequacy-Beschluss",
      description: "UK-Adequacy-Entscheidung 2021 gilt bis Juni 2025, verlängert bis 2029. Keine SCC nötig, aber Überwachung ob Adequacy-Review positiv ausfällt.",
      severity: "neutral",
    });
  }
  if (exports.includes("ch")) {
    items.push({
      label: "Schweiz-Transfer unter Adequacy",
      description: "Schweizer Adequacy-Beschluss bleibt gültig. Bei Swiss-US DPF Transfers (weitergeleitete Daten) prüfen Sie die Kette.",
      severity: "positive",
    });
  }
  return items;
}

function buildProductInsights(products: string[]): Insight[] {
  const items: Insight[] = [];
  if (products.length === 0 || (products.length === 1 && products[0] === "none")) return items;

  const dppCats = products.filter((p) => ["batteries", "textiles", "electronics", "furniture", "building", "chemicals"].includes(p));
  if (dppCats.length > 0) {
    items.push({
      label: "Digitaler Produktpass (ESPR) erforderlich",
      description: `Ihre Produktkategorien (${dppCats.join(", ")}) fallen unter den gestaffelten DPP-Rollout. Batterien (Feb. 2027) haben Priorität — QR-/NFC-Anbindung, Lebenszyklus-Daten und CO₂-Fußabdruck sind Pflichtangaben.`,
      severity: "warning",
    });
  }
  if (products.includes("ebooks") || products.includes("terminals")) {
    items.push({
      label: "Barrierefreiheitspflicht für Produkte",
      description: "E-Books und Self-Service-/Zahlungsterminals sind explizit im BaFG-Anwendungsbereich. EN 301 549 + WCAG 2.1 AA sind zwingend, Konformitätserklärung erforderlich.",
      severity: "warning",
    });
  }
  if (products.includes("medical")) {
    items.push({
      label: "Medizinprodukte — zusätzliche MDR-Pflichten",
      description: "Zusätzlich zu CRA gelten MDR (EU 2017/745) mit Klasse I–III-Klassifizierung und AI Act Annex I bei KI-gestützten Geräten. Notified Body nötig.",
      severity: "critical",
    });
  }
  if (products.includes("software-product") && !products.includes("hardware-consumer") && !products.includes("hardware-b2b")) {
    items.push({
      label: "Reine Software-Produkte",
      description: "CRA greift bei Software-Produkten, die in Verkehr gebracht werden (Apps zum Download, Plugins, Firmware). Reine SaaS-Dienste sind ausgenommen, aber Produkthaftung (PLD) greift jetzt auch hier.",
      severity: "warning",
    });
  }
  if (products.includes("hardware-consumer") || products.includes("hardware-b2b") || products.includes("electronics")) {
    items.push({
      label: "Hardware-Produkte — CE-Kennzeichnung + SBOM",
      description: "CE-Kennzeichnung nach CRA ab 11. Dez. 2027 verpflichtend. Software Bill of Materials (SBOM) im TAD-Ordner, 5+ Jahre Sicherheitsupdates.",
      severity: "warning",
    });
  }
  return items;
}

function buildClaimsInsights(claims: string[]): Insight[] {
  const items: Insight[] = [];
  if (claims.length === 0 || (claims.length === 1 && claims[0] === "none")) return items;

  const strong = claims.filter((c) => ["climate-neutral", "sustainable", "green"].includes(c));
  if (strong.length > 0) {
    items.push({
      label: "Starke Umweltaussagen im Risiko-Bereich",
      description: `Aussagen wie "${strong.join(", ")}" sind nach Green Claims Directive + ECD nachweispflichtig. Ohne wissenschaftlichen Nachweis (LCA) droht ab März 2026 ein Werbeverbot. Lebenszyklusanalyse + unabhängige Verifizierung vorbereiten.`,
      severity: "critical",
    });
  }
  if (claims.includes("offset")) {
    items.push({
      label: "CO₂-Kompensation als Alleinstellung nicht mehr zulässig",
      description: "Die ECD verbietet ab 2026 die Bewerbung von Produkten als klimaneutral allein auf Basis von Kompensationsprojekten. Reduktion + Vermeidung müssen nachvollziehbar dargestellt werden.",
      severity: "critical",
    });
  }
  if (claims.includes("recyclable")) {
    items.push({
      label: "Recycling-Angaben substantiieren",
      description: "Konkrete Prozentsätze (z.B. \"70% recycelt\") müssen durch Lieferkettendokumentation belegbar sein. Labels wie \"Der Grüne Punkt\" reichen nicht als Nachweis.",
      severity: "warning",
    });
  }
  if (claims.includes("eco-labels")) {
    items.push({
      label: "Eigene Öko-Labels kritisch prüfen",
      description: "Selbst vergebene Nachhaltigkeits-Siegel sind ab 2026 nur noch dann zulässig, wenn sie ausdrücklich als Unternehmens-eigen gekennzeichnet sind. EU Ecolabel bleibt Gold-Standard.",
      severity: "warning",
    });
  }
  return items;
}

function buildIncidentInsights(incidents: string[]): Insight[] {
  const items: Insight[] = [];
  if (incidents.length === 0 || (incidents.length === 1 && incidents[0] === "no-incidents")) {
    items.push({
      label: "Keine dokumentierten Vorfälle",
      description: "Positiv. Stellen Sie sicher, dass das Incident-Detection funktioniert (SIEM/Logging) — NIS2/DORA verlangen proaktive Erkennung.",
      severity: "positive",
    });
    return items;
  }
  if (incidents.includes("data-breach")) {
    items.push({
      label: "Datenschutzvorfall aufgetreten",
      description: "Dokumentation nach Art. 33 DSGVO prüfen: 72h-Meldung an DSB erfolgt? Betroffenen-Information (Art. 34) durchgeführt? Verschärfte Aufsicht wahrscheinlich.",
      severity: "critical",
    });
  }
  if (incidents.includes("ransomware")) {
    items.push({
      label: "Ransomware-Vorfall",
      description: "Ab NIS2-Inkrafttreten wäre 24h-Frühwarnung + 72h-Incident-Meldung Pflicht gewesen. Lessons-Learned und Incident-Response-Plan priorisieren.",
      severity: "critical",
    });
  }
  if (incidents.includes("phishing")) {
    items.push({
      label: "Erfolgreicher Phishing-Angriff",
      description: "Menschlicher Faktor als Hauptrisiko. Awareness-Trainings und Phishing-Simulationen einführen. MFA (Multi-Factor-Auth) überall ausrollen.",
      severity: "warning",
    });
  }
  if (incidents.includes("insider")) {
    items.push({
      label: "Insider-Bedrohung",
      description: "Zugriffsrechte-Review (RBAC), DLP-Maßnahmen und Offboarding-Prozesse kritisch prüfen. DSB-Meldung war ggf. erforderlich (Art. 33).",
      severity: "critical",
    });
  }
  if (incidents.includes("supply-chain")) {
    items.push({
      label: "Lieferketten-Vorfall",
      description: "NIS2 Art. 21 Abs. 2 lit. d wird relevant. Dritt-Parteien-Verträge mit Sicherheitsanforderungen, SBOM-Pflicht, Audit-Rechte festlegen.",
      severity: "warning",
    });
  }
  if (incidents.includes("audit-finding")) {
    items.push({
      label: "Kritische Audit-Feststellung",
      description: "Findings als Gap-Treiber in Roadmap Phase 1 aufnehmen. Folgeprüfung nach 6 Monaten planen.",
      severity: "warning",
    });
  }
  if (incidents.includes("dsb-complaint")) {
    items.push({
      label: "DSB-Beschwerde registriert",
      description: "Anspruchsvolle Rolle. Transparenz zur DSB aufbauen, Datenschutzorganisation stärken. Kompetente Beratung zu DSGVO-Verfahrensrecht empfehlenswert.",
      severity: "critical",
    });
  }
  return items;
}

function severityColors(s: Insight["severity"]): { bg: string; border: string; text: string } {
  switch (s) {
    case "positive": return { bg: "#ecfdf5", border: "#a7f3d0", text: "#047857" };
    case "warning": return { bg: "#fef3c7", border: "#fde68a", text: "#92400e" };
    case "critical": return { bg: "#fef2f2", border: "#fecaca", text: "#991b1b" };
    case "neutral":
    default: return { bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" };
  }
}

function severityIcon(s: Insight["severity"]): string {
  switch (s) {
    case "positive": return "✓";
    case "warning": return "!";
    case "critical": return "!";
    case "neutral":
    default: return "i";
  }
}

export default function PersonalizedInsights({
  input,
  regulations,
  maturityPercentage,
  generatedAt,
  t,
}: PersonalizedInsightsProps) {
  const certs = input.certifications ?? [];
  const stack = input.itStack ?? [];
  const exports = input.dataExportCountries ?? [];
  const incidents = input.incidentHistory ?? [];
  const products = input.productCategories ?? [];
  const claims = input.marketingClaims ?? [];

  const certInsights = buildCertInsights(certs);
  const stackInsights = buildStackInsights(stack);
  const exportInsights = buildExportInsights(exports);
  const incidentInsights = buildIncidentInsights(incidents);
  const productInsights = buildProductInsights(products);
  const claimsInsights = buildClaimsInsights(claims);

  const highRegs = regulations.filter((r) => r.relevance === "hoch");
  const hasAnySignals =
    certInsights.length > 0 ||
    stackInsights.length > 0 ||
    exportInsights.length > 0 ||
    incidentInsights.length > 0 ||
    productInsights.length > 0 ||
    claimsInsights.length > 0;

  const introText = buildIntroText(input, highRegs, maturityPercentage);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.goldBar} />
      <Text style={[styles.h2, { color: COLORS.navy, marginBottom: 2 }]}>
        Ihre personalisierte Lagebewertung
      </Text>
      <Text style={[styles.bodySmall, styles.mb16]}>
        Synthese aus Zertifizierungen, IT-Umgebung, Datentransfers und Vorfall-Historie
      </Text>

      {/* Intro */}
      <View style={piStyles.intro} wrap={false}>
        <Text style={piStyles.introText}>{introText}</Text>
      </View>

      {!hasAnySignals && (
        <Text style={piStyles.noSignal}>
          Keine zusätzlichen Signale angegeben. Vollständige Personalisierung erhalten Sie, wenn Sie in einem
          späteren Report-Update die Fragen zu Zertifizierungen, IT-Stack, Datenexport und Vorfall-Historie
          beantworten.
        </Text>
      )}

      {/* Certifications */}
      {certInsights.length > 0 && (
        <View style={piStyles.insightGroup}>
          <View style={piStyles.groupHeader}>
            <View style={[piStyles.groupDot, { backgroundColor: "#059669" }]} />
            <Text style={piStyles.groupTitle}>Zertifizierungen & Reife</Text>
          </View>
          {certInsights.map((ins, i) => {
            const sc = severityColors(ins.severity);
            return (
              <View key={i} style={piStyles.insightRow} wrap={false}>
                <View style={[piStyles.insightIconBox, { backgroundColor: sc.bg, borderWidth: 1, borderColor: sc.border }]}>
                  <Text style={[piStyles.insightIconText, { color: sc.text }]}>{severityIcon(ins.severity)}</Text>
                </View>
                <View style={piStyles.insightText}>
                  <Text style={piStyles.insightLabel}>{ins.label}</Text>
                  <Text style={piStyles.insightDesc}>{ins.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Products */}
      {productInsights.length > 0 && (
        <View style={piStyles.insightGroup}>
          <View style={piStyles.groupHeader}>
            <View style={[piStyles.groupDot, { backgroundColor: "#d97706" }]} />
            <Text style={piStyles.groupTitle}>Produkte &amp; Produktverantwortung</Text>
          </View>
          {productInsights.map((ins, i) => {
            const sc = severityColors(ins.severity);
            return (
              <View key={i} style={piStyles.insightRow} wrap={false}>
                <View style={[piStyles.insightIconBox, { backgroundColor: sc.bg, borderWidth: 1, borderColor: sc.border }]}>
                  <Text style={[piStyles.insightIconText, { color: sc.text }]}>{severityIcon(ins.severity)}</Text>
                </View>
                <View style={piStyles.insightText}>
                  <Text style={piStyles.insightLabel}>{ins.label}</Text>
                  <Text style={piStyles.insightDesc}>{ins.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Marketing Claims */}
      {claimsInsights.length > 0 && (
        <View style={piStyles.insightGroup}>
          <View style={piStyles.groupHeader}>
            <View style={[piStyles.groupDot, { backgroundColor: "#16a34a" }]} />
            <Text style={piStyles.groupTitle}>Werbeaussagen &amp; Green Claims</Text>
          </View>
          {claimsInsights.map((ins, i) => {
            const sc = severityColors(ins.severity);
            return (
              <View key={i} style={piStyles.insightRow} wrap={false}>
                <View style={[piStyles.insightIconBox, { backgroundColor: sc.bg, borderWidth: 1, borderColor: sc.border }]}>
                  <Text style={[piStyles.insightIconText, { color: sc.text }]}>{severityIcon(ins.severity)}</Text>
                </View>
                <View style={piStyles.insightText}>
                  <Text style={piStyles.insightLabel}>{ins.label}</Text>
                  <Text style={piStyles.insightDesc}>{ins.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* IT Stack */}
      {stackInsights.length > 0 && (
        <View style={piStyles.insightGroup}>
          <View style={piStyles.groupHeader}>
            <View style={[piStyles.groupDot, { backgroundColor: "#0891b2" }]} />
            <Text style={piStyles.groupTitle}>IT-Umgebung & Lieferantenrisiko</Text>
          </View>
          {stackInsights.map((ins, i) => {
            const sc = severityColors(ins.severity);
            return (
              <View key={i} style={piStyles.insightRow} wrap={false}>
                <View style={[piStyles.insightIconBox, { backgroundColor: sc.bg, borderWidth: 1, borderColor: sc.border }]}>
                  <Text style={[piStyles.insightIconText, { color: sc.text }]}>{severityIcon(ins.severity)}</Text>
                </View>
                <View style={piStyles.insightText}>
                  <Text style={piStyles.insightLabel}>{ins.label}</Text>
                  <Text style={piStyles.insightDesc}>{ins.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Export Countries */}
      {exportInsights.length > 0 && (
        <View style={piStyles.insightGroup}>
          <View style={piStyles.groupHeader}>
            <View style={[piStyles.groupDot, { backgroundColor: "#7c3aed" }]} />
            <Text style={piStyles.groupTitle}>Internationale Datentransfers</Text>
          </View>
          {exportInsights.map((ins, i) => {
            const sc = severityColors(ins.severity);
            return (
              <View key={i} style={piStyles.insightRow} wrap={false}>
                <View style={[piStyles.insightIconBox, { backgroundColor: sc.bg, borderWidth: 1, borderColor: sc.border }]}>
                  <Text style={[piStyles.insightIconText, { color: sc.text }]}>{severityIcon(ins.severity)}</Text>
                </View>
                <View style={piStyles.insightText}>
                  <Text style={piStyles.insightLabel}>{ins.label}</Text>
                  <Text style={piStyles.insightDesc}>{ins.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Incidents */}
      {incidentInsights.length > 0 && (
        <View style={piStyles.insightGroup}>
          <View style={piStyles.groupHeader}>
            <View style={[piStyles.groupDot, { backgroundColor: "#dc2626" }]} />
            <Text style={piStyles.groupTitle}>Vorfall-Historie & Lessons Learned</Text>
          </View>
          {incidentInsights.map((ins, i) => {
            const sc = severityColors(ins.severity);
            return (
              <View key={i} style={piStyles.insightRow} wrap={false}>
                <View style={[piStyles.insightIconBox, { backgroundColor: sc.bg, borderWidth: 1, borderColor: sc.border }]}>
                  <Text style={[piStyles.insightIconText, { color: sc.text }]}>{severityIcon(ins.severity)}</Text>
                </View>
                <View style={piStyles.insightText}>
                  <Text style={piStyles.insightLabel}>{ins.label}</Text>
                  <Text style={piStyles.insightDesc}>{ins.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <PageFooter generatedAt={generatedAt} t={t} />
    </Page>
  );
}

function buildIntroText(input: ReportInput, highRegs: EvaluatedRegulation[], maturityPct: number): string {
  const size = (input.companySize === "micro" ? "Kleinstunternehmen" :
               input.companySize === "small" ? "Kleinunternehmen" :
               input.companySize === "medium" ? "mittelständisches Unternehmen" : "Großunternehmen");
  const industry = input.branche || "Ihr Sektor";
  const topRegs = highRegs.slice(0, 3).map((r) => r.name).join(", ") || "keine Hoch-Risiko-Regulierungen";
  const maturityLabel = maturityPct >= 70 ? "fortgeschrittenen" : maturityPct >= 40 ? "mittleren" : "frühen";

  return `Als ${size} in der Branche "${industry}" ist Ihre aktuelle Compliance-Reife im ${maturityLabel} Stadium (${maturityPct}%). Die höchste Priorität liegt auf ${topRegs}. Auf dieser Seite fassen wir zusammen, welche konkreten Signale aus Ihren Angaben wir in die Empfehlungen einfließen ließen — jede folgende Seite baut darauf auf.`;
}
