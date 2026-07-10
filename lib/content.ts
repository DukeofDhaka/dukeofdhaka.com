/**
 * ALL editable site content lives in this one file.
 * To update the website, edit the text below and push — nothing else needs touching.
 *
 * Entries marked `placeholder: true` render with a subtle "fill me in" style
 * as a reminder; set the flag to false once the real text is in.
 */

export const site = {
  name: "Tahsin Fatin",
  alias: "Duke of Dhaka",
  domain: "https://dukeofdhaka.com",
  tagline:
    "Master of Management in Analytics candidate at McGill University — Desautels Faculty of Management.",
  heroLine:
    "I build data products and ML systems — and the occasional ride-sharing app for the 170 million people back home.",
  location: "Montréal, Canada",
  origin: "Dhaka, Bangladesh",
  email: "tahsin.fatin@mail.mcgill.ca",
  github: "https://github.com/DukeofDhaka",
  // Add your LinkedIn URL here and it will appear in the footer automatically:
  linkedin: "",
  music: {
    title: "23 Theme (From “AA23”)",
    artist: "Anirudh Ravichander",
    youtubeId: "vu7GnS0lxAI",
    url: "https://www.youtube.com/watch?v=vu7GnS0lxAI",
  },
};

export const hero = {
  roles: [
    "analytics grad @ McGill",
    "ML systems builder",
    "creator of DeshRide",
    "data storyteller",
  ],
  marquee: [
    "Analytics",
    "Machine Learning",
    "ঢাকা → মন্ট্রিয়ল",
    "Product",
    "Python",
    "TypeScript",
    "Duke of Dhaka",
  ],
};

export const about = {
  paragraphs: [
    "I grew up in Dhaka — a city of twenty million people, infinite traffic, and better food than wherever you're reading this from. These days I'm in Montréal, doing a Master of Management in Analytics at McGill's Desautels Faculty of Management.",
    "My work sits where data meets product: training models, putting them behind real APIs, and shipping them somewhere people can actually use them. Coursework taught me the pipeline — notebooks to packages to FastAPI to Docker to production. Building DeshRide taught me everything the coursework doesn't: regulation, payments, and what “end-to-end” really means.",
    "The name of this site is a joke my friends made that stuck. I kept it because it's a good reminder of the mission: take what I learn out here, and build things that matter back home.",
  ],
  facts: [
    { label: "Currently", value: "MMA candidate @ McGill (Desautels)" },
    { label: "Based in", value: "Montréal, Canada" },
    { label: "From", value: "Dhaka, Bangladesh" },
    { label: "Focus", value: "Analytics, ML systems, product" },
  ],
};

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  details: string;
  placeholder?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2025 — present",
    title: "Master of Management in Analytics (MMA)",
    org: "McGill University — Desautels Faculty of Management",
    details:
      "Graduate program in management analytics: machine learning in production (INSY 674), data science, and the business side of models. Exact dates/details to confirm.",
    placeholder: true,
  },
  {
    period: "20XX — 20XX",
    title: "Your most recent role",
    org: "Company, City",
    details:
      "Placeholder — add your work experience here (role, company, what you shipped). Edit lib/content.ts.",
    placeholder: true,
  },
  {
    period: "20XX — 20XX",
    title: "Undergraduate degree",
    org: "University",
    details:
      "Placeholder — add your undergrad (program, university, years). Edit lib/content.ts.",
    placeholder: true,
  },
];

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  linkLabel: string;
  flagship?: boolean;
  accent: "green" | "gold" | "blue";
};

export const projects: Project[] = [
  {
    title: "DeshRide",
    subtitle: "সমগ্র বাংলাদেশ — intercity carpooling for Bangladesh",
    description:
      "A Poparide-style carpooling platform covering all 64 districts of Bangladesh. Drivers post trips they're already making; travellers book the empty seats. Payments are held in escrow via bKash, Nagad, or card — released only after the trip completes, designed around Bangladesh Bank's digital-commerce rules. Ships as an Android app with automated APK builds, on a local-first architecture with a clean seam for the future backend.",
    tags: ["TypeScript", "Vite", "Capacitor", "Escrow payments", "GitHub Actions"],
    link: "https://github.com/DukeofDhaka/deshride-app",
    linkLabel: "github.com/DukeofDhaka/deshride-app",
    flagship: true,
    accent: "green",
  },
  {
    title: "ML in Production — INSY 674",
    subtitle: "From notebook to deployed API",
    description:
      "An end-to-end machine learning workflow predicting whether job candidates will change employers: research notebooks → production package → FastAPI service with Pydantic validation → Docker → live deployment on Render, with drift monitoring. My contribution hardened the API contract: CI tests ensuring /predict rejects malformed input.",
    tags: ["Python", "scikit-learn", "FastAPI", "Docker", "CI/CD"],
    link: "https://github.com/DukeofDhaka/INSY-674",
    linkLabel: "github.com/DukeofDhaka/INSY-674",
    accent: "blue",
  },
  {
    title: "McGill ML Showcases",
    subtitle: "25 hands-on ML projects across 10 tracks",
    description:
      "A collection of self-contained, reproducible machine-learning showcases I work through and build on — from deep-learning foundations and causal inference to reinforcement learning, agents, and MLOps. Python with uv and make, notebook smoke tests in CI, docs with MkDocs.",
    tags: ["Python", "PyTorch", "MLOps", "Reinforcement Learning", "uv"],
    link: "https://github.com/DukeofDhaka/mcgill-showcases",
    linkLabel: "github.com/DukeofDhaka/mcgill-showcases",
    accent: "gold",
  },
];

export const skills = [
  {
    group: "Analytics & Machine Learning",
    items: [
      "Python",
      "pandas",
      "scikit-learn",
      "PyTorch",
      "Feature engineering",
      "Model monitoring & drift",
      "Jupyter",
    ],
  },
  {
    group: "Engineering",
    items: [
      "TypeScript",
      "React",
      "Vite",
      "FastAPI",
      "Docker",
      "Capacitor (Android)",
      "REST API design",
    ],
  },
  {
    group: "Tooling & Practice",
    items: [
      "Git & GitHub Actions",
      "CI/CD",
      "uv / tox",
      "MkDocs",
      "Render / GitHub Pages",
      "Agentic AI workflows",
    ],
  },
];

export const life = [
  {
    title: "Dhaka → Montréal",
    text: "Two cities, one wardrobe crisis. I went from 35°C humidity to -25°C wind chill and lived to tell the tale. Dhaka gave me the hustle; Montréal gave me the bagels and a reason to learn what “verglas” means.",
    emoji: "🌏",
  },
  {
    title: "The soundtrack",
    text: "The song playing right now is the 23 Theme by Anirudh Ravichander. It's what I put on when it's 2 a.m. and the code finally compiles. Non-negotiable site feature.",
    emoji: "🎧",
    link: "https://www.youtube.com/watch?v=vu7GnS0lxAI",
    linkLabel: "Hear it on YouTube",
  },
  {
    title: "I quantify everything",
    text: "I'm an analytics student in the truest sense: I even log my bad habits to JSON. Exhibit A: AmrCigarateKhawaTracker.py — a Python tracker for how many cigarettes ami khaise. The data trends downward. Mostly.",
    emoji: "📉",
    link: "https://github.com/DukeofDhaka/Cigarate-Smok-tracker",
    linkLabel: "The evidence, on GitHub",
  },
  {
    title: "The McGill Journey",
    text: "A desktop folder full of projects from my McGill journey is being sorted into proper GitHub repos as we speak. This section grows as they land — check back.",
    emoji: "🚧",
  },
];
