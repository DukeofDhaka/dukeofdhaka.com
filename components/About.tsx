"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Section from "@/components/Section";
import { about } from "@/lib/content";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      {word}
    </motion.span>
  );
}

/** The bio brightens word by word as you scroll through it. */
function ScrollReveal({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = paragraphs.map((p) => p.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);
  let seen = 0;

  return (
    <div ref={ref} className="space-y-8">
      {words.map((paragraph, pi) => (
        <p key={pi} className="font-display text-xl font-medium leading-relaxed text-paper sm:text-2xl">
          {paragraph.map((word, wi) => {
            const start = seen / total;
            seen += 1;
            const end = seen / total;
            return (
              <Word
                key={`${pi}-${wi}`}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" index="01 — About Me" title="Hello, again">
      {/* left column intentionally open on desktop — the figurine parks there */}
      <div className="grid gap-14 md:grid-cols-[1fr_1.35fr]">
        <div className="hidden md:block" aria-hidden />
        <div>
          <ScrollReveal paragraphs={about.paragraphs} />
          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-paper/15 pt-8">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[11px] uppercase tracking-[0.25em] text-accent">
                  {f.label}
                </dt>
                <dd className="font-display mt-1.5 font-bold uppercase tracking-tight text-paper">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
