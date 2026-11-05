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
  // prefilled subject when a visitor emails from the site
  emailSubject: "Hello from dukeofdhaka.com",
  github: "https://github.com/DukeofDhaka",
  linkedin: "https://www.linkedin.com/in/tahsinfatin/",
  music: {
    title: "23 Theme (From “AA23”)",
    artist: "Anirudh Ravichander",
    youtubeId: "vu7GnS0lxAI",
    url: "https://www.youtube.com/watch?v=vu7GnS0lxAI",
  },
};

// The "email me" dialog — every email button opens this instead of a bare
// mailto: link, which does nothing useful on machines without a mail app.
export const emailDialog = {
  title: "Say hello",
  note: "Pick whatever you write email with — my address and a subject are already filled in.",
  copy: "Copy",
  copied: "Copied ✓",
  options: [
    { id: "gmail", label: "Gmail" },
    { id: "outlook", label: "Outlook" },
    { id: "app", label: "Mail app" },
  ] as const,
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
    "I grew up in Dhaka — a city of twenty million people, infinite traffic, and better food than wherever you're reading this from. At eighteen I landed in Halifax for a finance degree at Saint Mary's, where I ran the TMT book of a real $600K student fund and took second place at the Venture Capital Investment Competition in Boston.",
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

/**
 * The long version of a Works card, shown at /works/<slug>/ and in the
 * overlay on the home page. Every claim and number is condensed or quoted
 * from that repo's own README (team projects: its merged pull requests).
 */
export type CaseStudy = {
  /** the question the project sets out to answer */
  question: string;
  /** how it works, in order */
  approach: string[];
  /** headline numbers, each quoted from the README */
  results: { value: string; label: string }[];
  /** the honest bottom line */
  takeaway?: string;
  /** team projects: what Tahsin himself built */
  role?: string;
  /** named test/eval scenarios, for work with no figures */
  checks?: string[];
  /** README figures, copied as WebP into public/works/<slug>/ */
  figures: { src: string; caption: string }[];
  /** the README's own stated limits */
  limits: string[];
};

export type Project = {
  /** URL id: /works/<slug>/ */
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** headline number shown big on the Works card — keep it verifiable */
  metric: { value: string; label: string };
  /** top of the card: a real figure from the repo, or a typographic one */
  exhibit:
    | { src: string; caption: string }
    | { lines: string[]; caption: string };
  /** small tag top-right of the card: the course, programme or org */
  context?: string;
  tags: string[];
  /** omit for work with no public repo */
  link?: string;
  flagship?: boolean;
  /** omit for work with no public source to expand from */
  caseStudy?: CaseStudy;
};

// Works section copy (the cards themselves are `projects` below).
export const works = {
  intro:
    "Every number below is quoted from the project's own README — or, where there's no public repo, from my own report.",
  flagship: "Flagship",
  repoLink: "View the repo ↗",
  caseStudyLink: "Read the case study →",
  noRepo: "No public repo",
};

// Labels on the case-study pages / overlay (the content is in `projects`).
export const caseStudyCopy = {
  kicker: "Case study",
  question: "The question",
  approach: "How it works",
  results: "Results",
  takeaway: "Bottom line",
  role: "My part",
  checks: "What the evals cover",
  figures: "From the repo",
  limits: "Known limits",
  repo: "View the repo ↗",
  allWork: "← All work",
  close: "Close",
  next: "Next case study",
};

// Every metric below is quoted from the repo's own README (or, for work with
// no repo, from Tahsin's own report) — keep it that way.
export const projects: Project[] = [
  {
    slug: "deshride",
    title: "DeshRide",
    exhibit: { src: "/works/deshride.webp", caption: "The brand, from the repo" },
    subtitle: "সমগ্র বাংলাদেশ — intercity carpooling for Bangladesh",
    description:
      "A Poparide-style carpooling platform for all of Bangladesh. Drivers post trips they're already making; travellers book the empty seats. Payments sit in escrow via bKash, Nagad, or card until the trip completes, designed around Bangladesh Bank's digital-commerce rules. Ships as an Android app with automated APK builds.",
    metric: { value: "64", label: "districts covered" },
    tags: ["TypeScript", "Vite", "Capacitor", "Escrow payments", "GitHub Actions"],
    link: "https://github.com/DukeofDhaka/deshride-app",
    flagship: true,
    caseStudy: {
      question:
        "Can intercity carpooling work in Bangladesh — drivers selling the seats on trips they're already making — with payments both sides can trust?",
      approach: [
        "One app, both roles: a driver posts a trip with any pickup and drop-off in the country — all 64 districts, or a pin dropped straight on the map.",
        "Travellers request the empty seats; the driver approves who rides.",
        "The fare is collected via bKash, Nagad or card when the driver accepts, held, and released to the driver only after the trip completes — the pattern Bangladesh Bank's Digital Commerce rules already mandate.",
        "A local-first prototype: the whole loop — post → search → request → accept into escrow → complete → release — works end to end, with one storage module as the seam for a future backend.",
        "The same codebase ships as an Android app through Capacitor; CI builds a debug APK on every push.",
        "Launch research to match: regulation (BRTA, company setup, VAT, PDPO 2025), market and unit economics, Play Store and payment rails, and a go/no-go verdict with a phased roadmap.",
      ],
      results: [
        { value: "64", label: "districts — any pickup, any drop-off" },
        { value: "3", label: "payment rails: bKash, Nagad, card" },
        { value: "5", label: "feasibility reports, regulation to payments design" },
      ],
      figures: [],
      limits: [
        "Still a local-first prototype: trips and bookings live on the device until a backend replaces the storage seam.",
      ],
    },
  },
  {
    slug: "portfolio-committee",
    title: "Portfolio Committee",
    exhibit: { src: "/works/committee.webp", caption: "Fig. Coordination outcomes by scenario" },
    subtitle: "A governed multi-agent investment committee",
    description:
      "Macro, Sector, Risk and Compliance agents bid through a risk-budget auction, with veto controls and a human CIO approver. Governance fails closed: unsafe or ambiguous decisions escalate instead of trading. Tested against prompt injection, stale data, restricted assets, replay, over-budget bids and specialist timeouts.",
    metric: { value: "13/13", label: "adversarial scenarios pass" },
    context: "MGSC 697 · capstone",
    tags: ["Multi-agent systems", "OpenAI Agents SDK", "Python", "Evals"],
    link: "https://github.com/DukeofDhaka/portfolio-committee-multi-agent-system",
    caseStudy: {
      question:
        "Does a multi-agent committee add enough governance value over one generalist advisor to justify the added coordination complexity?",
      approach: [
        "Macro and Sector agents write independent views to separate, role-scoped state — fan-out, then a stable gather.",
        "Their bids compete in a contract-net auction for a scarce, deterministic risk budget; unsupported, over-budget, restricted or concentrated bids are rejected.",
        "Risk and Compliance act as independent veto gates — concentration, turnover, cash floor and drawdown on one side; restricted assets, stale data and instruction attacks on the other.",
        "Risk may ask for exactly one diversified Sector revision: recovery without an unbounded self-correction loop.",
        "Hard breaches, a missing specialist or ambiguity go to a human CIO as a structured approval ticket. Every message carries a typed header with trace and correlation IDs.",
      ],
      results: [
        { value: "13/13", label: "deterministic scenarios pass" },
        { value: "8", label: "evaluated cases routed to CIO review" },
        { value: "1", label: "bounded revision allowed — never a loop" },
      ],
      takeaway:
        "Yes for shadow decision support, no for autonomous deployment. The committee can propose weights, run the auction, reject unsafe bids and draft CIO tickets — but it cannot trade or rebalance an account.",
      figures: [
        {
          src: "/works/portfolio-committee/coordination-outcomes.webp",
          caption: "Coordination outcomes across the deterministic evaluation suite",
        },
      ],
      limits: [
        "The portfolio, market conditions and scenarios are synthetic — built to demonstrate system design.",
        "Shadow-only authority: the prototype cannot trade, rebalance an account, or approve autonomous deployment.",
      ],
    },
  },
  {
    slug: "walk-forward-alpha",
    title: "Walk-Forward Alpha",
    exhibit: { src: "/works/walk-forward.webp", caption: "Fig. Growth of $1 — Elastic Net vs the SPY excess benchmark" },
    subtitle: "ML models for cross-sectional stock-return prediction",
    description:
      "Linear, tree-based and neural models compared walk-forward over 84 out-of-sample months (2017–2023), each driving a monthly long-short portfolio. Elastic Net delivered a 14.83% annualized long-short return and 17.41% alpha relative to SPY excess returns.",
    metric: { value: "0.948", label: "Sharpe — vs 0.633 for SPY excess" },
    context: "FINA 695",
    tags: ["Elastic Net", "Gradient boosting", "TensorFlow", "Walk-forward CV"],
    link: "https://github.com/DukeofDhaka/fina695-walk-forward-ml-portfolio",
    caseStudy: {
      question:
        "Which model family — linear, tree-based or neural — best predicts the cross-section of stock returns, judged by the long-short portfolio it builds?",
      approach: [
        "147 firm characteristics, median-imputed and rank-scaled across stocks every month.",
        "Six model families: Lasso, Ridge, Elastic Net, Random Forest, gradient-boosted trees and a two-hidden-layer neural network.",
        "Walk-forward: each test year trains on an expanding window, validates on the two years before it, then tests on the untouched year — 84 out-of-sample months, January 2017 to December 2023.",
        "Predictions drive monthly value-weighted long-short portfolios with at least 50 names per side.",
        "Scored against a zero-return OOS R² benchmark and SPY excess returns; the repo's tests recompute the headline metrics from the saved monthly series.",
      ],
      results: [
        { value: "0.948", label: "Elastic Net Sharpe — vs 0.633 for SPY excess" },
        { value: "14.83%", label: "annualized long-short return" },
        { value: "17.41%", label: "annualized alpha vs SPY excess returns" },
        { value: "−22.37%", label: "max drawdown — vs −25.22% for SPY excess" },
        { value: "0.733%", label: "best OOS R² (Lasso), 42,342 predictions" },
      ],
      figures: [
        {
          src: "/works/walk-forward-alpha/cumulative-returns.webp",
          caption: "Growth of $1 — Elastic Net vs the SPY excess benchmark, 2017–2023",
        },
      ],
      limits: [
        "Elastic Net is highlighted after the fact for having the best Sharpe — a descriptive choice with selection bias, not a second untouched test.",
        "Historical academic data: no live trading, market impact or borrow constraints.",
        "Alpha is the intercept of a single-factor regression on SPY excess returns — not a causal estimate.",
      ],
    },
  },
  {
    slug: "equity-research",
    title: "Equity Research",
    exhibit: { lines: ["MAXR → SELL", "OTEX → BUY", "DLB · EXPO · MKTX"], caption: "Calls & ideas" },
    subtitle: "From a student fund's IC to moat-hunting",
    description:
      "At the $600K Impact Fund I built the Maxar SELL case — DCF (perpetuity and exit multiple) checked against comps — and pitched the OpenText buy; the fund executed both. Lately: three small/mid-cap moats — Dolby's licensing standard, Exponent's reputation, MarketAxess's network effect — valuation and risks included.",
    metric: { value: "2", label: "IC pitches executed — Maxar & OpenText" },
    context: "Impact Fund · Saint Mary's",
    tags: ["DCF", "Comparable companies", "Moat analysis", "Bloomberg · FactSet"],
  },
  {
    slug: "residual-cnn",
    title: "Residual CNN + Grad-CAM",
    exhibit: { src: "/works/gradcam.webp", caption: "Fig. Grad-CAM — where the network looks" },
    subtitle: "A custom vision model, and proof of what it learned",
    description:
      "A 7.6M-parameter residual CNN whose activation and receptive field were picked through a controlled four-way ablation, transferred from CIFAR-10 to CIFAR-100 (72.35%), then opened up with feature maps and Grad-CAM.",
    metric: { value: "93.5%", label: "CIFAR-10 test accuracy" },
    context: "MGSC 695",
    tags: ["PyTorch", "Computer vision", "Transfer learning", "Grad-CAM"],
    link: "https://github.com/DukeofDhaka/residual-cnn-vision-explainability",
    caseStudy: {
      question:
        "Can a purpose-built residual network learn strong features from tiny 32×32 CIFAR-10 images — and give CIFAR-100's 100 finer classes a useful warm start?",
      approach: [
        "Crop, flip, colour-jitter and random-erasing augmentation, normalized with CIFAR-10 channel statistics.",
        "A controlled ablation: two activations × two kernel sizes on the same 9,000-image subset for 15 epochs. SiLU with 5×5 kernels won, at 70.66% validation accuracy.",
        "The selected 7.6M-parameter network — six residual blocks over three stages — trained on CIFAR-10 for 100 epochs.",
        "For CIFAR-100: a new head, five warm-up epochs, then 60 epochs of fine-tuning.",
        "Then opened up: confusion patterns, confidence and calibration, feature maps and Grad-CAM.",
      ],
      results: [
        { value: "93.50%", label: "CIFAR-10 test accuracy" },
        { value: "72.35%", label: "CIFAR-100 test accuracy after transfer" },
        { value: "7.6M", label: "parameters" },
        { value: "0.0638", label: "CIFAR-10 expected calibration error" },
      ],
      takeaway:
        "Visually similar animals stay hardest — 14.40% error on cats, 10.30% on birds, 10.10% on dogs — and correct predictions are more confident than wrong ones: 89.0% vs 60.5% mean confidence.",
      figures: [
        { src: "/works/residual-cnn/ablation.webp", caption: "Four-way architecture ablation" },
        { src: "/works/residual-cnn/training-curves.webp", caption: "CIFAR-10 and CIFAR-100 training curves" },
        { src: "/works/residual-cnn/gradcam.webp", caption: "CIFAR-10 Grad-CAM examples" },
        { src: "/works/residual-cnn/misclassifications.webp", caption: "Most confident CIFAR-10 errors" },
      ],
      limits: [
        "One seeded, course-scale run — it doesn't measure run-to-run uncertainty.",
        "Grad-CAM is diagnostic evidence, not proof of the model's reasoning.",
        "An honest student-scale benchmark, not a state-of-the-art claim.",
      ],
    },
  },
  {
    slug: "transformer-classifier",
    title: "Transformer Topic Classifier",
    exhibit: { src: "/works/confusion.webp", caption: "Fig. Normalized confusion matrix" },
    subtitle: "Fine-tuned RoBERTa vs a classic baseline",
    description:
      "Multi-class topic classification on 20 Newsgroups: RoBERTa fine-tuned and calibrated with temperature scaling, benchmarked against TF-IDF + logistic regression, then exported to ONNX with perfect prediction agreement.",
    metric: { value: "77.6%", label: "macro-F1 — vs 71.6% TF-IDF" },
    context: "MGSC 695",
    tags: ["RoBERTa", "Transformers", "ONNX", "Calibration"],
    link: "https://github.com/DukeofDhaka/transformer-text-classification-system",
    caseStudy: {
      question:
        "Twenty newsgroup topics that share vocabulary — religion, politics, computer hardware, recreation. How far does a fine-tuned transformer beat a classic baseline, and can its confidence be trusted?",
      approach: [
        "Light cleaning, stratified train/validation/test splits, tokenization and training-only synonym augmentation.",
        "Encoder and classification-head experiments, then full RoBERTa fine-tuning.",
        "A TF-IDF + logistic regression baseline on the same held-out split.",
        "Class-level error analysis, attention diagnostics and local explanations; temperature scaling with reliability diagrams.",
        "PyTorch → ONNX export checked for prediction agreement and latency, then cross-domain tests on AG News.",
      ],
      results: [
        { value: "77.60%", label: "macro-F1 — vs 71.59% for TF-IDF" },
        { value: "78.58%", label: "held-out accuracy" },
        { value: "0.0912 → 0.0720", label: "calibration error after temperature scaling" },
        { value: "1.000", label: "PyTorch / ONNX prediction agreement" },
        { value: "85.67%", label: "AG News macro-F1, frozen encoder" },
      ],
      takeaway:
        "ONNX is portable and prediction-equivalent — not faster. It measured 19.20 ms per example against 17.41 ms for PyTorch, so no speed-up is claimed.",
      figures: [
        { src: "/works/transformer-classifier/confusion-matrix.webp", caption: "Normalized held-out confusion matrix" },
        { src: "/works/transformer-classifier/calibration-before.webp", caption: "Calibration before temperature scaling" },
        { src: "/works/transformer-classifier/calibration-after.webp", caption: "Calibration after temperature scaling" },
      ],
      limits: [
        "20 Newsgroups is an older benchmark; it doesn't establish robustness on today's language or other domains.",
        "Full GPU training wasn't rerun for the portfolio — the values come from the saved notebook outputs.",
      ],
    },
  },
  {
    slug: "rail-vision",
    title: "Rail Vision × CN",
    exhibit: { lines: ["live video", "→ real-time inference", "→ defect & wildfire flags"], caption: "Pipeline" },
    subtitle: "Real-time computer vision for Canadian National Railway",
    description:
      "Ongoing McGill partnership with CN (NYSE: CNI): live video analytics that detect rail-line deformities and flag conditions that start track-side wildfires — models built for real-time inference on streaming footage.",
    metric: { value: "CN", label: "industry partner · in progress" },
    tags: ["Computer vision", "Python", "Real-time inference"],
  },
  {
    slug: "cafe-inventory-rl",
    title: "Café Inventory RL",
    exhibit: { src: "/works/cafe-rl.webp", caption: "Fig. Mean profit per 28-day episode" },
    subtitle: "Should a DQN run the kitchen? An honest audit",
    description:
      "Q-learning, DQN and PPO against a business heuristic for daily replenishment, stress-tested through demand spikes, collapses, supplier disruption and spoilage shocks. The verdict was governance, not hype: keep the heuristic live and shadow the DQN for four weeks.",
    metric: { value: "95.2%", label: "service level — vs 92.0% heuristic" },
    tags: ["DQN", "PPO", "Gymnasium", "Decision science"],
    link: "https://github.com/DukeofDhaka/campus-cafe-inventory-rl",
    caseStudy: {
      question:
        "Does added model complexity improve a campus café's daily fresh-meal order enough to justify the operational risk?",
      approach: [
        "An auditable MDP: 28 daily decisions per episode — order 0, 4, 8 or 12 meals — with stochastic demand, overnight spoilage and shifting demand regimes.",
        "Reward is sales minus purchasing, holding, spoilage, lost-demand and overflow costs.",
        "A business-rule heuristic against tabular Q-learning, DQN and PPO, each trained for 100,000 steps on three seeds.",
        "Every policy faces the same 200 seeds in six scenarios — normal, demand spike, demand collapse, forecast noise, supplier disruption, spoilage shock — with paired 95% bootstrap intervals.",
        "A sales-only Q-agent as the reward-hacking control: it learns its proxy and lowers true profit from $782 to $749.",
      ],
      results: [
        { value: "95.2%", label: "DQN service level — vs 92.0% heuristic" },
        { value: "+$3.73", label: "DQN profit edge, 95% CI −$17.51 to +$25.03" },
        { value: "+$88.64", label: "DQN edge in a demand spike" },
        { value: "−$50.15", label: "DQN edge in a demand collapse" },
      ],
      takeaway:
        "Keep the heuristic live and shadow the DQN for four weeks — don't deploy it autonomously. It's non-inferior, not proven superior: it wastes more (8.9% vs 5.9%) and has a worse lower tail.",
      figures: [
        { src: "/works/cafe-inventory-rl/policy-comparison.webp", caption: "Policy comparison across profit, service, waste, and downside" },
        { src: "/works/cafe-inventory-rl/stress-tests.webp", caption: "Stress tests — profit vs the heuristic over 200 paired seeds per scenario" },
        { src: "/works/cafe-inventory-rl/reward-hacking.webp", caption: "Optimizing sales alone hides the cost of the behavior it creates" },
      ],
      limits: [
        "Demand is synthetic, and the simulator leaves out menu substitution, variable lead times, staffing and promotions.",
        "Confidence intervals measure simulator uncertainty, not causal real-world impact.",
      ],
    },
  },
  {
    slug: "course-advisor-agent",
    title: "Course Advisor Agent",
    exhibit: { lines: ["request → agent plan", "→ guardrail re-audits", "→ approved or blocked"], caption: "Control flow" },
    subtitle: "An AI agent that can't break the rules",
    description:
      "A course-planning agent on the OpenAI Agents SDK whose guardrail never trusts the model's own risk claims: it recomputes the policy audit and blocks altered risks, wrong approval flags and blocked-course recommendations.",
    metric: { value: "8/8", label: "offline evals pass" },
    tags: ["OpenAI Agents SDK", "Guardrails", "Pydantic", "pytest"],
    link: "https://github.com/DukeofDhaka/mcgill-course-advisor-agent",
    caseStudy: {
      question:
        "Can an AI course-planning agent explain trade-offs freely while never being trusted on the rules?",
      approach: [
        "One bounded OpenAI Agents SDK agent with four typed tools: search courses, check prerequisites, evaluate the plan, draft an advisor-approval request.",
        "Its answer is a Pydantic-validated recommendation, not free prose.",
        "Deterministic code recomputes prerequisites, term availability, credit load, duplicate enrollment, capstone eligibility and approval needs.",
        "A named guardrail re-audits the trusted request and blocks altered risks, wrong approval flags, corrupted drafts and blocked-course picks.",
        "No tool registers for a course, sends a message or changes an external system.",
      ],
      results: [
        { value: "8/8", label: "offline behavior evals pass" },
        { value: "4", label: "typed tools" },
        { value: "0", label: "side effects — nothing registers or sends" },
      ],
      takeaway:
        "Model proposes, policy disposes: the model can explain trade-offs, but deterministic code has the final word on every recommendation.",
      checks: [
        "Clean Winter plan",
        "ML path after prerequisites",
        "Missing SQL prerequisite",
        "Credit overload",
        "Capstone too early",
        "Unknown course",
        "Prompt-injection attempt",
        "Approval override conflict",
      ],
      figures: [],
      limits: [
        "Every catalog entry, student profile and rule is a simplified synthetic fixture — not real McGill policy or data.",
        "A coursework prototype, not a production advising system.",
      ],
    },
  },
  {
    slug: "ml-in-production",
    title: "ML in Production",
    exhibit: { lines: ["notebook → package", "→ FastAPI → Docker", "→ Render + drift watch"], caption: "Pipeline" },
    subtitle: "From notebook to deployed API",
    description:
      "End-to-end ML predicting whether job candidates are likely to look for a new job: research notebooks → production package → FastAPI with Pydantic validation → Docker → live on Render. My part of the team build: strict input validation, model-health metadata and the data-drift monitoring endpoint.",
    metric: { value: "API", label: "FastAPI · Docker · Render" },
    context: "INSY 674",
    tags: ["scikit-learn", "FastAPI", "Docker", "CI/CD"],
    link: "https://github.com/DukeofDhaka/INSY-674",
    caseStudy: {
      question:
        "What does it take to get a model out of a notebook and into a live, validated, monitored API?",
      role:
        "A team project. My merged pull requests: strict input validation (unknown fields and out-of-range values rejected), a clean 503 when the model artifact is missing, model metadata on the health endpoint for traceability, and the data-drift monitoring endpoint with its training baselines.",
      approach: [
        "Research notebooks → a versioned Python package with central config and reusable training and prediction modules.",
        "FastAPI endpoints for health and batch prediction, with Pydantic validation schemas and Loguru logging.",
        "A drift endpoint that compares each incoming batch with the training baseline using PSI — warn at 0.1, alert at 0.25.",
        "Docker image, Render blueprint deployment and a GitHub Actions CI pipeline.",
      ],
      results: [
        { value: "5", label: "phases, research to production" },
        { value: "4", label: "API endpoints, incl. drift monitoring" },
        { value: "0.1 / 0.25", label: "PSI drift warn / alert thresholds" },
      ],
      figures: [],
      limits: [
        "It runs on Render's free tier, which sleeps when idle — the first request can take 30–60 seconds.",
      ],
    },
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
