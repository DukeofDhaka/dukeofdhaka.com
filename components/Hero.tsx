"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6">
      {/* backdrop glow + watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 30% 35%, rgba(217,169,78,0.10), transparent 70%), radial-gradient(ellipse 40% 35% at 80% 75%, rgba(10,104,71,0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="font-display pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none text-[22rem] leading-none text-outline lg:block"
      >
        ঢাকা
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mb-5 text-sm tracking-[0.3em] text-gold uppercase"
        >
          দ্য ডিউক অফ ঢাকা — the Duke of Dhaka
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-6xl leading-[0.95] text-paper sm:text-8xl"
        >
          Tahsin
          <br />
          <span className="italic text-gold">Fatin</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-paper-dim"
        >
          {site.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-4 max-w-xl text-lg leading-relaxed text-paper"
        >
          {site.heroLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#works"
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition-transform hover:scale-105"
          >
            Selected works ↓
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-paper/25 px-7 py-3.5 text-sm tracking-wide text-paper transition-colors hover:border-gold hover:text-gold"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-paper-dim"
        >
          ↓
        </motion.div>
      </motion.div>
    </header>
  );
}
