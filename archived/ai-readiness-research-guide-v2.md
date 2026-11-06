# AI-Readiness Research Guide (v2)

**Internal steward notes for Marvel & Snap**  
Lead AI-Readiness Research and SOP Development for Client Sites (WordPress & Shopify)

A lot of “AI SEO” is classic SEO with new labels. **AI-ready** is a stack of capabilities—not a replacement for SEO.

- **Access policy** (beyond SEO: yes) — Training bots vs retrieval/search bots are separate; wrong `robots.txt` / CDN rules can erase AI citations.
- **Machine-readable facts** (beyond SEO: partially) — JSON-LD, product feeds, complete attributes. Keep schema for rich results; do not sell it as a proven AI-citation lever. Shopify product data still matters.
- **Citation-ready content** (beyond SEO: yes) — Answer-first, quotable claims, stats, expertise signals (form and density, not keywords).
- **Agent / commerce readiness** (beyond SEO: yes) — Shopify Catalog, clean metafields, buyable recommendations. MCP and similar protocols are not default brochure-site scope.
- **Measurement** (beyond SEO: yes) — Mentions/citations in AI answers and AI referral traffic—not just rankings.

**WordPress implementation default:** Bricks + child theme + Yoast. Extend those (hooks, Schema API, custom elements). Do not add Rank Math, AIOSEO, or a second `llms.txt` / “AI SEO” plugin on a standard build.

Findings from the first research pass live in [`ai-readiness-research-notes.md`](ai-readiness-research-notes.md). This file is only remaining work: what to read, what to try, what to build.

---

## Reading list (prioritized)

Trust primary sources over blogs when they disagree.

### Tier 0 — Primary sources still to read

1. **[Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)**  
   Short eligibility checklist: crawlable, text-available, schema matches visible content, Merchant Center / Business Profile. Needed so the audit checklist matches Google’s own bar.

2. **[OpenAI crawlers](https://developers.openai.com/api/docs/bots)**  
   Confirm `GPTBot` (training) vs `OAI-SearchBot` / `ChatGPT-User` (live retrieval). Sites that block `OAI-SearchBot` do not appear in ChatGPT search.

3. **Anthropic, Perplexity, and Apple bot docs** (same treatment as OpenAI)  
   Training vs search vs user-fetch for each. Apple was never researched. Optional helper: [AI crawler access decision matrix](https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix).

4. **Content Signals + Cloudflare `robots.txt`**  
   Find the current Cloudflare / IETF writeup for `ai-train`, `search`, `ai-input`, and `use=immediate|reference|full`. Decide whether typical M&S clients get retrieval-allow + optional training opt-out, and do **not** rely on Content Signals alone.

### Tier 1 — Yoast + Bricks (implementation, not theory)

5. **Yoast: [`llms.txt` feature](https://yoast.com/features/llms-txt/)** + **[functional spec](https://developer.yoast.com/features/llms-txt/functional-specification/)**  
   Hands-on, not another article pass. Confirm: manual page selection, which post types are included, whether noindex / password-protected URLs are excluded, and which filters exist on the version we ship (`wpseo_llmstxt_link_description`, `wpseo_llmstxt_content`, `wpseo_llmstxt_filesystem_path`).

6. **Yoast: [Schema API](https://developer.yoast.com/features/schema/api/)** + **[integration guidelines](https://developer.yoast.com/features/schema/integration-guidelines/)**  
   How to add FAQ/HowTo (and similar) as graph pieces from a Bricks element—without a second JSON-LD script.

7. **Yoast: [editing `robots.txt`](https://yoast.com/help/how-to-edit-robots-txt-through-yoast-seo/)**  
   Physical file vs WordPress virtual `robots.txt`. The `robots_txt` filter does nothing once Yoast has written a file to disk. Decide one official path for M&S sites.

8. **Bricks custom elements / child-theme docs** (whatever we already use internally)  
   Enough to ship an FAQ (etc.) element: semantic HTML, controls, and a PHP callback that can feed Yoast. Also check whether any Bricks core or nestable element already emits FAQ/HowTo schema (that would conflict).

9. **[web.dev: agent-friendly websites](https://web.dev/articles/ai-agent-site-ux#build_agent-friendly_websites_2)**  
   Skim for agent-UX items we should (or should not) put in SOPs beyond semantic HTML and stable layout.

10. **[Chrome Lighthouse: `llms.txt` / Agentic Browsing](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)**  
    Decide if this is an audit cross-check we run, not a score we sell.

### Tier 2 — Shopify / commerce (still unread in depth)

11. **[Shopify: Prepare product data for AI channels](https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels)**

12. **[Shopify: Agentic-ready product data](https://www.shopify.com/enterprise/blog/agentic-ready-product-data)** — Catalog, Agentic Storefronts, structured facts over marketing paste.

13. **[Shopify: Ecommerce schema](https://www.shopify.com/blog/ecommerce-schema)**

14. **[SearchMention: AI search optimization for Shopify](https://searchmention.com/blog/ai-search-optimization-for-shopify)** — theme schema gaps (`brand`, GTIN, ratings, shipping/returns).

Distill these into a checklist. Do not stop at headlines.

### Tier 3 — UX, KPIs, and video (still thin)

15. How **zero-click / citation traffic** changes what we report (brand presence vs sessions).

16. **Answer surfaces vs site journeys** — AI cites a passage; the page still needs a clear next step.

17. **[GEO / off-page video](https://www.youtube.com/watch?v=bhTo8fDmr5I)** — aggregators, Bing, multi-surface presence. Watch if off-page advisory is going into the lunch-and-learn; skip if not.

There is little canonical “Bricks AI UX” literature. Fill this from Google’s “text must be in the page,” the web.dev article, Shopify’s agent guidance, and our own audits.

### Optional / later (do not block SOPs)

- [GEO paper — Aggarwal et al.](https://arxiv.org/abs/2311.09735) — only if you want the academic citation in a deck.
- Markdown negotiation (Cloudflare `Accept: text/markdown`) — extra-time for Cloudflare-heavy content sites, not default WP/Shopify.
- UCP, MCP, WebMCP, A2A, OKF, Agent Skills, `/.well-known/ai.txt` — quarterly watch list.
- Rank Math / AIOSEO / [AI Ready WP](https://wordpress.org/plugins/ai-ready-wp/) / other `llms.txt` generators — only if we inherit a site that already uses them. Do not research these as our default stack.

**Read critically:** If a piece only says “E-E-A-T + schema + headings,” file it under foundation—not the AI-readiness differentiator.

---

## To-do list (for the stewardship role)

### Phase 1 — Remaining reading and policy (week 1)

1. Write a **1-page internal definition:** “AI-ready” = Access + Facts + Citeability + (for ecom) Agent commerce, with SEO as the eligibility layer. Include Google (index-grounded, ignores `llms.txt`) vs ChatGPT/Perplexity (own crawlers + live fetch), and the schema honesty clause.

2. Finish the **bot policy matrix** from official docs (OpenAI / Anthropic / Perplexity / Google-Extended / Apple): train vs search vs user-fetch. Set a **default for typical M&S clients** (likely: always allow live-retrieval bots; training bots allow-unless-client-opts-out, or the reverse). Include Content Signals as optional/emerging.

3. Read and distill **Shopify** (Tier 2) into a product-data checklist with owners.

### Phase 2 — Hands-on research (week 2–4)

4. **Yoast on a real Bricks site (do this before writing any mu-plugin):**
   - Does Yoast already emit AI `User-agent` rules in `robots.txt`?
   - Enable `llms.txt`, switch to **manual page selection**, curate ~10–30 money-page URLs.
   - Are descriptions empty because Bricks `post_content` is empty? Does `wpseo_llmstxt_link_description` + Yoast meta description fix it?
   - Do noindex, password-protected, and “Hide from archive?” URLs leak into the file?
   - Confirm `wpseo_llmstxt_content` exists on our Yoast version if we want extra sections from code.

5. **Bricks kit inventory:**
   - A11y gaps in *our* elements (div-as-button, unlabeled inputs, dialogs/menus).
   - Any element that already prints JSON-LD (FAQ/accordion/HowTo).
   - CSS-in-image text, JS-only critical content, query-loop / template content that crawlers might miss.

6. **Audit 3–5 live WordPress sites and 2–3 Shopify sites** for:
   - `robots.txt` + Cloudflare / bot-fight-mode AI rules
   - Rendered HTML vs JS-only or image-only critical content
   - JSON-LD completeness / conflicts (Yoast + Bricks + ACF)
   - Presence/quality of `/llms.txt`
   - Product attributes (Shopify) / schema + feeds (WP commerce)
   - Optional cross-check: [isitagentready.com](https://isitagentready.com/), [agentchecker.ai](https://agentchecker.ai/app/my-audits), or Lighthouse Agentic Browsing—not a score to sell

7. **Citation baseline** on 1–2 willing clients: 20–50 prompts in AI Overviews and ChatGPT first, then Perplexity and Gemini. Log mention, citation, accuracy, competitors.

8. **Interview PM / dev / SEO:** where this work already appears accidentally in scopes (schema, CWV, content rewrites) so an add-on does not duplicate sold work.

9. **Tooling (pick one, don’t bake off forever):** Semrush AI Visibility, SE Ranking, Profound, Otterly, Ahrefs Brand Radar; [LLM Pulse report](https://llmpulse.ai/ai-visibility-report) as a cheap proof of concept. Also: GSC Generative AI performance report + GA4 referrer filters for AI chat domains.

### Phase 3 — Table-stakes build (week 3–6, overlap with audits)

Ship shared code in the **child theme or a small mu-plugin** (e.g. `ms-ai-readiness`). Prefer mu-plugin if it must run even when a client-specific child theme is thin; prefer child theme if it is Bricks-element PHP that belongs with the kit. Do not invent a new public plugin.

**Research the hook path first (Phase 2 item 4), then build.**

10. **Table stakes on every WordPress site** (useful even when the client never bought an “AI” add-on):
    - **AI crawler `robots.txt` snippet** — explicit `Allow: /` groups for live-retrieval bots (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Bingbot`, `Googlebot` is already covered). Training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) follow the policy from item 2. Implementation: Yoast file-editor paste **or** `robots_txt` filter—not both. Document the physical-file caveat.
    - **`llms.txt` descriptions** — `wpseo_llmstxt_link_description` so Bricks pages use the Yoast meta description instead of an empty excerpt.
    - **Yoast launch checklist** (process, not code): Organization + `sameAs`; `llms.txt` on + manual money pages; CPT “show in search results” only when we mean it; sitemap submitted to **Google and Bing**.
    - **One `@graph` rule** — custom Bricks elements must not print `<script type="application/ld+json">`. Schema goes through Yoast.

11. **Build once, use when the page needs it** (shared Bricks elements in the child theme):
    - **FAQ element** — visible semantic Q&A HTML *and* a Yoast FAQPage graph piece from the same data (`wpseo_schema_graph_pieces` / `wpseo_schema_graph`). This is the first custom element worth making.
    - Later, same pattern: **HowTo**, **lede / answer-first** block (first 2–3 paragraphs as extractable claims), **comparison table**.
    - CPTs: register type → Yoast Search Appearance → Bricks template → optional listing in manual `llms.txt`. No extra schema plugin.

12. **Not table stakes** (skip unless a specific client needs it): Markdown negotiation, HTTP `Link` `rel="describedby"` for `llms.txt`, MCP/WebMCP, `llms-full.txt`, a second `llms.txt` generator.

13. Map every checklist item to **owner** (dev / SEO / content / client) and **effort** (S/M/L).

### Phase 4 — Distill SOPs (week 5–7)

14. Produce reusable deliverables:
    - **AI-Readiness Audit Checklist** (WP + Shopify variants; pass/fail + owner)
    - **Crawler Policy SOP** (decision tree, sample `robots.txt`, Yoast physical vs filter, Cloudflare bot-fight, training opt-out)
    - **Schema & entity SOP** (Yoast as sole `@graph`; Bricks FAQ pattern; “schema must match visible”)
    - **`llms.txt` SOP** (Yoast-only; manual 10–30 URLs; when not to oversell it)
    - **Content citeability guidelines** for writers (answer-first, stats, attribution, freshness, quarterly refresh)
    - **Shopify agent-ready product data checklist** (after Tier 2 reading)

    Keep MCP, WebMCP, A2A, OKF, Agent Skills, and `ai.txt` out of default SOPs. One-line watch list is enough.

### Phase 5 — Educate and commercialize (week 7–10)

15. Lunch-and-learn: **Google says / OpenAI says / what we actually change on Bricks+Yoast and Shopify.**

16. Package a **standard add-on** (Audit → Fixes → Monitoring). Sell eligibility, clarity, and measurable visibility—not “we’ll rank you in ChatGPT.”

17. Set a **quarterly refresh** of this folder (vendor docs first; 15 minutes on UCP / Shopify Catalog / Markdown negotiation).

### Ongoing

18. Keep a short source-of-truth folder: primary vendor docs + SOPs + the notes file. Demote blogs that contradict Google/OpenAI.

19. Track 2–3 pilot clients for 90 days (GSC Generative AI report, GA4 AI referrals, citation checks) so education is not anecdotal.

---

## Opportunities M&S can sell (without overpromising)

- **Crawler/CDN misconfig remediation** — high impact, often invisible; include Bing sitemap submission as launch hygiene
- **Reusable Bricks + Yoast kit** — FAQ (then HowTo / lede / comparison) elements + shared robots / `llms.txt` helpers
- **Schema conflict cleanup** on WP (Yoast + Bricks + ACF), sold as rich-results and entity hygiene
- **Shopify product data / agent readiness** audits tied to Shopify’s Catalog narrative
- **Citeability upgrades** on money pages (answer in the first 2–3 paragraphs)
- **`llms.txt` as cheap hygiene** — honest: no Google ranking benefit; some agents and Lighthouse look for it
- **AI visibility reporting** as a retainer (prompt set + monthly scorecard)
- **Brand entity kits** (`Organization` + consistent NAP + `sameAs`) for multi-location / franchise clients
- **Off-page / aggregator advisory** (GBP, Wikipedia/Wikidata, review sites) — usually client/marketing-owned

Avoid selling MCP, WebMCP, or “agentic protocols” on brochure sites. Avoid selling “we’ll rank you in ChatGPT.”

---

## Practical tip for searching

When Google returns generic SEO, search with these instead:

- `OAI-SearchBot` / `ChatGPT-User` / `GPTBot` / `Claude-SearchBot` / `Google-Extended` / `Applebot`
- `wpseo_llmstxt_link_description` / `wpseo_schema_graph_pieces` / Yoast Schema API
- `Bricks` custom element schema JSON-LD
- `Content Signals` robots.txt Cloudflare
- `agentic product data` / `Shopify Catalog`
- `"structured data"` `AI Overviews` site:developers.google.com

That filters for access policy, Yoast hooks, and platform docs—not “use H2s and backlinks.”

---

## Suggested next deliverable

Draft the **WordPress AI-Readiness Checklist** (audit items + pass/fail + owner) in parallel with Phase 1–2 reading. Label holes “confirm on live audit” rather than inventing them.

Do not wait for emerging-protocol research to start the checklist or the FAQ element spike.
