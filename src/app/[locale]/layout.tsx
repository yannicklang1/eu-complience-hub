import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CookieConsent from "@/components/CookieConsent";
import AdBlockOverlay from "@/components/AdBlockOverlay";
import { AdSenseScript } from "@/components/AdSense";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import BackToTop from "@/components/BackToTop";
import HtmlLangSetter from "@/components/HtmlLangSetter";
import { BASE_URL } from "@/lib/constants";
import { I18nProvider } from "@/i18n/provider";
import { getMessages } from "@/i18n/get-messages";
import { LOCALES, isValidLocale } from "@/i18n/config";
import type { Locale, EUCountryCode } from "@/i18n/config";
import { CountryProvider } from "@/i18n/country-context";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Generate static params for all supported locales.
 * This ensures /de, /en, /fr, /es, /it are all pre-rendered.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Locale-specific metadata — adds canonical URL and hreflang alternates
 * for each supported locale. The root layout provides the base metadata
 * (title, description, OG); this layer adds locale-aware linking.
 */
export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${BASE_URL}/${l}`]),
  ) as Record<string, string>;

  return {
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
  };
}

/**
 * Map locale to the most likely default country.
 * The actual country is resolved client-side from the cookie
 * (which is set by middleware via Vercel geo headers).
 */
const LOCALE_DEFAULT_COUNTRY: Record<string, EUCountryCode> = {
  de: "AT",
  en: "IE",
  fr: "FR",
  es: "ES",
  it: "IT",
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale — show 404 for invalid locale segments
  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);
  const initialCountry = LOCALE_DEFAULT_COUNTRY[locale] ?? "AT";

  return (
    <I18nProvider locale={locale as Locale} messages={messages}>
      <CountryProvider initialCountry={initialCountry}>
        <HtmlLangSetter locale={locale} />
        <a href="#main-content" className="skip-link">
          {messages.a11y.skipToContent}
        </a>
        <main id="main-content">{children}</main>
        <CookieConsent />
        <AdBlockOverlay />
        <GoogleAnalytics />
        <AdSenseScript />
        <BackToTop />
      </CountryProvider>
    </I18nProvider>
  );
}
