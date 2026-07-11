"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { skills } from "@/lib/content";

const TechBalls = dynamic(() => import("@/components/TechBalls"), { ssr: false });

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center sm:px-10">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
          05 — Skillset &amp; Tools
        </p>
        <h2 className="display-huge text-5xl text-paper sm:text-7xl">My Techstack</h2>
      </div>

      {/* the physics ball pit */}
      <TechBalls />

      {/* scannable list underneath */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-x-10 px-6 sm:px-10 md:grid-cols-3">
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
    </section>
  );
}
