"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* ══════════════════════════════════════════════════════════════
   Contact / Lead Form Page
   ══════════════════════════════════════════════════════════════ */

type FormStatus = "idle" | "submitting" | "success" | "error";

const INTERESTS = [
  { value: "nis2", label: "NIS2 / NISG 2026" },
  { value: "ai-act", label: "EU AI Act" },
  { value: "dora", label: "DORA" },
  { value: "dsgvo", label: "DSGVO" },
  { value: "cra", label: "Cyber Resilience Act" },
  { value: "csrd", label: "CSRD / ESG" },
  { value: "bafg", label: "BaFG (Barrierefreiheit)" },
  { value: "data-act", label: "Data Act" },
  { value: "green-claims", label: "Green Claims" },
  { value: "other", label: "Andere Regulierung" },
] as const;

const COMPANY_SIZES = [
  { value: "micro", label: "1–9 Mitarbeiter" },
  { value: "small", label: "10–49 Mitarbeiter" },
  { value: "medium", label: "50–249 Mitarbeiter" },
  { value: "large", label: "250+ Mitarbeiter" },
] as const;

export default function KontaktContent() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const interests = INTERESTS
      .filter((i) => data.get(`interest-${i.value}`) === "on")
      .map((i) => i.label);

    const urgency = data.get("urgency") as string;
    const messageText = data.get("message") as string;
    const messageWithUrgency = urgency
      ? `[Zeitrahmen: ${urgency}] ${messageText ?? ""}`
      : messageText;

    const payload = {
      email: data.get("email"),
      contact_name: data.get("name"),
      company_name: data.get("company"),
      phone: data.get("phone"),
      company_size: data.get("company_size"),
      branche: data.get("branche"),
      message: messageWithUrgency,
      interests: interests.join(", "),
      gdpr_consent: data.get("gdpr_consent") === "on",
      commercial_consent: data.get("commercial_consent") === "on",
      source: "kontakt",
      source_page: "/kontakt",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMessage(result.error ?? "Ein Fehler ist aufgetreten.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Verbindungsfehler. Bitte versuchen Sie es erneut.");
      setStatus("error");
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#060c1a]">
        {/* ── Hero ── */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(250,204,21,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <h1 className="font-[Syne] font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] mb-5">
              Sprechen Sie mit{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                uns
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Haben Sie Fragen zu EU-Regulierungen oder benötigen Sie eine Compliance-Ersteinschätzung? Wir melden uns innerhalb von 24 Stunden.
            </p>
          </div>
        </section>

        {/* ── Quick Links ── */}
        <section className="pb-8 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 sm:p-6">
              <p className="text-xs font-semibold text-slate-400 mb-3">
                Vielleicht finden Sie hier schon eine Antwort:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "FAQ", href: "/faq", icon: "❓" },
                  { label: "Regulierung-Finder", href: "/tools/regulierung-finder", icon: "🧭" },
                  { label: "Kosten-Kalkulator", href: "/tools/kosten-kalkulator", icon: "💰" },
                  { label: "Reifegrad-Check", href: "/tools/reifegrad-check", icon: "📊" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all text-xs font-medium text-slate-300 hover:text-yellow-400"
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Form Section ── */}
        <section className="pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-8 sm:p-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M9 16l5 5 9-9" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="font-[Syne] font-bold text-xl text-white mb-3">
                  Anfrage gesendet!
                </h2>
                <p className="text-sm text-slate-400 mb-6">
                  Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-slate-900"
                  style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)" }}
                >
                  Zur Startseite
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8 space-y-5">
                  <h2 className="font-[Syne] font-bold text-lg text-white mb-2">
                    Kontaktdaten
                  </h2>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Name" name="name" type="text" placeholder="Max Mustermann" required />
                    <FormField label="E-Mail" name="email" type="email" placeholder="max@unternehmen.at" required />
                  </div>

                  {/* Company + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Unternehmen" name="company" type="text" placeholder="Muster GmbH" />
                    <FormField label="Telefon" name="phone" type="tel" placeholder="+43 1 234 5678" />
                  </div>

                  {/* Company Size + Branche */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company_size" className="block text-xs font-semibold text-slate-400 mb-1.5">
                        Unternehmensgröße
                      </label>
                      <select
                        id="company_size"
                        name="company_size"
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-400/40 transition-colors"
                      >
                        <option value="">Bitte wählen</option>
                        {COMPANY_SIZES.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    <FormField label="Branche" name="branche" type="text" placeholder="z.B. IT, Gesundheit, Industrie" />
                  </div>
                </div>

                {/* Interests */}
                <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
                  <h2 className="font-[Syne] font-bold text-lg text-white mb-4">
                    Welche Regulierungen betreffen Sie?
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {INTERESTS.map((interest) => (
                      <label
                        key={interest.value}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          name={`interest-${interest.value}`}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-yellow-400 focus:ring-yellow-400/50"
                        />
                        <span className="text-xs text-slate-300">{interest.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Urgency + Message */}
                <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8 space-y-5">
                  <h2 className="font-[Syne] font-bold text-lg text-white mb-4">
                    Ihre Nachricht
                  </h2>

                  {/* Urgency */}
                  <div>
                    <label htmlFor="urgency" className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Zeitrahmen für Umsetzung
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-400/40 transition-colors"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="urgent">Dringend (nächste 4 Wochen)</option>
                      <option value="soon">Bald (1–3 Monate)</option>
                      <option value="planned">Geplant (3–6 Monate)</option>
                      <option value="exploring">Erst orientieren</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihre Compliance-Herausforderung..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-800/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-yellow-400/40 transition-colors resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="space-y-3 px-1">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="gdpr_consent"
                      required
                      className="mt-0.5 w-4 h-4 rounded border-white/20 bg-slate-800 text-yellow-400 focus:ring-yellow-400/50"
                    />
                    <span className="text-xs text-slate-400 leading-relaxed">
                      Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                      <Link href="/datenschutz" className="text-yellow-400/80 underline underline-offset-2">
                        Datenschutzerklärung
                      </Link>{" "}
                      zu. <span className="text-red-400">*</span>
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="commercial_consent"
                      className="mt-0.5 w-4 h-4 rounded border-white/20 bg-slate-800 text-yellow-400 focus:ring-yellow-400/50"
                    />
                    <span className="text-xs text-slate-400 leading-relaxed">
                      Ich möchte Informationen zu Compliance-Angeboten und -Partnern erhalten (optional, jederzeit widerrufbar).
                    </span>
                  </label>
                </div>

                {/* Error */}
                {status === "error" && (
                  <div role="alert" className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-900 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #FACC15, #EAB308)",
                    boxShadow: "0 8px 32px rgba(250,204,21,0.3), 0 2px 8px rgba(250,204,21,0.2)",
                  }}
                >
                  {status === "submitting" ? "Wird gesendet..." : "Anfrage senden"}
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  <span className="text-red-400">*</span> Pflichtfeld. Wir melden uns innerhalb von 24 Stunden.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ── Form Field ── */

function FormField({
  label,
  name,
  type,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-semibold text-slate-400 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg bg-slate-800/60 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-yellow-400/40 transition-colors"
      />
    </div>
  );
}
