"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

/* ═══════════════════════════════════════════════════════════
   AuthButton — Shows "Anmelden" or "Mein Portal" based on auth state
   Used in Header component
   ═══════════════════════════════════════════════════════════ */

interface AuthButtonProps {
  scrolled: boolean;
  variant?: "desktop" | "mobile";
}

export default function AuthButton({ scrolled, variant = "desktop" }: AuthButtonProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    // Check current session
    supabase.auth.getUser().then(({ data }: { data: { user: { email?: string; user_metadata?: Record<string, string> } | null } }) => {
      if (data.user) {
        setIsLoggedIn(true);
        const name = data.user.user_metadata?.full_name ?? data.user.email ?? "";
        setInitials(
          name
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U",
        );
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: { user?: { user_metadata?: Record<string, string>; email?: string } } | null) => {
      setIsLoggedIn(!!session?.user);
      if (session?.user) {
        const name =
          session.user.user_metadata?.full_name ?? session.user.email ?? "";
        setInitials(
          name
            .split(" ")
            .map((w: string) => w[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U",
        );
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (variant === "mobile") {
    if (isLoggedIn) {
      return (
        <Link
          href="/portal"
          className="flex items-center gap-2 text-[13px] font-semibold text-[#0A2540] rounded-md px-4 py-2.5"
          style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)" }}
        >
          <span className="w-5 h-5 rounded-[4px] bg-[#0A2540]/15 flex items-center justify-center text-[9px] font-bold">
            {initials}
          </span>
          Mein Portal
        </Link>
      );
    }

    return (
      <Link
        href="/auth/login"
        className="text-[13px] font-semibold text-[#0A2540] rounded-md px-4 py-2.5 text-center"
        style={{ background: "linear-gradient(135deg, #FACC15, #EAB308)" }}
      >
        Anmelden
      </Link>
    );
  }

  // Desktop variant
  if (isLoggedIn) {
    return (
      <Link
        href="/portal"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ${
          scrolled
            ? "text-[#0A2540]/70 hover:text-[#0A2540] hover:bg-[#0A2540]/5"
            : "text-white/50 hover:text-white/80"
        }`}
      >
        <span
          className={`w-5 h-5 rounded-[4px] flex items-center justify-center text-[9px] font-semibold ${
            scrolled
              ? "bg-yellow-400/15 text-yellow-600"
              : "bg-white/[0.08] text-white/60"
          }`}
        >
          {initials}
        </span>
        Portal
      </Link>
    );
  }

  return (
    <Link
      href="/auth/login"
      className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-200 ${
        scrolled
          ? "text-[#0A2540]/50 hover:text-[#0A2540] hover:bg-[#0A2540]/5"
          : "text-white/40 hover:text-white/70"
      }`}
    >
      Anmelden
    </Link>
  );
}
