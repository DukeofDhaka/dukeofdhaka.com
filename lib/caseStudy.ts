import { projects } from "@/lib/content";

/** Projects that have a case study, in Works order. */
export const caseStudies = projects.filter((p) => p.caseStudy);

export const caseStudyPath = (slug: string) => `/works/${slug}/`;

/** The case study after `slug` (wraps around), for the "next" link. */
export function nextCaseStudy(slug: string) {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  return caseStudies[(i + 1) % caseStudies.length];
}

const EVENT = "open-case-study";

/** Open the case-study overlay (mounted once in SiteShell). */
export function openCaseStudy(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: slug }));
}

export function onOpenCaseStudy(cb: (slug: string) => void) {
  const fn = (e: Event) => cb((e as CustomEvent<string>).detail);
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}
