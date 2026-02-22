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
          className="flex items-center gap-2 text-sm font-[Syne] font-bold text-[#0A2540] bg-yellow-400 rounded-xl px-4 py-2.5"
        >
          <span className="w-6 h-6 rounded-full bg-[#0A2540]/20 flex items-center justify-center text-[10px] font-bold">
            {initials}
          </span>
          Mein Portal
        </Link>
      );
    }

    return (
      <Link
        href="/auth/login"
        className="text-sm font-[Syne] font-bold text-[#0A2540] bg-yellow-400 rounded-xl px-4 py-2.5 text-center"
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
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          scrolled
            ? "text-[#0A2540] hover:bg-[#0A2540]/5"
            : "text-white/80 hover:text-white"
        }`}
      >
        <span className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center text-[10px] font-bold text-yellow-400">
          {initials}
        </span>
        Mein Portal
      </Link>
    );
  }

  return (
    <Link
      href="/auth/login"
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
        scrolled
          ? "text-[#0A2540]/70 hover:text-[#0A2540] hover:bg-[#0A2540]/5"
          : "text-white/60 hover:text-white"
      }`}
    >
      Anmelden
    </Link>
  );
}
