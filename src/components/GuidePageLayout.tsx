"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TableOfContents, { type TocItem } from "@/components/TableOfContents";
import Breadcrumbs from "@/components/Breadcrumbs";
import SocialShareBar from "@/components/SocialShareBar";
import GuideCTA from "@/components/GuideCTA";

export interface QuickFact {
  label: string;
  value: string;
  icon?: ReactNode;
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
  regulationKey: string;
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
                <div className="flex items-center gap-3 mb-3">
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
            className="relative z-10"
            style={{ background: "#f4f6fc" }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-6">
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
                    Letzte Prüfung:{" "}
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
                    <span className="font-bold" style={{ color: accent }}>{trustBadge.sourceCount}</span> offizielle Quellen
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
                        Faktengeprüft
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
              <div data-toc="">
                <TableOfContents items={tocItems} accent={accent} />
              </div>

              {/* Center: Main Content */}
              <div className="flex-1 min-w-0 max-w-3xl">
                {children}

                {/* Social Sharing */}
                {href && (
                  <div data-social-share="">
                    <SocialShareBar path={href} title={title} accent={accent} />
                  </div>
                )}

                {/* Newsletter CTA + Quick Links */}
                <div data-guide-cta="">
                  <GuideCTA accent={accent} />
                </div>
              </div>

              {/* Right: Quick Facts Sidebar (Desktop) */}
              {quickFacts && quickFacts.length > 0 && (
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
                      Quick Facts
                    </div>
                    <div className="space-y-4">
                      {quickFacts.map((fact, i) => (
                        <div key={i}>
                          <div className="font-mono text-[10px] text-[#7a8db0] uppercase tracking-wider mb-1">
                            {fact.label}
                          </div>
                          <div
                            className="font-[Syne] font-bold text-[15px] leading-snug"
                            style={{ color: accent }}
                          >
                            {fact.value}
                          </div>
                          {i < quickFacts.length - 1 && (
                            <div className="mt-4 h-px bg-[#e8ecf4]" />
                          )}
                        </div>
                      ))}
                    </div>
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
                        Keine Rechtsberatung. Alle Angaben ohne Gewähr.{" "}
                        <Link
                          href="/haftungsausschluss"
                          className="underline underline-offset-2 hover:text-[#6a5010]"
                        >
                          Mehr
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
