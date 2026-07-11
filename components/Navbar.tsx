"use client";

import { site } from "@/lib/content";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#works" },
  { label: "Contact", href: "#contact" },
];

/** moncy-style persistent top bar (desktop). Mobile keeps the hamburger menu. */
export default function Navbar() {
  const go = (href: string) => {
    if (window.__lenis) window.__lenis.scrollTo(href, { duration: 1.4 });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden items-center justify-between px-10 py-6 mix-blend-difference md:flex">
      <button
        onClick={() => go("#top")}
        className="font-display pointer-events-auto text-sm font-bold tracking-wide text-paper"
      >
        dukeofdhaka.com
      </button>
      <a
        href={`mailto:${site.email}`}
        className="pointer-events-auto text-sm tracking-[0.15em] text-paper/80 transition-colors hover:text-paper"
      >
        {site.email}
      </a>
      <nav className="pointer-events-auto flex items-center gap-10">
        {LINKS.map((l) => (
          <button
            key={l.href}
            onClick={() => go(l.href)}
            className="font-display text-sm font-bold uppercase tracking-[0.2em] text-paper transition-opacity hover:opacity-60"
          >
            {l.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
