/* ══════════════════════════════════════════════════════════════
   ReportDocument — Premium PDF document composing all pages
   Entry point for @react-pdf/renderer rendering
   New structure: Cover → TOC → ExecSummary → CompanyProfile →
   RiskExposure → RegulationAnalysis → Maturity → Cost →
   Deadlines → Roadmap → Software → NextSteps
   Supports multilingual output via PDFMessages (t prop)
   ══════════════════════════════════════════════════════════════ */

import { Document, Page, View, Text } from "@react-pdf/renderer";
import { styles } from "./shared/styles";
import PageFooter from "./shared/PageFooter";
import CoverPage from "./CoverPage";
import TableOfContents from "./TableOfContents";
import ExecutiveSummary from "./ExecutiveSummary";
import CompanyProfile from "./CompanyProfile";
import PersonalizedInsights from "./PersonalizedInsights";
import RiskExposure from "./RiskExposure";
import RegulationSection from "./RegulationSection";
import MaturityAssessment from "./MaturityAssessment";
import DeadlineTimeline from "./DeadlineTimeline";
import ActionRoadmap from "./ActionRoadmap";
import SoftwareRecommendations from "./SoftwareRecommendations";
import NextSteps from "./NextSteps";
import type { ReportData } from "@/lib/report-engine";
import { tReplace, type PDFMessages } from "@/i18n/pdf";

interface ReportDocumentProps {
  data: ReportData;
  t: PDFMessages;
}

export default function ReportDocument({ data, t }: ReportDocumentProps) {
  const {
    input,
    generatedAt,
    reportId,
    regulations,
    highRelevanceCount,
    mediumRelevanceCount,
    lowRelevanceCount,
    fineExposures,
    totalFineExposure,
    estimatedRevenue,
    maturityResults,
    maturityPercentage,
    maturityGrade,
    relevantDeadlines,
    nextCriticalDeadline,
    relevantChecklists,
    checklistStatuses,
    criticalRisks,
    topActions,
    roadmapItems,
    softwareRecommendations,
    countryContext,
  } = data;

  // Filter regulations shown in detail: hoch and mittel
  const detailRegulations = regulations.filter(
    (r) => r.relevance === "hoch" || r.relevance === "mittel",
  );

  // Build high-relevance regulation names for maturity page
  const highRegulationNames = regulations
    .filter((r) => r.relevance === "hoch")
    .map((r) => r.name);

  // Build regulation name lookup for software recommendations (use translated names)
  const regulationNames: Record<string, string> = { ...t.regNames };

  // Build TOC items dynamically using translated section names
  const tocItems: { number: string; title: string; description: string }[] = [
    { number: "01", title: t.tocSections.executiveSummary, description: t.tocSections.executiveSummaryDesc },
    { number: "02", title: t.tocSections.companyProfile, description: t.tocSections.companyProfileDesc },
    {
      number: "03",
      title: t.locale === "de" ? "Personalisierte Lagebewertung" : t.locale === "en" ? "Personalized Risk Assessment" : t.locale === "fr" ? "Évaluation personnalisée" : t.locale === "es" ? "Evaluación personalizada" : "Valutazione personalizzata",
      description: t.locale === "de" ? "Signale aus Zertifizierungen, IT-Stack, Datentransfers und Vorfällen" : t.locale === "en" ? "Signals from certifications, IT stack, data transfers and incidents" : t.locale === "fr" ? "Signaux des certifications, stack IT, transferts de données et incidents" : t.locale === "es" ? "Señales de certificaciones, stack IT, transferencias de datos e incidentes" : "Segnali da certificazioni, stack IT, trasferimenti dati e incidenti",
    },
  ];
  if (fineExposures.length > 0) {
    tocItems.push({ number: String(tocItems.length + 1).padStart(2, "0"), title: t.tocSections.riskExposure, description: t.tocSections.riskExposureDesc });
  }
  if (detailRegulations.length > 0) {
    tocItems.push({ number: String(tocItems.length + 1).padStart(2, "0"), title: t.tocSections.regulationAnalysis, description: tReplace(t.tocSections.regulationAnalysisDesc, { count: detailRegulations.length }) });
  }
  tocItems.push({ number: String(tocItems.length + 1).padStart(2, "0"), title: t.tocSections.maturityAssessment, description: t.tocSections.maturityAssessmentDesc });
  tocItems.push({ number: String(tocItems.length + 1).padStart(2, "0"), title: t.tocSections.deadlineOverview, description: t.tocSections.deadlineOverviewDesc });
  if (roadmapItems.length > 0) {
    tocItems.push({ number: String(tocItems.length + 1).padStart(2, "0"), title: t.tocSections.actionPlan, description: t.tocSections.actionPlanDesc });
  }
  if (softwareRecommendations.length > 0) {
    tocItems.push({ number: String(tocItems.length + 1).padStart(2, "0"), title: t.tocSections.softwareRecs, description: t.tocSections.softwareRecsDesc });
  }
  tocItems.push({ number: String(tocItems.length + 1).padStart(2, "0"), title: t.tocSections.nextSteps, description: t.tocSections.nextStepsDesc });

  // Determine priority per regulation for badges
  const regPriorities: Record<string, "sofort" | "kurzfristig" | "mittelfristig"> = {};
  for (const item of roadmapItems) {
    // Only assign highest priority (first occurrence wins)
    if (!regPriorities[item.regulationKey]) {
      if (item.phase === 1) regPriorities[item.regulationKey] = "sofort";
      else if (item.phase === 2) regPriorities[item.regulationKey] = "kurzfristig";
      else regPriorities[item.regulationKey] = "mittelfristig";
    }
  }

  return (
    <Document
      title={`Compliance-Report \u2014 ${input.companyName}`}
      author="EU Compliance Hub"
      subject={t.cover.titleAccent}
      creator="eu-compliance-hub.eu"
    >
      {/* 1. Cover Page */}
      <CoverPage
        companyName={input.companyName}
        contactName={input.contactName}
        generatedAt={generatedAt}
        countryName={countryContext?.nameDE}
        reportId={reportId}
        t={t}
      />

      {/* 2. Table of Contents */}
      <TableOfContents
        items={tocItems}
        reportId={reportId}
        generatedAt={generatedAt}
        t={t}
      />

      {/* 3. Executive Summary */}
      <ExecutiveSummary
        highCount={highRelevanceCount}
        mediumCount={mediumRelevanceCount}
        lowCount={lowRelevanceCount}
        maturityGrade={maturityGrade}
        maturityPercentage={maturityPercentage}
        nextDeadline={nextCriticalDeadline}
        topActions={topActions}
        generatedAt={generatedAt}
        regulations={regulations}
        criticalRisks={criticalRisks}
        totalFineExposure={totalFineExposure}
        t={t}
      />

      {/* 4. Company Profile */}
      <CompanyProfile
        input={input}
        highCount={highRelevanceCount}
        mediumCount={mediumRelevanceCount}
        lowCount={lowRelevanceCount}
        totalRegulations={regulations.length}
        countryName={countryContext?.nameDE}
        generatedAt={generatedAt}
        t={t}
      />

      {/* 5. Personalized Insights — THE differentiator page */}
      <PersonalizedInsights
        input={input}
        regulations={regulations}
        maturityPercentage={maturityPercentage}
        generatedAt={generatedAt}
        t={t}
      />

      {/* 6. Risk Exposure */}
      {fineExposures.length > 0 && (
        <RiskExposure
          fineExposures={fineExposures}
          totalFineExposure={totalFineExposure}
          estimatedRevenue={estimatedRevenue}
          generatedAt={generatedAt}
          t={t}
        />
      )}

      {/* 6. Regulation Sections (hoch/mittel with enhanced data) */}
      {detailRegulations.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.goldBar} />
          <Text
            style={[
              styles.h2,
              { color: "#0A2540", marginBottom: 2 },
            ]}
          >
            {t.regulation.analysisTitle}
          </Text>
          <Text style={[styles.bodySmall, styles.mb16]}>
            {t.regulation.analysisSubtitle}
            {countryContext
              ? ` \u2014 ${tReplace(t.regulation.countryFocus, { country: countryContext.nameDE })}`
              : ""}
          </Text>

          {detailRegulations.map((reg) => {
            const checklist = relevantChecklists.find(
              (c) => c.key === reg.key,
            );
            const countryRegData =
              countryContext?.regulationData?.[reg.key];
            const statuses = checklistStatuses[reg.key];
            const fineExp = fineExposures.find((f) => f.key === reg.key);
            const priority = regPriorities[reg.key];

            return (
              <RegulationSection
                key={reg.key}
                regulation={reg}
                checklist={checklist}
                countryRegData={countryRegData}
                countryName={countryContext?.nameDE}
                checklistStatuses={statuses}
                fineExposure={fineExp}
                priority={priority}
                t={t}
              />
            );
          })}

          <PageFooter generatedAt={generatedAt} t={t} />
        </Page>
      )}

      {/* 7. Maturity Assessment */}
      <MaturityAssessment
        results={maturityResults}
        percentage={maturityPercentage}
        grade={maturityGrade}
        generatedAt={generatedAt}
        highRegulationNames={highRegulationNames}
        t={t}
      />

      {/* 8. Deadline Timeline */}
      <DeadlineTimeline
        deadlines={relevantDeadlines}
        generatedAt={generatedAt}
        t={t}
      />

      {/* 10. Action Roadmap */}
      {roadmapItems.length > 0 && (
        <ActionRoadmap
          items={roadmapItems}
          generatedAt={generatedAt}
          t={t}
        />
      )}

      {/* 11. Software Recommendations */}
      {softwareRecommendations.length > 0 && (
        <SoftwareRecommendations
          recommendations={softwareRecommendations}
          regulationNames={regulationNames}
          generatedAt={generatedAt}
          t={t}
        />
      )}

      {/* 12. Next Steps (final page) */}
      <NextSteps
        topActions={topActions}
        regulations={regulations}
        generatedAt={generatedAt}
        t={t}
      />
    </Document>
  );
}
