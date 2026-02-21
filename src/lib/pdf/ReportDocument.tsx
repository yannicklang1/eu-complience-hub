/* ══════════════════════════════════════════════════════════════
   ReportDocument — Root PDF document composing all pages
   Entry point for @react-pdf/renderer rendering
   ══════════════════════════════════════════════════════════════ */

import { Document, Page, View, Text } from "@react-pdf/renderer";
import { styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import CoverPage from "./CoverPage";
import ExecutiveSummary from "./ExecutiveSummary";
import RegulationSection from "./RegulationSection";
import CostEstimation from "./CostEstimation";
import MaturityAssessment from "./MaturityAssessment";
import DeadlineTimeline from "./DeadlineTimeline";
import NextSteps from "./NextSteps";
import type { ReportData } from "@/lib/report-engine";

interface ReportDocumentProps {
  data: ReportData;
}

export default function ReportDocument({ data }: ReportDocumentProps) {
  const {
    input,
    generatedAt,
    regulations,
    highRelevanceCount,
    mediumRelevanceCount,
    lowRelevanceCount,
    costs,
    totalCostMin,
    totalCostMax,
    maturityResults,
    maturityPercentage,
    maturityGrade,
    relevantDeadlines,
    nextCriticalDeadline,
    relevantChecklists,
    topActions,
  } = data;

  // Filter regulations shown in detail: hoch and mittel
  const detailRegulations = regulations.filter(
    (r) => r.relevance === "hoch" || r.relevance === "mittel",
  );

  return (
    <Document
      title={`Compliance-Report — ${input.companyName}`}
      author="EU Compliance Hub"
      subject="Persoenlicher EU-Compliance-Report"
      creator="eu-compliance-hub.eu"
    >
      {/* 1. Cover Page (dark navy, no footer) */}
      <CoverPage
        companyName={input.companyName}
        contactName={input.contactName}
        generatedAt={generatedAt}
      />

      {/* 2. Executive Summary */}
      <ExecutiveSummary
        highCount={highRelevanceCount}
        mediumCount={mediumRelevanceCount}
        lowCount={lowRelevanceCount}
        maturityGrade={maturityGrade}
        maturityPercentage={maturityPercentage}
        totalCostMin={totalCostMin}
        totalCostMax={totalCostMax}
        nextDeadline={nextCriticalDeadline}
        topActions={topActions}
        generatedAt={generatedAt}
      />

      {/* 3. Regulation Sections (one section per hoch/mittel regulation) */}
      {detailRegulations.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.goldBar} />
          <Text
            style={[
              styles.h2,
              { color: "#0A2540", marginBottom: 2 },
            ]}
          >
            Regulierungsanalyse
          </Text>
          <Text style={[styles.bodySmall, styles.mb16]}>
            Detailauswertung der fuer Sie relevanten EU-Regulierungen
          </Text>

          {detailRegulations.map((reg) => {
            const checklist = relevantChecklists.find(
              (c) => c.key === reg.key,
            );
            return (
              <RegulationSection
                key={reg.key}
                regulation={reg}
                checklist={checklist}
              />
            );
          })}

          <PageFooter generatedAt={generatedAt} />
        </Page>
      )}

      {/* 4. Cost Estimation */}
      {costs.length > 0 && (
        <CostEstimation
          costs={costs}
          totalMin={totalCostMin}
          totalMax={totalCostMax}
          companySize={input.companySize}
          generatedAt={generatedAt}
        />
      )}

      {/* 5. Maturity Assessment */}
      <MaturityAssessment
        results={maturityResults}
        percentage={maturityPercentage}
        grade={maturityGrade}
        generatedAt={generatedAt}
      />

      {/* 6. Deadline Timeline */}
      <DeadlineTimeline
        deadlines={relevantDeadlines}
        generatedAt={generatedAt}
      />

      {/* 7. Next Steps */}
      <NextSteps
        topActions={topActions}
        regulations={regulations}
        generatedAt={generatedAt}
      />
    </Document>
  );
}
