"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/content";

export default function Splash({
  onEnter,
}: {
  onEnter: (withSound: boolean) => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink px-6 text-center"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {/* gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 42%, rgba(217,169,78,0.14), transparent 70%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-6 text-sm tracking-[0.35em] text-paper-dim uppercase"
      >
        ঢাকা থেকে মন্ট্রিয়ল
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.9 }}
        className="font-display text-5xl leading-tight text-paper sm:text-7xl md:text-8xl"
      >
        Duke <span className="italic text-gold">of</span> Dhaka
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="my-8 h-px w-24 bg-gold/60"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="text-base tracking-[0.25em] text-paper-dim uppercase"
      >
        {site.name} — Portfolio
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => onEnter(true)}
        className="group mt-12 flex items-center gap-3 rounded-full border border-gold/50 px-8 py-4 text-sm tracking-[0.2em] text-gold uppercase transition-all hover:bg-gold hover:text-ink"
      >
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="inline-block"
        >
          ▶
        </motion.span>
        Tap to enter · sound on
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={() => onEnter(false)}
        className="mt-5 text-xs text-paper-dim/70 underline underline-offset-4 transition-colors hover:text-paper"
      >
        enter quietly
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 text-[11px] tracking-wide text-paper-dim/50"
      >
        soundtrack: {site.music.title} — {site.music.artist}
      </motion.p>
    </motion.div>
  );
}
