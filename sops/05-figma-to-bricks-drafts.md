# SOP: Figma → Bricks section drafts

**Track B.** Local/staging only. Agent output is a draft. A human ships it.

**Norm:** ElevateX, Bricks 2.4+, WordPress 6.9+.  
**Cursor skill:** `figma-to-bricks-drafts` (this folder’s `.cursor/skills/`).

**Pilot files (imperfect on purpose):**

- [WCS 2026 Redesign](https://www.figma.com/design/WDZuMgX6wyAL9uH60k7vmp/WCS-2026-Redesign?node-id=2001-4149) — incomplete (missing some mobile and finished button styles). Prefer the live WCS Pantheon for `mns` variable names.
- [Lightenco Theme](https://www.figma.com/design/MgRb1VWi78Zegzz7iHqplF/Lightenco-Theme?node-id=0-1) — some variable names may be stale. Trust the **site’s** Bricks classes/variables over the file when they conflict.

---

## Before you start

- [ ] Staging or local only. Bricks → AI **off** on production.
- [ ] MCP Adapter connected; Bricks skills installed; Figma MCP can see the file.
- [ ] You know the **frame/node** (not “the whole file”).
- [ ] You will inspect the **site** design system before writing.

---

## Steps

1. **Scope.** One section (hero, cards, FAQ, footer…), not the full page unless asked.
2. **Read Figma.** Use Figma MCP on that node. Note layout, type, spacing, and which styles look unfinished (call those out; do not invent a finished button if the file has none).
3. **Read Bricks first.** List existing global classes, variables, palettes, ElevateX/`mns` tokens. Official Bricks skills: inspect before create.
4. **Draft in Bricks** via MCP:
   - Structure from the frame.
   - Styling from **existing** classes and variables only.
   - Native Bricks elements; ElevateX custom elements when the pattern is FAQ (etc.).
5. **Stop and ask** if the design needs a token or class the site does not have.
6. **Human in the builder.** Responsive, hierarchy, hover/focus, a11y. Fix, don’t rubber-stamp.
7. **QA.** Front end vs Figma (allow for incomplete file). Buttons are buttons; text is HTML; no extra JSON-LD. Money pages: citeability one-sheet.

---

## Drafting rules (also in the Cursor skill)

- Use existing global classes and Bricks / ElevateX variables. Do not invent a class or token without asking.
- Semantic HTML: real headings, buttons, lists, labels. No `div` buttons.
- No page-level CSS dump when a variable or class exists.
- No `<script type="application/ld+json">`. Schema stays in Yoast / ElevateX elements.
- Match the named Figma section, not the whole page, unless asked.
- If Figma and the live theme disagree on names, **theme wins** and you note the drift.

---

## Done means

A section exists in Bricks on staging/local, a human has opened it, and leftover Figma gaps (mobile, buttons) are listed — not silently “finished” by the agent.
