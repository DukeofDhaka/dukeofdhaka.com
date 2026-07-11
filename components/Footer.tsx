"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site } from "@/lib/content";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

export default function Footer() {
  return (
    <footer id="contact" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-10 pt-28 sm:px-10">
      {/* Dhaka → Montréal globe, subtle backdrop */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] opacity-40 lg:block">
        <Globe />
      </div>
      <div className="relative mx-auto w-full max-w-6xl">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
          07 — Contact
        </p>
        <motion.a
          href={`mailto:${site.email}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="display-huge block text-[11vw] text-paper transition-colors hover:text-accent sm:text-[7.5vw]"
        >
          Let&apos;s talk<span className="text-accent">.</span>
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-md text-paper-dim"
        >
          Hiring for analytics or data roles, building something for Bangladesh,
          or just want to argue about biryani? My inbox is open.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="font-display rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display rounded-full border border-paper/25 px-8 py-4 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-accent hover:text-accent"
          >
            GitHub ↗
          </a>
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display rounded-full border border-paper/25 px-8 py-4 text-sm font-bold uppercase tracking-wide text-paper transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn ↗
            </a>
          )}
        </div>

        <div className="mt-20 flex flex-wrap items-end justify-between gap-4 border-t border-paper/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-paper-dim/60">
          <span>
            © {new Date().getFullYear()} {site.name} · dukeofdhaka.com
          </span>
          <span>
            Soundtrack: {site.music.title} — {site.music.artist}
          </span>
        </div>
      </div>
    </footer>
  );
}
