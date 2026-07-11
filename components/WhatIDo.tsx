"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { whatIDo } from "@/lib/content";

/** moncy-style "WHAT I DO" — big title left, dashed-border boxes right. */
export default function WhatIDo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % whatIDo.length), 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="whatido" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* left — heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-accent">
            02 — What I do
          </p>
          <h2 className="display-huge text-6xl leading-[0.9] text-paper sm:text-8xl">
            What
            <br />
            <span className="text-accent">I Do</span>
          </h2>
        </motion.div>

        {/* right — dashed boxes */}
        <div className="space-y-6">
          {whatIDo.map((item, i) => (
            <motion.div
              key={item.word}
              onMouseEnter={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-lg border border-dashed p-7 transition-colors duration-500 ${
                active === i
                  ? "border-accent/70 bg-accent/[0.04]"
                  : "border-paper/20"
              }`}
            >
              {/* corner ticks */}
              <Corner className="left-[-1px] top-[-1px]" active={active === i} />
              <Corner className="right-[-1px] top-[-1px] rotate-90" active={active === i} />
              <Corner className="bottom-[-1px] left-[-1px] -rotate-90" active={active === i} />
              <Corner className="bottom-[-1px] right-[-1px] rotate-180" active={active === i} />

              <h3
                className={`font-display text-3xl font-bold uppercase tracking-tight transition-colors duration-500 ${
                  active === i ? "text-accent" : "text-paper"
                }`}
              >
                {item.word}
              </h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-paper-dim/60">
                Description
              </p>
              <p className="mt-4 leading-relaxed text-paper-dim">{item.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Corner({ className, active }: { className: string; active: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute h-3 w-3 border-l border-t transition-colors duration-500 ${
        active ? "border-accent" : "border-paper/40"
      } ${className}`}
    />
  );
}
