"use client";

export default function Marquee({ items }: { items: string[] }) {
  // duplicated track scrolls -50% for a seamless loop
  const strip = (
    <span className="inline-flex items-center">
      {items.map((item) => (
        <span
          key={item}
          className="font-display inline-flex items-center text-2xl font-bold uppercase tracking-tight text-paper-dim/70 sm:text-3xl"
        >
          <span className="px-6">{item}</span>
          <span className="text-gold" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee border-y border-paper/10 py-5" aria-hidden>
      <div className="marquee-track">
        {strip}
        {strip}
      </div>
    </div>
  );
}
