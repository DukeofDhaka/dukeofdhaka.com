"use client";

import { site } from "@/lib/content";

/** Fixed left-edge social icons, moncy-style. Desktop only. */
export default function SocialRail() {
  const items = [
    {
      href: site.github,
      label: "GitHub",
      d: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z",
    },
    {
      href: site.linkedin,
      label: "LinkedIn",
      d: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24V8.31zM8.34 8.31h4.33v2h.06c.6-1.14 2.07-2.34 4.27-2.34 4.56 0 5.4 3 5.4 6.91V23h-4.5v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V23h-4.47V8.31z",
    },
    {
      href: `mailto:${site.email}`,
      label: "Email",
      d: "M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm10 8.5L3.5 6v12h17V6L12 12.5zM4.24 6h15.52L12 10.99 4.24 6z",
    },
  ];

  return (
    <div className="fixed bottom-24 left-6 z-40 hidden flex-col gap-7 md:flex">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target={it.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={it.label}
          className="text-paper-dim transition-colors hover:text-accent"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d={it.d} />
          </svg>
        </a>
      ))}
    </div>
  );
}
