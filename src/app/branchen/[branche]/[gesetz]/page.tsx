import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BranchenLandingPage from "@/components/BranchenLandingPage";
import {
  branchen,
  regulations,
  getAllBranchenGesetzParams,
  getBranchenRegContent,
} from "@/data/branchenData";

/* ── Static Generation: generate all industry × regulation combos ── */
export function generateStaticParams() {
  return getAllBranchenGesetzParams();
}

/* ── Dynamic Metadata ── */
type PageProps = { params: Promise<{ branche: string; gesetz: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { branche: bSlug, gesetz: gSlug } = await params;
  const branche = branchen[bSlug];
  const regulation = regulations[gSlug];
  if (!branche || !regulation) return {};

  const content = getBranchenRegContent(branche, regulation);
  const url = `https://eu-compliance-hub.eu/branchen/${bSlug}/${gSlug}`;

  return {
    title: content.title,
    description: content.metaDescription,
    keywords: `${regulation.name} ${branche.name}, ${regulation.name} Compliance ${branche.name}, ${branche.name} ${regulation.name} Pflichten, ${regulation.name} Österreich ${branche.name}`,
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url,
    },
    alternates: { canonical: url },
  };
}

/* ── JSON-LD ── */
function getJsonLd(bSlug: string, gSlug: string) {
  const branche = branchen[bSlug];
  const regulation = regulations[gSlug];
  if (!branche || !regulation) return null;
  const content = getBranchenRegContent(branche, regulation);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.metaDescription,
    url: `https://eu-compliance-hub.eu/branchen/${bSlug}/${gSlug}`,
    datePublished: "2026-02-19",
    dateModified: "2026-02-19",
    author: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: "https://eu-compliance-hub.eu",
    },
    publisher: {
      "@type": "Organization",
      name: "EU Compliance Hub",
      url: "https://eu-compliance-hub.eu",
    },
    about: [
      { "@type": "Thing", name: regulation.fullName },
      { "@type": "Thing", name: branche.name },
    ],
    // FAQ schema for rich snippets
    mainEntity: getBranchenRegContent(branche, regulation).faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ── Page Component ── */
export default async function BranchenGesetzPage({ params }: PageProps) {
  const { branche: bSlug, gesetz: gSlug } = await params;
  const branche = branchen[bSlug];
  const regulation = regulations[gSlug];

  if (!branche || !regulation) notFound();
  if (!branche.relevantRegulations.includes(gSlug)) notFound();

  const content = getBranchenRegContent(branche, regulation);

  // Other regulations for this industry (exclude current)
  const otherRegulations = branche.relevantRegulations
    .filter((s) => s !== gSlug)
    .map((s) => regulations[s])
    .filter(Boolean);

  // Other industries that have this regulation (exclude current, max 8)
  const otherBranchen = Object.values(branchen)
    .filter((b) => b.slug !== bSlug && b.relevantRegulations.includes(gSlug))
    .slice(0, 8);

  const jsonLd = getJsonLd(bSlug, gSlug);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BranchenLandingPage
        branche={branche}
        regulation={regulation}
        content={content}
        otherRegulations={otherRegulations}
        otherBranchen={otherBranchen}
      />
    </>
  );
}
