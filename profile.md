# Rochan Shrish Awasthi — Master Profile

> **Status: FINAL · last updated 20 Sep 2026** (LeetCode stats, DSA/SQL foundations, CAT 2026 and placement targets added). Items marked ⚠️ are still unresolved. Compiled from: `Rochan_pod_ai_resume_v2.pdf`, `Rochan_Awasthi_V3.pdf`, GitHub (`Macbeth1501`, all 13 repos read), pasted LinkedIn text, and a LeetCode screenshot.
> Items marked **⚠️** conflict across sources or could not be confirmed. Section 14 lists everything to check.
> Compiled: 20 Sep 2026.

---

## 1. Identity & Contact

| Field | Value |
|---|---|
| Full name | Rochan Shrish Awasthi |
| Pronouns | He/Him (LinkedIn) |
| Location | Nagpur, Maharashtra, India — 440030 |
| Phone | +91 98237 43971 |
| Email (college) | rochanawasthi.23@stvincentngp.edu.in |
| Email (personal) | rochansawasthi@gmail.com |
| LinkedIn | https://www.linkedin.com/in/rochan-awasthi-393242302/ |
| GitHub | https://github.com/Macbeth1501 |
| LeetCode | https://leetcode.com/u/MACBETH1501/ |
| Languages | English, Hindi |

**LinkedIn headline:** AI Intern at CS TECH AI | Ex-Research Intern at @IIITH | Grand Finalist @ISRO BAH'25 | Speech Processing | CV | DNN | AI ML

---

## 2. Education

| Institution | Programme | Period | Result |
|---|---|---|---|
| St. Vincent Pallotti College of Engineering and Technology, Nagpur | B.Tech, Computer Engineering | Aug 2023 – May 2027 | CGPA 9.01 / 10 (v2); SGPA 9.52 in 6th semester (V3) |
| Centre Point School, Katol Road | Class XII, CBSE | 2023 | 81% |
| Centre Point School, Katol Road | Class X, CBSE | 2021 | 89.80% |

---

## 3. Professional Summary (reconciled)

Computer Engineering student (CGPA 9.01) specialising in applied AI: speech processing, LLMs, computer vision, and geospatial ML. Research intern at IIIT Hyderabad's LTRC Speech Lab (early Alzheimer's detection from speech) and AI intern at CS Tech AI (tender-evaluation RAG system). Winner of the ISRO Geospatial AI Challenge 2024, Top-30 national finalist (Top 3 in problem statement) at ISRO's Bharatiya Antariksh Hackathon 2025, and 1st place at the TruliaCare India hackathon. Published author (IJIRCCE 2026). Builds end-to-end systems: ML pipelines, FastAPI/React services, GIS routing, and smart-contract prototypes. Leadership: Technical Head of Engineering India Club (2,300+ participant state hackathon), Internship Coordinator at the Career Development Cell, Coordinator of Ascend Club.

**Career direction (v2):** Preparing for CAT (MBA) to move toward tech leadership; upcoming research summer schools at IIIT Hyderabad. ⚠️ *Timing/status not stated — see §14.*

---

## 4. Experience

### 4.1 AI Intern — CS Tech AI (Ceinsys Tech Limited), MEG-NXT Department, Nagpur
- **Period:** 11 Jun 2026 – 11 Jul 2026 (v2); Jun–Jul 2026, on-site (LinkedIn)
- **Mentors:** Chirag Deshmukh, Prasad Nirmal (LinkedIn). Reference: Prasad Nirmal, prasad.nirmal@cstech.ai, +91-9370187334 (v2)
- **Project: AI-Driven Tender Tracking & Evaluation Engine** — production-grade FastAPI microservice that ingests, scores and risk-audits unstructured tender documents.
  - Asynchronous FastAPI gateway; headless Playwright scraping and document compilation isolated in Starlette thread pools so worker loops never block.
  - Four-stage evaluation pipeline: (1) fast-fail regex prefilter with 900+ technical keywords; (2) configurable chunking engine (recursive character-based vs. word-based flat parsing, env-driven, overlap preserved); (3) local FAISS index with `all-MiniLM-L6-v2` embeddings, exact cosine similarity via L2-normalised vectors, benchmarked against corporate ground truth; (4) AI risk-audit layer using Llama 3.3 (70B) via Groq API.
  - Sliding-window deque rate limiter to handle API limits; Pydantic schemas to enforce structured LLM output.
  - Excel ledger logging confidence scores, AI reasoning and routing class (ACCEPTED / REVIEW / REJECTED); custom serialiser converting Indian-format price strings to floats; returns a prioritised, price-sorted JSON payload.
  - **V3 claim:** 1,000+ tenders processed at 7–30 s per tender with zero failures.
- **Skills:** LLMs, RAG, Python, FastAPI, FAISS, Playwright, Sentence Transformers, NLP, async programming, Pandas, Pydantic, web scraping, API integration, regex, document parsing, data validation
- ⚠️ *LinkedIn says the internship focused on Geospatial AI and Remote Sensing; the resume describes the tender engine. See §14.*

### 4.2 Research Intern (AI / Speech Processing) — IIIT Hyderabad, LTRC Speech Lab
- **Period:** 15 May – 15 Aug 2025 (v2); Jun–Aug 2025 (LinkedIn) ⚠️
- **Mentor:** Dr. Anil Kumar Vuppala (project mentor per v2)
- **Goal:** Non-invasive, early Alzheimer's detection from speech.
  - Literature review of SOTA methods; identified dataset bias ("Clever Hans effect" in the Pitt corpus).
  - Feature-engineering pipeline using OpenAI Whisper transcription; extracted silence counts, cue counts, word counts.
  - Custom **Feed-Forward Neural Network: 85% validation accuracy** — more reliable than an experimental LoRA fine-tune of Llama-3.2-1B-Instruct.
  - Implemented/extended a **Multilingual Whisper Ensemble** (INTERSPEECH 2024 TAUKADIAL framework): 1280-d `whisper-large-v3` embeddings, SVC + Logistic Regression + NN ensemble; reproduced **81.83% UAR** for MCI detection (English + Chinese).
  - Proposed a multimodal fusion framework (affective acoustic + linguistic syntax + semantic LLM embeddings via gated multi-head attention).
- **Skills:** Deep learning, PyTorch, Whisper, LoRA, Scikit-learn, Hugging Face, multilingual modelling, SVM, logistic regression, feature engineering, speech analytics, NLP

---

## 5. Projects

Repos verified by reading code/READMEs where noted. Repo status is stated candidly.

### 5.1 SatQuery AI — ISRO SIH 2026 (PS SIH26167) *(not on either resume)*
- **Repo:** github.com/Macbeth1501/SatQuery (~11,300 LOC, updated 20 Sep 2026)
- **What:** Agentic vision-language assistant for multimodal remote-sensing imagery (optical/SAR, single-image and bi-temporal), where a query planner routes to specialist models and returns an evidence-grounded answer with execution trace and confidence.
- **Built:** FastAPI backend (6 endpoints), 7-step orchestration pipeline, 8 task types, compatibility validator (7 rejection codes), verifier node, confidence scorer, JSON/HTML/PDF report export, SQLite session persistence, React frontend (3 routes, 15 components), Docker/Compose/CI, offline-only guarantee enforced by tests.
- **Tests:** 140 pytest + 58 Vitest, all passing (per progress log).
- **ML side:** LoRA training/eval scripts written; a first thin adapter (300 steps, ~3 h 38 min, local) trained and scored on a bench sample; **not wired into the backend**.
- **Honest status:** Prototype complete with **deterministic dummy specialists**; no real model integrated yet.
- **Data/benchmarks targeted:** BigEarthNet.txt, VRSBench, RSVQA, CDVQA.

### 5.2 VERA — Verified Escrow & Relief Architecture *(not on either resume)*
- **Repo:** github.com/Macbeth1501/VERA-Verified-Excrow-Releif-Architecture (~6,000 LOC Solidity/TS, updated 19 Sep 2026)
- **What:** Zero-budget, on-chain-auditable crowdfunding/disaster-relief proof of concept on Polygon Amoy testnet. Public ledger is source of truth; web app is a view onto it.
- **Contracts:** `MockINR`, `CampaignVault`, `CampaignFactory`, `MilestoneManager` (deployed on Amoy).
- **Flows built:** donor signup with auto wallet; mock organiser KYB with admin approval mirrored on-chain; campaign creation with milestones (validated in browser, API and contract); on-chain indexer; public ledger dashboard with reconciliation and CSV/JSON export; gas-sponsored donation flow; attestor flow (M-of-N evidence attestation); council M-of-N approval for large payouts (>100 mINR needs 3 approvals).
- **Quality:** `forge test` 45/45 (fuzz 10,000 runs); web tests 215/215; Slither: 0 findings on `MilestoneManager`.
- **Honest status:** Steps 11–12 built but live verification incomplete (sponsor wallet ran out of POL); PoC, no real funds.

### 5.3 Hybrid Glacial Lake Outburst Flood (GLOF) Detection — BAH 2025
- **Repo:** github.com/Macbeth1501/Glacial_Lake_Detection_BAH-2025 (team lead: Rochan; teammates Sayali Bambal, Atharva Bhede, Uday Bhoyar)
- **Period:** Jul–Aug 2025 (v2); grand finale was a 30-hour hackathon at NRSC Hyderabad
- **What:** Hybrid GLNet + Attention U-Net (`GlacialLake_HybridNet`, 32.1M params, 8-channel input incl. DEM/slope/aspect/NDWI) with boundary-aware loss (Dice + BCE + morphological-gradient term); **Monte Carlo Dropout** pixel-level uncertainty (30 passes, wired into the FastAPI service); GlacierWatch Next.js 15 dashboard (Leaflet, time-series, risk alerts, reports).
- **Data:** Sentinel-1/2, Landsat 8/9, DEM; 22,508-lake Himalayan inventory (filtered from the 31,698-lake HMA inventory); measured 2016-17→2022 area change on 18,603 matched lakes (median +1.17%, 58.4% grew); GLOF risk index that renormalises when dam class is unknown.
- **Recorded metrics:** Best logged validation Dice **0.538** (final 0.527) for the hybrid; baseline U-Net 0.149 Dice / 0.119 IoU.
- **Repo's own caveat:** Hybrid model is "not currently usable" on real LISS-3 imagery; spectral indices (NDWI/MNDWI/AWEI) are the default detection method (recovered 9 lakes / 131 ha on Zanskar test scene).
- **Recognition:** Top 30 of 8,744 teams; Top 3 in own problem statement (LinkedIn).

### 5.4 V-NEURON — Vidarbha Network for Evolutionary Urban Routing and Omnimodal Navigation
- **Repo:** github.com/Macbeth1501/V-NEURON · **Live:** https://suraj.shinelikesun.workers.dev/vneuron
- **Period:** 1 Feb – 31 Jul 2026 · Team of 4 (Rochan, Kashish Joseph, Suraj Dhere, Shreya Doye); framed as Final-Year Project at SVPCET.
- **What:** Unified weighted graph of Nagpur's road network, walking paths, Orange & Aqua metro lines and bus stops; Dijkstra on NetworkX; Off-Peak vs Peak-Hour congestion calibration; boarding/transfer penalties.
- **Scale:** ~110,000+ nodes, ~250,000+ edges; 37 metro stations connected; 80+ bus stops indexed; route computation <500 ms typical.
- **Pipeline:** 15-step automated GIS pipeline (OSMnx download → UTM projection → transit snapping → rail logic → calibration → audit), optional PostgreSQL/PostGIS.
- **Web app:** Flask + Leaflet, live vehicle simulation, fuzzy geocoding with Nominatim fallback, AI assistant chatbot.
- **Note:** Main app's chatbot is **rule-based NLP**; the Llama 3.1 8B (Groq) agent exists only in the alternate FastAPI + React architecture.
- **Supporting publication:** see §6.

### 5.5 EEG Mental Wellbeing Platform
- **Repo:** github.com/Macbeth1501/EEG-Mental-Wellbeing · **Live:** https://eeg-project-459m.onrender.com/
- **Period:** 1 Feb – 31 Jul 2026 · Mentor: Dr. Vijay Wadhai · Team of 3
- **What:** AI-assisted mental-health triage combining EEG biomarkers with a custom 65-question **IMHMA** instrument (unifies PHQ-9, GAD-7, ASRS v1.1, DASS-21, PSS-10).
- **ML:** LightGBM binary screener; PCA compresses **1,026** EEG coherence features to **15** components (blinded to prevent leakage); grouped-median imputation; frontal theta/beta and theta/alpha features.
- **AI coach:** Llama 3.3 70B via Groq + LangChain, with ethical guardrails routing acute distress to professional counsellor references.
- **Stack:** React/Vite frontend, Flask backend.

### 5.6 CORE-RL — Cloud Optimization & Resource Efficiency *(not on either resume)*
- **Repo:** github.com/Macbeth1501/CORE-RL · Hugging Face Space (`Macbeth1501/core-rl`) · Co-author: Sayali Bambal
- **What:** OpenEnv-standard RL benchmark simulating a cloud-FinOps dashboard; agents must cut spend without stopping critical resources.
- **Design:** 3-tier tasks (zombie_hunter / fleet_resizer / budget_breach); procedurally generated topologies on each `/reset`; dense reward (+0.2 per 10% spend cut, −1.0 terminal penalty for stopping a critical resource, −0.1 per step); FastAPI server, Docker; baseline agent uses Qwen-2.5-72B-Instruct with few-shot prompting.

### 5.7 Astronix — Offline Voice-to-Voice RAG Pipeline *(not on either resume)*
- **Repo:** github.com/Macbeth1501/Astronix-Local-RAG-Pipeline · Built for Technex 2025
- **What:** Fully offline voice assistant on 4 GB VRAM hardware (RTX 3050): Faster-Whisper `base.en` (CPU, int8) → ChromaDB + FastEmbed (CPU) → Llama 3.2 1B via Ollama (GPU) → pyttsx3 TTS. Push-to-talk loop and a social-filter layer that skips retrieval for greetings.

### 5.8 Alzheimer's Disease Detection — Reasoning-Based CoT LLM and FFNN
- **Period:** 15 May – 15 Aug 2025 · Mentor: Dr. Anil Kumar Vuppala · Team of 2
- **Repo (per v2):** github.com/Macbeth1501/AD_Detection_FFNN_LLM_CoT ⚠️ *(not found among the 13 public repos — see §14)*
- **What:** Compares an engineered-feature FFNN against Llama-3.2-1B-Instruct fine-tuned with LoRA + Chain-of-Thought, on ADReSS 2020 (Cookie Theft) transcripts; Whisper-derived pauses/discourse cues/word counts; Flask UI and Tkinter desktop app.

### 5.9 Multimodal Dementia Detection *(research prototype)*
- **Repo:** github.com/Macbeth1501/multimodel_dementia_detection (notebooks + proposal document; no README)
- **What:** Fusion of affective acoustic, content-based linguistic, and BERT semantic features with SVM / Random Forest; planned cross-lingual validation.

### 5.10 Automated Solar Panel Detection
- **Repo:** github.com/Macbeth1501/solar-panel-detection-v1 (5 stars) · Co-author: Sayali Bambal
- **What:** Custom-trained **YOLOv8 instance segmentation** on satellite imagery with a Tkinter GUI; imagery from Bhoonidhi and other sources, TIFF→converted in QGIS, manually annotated.
- **Metrics (README):** mAP 86.7%, Precision 89.8%, Recall 79% after 300 epochs.
- **Dataset size:** README says **1,187 images**; V3 resume says 1,600+ ⚠️.
- **Use cases:** energy monitoring, environmental assessment, post-disaster damage assessment.

### 5.11 FraudGuard — Speaker Identification for Voice-Fraud Detection
- **Repo:** github.com/Macbeth1501/fraud-gaurd · **Live:** https://fraud-gaurd-alpha.vercel.app (README also lists a `-gamma` URL) · Co-author: Sayali Bambal
- **What:** MFCC + CNN speaker identification (Adam, lr 0.001, cross-entropy, 15 epochs, batch 32); 8 speakers (5 Kaggle + 3 recorded); 1,500 recordings/speaker; noise/speed augmentation.
- **Result:** 76.8% accuracy; reported to outperform GMM and SVM baselines. Built in 2nd year.

### 5.12 ScholarWatch — AI Student Surveillance (Exam Integrity)
- **Repo:** github.com/Macbeth1501/Student-Surveillance (1 star; updated May 2025)
- **What:** Three CV models — smartphone detection, face recognition, posture/gesture recognition — with real-time invigilator alerts; includes face-recognition report.

### 5.13 Mood-Melody — Speech Emotion Recognition & Music Recommendation
- **Repo:** fork of SayaiB24/Mood-Melody (JavaScript, 2 stars) · LinkedIn claims **90%+ accuracy**
- **Note:** Fork of a teammate's repo — confirm your contribution before listing.

### 5.14 Project SENTINEL — Hospital Critical-Asset Maintenance & Escalation (TruliaCare hackathon)
- **Built in 180 minutes** (team of 6). Life-critical SLA routing (e.g. 5-minute SLA for ICU ventilators), stateless compute-on-read escalation engine with immutable audit log, "time-travel" SLA-breach simulation for judges, breach-first priority queues.
- **Stack:** FastAPI, PostgreSQL, React + Tailwind.
- **Result:** 1st place among 43 finalists (400+ registered); Top 8 shortlisted for final interview.
- **Repo:** none found on GitHub.

### 5.15 Smaller / Supporting Repos
- **AI-ML-Algorithms-From-Scratch:** Hebbian and Perceptron learning rules in pure Python; README lists a larger planned roadmap (early stage).
- **Portfolio-Website:** repo exists but is empty (only `.gitignore`).

---

## 6. Publication

**A Literature Survey on Multimodal Route Optimization and Real-Time Traffic Prediction for GPS Tracking Systems**
- *International Journal of Innovative Research in Computer and Communication Engineering (IJIRCCE)*, published April 2026 (v2: 04 Apr 2026)
- **DOI:** 10.15680/IJIRCCE.2026.1404135
- **Authors:** Rochan Awasthi, Kashish Joseph, Shreya Doye, Suraj Dhere + 2 more (6 authors per v2). Collaboration with **Ashish Sharma**, Scientist, ISRO RRSC-C; guidance from Dr. Reema Roychaudhary (SVPCET).
- **Covers:** OMF-MT multimodal optimisation, ATEN adaptive topology for rail transit, CNN-LSTM traffic forecasting, Access-Node Routing (ANR), Connection Scan Algorithm (CSA), Dijkstra/ALT, deep RL, OSM & GTFS integration. Foundation for V-NEURON.

---

## 7. Achievements & Awards

| Year | Achievement | Detail |
|---|---|---|
| 2026 | **1st Place — TruliaCare India Hackathon** | 400+ registered → 43 in the 3-hour round; Top 8 in final interview |
| 2025 | **Top 30 National Finalist — ISRO Bharatiya Antariksh Hackathon (BAH)** | Out of 8,744 teams; **Top 3 in problem statement** (GLOF detection & time-series); 30-hour finale at NRSC Hyderabad |
| 2025 | TCS iON NQT-IT | 91.19% overall; Programming ⚠️ 97.59 / 97.79; Verbal 100; Numerical 78.78; Adv. Quant & Reasoning 91.81; Reasoning 87.77 |
| 2024 | **1st Place — ISRO Geospatial AI Challenge**, VNIT Nagpur | Out of 90+ teams |
| 2024 | 1st Runner-up — Coding Relay Challenge | |
| 2024 | National Finalist — IIT Bombay Techfest **CodeDecode** | Advanced via wildcard round |
| 2023 | National Finalist — IIT Bombay Techfest **Cozmoclench** | Top 5 in Zonal round |

---

## 8. Leadership & Positions of Responsibility

| Role | Organisation | Period | Highlights |
|---|---|---|---|
| Technical Head | Engineering India Club | Aug 2024 – Sep 2025 | Led technical wing for **Abhyudhya 24.0** (state-level, ISRO × VIBHA); hackathon with **2,300+ participants**; infrastructure, judging criteria, execution |
| Internship Coordinator | Career Development Cell (CDC) | Feb 2025 – Dec 2025 | Internship drives, corporate recruitment, training sessions and hiring exams; measurable rise in placements |
| Lead & Coordinator | Ascend Club (Computer Engineering dept. coding club) | Aug 2025 – May 2026 | Workshops, expert sessions, hackathons on C++/Python/DSA, AI/ML, cybersecurity, game dev, GenAI/Agentic AI |
| Volunteer | Unnat Bharat Abhiyan | — | Accessibility work for differently-abled communities (LinkedIn About) ⚠️ |
| Head | College events | — | Head for various technical and non-technical events; dance (v2) |

---

## 9. Technical Skills

- **Languages:** Python, C++, C, Java, SQL, JavaScript/TypeScript, Solidity
- **AI/ML:** Deep learning (CNN, RNN, FFNN), computer vision, NLP, speech processing, transfer learning, fine-tuning (LoRA/PEFT), feature engineering, uncertainty quantification (Monte Carlo Dropout), reinforcement-learning environments, PCA, LightGBM, SVM
- **GenAI / LLM:** Llama (3.x), BERT, Whisper, Chain-of-Thought, RAG, FAISS, ChromaDB, sentence-transformers, embeddings, prompt engineering, LangChain, Groq API, Ollama, agentic orchestration
- **Frameworks/Libraries:** PyTorch, TensorFlow/Keras, Hugging Face, Scikit-learn, OpenCV, YOLO (v8), Librosa, NumPy, Pandas, Matplotlib
- **Geospatial:** QGIS, GeoPandas, OSMnx, NetworkX, PostGIS, Google Earth Engine, Sentinel-1/2, Landsat, GeoTIFF processing
- **Web/Backend:** FastAPI, Flask, Next.js, React/Vite, Tailwind, Leaflet, PostgreSQL, SQLite, Docker/Compose, CI workflows
- **Blockchain:** Solidity, Foundry (fuzz testing), Slither, Polygon Amoy testnet
- **Algorithms:** strong DSA foundations, graph theory (Dijkstra, shortest-path), competitive programming
- **Databases:** strong SQL and DBMS foundations; PostgreSQL/PostGIS, SQLite
- **Tools/Platforms:** Git/GitHub, Playwright, Hugging Face Spaces, Render, Vercel

### Coding practice: LeetCode (`MACBETH1501`, snapshot Sep 2026)

| Metric | Value |
|---|---|
| Solved | 246 (Easy 182 · **Medium 60** · **Hard 4**) |
| Contest rating | 1,352 (7 contests, top 92.91%; trending down since Jan 2026) |
| Activity | 404 submissions in the past year · 159 active days · max streak 21 days |
| Badges | 5, incl. 100 Days Badge 2026 |

*Presentation note: show solved count and badge on the resume; leave the contest rating off until it improves. Medium/Hard count is the weak spot (see the placement plan).*

---

## 10. Certifications & Assessments

- TCS iON NQT-IT — 91.19 / 100 (subject scores in §7). ⚠️ *v2 lists date "02 Dec, 2027", probably a validity date.*
- Internship certificates: IIITH (2), CS Tech AI (1) — linked on V3.
- Certificates linked on V3: ISRO Geospatial AI Challenge, Coding Relay Challenge, Cozmoclench.

---

## 11. Extra-curricular & Interests

- Dance · Bike rides · Music · Casio (keyboard) · Books · Avid reader of research papers

---

## 12. Career Goals & Plans

**Placement target (2026-27 season)**
- **Main focus:** AI roles: LLM engineering, RAG, geospatial/remote-sensing AI, applied ML (about **70%** of applications).
- **Also open to:** SQL, data science and data analyst roles (about **30%** of applications).
- **Success definition:** at least one AI-related offer by 31 Jan 2027, with a data-role offer as the floor.
- **Detailed roadmap:** `Placement_Target_Achievement_Plan.md` (phases, DSA/SQL targets, repo repairs, interview prep).

**MBA route**
- Preparing for **CAT 2026** (exam **Sunday, 29 Nov 2026**, per the published CAT notification; result reported around 20 Jan 2027, confirm on iimcat.ac.in). Already familiar with the CAT subjects.
- Aim: move toward tech leadership after gaining engineering experience. Placement offer takes priority; CAT is the second track.

**Other plans**
- Upcoming research summer schools at IIIT Hyderabad (v2). ⚠️ *Dates and status not confirmed.*

---

## 13. Collaborators (recurring)

- **Sayali Bambal** — teammate on BAH, FraudGuard, solar panels, CORE-RL, TruliaCare
- **Atharva Bhede, Uday Bhoyar** — BAH 2025 teammates
- **Kashish Joseph, Suraj Dhere, Shreya Doye** — V-NEURON and paper co-authors
- **Mentors:** Dr. Anil Kumar Vuppala (IIIT-H), Dr. Vijay Wadhai (EEG project), Dr. Reema Roychaudhary (SVPCET), Ashish Sharma (ISRO RRSC-C), Chirag Deshmukh & Prasad Nirmal (CS Tech AI)

---

## 14. ⚠️ To Verify Before Saving

**Conflicts between sources**
1. **IIIT-H dates:** 15 May–15 Aug 2025 (v2) vs Jun–Aug 2025 (LinkedIn) vs May–Aug (V3).
2. **IIIT-H description:** LinkedIn describes generic GPT/BERT/RAG/intent-detection work; resume/repo describe Whisper + FFNN + LoRA on Llama-3.2-1B for Alzheimer's. Which should be the canonical account?
3. **CS Tech AI focus:** LinkedIn post says Geospatial AI & Remote Sensing; resume says tender-evaluation RAG engine. Both, or one?
4. **TCS iON Programming score:** 97.59 vs 97.79.
5. **Solar panel dataset size:** 1,187 (README) vs 1,600+ (V3). Does 1,600+ include augmentation?
6. **CGPA vs SGPA:** v2 says CGPA 9.01; V3 says SGPA 9.52 (6th sem). Confirm both are current.
7. **FraudGuard live URL:** `-alpha` (repo homepage) vs `-gamma` (README).
8. **Ascend Club employer:** LinkedIn lists "Zenith Forum · Full-time" — likely a mislabel.

**Claims to soften or confirm**
9. **Glacial model:** best logged Dice 0.538 and the repo states the hybrid model isn't usable on real LISS-3 data. Resume wording ("high-precision", "reliable all-weather outputs") overstates.
10. **CS Tech AI throughput** (1,000+ tenders, 7–30 s, zero failures): confirm figure and whether it was production or test data.
11. **SatQuery:** describe as orchestration framework with dummy specialists and an early LoRA adapter, not a working VLM. Agree?
12. **V-NEURON chatbot:** rule-based in main app; LLM only in alternate branch. Which do you want to claim?
13. **Mood-Melody 90%+ accuracy:** it's a fork; what did you build?
14. **`AD_Detection_FFNN_LLM_CoT` repo:** linked in v2 but not among your 13 public repos — private or renamed?

**Missing information**
15. CAT 2026 registration status and latest mock score; IIIT-H summer school details and dates; your college's placement calendar and semester exam dates.
16. Unnat Bharat Abhiyan role, dates, and what you did.
17. Number/level of TCS-style skills endorsements or recommendations on LinkedIn (not visible to me).
18. Which resume is "v4"? I never received it.
19. Do you want personal details (DOB, address, marital status) stored? I omitted them deliberately.
20. LeetCode: the profile is public and shows 4 Hard problems and a 1,352 contest rating. Decide what to show on the resume (solved count and badge are safer than the rating).

---

*End of profile. After you confirm or correct the ⚠️ items, tell me what to change and I'll finalise.*
