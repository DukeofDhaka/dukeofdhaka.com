"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { timeline } from "@/lib/content";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

export default function Timeline() {
  return (
    <div className="relative">
      {/* Dhaka → Montréal globe drifting behind the timeline */}
      <div className="absolute inset-y-0 right-0 hidden w-[45%] opacity-50 lg:block">
        <Globe />
      </div>
      <Section id="journey" index="03 — My Career" title="Where I've been">
        <ol className="relative z-10">
        {timeline.map((entry, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="grid gap-2 border-t border-paper/15 py-9 last:border-b sm:grid-cols-[200px_1fr]"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
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
    </div>
  );
}
