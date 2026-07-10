"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { projects, type Project } from "@/lib/content";

function ProjectRow({ project, i }: { project: Project; i: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.06 }}
      className="group block border-t border-paper/15 py-10 transition-colors last:border-b hover:bg-ink-soft sm:py-12"
    >
      <div className="grid items-start gap-4 sm:grid-cols-[80px_1fr_auto]">
        <span className="font-display text-sm font-bold text-paper-dim">
          {String(i + 1).padStart(2, "0")}
        </span>

        <div>
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="display-huge text-4xl text-paper transition-colors group-hover:text-gold sm:text-6xl">
              {project.title}
            </h3>
            {project.flagship && (
              <span className="rounded-full border border-gold/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
                Flagship
              </span>
            )}
          </div>
          <p className="mt-3 font-medium text-paper-dim">{project.subtitle}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-paper-dim/80">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-paper/15 px-3 py-1 text-xs uppercase tracking-wide text-paper-dim"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="hidden text-3xl text-paper-dim transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold sm:block"
        >
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <Section id="works" index="03 — Selected works" title="Things I've built">
      <div>
        {projects.map((p, i) => (
          <ProjectRow key={p.title} project={p} i={i} />
        ))}
      </div>
    </Section>
  );
}
