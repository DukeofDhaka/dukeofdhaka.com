"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/content";

/** moncy-style centered career timeline: role | YEAR | description,
 *  with a glowing vertical line running down the middle. */
export default function Timeline() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <span className="mb-3 block text-xs uppercase tracking-[0.35em] text-accent">
          03 — My Career
        </span>
        <span className="font-display block text-5xl font-normal lowercase tracking-tight text-paper sm:text-7xl">
          My career &amp; <span className="italic text-accent">experience</span>
        </span>
      </motion.h2>

      <div className="relative">
        {/* center glowing line (desktop) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(244,42,65,0.5) 12%, rgba(244,42,65,0.5) 88%, transparent)",
          }}
        />

        <ol className="space-y-14">
          {timeline.map((entry, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="grid gap-3 md:grid-cols-[1fr_150px_1fr] md:items-center md:gap-8"
            >
              {/* role + org */}
              <div className="md:text-right">
                <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-paper">
                  {entry.title}
                </h3>
                <p className="mt-1 text-sm text-accent">{entry.org}</p>
              </div>

              {/* period, big, center */}
              <div className="relative flex justify-start md:justify-center">
                <span className="font-display text-xl font-bold text-paper-dim md:text-center md:text-2xl">
                  {entry.period}
                </span>
              </div>

              {/* description */}
              <p
                className={`max-w-sm leading-relaxed ${
                  entry.placeholder ? "italic text-paper-dim/60" : "text-paper-dim"
                }`}
              >
                {entry.details}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
