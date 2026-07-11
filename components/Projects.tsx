"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Section from "@/components/Section";
import { projects, type Project } from "@/lib/content";

function ProjectRow({
  project,
  i,
  onHover,
}: {
  project: Project;
  i: number;
  onHover: (i: number | null) => void;
}) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => onHover(i)}
      onMouseLeave={() => onHover(null)}
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
            <h3 className="display-huge text-4xl text-paper transition-colors group-hover:text-accent sm:text-6xl">
              {project.title}
            </h3>
            {project.flagship && (
              <span className="rounded-full border border-accent/50 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-accent">
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
          className="hidden text-3xl text-paper-dim transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:block"
        >
          ↗
        </span>
      </div>
    </motion.a>
  );
}

/** Floating preview card that trails the cursor over the hovered row. */
function HoverPreview({ hovered }: { hovered: number | null }) {
  const project = hovered !== null ? projects[hovered] : null;
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none relative flex h-52 w-80 flex-col justify-between overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/25 via-ink-soft to-ink p-6 shadow-2xl shadow-accent/20"
        >
          <span className="display-huge text-7xl text-outline">
            {String((hovered ?? 0) + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-paper">
              {project.title}
            </p>
            <p className="mt-1 truncate text-xs uppercase tracking-[0.2em] text-accent">
              {project.tags.slice(0, 3).join(" · ")}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  return (
    <div
      onMouseMove={(e) => {
        mx.set(e.clientX + 28);
        my.set(e.clientY - 110);
      }}
    >
      <Section id="works" index="04 — Works" title="Things I've built">
        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.title} project={p} i={i} onHover={setHovered} />
          ))}
        </div>
      </Section>

      {/* desktop-only floating preview */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        aria-hidden
      >
        <HoverPreview hovered={hovered} />
      </motion.div>
    </div>
  );
}
