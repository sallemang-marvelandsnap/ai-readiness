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
2. Identify the **page Frame** (the artboard for this page). The whole page design is fine. Do not load a multi-page file with no Frame selected. If the designer also has a **mobile (or tablet) Frame for the same page**, read that too — same WordPress page, Bricks breakpoints, not a second template.
3. Use Figma MCP to read the desktop Frame and, if present, the mobile Frame. Implement **one named section per write** (hero, then the next). Do not rebuild the entire page in a single MCP write. Put mobile layout on Bricks responsive settings.

   **Figma gap check (report in chat before or with the draft — do not invent these):**
   - Hover / focus / pressed on buttons and links?
   - A mobile (or tablet) frame for this section?
   - Finished button styles, or only a default rest state?
   - Real copy vs empty / lorem layers?

   If any of those are missing, say so in one short list. Then draft only what *is* in the file, unless the human asks you to implement a default in Bricks on purpose.
4. Use Bricks MCP to **read the site design system first**: global classes, variables, palettes, ElevateX / `mns` tokens.
5. If Figma names and the live theme disagree, **the theme wins**. Note the drift. Prefer live `mns-*` variables on current ElevateX sites.

## Drafting rules

- Use existing global classes and Bricks / ElevateX variables. Do not invent a class or token without asking.
- Semantic HTML: real headings, buttons, lists, labels. No `div` buttons.
- No page-level CSS dump when a variable or class exists.
- No `<script type="application/ld+json">`. Schema stays in Yoast / ElevateX elements.
- Each write is one named section. Figma context may be the whole page Frame.
- Prefer native Bricks elements. Use an ElevateX custom element only when that pattern exists (e.g. FAQ).
- If the design needs a token or class the site does not have, stop and propose it.

## After writing

- List what you created and what you left unfinished (file gaps, missing tokens).
- Remind the user to open the section in Bricks (responsive, focus/hover, a11y).
- Do not treat the MCP write as done.

## Pilot files (known-incomplete)

- WCS 2026: `WDZuMgX6wyAL9uH60k7vmp` — missing some mobile and button styles; trust [WCS Pantheon](https://redesign-wesleycloverservices.pantheonsite.io/) for `mns` names.
- Lightenco: `MgRb1VWi78Zegzz7iHqplF` — variable names may be stale; theme wins.
