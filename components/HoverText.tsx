"use client";

/** Two stacked copies of the label; on hover the visible one slides up
 *  and the accent copy slides in from below. Wrap in a group parent. */
export default function HoverText({ text }: { text: string }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full text-accent transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {text}
      </span>
    </span>
  );
}
