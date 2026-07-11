"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { life } from "@/lib/content";

export default function Life() {
  return (
    <Section id="life" index="06 — Beyond the résumé" title="Life, lately">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/15 sm:grid-cols-2">
        {life.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="bg-ink p-8 transition-colors hover:bg-ink-soft sm:p-10"
          >
            <div className="mb-5 text-4xl" aria-hidden>
              {item.emoji}
            </div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-paper">
              {item.title}
            </h3>
            <p className="mt-3 leading-relaxed text-paper-dim">{item.text}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm uppercase tracking-wide text-accent underline-offset-4 hover:underline"
              >
                {item.linkLabel} ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
