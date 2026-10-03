---
name: Rochan Awasthi Portfolio
description: A topographic survey sheet of one person's work — title block, legend, sheet index, spot heights.
colors:
  ink: "#12202e"
  paper: "#f3f5f2"
  paper-deep: "#e9eeea"
  blue: "#2a6f9e"
  blue-deep: "#1b4f75"
  amber: "#d99a2b"
  amber-deep: "#8a5a12"
  green: "#3f7d58"
  green-deep: "#2f6446"
  line: "#c9d1cb"
  ink-muted: "#55626e"
  contour: "#b08d63"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 1.02
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
  spot-height:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
rounded:
  sm: "4px"
  focus: "2px"
spacing:
  neatline-inset: "6px"
  rail: "9rem"
  gutter: "2rem"
  section: "4rem"
  section-lg: "6rem"
components:
  status-badge-live:
    textColor: "{colors.green-deep}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  status-badge-in-progress:
    textColor: "{colors.amber-deep}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  status-badge-archived:
    textColor: "{colors.ink-muted}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  link-inline:
    textColor: "{colors.blue}"
    height: "44px"
  link-inline-hover:
    textColor: "{colors.blue-deep}"
  sheet-index-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    height: "44px"
    padding: "0 12px"
  sheet-index-cell-hover:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.blue-deep}"
  legend-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "12px 16px"
  contour-plate:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.contour}"
    height: "128px"
---

# Design System: Rochan Awasthi Portfolio

## Overview

**Creative North Star: "The Survey Sheet"**

The public page is one printed topographic sheet of Rochan's work. It does not arrange content like a developer portfolio (big name, hairline list, chip cloud); it uses the furniture of a map: a title block, a legend, a sheet index of neighbouring panels, benchmark triangles where something was measured, and contour linework standing in for imagery that does not exist yet. The sheet sits on a slightly deeper plate-grey page, inside a neatline double border with graticule ticks, and ends in a coordinate colophon.

The voice is cool, exact and quiet. Colour is map ink, not brand paint: blue-black for text, hydrography blue for anything you can follow, vegetation green for outcomes that were measured, road amber for work still in progress, contour brown for decorative linework only. Proof is set large, as spot heights, and everything else steps back. There are no shadows and no cards; separation is hairline rules, ruled boxes and whitespace.

The page earns exactly one authored moment: on load the title block settles in and the contour lines draw behind it. Nothing else animates, and all motion collapses under `prefers-reduced-motion`. The admin pages (`/admin`) reuse the same colour and type tokens but are not part of this composition: they have no sheet wrapper, neatline, ticks, legend or contours.

**Key Characteristics:**
- Cool pale sheet (not cream) on a one-step-deeper plate; ink-coloured hairlines at 40% for structure.
- Archivo display, Public Sans text, JetBrains Mono for numbers, dates, status and coordinates.
- Square, flat geometry: 1px rules, ruled grids built with 1px gaps over an ink ground, 4px on badges.
- Measured results carry a benchmark triangle and green mono type; unmeasured results stay plain ink.
- Authored contour placeholders replace missing project images; real images replace them without layout change.

## Colors

A cool survey palette: one pale ground, one blue-black ink, and three earned map colours with fixed meanings.

### Primary
- **Hydrography Blue** (#2a6f9e): links, sheet-index cells, the role line under the name, focus ring, text selection ground, and the innermost ring of each contour plate. **Deep Hydrography** (#1b4f75) is the hover state.

### Secondary
- **Road Amber** (#d99a2b): borders only (the in-progress badge outline at 40%). It is never text. **Amber Ink** (#8a5a12) is the text-safe variant for the in-progress label and the content-load error line.

### Tertiary
- **Vegetation Green** (#3f7d58): the border of the live badge (40%). **Green Ink** (#2f6446) is the text-safe variant, used for measured results (mono) and the live label.

### Neutral
- **Survey Ink** (#12202e): text, headings, neatline, registration marks, and rules at reduced opacity (30-60%).
- **Cool Sheet** (#f3f5f2): the sheet itself and cell grounds inside ruled grids.
- **Plate Grey** (#e9eeea): the page ground behind the sheet, contour-plate ground, sheet-index hover ground.
- **Hairline Grey** (#c9d1cb): row dividers, 1px grid gaps in the legend, plate borders.
- **Muted Ink** (#55626e): secondary text, labels, dates, tech tags.
- **Contour Brown** (#b08d63): decorative linework only (hero and plate contours). Never text, never a fill.

### Named Rules
**The Meaning-Per-Ink Rule.** Blue means "you can follow this", green means "this was measured", amber means "not finished". A colour is never borrowed for decoration; brown is the only decorative ink.

**The Text-Safe Variant Rule.** Amber and green text on the sheet always uses the `-deep` variant. The bright tones are for borders and small marks.

## Typography

**Display Font:** Archivo (500, 600, 700), with system sans fallback
**Body Font:** Public Sans (400, 500), with system sans fallback
**Label/Mono Font:** JetBrains Mono (400, 500), with ui-monospace fallback

**Character:** A grotesque with map-lettering authority for the title and panel headings, a plain humanist sans for reading, and a monospace kept for things that are numbers, dates, or coordinates.

### Hierarchy
- **Display** (700, 48px mobile / 72px from 640px, line-height 1.02, Archivo): the sheet title, i.e. the name, only.
- **Headline** (600, 24px / 30px from 640px, Archivo): panel headings (Experience, Achievements, Projects, Skills), each trailed by a 1px ink/30 rule that runs to the right edge.
- **Title** (500, 18px, Public Sans): entry titles (role, project). Skill group names use 14px at 500.
- **Body** (400, 16px, 18px for the hero bio, line-height 1.6, Public Sans): prose capped at 68ch (60ch in the hero, 52ch for project titles).
- **Label** (400, 12px, Public Sans, sentence case, no tracking): legend captions, "Sheet index", Problem / Approach / Result captions, mentors and notes (14px).
- **Spot height** (400, 20px from 640px / 16px below, JetBrains Mono, Green Ink): achievement results that are measured and 28 characters or fewer. Step down to 16px mono at 29-40 characters and to 16px sans at longer lengths; unmeasured results are 18-20px sans in Survey Ink.
- **Data** (400, 12px, JetBrains Mono): dates, status badges, colophon coordinates; legend values at 16-18px.

### Named Rules
**The Spot-Height Rule.** Proof is large. A measured, short result is set as a mono spot height with a benchmark triangle before it; the rule steps the size down as the string gets longer rather than shrinking it to fit.

**The Mono-Means-Number Rule.** JetBrains Mono sets numbers, dates, status, and coordinates. It never sets headings or running prose.

## Layout

The sheet is centered, capped at 64rem (`max-w-5xl`), inset 0.75rem from the viewport on phones and 2rem from 640px, with 1.25rem (phone) to 2.5rem (640px+) interior padding. Content flows in one column on the sheet.

The first viewport is a two-column hero from 768px: title block on the left (flexible), a fixed 15rem right column holding the photo (16rem tall, full column width) over the 2x2 sheet index. Below 768px the columns stack, and the photo becomes a 11rem by 13rem plate beside the index at 640px+. The Legend follows immediately: a ruled box of four stat cells (two across on phones) and one row of contact links beneath.

Experience, Achievements, Projects and Skills share a **ledger rail**: from 768px a fixed 9rem left column carries dates, status, or group names and the body sits to its right with a 2rem gap; below 768px the meta stacks above the body. Entries are separated by `divide-y` hairlines (Hairline Grey), never boxes. Sections are 4rem apart on phones and 6rem from 640px; section anchors use an 2rem scroll margin. Touch targets are at least 44px tall (inline links, sheet-index cells).

## Elevation & Depth

There are no shadows and no cards. Depth is conveyed by tonal stepping and rules: the Plate Grey page ground sits one step below the Cool Sheet; contour plates sit one step below the sheet in the same Plate Grey; ruled boxes (legend, sheet index) are 1px ink/40 borders over 1px Hairline or ink gaps. The neatline is a 1px ink border plus a second 1px ink outline inset 6px, with graticule ticks every 4rem (1px at 55% opacity) along the top and left, drawn between the two lines.

### Named Rules
**The Flat Sheet Rule.** Nothing casts a shadow or floats. If something needs separation, it gets a hairline or a tonal step.

## Shapes

Square by default. Photos, plates, legend and sheet-index boxes are rectangular with 1px borders. The only rounding is the status badge (4px) and the keyboard focus ring (2px). No circles, pills, or masked photo shapes. The hero photo carries four corner registration marks (12px L-shaped ink/60 ticks sitting 8px outside each corner) and a 1px ink/40 border. The benchmark mark is a 14px triangle outline with a centre dot, in the colour of the text beside it.

## Components

### Sheet Title Block (Hero)
Name in Display, role line in Hydrography Blue at 16px/500, bio in 18px ink. Contours draw behind it (see Contours). The title block and the right column settle in over 450ms with an upward 14px drift; secondary elements are delayed 90ms.

### Contours
A deterministic generator (seeded SVG rings) produces linework. The hero version is a 9-ring group in Contour Brown at 30% opacity (40% from 768px), anchored to the top right and masked to fade out downward; each ring draws in via stroke-dash over 1100ms, staggered 70ms. The project **Contour Plate** is a 128px-tall, full-width, hairline-bordered Plate Grey panel with 5-9 rings seeded from the project slug (innermost ring in Hydrography Blue), a scale bar bottom left, and graticule ticks along the top. It is decorative and is replaced by the uploaded image (192px tall, 256px from 640px, hairline border) when one exists.

### Legend
A ruled box (1px ink/40) holding stat cells in a 2-column (4 from 640px) grid with 1px Hairline gaps: a 12px muted caption above a mono value (16-18px). A second row separated by an ink/40 rule carries contact links inline with 1.5rem gaps.

### Sheet Index (SectionNav)
A "Sheet index" caption over a 2-column grid of cells divided by 1px ink/40 gaps and a 1px ink/40 outer border. Each cell is 44px tall, 12px side padding, 14px Hydrography Blue; hover shifts to Plate Grey, Deep Hydrography and underlines. Only sections that have content appear.

### Links
Hydrography Blue, underlined with 2px offset, Deep Hydrography on hover, 44px hit area. Labels are plain words ("View live", "Repository"); no arrow suffix.

### Status Badge
Mono 12px, 1px border, 4px radius, 8px by 2px padding, transparent ground. Live: Green Ink text, green/40 border. In progress: Amber Ink text, amber/40 border. Archived: Muted Ink text, Hairline border.

### Project Entry
Ledger rail with date (mono) and badge on the left; right side stacks plate or image, 18px/500 title, then Problem / Approach / Result as a definition list with 12px muted captions and 68ch text. A measured result gets a benchmark triangle and Green Ink (mono when 40 characters or fewer); an unmeasured one is plain ink; no Result row at all when none exists. Tech stack is a comma-separated muted 14px text run, not chips. Links sit last.

### Experience, Achievements, Skills Entries
Ledger-rail rows on hairline dividers. Experience: mono date and location in the rail, 18px/500 role, organization at 16px ink. Achievements: the result is the headline of the row (Spot-Height Rule), title beneath, context in muted 14px. Skills: group name in the rail, skills as a comma-separated 14px run with any custom field shown as a muted 12px sub-line.

### Colophon (Footer)
Top rule in ink/40, contact links repeated, then a 12px mono line: place, coordinates, edition year.

### Focus and Selection
Every interactive element gets a 2px Hydrography Blue outline at 2px offset with a 2px radius. Text selection inverts to blue ground on sheet paper.

## Do's and Don'ts

### Do:
- **Do** build ruled boxes from a 1px ink/40 border over 1px gaps on an ink/40 or Hairline ground, with Cool Sheet cells.
- **Do** set short measured results as mono spot heights in Green Ink with a benchmark triangle, and drop the Result row entirely when no result exists.
- **Do** use `-deep` variants for amber and green text, and keep Contour Brown to linework.
- **Do** keep the authored contour moment to the hero on load, and honour `prefers-reduced-motion`.
- **Do** keep touch targets at 44px minimum height and the 9rem ledger rail at 768px and up.
- **Do** keep admin pages on the shared tokens but off the sheet furniture (no neatline, ticks, legend, contours).

### Don't:
- **Don't** use shadows, cards, rounded cards, pills, or circular crops.
- **Don't** use amber or Contour Brown for text, or green for anything that was not measured.
- **Don't** use a cream ground; the sheet is cool grey-white.
- **Don't** animate on scroll or add motion beyond the hero's settle and contour draw.
- **Don't** number projects or use sequence markers; status badges carry that signal.
- **Don't** append arrows to link labels or turn tech tags into a chip cloud.
- **Don't** set prose or headings in JetBrains Mono.
