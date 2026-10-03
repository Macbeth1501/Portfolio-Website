---
name: Rochan Awasthi Portfolio
description: An editorial-profile portfolio that reads like a lab notebook — evidence first, restraint everywhere else.
colors:
  ink: "#152a43"
  paper: "#fbf9f4"
  blue: "#2c5f8a"
  blue-deep: "#1d4568"
  amber: "#e8a93b"
  amber-deep: "#906925"
  green: "#3a8069"
  green-deep: "#397d67"
  line: "#dcd6c7"
  ink-muted: "#5b6b7d"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 400
spacing:
  section: "4rem"
  section-sm: "6rem"
rounded:
  sm: "2px"
components:
  status-badge-live:
    backgroundColor: "transparent"
    textColor: "{colors.green-deep}"
    rounded: "{rounded.sm}"
  status-badge-in_progress:
    backgroundColor: "transparent"
    textColor: "{colors.amber-deep}"
    rounded: "{rounded.sm}"
  status-badge-archived:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.sm}"
  link-inline:
    textColor: "{colors.blue}"
  link-inline-hover:
    textColor: "{colors.blue-deep}"
---

# Design System: Rochan Awasthi Portfolio

## Overview

**Creative North Star: "The Working Profile"**

An editorial-magazine profile crossed with a lab notebook. The page reads like a confident, left-aligned profile piece in a serious publication — but every claim is stated like a research log entry: problem, approach, measured result, plainly, because the underlying work has real numbers behind it (benchmark scores, competition placements, live deployments). Decoration is refused wherever it would compete with those numbers for attention. The page is calm and static at rest; it earns exactly one moment of motion, on load, and nothing after that argues for the visitor's attention through animation.

Confirmed visual rejections (see Do's and Don'ts): no warm-cream-plus-terracotta template look, no near-black-plus-neon "AI startup" look, no SaaS card grid, no tracked-out uppercase eyebrows, no arrow-suffixed links, no centered gradient-blob hero, no sequence numbering on non-sequential content, no scroll-triggered repeat animation.

**Key Characteristics:**
- Left-aligned, single-column editorial reading flow — never centered, never a marketing-landing-page composition.
- Evidence carried in JetBrains Mono: dates, tech tags, and measured metrics read as "measured fact," distinct from prose.
- Color is restrained by rule, not by accident: amber and green each do real work in exactly one place per view, never both at full strength together.
- One entrance sequence (hero name + photo settling in, ~450ms) and nothing else animates on scroll.

## Colors

Warm, restrained, paper-and-ink palette with two earned accent colors reserved for specific meanings rather than decoration.

### Primary
- **Signal Blue** (`#2c5f8a`): the everyday workhorse — links, hover states, focus rings, section markers. Carries most of the page's color load. **Blue Deep** (`#1d4568`) is its hover/active state.

### Secondary
- **Ledger Amber** (`#e8a93b`): sparing use only — a single highlighted stat, an "in progress" status badge, one CTA moment per view. Never a section wash or decorative fill. **Amber Deep** (`#906925`) is the same hue darkened for on-paper text use (badge labels): the base amber is only 1.96:1 against the paper background and fails WCAG AA for text, so text always renders in the deep variant while borders/accents may use the lighter base.

### Tertiary
- **Result Green** (`#3a8069`): reserved for measured outcomes — result metrics, "live" status. Marks something that was actually measured, never a generic success color. **Green Deep** (`#397d67`) is a very slightly darkened variant used for on-paper text (the base green is 4.46:1, marginally under AA); the difference from the base is imperceptible but closes the gap to 4.5:1+.

### Neutral
- **Ink** (`#152a43`): primary text and headings, 13.8:1 against paper.
- **Paper** (`#fbf9f4`): page background — warm off-white, never stark white.
- **Ink Muted** (`#5b6b7d`): secondary/supporting text (mentors, dates in prose, meta labels), 5.2:1 against paper — the palette's lowest-contrast text pairing, verified to still clear AA.
- **Line** (`#dcd6c7`): hairline rule/divider — warm grey-beige, never pure grey.

### Named Rules
**The One-Accent-at-a-Time Rule.** At any given scroll position, only one of amber or green does real visual work. They never appear at full strength together in the same frame, and neither ever becomes a section background.

**The Measured-Text Rule.** Amber or green text on the paper background always renders in its `-deep` variant. The bright base tones exist for borders, chips, and small accents only — never for body-sized text, where they fail contrast.

## Typography

**Display Font:** Fraunces (weight 500–600), with Georgia/serif fallback
**Body Font:** Inter (weight 400), with system-ui fallback
**Label/Mono Font:** JetBrains Mono (weight 400)

**Character:** A warm, literary serif for identity and section headings, paired with a plain, quiet sans for reading, and a monospace reserved strictly for things that were measured or dated — never used as a "technical" costume.

### Hierarchy
- **Display** (600, 36–72px responsive, Fraunces): the hero name only.
- **Headline** (500, 26–36px responsive, Fraunces): section headings (Experience, Projects, Skills, Achievements).
- **Title** (500, 18px, Inter): entry-level headings (a role title, a project title, an achievement title).
- **Body** (400, 16–18px, Inter, line-height 1.6, max ~68ch): paragraph copy — bios, descriptions, problem/approach text.
- **Label** (400, 12–14px, Inter or JetBrains Mono depending on context): meta text — dates, tech-stack tags, snapshot stat labels.

### Named Rules
**The Mono-Means-Measured Rule.** JetBrains Mono appears only on dates, tech-stack tags, and measured metrics. A result counts as measured only if it states a number; prose outcomes render in ink, not green mono. It never sets body prose or headings, and it is never reached for as a generic "technical" signal.

## Layout

Left-aligned reading flow, capped at a ~896px (`max-w-4xl`) column centered in the viewport on wide screens. From 768px (`md`), Experience, Projects and Achievements entries use a **ledger rail**: a fixed 9rem left column carries each entry's date, status or location in small type (the lab-notebook margin), and the body sits in the right column; below 768px the same meta stacks above the entry. The hero, snapshot strip, Skills and footer stay full-width single-column. Body text keeps its ~68ch measure regardless. The column itself stays left-aligned internally — the column itself stays left-aligned internally; centering the column is a readability choice, not a return to a marketing-page composition. Vertical rhythm is generous and consistent: sections are separated by `mt-16` (mobile) / `mt-24` (desktop, ≥640px), entries within a section are separated by `border-line` hairline dividers rather than cards or shadows. The hero breaks to a `flex-row` (text + photo side by side) only at ≥640px; below that it stacks. Skills groups move from one column to a two-column grid at ≥640px.

## Elevation & Depth

No shadows anywhere in the system. Depth and separation are conveyed entirely through hairline dividers (`--line`) and whitespace — a flat, paper-like surface throughout, consistent with the "lab notebook" material the system is named for.

## Shapes

Minimal, restrained corner language: a 2px radius (`rounded-sm`) on the few bordered elements (status badges, tech-stack chips, skill chips) — just enough to soften a hard edge, never a rounded-card aesthetic. No circular crops, no pill-shaped badges, no clipped/masked photo shapes; a future hero photo is specified as a rectangular, slightly asymmetric crop, never circular or gradient-masked.

## Components

### Status Badge
- **Shape:** bordered rectangle, 2px radius, 1px border.
- **Live:** green-deep text, green border at 40% opacity.
- **In progress:** amber-deep text, amber border at 40% opacity.
- **Archived:** ink-muted text, plain line-colored border.
- Replaces decorative sequence numbering — projects are not a sequence, so no 01/02/03 markers appear anywhere.

### Tag Chip (tech stack, skills)
- **Style:** 2px-radius border in `--line`, ink-muted text, JetBrains Mono, extra-small size. Uniform across all chips — never colored per-category, never a rainbow "pill cloud."

### Project / Experience / Achievement Entries
- **Style:** full-width stacked blocks separated by a single `--line` hairline rule (`divide-y`), never a card, never a shadow.
- **Projects specifically:** internally structured as Problem → Approach → Result, with Result set in JetBrains Mono and colored `--green-deep` only when a real measured outcome exists — the field is omitted entirely, never filled with a placeholder, when no result exists yet.

### Links
- **Style:** `--blue` text, underline with `underline-offset-2`, `--blue-deep` on hover. No arrow suffix, ever ("View live" / "Repository", not "View live →").

### Snapshot Strip
- **Style:** a slim `<dl>` band with vertical dividers (`divide-x`) between stats, bordered top and bottom by `--line`. Stat values in JetBrains Mono, labels in small ink-muted Inter. Quiet by design — not an oversized stat-card-with-icon treatment.

### Footer
- **Style:** plain text links in Inter, `--blue` / `--blue-deep` hover, separated by generous horizontal gaps. No icon-only circular buttons.

## Do's and Don'ts

### Do:
- **Do** keep JetBrains Mono reserved for dates, tech tags, and measured metrics only.
- **Do** render amber or green body text in its `-deep` variant to hold WCAG AA contrast on the paper background.
- **Do** omit a project's Result field entirely when no real measured outcome exists yet, rather than inventing or placeholder-filling it.
- **Do** separate list entries (Experience, Projects, Achievements) with a single hairline `--line` divider, never a card or shadow.
- **Do** keep the hero's one entrance animation disabled under `prefers-reduced-motion`.

### Don't:
- **Don't** use a warm cream background with a terracotta/clay accent — the generic AI-portfolio tell this system explicitly rejects.
- **Don't** use amber and green at full strength in the same view.
- **Don't** add a kicker/eyebrow label above any section heading.
- **Don't** number projects (01/02/03) — status badges carry that signal instead.
- **Don't** append an arrow to a link or button label.
- **Don't** center the hero or use a gradient-blob background behind it.
- **Don't** animate on scroll; the only animation is the hero's one-time entrance on load.
