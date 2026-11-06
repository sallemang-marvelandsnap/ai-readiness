# Figma → Bricks section drafts

**Marvel & Snap — internal.** This is **Track B**: how we **build** in the studio, not a client “AI-ready” ranking feature. A designer or developer uses Cursor to read a Figma frame and write a **section draft** into Bricks on **local or staging**. A human then opens the builder and ships it. The agent’s write is not the ship.

Connection setup (MCP Adapter, Application Password, official Bricks skills, Figma MCP) lives in [02](02-studio-mcp-onesheet.md). Do not enable Bricks AI abilities on production.

**Stack:** ElevateX, Bricks 2.4+, WordPress 6.9+. Load the Cursor skill `figma-to-bricks-drafts` (this repo’s `.cursor/skills/figma-to-bricks-drafts/`) on top of the official Bricks skills. That skill encodes the rules below so the agent follows them without being pasted this SOP every time.

**What “MCP” means here:** Figma MCP **reads** the frame (layout, type, spacing). Bricks MCP **writes** elements on the WordPress site. You still review in Bricks.

---

## Before you start

- [ ] The WordPress target is **local or staging**, not live. Bricks → AI abilities are **off** on production ([02](02-studio-mcp-onesheet.md)).
- [ ] MCP Adapter shows **Connected** in Bricks → AI. Official Bricks skills are loaded in Cursor. Figma MCP can see **this project’s file** (not a random library). **Setup:** Cursor Settings → MCP → Figma server signed in. **Check:** paste the project’s Figma URL in chat (`figma.com/design/…`; Share → copy link). Prefer the **page Frame** (the artboard for this page), with `node-id` if you have it. Ask the agent to name the file it opened — it must match this job (e.g. “WCS 2026 Redesign”), not a team library or someone else’s file. The `fileKey` is the segment after `/design/`. Use a shared M&S library URL only if we have agreed that is the source.
- [ ] You have the **page Frame** (the whole page design is fine). You do **not** need a separate Figma node ID per section up front. What you *do* constrain is the **Bricks write**: ask the agent to start with one section, you review it in the builder, then the next. Do not paste a multi-page file with no Frame selected and say “build the site.” Do not ask for the entire page in a single MCP write. **If desktop and mobile (or tablet) frames both exist for this page, give the agent both** — two Share links, or one file URL plus both frame names. That is still one WordPress page: mobile is Bricks breakpoints, not a second template. If only desktop exists, say so (gap check).
- [ ] You will have the agent **list global classes, variables, palettes, and ElevateX / `mns` tokens on the WordPress target you are connected to** (local or staging — not production) **before** it creates anything. This is **not** “does Figma use the same names as Bricks?” Figma can say `--primary-color` while the theme says `--mns-role-primary`. **What you are checking:** the agent can see the Bricks keys, so it will bind Figma’s *look* (that blue, that type size) to the **existing Bricks key**, not create a new variable named like Figma. Glance the list so it looks like ElevateX (`mns-*`), not a blank install. If nothing on the list is a reasonable match, stop and add or approve a token — do not let the agent invent Figma’s name in Bricks.

---

## Steps

1. **Scope.** Give Cursor the page Frame so it has the full design. For the first write, name **one section** (hero, then logos, then cards, and so on). Perfect that slice in Bricks, then move on. Building the whole page is expected; doing it as **one giant write** is not.

2. **Read Figma.** Use Figma MCP on the page Frame (and the section you named). If a mobile (or tablet) Frame exists, read that too in the same pass. Note layout, type, spacing. Apply mobile differences as **Bricks responsive / breakpoint styles** on the same elements — do not build a second page.

   **In practice:** this is not a separate Figma audit tool. The Cursor skill `figma-to-bricks-drafts` tells the agent to run a short gap check (hover/focus, mobile frame, button styles, real copy vs lorem) and list misses in the chat **before or with** the draft. You can reinforce it in the first prompt: “Before you write Bricks, list Figma gaps (hover, mobile, buttons, copy), then draft the hero.” You then choose: leave it, add it in Figma, or implement a default in Bricks on purpose. What we are preventing: a made-up hover sold as “from Figma.”

3. **Read Bricks first.** Use Bricks MCP to list existing global classes, variables, palettes, and `mns` tokens on **this** local/staging site.

   **Ideal:** Figma uses the **same names** as ElevateX / Bricks (`mns-role-primary`, and so on). Treat Bricks as the source of the name list — export from Bricks → Variables if that helps designers, or just name Figma variables to match. Then the agent binds like-for-like and does not have to guess.

   **Fallback (usual today):** names drift. The agent maps Figma’s *look* onto the existing Bricks key (Figma `--primary-color` → Bricks `--mns-role-primary` if that is the same role). It should not rename Figma, and it should not create `--primary-color` in Bricks. If nothing matches, stop and ask.

   Official Bricks skills already say inspect-before-create; do not skip this.

4. **Draft in Bricks** via MCP.
   - Structure follows the Figma frame.
   - Color, type, and spacing come from **existing** classes and variables only.
   - Prefer native Bricks elements. Use an ElevateX custom element only when that pattern already exists in the theme (FAQ is planned; it is not in ElevateX yet).

5. **Stop and ask** if the design needs a class or token the live site does not have. Do not invent one.

6. **Human in the builder.** Open the section in Bricks. Check responsive, heading hierarchy, hover/focus, and accessibility. Fix what the agent got wrong. Do not rubber-stamp the MCP write.

7. **QA on the front end.** Compare to Figma, and allow for gaps that were already in the file. Buttons must be buttons; copy must be HTML text, not only in an image. Do not add JSON-LD in Bricks. If this is a money page, the first screen should still pass [08](08-client-citeability.md).

---

## Drafting rules (also in the Cursor skill)

- Use existing global classes and Bricks / ElevateX variables. Do not invent a class or token without asking.
- Semantic HTML: real headings, buttons, lists, labels. No `div` used as a button.
- Do not dump page-level CSS when a variable or class already exists.
- Do not print `<script type="application/ld+json">`. Schema stays in Yoast / ElevateX, not in this draft.
- Each MCP write is one section (or a small cluster you named). The Figma context can be the whole page Frame.
- If Figma token *names* and Bricks *names* disagree, **Bricks wins**. Map the Figma value onto the existing Bricks key and note the drift. Do not create a second token just to match Figma’s name.

---

## Done means

The section you asked for exists in Bricks on local or staging, a human has opened it, and leftover Figma gaps (mobile, buttons, missing tokens) are listed in the project — not silently “finished” by the agent. Repeat until the page is done.

---

## Practice files (optional, known-incomplete)

These are files we can use to rehearse the loop. They are **not** AI-readiness case studies and they are not required on a client job.

- [WCS 2026 Redesign](https://www.figma.com/design/WDZuMgX6wyAL9uH60k7vmp/WCS-2026-Redesign?node-id=2001-4149) — incomplete (some mobile and button styles missing). Trust the **live site’s** `mns` variable names over the file.
- [Lightenco Theme](https://www.figma.com/design/MgRb1VWi78Zegzz7iHqplF/Lightenco-Theme?node-id=0-1) — some variable names may be stale. If Figma and the site disagree, the site wins.
