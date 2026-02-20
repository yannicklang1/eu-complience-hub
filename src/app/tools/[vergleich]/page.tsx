import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SoftwareComparisonPage from "@/components/SoftwareComparisonPage";
import {
  comparisonCategories,
  getAllComparisonSlugs,
} from "@/data/softwareData";

/* ── Static Generation ── */
export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ vergleich: slug }));
}

/* ── Metadata ── */
type PageProps = { params: Promise<{ vergleich: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vergleich } = await params;
  const category = comparisonCategories[vergleich];
  if (!category) return {};

  const url = `https://eu-compliance-hub.eu/tools/${vergleich}`;

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

/* ── JSON-LD ── */
function getJsonLd(slug: string) {
  const category = comparisonCategories[slug];
  if (!category) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: category.metaTitle,
    description: category.metaDescription,
    url: `https://eu-compliance-hub.eu/tools/${slug}`,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: "https://eu-compliance-hub.eu",
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

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <SoftwareComparisonPage category={category} />
    </>
  );
}
