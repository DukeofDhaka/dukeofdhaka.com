import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import Cursor from "@/components/Cursor";
import { caseStudyCopy as copy, site } from "@/lib/content";
import { caseStudies, caseStudyPath } from "@/lib/caseStudy";

/** Standalone case-study pages — what a shared link or a search engine lands on.
 *  On the home page the same content opens in CaseStudyOverlay instead. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = caseStudies.find((x) => x.slug === slug);
  if (!p) return {};
  const title = `${p.title} — Case study · ${site.name}`;
  const description = `${p.subtitle}. ${p.metric.value} ${p.metric.label}.`;
  return {
    title,
    description,
    alternates: { canonical: caseStudyPath(p.slug) },
    openGraph: {
      title,
      description,
      url: `${site.domain}${caseStudyPath(p.slug)}`,
      siteName: site.alias,
      type: "article",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Cursor />
      <header className="flex items-center justify-between border-b border-paper/10 pb-5 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:pl-10 sm:pr-10">
        <a href="/" className="font-display text-sm font-bold uppercase tracking-[0.2em] text-paper">
          ঢ — {site.alias}
        </a>
        <a
          href="/#works"
          className="text-[11px] uppercase tracking-[0.25em] text-paper-dim transition-colors hover:text-accent"
        >
          {copy.allWork}
        </a>
      </header>
      <main className="px-6 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-14 sm:px-10 sm:pt-20">
        <CaseStudy project={project} />
      </main>
    </>
  );
}
