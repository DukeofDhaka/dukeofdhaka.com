"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { timeline } from "@/lib/content";

export default function Timeline() {
  return (
    <Section id="journey" index="02 — Journey" title="Where I've been">
      <ol>
        {timeline.map((entry, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="grid gap-2 border-t border-paper/15 py-9 last:border-b sm:grid-cols-[200px_1fr]"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              {entry.period}
            </p>
            <div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-paper">
                {entry.title}
              </h3>
              <p className="mt-1 text-paper-dim">{entry.org}</p>
              <p
                className={`mt-3 max-w-2xl leading-relaxed ${
                  entry.placeholder
                    ? "italic text-paper-dim/60"
                    : "text-paper-dim"
                }`}
              >
                {entry.details}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
