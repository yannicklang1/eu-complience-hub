"use client";

import Link from "next/link";
import { footerRegulations, footerTools } from "@/data/navigation";
import { BrandLogo } from "./BrandLogo";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function Footer() {
  const { reset: resetCookieConsent } = useCookieConsent();

  return (
    <footer role="contentinfo" aria-label="Seitenfuß" className="relative overflow-hidden bg-[#060c1a]">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(10,37,64,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #0A2540 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-8">
        {/* Top: Logo + Nav */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <BrandLogo size={28} />
              </div>
              <div>
                <div className="text-white font-[Syne] font-[800] text-lg leading-none">
                  EU Compliance Hub
                </div>
                <div className="font-mono text-[10px] text-white/40 mt-1 tracking-[0.1em]">
                  eu-compliance-hub.eu
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-white/50 mb-6">
              Europäische Regulierungen. Klar erklärt. Wir übersetzen Brüsseler
              Gesetzestext in konkrete Handlungsschritte – für KMUs, Startups
              und Konzerne.
            </p>

            {/* Accent line divider */}
            <div className="flex items-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-[#FACC15]/40 to-transparent" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#FACC15]/30" />
              <div className="h-px w-20 bg-gradient-to-r from-[#FACC15]/20 to-transparent" />
            </div>
          </div>

          {/* Regulierungen */}
          <div>
            <div className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase mb-5 text-[#FACC15]/70">
              Regulierungen
            </div>
            <ul className="space-y-3">
              {footerRegulations.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-white/80"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <div className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase mb-5 text-[#FACC15]/70">
              Tools
            </div>
            <ul className="space-y-3">
              {footerTools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-white/80"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="py-6 border-b border-white/[0.04]">
          <p className="font-mono text-[10px] text-white/35 leading-relaxed max-w-3xl">
            EU Compliance Hub ist ein unabhängiges Informationsportal und steht in keiner
            Verbindung zu Institutionen der Europäischen Union oder des Europarats. Alle
            Inhalte dienen ausschließlich der allgemeinen Information und stellen keine
            Rechtsberatung dar. {"\u201EEU\u201D"} wird beschreibend für den Themenbereich europäischer
            Regulierungen verwendet.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-4">
          <p className="font-mono text-[11px] text-white/35">
            &copy; {new Date().getFullYear()} EU Compliance Hub. Kein
            Rechtsbeistand. Alle Angaben ohne Gewähr.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: "Über uns", href: "/ueber-uns" },
              { label: "Aktuelles", href: "/aktuelles" },
              { label: "FAQ", href: "/faq" },
              { label: "Kontakt", href: "/kontakt" },
              { label: "Impressum", href: "/impressum" },
              { label: "Datenschutz", href: "/datenschutz" },
              { label: "Haftungsausschluss", href: "/haftungsausschluss" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] text-white/40 transition-colors duration-200 hover:text-white/60"
              >
                {label}
              </Link>
            ))}
            <button
              onClick={resetCookieConsent}
              className="text-[11px] text-white/40 transition-colors duration-200 hover:text-white/60 cursor-pointer"
            >
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
