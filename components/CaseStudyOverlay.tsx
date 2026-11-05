"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CaseStudy from "@/components/CaseStudy";
import { caseStudyCopy as copy, site } from "@/lib/content";
import { caseStudies, caseStudyPath, onOpenCaseStudy } from "@/lib/caseStudy";

type HistoryState = { caseStudy?: string } | null;

/**
 * Case studies on the home page open here, full-screen, instead of
 * navigating away — so the music, the figurine and your scroll position
 * survive, and the splash never comes back. The URL still changes to the
 * real /works/<slug>/ page (shareable, reloadable); Back closes it.
 */
export default function CaseStudyOverlay() {
  const [slug, setSlug] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const homeTitle = useRef("");
  const project = slug ? caseStudies.find((p) => p.slug === slug) : undefined;

  // a card asked to open one: one history entry for the whole visit
  useEffect(
    () =>
      onOpenCaseStudy((s) => {
        returnFocus.current = document.activeElement as HTMLElement | null;
        window.history.pushState({ ...window.history.state, caseStudy: s }, "", caseStudyPath(s));
        setSlug(s);
      }),
    []
  );

  // Back / Forward
  useEffect(() => {
    const onPop = () => setSlug((window.history.state as HistoryState)?.caseStudy ?? null);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const close = useCallback(() => {
    if ((window.history.state as HistoryState)?.caseStudy) window.history.back();
    else setSlug(null);
  }, []);

  // while open: page behind doesn't scroll, Escape closes, focus moves in
  const open = !!project;
  useEffect(() => {
    if (!open) return;
    homeTitle.current = document.title;
    window.__lenis?.stop?.();
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeBtn.current?.focus(), 60);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      window.__lenis?.start?.();
      document.title = homeTitle.current;
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open, close]);

  // new case study (open or "next"): top of the page, matching tab title
  useEffect(() => {
    if (!project) return;
    scroller.current?.scrollTo({ top: 0 });
    document.title = `${project.title} — Case study · ${site.name}`;
  }, [project]);

  // "Next case study" swaps in place, replacing the history entry so a
  // single Back still returns to the home page
  const onClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-case-link]");
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const s = a.dataset.caseLink!;
    window.history.replaceState({ ...window.history.state, caseStudy: s }, "", caseStudyPath(s));
    setSlug(s);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          role="dialog"
          aria-modal="true"
          aria-label={`${copy.kicker}: ${project.title}`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[45] flex flex-col bg-ink"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-paper/10 bg-ink pb-4 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))] sm:pl-10 sm:pr-10">
            <button
              onClick={close}
              className="text-[11px] uppercase tracking-[0.25em] text-paper-dim transition-colors hover:text-accent"
            >
              {copy.allWork}
            </button>
            <button
              ref={closeBtn}
              onClick={close}
              aria-label={copy.close}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-accent hover:text-accent"
            >
              ✕
            </button>
          </div>
          <div
            ref={scroller}
            data-lenis-prevent
            onClick={onClick}
            className="flex-1 overflow-y-auto overscroll-contain px-6 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-12 sm:px-10 sm:pt-16"
          >
            <CaseStudy project={project} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
