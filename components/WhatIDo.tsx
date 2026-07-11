"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { whatIDo } from "@/lib/content";

/** moncy.dev-style flip-word section: ANALYZE × BUILD. */
export default function WhatIDo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % 2), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="whatido" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-14 text-xs uppercase tracking-[0.35em] text-accent">
          02 — What I do
        </p>

        {whatIDo.map((item, i) => (
          <div
            key={item.word}
            onMouseEnter={() => setActive(i)}
            className="group cursor-default border-t border-paper/15 py-10 last:border-b sm:py-14"
          >
            <div className="grid items-center gap-6 sm:grid-cols-[1fr_minmax(0,340px)]">
              <h3
                className={`display-huge text-6xl transition-colors duration-500 sm:text-[7.5rem] ${
                  active === i ? "text-accent" : "text-outline"
                }`}
              >
                {item.word}
              </h3>
              <p
                className={`leading-relaxed transition-opacity duration-500 ${
                  active === i ? "text-paper-dim opacity-100" : "opacity-35 text-paper-dim"
                }`}
              >
                {item.line}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
