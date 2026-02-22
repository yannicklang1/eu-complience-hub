"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Übersicht", exact: true },
  { href: "/admin/leads", label: "Leads", exact: false },
  { href: "/admin/subscribers", label: "Subscribers", exact: false },
  { href: "/admin/reports", label: "Reports", exact: false },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/5 bg-slate-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-3">
          <Link href="/admin" className="font-[Syne] font-extrabold text-lg text-white">
            Admin-Portal
          </Link>
          <Link
            href="/de"
            className="text-xs text-slate-500 hover:text-yellow-400 transition-colors"
          >
            Zur Website →
          </Link>
        </div>

        <nav className="flex gap-1 -mb-px" aria-label="Admin-Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? "border-yellow-400 text-yellow-400"
                    : "border-transparent text-slate-400 hover:text-white hover:border-white/20"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
