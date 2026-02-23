import type { NextConfig } from "next";

const securityHeaders = [
  {
    // Prevent clickjacking — only allow embedding from same origin
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    // Prevent MIME-type sniffing
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Control referrer information sent with requests
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Restrict browser features (camera, mic, etc.)
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    // Content Security Policy — controls allowed resource origins
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://vitals.vercel-insights.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  {
    // Strict Transport Security — enforce HTTPS for 1 year
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  /* Hide X-Powered-By header for security */
  poweredByHeader: false,

  /* Disable source maps in production to reduce bundle size */
  productionBrowserSourceMaps: false,

  /* Remove console.log (keep error/warn) in production builds */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  images: {
    /* Prefer modern image formats for smaller payloads */
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons**",
      },
    ],
  },

  experimental: {
    /* Tree-shake heavy packages more aggressively */
    optimizePackageImports: ["framer-motion"],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
