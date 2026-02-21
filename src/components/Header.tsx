"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { regulierungenDropdown, toolsDropdown } from "@/data/navigation";
import DropdownMenu from "./DropdownMenu";
import MobileNavAccordion from "./MobileNavAccordion";
import { BrandLogo } from "./BrandLogo";
import CommandPalette from "./CommandPalette";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Close mobile menu on Escape key ── */
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-[#0A2540]/[0.06] shadow-[0_4px_24px_rgba(10,37,64,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 flex items-center justify-center">
            <BrandLogo size={36} />
          </div>
          <div className="flex flex-col">
            <span className={`font-[Syne] font-[800] text-sm leading-none tracking-tight transition-colors duration-300 ${scrolled ? "text-[#0A2540]" : "text-white"}`}>
              EU Compliance
            </span>
            <span className={`font-mono text-[10px] leading-none tracking-[0.15em] uppercase transition-colors duration-300 ${scrolled ? "text-[#7a8db0]" : "text-white/60"}`}>
              Hub
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-1">
          <DropdownMenu dropdown={regulierungenDropdown} scrolled={scrolled} />
          <Link
            href="/branchen"
            className={`px-4 py-2 rounded-xl text-[13px] font-[Syne] font-semibold tracking-[-0.01em] transition-all duration-200 ${
              scrolled ? "text-[#3a4a6b] hover:text-[#0A2540] hover:bg-[#0A2540]/[0.04]" : "text-white/80 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            Branchen
          </Link>
          <DropdownMenu dropdown={toolsDropdown} scrolled={scrolled} />
          <Link
            href="/wissen"
            className={`px-4 py-2 rounded-xl text-[13px] font-[Syne] font-semibold tracking-[-0.01em] transition-all duration-200 ${
              scrolled ? "text-[#3a4a6b] hover:text-[#0A2540] hover:bg-[#0A2540]/[0.04]" : "text-white/80 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            Wissen
          </Link>
          <Link
            href="/aktuelles"
            className={`px-4 py-2 rounded-xl text-[13px] font-[Syne] font-semibold tracking-[-0.01em] transition-all duration-200 ${
              scrolled ? "text-[#3a4a6b] hover:text-[#0A2540] hover:bg-[#0A2540]/[0.04]" : "text-white/80 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            Aktuelles
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <CommandPalette scrolled={scrolled} />
          <Link
            href="/kontakt"
            className={`px-4 py-2 rounded-xl text-[13px] font-[Syne] font-semibold tracking-[-0.01em] transition-all duration-200 ${
              scrolled ? "text-[#3a4a6b] hover:text-[#0A2540] hover:bg-[#0A2540]/[0.04]" : "text-white/80 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            Kontakt
          </Link>
          <Link
            href="/fristen-radar"
            className="px-5 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              color: "#0A2540",
              boxShadow: "0 4px 16px rgba(250,204,21,0.3)",
            }}
          >
            Compliance-Briefing
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-6 h-0.5 block transition-all duration-300 ${scrolled ? "bg-[#0A2540]" : "bg-white"}`}
              aria-hidden="true"
              style={{
                transform: mobileOpen
                  ? i === 0
                    ? "rotate(45deg) translate(4px, 4px)"
                    : i === 1
                    ? "scaleX(0)"
                    : "rotate(-45deg) translate(4px, -4px)"
                  : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav
          ref={mobileMenuRef}
          id="mobile-menu"
          aria-label="Mobile Navigation"
          className="md:hidden py-4 px-6 bg-white/95 backdrop-blur-xl border-t border-[#0A2540]/[0.06] max-h-[80vh] overflow-y-auto"
        >
          {/* Branchen (direct link) */}
          <Link
            href="/branchen"
            className="flex items-center justify-between py-3 border-b border-[#0A2540]/[0.04] text-[#3a4a6b]"
            onClick={closeMobileMenu}
          >
            <span className="text-sm font-medium">Branchen</span>
          </Link>

          {/* Wissen (direct link) */}
          <Link
            href="/wissen"
            className="flex items-center justify-between py-3 border-b border-[#0A2540]/[0.04] text-[#3a4a6b]"
            onClick={closeMobileMenu}
          >
            <span className="text-sm font-medium">Wissen</span>
          </Link>

          {/* Aktuelles (direct link) */}
          <Link
            href="/aktuelles"
            className="flex items-center justify-between py-3 border-b border-[#0A2540]/[0.04] text-[#3a4a6b]"
            onClick={closeMobileMenu}
          >
            <span className="text-sm font-medium">Aktuelles</span>
          </Link>

          {/* Tools Hub (direct link) */}
          <Link
            href="/tools"
            className="flex items-center justify-between py-3 border-b border-[#0A2540]/[0.04] text-[#3a4a6b]"
            onClick={closeMobileMenu}
          >
            <span className="text-sm font-medium">Alle Tools</span>
          </Link>

          {/* Kontakt (direct link) */}
          <Link
            href="/kontakt"
            className="flex items-center justify-between py-3 border-b border-[#0A2540]/[0.04] text-[#3a4a6b]"
            onClick={closeMobileMenu}
          >
            <span className="text-sm font-medium">Kontakt</span>
          </Link>

          {/* Accordion sections */}
          <MobileNavAccordion dropdown={regulierungenDropdown} onNavigate={closeMobileMenu} />
          <MobileNavAccordion dropdown={toolsDropdown} onNavigate={closeMobileMenu} />

          <Link
            href="/fristen-radar"
            className="mt-4 w-full py-3 rounded-xl text-center font-[Syne] font-bold text-sm block"
            style={{
              background: "linear-gradient(135deg, #FACC15, #EAB308)",
              color: "#0A2540",
            }}
            onClick={closeMobileMenu}
          >
            Compliance-Briefing
          </Link>
        </nav>
      )}
    </header>
  );
}
