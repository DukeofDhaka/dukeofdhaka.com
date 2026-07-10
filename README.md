# dukeofdhaka.com

Personal portfolio of **Tahsin Fatin** — analytics, machine learning, and things
built between Dhaka and Montréal.

Dark, cinematic one-pager: a "tap to enter" splash starts the soundtrack
(*23 Theme* — Anirudh Ravichander, streamed from YouTube), then hero → about →
journey → selected works → toolkit → life → contact.

## Editing the site

**All text lives in [`lib/content.ts`](lib/content.ts).** Bio, timeline,
projects, skills, life cards, links — edit that one file and push. Entries
flagged `placeholder: true` render in italics as a reminder to fill them in.

To add a new project card: append an object to the `projects` array
(title, description, tags, GitHub link) — done.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

Stack: Next.js (App Router, static export) · TypeScript · Tailwind CSS v4 · Framer Motion.

## 🚀 Go-live checklist (one-time setup)

The site auto-deploys to GitHub Pages on every push to `main`
(`.github/workflows/nextjs.yml`). To put it on **dukeofdhaka.com**:

1. **Merge this branch into `main`.**
2. **Enable Pages:** repo **Settings → Pages → Build and deployment → Source:
   "GitHub Actions"**. The deploy workflow will run and publish the site.
3. **Point the domain (in Squarespace):** log in to Squarespace → **Domains →
   dukeofdhaka.com → DNS settings**, delete any existing Squarespace A/CNAME
   records for `@` and `www`, then add:

   | Type  | Host | Value                  |
   |-------|------|------------------------|
   | A     | @    | `185.199.108.153`      |
   | A     | @    | `185.199.109.153`      |
   | A     | @    | `185.199.110.153`      |
   | A     | @    | `185.199.111.153`      |
   | CNAME | www  | `dukeofdhaka.github.io` |

4. **Custom domain:** back in repo **Settings → Pages**, set **Custom domain**
   to `dukeofdhaka.com` (it should verify once DNS propagates — up to a few
   hours) and tick **Enforce HTTPS**.

## Notes

- The music streams via the official YouTube IFrame API (nothing re-hosted).
  Browsers block un-muted autoplay, which is why the splash screen asks for a
  tap first — that tap is what "starts" the audio.
- `public/CNAME` tells GitHub Pages which domain the site belongs to. Don't
  delete it.
