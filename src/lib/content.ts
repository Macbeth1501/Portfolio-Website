/**
 * Phase 3 static content — hardcoded from profile.md, mapped onto the
 * Section 5 schema in SPEC.md. Phase 4 replaces this file's role with reads
 * from Supabase; the shape of each type here mirrors the DB columns so that
 * swap is mechanical.
 *
 * Content notes (see profile.md §14 for the full list of open questions):
 * - Where profile.md flags a conflict between sources, the account already
 *   treated as canonical by profile.md's own §3 summary is used here.
 * - Mood-Melody and the "smaller/supporting repos" bucket are left out: the
 *   former is a fork with unconfirmed own-contribution, the latter is either
 *   too early-stage to carry a Problem/Approach/Result or (Portfolio-Website)
 *   is this repo itself, not a project to list.
 * - No project or hero image exists yet — `image` is left undefined
 *   throughout rather than pointing at a placeholder.
 */

export type ProjectStatus = "live" | "in_progress" | "archived";

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  dateRange: string;
  problem: string;
  approach: string;
  result?: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  teamNote?: string;
};

export type Experience = {
  roleTitle: string;
  organization: string;
  dateRange: string;
  locationType: "on_site" | "remote" | "hybrid";
  description: string;
  mentors?: string[];
};

export type SkillGroup = {
  group: string;
  skills: string[];
};

export type Achievement = {
  title: string;
  result: string;
  context: string;
  date: string;
};

export const hero = {
  fullName: "Rochan Shrish Awasthi",
  roleLine: "B.Tech Computer Engineering — Applied AI/ML",
  bio: "Computer Engineering student at SVPCET, Nagpur, focused on speech processing, LLMs, computer vision, and geospatial AI. Research intern at IIIT Hyderabad's LTRC Speech Lab and AI intern at CS Tech AI. Winner of the ISRO Geospatial AI Challenge, national finalist at ISRO's Bharatiya Antariksh Hackathon, and published author (IJIRCCE 2026).",
  photo: undefined as string | undefined,
};

export const snapshotStats: { label: string; value: string }[] = [
  { label: "CGPA", value: "9.01 / 10" },
  { label: "GitHub repos", value: "13" },
  { label: "LeetCode solved", value: "246" },
  { label: "Papers published", value: "1" },
];

export const experience: Experience[] = [
  {
    roleTitle: "AI Intern",
    organization: "CS Tech AI (Ceinsys Tech Limited), MEG-NXT",
    dateRange: "Jun–Jul 2026",
    locationType: "on_site",
    description:
      "Built a production-grade FastAPI microservice that ingests, scores, and risk-audits unstructured tender documents: an async gateway with Playwright scraping isolated in worker thread pools, a four-stage evaluation pipeline (regex prefilter, configurable chunking, FAISS similarity search against corporate ground truth, and an LLM risk-audit layer on Llama 3.3 70B via Groq), and a price-sorted, confidence-scored output ledger.",
    mentors: ["Chirag Deshmukh", "Prasad Nirmal"],
  },
  {
    roleTitle: "Research Intern — AI / Speech Processing",
    organization: "IIIT Hyderabad, LTRC Speech Lab",
    dateRange: "May–Aug 2025",
    locationType: "on_site",
    description:
      "Worked on non-invasive, early Alzheimer's detection from speech. Built a feature-engineering pipeline on Whisper transcriptions, trained a feed-forward network reaching 85% validation accuracy, and implemented a multilingual Whisper-ensemble approach (following the INTERSPEECH 2024 TAUKADIAL framework) reproducing 81.83% UAR for mild cognitive impairment detection across English and Chinese.",
    mentors: ["Dr. Anil Kumar Vuppala"],
  },
];

export const projects: Project[] = [
  {
    slug: "v-neuron",
    title: "V-NEURON — Vidarbha Network for Evolutionary Urban Routing and Omnimodal Navigation",
    status: "live",
    dateRange: "Feb–Jul 2026",
    problem:
      "Nagpur commuters have no single routing system that reasons jointly across roads, footpaths, the Orange and Aqua metro lines, and bus stops, or accounts for how congestion shifts between peak and off-peak hours.",
    approach:
      "Modeled the city as one unified weighted graph (~110,000 nodes, ~250,000 edges) spanning all four modes, with boarding/transfer penalties and separate peak/off-peak congestion calibration, routed with Dijkstra over NetworkX. A 15-step automated GIS pipeline builds the graph from OSMnx extracts, UTM projection, and transit snapping; the Flask + Leaflet frontend adds live vehicle simulation and fuzzy geocoding with a Nominatim fallback.",
    result: "typical route computation <500 ms across 37 metro stations and 80+ bus stops",
    techStack: ["Python", "NetworkX", "OSMnx", "Flask", "Leaflet", "PostGIS"],
    liveUrl: "https://suraj.shinelikesun.workers.dev/vneuron",
    repoUrl: "https://github.com/Macbeth1501/V-NEURON",
    teamNote: "Team of 4 — Rochan Awasthi, Kashish Joseph, Suraj Dhere, Shreya Doye. Final-year project at SVPCET.",
  },
  {
    slug: "glof-detection",
    title: "Hybrid Glacial Lake Outburst Flood (GLOF) Detection",
    status: "archived",
    dateRange: "Jul–Aug 2025",
    problem:
      "Himalayan glacial lakes are expanding and destabilizing, but existing detection methods struggle to combine reliable lake extraction with a usable estimate of how confident that extraction is.",
    approach:
      "Built a hybrid GLNet + Attention U-Net (32.1M params, 8-channel input including DEM, slope, aspect, and NDWI) with a boundary-aware Dice + BCE + morphological-gradient loss, wrapped in Monte Carlo Dropout for pixel-level uncertainty. Measured area change on an 18,603-lake matched subset of a 22,508-lake Himalayan inventory (2016–17 to 2022) and shipped a GlacierWatch dashboard for time-series and risk alerts.",
    result: "Dice 0.538 (hybrid) vs. 0.149 for a baseline U-Net — though per the repo's own caveat, the hybrid model is not yet usable on real LISS-3 imagery, where spectral-index thresholding remains the default detection method",
    techStack: ["PyTorch", "GDAL", "Sentinel-1/2", "Next.js", "Leaflet"],
    repoUrl: "https://github.com/Macbeth1501/Glacial_Lake_Detection_BAH-2025",
    teamNote: "Team lead — with Sayali Bambal, Atharva Bhede, Uday Bhoyar. Grand finale at ISRO's Bharatiya Antariksh Hackathon 2025, NRSC Hyderabad.",
  },
  {
    slug: "eeg-wellbeing",
    title: "EEG Mental Wellbeing Platform",
    status: "live",
    dateRange: "Feb–Jul 2026",
    problem:
      "Self-reported mental-health screening tools are easy to game or misjudge; pairing them with a physiological signal like EEG could make triage more reliable, but EEG feature sets are large and prone to leakage.",
    approach:
      "Combined EEG coherence features with a custom 65-question instrument (IMHMA) unifying PHQ-9, GAD-7, ASRS v1.1, DASS-21, and PSS-10. Compressed 1,026 EEG coherence features to 15 components via PCA fit with leakage blinding, then trained a LightGBM binary screener on frontal theta/beta and theta/alpha features. An LLM coach (Llama 3.3 70B via Groq and LangChain) sits on top with guardrails routing acute distress to professional counsellor references.",
    techStack: ["LightGBM", "scikit-learn", "LangChain", "React", "Flask"],
    liveUrl: "https://eeg-project-459m.onrender.com/",
    repoUrl: "https://github.com/Macbeth1501/EEG-Mental-Wellbeing",
    teamNote: "Team of 3, mentored by Dr. Vijay Wadhai.",
  },
  {
    slug: "satquery-ai",
    title: "SatQuery AI — ISRO SIH 2026",
    status: "in_progress",
    dateRange: "2026",
    problem:
      "Answering a question about satellite imagery (optical or SAR, single-image or bi-temporal) usually requires a human to manually pick the right specialist model and manually assemble evidence for the answer.",
    approach:
      "Designed an agentic query planner that routes a natural-language question through a 7-step orchestration pipeline across 8 task types, with a compatibility validator, a verifier node, a confidence scorer, and JSON/HTML/PDF report export — backed by a FastAPI service and a React frontend, fully covered by 140 pytest and 58 Vitest tests.",
    result:
      "prototype is complete end-to-end with deterministic dummy specialists in place of real models; a first thin LoRA adapter has been trained and benchmarked but is not yet wired into the backend",
    techStack: ["FastAPI", "React", "LoRA", "Docker"],
    repoUrl: "https://github.com/Macbeth1501/SatQuery",
  },
  {
    slug: "vera",
    title: "VERA — Verified Escrow & Relief Architecture",
    status: "in_progress",
    dateRange: "2026",
    problem:
      "Disaster-relief and crowdfunding platforms ask donors to trust an opaque intermediary for both fund custody and proof that milestones were actually met.",
    approach:
      "Built a zero-budget, on-chain-auditable relief platform on the Polygon Amoy testnet where the public ledger is the source of truth and the web app is only a view onto it: donor signup with an auto-generated wallet, mock organiser KYB mirrored on-chain, milestone-gated campaigns, an on-chain indexer with a reconciliation dashboard, gas-sponsored donations, and M-of-N attestor and council approval flows for large payouts.",
    result: "45/45 Foundry tests passing (10,000-run fuzzing) with zero Slither findings on the milestone contract, though live end-to-end verification is incomplete after the sponsor wallet ran out of test funds — proof-of-concept only, no real funds involved",
    techStack: ["Solidity", "Foundry", "TypeScript", "Polygon"],
    repoUrl: "https://github.com/Macbeth1501/VERA-Verified-Excrow-Releif-Architecture",
  },
  {
    slug: "solar-panel-detection",
    title: "Automated Solar Panel Detection",
    status: "archived",
    dateRange: "",
    problem:
      "Tracking solar panel installations from satellite imagery at scale — for energy monitoring, environmental assessment, or post-disaster damage checks — needs a detector that can pick panels out reliably from other rooftop clutter.",
    approach:
      "Manually annotated a set of satellite images (converted from TIFF in QGIS) and trained a custom YOLOv8 instance-segmentation model, with a Tkinter GUI for running detection.",
    result: "mAP 86.7%, precision 89.8%, recall 79% after 300 epochs",
    techStack: ["YOLOv8", "QGIS", "Python", "Tkinter"],
    repoUrl: "https://github.com/Macbeth1501/solar-panel-detection-v1",
    teamNote: "With Sayali Bambal.",
  },
  {
    slug: "fraudguard",
    title: "FraudGuard — Speaker Identification for Voice-Fraud Detection",
    status: "live",
    dateRange: "",
    problem:
      "Voice-based fraud is hard to catch without a way to verify whether a caller's voice actually matches a known speaker.",
    approach:
      "Extracted MFCC features and trained a CNN classifier (Adam, cross-entropy, 15 epochs) across 8 speakers — 5 from a public Kaggle set and 3 recorded directly, 1,500 recordings per speaker — with noise and speed augmentation to improve robustness.",
    result: "76.8% accuracy, reported to outperform GMM and SVM baselines",
    techStack: ["CNN", "Librosa", "scikit-learn"],
    liveUrl: "https://fraud-gaurd-alpha.vercel.app",
    repoUrl: "https://github.com/Macbeth1501/fraud-gaurd",
    teamNote: "With Sayali Bambal. Built in second year.",
  },
  {
    slug: "alzheimers-cot",
    title: "Alzheimer's Disease Detection — Reasoning-Based CoT LLM and FFNN",
    status: "archived",
    dateRange: "May–Aug 2025",
    problem:
      "It's unclear whether a large language model reasoning over transcripts can match a purpose-built classifier at detecting Alzheimer's markers in speech, or where each approach's strengths lie.",
    approach:
      "Compared an engineered-feature feed-forward network against a Llama-3.2-1B-Instruct model fine-tuned with LoRA and chain-of-thought prompting, both evaluated on ADReSS 2020 Cookie Theft transcripts using Whisper-derived pauses, discourse cues, and word counts, with a Flask web UI and a Tkinter desktop app for demoing either model.",
    techStack: ["PyTorch", "LoRA", "Whisper", "Flask"],
    teamNote: "Team of 2, mentored by Dr. Anil Kumar Vuppala.",
  },
  {
    slug: "core-rl",
    title: "CORE-RL — Cloud Optimization & Resource Efficiency",
    status: "live",
    dateRange: "",
    problem:
      "Reinforcement-learning agents for cloud cost optimization are hard to evaluate consistently, since most FinOps environments aren't standardized or reproducible across runs.",
    approach:
      "Built an OpenEnv-standard RL benchmark that procedurally generates a new cloud topology on every reset, across three task tiers (zombie-resource hunting, fleet resizing, budget-breach response), with a dense reward that penalizes stopping critical resources and rewards genuine spend cuts. A FastAPI server and Docker packaging make it runnable as a shared benchmark; a Qwen-2.5-72B-Instruct few-shot agent serves as the baseline.",
    techStack: ["Python", "FastAPI", "Docker", "Qwen"],
    liveUrl: "https://huggingface.co/spaces/Macbeth1501/core-rl",
    repoUrl: "https://github.com/Macbeth1501/CORE-RL",
    teamNote: "With Sayali Bambal.",
  },
  {
    slug: "astronix",
    title: "Astronix — Offline Voice-to-Voice RAG Pipeline",
    status: "archived",
    dateRange: "",
    problem:
      "Voice assistants that depend on cloud APIs don't work offline and raise privacy concerns for on-device use, but running a full voice pipeline locally is constrained by limited consumer GPU memory.",
    approach:
      "Built a fully offline voice assistant that runs on 4GB of VRAM: Faster-Whisper for CPU speech-to-text, a ChromaDB + FastEmbed retrieval layer on CPU, a Llama 3.2 1B model served locally via Ollama on the GPU, and pyttsx3 for text-to-speech — with a push-to-talk loop and a social-filter layer that skips retrieval for plain greetings.",
    techStack: ["Faster-Whisper", "ChromaDB", "Ollama", "Llama 3.2"],
    repoUrl: "https://github.com/Macbeth1501/Astronix-Local-RAG-Pipeline",
    teamNote: "Built for Technex 2025.",
  },
  {
    slug: "multimodal-dementia",
    title: "Multimodal Dementia Detection",
    status: "archived",
    dateRange: "",
    problem:
      "Single-signal dementia-detection models (acoustic-only or text-only) leave useful information on the table; fusing acoustic and linguistic signal could improve on either alone.",
    approach:
      "Fused affective acoustic features, content-based linguistic features, and BERT semantic embeddings, evaluated with SVM and random-forest classifiers, with cross-lingual validation planned as a next step.",
    techStack: ["BERT", "scikit-learn", "Librosa"],
    repoUrl: "https://github.com/Macbeth1501/multimodel_dementia_detection",
  },
  {
    slug: "scholarwatch",
    title: "ScholarWatch — AI Student Surveillance for Exam Integrity",
    status: "archived",
    dateRange: "",
    problem:
      "Manually invigilating exams for phone use, identity mismatches, or suspicious posture doesn't scale across large cohorts.",
    approach:
      "Built three computer-vision models — smartphone detection, face recognition, and posture/gesture recognition — feeding real-time alerts to an invigilator dashboard.",
    techStack: ["OpenCV", "YOLO", "face recognition"],
    repoUrl: "https://github.com/Macbeth1501/Student-Surveillance",
  },
  {
    slug: "project-sentinel",
    title: "Project SENTINEL — Hospital Critical-Asset Maintenance & Escalation",
    status: "archived",
    dateRange: "",
    problem:
      "Hospitals can lose critical minutes when life-critical equipment (like ICU ventilators) breaches its maintenance SLA and nobody escalates it in time.",
    approach:
      "Built a stateless, compute-on-read escalation engine with an immutable audit log and life-critical SLA routing (e.g. a 5-minute SLA for ICU ventilators), plus a breach-first priority queue and a time-travel SLA-breach simulator for hackathon judges — built in a 3-hour build window with a team of 6.",
    result: "1st place among 43 finalists (400+ registered) at the TruliaCare India hackathon; top 8 shortlisted for final interview",
    techStack: ["FastAPI", "PostgreSQL", "React", "Tailwind"],
    teamNote: "Team of 6.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    group: "Languages",
    skills: ["Python", "C++", "C", "Java", "SQL", "JavaScript/TypeScript", "Solidity"],
  },
  {
    group: "ML/DL",
    skills: [
      "Deep learning (CNN, RNN, FFNN)",
      "Computer vision",
      "Transfer learning",
      "Fine-tuning (LoRA/PEFT)",
      "Uncertainty quantification (Monte Carlo Dropout)",
      "Reinforcement learning",
      "PCA",
      "LightGBM",
      "SVM",
    ],
  },
  {
    group: "LLM/GenAI",
    skills: [
      "Llama (3.x)",
      "BERT",
      "Whisper",
      "Chain-of-Thought",
      "RAG",
      "FAISS",
      "ChromaDB",
      "Sentence transformers",
      "LangChain",
      "Groq API",
      "Ollama",
      "Agentic orchestration",
    ],
  },
  {
    group: "Geospatial",
    skills: ["QGIS", "GeoPandas", "OSMnx", "NetworkX", "PostGIS", "Google Earth Engine", "Sentinel-1/2", "Landsat"],
  },
  {
    group: "Web/Backend",
    skills: ["FastAPI", "Flask", "Next.js", "React/Vite", "Tailwind", "Leaflet", "PostgreSQL", "SQLite", "Docker"],
  },
  {
    group: "Blockchain",
    skills: ["Solidity", "Foundry", "Slither", "Polygon Amoy testnet"],
  },
];

export const achievements: Achievement[] = [
  {
    title: "1st Place — TruliaCare India Hackathon",
    result: "1st of 43 finalists",
    context: "400+ registered teams; top 8 shortlisted for the final interview round.",
    date: "2026",
  },
  {
    title: "Top 30 National Finalist — ISRO Bharatiya Antariksh Hackathon (BAH)",
    result: "Top 30 of 8,744 teams",
    context: "Top 3 within its own problem statement (GLOF detection and time-series analysis); 30-hour finale at NRSC Hyderabad.",
    date: "2025",
  },
  {
    title: "1st Place — ISRO Geospatial AI Challenge",
    result: "1st of 90+ teams",
    context: "Hosted at VNIT Nagpur.",
    date: "2024",
  },
  {
    title: "Published author — IJIRCCE",
    result: "DOI 10.15680/IJIRCCE.2026.1404135",
    context:
      "\"A Literature Survey on Multimodal Route Optimization and Real-Time Traffic Prediction for GPS Tracking Systems,\" with Kashish Joseph, Shreya Doye, Suraj Dhere and two others.",
    date: "Apr 2026",
  },
  {
    title: "1st Runner-up — Coding Relay Challenge",
    result: "1st runner-up",
    context: "",
    date: "2024",
  },
  {
    title: "National Finalist — IIT Bombay Techfest CodeDecode",
    result: "National finalist",
    context: "Advanced via the wildcard round.",
    date: "2024",
  },
  {
    title: "National Finalist — IIT Bombay Techfest Cozmoclench",
    result: "Top 5 in zonal round",
    context: "",
    date: "2023",
  },
];

export const footerLinks: { label: string; url: string }[] = [
  { label: "Email", url: "mailto:rochansawasthi@gmail.com" },
  { label: "GitHub", url: "https://github.com/Macbeth1501" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rochan-awasthi-393242302/" },
  { label: "LeetCode", url: "https://leetcode.com/u/MACBETH1501/" },
];
