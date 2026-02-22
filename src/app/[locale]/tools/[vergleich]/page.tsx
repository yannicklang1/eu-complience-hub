import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/lib/constants";
import { LOCALES } from "@/i18n/config";
import SoftwareComparisonPage from "@/components/SoftwareComparisonPage";
import {
  comparisonCategories,
  getAllComparisonSlugs,
} from "@/data/softwareData";

/* ── Static Generation ── */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getAllComparisonSlugs().map((slug) => ({ locale, vergleich: slug }))
  );
}

/* ── Metadata ── */
type PageProps = { params: Promise<{ vergleich: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vergleich } = await params;
  const category = comparisonCategories[vergleich];
  if (!category) return {};

  const url = `${BASE_URL}/tools/${vergleich}`;

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: category.tools
      .map((t) => `${t.name} Vergleich, ${t.name} Erfahrungen`)
      .join(", "),
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url,
    },
    alternates: { canonical: url },
  };
}

/* ── Breadcrumb JSON-LD ── */
function getBreadcrumbJsonLd(slug: string, title: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "EU Compliance Hub", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: title, item: `${BASE_URL}/tools/${slug}` },
    ],
  };
}

/* ── JSON-LD ── */
function getJsonLd(slug: string) {
  const category = comparisonCategories[slug];
  if (!category) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: category.metaTitle,
    description: category.metaDescription,
    url: `${BASE_URL}/tools/${slug}`,
    datePublished: "2026-02-19",
    dateModified: "2026-02-20",
    author: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: BASE_URL,
    },
    about: category.tools.map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      url: t.url,
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: t.priceRange,
        priceCurrency: "EUR",
      },
    })),
  };
}

/* ── Page ── */
export default async function VergleichPage({ params }: PageProps) {
  const { vergleich } = await params;
  const category = comparisonCategories[vergleich];
  if (!category) notFound();

  const jsonLd = getJsonLd(vergleich);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(vergleich, category.title);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SoftwareComparisonPage category={category} />
    </>
  );
}
