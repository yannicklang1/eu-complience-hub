import Link from "next/link";
import { BASE_URL } from "@/lib/constants";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * SEO-optimized Breadcrumbs with JSON-LD structured data.
 * Google shows breadcrumbs in search results → better CTR.
 */
export default function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const allItems: BreadcrumbItem[] = [
    { label: "Startseite", href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? { item: `${BASE_URL}${item.href}` }
        : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] text-[#7a8db0] mb-6"
      >
        <ol className="flex items-center gap-1.5 flex-wrap">
          {allItems.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-[#7a8db0]/40" aria-hidden="true">
                  /
                </span>
              )}
              {item.href && i < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-[#0A2540] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#3a4a6b] font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
