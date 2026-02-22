"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableOfContents, { type TocItem } from "@/components/TableOfContents";
import Breadcrumbs from "@/components/Breadcrumbs";
import SocialShareBar from "@/components/SocialShareBar";
import GuideCTA from "@/components/GuideCTA";
import { useTranslations } from "@/i18n/use-translations";
import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country/index";
import type { RegulationKey } from "@/i18n/country/types";
import { ApplicableLawInfo } from "@/components/ApplicableLawInfo";

/**
 * Map display regulation labels (full EU legislation names) to country data keys.
 * Some guides pass full names like "NIS2-Richtlinie (EU) 2022/2555",
 * while country data uses short keys like "nis2".
 */
const REG_KEY_MAP: Record<string, RegulationKey> = {
  /* ── Directives (Richtlinien) ── */
  "NIS2-Richtlinie (EU) 2022/2555": "nis2",
  "Richtlinie (EU) 2022/2464": "csrd",
  "Richtlinie (EU) 2019/882": "bafg",
  "Richtlinie (EU) 2019/1937": "hschg",
  "Richtlinie (EU) 2024/2853": "produkthaftung",
  "Richtlinie 2002/58/EG": "eprivacy",
  "Richtlinie (EU) 2022/2557": "hschg",
  /* ── Regulations (Verordnungen) ── */
  "Verordnung (EU) 2024/1689": "ai-act",
  "Verordnung (EU) 2022/2554": "dora",
  "Verordnung (EU) 2024/2847": "cra",
  "Verordnung (EU) 2016/679": "dsgvo",
  "Verordnung (EU) 2023/2854": "data-act",
  "Verordnung (EU) 2022/868": "data-act",
  "Verordnung (EU) 2023/1114": "mica",
  "Verordnung (EU) 2022/2065": "dsa",
  "Verordnung (EU) 910/2014": "eidas",
  /* ── Short key fallbacks ── */
  "DSGVO & KI 2026": "dsgvo",
  "EU AI Act": "ai-act",
  "Digital Services Act": "dsa",
  "Data Act": "data-act",
  "MiCA": "mica",
  "eIDAS 2.0": "eidas",
  "EHDS": "ehds",
  "ePrivacy": "eprivacy",
  "Green Claims": "green-claims",
  "Digitaler Produktpass": "dpp",
};

function resolveRegulationKey(key: string): RegulationKey {
  return REG_KEY_MAP[key] ?? (key as RegulationKey);
}

export interface QuickFact {
  label: string;
  value: string;
  icon?: ReactNode;
}

/**
 * Dynamically process QuickFacts to replace Austria-specific "(AT)" data
 * with the user's selected country. Matches on common label patterns:
 * - "Aufsicht (AT)" / "Authority (AT)" / "Supervisor (AT)" → country authority
 * - "Max. Strafe (AT)" / "Max. Penalty (AT)" → country fines
 * - "Betroffene (AT)" / "Affected (AT)" → label country swap only
 * - "CSIRT (AT)" → country CSIRT name
 * - "AT-Umsetzung" → country national law name
 * - Any other "(AT)" → label country swap
 */
function processQuickFacts(
  facts: QuickFact[],
  countryCode: string,
  countryName: string,
  countryRegData: import("@/i18n/country/types").CountryRegulationData | undefined | null,
): QuickFact[] {
  if (!countryRegData || countryCode === "AT") return facts;

  return facts.map((fact) => {
    let { label, value } = fact;

    // Replace "(AT)" in label with country code
    if (label.includes("(AT)")) {
      label = label.replace("(AT)", `(${countryCode})`);
    }

    // Replace "AT-" prefix with country code
    if (label.startsWith("AT-")) {
      label = label.replace(/^AT-/, `${countryCode}-`);
    }

    // Pattern match for authority values
    const isAuthorityLabel = /Aufsicht|Authority|Supervisor|Behörde/i.test(fact.label);
    if (isAuthorityLabel && countryRegData.authority) {
      value = countryRegData.authority;
    }

    // Pattern match for CSIRT values
    const isCsirtLabel = /CSIRT/i.test(fact.label);
    if (isCsirtLabel && countryRegData.authority) {
      // CSIRT info typically comes from the authority field or csirtName
      value = countryRegData.authority;
    }

    // Pattern match for fine/penalty values
    const isFineLabel = /Strafe|Penalty|Fine|Bußgeld/i.test(fact.label);
    if (isFineLabel && countryRegData.nationalFines) {
      value = countryRegData.nationalFines;
    }

    // Pattern match for national implementation law
    const isLawLabel = /Umsetzung|Implementation/i.test(fact.label);
    if (isLawLabel && countryRegData.nationalLawName) {
      value = countryRegData.nationalLawName;
    }

    if (label === fact.label && value === fact.value) return fact;
    return { ...fact, label, value };
  });
}

export interface TrustBadgeProps {
  /** Date of last editorial review, e.g. "18.02.2026" */
  lastReview: string;
  /** Number of official sources linked */
  sourceCount: number;
  /** Whether this guide has been fact-checked (default: true) */
  factChecked?: boolean;
}

export default function GuidePageLayout({
  title,
  subtitle,
  regulationKey,
  accent = "#0A2540",
  badgeLabel,
  badgeColor = "#dc2626",
  quickFacts,
  tocItems,
  heroIcon,
  trustBadge,
  href,
  children,
}: {
  title: string;
  subtitle: string;
  regulationKey: RegulationKey | string;
  accent?: string;
  badgeLabel?: string;
  badgeColor?: string;
  quickFacts?: QuickFact[];
  tocItems: TocItem[];
  heroIcon?: ReactNode;
  trustBadge?: TrustBadgeProps;
  /** Current page href for breadcrumb JSON-LD, e.g. "/nisg-2026" */
  href?: string;
  children: ReactNode;
}) {
  const { t, locale } = useTranslations();
  const { countryCode, countryData } = useCountry();
  const resolvedKey = resolveRegulationKey(regulationKey);
  const countryRegData = countryData?.regulations?.[resolvedKey];
  const countryMeta = COUNTRY_META[countryCode];

  // Dynamically replace "(AT)" QuickFacts with selected country data
  const processedQuickFacts = quickFacts
    ? processQuickFacts(quickFacts, countryCode, countryMeta?.nameDE ?? countryCode, countryRegData)
    : undefined;

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[#040a18]" />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${accent}30 0%, transparent 70%)`,
            }}
          />
          {/* Bottom gradient to content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            {/* Breadcrumb with JSON-LD */}
            <div className="mb-8 [&_nav]:text-white/40 [&_a]:text-white/40 [&_a:hover]:text-white/70 [&_span]:text-white/60 [&_span[aria-hidden]]:text-white/35">
              <Breadcrumbs
                items={[{ label: title, href: href }]}
                homeLabel={t("breadcrumb.home")}
                locale={locale}
              />
            </div>

            <div className="flex items-start gap-5">
              {heroIcon && (
                <div
                  className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center flex-shrink-0"
                  style={{ background: `${accent}25` }}
                >
                  {heroIcon}
                </div>
              )}
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40">
                    {regulationKey}
                  </span>
                  {badgeLabel && (
                    <span
                      className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white"
                      style={{ background: badgeColor }}
                    >
                      {badgeLabel}
                    </span>
                  )}
                  {countryMeta && (
                    <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] px-2.5 py-1">
                      <span className="text-sm leading-none">{countryMeta.flag}</span>
                      <span className="font-mono text-[10px] text-white/60 font-medium">{countryMeta.nameDE}</span>
                    </div>
                  )}
                </div>
                <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-4">
                  {title}
                </h1>
                <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trust Badge Bar ── */}
        {trustBadge && (
          <div
            className="relative z-10 pt-5"
            style={{ background: "#f4f6fc" }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div
                className="inline-flex items-center gap-3 sm:gap-5 rounded-2xl border px-5 py-3 shadow-sm"
                style={{
                  background: "white",
                  borderColor: `${accent}20`,
                  boxShadow: `0 2px 12px ${accent}08`,
                }}
              >
                {/* Last review */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[12px] text-[#3a4a6b] font-medium whitespace-nowrap">
                    {t("guide.lastReview")}{" "}
                    <span className="font-bold" style={{ color: accent }}>{trustBadge.lastReview}</span>
                  </span>
                </div>

                <div className="w-px h-4 bg-[#e0e5f0]" />

                {/* Source count */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-[12px] text-[#3a4a6b] font-medium whitespace-nowrap">
                    <span className="font-bold" style={{ color: accent }}>{trustBadge.sourceCount}</span> {t("guide.officialSources")}
                  </span>
                </div>

                {trustBadge.factChecked !== false && (
                  <>
                    <div className="w-px h-4 bg-[#e0e5f0] hidden sm:block" />

                    {/* Fact-checked badge */}
                    <div className="hidden sm:flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="text-[12px] text-emerald-700 font-bold whitespace-nowrap">
                        {t("guide.factChecked")}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Content Area ── */}
        <section
          className="py-12 lg:py-16"
          style={{
            background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex gap-10 items-start">
              {/* Left: Table of Contents (Desktop) */}
              <div data-toc="" className="hidden lg:block sticky top-28 w-56 flex-shrink-0 self-start">
                <TableOfContents items={tocItems} accent={accent} />
              </div>

              {/* Center: Main Content */}
              <div className="flex-1 min-w-0 max-w-3xl">
                {children}

                {/* Country Info (Mobile / Tablet — hidden on desktop where sidebar shows it) */}
                {countryRegData && (
                  <div className="xl:hidden mb-8 rounded-xl bg-[#f0f4ff] border border-[#c8d4f0] p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg leading-none">{countryMeta?.flag ?? "🇪🇺"}</span>
                      <span className="font-[Syne] font-bold text-sm text-[#0A2540]">
                        {locale === "de" ? (countryMeta?.nameDE ?? countryCode) : (countryMeta?.nameEN ?? countryCode)}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {countryRegData.nationalLawName && (
                        <div>
                          <div className="font-mono text-[9px] text-[#7a8db0] uppercase tracking-wider mb-0.5">
                            {locale === "de" ? "Nationales Gesetz" : "National law"}
                          </div>
                          <div className="text-[12px] font-semibold text-[#0A2540] leading-snug">
                            {countryRegData.nationalLawName}
                          </div>
                        </div>
                      )}
                      {countryRegData.authority && (
                        <div>
                          <div className="font-mono text-[9px] text-[#7a8db0] uppercase tracking-wider mb-0.5">
                            {locale === "de" ? "Behörde" : "Authority"}
                          </div>
                          <a
                            href={countryRegData.authorityUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-[#1a5fb4] hover:underline leading-snug block"
                          >
                            {countryRegData.authority}
                          </a>
                        </div>
                      )}
                      {countryRegData.implementationStatus && (
                        <div>
                          <div className="font-mono text-[9px] text-[#7a8db0] uppercase tracking-wider mb-0.5">
                            {locale === "de" ? "Status" : "Status"}
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              countryRegData.implementationStatus === "implemented"
                                ? "bg-emerald-100 text-emerald-700"
                                : countryRegData.implementationStatus === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : countryRegData.implementationStatus === "overdue"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                            {countryRegData.implementationStatus === "implemented"
                              ? (locale === "de" ? "Umgesetzt" : "Implemented")
                              : countryRegData.implementationStatus === "pending"
                              ? (locale === "de" ? "In Umsetzung" : "Pending")
                              : countryRegData.implementationStatus === "overdue"
                              ? (locale === "de" ? "Überfällig" : "Overdue")
                              : (locale === "de" ? "Nicht anwendbar" : "N/A")}
                          </span>
                        </div>
                      )}
                      {countryRegData.nationalFines && (
                        <div>
                          <div className="font-mono text-[9px] text-[#7a8db0] uppercase tracking-wider mb-0.5">
                            {locale === "de" ? "Bußgelder" : "Fines"}
                          </div>
                          <div className="text-[12px] font-semibold text-[#0A2540] leading-snug">
                            {countryRegData.nationalFines}
                          </div>
                        </div>
                      )}
                    </div>
                    {countryRegData.nationalNotes && (
                      <p className="text-[11px] text-[#4a5a80] leading-relaxed mt-3 pt-3 border-t border-[#c8d4f0]">
                        {countryRegData.nationalNotes}
                      </p>
                    )}
                  </div>
                )}

                {/* Applicable Law (Mobile / Tablet) */}
                <div className="xl:hidden mb-8">
                  <ApplicableLawInfo regulationKey={resolvedKey} locale={locale} />
                </div>

                {/* Social Sharing */}
                {href && (
                  <div data-social-share="">
                    <SocialShareBar path={`/${locale}${href}`} title={title} accent={accent} />
                  </div>
                )}

                {/* Newsletter CTA + Quick Links */}
                <div data-guide-cta="">
                  <GuideCTA accent={accent} />
                </div>
              </div>

              {/* Right: Quick Facts Sidebar (Desktop) */}
              {processedQuickFacts && processedQuickFacts.length > 0 && (
                <aside className="hidden xl:block sticky top-28 w-64 flex-shrink-0 self-start">
                  <div
                    className="rounded-2xl border p-6"
                    style={{
                      background: "white",
                      borderColor: "#d8dff0",
                      boxShadow: "0 4px 24px rgba(0,20,60,0.04)",
                    }}
                  >
                    <div className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase mb-5 text-[#7a8db0]">
                      {t("guide.quickFacts")}
                    </div>
                    <div className="space-y-4">
                      {processedQuickFacts.map((fact, i) => (
                        <div key={i}>
                          <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">
                            {fact.label}
                          </div>
                          <div
                            className="font-[Syne] font-bold leading-snug break-words hyphens-auto"
                            style={{
                              color: accent,
                              fontSize: fact.value.length > 30 ? "12px" : fact.value.length > 20 ? "13px" : "15px",
                            }}
                            lang={locale}
                          >
                            {fact.value}
                          </div>
                          {i < processedQuickFacts.length - 1 && (
                            <div className="mt-4 h-px bg-[#e8ecf4]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Country-specific info block */}
                  {countryRegData && (
                    <div className="mt-4 rounded-xl bg-[#f0f4ff] border border-[#c8d4f0] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg leading-none">{countryMeta?.flag ?? "🇪🇺"}</span>
                        <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-[#3a4a6b]">
                          {locale === "de" ? (countryMeta?.nameDE ?? countryCode) : (countryMeta?.nameEN ?? countryCode)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {countryRegData.nationalLawName && (
                          <div>
                            <div className="font-mono text-[9px] text-[#7a8db0] uppercase tracking-wider mb-0.5">
                              {locale === "de" ? "Nationales Gesetz" : "National law"}
                            </div>
                            <div className="text-[11px] font-semibold text-[#0A2540] leading-snug">
                              {countryRegData.nationalLawName}
                            </div>
                          </div>
                        )}
                        {countryRegData.authority && (
                          <div>
                            <div className="font-mono text-[9px] text-[#7a8db0] uppercase tracking-wider mb-0.5">
                              {locale === "de" ? "Behörde" : "Authority"}
                            </div>
                            <a
                              href={countryRegData.authorityUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-[#1a5fb4] hover:underline leading-snug block"
                            >
                              {countryRegData.authority}
                            </a>
                          </div>
                        )}
                        {countryRegData.implementationStatus && (
                          <div>
                            <div className="font-mono text-[9px] text-[#7a8db0] uppercase tracking-wider mb-0.5">
                              {locale === "de" ? "Status" : "Status"}
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                countryRegData.implementationStatus === "implemented"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : countryRegData.implementationStatus === "pending"
                                  ? "bg-amber-100 text-amber-700"
                                  : countryRegData.implementationStatus === "overdue"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                              {countryRegData.implementationStatus === "implemented"
                                ? (locale === "de" ? "Umgesetzt" : "Implemented")
                                : countryRegData.implementationStatus === "pending"
                                ? (locale === "de" ? "In Umsetzung" : "Pending")
                                : countryRegData.implementationStatus === "overdue"
                                ? (locale === "de" ? "Überfällig" : "Overdue")
                                : (locale === "de" ? "Nicht anwendbar" : "N/A")}
                            </span>
                          </div>
                        )}
                        {countryRegData.nationalNotes && (
                          <p className="text-[10px] text-[#4a5a80] leading-relaxed pt-1 border-t border-[#c8d4f0]">
                            {countryRegData.nationalNotes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Applicable Law Info */}
                  <div className="mt-4">
                    <ApplicableLawInfo regulationKey={resolvedKey} locale={locale} />
                  </div>

                  {/* Disclaimer notice */}
                  <div className="mt-4 rounded-xl bg-[#fff8e1] border border-[#f0e6c0] p-4">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-[#b8960c] flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <p className="text-[11px] text-[#8a7020] leading-relaxed">
                        {t("guide.disclaimer")}{" "}
                        <Link
                          href={`/${locale}/haftungsausschluss`}
                          className="underline underline-offset-2 hover:text-[#6a5010]"
                        >
                          {t("guide.more")}
                        </Link>
                      </p>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
