# AI-readiness: proposed next moves

**For:** Marvel & Snap (steward ticket + August notes + Oct 2026 stack changes)  
**Stack:** WordPress = Bricks + ElevateX child theme + Yoast. Shopify = Catalog / Agentic Storefronts, not a custom app.  
**How to use:** This is the digest. Build the one-sheets and SOPs listed at the end; do not wait for emerging-protocol research.

---

## Two tracks (do not mix them)

The August notes parked MCP because it meant “put an MCP Server Card on the client’s public site so ChatGPT cites them.” That is still **not** default brochure-site work.

What changed is a **second, more useful MCP**: tools *we* use in design, development, and QA.

- **Track A — Client-site AI-readiness** (the original ticket)  
  Crawlers, citeable HTML, Yoast schema/`llms.txt`, Shopify product facts, checklists, education, sellable add-on.

- **Track B — Studio MCP** (your supplement)  
  The main loop: **design in Figma → generate Bricks section drafts via Bricks MCP**, constrained by our best practices (existing global classes, Bricks and ElevateX variables, semantic HTML). Figma MCP in Cursor supplies the design context; Bricks MCP writes the draft on local/staging. Humans review in the builder. Same connection is also used for inspect-only QA.

Track B makes Track A faster (more consistent sections, fewer one-off styles). It does not replace Track A. Do not sell “we installed MCP, therefore you rank in ChatGPT.”

---

## What is actually true in late 2026

- **WordPress:** Abilities API is in core (6.9+). [MCP Adapter](https://wordpress.org/plugins/mcp-adapter/) is the canonical plugin (WordPress AI team, on .org as of Oct 2026). Endpoint: `/wp-json/mcp/mcp-adapter-default-server`. Automattic’s old `wordpress-mcp` repo is **deprecated** — do not use it. Adapter is infrastructure, not a chatbot.
- **Bricks 2.4:** Official **AI Abilities** register Bricks actions with the Abilities API. Setup is **Bricks → AI**, which installs/activates MCP Adapter and hands you client config (`npx @automattic/mcp-wordpress-remote`). Bricks itself says: **experimental; local/staging only; keep off production.**
- **Figma:** We do not install anything Figma-related on client sites. Designers work in Figma as today. In Cursor, Figma MCP **reads** the file/frame; Bricks MCP **writes** a section draft on the local/staging site. That pair is the implementation path, not a client-site feature.
- **Shopify:** Storefront MCP (`/api/mcp`) and UCP Catalog MCP (`/api/ucp/mcp`) are **Shopify-hosted**. Agentic Storefronts / Catalog is a **sales channel + product data**, not an app we build. No custom Shopify app unless a client is literally commissioning a shopping agent.

ElevateX (`elevatex` Bricks branch) already has the right hooks: empty custom-element registry in `inc/bricks/elements.php`, and `inc/hooks/` for theme-level PHP. No AI/crawler/schema code there yet.

---

## Where code should live

**Prefer official plugins + ElevateX. Do not invent a public “M&S AI” plugin.**

- **`mcp-adapter` (plugin)** — install on **local and staging** when we want studio MCP. Not a production default while Bricks marks abilities experimental. Production later only with a written security SOP (dedicated Application Password user, least privilege, off on live until Bricks says otherwise).
- **Yoast (already standard)** — `llms.txt`, Organization, `@graph`. Extend with filters. No Rank Math / AIOSEO / AI Ready WP / second `llms.txt` generator.
- **ElevateX child theme** — this is the AI toolbox for *every* WP site:
  - `inc/hooks/ai-readiness.php` (or similar): `wpseo_llmstxt_link_description` (Bricks empty `post_content` → Yoast meta description); optional `robots_txt` **or** a documented Yoast file-editor snippet (not both); never a second JSON-LD script.
  - `inc/bricks/elements/` — FAQ first (visible semantic Q&A + Yoast `wpseo_schema_graph_pieces`). Later: HowTo, lede/answer-first, comparison table.
  - Optional later: register a few **M&S Abilities** (e.g. “list pages missing meta description,” “export FAQ pairs”) so Track B agents can QA our conventions. That belongs in the theme only after MCP Adapter is a known staging tool.
- **Bricks → AI (core Bricks, not ElevateX)** — enable abilities on local/staging; install official Bricks skills into Cursor. Do **not** add the third-party `bricks-mcp` plugin if official 2.4 abilities cover the job.
- **Shopify** — no app. Product metafields / Catalog mapping / Agentic Storefronts eligibility in admin. Theme schema gaps (`brand`, GTIN, ratings, shipping/returns) stay an audit checklist.
- **Figma** — stays the design source. No client-site install. A Cursor **skill / rule** should encode M&S Bricks drafting rules (classes and variables first, no new tokens without asking, no extra JSON-LD). Code Connect is optional later, not required to start.

---

## Proposed work (actionable)

### 1. Policies (locked 2026-10-30)

1. **Production MCP:** Off on live. On for local + staging only.
2. **Crawlers:** Always allow live-retrieval bots. Allow training bots unless the client opts out.
3. **`robots.txt` path:** Still pick one implementation after a Yoast-on-Bricks spike (physical Yoast file vs `robots_txt` filter). Policy is not blocked.

**Norm:** ElevateX Bricks branch, Bricks 2.4+, WordPress 6.9+ (or latest).

**Pilot WP:** [WCS Pantheon](https://redesign-wesleycloverservices.pantheonsite.io/) (`mns` variables), [OpenSpace](https://www.openspace.ai/), [March Networks Pantheon](https://q32026-marchnetworks.pantheonsite.io/), [Accela](https://www.accela.com/).  
**Pilot Shopify:** [Baffin](https://www.baffin.com/).  
**Pilot Figma:** [WCS 2026](https://www.figma.com/design/WDZuMgX6wyAL9uH60k7vmp/WCS-2026-Redesign?node-id=2001-4149) (incomplete), [Lightenco](https://www.figma.com/design/MgRb1VWi78Zegzz7iHqplF/Lightenco-Theme?node-id=0-1) (names may be stale).

**Drafts started** in [`sops/`](sops/) (including [08 — data, cards, one graph](sops/08-schema-data-and-cards.md)) and [`.cursor/skills/figma-to-bricks-drafts/`](.cursor/skills/figma-to-bricks-drafts/).

### 2. Track A — close the ticket (the original job)

Still required; MCP does not finish this.

**Research (short, then stop):**

- Official bot docs (OpenAI / Anthropic / Perplexity / Apple) → fill the policy in item 1.
- Google [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).
- Shopify four articles → product-data checklist (headlines are not enough).
- Hands-on Yoast on one ElevateX/Bricks site: manual `llms.txt`, leak check, empty descriptions.
- Audit 3–5 live WP + 2–3 Shopify; citation baseline on 1–2 willing clients.

**Ship to the team (this is “ticket done”):**

- 1-page definition of “AI-ready”
- WP audit checklist (pass/fail + owner)
- Shopify product-data checklist
- Crawler policy SOP
- Schema / entity SOP (Yoast as sole `@graph`)
- `llms.txt` SOP (Yoast-only; don’t oversell)
- Writer citeability one-sheet
- Lunch-and-learn + a proposal add-on (Audit → Fixes → Monitoring)

**ElevateX build (after the Yoast spike, not before):**

- `inc/hooks/ai-readiness.php` table-stakes
- FAQ element in `inc/bricks/elements/`

Suggested first artifact: **WordPress AI-Readiness Checklist**, holes labeled “confirm on live audit.”

### 3. Track B — studio MCP SOPs (your supplement)

These are **internal** how-we-work docs, not client-facing GEO.

**B1. Studio MCP setup (dev)**  
One sheet: WordPress 6.9+, MCP Adapter, Bricks → AI, Application Password on a dedicated *staging* user, Cursor config via `@automattic/mcp-wordpress-remote`, official Bricks skills, Figma MCP pointed at the project file. Production stays off.

**B2. Figma → Bricks section drafts (the headline workflow)**  
This is the SOP I underweighted before. It is how we want implementation to start, not a nice-to-have.

1. Designer finishes a frame (or a clearly marked section) in Figma.
2. Dev (or design-dev) opens Cursor with **both** MCPs: Figma (read that frame) and Bricks (local/staging site).
3. Agent **reads the Bricks design system first** — global classes, variables, color palettes, ElevateX/theme tokens. Official Bricks skills already push “inspect before you create.”
4. Agent drafts the section in Bricks: structure from the Figma frame, styling from **existing** classes and variables only. Prefer native Bricks elements; use ElevateX custom elements (FAQ, etc.) when the section is that pattern.
5. Human opens the builder: spacing, hierarchy, responsive, a11y. Agent output is a **draft**, not a ship.
6. QA diffs the front end against the Figma frame (Figma MCP again) and against Track A rules if it is a money page (answer-first, real HTML text, no extra JSON-LD).

**Drafting rules to encode in a Cursor skill (and paste into the SOP):**

- Use existing global classes and Bricks / ElevateX variables. Do not invent a class or token without asking.
- Semantic HTML: real headings, buttons, lists, labels. No `div` buttons.
- No page-level CSS dump when a variable or class exists.
- No `<script type="application/ld+json">`. Schema stays in Yoast / ElevateX elements.
- Match the Figma section, not the whole page, unless asked.
- If the design needs a token we do not have, stop and propose it; do not silently create one.

**B3. Other Bricks-ability work**  
Same guardrails for non-Figma tasks: convert HTML → Bricks, Woo templates, template edits. Forbidden: duplicate global classes, write to live, skip the builder review.

**B4. QA with MCP (content, code, a11y)**  
Agent-assisted, human-signed:

- Front-end HTML contains the answer (not image-only / JS-only)
- One Yoast `@graph`; FAQ visible text matches schema
- `llms.txt` present, curated, no private/noindex URLs
- Retrieval bots allowed; Cloudflare bot-fight not blocking them
- Buttons are buttons; labels mapped; no layout-shift traps
- Shopify: brand, GTIN, ratings, shipping/returns, Catalog eligibility

Use Bricks/WP abilities to *list and inspect*. Use Figma MCP to *diff against the file*. Do not treat Lighthouse Agentic Browsing or isitagentready scores as client deliverables.

**B5. Security / QA gate**  
Application Passwords are credentials. Store in 1Password, not repo. Staging user only. Disable Bricks AI on production. Revoke the password when the engagement ends.

---

## What I would *not* do

- Custom WordPress.org plugin or Shopify app for “AI-ready”
- MCP Server Cards, A2A `agent.json`, OKF, WebMCP widgets, `llms-full.txt` on brochure sites
- Third-party Bricks MCP plugins while official 2.4 + `mcp-adapter` exist
- Selling MCP or `llms.txt` as a Google ranking lever
- Waiting for MCP-in-core before writing Track A SOPs (adapter is canonical enough)

---

## Questions for you (only these block writing)

1. Confirm ElevateX **Bricks branch** is what new WP projects get, and typical Bricks version is **2.4+**.
2. Typical client WP version — **6.9+** (required for MCP Adapter) or do we still have 6.8 holds?
3. Production MCP: **off** (recommended) or do you want a staging-only rule in writing for the team now?
4. Who is the first live audit set (3–5 WP, 2–3 Shopify)? Name them when you can.
5. Figma: is there a **standard M&S library / variable set** the Bricks draft agent must prefer, or is it per-client files (and per-site Bricks classes) only?

Everything else can default as above.

---

## Research I can do next (ask if you want it)

- Hands-on: Figma frame + Bricks → AI + MCP Adapter + Cursor on local ElevateX — one section draft, then write B2 from what actually works.
- Hands-on: Bricks → AI setup SOP (credentials, Cursor config, skills) from a real local site.
- Read Shopify Catalog / Agentic Storefronts admin path and turn it into the product-data checklist.
- Spike the FAQ element + Yoast graph piece in ElevateX (code, not just a spec).
- Draft the WP audit checklist from the notes, with MCP QA steps as an optional column.

---

## Bring this to the team this month

1. This proposal (10 minutes): two tracks, no overclaim.
2. One-sheets: “AI-ready in one page” + “Studio MCP: local/staging only.”
3. SOP: **Figma → Bricks section drafts** (B2) + a Cursor skill with the drafting rules.
4. Checklist: WP AI-readiness (dev/SEO/content/QA owners).
5. ElevateX spike plan: hooks + FAQ element.
6. Add-on language: eligibility, clarity, measurement — not ChatGPT rankings.

I can start on items 2–4 in this folder as soon as you answer the five questions (or tell me to assume the defaults).
