import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LegalPageLayout({
  title,
  subtitle,
  locale,
  children,
}: {
  title: string;
  subtitle?: string;
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        {/* Hero area */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[#040a18]" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0a1a55 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f4f6fc] to-transparent" />

          <div className="relative max-w-3xl mx-auto px-6 sm:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-8">
              <Link href={`/${locale}`} className="font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors">
                Startseite
              </Link>
              <span className="font-mono text-[11px] text-white/35">/</span>
              <span className="font-mono text-[11px] text-white/60">{title}</span>
            </nav>

            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/45 text-base leading-relaxed">{subtitle}</p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-20" style={{ background: "linear-gradient(180deg, #f4f6fc 0%, #eef1fa 100%)" }}>
          <div className="max-w-3xl mx-auto px-6 sm:px-8">
            <div className="bg-white rounded-3xl border border-[#d8dff0] p-8 sm:p-12 shadow-sm">
              {/* Prose styling via Tailwind utility classes */}
              <div className="
                [&>h2]:font-[Syne] [&>h2]:font-bold [&>h2]:text-xl [&>h2]:text-[#060c1a] [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:tracking-tight
                [&>h3]:font-[Syne] [&>h3]:font-semibold [&>h3]:text-lg [&>h3]:text-[#060c1a] [&>h3]:mt-8 [&>h3]:mb-3
                [&>p]:text-[15px] [&>p]:text-[#3a4a6b] [&>p]:leading-relaxed [&>p]:mb-4
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:text-[15px] [&>ul>li]:text-[#3a4a6b] [&>ul>li]:leading-relaxed [&>ul>li]:mb-2
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:text-[15px] [&>ol>li]:text-[#3a4a6b] [&>ol>li]:leading-relaxed [&>ol>li]:mb-2
                [&>a]:text-[#0A2540] [&>a]:underline [&>a]:underline-offset-2 [&>a]:hover:text-[#163560]
                [&>hr]:border-[#e8ecf4] [&>hr]:my-8
                [&>blockquote]:border-l-4 [&>blockquote]:border-[#0A2540]/20 [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:text-[#7a8db0]
              ">
                {children}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
