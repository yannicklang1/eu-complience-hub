"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "eu-compliance-hub-adblock";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface StoredState {
  dismissCount: number;
  lastDetected: number; // timestamp
}

function getStored(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredState;
    // Check TTL — reset after 24h
    if (Date.now() - parsed.lastDetected > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function setStored(state: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable
  }
}

/* ─── Detection Methods ─── */

/** Method 1: Bait element — insert a div with ad-like classes and check if hidden */
function detectBait(): Promise<boolean> {
  return new Promise((resolve) => {
    const bait = document.createElement("div");
    bait.className = "ad-banner adsbox ad-placeholder textads banner-ads";
    bait.style.cssText =
      "position:absolute;top:-10px;left:-10px;width:1px;height:1px;overflow:hidden;";
    bait.innerHTML = "&nbsp;";
    document.body.appendChild(bait);

    // Give adblocker time to process
    setTimeout(() => {
      const blocked =
        bait.offsetHeight === 0 ||
        bait.offsetParent === null ||
        bait.clientHeight === 0 ||
        getComputedStyle(bait).display === "none" ||
        getComputedStyle(bait).visibility === "hidden";

      bait.remove();
      resolve(blocked);
    }, 120);
  });
}

/** Method 2: Script probe — try to load /ads-check.js */
function detectScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Reset any previous load
    (window as unknown as Record<string, unknown>).__adCheckLoaded = undefined;

    const script = document.createElement("script");
    script.src = `/ads-check.js?_=${Date.now()}`;
    script.async = true;

    const cleanup = () => {
      script.remove();
    };

    script.onload = () => {
      // Script loaded — check if it actually executed
      setTimeout(() => {
        const loaded = (window as unknown as Record<string, unknown>).__adCheckLoaded === true;
        cleanup();
        resolve(!loaded); // If not loaded/executed, adblocker present
      }, 50);
    };

    script.onerror = () => {
      cleanup();
      resolve(true); // Script blocked
    };

    // Timeout fallback
    setTimeout(() => {
      cleanup();
      resolve(true);
    }, 2000);

    document.head.appendChild(script);
  });
}

/** Method 3: Fetch probe — try to fetch a URL that adblockers typically block */
function detectFetch(): Promise<boolean> {
  return new Promise((resolve) => {
    fetch(`/ads-check.js?_=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
    })
      .then((res) => {
        resolve(!res.ok);
      })
      .catch(() => {
        resolve(true); // Fetch blocked
      });

    // Timeout
    setTimeout(() => resolve(false), 2000);
  });
}

/* ─── Combined Detection ─── */
async function runDetection(): Promise<boolean> {
  const results = await Promise.all([
    detectBait(),
    detectScript(),
    detectFetch(),
  ]);

  // At least 2 of 3 methods must agree
  const positiveCount = results.filter(Boolean).length;
  return positiveCount >= 2;
}

/* ─── Hook ─── */
export function useAdBlockDetect() {
  const [detected, setDetected] = useState<boolean | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [dismissCount, setDismissCount] = useState(0);

  // Load stored state & run detection
  useEffect(() => {
    const stored = getStored();
    if (stored) {
      setDismissCount(stored.dismissCount);
    }

    // Run detection after a short delay to not block initial render
    const timer = setTimeout(() => {
      runDetection().then((isBlocked) => {
        setDetected(isBlocked);
        setLoaded(true);

        if (isBlocked && !stored) {
          setStored({ dismissCount: 0, lastDetected: Date.now() });
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    setDismissCount((prev) => {
      const next = prev + 1;
      setStored({ dismissCount: next, lastDetected: Date.now() });
      return next;
    });
  }, []);

  // Re-check: user claims to have disabled adblocker
  const recheck = useCallback(() => {
    setLoaded(false);
    setDetected(null);

    setTimeout(() => {
      runDetection().then((isBlocked) => {
        setDetected(isBlocked);
        setLoaded(true);

        if (!isBlocked) {
          // Reset everything — adblocker is off
          setDismissCount(0);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {}
        }
      });
    }, 300);
  }, []);

  return {
    /** Whether an adblocker was detected (null = still checking) */
    detected,
    /** Whether the detection has finished loading */
    loaded,
    /** How many times the user dismissed the soft overlay */
    dismissCount,
    /** Dismiss the soft overlay (increments count) */
    dismiss,
    /** Re-run detection (e.g. after user claims to have disabled adblocker) */
    recheck,
    /** True when soft overlay exhausted — show hard paywall */
    shouldShowPaywall: dismissCount >= 3,
  };
}
