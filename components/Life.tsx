"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { life } from "@/lib/content";

export default function Life() {
  return (
    <Section id="life" index="05 — Beyond the résumé" title="Life, lately">
      <div className="grid gap-6 sm:grid-cols-2">
        {life.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="rounded-2xl border border-paper/10 bg-ink-soft p-7"
          >
            <div className="mb-4 text-3xl" aria-hidden>
              {item.emoji}
            </div>
            <h3 className="font-display text-xl text-paper">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-paper-dim">{item.text}</p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-gold underline-offset-4 hover:underline"
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
