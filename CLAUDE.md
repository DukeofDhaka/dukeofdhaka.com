# dukeofdhaka.com — project brief for Claude

Personal portfolio of **Tahsin Fatin** (GitHub: `DukeofDhaka`). Live at
**https://dukeofdhaka.com**. A dark, red-on-black, moncy.dev-inspired
one-pager with a scroll-choreographed 3D character, a physics tech-stack
ball pit, and a background soundtrack.

## Stack & how it runs

- **Next.js (App Router) + TypeScript + Tailwind CSS v4**, static export
  (`output: "export"` in `next.config.ts`). No server — everything is client-side.
- `npm install` → `npm run dev` (localhost:3000) → `npm run build` (static
  export to `out/`).
- **three.js / @react-three/fiber** for the 3D figurines + globe.
  **matter-js** for the tech-stack ball pit. **framer-motion** for reveals,
  **lenis** for smooth scroll.

## Where things live

- **`lib/content.ts` is the single source of all copy** — bio, career
  timeline, projects, skills, life cards, hero flip-words, tech-stack ball
  labels, links. Edit this file to change site text; nothing else needed.
- `components/SiteShell.tsx` — the composition root: splash gate, music
  player (YouTube IFrame API, audio-only, hidden), and the ordered list of
  section panels inside `<main>`. **The order of `<Panel>` children is what
  `Figurine.tsx` measures** (`main > div` offsets) — keep them in sync.
- `components/Figurine.tsx` — the 3D character. `KEYFRAMES` array = one entry
  per section panel (position `fx`/`fy` as viewport fractions, `scale`,
  `rotY`, and which `model`). Tuning the character's size/position per
  section = editing these numbers. In the hero he faces the cursor.
- `components/TechBalls.tsx` — matter.js ball pit; labels come from
  `techBalls` in content.ts.
- Section components: `Hero`, `About`, `WhatIDo`, `Timeline` (career),
  `Projects` (works), `Skills` (techstack + list), `Life`, `Footer` (contact).
- `components/Navbar.tsx` (desktop top bar) + `Menu.tsx` (mobile hamburger) +
  `SocialRail.tsx` (left edge).
- 3D assets: `public/models/{greet,sit,surf}.glb` (Tahsin's Copilot 3D
  figurines, optimized), decoded via `public/draco/`. Regenerate with
  `scripts/optimize-models.mjs` if you get new raw GLBs.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/nextjs.yml`) builds and
deploys to GitHub Pages → served at dukeofdhaka.com (CNAME in `public/`).
**Any push to `main` is a live deploy.** Dev happens locally in this clone
(the original cloud-session branch `claude/dukeofdhaka-portfolio-sk4kou` is
merged into main and retired) — branch before risky work, push to main only
to ship.

## Conventions

- Design tokens in `app/globals.css` `@theme`: `--color-accent` (#f42a41 red),
  `ink`/`ink-soft` (near-black), `paper`/`paper-dim` (off-white). Fonts:
  Clash Display (display) + Geist (body).
- Music can't autoplay unmuted — the splash "tap to enter" gesture is what
  legally starts it. Don't try to bypass it.
- Verify visually after 3D/layout changes: build, serve `out/`, drive with
  Playwright + the pre-installed Chromium (see `scripts`/scratchpad patterns),
  screenshot each section. The figurine needs `--use-gl=swiftshader` headless.
  The desktop-app preview pane tends to kill the figurine's WebGL context
  (it unmounts gracefully now instead of white-screening) — judge the
  figurine itself in a real browser.

## Known follow-ups

- Figurines are **unrigged single meshes** — the whole body turns to face the
  cursor, but eyes/head can't move independently. For true eye-tracking, swap
  in a rigged avatar (Ready Player Me `.glb`) — it drops into `Figurine.tsx`.
- Works cards are typographic (no project screenshots yet).
- Career timeline is real (from résumés); keep it truthful when editing.
