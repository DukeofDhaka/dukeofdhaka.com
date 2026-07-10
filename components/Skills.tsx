"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <Section id="skills" index="04 — Toolkit" title="What I work with">
      <div className="grid gap-x-10 md:grid-cols-3">
        {skills.map((group, i) => (
          <motion.div
            key={group.group}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border-t border-paper/15 py-8"
          >
            <h3 className="font-display mb-6 text-sm font-bold uppercase tracking-[0.25em] text-accent">
              {group.group}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-display text-lg font-medium uppercase tracking-tight text-paper-dim transition-colors hover:text-paper"
                >
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
