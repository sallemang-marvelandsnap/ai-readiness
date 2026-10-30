---
name: figma-to-bricks-drafts
description: >-
  Drafts Bricks Builder sections from a Figma frame using Figma MCP (read) and
  Bricks MCP (write) on local or staging WordPress. Enforces Marvel & Snap
  ElevateX rules: existing global classes and Bricks/theme variables first,
  semantic HTML, no extra JSON-LD. Use when implementing a Figma design in
  Bricks, generating section drafts, or the user mentions Figma to Bricks,
  Bricks MCP, or ElevateX `mns` variables.
---

# Figma → Bricks section drafts

Marvel & Snap studio workflow. **Local/staging only.** Output is a draft. A human reviews in the Bricks builder before anything is shipped.

## Before writing

1. Confirm the target is local or staging, not production.
2. Identify the **one Figma frame/node** (not the whole file unless asked).
3. Use Figma MCP to read that node. If mobile or button styles are missing or unfinished, say so. Do not invent a finished component the file does not have.
4. Use Bricks MCP to **read the site design system first**: global classes, variables, palettes, ElevateX / `mns` tokens.
5. If Figma names and the live theme disagree, **the theme wins**. Note the drift. Prefer live `mns-*` variables on current ElevateX sites.

## Drafting rules

- Use existing global classes and Bricks / ElevateX variables. Do not invent a class or token without asking.
- Semantic HTML: real headings, buttons, lists, labels. No `div` buttons.
- No page-level CSS dump when a variable or class exists.
- No `<script type="application/ld+json">`. Schema stays in Yoast / ElevateX elements.
- Match the named Figma section, not the whole page, unless asked.
- Prefer native Bricks elements. Use an ElevateX custom element only when that pattern exists (e.g. FAQ).
- If the design needs a token or class the site does not have, stop and propose it.

## After writing

- List what you created and what you left unfinished (file gaps, missing tokens).
- Remind the user to open the section in Bricks (responsive, focus/hover, a11y).
- Do not treat the MCP write as done.

## Pilot files (known-incomplete)

- WCS 2026: `WDZuMgX6wyAL9uH60k7vmp` — missing some mobile and button styles; trust [WCS Pantheon](https://redesign-wesleycloverservices.pantheonsite.io/) for `mns` names.
- Lightenco: `MgRb1VWi78Zegzz7iHqplF` — variable names may be stale; theme wins.
