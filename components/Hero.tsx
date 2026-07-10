"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import HoverText from "@/components/HoverText";
import { site, hero } from "@/lib/content";

const Portrait = dynamic(() => import("@/components/Portrait"), { ssr: false });

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % hero.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block h-[1.5em] overflow-hidden align-bottom leading-[1.4]">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="inline-block text-accent"
        >
          {hero.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 sm:px-10">
      {/* interactive particle portrait (appears once public/portrait.jpg exists) */}
      <div className="absolute inset-y-0 right-0 hidden w-[52%] md:block">
        <Portrait />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent"
      />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-paper-dim"
        >
          দ্য ডিউক অফ ঢাকা — Montréal, Canada
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="display-huge text-[15vw] text-paper md:text-[10.5vw]"
        >
          Tahsin
          <br />
          <span className="text-outline">Fatin</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="font-display mt-8 text-xl font-bold uppercase tracking-tight text-paper sm:text-3xl"
        >
          <RoleRotator />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-5 max-w-lg leading-relaxed text-paper-dim"
        >
          {site.tagline} {site.heroLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#works"
              className="group font-display block rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wide text-paper"
            >
              Selected works ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-display block rounded-full border border-paper/25 px-8 py-4 text-sm font-bold uppercase tracking-wide text-paper"
            >
              <HoverText text="GitHub ↗" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-paper-dim"
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
