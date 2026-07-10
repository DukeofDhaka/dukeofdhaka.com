"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 80%, rgba(217,169,78,0.10), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl text-paper sm:text-7xl"
        >
          Let&apos;s <span className="italic text-gold">talk</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-5 max-w-md text-paper-dim"
        >
          Hiring for analytics or data roles, building something for Bangladesh,
          or just want to argue about biryani? My inbox is open.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink transition-transform hover:scale-105"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-paper/25 px-8 py-4 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
          >
            GitHub ↗
          </a>
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-paper/25 px-8 py-4 text-sm text-paper transition-colors hover:border-gold hover:text-gold"
            >
              LinkedIn ↗
            </a>
          )}
        </motion.div>

        <p className="mt-20 text-xs leading-relaxed text-paper-dim/60">
          © {new Date().getFullYear()} {site.name} · dukeofdhaka.com
          <br />
          Built with Next.js (and Claude) · Soundtrack: {site.music.title} —{" "}
          {site.music.artist}
        </p>
      </div>
    </footer>
  );
}
