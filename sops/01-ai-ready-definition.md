# What “AI-ready” means

**Marvel & Snap — internal.** Use this when scoping a site or deciding whether to add a plugin. Step-by-step checks: [03 — WordPress](03-wp-ai-readiness-checklist.md), [06 — Shopify](06-shopify-product-data-checklist.md). Do **not** send this file to clients. Writers get [08](08-client-citeability.md).

We make pages **eligible** to be crawled, understood, and quoted. We do **not** promise rankings in ChatGPT or Google AI answers.

**Stack:** WordPress = Bricks 2.4+ + ElevateX + Yoast. Shopify = Catalog / Agentic Storefronts (Shopify’s platform). We do not install extra “AI SEO” plugins or apps on a standard build.

---

## Who does what

- **Dev / site-admin** — crawlers, Yoast (or theme schema on Shopify), ElevateX elements, CPT kits, Catalog eligibility.
- **SEO / PM** — money-page list, `llms.txt` curation, Search Console / Bing, measurement.
- **Client / writers** — the sentences on money pages. Give them [08](08-client-citeability.md) at kickoff or with a content workshop. Do not send this definition or [07](07-schema-data-and-cards.md).

**Money pages** = home, product/platform, solutions, About, and any URL the client would be unhappy to lose.

---

## The five capabilities

These are the product. SEO (titles, sitemap, crawlability) is the eligibility layer underneath.

### 1. Access — can AI systems fetch the live page?

Two kinds of bot. Do not treat them as one switch.

- **Live retrieval** (answers and citations *now*): `OAI-SearchBot`, `ChatGPT-User`, Claude/Perplexity search and user bots, `Bingbot`. **Never block these** if the client wants to appear in AI answers. A wrong `robots.txt` or CDN bot-fight rule can wipe citations.
- **Training** (future model weights): `GPTBot`, `ClaudeBot`, `Google-Extended`. **Allow unless the client opts out.**

Google is grounded in its own index and **ignores `llms.txt`**. ChatGPT and Perplexity use their own crawlers. One checklist cannot pretend those are the same system.

### 2. Facts — one official record, one schema packet

Structured data (schema / JSON-LD) helps rich results and entity clarity. It is **not** a proven “get cited in ChatGPT” lever.

On WordPress, **Yoast prints one `@graph`** (one JSON-LD packet) in the page source. That is the only schema output.

A lot of that packet already lives in **Yoast and site settings** — Organization, `sameAs`, titles, descriptions, Article, breadcrumbs, the post author. Fill those there.

What we bolt on is **bespoke or enriching**: leadership grids, product/service/event records, FAQ fields Yoast has no screen for. *That* data lives in ACF / CPTs (or Shopify on ecom). We stitch it *into* Yoast’s graph with a small ElevateX PHP bridge on Yoast’s Schema API (`wpseo_schema_graph_pieces` / `wpseo_schema_graph`) — Yoast is still the printer for those extras, not their CMS. How: [07](07-schema-data-and-cards.md). Never add a second `<script type="application/ld+json">` from a Bricks element or another plugin.

### 3. Citeability — sentences a model can lift

Models quote **early, complete sentences in the HTML** — usually the first two or three paragraphs. “As we mentioned above” and text trapped in an image or a JS-only widget do not get used. Extra Bricks wrappers around real text are fine.

**Clients write most copy.** We do not generate a Markdown clone of every page (Google ignores those files; they go stale and leak drafts). On WordPress, a **manually curated Yoast `llms.txt`** (about 10–30 money pages) is cheap hygiene — Yoast already has the UI, so we use it. On Shopify, **skip `llms.txt` unless someone asks**: Shopify does **not** generate one, and the file is low-value there (Google ignores it; Catalog + PDP HTML are the product index). Do not buy a generator app to recreate Yoast’s screen.

### 4. Agent commerce — Shopify only

Shopify already ships `/agents.md`, UCP/MCP, and Catalog / Agentic Storefronts. We do **not** build a shopping-agent app or MCP Server Cards. We still do the work Yoast would have done on WordPress: complete product facts, theme Product/Organization schema, citeable PDP copy, Catalog eligibility. Details in [Shopify vs WordPress](#shopify-vs-wordpress) and [06](06-shopify-product-data-checklist.md).

### 5. Measurement — mentions, plus the clicks we can see

Do **not** build a Marvel & Snap visibility product. Use Google Search Console’s Generative AI report, GA4 AI referrers (this under-counts zero-click answers), a monthly prompt spreadsheet, and **one** paid tool only when a retainer includes a scorecard.

---

## Two tracks (do not mix)

- **Track A — the live client site.** Crawlers, citeable pages, Yoast graph + `llms.txt`, Shopify product facts. This is what we sell.
- **Track B — how we build.** Figma → Bricks section drafts via MCP on **local/staging only**. Production MCP stays off. That is a studio workflow, not an AI-search feature. See [02](02-studio-mcp-onesheet.md).

---

## WordPress — what to turn on vs what to build

This section is **WordPress only**. For a Shopify store, skip to [Shopify vs WordPress](#shopify-vs-wordpress) — do not register WordPress product post types.

### On every WordPress site (Yoast settings — no new ElevateX element)

In Yoast, confirm Organization (name, logo, `@id` = home URL) and fill **`sameAs`** (LinkedIn, Wikipedia, social profiles — the official “this org is the same as these URLs” list). Yoast already emits WebPage, Breadcrumb, and Article/BlogPosting on editorial. Turn those on and fill them. Do not invent a custom element for this.

Also every launch: retrieval bots allowed; Yoast `llms.txt` **on** with those same ~10–30 URLs picked by hand (not the auto list); sitemap in Google **and** Bing; answer in the first 2–3 paragraphs on money pages; GSC + GA4 if the site is live and in scope.

### Extra blocks on a page (ElevateX elements)

FAQ, HowTo, comparison, and Review/Offer will be **custom Bricks elements**, written once in the ElevateX child theme (not a one-off on a single client, not a plugin). None of them exist yet. Each should print visible HTML *and* feed the matching piece into Yoast from the **same fields**. The lede is **not** one of these — it is citeable copy, so a Bricks component (or a text block + global class) is enough.

**On a site:** drop an element onto a page only when that page needs it. You do not add them to every URL.

**In ElevateX:** draft the whole set in the theme. An options-panel setting (or `theme.config.json`, same idea as the CPT kits) can enable or disable which elements register on that install — so a brochure site does not get Review/Offer in the Bricks picker. The panel does not have to exist on day one; that is the intended switch. Until it does, register only what the project will use.

**When to use one on a client page**

- **FAQ** — the page has real questions and answers the client wants visible. Do not add FAQ schema with no Q&A on the page, and do not drop FAQ on every URL “for SEO.”
- **HowTo** — the page is a real procedure with numbered steps. Do not mark a marketing page as HowTo.
- **Comparison table** — there is a real side-by-side comparison, not fake comparison markup.
- **Review / Offer** — this vertical repeats reviews or offers (e.g. commerce), and any ratings in schema are also visible on the page.
- **Lede / answer-first** — a visible opening sentence that says what it is, in HTML (not only in the hero). Example: “Northwind is construction software for industrial contractors.” **Not a custom element** — a Bricks component or text block is enough; there is no Yoast graph piece to justify PHP. Yoast’s description can reuse those words for snippets / `llms.txt`; it does not replace on-page text. Do not hide it for bots (cloaking). [08](08-client-citeability.md).

**When we write those elements in ElevateX (theme work, not page order)**

Build in this order because it is how often they recur — **not** the order they appear on a page:

1. **FAQ first** — most common extra; Q&A block + Yoast FAQ piece.
2. **Then HowTo, then comparison** — only after a project keeps needing that layout.
3. **Review / Offer last** — only if a vertical repeats it.

The lede is a **reusable Bricks component** (or just the first paragraph), not an item on this PHP list.

A page can have a lede and no FAQ. A page can have FAQ and no HowTo. “FAQ first” means **we implement the FAQ element first**, not “every page starts with an FAQ.”

### People, products, services, events (CPT kits — only if they repeat)

Yoast will output Organization and a blog *author*. It will **not** notice a Leadership grid or a product card you built in Bricks. Pattern: [07](07-schema-data-and-cards.md).

**Do this**

- Appears on **one page only** (six board members, only on About) → Bricks grid of Team Cards. No Team post type, no ACF repeater. If Person belongs on that page (people are visible), the card or its Yoast hook appends Person from the same fields — same pattern as FAQ. Details: [07](07-schema-data-and-cards.md).
- The **same** person/product/service/event appears in more than one place → turn on that ElevateX **kit** (CPT + ACF + Bricks single + post card + Yoast bridge). The teaser card is heading, image, excerpt, and a link to the official URL. Schema only on the single.

**Kits we may wish to support, flagged per site:** Team/Person, Product or SoftwareApplication, Service, Event.

### Do not build in ElevateX

* `Speakable` (Schema.org / Google markup that flags sentences for Assistant text-to-speech — not ChatGPT, and not a citation lever). 
* FAQ schema on every page. 
* A “Software” brick that dumps its own JSON-LD. 
* A plugin per content type.

---

## Shopify vs WordPress

Shopify already covers **access-for-agents** and a **product index**: default `robots.txt` is usually `Allow: /`, sitemap is automatic, `/agents.md` + UCP/MCP are hosted, Catalog is the product feed. **Do not install an “AI SEO” or MCP Shopify app** to recreate that.

What Yoast gives us on WordPress that we still **do ourselves** on Shopify (theme, metafields, admin — not a new app):

- **Organization + `sameAs`** — often missing. Add via theme JSON-LD or brand settings.
- **Product graph completeness** — Dawn-like themes emit a basic Product. Check brand, GTIN/barcode, offers, availability, ratings, shipping/returns. Legacy PDPs mixed with new templates are the usual fail.
- **`llms.txt`** — no Yoast UI. **Not required.** Catalog + PDP HTML matter more. Add a theme-root file only if we want the same cheap hygiene as WP; do not buy a generator app.
- **Money-page / PDP copy** — native Shopify SEO title and description + citeable first lines in the product description ([08](08-client-citeability.md)).
- **Article / page schema** — blog and landing templates; fix in the theme if missing. Still one graph — no duplicate schema apps.

Shopify-only (no Yoast analog): **Agentic Storefronts / Catalog eligibility** in admin, metafields as structured facts, attribution if those channels are on.

---

## Default vs extra

**On every WordPress launch**

- Retrieval bots allowed (training bots allowed unless the client opted out)
- Yoast Organization + `sameAs`
- Yoast `llms.txt` on. Path: **Yoast SEO → Settings → Site features → AI tools → llms.txt** → **Customize llms.txt file** → **Manual page selection** → add ~10–30 money URLs (home, product/platform, solutions, About). Do not leave the auto “latest 5 per type.” Each needs a Yoast meta description (Bricks `post_content` is often empty). This is the `llms.txt` index, not a separate content audit. [Yoast’s steps](https://yoast.com/help/enable-llmstxt/).
- Sitemap in Google **and** Bing
- Semantic HTML; answer in the first 2–3 paragraphs on money pages
- GSC Generative AI report + GA4 AI referrers if the site is live and in scope
- Hand the client [08](08-client-citeability.md)

**On every Shopify launch**

- Production crawlable; do not fight Shopify’s `robots.txt` unless a rule blocks retrieval
- Catalog / Agentic Storefronts eligible (or a written reason why not)
- Sample PDPs on **new and legacy** templates: citeable first lines; brand; GTIN; shipping/returns; ratings only if visible
- Theme Product JSON-LD includes those facts; no duplicate Product graphs
- Organization / brand `sameAs` present
- Sitemap in Google **and** Bing
- Hand the client [08](08-client-citeability.md) for product copy
- GSC + GA4 AI referrers if live and in scope
- **Skip unless asked:** `llms.txt`, extra SEO/AI apps, custom MCP

**Only when that page or vertical needs it**

- ElevateX **FAQ** on pages that actually have Q&A (then HowTo / comparison when those layouts exist and recur); a lede component or first paragraph on money pages if the hero is not already citeable
- A flagged CPT kit (Team, Product/Software, Service, Event) — cards reuse; schema only on the single
- A citeability rewrite of money-page copy, plus a 15-minute workshop if they want one (not a video course)
- An internal citeability URL check (rendered HTML, first 30%) — later, not a sold plugin
- A paid AI-visibility tool — only with a reporting retainer

**Not default — do not sell or install**

- MCP Adapter or Bricks AI on production
- A second `llms.txt` plugin, site-wide Markdown dumps, MCP Server Cards, A2A, Markdown negotiation
- A Yoast-equivalent or “AI SEO” Shopify app
- A plugin library per content type
- “We’ll rank you in ChatGPT”
