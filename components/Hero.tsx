"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import HoverText from "@/components/HoverText";
import { site, hero } from "@/lib/content";

/** moncy-style flip word: current word bold, previous word dimmed behind it. */
function FlipWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % hero.flip.length), 2800);
    return () => clearInterval(id);
  }, []);
  const prev = hero.flip[(i - 1 + hero.flip.length) % hero.flip.length];
  return (
    <span className="relative block h-[1.1em]">
      {/* ghost of the outgoing word */}
      <span className="text-outline absolute inset-0 translate-y-[-0.12em] select-none">
        {prev}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "60%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-60%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="relative block text-paper"
        >
          {hero.flip[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const btn =
  "group font-display block rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wide text-paper sm:px-7 sm:py-3.5 sm:text-sm";

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-28 sm:px-10 md:flex-row md:items-center md:pt-0">
      {/* red glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[24%] h-16 w-16 rounded-full bg-accent/70 blur-2xl sm:h-20 sm:w-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 50% 60%, rgba(244,42,65,0.14), transparent 70%)",
        }}
      />

      {/* phones: name → role → CTAs stacked; desktop: name+CTAs | figurine | role */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-7 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-8 md:gap-y-8">
        <div className="pointer-events-none md:col-start-1 md:row-start-1 md:self-end">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-3 text-sm tracking-[0.15em] text-accent"
          >
            {hero.greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="display-huge text-6xl leading-[0.92] text-paper sm:text-7xl"
          >
            Tahsin
            <br />
            Fatin
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="pointer-events-none md:col-start-3 md:row-span-2 md:row-start-1 md:self-center md:text-right"
        >
          <p className="mb-1 text-lg tracking-tight text-accent">{hero.flipLead}</p>
          <div className="font-display text-5xl font-bold uppercase leading-none tracking-tight sm:text-7xl">
            <FlipWord />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="pointer-events-auto flex flex-wrap items-center gap-3 sm:gap-4 md:col-start-1 md:row-start-2 md:self-start"
        >
          <Magnetic>
            <a href="#works" className={`${btn} bg-accent`}>
              Selected works ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border border-paper/25`}
            >
              <HoverText text="GitHub ↗" />
            </a>
          </Magnetic>
        </motion.div>

        {/* center — figurine lives here on desktop (rendered by the fixed canvas) */}
        <div
          className="hidden h-[62vh] w-[1px] md:col-start-2 md:row-span-2 md:row-start-1 md:block"
          aria-hidden
        />
      </div>

      {/* phones: reserved space the figurine's bust frames itself into */}
      <div data-hero-band className="min-h-[36vh] flex-1 md:hidden" aria-hidden />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-paper-dim md:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block"
        >
          ↓
        </motion.span>
      </motion.div>
    </header>
  );
}
