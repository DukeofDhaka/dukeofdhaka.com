"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { timeline } from "@/lib/content";

export default function Timeline() {
  return (
    <Section id="journey" index="02 — Journey" title="Where I've been">
      <ol className="relative space-y-12 border-l border-paper/15 pl-8">
        {timeline.map((entry, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative"
          >
            <span
              aria-hidden
              className={`absolute -left-[38.5px] top-1.5 h-[11px] w-[11px] rounded-full ${
                entry.placeholder ? "border border-gold bg-ink" : "bg-gold"
              }`}
            />
            <p className="text-sm tracking-[0.2em] text-gold uppercase">
              {entry.period}
            </p>
            <h3 className="font-display mt-2 text-2xl text-paper">
              {entry.title}
            </h3>
            <p className="mt-1 text-paper-dim">{entry.org}</p>
            <p
              className={`mt-3 max-w-2xl leading-relaxed ${
                entry.placeholder ? "italic text-paper-dim/60" : "text-paper-dim"
              }`}
            >
              {entry.details}
            </p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
