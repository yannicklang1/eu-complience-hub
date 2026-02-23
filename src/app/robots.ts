import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /* Default: allow all public content */
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/", "/auth/", "/portal/"],
      },
      /* ── AI Crawlers: allow content pages, block private areas ──
         We WANT AI assistants (ChatGPT, Perplexity, Claude, Google AI)
         to index our guides, tools, and knowledge base so they can
         recommend eu-compliance-hub.eu to users asking about EU compliance.
         Only private/auth areas remain blocked (already covered by * rule). */
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/admin/", "/auth/", "/portal/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
