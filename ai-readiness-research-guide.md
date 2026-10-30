# AI-Readiness Research Guide

**Internal steward notes for Marvel & Snap**  
Lead AI-Readiness Research and SOP Development for Client Sites (WordPress & Shopify)

Your instinct is right: a lot of “AI SEO” is classic SEO with new labels. The useful framing for Marvel & Snap is that **AI-ready** is a stack of capabilities—not a replacement for SEO.

| Layer | What it actually means | Beyond SEO table stakes? |
|---|---|---|
| **Access policy** | Training bots vs retrieval/search bots are separate; wrong `robots.txt`/CDN rules can erase AI citations | Yes |
| **Machine-readable facts** | JSON-LD, product feeds/APIs, complete attributes agents can trust | Partially (schema exists in SEO; agents raise the bar) |
| **Citation-ready content** | Answer-first, quotable claims, stats, expertise signals for synthesis | Yes (form + density, not keywords) |
| **Agent / commerce readiness** | Shopify Catalog/MCP, clean metafields, buyable recommendations | Yes |
| **Measurement** | Mentions/citations in AI answers, AI referral traffic—not just rankings | Yes |

---

## Reading list (prioritized)

### Tier 0 — Primary sources (start here; trust these over blogs)

1. **[Google: Optimizing for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)**  
   Official stance (May 2026): AI Overviews/AI Mode ride core Search; no special AI schema / `llms.txt` requirement. Read this so your SOPs don’t overclaim vs Google.

2. **[Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)**  
   Short eligibility checklist: crawlable, text-available, schema matches visible content, Merchant Center / Business Profile hygiene.

3. **[OpenAI crawlers overview](https://developers.openai.com/api/docs/bots)**  
   Critical distinction: `GPTBot` (training) ≠ `OAI-SearchBot` (ChatGPT search). This is one of the few truly non-SEO, high-leverage technical topics for client sites.

4. **Anthropic / Perplexity bot docs** (same treatment as OpenAI)  
   Document each vendor’s training vs search/user agents. Pair with something like [AI crawler access decision matrix](https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix) for a practical policy table.

5. **[GEO paper — Aggarwal et al. (KDD 2024)](https://arxiv.org/abs/2311.09735)**  
   Academic origin of “GEO.” Main takeaway for SOPs: statistics, citations, and quotations moved visibility more than keyword tricks—in their setup. Treat as direction, not client-billable gospel.

6. **[`llms.txt` spec](https://llmstxt.org/)** (and a good format reference like [llmtxt.info](https://llmtxt.info/llms-txt-format/))  
   Know the proposal. Balance with skeptical 2026 reporting that **search crawlers often skip `llms.txt` while coding/docs agents use it**—so position it as low-cost hygiene + docs/agent UX, not a ranking lever.

### Tier 1 — GEO / AEO that goes past “write good content”

7. **[Backlinko GEO guide](https://backlinko.com/generative-engine-optimization-geo)** — solid overview of crawlability for AI, entity consistency, multi-surface presence, citation tracking.

8. **[LLM Pulse GEO guide (2026)](https://llmpulse.ai/blog/geo-guide/)** — useful for “five surfaces,” Share of Model metrics, and the shift toward **agent-readable** product/API surfaces.

9. **[GEO-ready technical checklist framing](https://geoready.dev/guides/generative-engine-optimization/)** — crawler audit → schema → freshness → answer-first structure (good checklist raw material).

**Read critically:** Many GEO posts still recycle SEO. When a piece only says “E-E-A-T + schema + headings,” file it under foundation—not your AI-readiness differentiator.

### Tier 2 — WordPress-specific (implementation, not theory)

10. **Yoast: [`llms.txt` feature](https://yoast.com/features/llms-txt/)** + help docs — how their generator works, manual vs auto curation.

11. **Rank Math: [llms.txt KB](https://rankmath.com/kb/llms-txt/)** — post-type/taxonomy controls (useful for SOP “default vs custom” decisions).

12. **WPBeginner: [What is llms.txt / how to add in WordPress](https://www.wpbeginner.com/wp-tutorials/what-is-llms-txt-how-to-add-llms-txt-in-wordpress/)** — client-friendly explanation; verify against current Yoast/Rank Math UI.

13. **[GEO audit framing for WP sites](https://wpseoai.com/blog/geo-audit-how-to-get-started-and-check-your-website-for-ai-readyness/)** — practical audit sequence; note the “accidentally blocking AI crawlers at CDN” angle—very agency-relevant.

14. **Plugin landscape scan (hands-on, not just articles):** Yoast / Rank Math / AIOSEO `llms.txt`; optional supplements like Website LLMs.txt or GEO-schema plugins—document conflicts with existing SEO plugins.

WordPress gap to fill yourself (few great public writeups): **theme/page-builder CSS-in-image text, JS-only menus, Elementor FAQ that aren’t in HTML, duplicate/conflicting JSON-LD from SEO plugin + theme + custom code.** That failure mode is where agency work lives.

### Tier 3 — Shopify / commerce / agents (high ROI for a shop)

15. **[Shopify: Prepare product data for AI channels](https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels)**

16. **[Shopify: Agentic-ready product data](https://www.shopify.com/enterprise/blog/agentic-ready-product-data)** — Catalog, Agentic Storefronts, structured facts over marketing paste.

17. **[Shopify: Ecommerce schema guide](https://www.shopify.com/blog/ecommerce-schema)**

18. **[SearchMention: AI search optimization for Shopify checklist](https://searchmention.com/blog/ai-search-optimization-for-shopify)** — theme schema gaps (`brand`, GTIN, ratings, shipping/returns)—very practical for audits.

### Tier 4 — Broader “AI-mediated UX” (often missing from GEO lists)

For the UX / architecture part of your brief, add:

- How **zero-click / citation traffic** changes KPIs (brand presence vs sessions)
- **Answer surfaces vs site journeys** (AI cites a passage → user still needs a clear next step on-page)
- **Entity consistency** across site, GMB, merchant feeds, social (`sameAs`, NAP, brand naming)
- **Content as extractable units** (definition blocks, comparison tables, FAQ pairs that match visible text)
- Accessibility & SSR: AI fetchers still favor real HTML text over client-rendered blobs

There’s less canonical “WordPress AI UX” literature; treat this as synthesis from Google’s “text must be in the page,” Shopify’s agent guidance, and your own pilot audits.

---

## To-do list (for the stewardship role)

### Phase 1 — Scope & vocabulary (week 1–2)

1. Write a 1-page internal definition: **“AI-ready” = Access + Facts + Citeability + (for ecom) Agent commerce**, with SEO as eligibility layer.
2. Build a **bot policy matrix** (OpenAI / Anthropic / Google-Extended / Perplexity / Apple): train vs search vs user-fetch; default recommendations for typical M&S clients.
3. Note platform differences: Google (index-grounded) vs ChatGPT/Perplexity (own crawlers + live fetch) so SOPs don’t pretend one checklist covers all engines.

### Phase 2 — Primary research on real client patterns (week 2–4)

4. Audit 3–5 live WordPress sites and 2–3 Shopify sites for:
   - `robots.txt` + Cloudflare/bot fight mode AI rules
   - Rendered HTML vs JS-only critical content
   - JSON-LD completeness / conflicts
   - Presence/quality of `/llms.txt`
   - Product attribute completeness (Shopify) / schema + GTM feeds (WP commerce)
5. Run a **citation baseline**: 10–20 client-relevant prompts in ChatGPT, Perplexity, Gemini/AI Overviews; log who gets cited.
6. Interview PM/dev/SEO folks: where AI readiness work already appears accidentally in scopes (schema, CWV, content rewrites).

### Phase 3 — Distill SOPs (week 4–7)

7. Produce deliverables the team can reuse:
   - **AI-Readiness Audit Checklist** (WP + Shopify variants)
   - **Crawler Policy SOP** (decision tree + sample `robots.txt`)
   - **Schema & entity SOP** (Organization/WebSite/Article/Product; “schema must match visible”)
   - **`llms.txt` SOP** (curate 10–30 URLs; WP plugin path; when not to oversell it)
   - **Content citeability guidelines** for writers (answer-first, stats, attribution, freshness)
   - **Shopify agent-ready product data checklist** (GTIN, brand, shipping/returns, metafields)
8. Map each checklist item to **who owns it** (dev / SEO / content / client) and **effort band** (S/M/L).

### Phase 4 — Educate & commercialize (week 7–10)

9. Lunch-and-learn: one deck = “Google says / OpenAI says / What we actually change on WP & Shopify.”
10. Package a **standard add-on** for proposals (Audit → Fixes → Monitoring) with clear outcomes: crawler access fixed, schema pass, AI referral tracking, citation spot-checks.
11. Set a **quarterly refresh** cadence—this space moves faster than classic SEO docs.

### Ongoing

12. Maintain a short “source of truth” folder: primary vendor docs + your SOPs; demote blog posts that contradict Google/OpenAI.
13. Track 2–3 internal pilot clients for 90 days (AI referrals in analytics, citation checks) so education isn’t anecdotal.

---

## Opportunities M&S can sell (without overpromising)

- **Crawler/CDN misconfig remediation** — high impact, often invisible to clients
- **Schema conflict cleanup** on WP (plugin + theme + ACF)
- **Shopify product data / agent readiness** audits tied to Shopify’s own Catalog narrative
- **Citeability content upgrades** on money pages (services, product, hub pages)
- **AI visibility reporting** as a retainer line (prompt sets + monthly citation scorecard)
- **Brand entity kits** (`Organization` + consistent NAP + `sameAs`) for multi-location / franchise clients

Avoid selling “we’ll rank you in ChatGPT” as a guarantee; sell **eligibility, clarity, and measurable visibility improvements**.

---

## Practical tip for searching

When Google returns generic SEO, search with these angles instead:

- `OAI-SearchBot` / `GPTBot` / `Claude-SearchBot` / `Google-Extended`
- `agentic product data` / `Shopify Catalog` / `MCP storefront`
- `"structured data" Copilot` / `citation` / `AI Overviews` site:developers.google.com
- `llms.txt` Yoast / Rank Math
- `GEO-bench` or `Aggarwal generative engine optimization`

That filters for access policy, agents, and platform docs—not “use H2s and backlinks.”

---

## Suggested next deliverable

Turn Phase 3 into a draft **WordPress AI-Readiness Checklist** (audit items + pass/fail + owner) for the agency wiki.
