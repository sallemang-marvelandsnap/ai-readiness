**AI-Readiness Research Guide**
===============================

**Internal steward notes for Marvel & Snap**Lead AI-Readiness Research and SOP Development for Client Sites (WordPress & Shopify)

This is the remaining-work version of the original research guide. Findings already captured live in ai-readiness-research-notes.md. Do not re-read sources listed as done; use the notes as the source of truth when drafting SOPs.

**M&S WordPress stack (implementation default):** Bricks + child theme + Yoast. Extend Yoast (filters, Schema API, llms.txt, robots editor) and Bricks (custom elements, CPTs, templates). Do not add an “AI SEO” plugin or a second llms.txt generator on a standard build. Shopify recommendations are unchanged.

**Companion files**

*   ai-readiness-research-guide.md — v1: original reading list and phased plan (kept for history)
    
*   ai-readiness-research-notes.md — organized findings from research so far
    

**Framing (unchanged, with one correction)**
--------------------------------------------

**AI-ready** is a stack of capabilities, not a replacement for SEO. A lot of “AI SEO” is classic SEO with new labels.

*   **Access policy** (beyond SEO table stakes: yes) — Training bots vs retrieval/search bots are separate; wrong robots.txt/CDN rules can erase AI citations. Findings in notes. Still verify against official bot docs and decide our default.
    
*   **Machine-readable facts** (beyond SEO table stakes: partially) — JSON-LD, product feeds/APIs, complete attributes. Schema: keep for rich results; **do not sell as a proven AI-citation lever** (Google + Ahrefs). Shopify product attributes still matter and are under-researched.
    
*   **Citation-ready content** (beyond SEO table stakes: yes) — Answer-first, quotable claims, stats, expertise signals. Adequately researched. Remaining work is the writer SOP.
    
*   **Agent / commerce readiness** (beyond SEO table stakes: yes) — Shopify Catalog, clean metafields, buyable recommendations. Headlines only. Official Shopify docs still need a real read. MCP/WebMCP/A2A are watch-list, not default scope.
    
*   **Measurement** (beyond SEO table stakes: yes) — Mentions/citations, AI referral traffic — not just rankings. Metric set is in the notes. Not yet run on a client or tool-selected.
    

Google (index-grounded, ignores llms.txt) and ChatGPT/Perplexity (own crawlers + live fetch) are different systems. One checklist cannot pretend to cover both; the crawler SOP must say so. That distinction is understood — it does not need more reading.

**Adequately researched — do not re-do**
----------------------------------------

Use the notes. Skip these as research tasks:

*   Google’s [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (including: no special AI schema, llms.txt neither helps nor hurts Google, GSC Generative AI report, content quality)
    
*   [llms.txt spec](https://llmstxt.org/), Chrome Lighthouse’s llms.txt audit (observability, not ranking), Yoast / Rank Math / AIOSEO feature docs, WPBeginner overview
    
*   [LLM Pulse GEO guide](https://llmpulse.ai/blog/geo-guide/) — citeability, fan-out, freshness, off-page aggregators, crawler list, KPI definitions
    
*   [How to make a website agent-ready](https://suganthan.com/blog/how-to-make-website-agent-ready/) — two-layer model, high-ROI five, schema evidence caveat, sample robots.txt, Link header rel values
    
*   [GEO audit for WP](https://wpseoai.com/blog/geo-audit-how-to-get-started-and-check-your-website-for-ai-readyness/) — audit sequence, tools, “don’t bury the lede”
    
*   [Backlinko GEO](https://backlinko.com/generative-engine-optimization-geo) — enough for the off-page / aggregator list
    
*   Citeability craft: answer-first, first 30% of the page, self-contained claims, comparison/best-of, pillar + fan-out, original data, quarterly refresh, multimodal
    
*   Semantic HTML / CLS / canonicals as AI-adjacent (already our process; remaining work is Bricks/Shopify starter gaps on real sites)
    
*   Measurement _framework_: mention rate, AI Visibility Score, SoV, citation source coverage, sentiment, GA4 AI referrals, branded-query lift
    
*   Emerging protocols (MCP Server Cards, A2A, WebMCP, OKF, Agent Skills, ai-catalog.json): enough to park as appendix. Do not put them in default SOPs.
    

**Still unread or only bookmarked** (not the same as “done”): Shopify’s three official articles + SearchMention; Google’s short [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) page; official OpenAI / Anthropic / Perplexity / Apple bot docs.

**Remaining reading (short)**
-----------------------------

Trust primary sources over blogs when they disagree with the notes.

### **Must read (gaps)**

1.  [**Google: AI features and your website**](https://developers.google.com/search/docs/appearance/ai-features)Short eligibility checklist (crawlable, text-available, schema matches visible content, Merchant Center / Business Profile). Not captured in the notes. Read so the audit checklist matches Google’s own bar.
    
2.  **Official crawler docs — verify the notes’ bot table, don’t rebuild it**
    
    *   [OpenAI bots](https://developers.openai.com/api/docs/bots) — confirm GPTBot vs OAI-SearchBot vs ChatGPT-User
        
    *   Anthropic and Perplexity equivalents (training vs search vs user-fetch)
        
    *   Apple (was in v1’s matrix, never researched)Optional helper: [AI crawler access decision matrix](https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix)
        
3.  **Shopify — actually read these; the notes only restated v1 headlines**
    
    *   [Prepare product data for AI channels](https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels)
        
    *   [Agentic-ready product data](https://www.shopify.com/enterprise/blog/agentic-ready-product-data)
        
    *   [Ecommerce schema guide](https://www.shopify.com/blog/ecommerce-schema)
        
    *   [SearchMention Shopify AI checklist](https://searchmention.com/blog/ai-search-optimization-for-shopify) — brand, GTIN, ratings, shipping/returns
        
4.  Distill into the Shopify product-data checklist. Do not re-summarize at headline level.
    

### **Worth a pass (implementation, not theory)**

1.  [**web.dev: agent-friendly websites**](https://web.dev/articles/ai-agent-site-ux#build_agent-friendly_websites_2) — notes used the a11y/button fragment; skim the rest for agent-UX items we should (or should not) put in SOPs.
    
2.  **Content Signals + Cloudflare managed robots.txt** — notes describe ai-train / search / ai-input / use=… and Cloudflare appending use=reference. Find the current Cloudflare/IETF writeup and decide a default for typical M&S clients (likely: allow retrieval, optional training opt-out, do not rely on Content Signals alone).
    
3.  **Yoast + Bricks, hands-on (not a plugin bake-off)**Rank Math / AIOSEO / [AI Ready WP](https://wordpress.org/plugins/ai-ready-wp/) / [LLMs Full Txt Generator](https://wordpress.org/plugins/llms-full-txt-generator/) are out of default scope. Confirm on a real M&S site: Yoast llms.txt with **manual page selection**; wpseo\_llmstxt\_link\_description using Yoast meta descriptions (Bricks post\_content is often empty); whether Yoast already emits AI User-agent rules; physical Yoast robots.txt vs robots\_txt filter (they don’t combine). Optional: Yoast Schema API + a Bricks FAQ element that does **not** print its own JSON-LD.
    

### **Optional / skip unless needed**

*   [GEO paper — Aggarwal et al.](https://arxiv.org/abs/2311.09735) — academic origin of GEO. Takeaway already in the notes via LLM Pulse (stats, quotations, citations beat keyword tricks). Skim only if you want to cite it in the lunch-and-learn.
    
*   [geoready.dev](https://geoready.dev/guides/generative-engine-optimization/) — already mined for answer-first and canonicals. Confirm what the site _is_ before linking it from an SOP; don’t re-read as a primary source.
    
*   Markdown negotiation (Cloudflare popularised; notes flag it as the best-fit “fifth item” for content sites). Only pursue if we have a Cloudflare-heavy client and 30 extra minutes. Not default WP/Shopify scope.
    
*   UCP, MCP, WebMCP, A2A, OKF, Agent Skills, /.well-known/ai.txt — watch list. Revisit quarterly, not before SOPs.
    

**Search tip (if you get generic SEO again):** OAI-SearchBot / ChatGPT-User / Claude-SearchBot / Google-Extended / Applebot; agentic product data / Shopify Catalog; "structured data" site:developers.google.com; Content Signals robots.txt Cloudflare.

**Remaining to-do**
-------------------

v1 Phases 1–2 reading is mostly done. What follows is **verify → see it on real sites → write SOPs → teach/sell**.

### **Close research gaps (days, not weeks)**

1.  **Write the 1-page internal definition** (still missing as a deliverable).AI-ready = Access + Facts + Citeability + (for ecom) Agent commerce, with SEO as the eligibility layer. Pull wording from the notes; include the Google vs ChatGPT/Perplexity split and the schema honesty clause.
    
2.  **Finish the bot policy matrix and our default.**Verify names/roles against official docs; add Apple; decide typical M&S default (allow all live-retrieval bots; training bots allow-unless-client-opts-out, or the reverse). Include Content Signals as optional/emerging. Answer: does Yoast already emit any of these User-agent rules?
    
3.  **Read and distill Shopify** (item 3 in remaining reading) into a checklist with owners.
    
4.  **Hands-on Yoast llms.txt on a Bricks site.** Enable it, switch to manual page selection, confirm noindex/password-protected/“hide from archive” URLs stay out. If auto descriptions are empty, that’s the Bricks post\_content gap — fix with Yoast meta descriptions + wpseo\_llmstxt\_link\_description, not another plugin.
    

### **Primary research on real client patterns (this is the remaining research)**

v1 never got here. The notes cannot substitute for it.

1.  **Audit 3–5 live WordPress sites and 2–3 Shopify sites** for:
    
    *   robots.txt + Cloudflare / bot-fight-mode AI rules (training vs retrieval)
        
    *   Rendered HTML vs JS-only or image-only critical content (Bricks FAQ/menus, CSS-in-image text, duplicate JSON-LD from SEO plugin + theme + ACF — this is still the agency-shaped gap; few public writeups)
        
    *   JSON-LD completeness / conflicts; Organization @id / sameAs; entity name consistency
        
    *   Presence/quality of /llms.txt (curated vs auto-dump; leaked private URLs)
        
    *   Product attribute completeness (Shopify) / schema + feeds (WP commerce)
        
    *   Bricks and Shopify starter a11y primitives (real buttons vs divs, labels, dialogs/menus)
        
    *   Optional: HTTP Link headers — only note whether we _can_ set rel="describedby" for llms.txt on that host (Cloudflare Transform Rule vs origin). Skip invented rel="llms" / rel="ai".
        
    *   Optional scan: [isitagentready.com](https://isitagentready.com/), [agentchecker.ai](https://agentchecker.ai/app/my-audits), or Lighthouse Agentic Browsing — as a cross-check, not a score to sell
        
2.  **Citation baseline** on 1–2 willing clients (or a prospect): 20–50 prompts in AI Overviews + ChatGPT first, then Perplexity and Gemini. Log mention, citation, accuracy, competitors. Process is in the notes §11.
    
3.  **Interview PM / dev / SEO:** where AI-readiness already shows up accidentally in scopes (schema, CWV, content rewrites) so the add-on doesn’t duplicate sold work.
    

### **Distill SOPs (raw material is in the notes)**

1.  Produce reusable deliverables. Map each item to **owner** (dev / SEO / content / client) and **effort** (S/M/L). Notes already have effort for the high-ROI five.
    

*   **AI-Readiness Audit Checklist** (WP + Shopify variants)
    
    *   Notes already cover: sequence, tools, citeability checks
        
    *   Still need: pass/fail language; Bricks/Shopify failure modes from live audits; Shopify product rows after reading official docs
        
*   **Crawler Policy SOP**
    
    *   Notes already cover: bot list, sample robots.txt, never-block-retrieval rule, Bing sitemap
        
    *   Still need: official-doc verification, Apple, whether Yoast already emits bot rules, **physical Yoast robots.txt vs robots\_txt filter**, Cloudflare bot-fight, Content Signals default, decision tree for clients who want to block training
        
*   **Schema & entity SOP**
    
    *   Notes already cover: what to implement vs what not to promise; Organization/Article/FAQ/HowTo/Product
        
    *   Still need: Yoast as sole @graph; Bricks FAQ/HowTo element → visible HTML + wpseo\_schema\_graph\_pieces; never a second JSON-LD script; “must match visible” examples
        
*   **llms.txt SOP**
    
    *   Notes already cover: honest positioning (Google ignores; coding agents use; Lighthouse observes); authoring tips
        
    *   Still need: Yoast-only path — manual curation of ~10–30 URLs; Bricks empty-excerpt workaround; leak exclusions; when _not_ to bother
        
*   **Content citeability guidelines**
    
    *   Notes already cover: answer-first, extractable claims, comparisons, freshness, multimodal
        
    *   Still need: writer-facing 1–2 pager; who owns quarterly refresh
        
*   **Shopify agent-ready product data**
    
    *   Notes already cover: theme schema gap list only
        
    *   Still need: full checklist from official Shopify reading
        
*   **Keep out of default SOPs:** MCP, WebMCP, A2A, OKF, Agent Skills, Markdown negotiation, ai-catalog.json, /.well-known/ai.txt. One-line “watch list / extra time” is enough.
    

### **Educate, package, and keep current**

1.  Lunch-and-learn deck: **Google says / OpenAI says / what we actually change on WP & Shopify.** Use the notes’ honesty clauses (schema, llms.txt).
    
2.  Package a **standard add-on** (Audit → Fixes → Monitoring). Sell eligibility, clarity, and measurable visibility — not “we’ll rank you in ChatGPT.” Outcomes: crawler access fixed, schema pass, llms.txt if cheap, AI referral tracking, citation spot-checks.
    
3.  Pick **one** visibility platform before promising retainers (Semrush AI Visibility, SE Ranking, Profound, Otterly, Ahrefs Brand Radar; LLM Pulse report as a cheap POC). Configure the query set _before_ implementation work.
    
4.  **Quarterly refresh** of this folder: vendor docs first; demote blogs that contradict Google/OpenAI. Include a 15-minute watch-list pass (UCP, Markdown negotiation, Shopify Catalog/MCP).
    
5.  Track **2–3 pilot clients for 90 days** (GSC Generative AI report, GA4 AI referrals, citation checks) so education isn’t anecdotal.
    

**Opportunities M&S can sell (without overpromising)**
------------------------------------------------------

Unchanged in spirit; sharper from the notes:

*   **Crawler/CDN misconfig remediation** — high impact, often invisible; include Bing sitemap submission as launch hygiene
    
*   **Schema conflict cleanup** on WP (Yoast + Bricks + ACF), sold as rich-results + entity hygiene, not ChatGPT rankings
    
*   **Reusable Bricks + Yoast kit** in the child theme: FAQ (and later HowTo / answer-first / comparison) elements that output semantic HTML _and_ a Yoast graph piece; shared robots.txt AI-bot snippet; Yoast llms.txt curation defaults
    
*   **Shopify product data / agent readiness** audits tied to Shopify’s Catalog narrative (after we actually read those docs)
    
*   **Citeability upgrades** on money pages (answer in the first 2–3 paragraphs / first 30%)
    
*   **llms.txt as a cheap hygiene line** — honest: no Google benefit; some agents and Lighthouse look for it
    
*   **AI visibility reporting** as a retainer (prompt set + monthly scorecard: mention rate, AI Visibility Score, SoV, sentiment, AI referrals)
    
*   **Brand entity kits** (Organization + consistent NAP + sameAs) for multi-location / franchise clients
    
*   **Off-page / aggregator advisory** (GBP, Wikipedia/Wikidata, review sites) — usually client/marketing-owned; we raise it, we don’t pretend a WP build fixes it
    

Avoid selling MCP, WebMCP, or “agentic protocols” on brochure sites.

**Open questions the notes still need answered on real sites**
--------------------------------------------------------------

1.  Does Yoast already output AI-crawler robots.txt rules? If we add them, Yoast file editor vs robots\_txt filter — which do we standardize on?
    
2.  Yoast llms.txt on Bricks: empty descriptions because post\_content is empty? Password-protected / noindex / “Hide from archive?” leaking?
    
3.  Can we set Link: ; rel="describedby" on typical WP hosts / Shopify / Cloudflare-in-front — and is it worth it?
    
4.  Which a11y primitives are missing in _our_ Bricks kit (and Shopify starter)?
    
5.  Confirm A2A agent.json does not apply to standard client sites (almost certainly skip).
    
6.  Default training-bot policy for a typical M&S client.
    
7.  Is a child-theme FAQ element + Yoast Schema API worth a standard component (yes, if we can keep one graph and visible Q&A in sync)?
    

**Suggested next deliverable**
------------------------------

Still the right next artifact: a draft **WordPress AI-Readiness Checklist** (audit items + pass/fail + owner) for the agency wiki, sourced from the notes, with holes labeled “confirm on live audit” rather than invented.

Do that in parallel with the short remaining reads (Google AI features page, official bot docs, Shopify distill). Do not wait for emerging-protocol research.