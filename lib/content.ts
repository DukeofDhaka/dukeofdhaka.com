/**
 * ALL editable site content lives in this one file.
 * To update the website, edit the text below and push — nothing else needs touching.
 */

export const site = {
  name: "Tahsin Fatin",
  alias: "Duke of Dhaka",
  domain: "https://dukeofdhaka.com",
  tagline:
    "Master of Management in Analytics candidate at McGill University — Desautels Faculty of Management.",
  heroLine:
    "Six years in capital markets and fund services, now deep in machine learning. I make data tell the truth — and occasionally build a ride-sharing app for the 170 million people back home.",
  location: "Montréal, Canada",
  origin: "Dhaka, Bangladesh",
  email: "tahsinfatin@gmail.com",
  github: "https://github.com/DukeofDhaka",
  linkedin: "https://linkedin.com/in/tahsinfatin",
  music: {
    title: "23 Theme (From “AA23”)",
    artist: "Anirudh Ravichander",
    youtubeId: "vu7GnS0lxAI",
    url: "https://www.youtube.com/watch?v=vu7GnS0lxAI",
  },
};

export const hero = {
  greeting: "Hello! I'm",
  // hero right-side flip words (moncy's "DESIGNER / DEVELOPER")
  flip: ["Analyst", "Builder"],
  flipLead: "A Data-Driven",
  roles: [
    "a data storyteller",
    "an ex-RBC Capital Markets analyst",
    "an MMA candidate @ McGill",
    "a CFA Level 1 candidate",
    "the creator of DeshRide",
  ],
  marquee: [
    "Analytics",
    "Machine Learning",
    "Capital Markets",
    "ঢাকা → হ্যালিফ্যাক্স → মন্ট্রিয়ল",
    "Python",
    "SQL",
    "Duke of Dhaka",
  ],
};

export const whatIDo = [
  {
    word: "Analyze",
    line: "Six years of making capital-markets data confess: projection models, SQL at scale, NLP on financial news, computer vision on live rail footage. If it has a signal, I'll find it.",
  },
  {
    word: "Build",
    line: "Then I ship the answer: automated pipelines that cut 13 minutes to 2, production ML behind FastAPI and Docker, and DeshRide — a whole carpooling platform for Bangladesh.",
  },
];

export const about = {
  paragraphs: [
    "I grew up in Dhaka — a city of twenty million people, infinite traffic, and better food than wherever you're reading this from. At eighteen I landed in Halifax for a finance degree at Saint Mary's, where I managed a real $600K student fund and took second place at the Venture Capital Investment Competition in Boston.",
    "Then came six years where finance and data kept colliding: fund operations at Citco, then RBC Capital Markets, where I grew from Data Analyst to Senior Data Analyst — building projection models, automating reporting pipelines, and cutting a 13-minute data pipeline down to 2. Somewhere in there I also became a CFA Level 1 candidate.",
    "Now I'm in Montréal doing a Master of Management in Analytics at McGill's Desautels, going deep on the machine-learning side: NLP on financial news, computer vision for Canadian National Railway, and whatever else lets me build things that matter — some of them for Bangladesh.",
  ],
  facts: [
    { label: "Currently", value: "MMA candidate @ McGill (Desautels)" },
    { label: "Previously", value: "Senior Data Analyst @ RBC Capital Markets" },
    { label: "Based in", value: "Montréal, Canada" },
    { label: "From", value: "Dhaka, Bangladesh" },
    { label: "Credential", value: "CFA Level 1 candidate" },
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
    title: "Master of Management in Analytics",
    org: "McGill University — Desautels Faculty of Management, Montréal",
    details:
      "Awarded a 30% entrance scholarship. Projects: forecasting stock moves from news sentiment (ARIMA + BERT), predicting speed-dating success (GBM, k-NN), and an ongoing partnership with Canadian National Railway building real-time computer vision that flags rail-line deformities and wildfire risk from live video.",
  },
  {
    period: "2024 — 2025",
    title: "Senior Data Analyst",
    org: "RBC Capital Markets, Halifax",
    details:
      "Built projection models and validation reporting on large relational databases; automated data-mining workflows that halved report generation time; optimized a core data pipeline from 13 minutes down to 2.",
  },
  {
    period: "2022 — 2023",
    title: "Data Analyst",
    org: "RBC Capital Markets, Halifax",
    details:
      "Shipped a big-data Python program that went to production, and reported weekly to senior management through Tableau dashboards.",
  },
  {
    period: "2021",
    title: "Operations Analyst",
    org: "Citco Fund Services, Halifax",
    details:
      "Fund services for multinational hedge funds and private equity — A/B, sensitivity and stability testing, client-facing decks, and a 20% ETL efficiency improvement from a data-validation investigation.",
  },
  {
    period: "2018 — 2020",
    title: "Fund Manager, TMT sector",
    org: "Impact Fund, Sobey School of Business",
    details:
      "Managed the TMT book of a $600K student-run fund using DCF/DDM/comps on FactSet, Bloomberg and Capital IQ. Pitched the Maxar liquidation and the OpenText acquisition — both executed. Plus co-ops at Nova Scotia Power (energy forecasting) and East Coast Offshore Supplies.",
  },
  {
    period: "2016 — 2020",
    title: "Bachelor of Commerce, Finance",
    org: "Saint Mary's University, Halifax",
    details:
      "GPA 3.88/4.30, Magna Cum Laude, Beta Gamma Sigma (top 7%). Placed 2nd at the Venture Capital Investment Competition in Boston. Graduated with Co-op Distinction.",
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
      "A Poparide-style carpooling platform covering all 64 districts of Bangladesh. Drivers post trips they're already making; travellers book the empty seats. Payments are held in escrow via bKash, Nagad, or card — released only after the trip completes, designed around Bangladesh Bank's digital-commerce rules. Ships as an Android app with automated APK builds.",
    tags: ["TypeScript", "Vite", "Capacitor", "Escrow payments", "GitHub Actions"],
    link: "https://github.com/DukeofDhaka/deshride-app",
    linkLabel: "github.com/DukeofDhaka/deshride-app",
    flagship: true,
    accent: "green",
  },
  {
    title: "Rail Vision × CN",
    subtitle: "Real-time computer vision for Canadian National Railway",
    description:
      "Ongoing McGill partnership with CN (NYSE: CNI): live video analytics that detect rail-line deformities and flag conditions that start track-side wildfires — models built for real-time inference on streaming footage.",
    tags: ["Computer Vision", "Python", "Real-time inference", "McGill × CN"],
    link: "https://github.com/DukeofDhaka",
    linkLabel: "In progress — repo coming",
    accent: "blue",
  },
  {
    title: "Market Sentiment",
    subtitle: "Forecasting stock moves from financial news",
    description:
      "Time-series forecasting (ARIMA) fused with BERT-based sentiment extracted from news coverage, testing whether headlines lead price action. Built during the McGill MMA — where finance experience meets NLP.",
    tags: ["ARIMA", "BERT", "NLP", "Time series", "Python"],
    link: "https://github.com/DukeofDhaka",
    linkLabel: "In progress — repo coming",
    accent: "gold",
  },
  {
    title: "ML in Production — INSY 674",
    subtitle: "From notebook to deployed API",
    description:
      "End-to-end ML predicting whether job candidates will change employers: research notebooks → production package → FastAPI with Pydantic validation → Docker → live on Render with drift monitoring. My contribution hardened the API contract with CI tests.",
    tags: ["Python", "scikit-learn", "FastAPI", "Docker", "CI/CD"],
    link: "https://github.com/DukeofDhaka/INSY-674",
    linkLabel: "github.com/DukeofDhaka/INSY-674",
    accent: "blue",
  },
];

export const skills = [
  {
    group: "Analytics & Machine Learning",
    items: [
      "Python",
      "SQL",
      "pandas / scikit-learn",
      "NLP (BERT)",
      "Time series (ARIMA)",
      "Computer vision",
      "Tableau",
    ],
  },
  {
    group: "Finance & Markets",
    items: [
      "Valuation (DCF · DDM · Comps)",
      "CFA Level 1 candidate",
      "FactSet · Bloomberg",
      "Capital IQ · Reuters",
      "Fund operations",
      "Quantitative research",
    ],
  },
  {
    group: "Engineering & Tools",
    items: [
      "TypeScript / React",
      "FastAPI",
      "Docker",
      "Git & GitHub Actions",
      "ETL pipelines",
      "SAS",
    ],
  },
];

// labels for the physics ball pit (roughly biggest-first — first 6 render large)
export const techBalls = [
  "Python",
  "SQL",
  "TypeScript",
  "React",
  "FastAPI",
  "Docker",
  "PyTorch",
  "BERT",
  "ARIMA",
  "Tableau",
  "pandas",
  "scikit-learn",
  "GitHub Actions",
  "Bloomberg",
  "FactSet",
  "DCF",
  "CFA",
  "Vite",
  "Capacitor",
  "ETL",
  "k-NN",
  "GBM",
];

export const life = [
  {
    title: "ঢাকা → Halifax → Montréal",
    text: "Dhaka gave me the hustle, Halifax gave me a finance degree and my first real winters, Montréal gave me bagels and machine learning. Three cities, one wardrobe crisis.",
    emoji: "🌏",
  },
  {
    title: "The soundtrack",
    text: "The song playing right now is the 23 Theme by Anirudh Ravichander. It's what I put on when it's 2 a.m. and the model finally converges. Non-negotiable site feature.",
    emoji: "🎧",
    link: "https://www.youtube.com/watch?v=vu7GnS0lxAI",
    linkLabel: "Hear it on YouTube",
  },
  {
    title: "I quantify everything",
    text: "I'm an analytics person in the truest sense: I even log my bad habits to JSON. Exhibit A: AmrCigarateKhawaTracker.py — a Python tracker for how many cigarettes ami khaise. The data trends downward. Mostly.",
    emoji: "📉",
    link: "https://github.com/DukeofDhaka/Cigarate-Smok-tracker",
    linkLabel: "The evidence, on GitHub",
  },
  {
    title: "Red Cross roots",
    text: "Before the spreadsheets: coordinating for the Red Cross. Some instincts — show up, organize the chaos, help — carried straight into how I work.",
    emoji: "🤝",
  },
];
