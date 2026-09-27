# Rochan Awasthi — Portfolio Website — Project Spec

Read this whole file before writing any code. This project uses the **Impeccable**
design skill for the actual visual execution (color, type, layout, motion, polish) —
see "Using Impeccable" at the end. This file defines the idea, the requirements, the
data model, and the real content; Impeccable handles turning the design direction
below into refined, non-generic UI.

---

## 1. The idea

A professional portfolio site for Rochan Shrish Awasthi — B.Tech Computer Engineering
student (SVPCET, Nagpur, Aug 2023–May 2027), focused on applied AI/ML: speech
processing, LLMs, computer vision, and geospatial AI. AI Intern at CS Tech AI;
Research Intern at IIIT Hyderabad's LTRC Speech Lab. Published author (IJIRCCE 2026).

**Purpose:** send to recruiters, link from resume/LinkedIn, use in job applications.
Primary audience: recruiters/hiring managers screening for applied AI/ML roles.
It needs to read as credible and substantive — this person has real measured results
(benchmark scores, live deployed projects, published research, competition
placements) — not a flashy template with no depth behind it.

**Design concept — "The Working Profile":** blends editorial-magazine polish
(confident, left-aligned, like a profile piece) with lab-notebook precision
(evidence-first: every project states problem → approach → measured result) and one
deliberate moment of motion on load. Left-aligned throughout, not centered. Not a
generic AI-template look — see the explicit avoid-list below.

## 2. Hard requirements

1. **Free to run indefinitely.** No paid hosting tier, no paid database, nothing that
   starts billing after a trial.
2. **Fully self-editable after launch, without code.** Add/edit/delete a project,
   experience entry, skill, or achievement; upload an image per entry; add a brand-new
   custom field to an entry type — all from a UI, no developer touching source code.
3. **Professional visual theme.** Vibrant but restrained — blue, amber, and green as
   accents on a warm light background. Not dark, not a generic SaaS-template look.
4. **Responsive and accessible**: mobile down to small phones, visible keyboard focus,
   sufficient contrast, `prefers-reduced-motion` respected, semantic HTML.

**Non-goals:** no blog/CMS beyond the four content sections + static Hero/About/
Contact; no user accounts/comments (single-owner site); no e-commerce; no
experimental/unstable frameworks.

**Success criteria:** looks intentional and professional on a phone; Rochan can add a
brand-new project with an image, a metric, and a live link entirely through the
site's own admin UI in under two minutes; the homepage animates once on entry, not on
every scroll trigger.

## 3. Visual direction — "The Working Profile"

This is the full design brief. Treat it as the source of truth for every visual
decision; feed it to Impeccable's commands (`/impeccable shape`, `/impeccable
colorize`, `/impeccable typeset`, `/impeccable layout`, `/impeccable animate`) rather
than letting those commands invent their own direction from scratch. Where a command's
own judgment would otherwise reach for a default (see avoid-list), this section wins.

### 3.1 Concept

An editorial-magazine profile crossed with a lab notebook: confident and
left-aligned like a well-designed profile piece in a serious publication, but
evidence-first like a research log — every project states its problem, its approach,
and its measured result plainly, because this person's actual work has real numbers
behind it (benchmark scores, competition placements, live deployments) and the design
should let those numbers carry weight rather than burying them under decoration. One
deliberate moment of motion on page load; everything else stays calm and static until
the visitor acts.

### 3.2 Color

```
--ink:        #152A43   /* primary text, headings */
--paper:      #FBF9F4   /* page background — warm off-white, not stark white */
--blue:       #2C5F8A   /* primary accent — links, section markers, primary buttons, nav */
--blue-deep:  #1D4568   /* hover/active state of blue */
--amber:      #E8A93B   /* sparing use only — one highlighted stat, a "current" badge, one CTA moment per view */
--green:      #3A8069   /* reserved for measured outcomes: result metrics, "live" status badges, success states */
--line:       #DCD6C7   /* hairline rule / divider — warm grey-beige, not pure grey */
--ink-muted:  #5B6B7D   /* secondary/supporting text */
```

**Restraint rule:** at any given scroll position or view, only one of amber or green
should be doing real visual work — never both at full strength in the same frame.
Blue is the everyday workhorse (nav, links, outlines, primary actions). Amber and
green are for small, specific, earned moments — never a section background wash, never
decorative.

### 3.3 Typography

- **Display/headlines:** Fraunces (serif, real character — warm, a little literary,
  not a default corporate sans). Use for the hero name, section headings, project
  titles. Weight ~500–600 for headings.
- **Body/UI text:** Inter. Paragraphs, nav, buttons, form labels. Weight 400, body
  line-height 1.6.
- **Technical/metadata accent:** JetBrains Mono, used sparingly and only for: dates,
  tech-stack tags, and measured metrics (`Dice 0.538`, `86.7 mAP`, `1,352 rating`).
  This signals "measured fact" without turning the whole page into a terminal
  aesthetic. Never use monospace for body prose or headings.

**Type scale** (desktop / mobile):
- Hero name: 56–72px / 36–40px, Fraunces, weight 600
- Section heading: 32–36px / 26–28px, Fraunces, weight 500
- Body: 17–18px / 16px, Inter, weight 400, line-height 1.6
- Small/meta: 13–14px, Inter or JetBrains Mono depending on context

Line length: keep body text under ~75 characters per line. Serif display text can run
a touch looser in tracking than the default; body Inter stays at normal tracking.

### 3.4 Layout

- **Left-aligned throughout.** Not centered, not a marketing-landing-page feel — an
  editorial-profile feel.
- Single-column primary reading flow. Generous vertical rhythm between sections —
  not cramped, not padded to the point of feeling empty.
- **Hero:** name set large in Fraunces at top-left. Directly under it, a one-line role
  descriptor in JetBrains Mono. Below that, a 2–3 sentence bio in Inter. Photo placed
  off to one side as a rectangular, slightly asymmetric crop — like an author photo in
  a magazine profile — never centered, never circular, never sitting on a gradient
  blob.
- **Snapshot strip:** a slim horizontal band directly under the hero showing a
  handful of key numbers (CGPA, repo count, LeetCode solved, papers published) set in
  JetBrains Mono — small and quiet, not oversized stat cards with icons.
- **Experience:** simple vertical list, one thin `--line` rule between entries. No
  decorative timeline graphic, no connecting dots/lines running down the page.
- **Projects:** full-width stacked entries, not a 3-column card grid. Each entry
  structured internally as **Problem → Approach → Result**, with the Result metric set
  in JetBrains Mono and highlighted in `--green` when it's a real measured outcome
  (leave unstyled/absent when no result exists — never invent one). A status badge
  (`--amber` "in progress" / `--green` "live" / muted "archived") replaces decorative
  numbering — the projects are not a sequence, so no 01/02/03 markers.
- **Skills:** grouped by domain with short plain-text section labels (Languages,
  ML/DL, LLM/GenAI, etc.) — not a loose cloud of randomly colored pill badges.
- **Achievements:** short plain list, result stated directly, monospace stat where
  relevant.
- **Footer:** plain text links (email, GitHub, LinkedIn, LeetCode) in Inter — not
  icon-only circular buttons.

### 3.5 Motion

- Exactly **one** deliberate entrance sequence, in the hero, on page load — name and
  photo settling into place together, roughly 300–500ms. Nothing else animates on a
  scroll trigger.
- Interaction-driven motion is welcome: hover states on links/buttons, an expand/
  collapse transition if a project card reveals more detail on click, a subtle
  confirmation transition when the admin UI saves a change.
- Respect `prefers-reduced-motion`: disable the hero entrance sequence entirely for
  users who have that OS/browser setting on.

### 3.6 Accessibility floor

- Visible keyboard focus rings on every interactive element (don't strip the default
  outline without providing a replacement).
- Body text on `--paper` must pass WCAG AA contrast; verify `--ink-muted` against
  `--paper` specifically, since it's the lowest-contrast pairing in this palette.
- All images carry alt text pulled from the entry's title/description.
- Semantic HTML throughout: real `<nav>`, `<section>`, proper `<h1>`–`<h3>`
  hierarchy — not an all-`<div>` structure.

### 3.7 Explicit avoid-list

Hand this to Impeccable directly — these are the generic AI-generated-design tells to
design away from, regardless of what any single command's default instinct is:

- A warm cream background paired with a terracotta/clay accent color.
- A near-black background with one bright neon accent ("AI startup dark mode").
- A SaaS card grid: identical rounded corners on everything, the same soft grey
  box-shadow under every card, gradient washes used as decoration.
- Tracked-out ALL-CAPS labels above every section.
- Meta strings joined with middle-dots; "WORD — fragment" labels built with a spaced
  em dash.
- An arrow appended to every button or link label ("Learn more →").
- A centered hero with a gradient-blob background — the single most generic layout
  for an AI-era portfolio.
- Numbered markers (01 / 02 / 03) on content that isn't actually a sequence.
- Fade-and-slide-up entrance animation repeated on every section as the user
  scrolls down the page.

## 4. Architecture

**Frontend:** static site, deployed free on Vercel or Netlify (or GitHub Pages if a
backend function isn't needed). **Content storage + editability:** Supabase free tier
— bundles the database, auth (gate `/admin` to one owner account), and file storage
for images in one project, minimizing services to wire up. **Why not a hand-edited
JSON file:** fails requirement #2 — a git-committed JSON file means every content
change needs a commit/redeploy, not "fully editable on my own," e.g. from a phone.

**Environment/secrets:** Supabase URL + anon key in environment variables. The anon
key is safe to expose client-side by Supabase's design — protection comes from
row-level security policies tied to the authenticated owner's user ID, not key
secrecy. The admin write path must be protected by RLS, not just by hiding the
`/admin` route.

## 5. Content schema

Every content type has **core fields** (below) plus a `custom_fields` JSON column
storing `{ key, label, type, value }` objects (`type` ∈ text, long_text, number, date,
url, boolean). The admin UI's "manage fields" control per content type lets Rochan
define new field keys, which then appear on that type's add/edit form. The public-site
renderer must display any `custom_fields` generically under the core fields, formatted
by their declared type, without a code change per new field.

**Project:** `title`, `status` (live/in_progress/archived), `date_range`, `problem`
(long_text), `approach` (long_text), `result` (text — the headline measured outcome,
shown in monospace/green when present), `tech_stack` (array of tags), `image`
(upload), `live_url`, `repo_url`, `team_note`, `custom_fields`.

**Experience:** `role_title`, `organization`, `date_range`, `location_type`
(on_site/remote/hybrid), `description` (long_text), `mentors` (array), `custom_fields`.

**Skill:** `name`, `group` (e.g. Languages, ML/DL, LLM/GenAI, Geospatial, Web/Backend,
Blockchain), `custom_fields`.

**Achievement:** `title`, `result`, `context` (long_text), `date`, `custom_fields`.

**Static "settings" sections** (single-record, still editable from `/admin`, not
hardcoded): **Hero** (`full_name`, `role_line`, `bio`, `photo`); **Snapshot stats**
(ordered array of `{ label, value }`, add/remove/reorder); **Contact/footer** (a
repeatable `{ label, url }` list so new link types don't need a schema change).

**Ordering:** Projects, Experience, and Achievements support manual reordering
(drag-and-drop or up/down controls) in the admin UI.

## 6. Real content

Rochan's actual profile/experience/projects/skills/achievements will be provided as a
**separate file** (`PROFILE.md` or similar) alongside this spec. Use that file as the
seed data for Hero, Snapshot stats, Experience, Projects, Skills, Achievements, and
Contact/footer — map its content onto the schema in Section 5. Where a detail is
missing there (no image yet, no result yet), leave it empty in the schema rather than
inventing one; do not fabricate metrics, testimonials, or URLs not present in that
file.

## 7. Build phases

Build in phases; stop after each and wait for confirmation before continuing.

1. **Setup** — scaffold the repo, generate the Supabase schema SQL from Section 5,
   write a `SETUP.md` with the exact manual dashboard steps Rochan must do himself
   (create Supabase project, run schema SQL, create a storage bucket, enable
   email/password auth), deploy a bare placeholder page to prove the pipeline works.
2. **Design direction** — run `/impeccable shape` using Section 3 as the brief to plan
   the UI before writing real components.
3. **Static build** — build Hero, Snapshot, Footer, then Experience/Projects/Skills/
   Achievements as read-only, using the content from the separate profile file
   (Section 6) mapped onto the Section 5 schema (hardcoded is fine here). Watch for
   the page feeling overlong once real project count is known — consider a
   "show more" affordance for archived/older projects.
4. **Database wiring** — connect Supabase, seed it from that same content via a
   one-time script (not manual entry), switch each section to read from the database.
5. **Admin auth** — Supabase Auth, one owner account, gated `/admin` shell.
6. **Admin CRUD** — add/edit/delete + image upload for Projects, then Experience/
   Skills/Achievements, then reordering.
7. **Custom fields** — the "manage fields" control per content type; verify a new
   field (e.g. "Co-authors" on Projects) appears on the form and renders publicly with
   no code change.
8. **Site settings editability** — move Hero/Snapshot/Footer into `/admin` too.
9. **Impeccable polish pass** — run `/impeccable critique` then `/impeccable polish`
   across the whole site; `/impeccable audit` on any section that still feels generic
   or templated.
10. **Final check** — responsive/accessibility/performance pass; review against
    Section 2's success criteria.

## 8. Using Impeccable

This project uses the Impeccable design skill for Claude Code
(`/plugin marketplace add pbakaus/impeccable`, then `/plugin` to install). Its
commands do the actual design execution — treat Section 3 above as the brief you feed
it, not a locked spec to reimplement manually:

- `/impeccable shape` — plan UX/UI before writing code (use at Phase 2)
- `/impeccable colorize`, `/impeccable typeset`, `/impeccable layout`,
  `/impeccable animate` — introduce color, fix type hierarchy, fix spacing/rhythm, add
  purposeful motion (use during Phase 3 as sections are built)
- `/impeccable bolder` / `/impeccable quieter` / `/impeccable distill` — adjust
  intensity if a build pass over- or under-shoots the brief
- `/impeccable audit`, `/impeccable critique`, `/impeccable polish` — review passes
  (use at Phase 9)

## 9. Prerequisites — do this before starting Claude Code

1. **Install Node.js** (v18+) if not already installed — needed for the frontend
   tooling and the Impeccable CLI. Check with `node -v` in a terminal.
2. **Install Claude Code**, if not already installed: `npm install -g
   @anthropic-ai/claude-code`, then run `claude` once in an empty project folder to
   confirm it opens.
3. **Add the Impeccable marketplace and install the plugin**, inside a Claude Code
   session:
   ```
   /plugin marketplace add pbakaus/impeccable
   /plugin
   ```
   then pick **Impeccable** from the list that appears and install it. Confirm it's
   available by typing `/impeccable` — it should show its command list (`shape`,
   `colorize`, `typeset`, `layout`, `animate`, `audit`, `critique`, `polish`, etc.).
4. **Create the project folder** and place two files in it:
   - `SPEC.md` — this file
   - your profile/content file (e.g. `PROFILE.md`) — your real experience, projects,
     skills, and achievements, referenced in Section 6
5. **Free accounts you'll need** (Claude Code will walk you through the exact steps
   in its own `SETUP.md` during Phase 1, but it's worth having accounts ready):
   - a free [Vercel](https://vercel.com) or [Netlify](https://netlify.com) account,
     for hosting
   - a free [Supabase](https://supabase.com) account, for the database/auth/image
     storage
   - a [GitHub](https://github.com) account, since both hosting options deploy from a
     git repo

Once these are in place, open Claude Code in the project folder and use the starting
prompt below.


