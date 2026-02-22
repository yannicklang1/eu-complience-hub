"use client";

import { useCountry } from "@/i18n/country-context";
import { COUNTRY_META } from "@/i18n/country";

/**
 * Lightweight client component that renders the selected country's
 * flag + name as a pill badge.  Drop into any server component hero.
 *
 * Two visual variants:
 * - "dark"  (default): for dark (#060c1a) backgrounds
 * - "light": for white / light-gray backgrounds
 */
export default function CountryBadge({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const { countryCode } = useCountry();
  const countryMeta = COUNTRY_META[countryCode];

  if (!countryMeta) return null;

  const styles =
    variant === "dark"
      ? "bg-white/[0.06] border-white/[0.1] text-white/60"
      : "bg-slate-100 border-slate-200 text-slate-500";

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${styles} ${className}`}
    >
      <span className="text-sm leading-none">{countryMeta.flag}</span>
      <span className="font-mono text-[10px] font-medium">
        {countryMeta.nameDE}
      </span>
    </div>
  );
}
