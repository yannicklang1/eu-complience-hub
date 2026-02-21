/**
 * EU Compliance Hub — Brand Logo System
 * ──────────────────────────────────────
 *
 * DESIGN: Layered Geometric Shield + Section Symbol (§)
 *
 * The § (Paragraphenzeichen) is THE universal European legal symbol.
 * Combined with a modern, layered shield, it creates a mark that
 * communicates compliance expertise, protection, and legal authority.
 *
 * CONSTRUCTION:
 *   Layer 1 — Outer shield shell (navy gradient, gold edge glow)
 *   Layer 2 — Inner shield field (darker navy, creates depth frame)
 *   Layer 3 — Bold § in gold accent, optically centered
 *   Detail  — Capstone dot at shield peak
 *
 * The shield uses angular shoulders + curved bottom (pointed) for a
 * modern, non-heraldic feel. The ~5-unit gap between outer and inner
 * shells creates a visible "frame" that adds sophistication and depth.
 *
 * BRAND COLORS:
 *   #0A2540  Deep navy (primary)
 *   #0D3068  Brand ultra (secondary)
 *   #FACC15  Electric gold (accent)
 *   #EAB308  Deeper gold (gradient end)
 */

interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * BrandLogo — Square icon mark.
 *
 * ViewBox: 64x64. Renders at any pixel size via `size` prop.
 * Tested sizes: 24px (favicon), 36px (header), 120px+ (hero).
 *
 * The § is rendered as SVG <text> using the brand font Syne (loaded
 * via Google Fonts in layout.tsx). Fallback stack: Georgia, Times,
 * serif — all of which render an excellent §.
 */
export function BrandLogo({ size = 36, className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="EU Compliance Hub Logo"
    >
      <defs>
        {/* Shield body: lighter navy at top, deeper at bottom */}
        <linearGradient id="ech-g1" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0F2D58" />
          <stop offset="1" stopColor="#0A2540" />
        </linearGradient>
        {/* Inner field: darker for contrast */}
        <linearGradient id="ech-g2" x1="32" y1="12" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0B2245" />
          <stop offset="1" stopColor="#071B33" />
        </linearGradient>
        {/* Edge glow: gold fading diagonally */}
        <linearGradient id="ech-g3" x1="10" y1="4" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FACC15" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#FACC15" stopOpacity="0.2" />
          <stop offset="1" stopColor="#FACC15" stopOpacity="0.05" />
        </linearGradient>
        {/* Gold gradient for § symbol */}
        <linearGradient id="ech-g4" x1="28" y1="16" x2="36" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FACC15" />
          <stop offset="1" stopColor="#EAB308" />
        </linearGradient>
        {/* Top-light sheen for 3D depth */}
        <linearGradient id="ech-g5" x1="32" y1="6" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── LAYER 1: OUTER SHIELD ──
          Angular top (point + straight sides to shoulders),
          curved bottom (pointed base via cubic beziers).
          Width: 46 units. Height: 56 units. */}
      <path
        d="M32 4 L55 14.5 V30 C55 44 45 54 32 60 C19 54 9 44 9 30 V14.5 Z"
        fill="url(#ech-g1)"
      />
      {/* Gold edge glow */}
      <path
        d="M32 4 L55 14.5 V30 C55 44 45 54 32 60 C19 54 9 44 9 30 V14.5 Z"
        fill="none"
        stroke="url(#ech-g3)"
        strokeWidth="1.2"
      />

      {/* ── LAYER 2: INNER SHIELD ──
          Inset ~5 units from outer. Same proportions.
          The gap between layers = the "frame" effect. */}
      <path
        d="M32 10 L50 18.5 V30 C50 42 42 50 32 55 C22 50 14 42 14 30 V18.5 Z"
        fill="url(#ech-g2)"
      />
      {/* Subtle inner edge */}
      <path
        d="M32 10 L50 18.5 V30 C50 42 42 50 32 55 C22 50 14 42 14 30 V18.5 Z"
        fill="none"
        stroke="#FACC15"
        strokeOpacity="0.08"
        strokeWidth="0.5"
      />
      {/* Light sheen overlay */}
      <path
        d="M32 10 L50 18.5 V30 C50 42 42 50 32 55 C22 50 14 42 14 30 V18.5 Z"
        fill="url(#ech-g5)"
      />

      {/* ── LAYER 3: SECTION SYMBOL (§) ──
          The § is THE defining element. It tells you instantly:
          "This is about law. This is about regulation."

          Using Syne Bold (the brand heading font) for consistency.
          Size 34 at viewBox scale fills ~65% of inner shield height.
          y=44 positions the baseline for optical centering
          (the shield's visual center is lower than geometric center
          because the top is narrower than the bottom). */}
      <text
        x="32"
        y="44"
        textAnchor="middle"
        dominantBaseline="auto"
        fontFamily="Syne, Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="34"
        fill="url(#ech-g4)"
        style={{ userSelect: "none" } as React.CSSProperties}
      >
        &#167;
      </text>

      {/* ── CAPSTONE ACCENT ──
          Small gold dot at the shield's peak.
          Like a gem or a signal light — adds polish. */}
      <circle cx="32" cy="10" r="1.3" fill="#FACC15" opacity="0.45" />
    </svg>
  );
}


/**
 * BrandLogoFull — Icon mark + wordmark "EU Compliance Hub".
 *
 * Layout: icon | text stack
 * Typography: Syne 800 for "EU Compliance", DM Mono for "HUB"
 * This matches the existing header/footer typographic pattern.
 */
export function BrandLogoFull({
  size = 36,
  className = "",
  darkBackground = true,
}: LogoProps & { darkBackground?: boolean }) {
  const textColor = darkBackground ? "#ffffff" : "#0A2540";
  const subColor = darkBackground ? "rgba(255,255,255,0.35)" : "#7a8db0";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandLogo size={size} />
      <div className="flex flex-col">
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: size * 0.42,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: textColor,
          }}
        >
          EU Compliance
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontWeight: 400,
            fontSize: size * 0.24,
            lineHeight: 1,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: subColor,
            marginTop: size * 0.08,
          }}
        >
          Hub
        </span>
      </div>
    </div>
  );
}

export default BrandLogo;
