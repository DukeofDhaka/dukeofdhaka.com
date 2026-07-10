"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <Section id="skills" index="04 — Toolkit" title="What I work with">
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((group, i) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="rounded-2xl border border-paper/10 bg-ink-soft p-7"
          >
            <h3 className="mb-5 text-sm tracking-[0.2em] text-gold uppercase">
              {group.group}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-paper-dim">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-gold/70" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
