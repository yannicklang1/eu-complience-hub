import { NextResponse } from "next/server";

/**
 * /.well-known/security.txt — RFC 9116
 * Provides vulnerability disclosure information.
 */
export function GET() {
  const body = [
    "# EU Compliance Hub — Security Policy",
    "# https://securitytxt.org/",
    "",
    "Contact: mailto:security@eu-compliance-hub.eu",
    "Preferred-Languages: de, en",
    "Canonical: https://eu-compliance-hub.eu/.well-known/security.txt",
    `Expires: ${new Date(Date.now() + 365 * 86400000).toISOString()}`,
    "",
    "# We appreciate responsible disclosure of security vulnerabilities.",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
