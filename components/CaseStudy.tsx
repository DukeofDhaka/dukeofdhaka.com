import { caseStudyCopy as copy, works, type Project } from "@/lib/content";
import { caseStudyPath, nextCaseStudy } from "@/lib/caseStudy";

/**
 * The long version of a Works card. Rendered by the standalone page
 * (/works/<slug>/) and by the overlay on the home page. No hooks, so it
 * works as a server or client component. The "next" link carries
 * `data-case-link` so the overlay can swap content in place.
 */
export default function CaseStudy({ project }: { project: Project }) {
  const cs = project.caseStudy;
  if (!cs) return null;
  const next = nextCaseStudy(project.slug);
  const tag = project.context ?? (project.flagship ? works.flagship : "");
  // the card's own figure leads when the README has no others (DeshRide's brand)
  const lead = cs.figures.length === 0 && "src" in project.exhibit ? project.exhibit : null;

  return (
    <article className="mx-auto w-full max-w-4xl">
      {/* header */}
      <p className="text-[11px] uppercase tracking-[0.3em] text-accent">
        {copy.kicker}
        {tag && <span className="text-paper-dim"> · {tag}</span>}
      </p>
      <h1 className="display-huge mt-4 text-5xl text-paper sm:text-7xl">{project.title}</h1>
      <p className="mt-3 text-base font-medium text-paper-dim sm:text-lg">{project.subtitle}</p>

      <div className="mt-10 flex flex-wrap items-end gap-x-6 gap-y-2 border-y border-paper/10 py-7">
        <span className="display-huge text-6xl text-accent sm:text-7xl">{project.metric.value}</span>
        <span className="pb-2 text-xs uppercase tracking-[0.2em] text-paper-dim">
          {project.metric.label}
        </span>
      </div>

      {lead && (
        <div className="mt-10 flex items-center justify-center rounded-2xl bg-white p-6">
          <img src={lead.src} alt={`${project.title} logo`} className="max-h-48 w-auto max-w-full" />
        </div>
      )}

      {/* the question */}
      <section className="mt-12">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-paper-dim">{copy.question}</h2>
        <p className="font-display mt-4 text-2xl font-semibold leading-snug text-paper sm:text-3xl">
          {cs.question}
        </p>
        <p className="mt-6 max-w-3xl leading-relaxed text-paper-dim">{project.description}</p>
      </section>

      {cs.role && (
        <section className="mt-10 rounded-2xl border border-accent/40 bg-accent/[0.06] p-6 sm:p-7">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-accent">{copy.role}</h2>
          <p className="mt-3 leading-relaxed text-paper">{cs.role}</p>
        </section>
      )}

      {/* how it works */}
      <section className="mt-14">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-paper-dim">{copy.approach}</h2>
        <ol className="mt-6 border-t border-paper/10">
          {cs.approach.map((step, k) => (
            <li key={k} className="flex gap-5 border-b border-paper/10 py-5 sm:gap-8">
              <span className="font-display w-8 shrink-0 text-sm font-bold text-accent">
                {String(k + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed text-paper/90">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* results */}
      <section className="mt-14">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-paper-dim">{copy.results}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cs.results.map((r, k) => (
            <div key={k} className="rounded-2xl border border-paper/12 bg-ink-soft/60 p-6">
              <p className="font-display text-3xl font-bold tracking-tight text-accent sm:text-4xl">
                {r.value}
              </p>
              <p className="mt-2 text-xs uppercase leading-relaxed tracking-[0.15em] text-paper-dim">
                {r.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {cs.takeaway && (
        <section className="mt-10 border-l-2 border-accent pl-6">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-accent">{copy.takeaway}</h2>
          <p className="font-display mt-3 text-xl font-semibold leading-snug text-paper sm:text-2xl">
            {cs.takeaway}
          </p>
        </section>
      )}

      {cs.checks && (
        <section className="mt-14">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-paper-dim">{copy.checks}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {cs.checks.map((c) => (
              <li
                key={c}
                className="rounded-full border border-paper/15 px-4 py-2 text-xs uppercase tracking-wide text-paper-dim"
              >
                <span className="mr-2 text-accent">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {cs.figures.length > 0 && (
        <section className="mt-14">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-paper-dim">{copy.figures}</h2>
          <div className="mt-6 space-y-6">
            {cs.figures.map((f, k) => (
              <figure key={f.src} className="overflow-hidden rounded-2xl border border-paper/10">
                <div className="bg-white p-3 sm:p-5">
                  {/* the figcaption below describes the chart, so alt stays empty */}
                  <img
                    src={f.src}
                    alt=""
                    loading={k === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="mx-auto h-auto max-h-[70vh] w-auto max-w-full"
                  />
                </div>
                <figcaption className="bg-ink px-4 py-2.5 text-[11px] uppercase tracking-[0.15em] text-paper-dim">
                  {f.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-paper-dim">{copy.limits}</h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-paper-dim">
          {cs.limits.map((l) => (
            <li key={l} className="flex gap-3">
              <span className="text-accent">—</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* stack + repo */}
      <div className="mt-14 flex flex-wrap items-center gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-paper/15 px-3 py-1 text-[11px] uppercase tracking-wide text-paper-dim"
          >
            {t}
          </span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-105"
        >
          {copy.repo}
        </a>
      )}

      {/* next */}
      {next && next.slug !== project.slug && (
        <a
          href={caseStudyPath(next.slug)}
          data-case-link={next.slug}
          className="group mt-16 block border-t border-paper/10 pt-8"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-paper-dim">{copy.next}</span>
          <span className="display-huge mt-3 block text-4xl text-paper transition-colors group-hover:text-accent sm:text-5xl">
            {next.title} →
          </span>
        </a>
      )}
    </article>
  );
}
