"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { projects, type Project } from "@/lib/content";

const accentStyles: Record<Project["accent"], string> = {
  green:
    "from-bd-green/25 via-ink-soft to-ink hover:border-bd-green/60",
  gold: "from-gold/15 via-ink-soft to-ink hover:border-gold/60",
  blue: "from-sky-900/30 via-ink-soft to-ink hover:border-sky-700/60",
};

function ProjectCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: i * 0.08 }}
      className={`group block rounded-2xl border border-paper/10 bg-gradient-to-br p-8 transition-colors sm:p-10 ${
        accentStyles[project.accent]
      } ${project.flagship ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {project.flagship && (
            <p className="mb-3 inline-block rounded-full border border-gold/40 px-3 py-1 text-[11px] tracking-[0.2em] text-gold uppercase">
              Flagship
            </p>
          )}
          <h3 className="font-display text-3xl text-paper sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-paper-dim">{project.subtitle}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 text-2xl text-paper-dim transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
        >
          ↗
        </span>
      </div>

      <p className="mt-6 max-w-3xl leading-relaxed text-paper-dim">
        {project.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-6 text-sm text-gold/80">{project.linkLabel}</p>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <Section id="works" index="03 — Selected works" title="Things I've built">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} i={i} />
        ))}
      </div>
    </Section>
  );
}
