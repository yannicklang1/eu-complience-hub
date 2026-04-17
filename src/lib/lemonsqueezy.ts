/* ══════════════════════════════════════════════════════════════
   LemonSqueezy Integration — Checkout & Webhook helpers
   Merchant of Record handles EU VAT automatically
   ══════════════════════════════════════════════════════════════ */

import { log } from "@/lib/logger";
import { BASE_URL } from "@/lib/constants";

/* ── Env vars ── */
const API_KEY = process.env.LEMONSQUEEZY_API_KEY ?? "";
const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID ?? "";
const VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID ?? "";
const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET ?? "";

const LS_API = "https://api.lemonsqueezy.com/v1";

/* ── Types ── */
interface CheckoutCustomData {
  report_token: string;
  user_email: string;
}

interface CheckoutResponse {
  data: {
    attributes: {
      url: string;
    };
  };
}

/* ══════════════════════════════════════════════════════════════
   Create a LemonSqueezy Checkout session
   ══════════════════════════════════════════════════════════════ */
export async function createCheckout(
  reportToken: string,
  userEmail: string,
): Promise<{ checkoutUrl: string } | { error: string }> {
  if (!API_KEY || !STORE_ID || !VARIANT_ID) {
    log.error("[lemonsqueezy]", "Missing env vars", {
      hasKey: !!API_KEY,
      hasStore: !!STORE_ID,
      hasVariant: !!VARIANT_ID,
    });
    return { error: "Payment system not configured." };
  }

  try {
    const res = await fetch(`${LS_API}/checkouts`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: userEmail,
              custom: {
                report_token: reportToken,
                user_email: userEmail,
              } satisfies CheckoutCustomData,
            },
            product_options: {
              redirect_url: `${BASE_URL}/de/report/success?token=${reportToken}`,
            },
          },
          relationships: {
            store: { data: { type: "stores", id: STORE_ID } },
            variant: { data: { type: "variants", id: VARIANT_ID } },
          },
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      log.error("[lemonsqueezy]", "Checkout creation failed", {
        status: res.status,
        body: text.slice(0, 500),
      });
      return { error: "Checkout konnte nicht erstellt werden." };
    }

    const json = (await res.json()) as CheckoutResponse;
    return { checkoutUrl: json.data.attributes.url };
  } catch (err) {
    log.error("[lemonsqueezy]", "Checkout request error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { error: "Verbindung zum Zahlungssystem fehlgeschlagen." };
  }
}

/* ══════════════════════════════════════════════════════════════
   Verify webhook signature (HMAC-SHA256)
   ══════════════════════════════════════════════════════════════ */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string,
): Promise<boolean> {
  if (!WEBHOOK_SECRET) {
    log.error("[lemonsqueezy]", "WEBHOOK_SECRET not configured");
    return false;
  }

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
    const digest = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    /* Timing-safe comparison to prevent HMAC-oracle attacks.
       Both values must be the same byte length or timingSafeEqual throws. */
    if (digest.length !== signature.length) return false;
    const { timingSafeEqual } = await import("node:crypto");
    return timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch (err) {
    log.error("[lemonsqueezy]", "Signature verification error", {
      error: err instanceof Error ? err.message : String(err),
    });
    return false;
  }
}

/* ── Extract custom data from webhook payload ── */
export function extractCustomData(
  payload: Record<string, unknown>,
): CheckoutCustomData | null {
  try {
    const meta = payload.meta as Record<string, unknown> | undefined;
    const custom = meta?.custom_data as Record<string, unknown> | undefined;
    if (!custom?.report_token || !custom?.user_email) return null;
    return {
      report_token: String(custom.report_token),
      user_email: String(custom.user_email),
    };
  } catch {
    return null;
  }
}
