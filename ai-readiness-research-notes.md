# AI-Readiness Research Notes

**Internal working document — Marvel & Snap**  
Organized from research notes collected while working through the AI-readiness stewardship brief. WordPress-first, Shopify-second. Emerging protocols and extra context live in the appendices.

**How to use this:** Sections 1–9 are what we can apply on client sites now. Section 10–11 are the audit and measurement loop. Appendices are watch-list / nice-to-have, not default scope.

---

## 1. Highest return for our work

Of everything in the agent-ready stack, **five items give the most defensible return per minute of effort**. For a typical M&S WordPress or Shopify build, treat the first four as default; treat the fifth as optional depending on site type.

- **1. AI bot rules in `robots.txt`** (~5 min) — Controls who can crawl the site. Skipping this is the loudest way to be invisible in AI answers.
- **2. `llms.txt`** (~30 min) — Cheap to ship. Perplexity and Claude (by their own statements) check for it; Chrome Lighthouse now expects it. Does **not** guarantee citations. Google Search ignores it. Cost of being wrong is ~zero.
- **3. Semantic HTML + accessibility** (variable effort) — Already part of our process. Overlaps traditional SEO/UX. Ship it regardless. Watch for gaps in Bricks and the Shopify starter.
- **4. Sitemap + canonicals** (~15 min if missing) — Table stakes for discoverability. The “agent upgrade” (Link headers) is optional; see §7.
- **5. Markdown negotiation *or* MCP** (optional) — Pick based on site type. Content/marketing sites benefit more from Markdown negotiation. Tool-rich apps/dashboards benefit more from MCP/WebMCP. Most M&S client sites are the first kind — and this is still emerging. Details in [Appendix A](#appendix-a-emerging-agent-protocols).

**Two-layer model of agent-readiness** (from [How to make a website agent-ready](https://suganthan.com/blog/how-to-make-website-agent-ready/)):

1. **Page structure** — semantic HTML, stable layout, ARIA, accessibility primitives, the rendered DOM. This is already our process, aside from any a11y gaps we find in Bricks or the Shopify starter.
2. **Protocol-level surface** — everything discoverable *without* rendering the page: `robots.txt`, `sitemap.xml`, Link headers, `llms.txt`, `/.well-known/`, Markdown negotiation, OAuth metadata, MCP/A2A, WebMCP, commerce protocols. Most of this layer is emerging; only `robots.txt`, sitemap, and `llms.txt` are default-scope today.

Google’s own framing: if agentic UX is relevant to the client *and there is extra time*, review [agent-friendly website best practices](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). Protocols like **Universal Commerce Protocol (UCP)** are emerging so Search agents can do more. This is not default WP/Shopify scope.

---

## 2. WordPress (primary platform)

**M&S default stack:** Bricks + child theme + Yoast. Extend those. Do **not** add Rank Math, AIOSEO, [AI Ready WP](https://wordpress.org/plugins/ai-ready-wp/), [LLMs Full Txt Generator](https://wordpress.org/plugins/llms-full-txt-generator/), or other `llms.txt` plugins on a standard build. Those exist for other stacks; they conflict with Yoast and duplicate work we can do in the child theme.

### Yoast as the protocol layer

- **`llms.txt`**
  - Do this: Enable Yoast’s feature. Use **manual page selection** (Yoast’s auto list is only ~5 latest items per type, plus cornerstone). Extend with Yoast filters in the child theme.
  - Do not: add a second generator plugin.
- **`robots.txt` AI bots**
  - Do this: Either Yoast → Tools → File editor **or** a child-theme `robots_txt` filter. Pick one. If Yoast has written a *physical* `robots.txt`, the WP `robots_txt` filter is ignored.
  - Do not: add a dedicated “AI robots” plugin.
- **Schema**
  - Do this: One `@graph`, owned by Yoast. Add FAQ/HowTo/etc. via [Yoast Schema API](https://developer.yoast.com/features/schema/api/) (`wpseo_schema_graph_pieces`, `wpseo_schema_graph`).
  - Do not: output a second `<script type="application/ld+json">` from a Bricks element.

Yoast `llms.txt` docs: [feature](https://yoast.com/features/llms-txt/) · [functional spec](https://developer.yoast.com/features/llms-txt/functional-specification/). Useful filters already in Yoast:

- `wpseo_llmstxt_link_description` — swap in the Yoast meta description (Bricks pages often have empty `post_content` / excerpts)
- `wpseo_llmstxt_filesystem_path` — when the web root isn’t writable the way Yoast expects
- `wpseo_llmstxt_content` — community/PR filter to append curated sections from code (confirm it shipped on the Yoast version we run)

CPTs show in Yoast’s `llms.txt` only if that type is set to appear in search results. Password-protected and noindex URLs should stay out; confirm on a real Yoast+Bricks site (OpenSpace-style “Hide from archive?” included).

`llms-full.txt` is a separate convention. Yoast does not make it the default; we don’t need it unless a client has a docs/agent use case.

### Bricks as the page-structure layer

Crawlers and agents see the **front-end HTML Bricks renders**, not `post_content`. That is usually fine (Bricks server-renders). The failure modes are ours to design against:

- **Empty `post_content`:** Bricks stores layouts in post meta. Yoast analysis, auto excerpts, and auto `llms.txt` descriptions can look empty even when the page is content-rich. Mitigation: fill Yoast title/meta description; use `wpseo_llmstxt_link_description`; never assume `the_content()` is the page.
- **Citeable HTML:** answer-first copy, headings, lists, and tables must be real elements in the rendered DOM — not text-in-image, not JS-only.
- **A11y = agent UX:** real `<button>`s (not `div`s), labels mapped to inputs, menus/dialogs in the accessibility tree. Inventory gaps in our Bricks kit, not a generic “page builder” blog post.
- **Custom elements (this is the interesting part):** an FAQ (or HowTo, definition, comparison table) element is worth building if it does **two jobs in one place**:
  1. Output visible, semantic HTML that matches what we claim (Google: schema must match visible content; AI Overviews lift early, extractable passages).
  2. Push that same Q&A into **Yoast’s graph** — not a parallel JSON-LD blob.

Duplicate FAQPage from Bricks + Yoast is the WP failure mode the original guide called out (plugin + theme + custom code). A child-theme element that registers a Yoast graph piece is how we avoid it.

Same pattern for custom post types: register the CPT, show it in Yoast Search Appearance, add a Bricks template, let Yoast own sitemap + schema; only then consider listing key CPT URLs in manual `llms.txt`.

### Rank Math / AIOSEO / extra generators

Leave in the resource list for the rare inherited site. Not M&S default. If a client already has Rank Math or AIOSEO, extend *that* plugin — still don’t stack a second `llms.txt` generator.

---

## 3. Shopify (secondary platform)

Official Shopify guidance to use on commerce builds and audits:

- [Prepare product data for AI channels](https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels)
- [Agentic-ready product data](https://www.shopify.com/enterprise/blog/agentic-ready-product-data) — Catalog, Agentic Storefronts, **structured facts over marketing paste**
- [Ecommerce schema guide](https://www.shopify.com/blog/ecommerce-schema)

Practical audit checklist (theme schema gaps): [SearchMention — AI search optimization for Shopify](https://searchmention.com/blog/ai-search-optimization-for-shopify) — check **brand, GTIN, ratings, shipping/returns**.

Same a11y note as WordPress: confirm the Shopify starter isn’t missing core accessibility features agents need.

---

## 4. Content that AI can cite

This is the highest-leverage *non-technical* work. Several sources say the same things; they are grouped here rather than repeated.

**Google’s baseline:** create valuable content that matches user intent. ([AI optimization guide — content](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#create-valuable-content))

### Answer-first structure

Lead with the answer. The first paragraph should state what the thing is or what you do, in one clear sentence, before context. That is the passage a model is most likely to lift. ([GEO Ready](https://geoready.dev/guides/generative-engine-optimization/), [LLM Pulse GEO guide](https://llmpulse.ai/blog/geo-guide/))

CXL research: **more than half of AI Overview citations come from the first 30% of page content.** On money pages, check whether the core answer appears in the first two to three paragraphs. If it is buried after context-setting, restructure so the direct answer leads and supporting detail follows.

Related page-level edits:

- Clear H2/H3 headings; convert them to question style where the content beneath answers a specific query
- Short paragraphs; break dense copy into self-contained blocks of two to four sentences, each covering one idea
- Bulleted/numbered lists where the content is genuinely listable
- Tables for comparable data

### Extractable, self-contained claims

Every important claim should be a complete, attributable sentence.

- Extractable: “Pricing starts at €49 per month.”
- Not extractable: “It’s affordable, starting in the range we mentioned earlier.”

Cite authoritative sources (so the page is treated as authoritative); use named quotations and specific datapoints; keep a professional, authoritative tone.

### What to write (intent and depth)

Generative engines lean on **comparison and “best-of” queries** because that is how people phrase AI questions: “X vs Y”, “best X for Y”, “alternatives to X.”

Prefer **topical depth over keyword breadth.** Build content clusters around a pillar. Because of **fan-out querying**, a pillar page should, where appropriate, speak to related facets (e.g. “best CRM for small business,” “best CRM for sales teams”).

**Original data and proprietary research** are the highest-leverage content investments for GEO: surveys, benchmarks, case studies, and internal datasets are inherently quotable and unique.

### Freshness and media

**Recency bias:** quarterly refresh cycle for top-citing pages — update the year in the title where appropriate, add new data and examples, resubmit.

**Multimodal answers:** AI Mode, Gemini, and ChatGPT increasingly synthesize text, images, video, and audio. Image alt text + Image schema, video transcripts + chapter markers, and audio/podcast transcripts + markup are part of GEO, not separate from it.

---

## 5. Technical page quality

These overlap work we already do. Keep them in the AI-readiness checklist so they don’t get treated as “someone else’s SEO.”

- **Stable layout / CLS.** Agents that take screenshots between actions are affected by layout shifts the same way users are. Reserve space for images, fonts, and dynamic content. Existing Core Web Vitals work covers this. ([agent-ready](https://suganthan.com/blog/how-to-make-website-agent-ready/))
- **Semantic HTML.** Use real elements. When a `div` must act as a button (legacy code, design-system constraint), add `role="button"` and `tabindex="0"` so it appears in the accessibility tree. Same for menus, dialogs, listboxes. Clickable elements should use `cursor: pointer`. Form labels must map to their inputs. ([agent-ready](https://suganthan.com/blog/how-to-make-website-agent-ready/), [web.dev — agent-friendly websites](https://web.dev/articles/ai-agent-site-ux#build_agent-friendly_websites_2))
- **One canonical URL per page;** keep trailing slashes consistent so retrieval systems do not split trust across duplicates. ([GEO Ready](https://geoready.dev/guides/generative-engine-optimization/))

---

## 6. Structured data (schema)

Hold two truths at once: **keep doing schema for Google rich results and entity clarity; do not sell it as a proven AI-citation lever.**

**Google (official):** structured data is **not required** for generative AI search, and there is **no special schema.org markup** to add for AI features. Continue using it as part of overall SEO, because it helps eligibility for rich results. ([AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))

**Causal evidence is weak.** Ahrefs, across 1,885 pages, found **no significant 30-day citation uplift** from schema (the most-studied protocol-layer signal). The claim that adding structured data *directly* drives AI citations has weak evidence. ([agent-ready](https://suganthan.com/blog/how-to-make-website-agent-ready/))

**Conflicting vendor research to treat cautiously:** Relixir, analyzing 50 sites, reported pages with FAQPage schema had a citation rate ~2.7× higher than pages without it. That is a much smaller study and conflicts with Ahrefs/Google. Do not make it a guarantee in proposals.

### What we still implement (SEO + hygiene, not “AI magic”)

- **Organization** on homepage and About — `@id` matching the home URL, `sameAs` links
- **Article / BlogPosting** on editorial pages
- **HowTo** on instructional content
- **FAQPage** on pages that actually contain Q&A (must match visible content)
- **Product** (especially Shopify): brand, GTIN, ratings, shipping/returns — see §3
- **Entity consistency:** same brand/product names everywhere. Don’t use “OpenSpace Track” half the time and “OS Track” the other half.
- Optional: Google’s Natural Language API to check entity salience on key pages

Audit tools: Screaming Frog schema export → [Rich Results Test](https://search.google.com/test/rich-results) and/or Schema validator.

---

## 7. Crawler access (`robots.txt`)

This is the one technical item that is **not** “just SEO with a new label.” Training bots and live-retrieval/search bots are different. Block the wrong one and the client disappears from ChatGPT (etc.) answers.

**Never block live retrieval bots if the goal is citations.** OpenAI states that sites blocking `OAI-SearchBot` will not appear in ChatGPT search answers. Blocking *training* bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, etc.) only affects whether content is used for model training.

### Crawlers that matter in 2026

- **`OAI-SearchBot`, `ChatGPT-User`** (OpenAI) — Live retrieval / ChatGPT search. Default: **Allow**.
- **`GPTBot`** (OpenAI) — Training. Default: optional; allow unless client opts out of training.
- **`Claude-SearchBot`, `Claude-User`** (Anthropic) — Live retrieval. Default: **Allow**.
- **`ClaudeBot`, `anthropic-ai`** (Anthropic) — Training. Default: optional.
- **`PerplexityBot`, `Perplexity-User`** (Perplexity) — Search / user-fetch. Default: **Allow**.
- **`Googlebot`** (Google) — Index (powers AI Overviews and AI Mode). Default: **Allow** (always).
- **`Google-Extended`** (Google) — Gemini training. Default: optional.
- **`Bingbot`** (Microsoft) — Feeds Copilot (and historically ChatGPT). Default: **Allow**; also submit sitemap to Bing — ChatGPT may use Bing’s index.
- **`CCBot`** (Common Crawl) — Downstream of many engines. Default: usually allow.

Also submit the sitemap to **Bing Webmaster Tools**, not only Google Search Console.

### Sample allow rules

```txt
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /
```

Add the live-retrieval agents from the table above (`ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `Perplexity-User`) the same way. Confirm whether Yoast already outputs any of this before duplicating it.

### Content Signals (emerging `robots.txt` vocabulary)

- **`ai-train=yes|no`** — May this content be used to train models?
- **`search=yes|no`** — May this content be used in AI search results (citation)?
- **`ai-input=yes|no`** — May this content be used as runtime input (RAG, grounding)?
- **`use=immediate|reference|full`** — What a bot may keep and reshare: use once and store nothing / index, excerpt, and link back (default) / summarise and reproduce wholesale

Most publishers adopting this today set `ai-train=no`, `search=yes`, `ai-input=yes`. Cloudflare’s managed `robots.txt` now appends `use=reference`. Treat as emerging; pair with explicit User-agent rules, don’t rely on it alone.

---

## 8. Sitemaps, Link headers, and `llms.txt`

### Sitemap

Every site should already have one. Submit it to Google Search Console **and Bing**.

### Link headers (optional agent upgrade)

The agent-readiness add-on is the HTTP `Link` header, which surfaces important resources to agents that scan headers before HTML.

**Not every `rel` value is useful.** Writeups recommend invented values like `rel="llms"` or `rel="ai"`. Agent-aware scanners ignore those because they are not in the IANA Link Relations registry. The four that actually matter are RFC-registered:

- **`rel="api-catalog"`** (RFC 9727) — Points to a list of your APIs
- **`rel="service-desc"`** (RFC 8631) — Points to a machine-readable API spec (e.g. OpenAPI)
- **`rel="service-doc"`** (RFC 8631) — Points to human-readable API docs
- **`rel="describedby"`** (RFC 8288) — Points to a description of the site — **this is the right `rel` for `llms.txt`**

Example (Cloudflare Pages/Workers `_headers` file — this is a **Cloudflare Pages convention**, not something WordPress or Shopify ships by default; on WP/Shopify this would be origin headers, a Cloudflare Transform Rule, or skip it):

```txt
/*
  Link: </sitemap-index.xml>; rel="sitemap"
  Link: </.well-known/api-catalog>; rel="api-catalog"
  Link: </api/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"
  Link: </llms.txt>; rel="describedby"; type="text/markdown"
```

`type=` tells agents what they are looking at before they fetch the file. On other hosts, set the same headers via response middleware. For typical brochure/marketing WP and Shopify sites without an API, the only Link header worth considering is `llms.txt` as `describedby`.

### `llms.txt`

A plain-text file at the domain root that summarises what the site is, what is on it, and which pages matter most. Spec: [llmstxt.org](https://llmstxt.org/).

**What it is for, honestly:** the observable use case is **coding agents looking up technical documentation**, not chatbots grounding answers about the site at query time. Claude Code is the cleanest example.

**What Google says (definitive for Google):** you don’t need new machine-readable files, AI text files, markup, or Markdown to appear in generative AI search. Creating and maintaining `llms.txt` (or similar) for *other* services is fine; it will **neither harm nor help** visibility in Google Search — Google ignores these files. ([AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))

Chrome Lighthouse (May 2026) includes an `llms.txt` audit in a new **Agentic Browsing** category. That is opt-in observability, not a ranking endorsement. ([Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt))

**LLM Pulse’s position:** major search crawlers have not confirmed that `llms.txt` changes citation eligibility. Do not use it as a substitute for crawlable HTML, internal links, `robots.txt`, or `sitemap.xml`. If you publish one, keep claims and links current.

**Authoring tips** ([llmstxt.org](https://llmstxt.org/)):

- Concise, clear language
- When linking to resources, include brief, informative descriptions
- Avoid ambiguous terms or unexplained jargon
- Optionally expand `llms.txt` into an LLM context file and test whether models can answer questions about the content

Minimal shape:

```markdown
# Site or brand name

> One- or two-sentence description of what this site is.

## Key pages

- [Page title](https://example.com/page/): one-line description of why it matters.

## About

- [About](https://example.com/about/): who the organization is.
```

WordPress implementation paths are in §2. Hand-rolled or auto-generated files must respect password protection and “hide from archive” flags.

---

## 9. Off-page presence (GEO / “AI PR”)

AI answers pull from more than the client’s site. Besides quality content, hierarchy, and backlinks, presence on **common aggregators** matters:

- Google Business Profile, Yelp, Wikipedia, Apple Maps, LinkedIn
- Reddit, LinkedIn comments, YouTube transcripts, Quora
- G2, Capterra, Trustpilot, and category-specific review sites
- Wikidata
- Google Search Console and **Bing Webmaster Tools**

Sources: [Backlinko GEO](https://backlinko.com/generative-engine-optimization-geo), [LLM Pulse GEO guide](https://llmpulse.ai/blog/geo-guide/), [related video](https://www.youtube.com/watch?v=bhTo8fDmr5I).

This is often client/marketing-owned, not a default web-build line item — but it belongs in the conversation when we talk about AI visibility.

---

## 10. Auditing (SOP material)

Starting point: [GEO audit — how to get started and check a website for AI-readiness](https://wpseoai.com/blog/geo-audit-how-to-get-started-and-check-your-website-for-ai-readyness/).

### Tools

- **Google Search Console** — Coverage, sitemaps, Generative AI performance report
- **Screaming Frog** — Crawl + schema inventory export
- **Rich Results Test / Schema validator** — Validate exported schema
- **Server logs** — Confirm which AI bots actually hit the site
- **AI monitoring** (Otterly, Profound, Semrush, etc.) — Citation / mention tracking

Other scanners used in research: [isitagentready.com](https://isitagentready.com/) (example: [OpenSpace audit](https://isitagentready.com/www.openspace.ai)), [agentchecker.ai](https://agentchecker.ai/app/my-audits), [Semrush AI SEO](https://www.semrush.com/ai-seo/overview/), [glippy.dev](https://glippy.dev/). Spreadsheet framing for a “minimum viable agent-ready site”: [Google Sheet](https://docs.google.com/spreadsheets/d/1f_oJM2xTokmxphQ5lHAow28fEm4GZhUsu2nGzd-XzJQ/edit?usp=sharing).

### Audit sequence (practical)

1. **Access:** `robots.txt` + CDN/bot-fight rules — training vs retrieval bots allowed as intended
2. **Discoverability:** sitemap present, submitted to Google *and* Bing; canonicals consistent
3. **Rendered HTML:** critical content is in the HTML, not JS-only / image-only
4. **Schema:** Organization on home/About (`@id`, `sameAs`); no entity fragmentation; Product/FAQ/Article as appropriate; validate
5. **Content citeability:** answer in the first 30% / first 2–3 paragraphs on money pages; self-contained claims; question-style headings where they fit
6. **`llms.txt`:** present, curated, not leaking private/hidden content
7. **Benchmark before fixing** (see §11)

---

## 11. Measurement and KPIs

Define KPIs at the start; benchmark; then monitor. Do not “fix” in the dark.

### Google Search Console

Use the **Generative AI performance report** to see how content is discovered through generative AI features on Google Search and Discover. ([AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide))

### Manual citation baseline

1. Write 20–50 queries that represent how the audience would ask about products, services, or topics
2. Run each in ChatGPT, Perplexity, Google AI Overviews, and Gemini
3. Log: query, platform, brand mentioned (Y/N), website cited (Y/N), what the AI said, accuracy, which competitors appeared

Start with **Google AI Overviews** (most search traffic) and **ChatGPT** (majority of AI referral traffic).

### Ongoing platforms

Pick one and configure it on the core query set before implementation work:

- Semrush AI Visibility Toolkit (ChatGPT, Gemini, SearchGPT, Perplexity)
- SE Ranking AI Search Toolkit
- Profound, Otterly, Ahrefs Brand Radar

Proof-of-concept option: [LLM Pulse AI visibility report](https://llmpulse.ai/ai-visibility-report) ([llmpulse.ai](https://llmpulse.ai/) as comparison).

### What to track

([LLM Pulse GEO guide](https://llmpulse.ai/blog/geo-guide/))

- **Visibility (mention rate)** — % of target prompts where the brand appears, per engine. Foundational. Median in-category is ~8–12%; leaders sit at 40%+.
- **Position-weighted visibility (AI Visibility Score)** — Rewards earlier mentions (pos 1 = 100%, pos 2 = 50%, pos 3 = 33%, …). Closest analogue to SEO “average position”; cleanest dashboard number.
- **Share of Voice** — Your mentions ÷ (you + tracked competitors). Keep prompt set, competitors, engines, locales, and schedule stable over time.
- **Citation source coverage** — Of third-party sources engines cite for category prompts, how many include the brand, product, or URLs. Off-page GEO scoreboard (PR, Wikipedia, reviews).
- **Sentiment** — Positive / neutral / negative. Mention rate without sentiment is dangerous — a competitor named negatively is worse off than not being named.
- **AI-referred traffic** — GA4 referrer filters for `chat.openai.com`, `perplexity.ai`, `gemini.google.com`, etc.
- **Branded query lift** — Search Console trend on brand name and key product names.

---

## Appendix A. Emerging agent protocols

Nice-to-have / watch list. Not default scope for typical WordPress or Shopify client sites. Revisit when a client is an app, has a public API, or is explicitly investing in agent infrastructure.

Google: you do **not** need these files to appear in generative AI search. Chrome Lighthouse’s Agentic Browsing audits are observability, not endorsement.

### Markdown negotiation

When an agent sends `Accept: text/markdown`, return a Markdown version of the page instead of HTML. Agents parse Markdown more efficiently than HTML (tokens and extraction quality). **Status: emerging.** Cloudflare popularised it; not yet a formal standard; multiple agents now check for it. Best fit among this appendix for **content sites**.

### Open Knowledge Format (OKF)

A folder of Markdown files, one per page, tagged and cross-linked into a graph an agent can walk. Nothing crawls the web for these bundles yet. Google built the format for data teams sharing tables, not blogs — pointing it at a website is a repurposing. Immediate payoff is a clean machine-legible copy of content plus a link map (a free structural audit), not traffic. **Status: brand new (v0.1, June 2026).** Google-backed but unread on the open web. Low-cost early bet, not a traffic source.

### MCP Server Card

Only if the site **exposes an MCP server**. If it doesn’t, skip.

Two paths exist; serve both during the transition:

- `/.well-known/mcp/server-card.json` — standardising convention in the MCP repo (SEP-1649). Shape: `serverInfo` (name, version), `transport`, `capabilities`, `tools` list.
- `/.well-known/mcp-server.json` — older flat convention some early scanners still check.

Spec: [modelcontextprotocol.io](https://modelcontextprotocol.io). **Status: emerging.**

Example:

```json
{
  "serverInfo": {
    "name": "Example MCP Server",
    "version": "1.0.0"
  },
  "description": "Tools for searching and reading site content.",
  "transport": {
    "type": "webmcp",
    "endpoint": "https://example.com/mcp/"
  },
  "capabilities": {
    "tools": true
  },
  "tools": [
    {"name": "search_posts", "description": "Search posts by keyword"},
    {"name": "get_post", "description": "Get the full content of a specific post"},
    {"name": "list_posts", "description": "List all posts"},
    {"name": "get_site_info", "description": "Get site metadata"}
  ]
}
```

### A2A Agent Card — `/.well-known/agent.json`

Google’s A2A protocol: used if the **site itself is an agent** (offers services another agent might call). **Likely does not apply to M&S client sites.**

### Agentic Resource Discovery — `/.well-known/ai-catalog.json`

A spec for how agents find tools, agents, and APIs. MCP Server Card and A2A Agent Card each advertise one capability; ARD’s `ai-catalog.json` is a single index that points at all of them (tools, MCP servers, A2A agents, nested catalogs), plus registries that crawl those catalogs and answer natural-language queries — the agentic web’s version of a search engine.

Related “AI discovery” idea: `/.well-known/ai.txt` and JSON summary or FAQ endpoints that describe what the site offers. ([GEO Ready](https://geoready.dev/guides/generative-engine-optimization/) — confirm purpose before recommending.)

### WebMCP (two different things, same name)

An agent-ready site that wants both today’s and tomorrow’s world eventually ships both. Most M&S sites will ship neither unless there is a product reason.

1. **jasonjmcghee/WebMCP** (JS library, works today). Drop-in widget that exposes tools to MCP clients via a local WebSocket bridge. Works in stable Chrome, Safari, Firefox. Agents connect through a local helper process.
2. **W3C / Chrome WebMCP** (browser-native API). Proposed `navigator.modelContext`. Chrome Beta behind a flag; registers tool definitions with the browser, no bridge. Chrome Early Preview Program launched February 2026; standards work continues at TC39.

### Agent Skills

Anthropic’s [agentskills.io](https://agentskills.io) defines named, versioned, agent-invokable capabilities. A `skills.json` at a well-known location lets agents discover what the site *can do*, separate from what the content is about. **Status: bleeding edge.** Spec still under active development.

### Still to research (from original notes)

- `llms.txt` (partially done — see §8)
- [Chrome Lighthouse `llms.txt` audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)
- MCP Server Cards
- OAuth metadata
- A2A discovery
- Markdown negotiation
- Open Knowledge Format
- `ai.txt` / `/.well-known/ai.txt`
- What [geoready.dev’s GEO guide](https://geoready.dev/guides/generative-engine-optimization/) is for, beyond the citeability/canonical points already used above

---

## Appendix B. Resources and tools

### Official / primary

- [Google: Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search Console help — generative AI / related](https://support.google.com/webmasters/answer/16908024)
- [Google: Technical SEO essentials](https://developers.google.com/search/docs/essentials/technical)
- [web.dev: Build agent-friendly websites](https://web.dev/articles/ai-agent-site-ux#build_agent-friendly_websites_2)
- [Chrome Lighthouse: llms.txt (Agentic Browsing)](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)
- [`llms.txt` spec](https://llmstxt.org/)

### WordPress

- [AI Ready WP plugin](https://wordpress.org/plugins/ai-ready-wp/)
- [LLMs Full Txt Generator](https://wordpress.org/plugins/llms-full-txt-generator/)
- [Yoast llms.txt](https://yoast.com/features/llms-txt/) · [functional spec](https://developer.yoast.com/features/llms-txt/functional-specification)
- [Rank Math llms.txt](https://rankmath.com/kb/llms-txt/)
- [WPBeginner: What is llms.txt / how to add in WordPress](https://www.wpbeginner.com/wp-tutorials/what-is-llms-txt-how-to-add-llms-txt-in-wordpress/)
- [GEO audit for WP sites](https://wpseoai.com/blog/geo-audit-how-to-get-started-and-check-your-website-for-ai-readyness/)

### Shopify

- [Prepare product data for AI channels](https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels)
- [Agentic-ready product data](https://www.shopify.com/enterprise/blog/agentic-ready-product-data)
- [Ecommerce schema](https://www.shopify.com/blog/ecommerce-schema)
- [SearchMention: AI search optimization for Shopify](https://searchmention.com/blog/ai-search-optimization-for-shopify)

### GEO / agent-ready overviews

- [Suganthan: How to make a website agent-ready](https://suganthan.com/blog/how-to-make-website-agent-ready/)
- [LLM Pulse GEO guide](https://llmpulse.ai/blog/geo-guide/)
- [GEO Ready technical checklist](https://geoready.dev/guides/generative-engine-optimization/)
- [Backlinko GEO](https://backlinko.com/generative-engine-optimization-geo)
- [Minimum viable agent-ready site (spreadsheet)](https://docs.google.com/spreadsheets/d/1f_oJM2xTokmxphQ5lHAow28fEm4GZhUsu2nGzd-XzJQ/edit?usp=sharing)

### Scanners and monitoring

- [isitagentready.com](https://isitagentready.com/) · [OpenSpace example](https://isitagentready.com/www.openspace.ai)
- [agentchecker.ai](https://agentchecker.ai/app/my-audits)
- [Semrush AI SEO](https://www.semrush.com/ai-seo/overview/)
- [glippy.dev](https://glippy.dev/)
- [LLM Pulse visibility report](https://llmpulse.ai/ai-visibility-report)
- Otterly, Profound, SE Ranking AI Search Toolkit, Ahrefs Brand Radar (citation tracking)

### Video

- [GEO / off-page discussion](https://www.youtube.com/watch?v=bhTo8fDmr5I)

---

## Appendix C. Open questions for the team

Carried forward from the raw notes, updated for Bricks + Yoast:

1. Does Yoast already output AI-crawler `robots.txt` rules? Standardize on Yoast file editor **or** `robots_txt` filter — not both (physical Yoast file ignores the filter).
2. Yoast `llms.txt` on Bricks: empty descriptions (`post_content` empty)? Exclude password-protected / noindex / “Hide from archive?”
3. Where do we set HTTP `Link` headers on our typical hosts (WP, Shopify, Cloudflare in front) — `_headers` is Cloudflare Pages-specific.
4. A2A `agent.json` — confirm it does not apply to standard client sites.
5. Our Bricks kit and Shopify starter: inventory missing a11y primitives (buttons, labels, dialogs, menus).
6. Confirm purpose/status of `/.well-known/ai.txt` and [geoready.dev](https://geoready.dev/guides/generative-engine-optimization/) before putting either in an SOP.
7. LLM Pulse projects that by 2027 a meaningful share of “searches” will be agent-to-agent, leaning on `llms.txt`, structured data, and APIs. Treat as directional, not a 2026 delivery promise.
8. Child-theme FAQ (etc.) element: visible semantic HTML + Yoast Schema API, never a second JSON-LD blob.
