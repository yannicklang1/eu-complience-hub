"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ===============================================================
   TYPES & CONSTANTS
   =============================================================== */

interface LeadCaptureFormProps {
  sourceTool: string;
  toolResults?: Record<string, unknown>;
  accent?: string;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

interface FormData {
  email: string;
  contact_name: string;
  company_name: string;
  phone: string;
  company_size: string;
  branche: string;
  country: string;
  gdpr_consent: boolean;
  marketing_consent: boolean;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const STEP_LABELS = ["Kontakt", "Unternehmen", "Zusammenfassung & Einwilligung"] as const;
const TOTAL_STEPS = STEP_LABELS.length;

const COMPANY_SIZE_OPTIONS = [
  { value: "micro", label: "Kleinstunternehmen (< 10 MA)" },
  { value: "small", label: "Kleinunternehmen (10-49 MA)" },
  { value: "medium", label: "Mittleres Unternehmen (50-249 MA)" },
  { value: "large", label: "Großunternehmen (250+ MA)" },
] as const;

const BRANCHE_OPTIONS = [
  "IT & Software",
  "Finanzdienstleistungen",
  "Gesundheitswesen",
  "Energie & Versorgung",
  "Produktion & Industrie",
  "Transport & Logistik",
  "Handel & E-Commerce",
  "Öffentliche Verwaltung",
  "Telekommunikation",
  "Beratung & Dienstleistung",
  "Bildung & Forschung",
  "Sonstige",
] as const;

const COUNTRY_OPTIONS = [
  { value: "AT", label: "🇦🇹 Österreich" },
  { value: "DE", label: "🇩🇪 Deutschland" },
  { value: "CH", label: "🇨🇭 Schweiz" },
  { value: "LI", label: "🇱🇮 Liechtenstein" },
  { value: "LU", label: "🇱🇺 Luxemburg" },
  { value: "IT", label: "🇮🇹 Italien" },
  { value: "FR", label: "🇫🇷 Frankreich" },
  { value: "NL", label: "🇳🇱 Niederlande" },
  { value: "BE", label: "🇧🇪 Belgien" },
  { value: "PL", label: "🇵🇱 Polen" },
  { value: "CZ", label: "🇨🇿 Tschechien" },
  { value: "SK", label: "🇸🇰 Slowakei" },
  { value: "HU", label: "🇭🇺 Ungarn" },
  { value: "SI", label: "🇸🇮 Slowenien" },
  { value: "HR", label: "🇭🇷 Kroatien" },
  { value: "OTHER_EU", label: "🇪🇺 Anderes EU-Land" },
  { value: "OTHER", label: "🌍 Nicht-EU" },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SLIDE_EASE = [0.16, 1, 0.3, 1] as const;

const INITIAL_FORM_DATA: FormData = {
  email: "",
  contact_name: "",
  company_name: "",
  phone: "",
  company_size: "",
  branche: "",
  country: "",
  gdpr_consent: false,
  marketing_consent: false,
};

/* ===============================================================
   HELPERS
   =============================================================== */

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};

  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
    }
  }

  return utm;
}

function getSourcePage(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/* ===============================================================
   COMPONENT
   =============================================================== */

export default function LeadCaptureForm({
  sourceTool,
  toolResults,
  accent = "#0A2540",
  title = "Ergebnisse sichern & Updates erhalten",
  subtitle = "Wir senden Ihnen Ihre Ergebnisse und informieren Sie bei relevanten Änderungen.",
  onSuccess,
}: LeadCaptureFormProps): React.JSX.Element {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [emailError, setEmailError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  // Clear email error when user edits the email field
  useEffect(() => {
    if (emailError && formData.email) {
      setEmailError("");
    }
  }, [formData.email, emailError]);

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const canProceedFromStep = useCallback(
    (currentStep: number): boolean => {
      if (currentStep === 0) {
        return formData.email.length > 0 && isValidEmail(formData.email);
      }
      if (currentStep === 2) {
        return formData.gdpr_consent;
      }
      return true;
    },
    [formData.email, formData.gdpr_consent],
  );

  function handleNext(): void {
    if (step === 0 && !isValidEmail(formData.email)) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }

    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    }
  }

  function handleBack(): void {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  async function handleSubmit(): Promise<void> {
    if (!formData.gdpr_consent) return;

    setSubmitStatus("loading");
    setSubmitErrorMessage("");

    const payload = {
      ...formData,
      source_tool: sourceTool,
      tool_results: toolResults ?? null,
      source_page: getSourcePage(),
      ...getUtmParams(),
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Fehler ${response.status}`);
      }

      setSubmitStatus("success");
      onSuccess?.();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Ein unbekannter Fehler ist aufgetreten.";
      setSubmitErrorMessage(message);
      setSubmitStatus("error");
    }
  }

  /* ─── Success State ─── */
  if (submitStatus === "success") {
    return (
      <div
        className="rounded-2xl border p-8 text-center"
        style={{
          borderColor: `${accent}20`,
          background: `linear-gradient(135deg, ${accent}08, ${accent}03)`,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: `${accent}15` }}
        >
          <motion.svg
            className="w-8 h-8"
            style={{ color: accent }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </motion.svg>
        </motion.div>

        <h3 className="font-[Syne] font-extrabold text-2xl text-[#060c1a] mb-2">
          Vielen Dank!
        </h3>
        <p className="text-[15px] text-[#7a8db0] leading-relaxed max-w-sm mx-auto">
          Ihre Ergebnisse werden Ihnen per E-Mail zugesendet. Bei relevanten Gesetzesänderungen informieren wir Sie.
        </p>
      </div>
    );
  }

  /* ─── Form ─── */
  return (
    <div
      className="rounded-2xl border shadow-lg overflow-hidden"
      style={{
        borderColor: `${accent}15`,
        background: `linear-gradient(180deg, ${accent}06 0%, white 40%)`,
      }}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
        <h3 className="font-[Syne] font-extrabold text-xl text-[#060c1a] mb-1">
          {title}
        </h3>
        <p className="text-[14px] text-[#7a8db0] leading-relaxed">{subtitle}</p>
      </div>

      {/* Step Indicator */}
      <div className="px-6 sm:px-8 pb-4">
        <div className="flex items-center gap-2">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1 last:flex-initial">
              <button
                type="button"
                onClick={() => {
                  if (i < step) setStep(i);
                }}
                disabled={i > step}
                className="flex items-center gap-2 group"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all duration-300 flex-shrink-0"
                  style={
                    i <= step
                      ? { background: accent, color: "white" }
                      : { background: "#e8ecf4", color: "#7a8db0" }
                  }
                >
                  {i < step ? (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className="text-[12px] font-medium hidden sm:inline transition-colors"
                  style={{ color: i <= step ? "#060c1a" : "#7a8db0" }}
                >
                  {label}
                </span>
              </button>
              {i < TOTAL_STEPS - 1 && (
                <div className="flex-1 h-px mx-1" style={{ background: i < step ? accent : "#e8ecf4" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: [...SLIDE_EASE] }}
          >
            {/* Step 0: Kontakt */}
            {step === 0 && (
              <div className="space-y-4">
                <InputField
                  label="E-Mail-Adresse"
                  type="email"
                  value={formData.email}
                  onChange={(v) => updateField("email", v)}
                  placeholder="ihre@firma.de"
                  required
                  error={emailError}
                  accent={accent}
                />
                <InputField
                  label="Name"
                  type="text"
                  value={formData.contact_name}
                  onChange={(v) => updateField("contact_name", v)}
                  placeholder="Max Mustermann"
                  accent={accent}
                />
                <InputField
                  label="Unternehmen"
                  type="text"
                  value={formData.company_name}
                  onChange={(v) => updateField("company_name", v)}
                  placeholder="Mustermann GmbH"
                  accent={accent}
                />
              </div>
            )}

            {/* Step 1: Unternehmen */}
            {step === 1 && (
              <div className="space-y-4">
                <SelectField
                  label="Land"
                  value={formData.country}
                  onChange={(v) => updateField("country", v)}
                  options={COUNTRY_OPTIONS.map((c) => ({
                    value: c.value,
                    label: c.label,
                  }))}
                  placeholder="Bitte wählen..."
                  accent={accent}
                />
                <InputField
                  label="Telefon"
                  type="tel"
                  value={formData.phone}
                  onChange={(v) => updateField("phone", v)}
                  placeholder="+43 1 234 5678"
                  accent={accent}
                />
                <SelectField
                  label="Unternehmensgröße"
                  value={formData.company_size}
                  onChange={(v) => updateField("company_size", v)}
                  options={COMPANY_SIZE_OPTIONS.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                  placeholder="Bitte wählen..."
                  accent={accent}
                />
                <SelectField
                  label="Branche"
                  value={formData.branche}
                  onChange={(v) => updateField("branche", v)}
                  options={BRANCHE_OPTIONS.map((b) => ({ value: b, label: b }))}
                  placeholder="Bitte wählen..."
                  accent={accent}
                />
              </div>
            )}

            {/* Step 2: Zusammenfassung & Einwilligung */}
            {step === 2 && (
              <div className="space-y-5">
                {/* Summary */}
                <div className="rounded-xl bg-[#f8f9fd] border border-[#e8ecf4] p-4 space-y-2">
                  <SummaryLine label="E-Mail" value={formData.email} />
                  {formData.contact_name && (
                    <SummaryLine label="Name" value={formData.contact_name} />
                  )}
                  {formData.company_name && (
                    <SummaryLine label="Unternehmen" value={formData.company_name} />
                  )}
                  {formData.phone && (
                    <SummaryLine label="Telefon" value={formData.phone} />
                  )}
                  {formData.company_size && (
                    <SummaryLine
                      label="Größe"
                      value={
                        COMPANY_SIZE_OPTIONS.find((o) => o.value === formData.company_size)
                          ?.label ?? formData.company_size
                      }
                    />
                  )}
                  {formData.country && (
                    <SummaryLine
                      label="Land"
                      value={
                        COUNTRY_OPTIONS.find((c) => c.value === formData.country)
                          ?.label ?? formData.country
                      }
                    />
                  )}
                  {formData.branche && (
                    <SummaryLine label="Branche" value={formData.branche} />
                  )}
                </div>

                {/* GDPR Consent */}
                <CheckboxField
                  checked={formData.gdpr_consent}
                  onChange={(v) => updateField("gdpr_consent", v)}
                  accent={accent}
                  required
                >
                  Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                  <Link
                    href="/datenschutz"
                    className="underline underline-offset-2 transition-colors"
                    style={{ color: accent }}
                  >
                    Datenschutzerklärung
                  </Link>{" "}
                  zu.*
                </CheckboxField>

                {/* Marketing Consent */}
                <CheckboxField
                  checked={formData.marketing_consent}
                  onChange={(v) => updateField("marketing_consent", v)}
                  accent={accent}
                >
                  Ich möchte per E-Mail über EU-Compliance Updates informiert werden.
                </CheckboxField>

                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                    <p className="text-[13px] text-red-700 leading-relaxed">
                      {submitErrorMessage || "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#e8ecf4]">
          {step > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-[#3a4a6b] hover:bg-[#f0f2f8] transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Zurück
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceedFromStep(step)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 ${
                canProceedFromStep(step)
                  ? "text-white hover:-translate-y-0.5 shadow-lg"
                  : "bg-[#e0e5f0] text-[#a0a8b8] cursor-not-allowed"
              }`}
              style={
                canProceedFromStep(step)
                  ? {
                      background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                      boxShadow: `0 4px 16px ${accent}40`,
                    }
                  : undefined
              }
            >
              Weiter
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceedFromStep(step) || submitStatus === "loading"}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-[Syne] font-bold transition-all duration-300 ${
                canProceedFromStep(step) && submitStatus !== "loading"
                  ? "text-white hover:-translate-y-0.5 shadow-lg"
                  : "bg-[#e0e5f0] text-[#a0a8b8] cursor-not-allowed"
              }`}
              style={
                canProceedFromStep(step) && submitStatus !== "loading"
                  ? {
                      background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                      boxShadow: `0 4px 16px ${accent}40`,
                    }
                  : undefined
              }
            >
              {submitStatus === "loading" ? (
                <>
                  <LoadingSpinner />
                  Wird gesendet...
                </>
              ) : (
                <>
                  Ergebnisse senden
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   SUB-COMPONENTS
   =============================================================== */

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  accent: string;
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  accent,
}: InputFieldProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#060c1a] mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-lg border bg-white text-sm text-[#060c1a] placeholder:text-[#7a8db0] transition-all focus:outline-none"
        style={{
          borderColor: error ? "#ef4444" : "#d8dff0",
          boxShadow: error
            ? "0 0 0 2px rgba(239,68,68,0.2)"
            : undefined,
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = accent;
            e.target.style.boxShadow = `0 0 0 2px ${accent}20`;
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.target.style.borderColor = "#d8dff0";
            e.target.style.boxShadow = "none";
          }
        }}
      />
      {error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  accent: string;
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  accent,
}: SelectFieldProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-[13px] font-medium text-[#060c1a] mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-[#d8dff0] bg-white text-sm text-[#060c1a] transition-all focus:outline-none appearance-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237a8db0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = accent;
          e.target.style.boxShadow = `0 0 0 2px ${accent}20`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d8dff0";
          e.target.style.boxShadow = "none";
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface CheckboxFieldProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  accent: string;
  required?: boolean;
  children: React.ReactNode;
}

function CheckboxField({
  checked,
  onChange,
  accent,
  required = false,
  children,
}: CheckboxFieldProps): React.JSX.Element {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-required={required}
        onClick={() => onChange(!checked)}
        className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
        style={
          checked
            ? { background: accent, borderColor: accent }
            : { background: "white", borderColor: "#d0d5e0" }
        }
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <span className="text-[13px] text-[#3a4a6b] leading-relaxed">{children}</span>
    </label>
  );
}

interface SummaryLineProps {
  label: string;
  value: string;
}

function SummaryLine({ label, value }: SummaryLineProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="font-mono text-[11px] text-[#7a8db0] uppercase tracking-wider">
        {label}
      </span>
      <span className="text-[13px] font-medium text-[#060c1a] text-right max-w-[60%] truncate">
        {value}
      </span>
    </div>
  );
}

function LoadingSpinner(): React.JSX.Element {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
