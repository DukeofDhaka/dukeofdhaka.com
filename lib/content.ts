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
    title: "Research Associate → Fund Manager",
    org: "Impact Fund, Sobey School of Business",
    details:
      "Research Associate (2018–19), then Fund Manager (2019–20) of the TMT book in a $600K student-run fund, valuing companies with DCF/DDM/comps on FactSet, Bloomberg and Capital IQ. Pitched the Maxar liquidation and the OpenText acquisition — both executed. Plus co-ops at Nova Scotia Power (energy forecasting) and East Coast Offshore Supplies.",
  },
  {
    period: "2016 — 2020",
    title: "Bachelor of Commerce, Finance",
    org: "Saint Mary's University, Halifax",
    details:
      "GPA 3.88/4.30, Magna Cum Laude, Dean's List 2017 & 2018, Beta Gamma Sigma (top 7%). Placed 2nd at the Venture Capital Investment Competition in Boston. Graduated with Co-op Distinction.",
  },
];

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  /** headline number shown big on the Works card — keep it verifiable */
  metric: { value: string; label: string };
  /** top of the card: a real figure from the repo, or a typographic one */
  exhibit:
    | { src: string; caption: string }
    | { lines: string[]; caption: string };
  course?: string;
  tags: string[];
  /** omit for work with no public repo */
  link?: string;
  flagship?: boolean;
};

// Every metric below is quoted from the repo's own README — keep it that way.
export const projects: Project[] = [
  {
    title: "DeshRide",
    exhibit: { src: "/works/deshride.webp", caption: "The brand, from the repo" },
    subtitle: "সমগ্র বাংলাদেশ — intercity carpooling for Bangladesh",
    description:
      "A Poparide-style carpooling platform for all of Bangladesh. Drivers post trips they're already making; travellers book the empty seats. Payments sit in escrow via bKash, Nagad, or card until the trip completes, designed around Bangladesh Bank's digital-commerce rules. Ships as an Android app with automated APK builds.",
    metric: { value: "64", label: "districts covered" },
    tags: ["TypeScript", "Vite", "Capacitor", "Escrow payments", "GitHub Actions"],
    link: "https://github.com/DukeofDhaka/deshride-app",
    flagship: true,
  },
  {
    title: "Portfolio Committee",
    exhibit: { src: "/works/committee.webp", caption: "Fig. Coordination outcomes by scenario" },
    subtitle: "A governed multi-agent investment committee",
    description:
      "Macro, Sector, Risk and Compliance agents bid through a risk-budget auction, with veto controls and a human CIO approver. Governance fails closed: unsafe or ambiguous decisions escalate instead of trading. Tested against prompt injection, stale data, restricted assets, replay, over-budget bids and specialist timeouts.",
    metric: { value: "13/13", label: "adversarial scenarios pass" },
    course: "MGSC 697 · capstone",
    tags: ["Multi-agent systems", "OpenAI Agents SDK", "Python", "Evals"],
    link: "https://github.com/DukeofDhaka/portfolio-committee-multi-agent-system",
  },
  {
    title: "Walk-Forward Alpha",
    exhibit: { src: "/works/walk-forward.webp", caption: "Fig. Growth of $1 — Elastic Net vs SPY, 2017–2023" },
    subtitle: "ML models for cross-sectional stock-return prediction",
    description:
      "Linear, tree-based and neural models compared walk-forward over 84 out-of-sample months (2017–2023), each driving a monthly long-short portfolio. Elastic Net delivered a 14.83% annualized long-short return and 17.41% alpha versus SPY.",
    metric: { value: "0.948", label: "Sharpe — vs 0.633 for SPY" },
    course: "FINA 695",
    tags: ["Elastic Net", "Gradient boosting", "TensorFlow", "Walk-forward CV"],
    link: "https://github.com/DukeofDhaka/fina695-walk-forward-ml-portfolio",
  },
  {
    title: "Equity Research",
    exhibit: { lines: ["MAXR  → SELL", "OTEX  → BUY", "DLB · EXPO · MKTX"], caption: "Calls & ideas" },
    subtitle: "From a student fund's IC to moat-hunting",
    description:
      "At the $600K Impact Fund I built the Maxar SELL case — DCF (perpetuity and exit multiple) checked against comps — and pitched the OpenText buy; the fund executed both. Lately: three small/mid-cap moats — Dolby's licensing standard, Exponent's reputation, MarketAxess's network effect — valuation and risks included.",
    metric: { value: "2/2", label: "IC pitches executed by the fund" },
    course: "Impact Fund · Saint Mary's",
    tags: ["DCF", "Comparable companies", "Moat analysis", "Bloomberg · FactSet"],
  },
  {
    title: "Residual CNN + Grad-CAM",
    exhibit: { src: "/works/gradcam.webp", caption: "Fig. Grad-CAM — where the network looks" },
    subtitle: "A custom vision model, and proof of what it learned",
    description:
      "A 7.6M-parameter residual CNN whose activation and receptive field were picked through a controlled four-way ablation, transferred from CIFAR-10 to CIFAR-100 (72.35%), then opened up with feature maps and Grad-CAM.",
    metric: { value: "93.5%", label: "CIFAR-10 test accuracy" },
    course: "MGSC 695",
    tags: ["PyTorch", "Computer vision", "Transfer learning", "Grad-CAM"],
    link: "https://github.com/DukeofDhaka/residual-cnn-vision-explainability",
  },
  {
    title: "Transformer Topic Classifier",
    exhibit: { src: "/works/confusion.webp", caption: "Fig. Normalized confusion matrix" },
    subtitle: "Fine-tuned RoBERTa vs a classic baseline",
    description:
      "Multi-class topic classification on 20 Newsgroups: RoBERTa fine-tuned and calibrated with temperature scaling, benchmarked against TF-IDF + logistic regression, then exported to ONNX with perfect prediction agreement.",
    metric: { value: "77.6%", label: "macro-F1 — vs 71.6% TF-IDF" },
    course: "MGSC 695",
    tags: ["RoBERTa", "Transformers", "ONNX", "Calibration"],
    link: "https://github.com/DukeofDhaka/transformer-text-classification-system",
  },
  {
    title: "Rail Vision × CN",
    exhibit: { lines: ["live video", "→ real-time inference", "→ defect & wildfire flags"], caption: "Pipeline" },
    subtitle: "Real-time computer vision for Canadian National Railway",
    description:
      "Ongoing McGill partnership with CN (NYSE: CNI): live video analytics that detect rail-line deformities and flag conditions that start track-side wildfires — models built for real-time inference on streaming footage.",
    metric: { value: "CN", label: "industry partner · in progress" },
    tags: ["Computer vision", "Python", "Real-time inference"],
  },
  {
    title: "Café Inventory RL",
    exhibit: { src: "/works/cafe-rl.webp", caption: "Fig. Mean profit per 28-day episode" },
    subtitle: "Should a DQN run the kitchen? An honest audit",
    description:
      "Q-learning, DQN and PPO against a business heuristic for daily replenishment, stress-tested through demand spikes, collapses, supplier disruption and spoilage shocks. The verdict was governance, not hype: keep the heuristic live and shadow the DQN for four weeks.",
    metric: { value: "95.2%", label: "service level — vs 92.0% heuristic" },
    tags: ["DQN", "PPO", "Gymnasium", "Decision science"],
    link: "https://github.com/DukeofDhaka/campus-cafe-inventory-rl",
  },
  {
    title: "Course Advisor Agent",
    exhibit: { lines: ["request → agent plan", "→ guardrail re-audits", "→ approved or blocked"], caption: "Control flow" },
    subtitle: "An AI agent that can't break the rules",
    description:
      "A course-planning agent on the OpenAI Agents SDK whose guardrail never trusts the model's own risk claims: it recomputes the policy audit and blocks altered risks, wrong approval flags and blocked-course recommendations.",
    metric: { value: "8/8", label: "offline evals pass" },
    tags: ["OpenAI Agents SDK", "Guardrails", "Pydantic", "pytest"],
    link: "https://github.com/DukeofDhaka/mcgill-course-advisor-agent",
  },
  {
    title: "ML in Production",
    exhibit: { lines: ["notebook → package", "→ FastAPI → Docker", "→ Render + drift watch"], caption: "Pipeline" },
    subtitle: "From notebook to deployed API",
    description:
      "End-to-end ML predicting whether job candidates will change employers: research notebooks → production package → FastAPI with Pydantic validation → Docker → live on Render with drift monitoring. My contribution hardened the API contract with CI tests.",
    metric: { value: "API", label: "FastAPI · Docker · Render" },
    course: "INSY 674",
    tags: ["scikit-learn", "FastAPI", "Docker", "CI/CD"],
    link: "https://github.com/DukeofDhaka/INSY-674",
  },
];

export const skills = [
  {
    group: "Analytics & Machine Learning",
    items: [
      "Python",
      "SQL",
      "pandas / scikit-learn",
      "Deep learning (PyTorch · TensorFlow)",
      "NLP (RoBERTa · BERT)",
      "Computer vision",
      "Reinforcement learning (DQN · PPO)",
      "Time series (ARIMA)",
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
      "Agentic AI (OpenAI Agents SDK)",
      "FastAPI · Pydantic",
      "Docker · ONNX",
      "pytest & evals",
      "TypeScript / React",
      "Git & GitHub Actions",
      "ETL pipelines · SAS",
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
  "TensorFlow",
  "RoBERTa",
  "ONNX",
  "Agents SDK",
  "Tableau",
  "pandas",
  "scikit-learn",
  "DQN · PPO",
  "Pydantic",
  "pytest",
  "GitHub Actions",
  "Bloomberg",
  "FactSet",
  "DCF",
  "CFA",
  "ARIMA",
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
    title: "Red Cross roots",
    text: "Before the spreadsheets: coordinating for the Red Cross. Some instincts — show up, organize the chaos, help — carried straight into how I work.",
    emoji: "🤝",
  },
];
