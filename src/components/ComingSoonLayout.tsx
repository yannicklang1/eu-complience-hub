import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export interface TeaseItem {
  icon: string;
  label: string;
}

export default function ComingSoonLayout({
  title,
  subtitle,
  regulationKey,
  accent = "#0A2540",
  description,
  teaseItems,
  expectedDate,
  heroIcon,
}: {
  title: string;
  subtitle: string;
  regulationKey?: string;
  accent?: string;
  description: string;
  teaseItems?: TeaseItem[];
  expectedDate?: string;
  heroIcon?: React.ReactNode;
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
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8">
              <Link
                href="/"
                className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                Startseite
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">
                {title}
              </span>
            </nav>

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
                  {regulationKey && (
                    <span className="font-mono text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40">
                      {regulationKey}
                    </span>
                  )}
                  <span className="text-[10px] px-2.5 py-1 rounded-lg font-mono font-bold tracking-wide text-white bg-amber-500">
                    Coming Soon
                  </span>
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

        {/* ── Content ── */}
        <section
          className="py-16 lg:py-24"
          style={{
            background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)",
          }}
        >
          <div className="max-w-2xl mx-auto px-6 sm:px-8">
            {/* Main Card */}
            <div className="bg-white rounded-3xl border border-[#d8dff0] p-8 sm:p-12 shadow-sm text-center">
              {/* Construction Icon */}
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
                style={{ background: `${accent}10` }}
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={accent}
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="font-[Syne] font-extrabold text-2xl sm:text-3xl text-[#060c1a] tracking-tight mb-4">
                In Arbeit
              </h2>
              <p className="text-[15px] text-[#3a4a6b] leading-relaxed mb-8 max-w-lg mx-auto">
                {description}
              </p>

              {/* Expected date */}
              {expectedDate && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f4f6fc] border border-[#e8ecf4] mb-8">
                  <svg className="w-4 h-4 text-[#7a8db0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-mono text-[12px] text-[#5a6a8a] font-medium">
                    Voraussichtlich: {expectedDate}
                  </span>
                </div>
              )}

              {/* Teaser items */}
              {teaseItems && teaseItems.length > 0 && (
                <div className="mt-8 pt-8 border-t border-[#e8ecf4]">
                  <div className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase mb-5 text-[#7a8db0]">
                    Das erwartet Sie
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {teaseItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f4f6fc] border border-[#e8ecf4] text-left"
                      >
                        <span className="text-lg flex-shrink-0">{item.icon}</span>
                        <span className="text-[13px] text-[#3a4a6b] font-medium">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/fristen-radar"
                  className="px-6 py-3.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #EAB308)",
                    color: "#0A2540",
                    boxShadow: "0 4px 16px rgba(250,204,21,0.2)",
                  }}
                >
                  Benachrichtigt werden
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3.5 rounded-xl text-sm font-medium border border-[#d8dff0] text-[#5a6a8a] hover:border-[#0A2540]/20 hover:text-[#0A2540] transition-all duration-200"
                >
                  Zur Startseite
                </Link>
              </div>
            </div>

            {/* Existing guides hint */}
            <div className="mt-8 text-center">
              <p className="text-[13px] text-[#7a8db0] mb-3">
                Bereits verfügbar:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href="/eu-ai-act"
                  className="px-4 py-2 rounded-xl bg-white border border-[#d8dff0] text-[13px] font-medium text-[#0A2540] hover:border-[#0A2540]/20 hover:shadow-sm transition-all duration-200"
                >
                  EU AI Act Guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
