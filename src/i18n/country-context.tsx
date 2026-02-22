"use client";

/* ─────────────────── Country Context + Provider ─────────────────── */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { EUCountryCode } from "@/i18n/config";
import { EU_COUNTRY_CODES, COUNTRY_META, getCountryData } from "@/i18n/country/index";
import type { CountryData } from "@/i18n/country/types";

const COOKIE_KEY = "eu_country";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

interface CountryContextValue {
  /** Selected EU country code */
  countryCode: EUCountryCode;
  /** Full country data (loaded async, may be null while loading) */
  countryData: CountryData | null;
  /** Set selected country and persist in cookie */
  setCountry: (code: EUCountryCode) => void;
  /** Whether country data is loading */
  loading: boolean;
}

const CountryContext = createContext<CountryContextValue>({
  countryCode: "AT",
  countryData: null,
  setCountry: () => {},
  loading: false,
});

function getCookieCountry(): EUCountryCode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`));
  const val = match ? decodeURIComponent(match[1]) : null;
  if (val && (EU_COUNTRY_CODES as string[]).includes(val)) return val as EUCountryCode;
  return null;
}

function setCookieCountry(code: EUCountryCode) {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(code)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

interface CountryProviderProps {
  children: ReactNode;
  /** Initial country code from server (from Vercel geo or cookie) */
  initialCountry?: EUCountryCode;
}

export function CountryProvider({ children, initialCountry = "AT" }: CountryProviderProps) {
  // Use cookie value if available (client-side), otherwise server-provided default
  const [countryCode, setCountryCode] = useState<EUCountryCode>(
    () => getCookieCountry() ?? initialCountry,
  );
  const [countryData, setCountryData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load full country data whenever countryCode changes
  useEffect(() => {
    let cancelled = false;
    getCountryData(countryCode).then((data) => {
      if (!cancelled) {
        setCountryData(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [countryCode]);

  const setCountry = useCallback((code: EUCountryCode) => {
    setCookieCountry(code);
    setCountryCode(code);
    setLoading(true);
  }, []);

  return (
    <CountryContext.Provider value={{ countryCode, countryData, setCountry, loading }}>
      {children}
    </CountryContext.Provider>
  );
}

/** Hook to access selected country data */
export function useCountry() {
  return useContext(CountryContext);
}

/** Get country display name for current locale */
export function getCountryName(code: EUCountryCode, locale: string): string {
  const meta = COUNTRY_META[code];
  if (!meta) return code;
  if (locale === "de") return meta.nameDE;
  if (locale === "fr" || locale === "es" || locale === "it") return meta.nameEN;
  return meta.nameEN;
}
