"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/content";

/** Preloader-style intro: counter runs 0→100, then the enter controls appear.
 *  Entering is what starts the soundtrack (browsers require the gesture). */
export default function Splash({
  onEnter,
}: {
  onEnter: (withSound: boolean) => void;
}) {
  const [count, setCount] = useState(0);
  const loaded = count >= 100;

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1700;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out so the counter sprints early and lands softly
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-ink p-6 sm:p-10"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pointer-events-none flex items-start justify-between text-[11px] uppercase tracking-[0.25em] text-paper-dim">
        <span>Tahsin Fatin — Portfolio</span>
        <span>©{new Date().getFullYear()}</span>
      </div>

      <div className="flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-xs uppercase tracking-[0.35em] text-accent"
        >
          ঢাকা থেকে মন্ট্রিয়ল
        </motion.p>

        <h1 className="display-huge text-[13vw] text-paper sm:text-[9vw]">
          Duke of
          <br />
          <span className="text-accent">Dhaka</span>
        </h1>

        <div className="mt-10 h-14">
          {loaded ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <button
                onClick={() => onEnter(true)}
                className="font-display rounded-full border border-accent px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-ink"
              >
                ▶ Enter · sound on
              </button>
              <button
                onClick={() => onEnter(false)}
                className="text-[11px] uppercase tracking-[0.2em] text-paper-dim underline-offset-4 hover:underline"
              >
                enter quietly
              </button>
            </motion.div>
          ) : (
            <p className="font-display text-sm uppercase tracking-[0.3em] text-paper-dim">
              Loading
            </p>
          )}
        </div>
      </div>

      <div className="pointer-events-none flex items-end justify-between">
        <p className="max-w-[240px] text-[11px] leading-relaxed uppercase tracking-[0.15em] text-paper-dim/70">
          Soundtrack — {site.music.title} · {site.music.artist}
        </p>
        <span className="display-huge text-6xl text-paper/90 tabular-nums sm:text-8xl">
          {count}
          <span className="text-accent">%</span>
        </span>
      </div>
    </motion.div>
  );
}
