/* ─────────────────── Locale Detection Middleware ─────────────────── */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, COUNTRY_TO_LOCALE, isValidLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { createSupabaseMiddlewareClient } from "@/lib/supabase-auth";

/** Cookie name for persisted locale preference */
const LOCALE_COOKIE = "locale";

/** Paths that should NOT be locale-prefixed */
const EXCLUDED_PREFIXES = [
  "/api/",
  "/admin/",
  "/auth/",
  "/portal/",
  "/_next/",
  "/favicon",
  "/robots",
  "/sitemap",
  "/.well-known/",
  "/newsletter/",
  "/opengraph-image",
];

/** Static file extensions to skip */
const STATIC_EXTENSIONS = /\.(ico|png|jpg|jpeg|gif|svg|webp|avif|woff2?|ttf|css|js|map|xml|txt|json)$/;

function shouldSkip(pathname: string): boolean {
  if (STATIC_EXTENSIONS.test(pathname)) return true;
  return EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Detect preferred locale from multiple sources (priority order):
 * 1. Cookie (user previously chose)
 * 2. Vercel Geo Header (x-vercel-ip-country)
 * 3. Accept-Language Header
 * 4. Default locale (de)
 */
function detectLocale(request: NextRequest): Locale {
  // 1. Cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Vercel Geo Header
  const country = request.headers.get("x-vercel-ip-country");
  if (country) {
    const geoLocale = COUNTRY_TO_LOCALE[country.toUpperCase()];
    if (geoLocale) return geoLocale;
  }

  // 3. Accept-Language Header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    // Parse "de-AT,de;q=0.9,en;q=0.8" → try each language
    const languages = acceptLanguage
      .split(",")
      .map((part) => {
        const [lang, qPart] = part.trim().split(";");
        const q = qPart ? parseFloat(qPart.replace("q=", "")) : 1;
        return { lang: lang.trim().toLowerCase(), q };
      })
      .sort((a, b) => b.q - a.q);

    for (const { lang } of languages) {
      // Try exact match first: "de", "en", "fr"
      const exact = lang.split("-")[0];
      if (isValidLocale(exact)) return exact;
    }
  }

  // 4. Fallback
  return DEFAULT_LOCALE;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths (except /auth/ and /portal/ which need session handling)
  const needsAuth = pathname.startsWith("/portal") || pathname.startsWith("/auth/");
  if (shouldSkip(pathname) && !needsAuth) {
    return NextResponse.next();
  }

  // ── Supabase session refresh for auth/portal routes ──
  if (needsAuth) {
    const response = NextResponse.next({ request });
    const supabase = createSupabaseMiddlewareClient(request, response);

    // Refresh session (keeps auth tokens fresh)
    const { data: { user } } = await supabase.auth.getUser();

    // Protect /portal/* — redirect to login if not authenticated
    if (pathname.startsWith("/portal") && !user) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect logged-in users away from login page
    if (pathname === "/auth/login" && user) {
      return NextResponse.redirect(new URL("/portal", request.url));
    }

    return response;
  }

  // Skip remaining excluded paths
  if (shouldSkip(pathname)) {
    return NextResponse.next();
  }

  // Check if URL already has a valid locale prefix
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    // URL already has locale prefix — pass through and set cookie
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
    return response;
  }

  // Bare URL (no locale prefix) → redirect to detected locale
  const locale = detectLocale(request);
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(newUrl, 308);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
