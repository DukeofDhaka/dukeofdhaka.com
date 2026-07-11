"use client";

import { useEffect, useRef } from "react";

/** Marquee band whose speed reacts to scroll velocity (and the music). */
export default function Marquee({
  items,
  playing = false,
}: {
  items: string[];
  playing?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let vel = 0;
    const lenis = window.__lenis;
    const onScroll = (e: { velocity: number }) => {
      vel = Math.abs(e.velocity);
    };
    lenis?.on?.("scroll", onScroll);

    const base = playing ? 22 : 28; // seconds per loop; music nudges it faster
    const tick = () => {
      vel *= 0.92; // decay when scrolling stops
      const dur = Math.max(7, base - Math.min(21, vel * 1.4));
      track.current?.style.setProperty("--mq-dur", `${dur}s`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.off?.("scroll", onScroll);
    };
  }, [playing]);

  const strip = (
    <span className="inline-flex items-center">
      {items.map((item) => (
        <span
          key={item}
          className="font-display inline-flex items-center text-2xl font-bold uppercase tracking-tight text-paper-dim/70 sm:text-3xl"
        >
          <span className="px-6">{item}</span>
          <span className="text-accent" aria-hidden>
            ✦
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee border-y border-paper/10 py-5" aria-hidden>
      <div ref={track} className="marquee-track">
        {strip}
        {strip}
      </div>
    </div>
  );
}
