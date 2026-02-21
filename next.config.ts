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
    // Prevent reflected XSS (legacy header, still useful for older browsers)
    key: "X-XSS-Protection",
    value: "1; mode=block",
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
