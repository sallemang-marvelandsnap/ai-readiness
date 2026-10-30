# WordPress AI-readiness checklist (draft)

**Stack:** Bricks 2.4+ + ElevateX + Yoast.  
**Pass / fail / n/a** + owner. Holes marked *confirm on live audit* until we have run the pilot set.

**Pilot set:** [WCS Pantheon](https://redesign-wesleycloverservices.pantheonsite.io/), [OpenSpace](https://www.openspace.ai/), [March Networks Pantheon](https://q32026-marchnetworks.pantheonsite.io/), [Accela](https://www.accela.com/).

**Pantheon note:** Non-live Pantheon envs often `Disallow: /` for all user-agents. That is expected. Do not fail a *multidev/test* site for blocked crawlers. Fail it on **live** if production still blocks retrieval bots.

---

## Access — owner: dev / SEO

- [ ] Live `robots.txt` does **not** block `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Bingbot`.
- [ ] Training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) are allowed unless the client opted out.
- [ ] Cloudflare / bot-fight is not silently blocking those user-agents. *Confirm on live audit (server logs or CF rules).*
- [ ] One `robots.txt` source: Yoast file editor **or** ElevateX `robots_txt` filter — not both (a physical Yoast file ignores the filter). *Confirm which OpenSpace/Accela use.*
- [ ] Sitemap exists and is submitted to **Google Search Console and Bing Webmaster Tools**.

**Seen already:** OpenSpace lists the AI bots and a `Content-Signal`. Accela is default WP (`Disallow: /wp-admin/` only). WCS and March Networks Pantheon are `Disallow: /` (env, not a production fail).

---

## Discoverability / `llms.txt` — owner: SEO / content

- [ ] Yoast `llms.txt` is **enabled**.
- [ ] **Manual page selection** of ~10–30 money pages (home, platform/product, solutions, about). Path: Yoast SEO → Settings → Site features → AI tools → llms.txt → Customize llms.txt file → Manual page selection. Not Yoast’s auto “5 latest per type.”
- [ ] Each link has a real description (Yoast meta description). Empty lines usually mean Bricks `post_content` is empty — fix with meta + `wpseo_llmstxt_link_description`, not another plugin.
- [ ] No password-protected, noindex, or “hide from archive” URLs.
- [ ] File is current (quarterly refresh with the money pages).

**Seen already:** OpenSpace is a **curated** example (platform / products / audiences). Accela is **Yoast auto** (v28.7): latest pages, posts, events, categories — present, not curated. Prefer the OpenSpace shape.

Google Search **ignores** `llms.txt`. We still ship it as cheap hygiene. Do not sell it as a ranking lever.

---

## Facts / schema — owner: dev / SEO

- [ ] Yoast Organization on home/About: `@id` matches the home URL; `sameAs` is complete.
- [ ] Brand and product names are consistent (no “OpenSpace Track” vs “OS Track” split).
- [ ] Article / BlogPosting on editorial; FAQPage only where visible Q&A exists; HowTo only on real steps.
- [ ] Leadership / team / products / services / events: one-page-only = Bricks card grid; reused = CPT + ACF. **Schema only on the single** (or once on About if the grid never leaves that page). Cards and “related” blocks are display-only. See [08](08-schema-data-and-cards.md).
- [ ] **One `@graph`.** View source: a single Yoast JSON-LD block. Fail if a Bricks card or element prints its own `<script type="application/ld+json">`.
- [ ] Schema matches visible text (Google’s bar).
- [ ] Validate a sample in Rich Results Test. *Confirm conflict patterns (Yoast + Bricks + ACF) on live audit.*

---

## Citeability / HTML — owner: content / dev

On each money page:

- [ ] First 2–3 paragraphs state what the thing is or what they do (CXL: most AI Overview citations come from the first 30%).
- [ ] Claims are self-contained sentences (“Pricing starts at…” not “it’s affordable, as above”).
- [ ] Critical copy is in the **rendered HTML**, not a background image or JS-only drawer. Extra Bricks wrappers are OK.
- [ ] Headings, lists, and tables are real elements.
- [ ] One canonical URL; trailing slashes consistent.

---

## Accessibility / agent UX — owner: dev / QA

- [ ] Buttons are `<button>` (or links that are links), not `div`s.
- [ ] Form labels map to inputs.
- [ ] Menus, dialogs, and accordions are in the accessibility tree.
- [ ] No CLS traps (reserved image/font space). Existing CWV work counts.
- [ ] ElevateX / Bricks kit gaps logged, not a generic “page builder” note. *Confirm on WCS (correct `mns` variables) vs older Accela/OpenSpace.*

---

## Studio MCP (staging only) — owner: dev — n/a on production

- [ ] MCP Adapter + Bricks → AI **off** on live.
- [ ] If staging is used for Figma → Bricks drafts: dedicated Application Password user; password not in repo.

---

## Measurement (if in scope) — owner: SEO / PM

- [ ] GSC Generative AI performance report (live sites). This is the Google number.
- [ ] GA4 referrers for AI chat domains (`chatgpt.com`, `perplexity.ai`, `gemini.google.com`, etc.). Sessions only — under-counts zero-click.
- [ ] Citation baseline: 20–50 prompts, AI Overviews + ChatGPT first. *Not yet run on this pilot set.*
- [ ] Paid visibility tool only if the engagement includes a monthly scorecard. Do not build an M&S tracker.

---

## Optional cross-check (do not sell the score)

isitagentready, agentchecker, or Lighthouse Agentic Browsing — note only.
