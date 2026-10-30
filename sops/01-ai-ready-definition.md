# What “AI-ready” means (one page)

**Marvel & Snap — internal.** SEO is the eligibility layer. AI-ready is extra capabilities on top. We do not promise rankings in ChatGPT.

**Stack:** WordPress = Bricks 2.4+ + ElevateX + Yoast. Shopify = Catalog / Agentic Storefronts (platform), not a custom app.

---

## The stack

- **Access** — Training bots and live-retrieval bots are different. Wrong `robots.txt` or CDN rules can erase citations. Never block live retrieval (`OAI-SearchBot`, `ChatGPT-User`, Claude/Perplexity search and user bots, Bingbot) if the client wants to appear in AI answers. Training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`) are allowed unless the client opts out.
- **Facts** — Complete, consistent attributes in **one Yoast `@graph`**. Schema is for rich results and entity clarity, **not** a proven AI-citation lever. Yoast is the **output channel**, not the CMS for leadership grids, product cards, or events. Data lives in ACF / CPTs / Shopify; we stitch it into Yoast. Never a second JSON-LD script from Bricks.
- **Citeability** — Answer-first copy, self-contained claims, real HTML text. Models lift early, extractable sentences — not “as we mentioned above.” Bricks extra wrappers are fine; text-in-image or JS-only answers are not. We do **not** generate Markdown clones of every page (Google ignores them; leak/freshness risk). Curated Yoast `llms.txt` is the index.
- **Agent commerce (ecom)** — Shopify Catalog / product completeness / Agentic Storefronts. Shopify already ships `/agents.md` and UCP/MCP on modern stores. We do not build a shopping-agent app or MCP Server Cards on brochure sites.
- **Measurement** — Mentions and citations in AI answers, plus the clicks we can see. **Do not build an M&S visibility product.** Use GSC’s Generative AI report, GA4 AI referrers (under-counts zero-click), a monthly prompt spreadsheet, and **one** paid tool only when a retainer includes a scorecard.

Google is index-grounded and **ignores `llms.txt`**. ChatGPT and Perplexity use their own crawlers. One checklist cannot pretend those are the same system.

---

## Two tracks (do not mix)

- **Track A — Client site** — Crawlers, citeable pages, Yoast graph + `llms.txt`, Shopify product facts. This is what we sell as eligibility and clarity.
- **Track B — Studio** — Figma → Bricks section drafts via MCP on **local/staging only**. Production MCP stays off.

---

## Content types (B2B / B2C we actually ship)

**Every site (Yoast settings, not a new element):** Organization + `sameAs`, WebPage, Breadcrumb, Article/BlogPosting on editorial.

**ElevateX elements (visible HTML + Yoast piece, same data):** FAQ first; then lede/answer-first; HowTo/steps; comparison table; Review/Offer only if a vertical repeats it.

**CPT + ACF + Bricks single + dumb card — enable per site, not a plugin per type:** Person/Team (About leadership grids — Yoast does **not** invent these), SoftwareApplication / Product, Service, Event. Pattern: [08 — data, cards, one graph](08-schema-data-and-cards.md).

**Not ElevateX products:** `Speakable`, FAQ schema on every page, a “Software” brick that embeds its own JSON-LD.

---

## Default vs extra

**On every WP launch**

- Retrieval bots allowed (and training bots unless opted out)
- Yoast Organization + `sameAs`
- Yoast `llms.txt` **on**, **manual** money pages (~10–30), descriptions from Yoast meta (Bricks `post_content` is often empty)
- Sitemap in Google **and** Bing
- Semantic HTML; answer in the first 2–3 paragraphs on money pages
- GSC Generative AI report + GA4 AI referrers if the site is live and in scope

**Only when the page or vertical needs it**

- ElevateX FAQ (then lede / HowTo / comparison)
- A flagged CPT kit (Team, Product/Software, Service, Event) — cards reuse, schema only on the single
- Citeability rewrite
- Shopify Catalog mapping / GTIN / shipping / returns
- Internal citeability URL check (rendered HTML, first 30%) — later, not a sold plugin
- Paid AI-visibility tool — only with a reporting retainer

**Not default**

- MCP Adapter or Bricks AI on production
- Second `llms.txt` plugin, site-wide Markdown dumps, MCP Server Cards, A2A, Markdown negotiation
- A plugin library per content type
- “We’ll rank you in ChatGPT”
