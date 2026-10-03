"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, type PanInfo } from "framer-motion";
import Section from "@/components/Section";
import Magnetic from "@/components/Magnetic";
import { projects, type Project } from "@/lib/content";

const GAP = 24;

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

/** Top of the card: a real figure from the repo, or a typographic stand-in. */
function Exhibit({ exhibit }: { exhibit: Project["exhibit"] }) {
  return (
    <figure className="relative h-44 overflow-hidden rounded-t-2xl border-b border-paper/10">
      {"src" in exhibit ? (
        <div className="flex h-full items-center justify-center bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-optimized webp */}
          <img
            src={exhibit.src}
            alt={exhibit.caption}
            loading="lazy"
            draggable={false}
            className="max-h-full max-w-full object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      ) : (
        <div className="flex h-full flex-col justify-center gap-1.5 bg-ink px-7">
          {exhibit.lines.map((line, k) => (
            <span
              key={line}
              className={`font-display text-lg font-bold uppercase tracking-tight ${
                k === 0 ? "text-paper" : "text-paper-dim"
              }`}
            >
              {line}
            </span>
          ))}
        </div>
      )}
      <figcaption className="absolute bottom-2 left-3 rounded bg-ink/85 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-paper-dim">
        {exhibit.caption}
      </figcaption>
    </figure>
  );
}

/** Metric-first card: evidence on top, the headline number, then the story. */
function Card({ project, i }: { project: Project; i: number }) {
  const tag = project.course ?? (project.flagship ? "Flagship" : "");
  const body = (
    <>
      <Exhibit exhibit={project.exhibit} />
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em]">
          <span className="font-display font-bold text-paper-dim">
            {String(i + 1).padStart(2, "0")}
          </span>
          {tag && <span className="text-accent">{tag}</span>}
        </div>

        <p className="display-huge mt-6 text-5xl text-accent sm:text-6xl">
          {project.metric.value}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-paper-dim">
          {project.metric.label}
        </p>

        <div className="my-6 h-px bg-paper/10" />

        <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-paper transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-paper-dim">{project.subtitle}</p>
        <p className="mt-4 line-clamp-6 text-sm leading-relaxed text-paper-dim/80">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-paper/15 px-3 py-1 text-[11px] uppercase tracking-wide text-paper-dim"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-paper-dim">
          {project.link ? (
            <span className="text-paper transition-colors group-hover:text-accent">
              View the repo ↗
            </span>
          ) : (
            "No public repo"
          )}
        </p>
      </div>
    </>
  );

  const cls =
    "group relative flex w-full shrink-0 flex-col rounded-2xl border border-paper/12 bg-ink-soft/60 transition-colors hover:border-accent/50 md:w-[380px] lg:w-[420px]";

  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className={cls}
    >
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export default function Projects() {
  const desktop = useIsDesktop();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0); // card width + gap
  const [maxIndex, setMaxIndex] = useState(0);
  const dragged = useRef(false);

  // measure card width and how far the track can travel
  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const first = trackRef.current?.firstElementChild as HTMLElement | null;
      if (!vp || !first) return;
      const s = first.offsetWidth + GAP;
      const visible = Math.max(1, Math.floor((vp.clientWidth + GAP) / s));
      setStep(s);
      setMaxIndex(Math.max(0, projects.length - visible));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [desktop]);

  const go = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(maxIndex, next))),
    [maxIndex]
  );

  useEffect(() => {
    const target = desktop ? -index * step : 0;
    const controls = animate(x, target, { type: "spring", stiffness: 260, damping: 32 });
    return () => controls.stop();
  }, [index, step, desktop, x]);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [index, maxIndex]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!step) return;
    const projected = -x.get() - info.velocity.x * 0.2;
    go(Math.round(projected / step));
  };

  return (
    <Section id="works" index="04 — Works" title="My Work" centered>
      <p className="-mt-8 mb-12 text-center text-sm text-paper-dim">
        Every number below is quoted from the project&apos;s own README.
      </p>

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(index + 1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(index - 1);
          }
        }}
        className="rounded-2xl outline-none focus-visible:ring-1 focus-visible:ring-accent/60 md:overflow-hidden"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag={desktop ? "x" : false}
          dragConstraints={{ left: -maxIndex * step, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={onDragEnd}
          onClickCapture={(e) => {
            // a drag that ends over a card must not open its link
            if (dragged.current) {
              e.preventDefault();
              e.stopPropagation();
            }
            dragged.current = false;
          }}
          onPointerDown={() => (dragged.current = false)}
          className="flex flex-col items-stretch gap-6 md:cursor-grab md:flex-row md:active:cursor-grabbing"
        >
          {projects.map((p, i) => (
            <Card key={p.title} project={p} i={i} />
          ))}
        </motion.div>
      </div>

      {/* controls (tablet/desktop) */}
      <div className="mt-10 hidden items-center gap-8 md:flex">
        <span className="font-display w-24 text-sm font-bold tabular-nums text-paper">
          {String(index + 1).padStart(2, "0")}
          <span className="text-paper-dim"> / {String(projects.length).padStart(2, "0")}</span>
        </span>
        <div className="relative h-px flex-1 bg-paper/15">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            animate={{
              width: `${((Math.min(index + (projects.length - maxIndex), projects.length)) / projects.length) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
        <div className="flex gap-3">
          {[
            { label: "Previous project", dir: -1, glyph: "←", disabled: index === 0 },
            { label: "Next project", dir: 1, glyph: "→", disabled: index >= maxIndex },
          ].map((b) => (
            <Magnetic key={b.label} strength={0.4}>
              <button
                onClick={() => go(index + b.dir)}
                disabled={b.disabled}
                aria-label={b.label}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/25 text-lg text-paper transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-paper/25 disabled:hover:text-paper"
              >
                {b.glyph}
              </button>
            </Magnetic>
          ))}
        </div>
      </div>
    </Section>
  );
}
