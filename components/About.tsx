"use client";

import Section from "@/components/Section";
import { about } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" index="01 — About" title="The short story">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-paper-dim">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border border-paper/10 bg-ink-soft p-6">
          <dl className="space-y-5">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs tracking-[0.2em] text-gold uppercase">
                  {f.label}
                </dt>
                <dd className="mt-1 text-paper">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
