# Lead AI-Readiness Research and SOP Development for Client Sites

Become the internal steward for helping Marvel & Snap make client websites more AI-ready.

This work includes researching how AI is changing search, discovery, and user experience, then translating those findings into clear, practical guidance for the team. The goal is to help us understand what “AI-ready” means for client sites and create repeatable standards we can use across projects.

Responsibilities:

* Research current and emerging best practices for AI-readiness in websites
* Identify how AI is affecting search visibility, content discovery, structured data, UX, and site architecture
* Document practical recommendations the team can apply to client work (Both WordPress and Shopify sites)
* Create SOPs, checklists, and internal guidance for preparing sites for AI-driven search and discovery
* Help educate the team on key findings and recommended implementation approaches
* Surface opportunities where Marvel & Snap can improve client outcomes through AI-readiness work

+++ Research Notes - v1

+++ **Shopify info**

* [**Shopify: Prepare product data for AI channels**](<https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels>)
* [**Shopify: Agentic-ready product data**](<https://www.shopify.com/enterprise/blog/agentic-ready-product-data>) — Catalog, Agentic Storefronts, structured facts over marketing paste.
* [**Shopify: Ecommerce schema guide**](<https://www.shopify.com/blog/ecommerce-schema>)
* [**SearchMention: AI search optimization for Shopify checklist**](<https://searchmention.com/blog/ai-search-optimization-for-shopify>) — theme schema gaps (`brand`, GTIN, ratings, shipping/returns)—very practical for audits.

+++

## Resources/Reading list

* [https://wordpress.org/plugins/ai-ready-wp/](<https://wordpress.org/plugins/ai-ready-wp/>)
* [https://wordpress.org/plugins/llms-full-txt-generator/](<https://wordpress.org/plugins/llms-full-txt-generator/>)
* [https://support.google.com/webmasters/answer/16908024](<https://support.google.com/webmasters/answer/16908024>)
* [https://developers.google.com/search/docs/essentials/technical](<https://developers.google.com/search/docs/essentials/technical>)
* [https://suganthan.com/blog/how-to-make-website-agent-ready/](<https://suganthan.com/blog/how-to-make-website-agent-ready/>)
  * Recommendations for agents
    - [X] **Page structure:** Semantic HTML, stable layout, ARIA, accessibility primitives, the rendered DOM. *Already part of our process, other than any additional core a11y features we discover Bricks and/or Shopify starter is lacking*
    - [ ] **“Protocol-level surface.” Everything around the page. What is discoverable without rendering.** robots.txt, sitemap.xml, Link headers, llms.txt, the entire /.well-known/ directory, Markdown negotiation, OAuth metadata, MCP and A2A discovery, WebMCP, commerce protocols.
  * To research:
    * llms.txt, 
      * [https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt](<https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt>)
    * MCP Server Cards, 
    * OAuth metadata, 
    * A2A discovery, 
    * Markdown negotiation
    * [**Open Knowledge Format**](<https://suganthan.com/blog/open-knowledge-format/>)
    * ai.txt
      * **AI discovery** — well-known files and machine-readable summaries, such as `/.well-known/ai.txt` and JSON summary or FAQ endpoints, that describe what your site offers. [https://geoready.dev/guides/generative-engine-optimization/](<https://geoready.dev/guides/generative-engine-optimization/>)—what is this, what is its purpose?
* [https://isitagentready.com/](<https://isitagentready.com/>)
  * [https://isitagentready.com/www.openspace.ai](<https://isitagentready.com/www.openspace.ai>) (OpenSpace audit)
* [https://agentchecker.ai/app/my-audits](<https://agentchecker.ai/app/my-audits>)
* [https://www.semrush.com/ai-seo/overview/](<https://www.semrush.com/ai-seo/overview/?utm_campaign=generative-engine-optimization-geo&utm_source=backlinko.com&utm_medium=referral>)
* [https://glippy.dev/](<https://glippy.dev/>)
* 
  > ## **The minimum viable agent-ready site**
  * [https://docs.google.com/spreadsheets/d/1f_oJM2xTokmxphQ5lHAow28fEm4GZhUsu2nGzd-XzJQ/edit?usp=sharing](<https://docs.google.com/spreadsheets/d/1f_oJM2xTokmxphQ5lHAow28fEm4GZhUsu2nGzd-XzJQ/edit?usp=sharing>)
  * Of the dozen components above, five give the most defensible return per minute of effort.
    * **AI bot rules in** `robots.txt`. 5 minutes. Controls who can crawl you. Skipping this is the loudest way to be invisible.
    * `llms.txt`. 30 minutes. Cheap to ship. Some AI agents (Perplexity, Claude by their own statements) check for it, and Chrome’s Lighthouse documentation now expects it. None of this guarantees citations, but the file is short and the cost of being wrong is zero.
    * **Page-level semantic HTML and accessibility.** Variable effort. Overlaps with traditional SEO and UX. Ship it regardless.
    * **Sitemap and Link headers.** 15 minutes if your sitemap is not done. Table stakes for discoverability.
    * **Markdown negotiation OR WebMCP/MCP Server Card.** Pick one based on site type. Content sites benefit more from Markdown negotiation (cheaper parse for the agents fetching you). Tool-rich sites (apps, dashboards, anything with an API) benefit more from MCP/WebMCP.

## Research notes

* Schema
  * [https://suganthan.com/blog/how-to-make-website-agent-ready/](<https://suganthan.com/blog/how-to-make-website-agent-ready/>)
    * "The closest causal study, [**Ahrefs across 1,885 pages**](<https://ahrefs.com/blog/schema-ai-citations/>), found no significant 30-day citation uplift from schema (the most-studied protocol-layer signal)."
    * "The specific claim that adding structured data directly drives AI citations has weak evidence."
  * **Overfocusing on structured data**: Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add. However, it's a good idea to continue using it as part of your overall SEO strategy, as it helps with being eligible for rich results on Google Search. ([https://developers.google.com/search/docs/fundamentals/ai-optimization-guide](<https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>))

## Best practices

* **CONTENT QUALITY:** [https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#create-valuable-content](<https://developers.google.com/search/docs/fundamentals/ai-optimization-guide#create-valuable-content>)
  * Content relevance/matching to user intent: “**comparison and ‘best-of’ queries**”: Generative engines lean on “X vs Y”, “best X for Y”, and “alternatives to X” content because users phrase their AI queries that way. ([https://llmpulse.ai/blog/geo-guide/))](<https://llmpulse.ai/blog/geo-guide/))>)
  * Clear, concise content: “Lead with the answer. Use clear H2 and H3 headings. Use short paragraphs. Use bulleted and numbered lists where the content is genuinely listable. Tables are excellent for comparable data.” ([https://llmpulse.ai/blog/geo-guide/)](<https://llmpulse.ai/blog/geo-guide/)>)
  * **Self-contained claims.** Every important claim should be a complete, attributable sentence. “Pricing starts at €49 per month” is extractable. “It’s affordable, starting in the range we mentioned earlier” is not. ([https://llmpulse.ai/blog/geo-guide/)](<https://llmpulse.ai/blog/geo-guide/)>) 
  * “Topical depth over keyword breadth.” “Build content clusters around a pillar.” ([https://llmpulse.ai/blog/geo-guide/)](<https://llmpulse.ai/blog/geo-guide/)>)
  * **Original data and proprietary research.** Nothing earns citations like a number nobody else has. Surveys, benchmarks, case studies, and internal data sets are the highest-leverage content investments for GEO because they are inherently quotable and inherently unique. ([https://llmpulse.ai/blog/geo-guide/)](<https://llmpulse.ai/blog/geo-guide/)>)
  * **Lead with the answer.** The first paragraph of a page should state what the thing is or what you do, in one clear sentence, before any context. This is the passage a model is most likely to lift. ([https://geoready.dev/guides/generative-engine-optimization/)](<https://geoready.dev/guides/generative-engine-optimization/)>)
* **AVOID LAYOUT SHIFTS: Stable layout.** Avoid layout shifts. CLS matters for users and for agents that take screenshots between actions. Reserve space for images, fonts, and dynamic content. The Core Web Vitals work most teams already do covers this. ([https://suganthan.com/blog/how-to-make-website-agent-ready/](<https://suganthan.com/blog/how-to-make-website-agent-ready/>))
* Semantic HTML/CSS. ✅
  * Incl. “**Fallback roles when you must use divs.** If a div has to be a button (legacy code, design system constraint), add `role="button" tabindex="0"` so it shows up in the accessibility tree. Same for menus, dialogs, listboxes.” And also `cursor:pointer` for clickable elements and form labels mapped to their inputs. ([https://suganthan.com/blog/how-to-make-website-agent-ready/](<https://suganthan.com/blog/how-to-make-website-agent-ready/>), [https://web.dev/articles/ai-agent-site-ux#build_agent-friendly_websites_2](<https://web.dev/articles/ai-agent-site-ux#build_agent-friendly_websites_2>))
* SEO Basics & related
  * Off-page GEO/AI PR: Besides quality content, hierarchical content, backlinks, etc., look at common, appropriate aggregators or platforms—Google My Business, Yelp, Wikipedia, Apple Maps, LinkedIn page; engaging on Reddit, LinkedIn comments, Youtube transcripts, Quora, G2, Capterra, Trustpilot, and category-specific review sites—as well as submitting to Wikidata, Search Console (naturally), the Bing version of search console ([https://www.youtube.com/watch?v=bhTo8fDmr5I](<https://www.youtube.com/watch?v=bhTo8fDmr5I>); [https://backlinko.com/generative-engine-optimization-geo,](<https://backlinko.com/generative-engine-optimization-geo,>) [https://llmpulse.ai/blog/geo-guide/](<https://llmpulse.ai/blog/geo-guide/>))
  * Cite authoritative sources to be treated as authoritative source; named quotations and specific datapoints as well; use a professional, authoritative tone ([https://llmpulse.ai/blog/geo-guide/)](<https://llmpulse.ai/blog/geo-guide/)>)
  * Because of 'fan-out' querying, a "pillar page"(?) should, if appropriate, speak to related topics. (e.g. "Best CRM for small business, best CRM for sales teams…") ([https://llmpulse.ai/blog/geo-guide/)](<https://llmpulse.ai/blog/geo-guide/)>)
  * Recency bias: “Build a quarterly refresh cycle for your top-citing pages, change the year in the title where appropriate, add new data and new examples, and resubmit.” ([https://llmpulse.ai/blog/geo-guide/](<https://llmpulse.ai/blog/geo-guide/>))
  * **Multimodal generative answers.** AI Mode, Gemini, and ChatGPT all increasingly synthesise text, images, video, and audio into a single answer. Optimising images (alt text, structured Image schema), videos (clean transcripts, chapter markers), and audio (transcripts, podcasts with markup) becomes part of GEO, not separate from it. [https://llmpulse.ai/blog/geo-guide/](<https://llmpulse.ai/blog/geo-guide/>)
  * **Set a single canonical URL** per page and keep trailing slashes consistent, so retrieval systems do not split trust across duplicates. [https://geoready.dev/guides/generative-engine-optimization/](<https://geoready.dev/guides/generative-engine-optimization/>)
* Agentic 'UX'
  * If this is something that's relevant to your business and you have extra time, check out the available agentic experiences and review the guide to [agent-friendly website best practices](<https://web.dev/articles/ai-agent-site-ux>), which gives some insights into how a website can generally prepare for current browser agents. Protocols like [Universal Commerce Protocol](<https://ucp.dev/latest/>) (UCP) are emerging that will allow Search agents to do more. ([https://developers.google.com/search/docs/fundamentals/ai-optimization-guide](<https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>))
* robots.txt
  * From [https://suganthan.com/blog/how-to-make-website-agent-ready/](<https://suganthan.com/blog/how-to-make-website-agent-ready/>)
    * 
      ```
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
    * Does Yoast or WP already handle this?
    * Content Signals in robots.txt:
      * `ai-train=yes|no`: whether your content can be used to train AI models
      * `search=yes|no`: whether your content can be used in AI search results (citation)
      * `ai-input=yes|no`: whether your content can be used as runtime input to AI systems (RAG, grounding)
      * `use=immediate|reference|full`: what a bot may keep and reshare after reading you. `immediate` means use it once and store nothing, `reference` means index, excerpt and link back (the default), `full` means summarise and reproduce it wholesale.
      * Most publishers picking it up today set `ai-train=no, search=yes, ai-input=yes`, and Cloudflare’s managed robots.txt now appends `use=reference` on top.
    * **Allow the right AI crawlers (and know who they are).** The crawlers that drive citations in 2026 include OAI-SearchBot and ChatGPT-User (OpenAI live retrieval), GPTBot (OpenAI training, optional), PerplexityBot and Perplexity-User (Perplexity), Google-Extended (Gemini training, optional), Googlebot (Google index, which powers AI Overviews and AI Mode), Claude-SearchBot and Claude-User (Anthropic live retrieval), ClaudeBot (Anthropic training, optional), CCBot (Common Crawl, downstream of many engines), and Bingbot (which feeds Copilot and historically ChatGPT). Block the training bots if you must (that only affects whether your content is used for model training; the citation-driving live bots are a separate matter), but never block the live retrieval bots if you want citations. OpenAI explicitly states that sites blocking OAI-SearchBot will not appear in ChatGPT search answers. ([https://llmpulse.ai/blog/geo-guide/)](<https://llmpulse.ai/blog/geo-guide/)>)
* Sitemap
  * Every site should already have a sitemap. The agent-readiness upgrade is the `Link` HTTP header, which surfaces important resources to agents that scan headers before bothering with HTML. Be warned. Not every `rel` value is “agent-useful”. You will see writeups recommending `rel="llms"`, `rel="ai"`, or other invented values. (If you’re wonder why I have it, thats because I’m doing a different experiment)
  * Agent-aware scanners ignore those because they are not in the [**IANA Link Relations registry.**](<https://www.iana.org/assignments/link-relations/link-relations.xhtml>) The four that actually matter for agents are all RFC-registered.
    * `rel="api-catalog"` (RFC 9727). Points to a list of your APIs.
    * `rel="service-desc"` (RFC 8631). Points to a machine-readable API spec like OpenAPI.
    * `rel="service-doc"` (RFC 8631). Points to human-readable API docs.
    * `rel="describedby"` (RFC 8288). Points to a description of the site, which is the right rel for `llms.txt`.
  * On Cloudflare Pages or Workers, add to your `_headers` file (*what file is this?!–ed)*:

    ```plaintext
    /*
      Link: </sitemap-index.xml>; rel="sitemap"
      Link: </.well-known/api-catalog>; rel="api-catalog"
      Link: </api/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"
      Link: </llms.txt>; rel="describedby"; type="text/markdown"
    ```

    On other hosts, set the same headers via your framework’s response middleware. The `type=` parameters tell agents what they are looking at before they bother fetching the file.
  * ChatGPT may use Bing's indexing. Submit sitemap to Bing. ([https://www.youtube.com/watch?v=bhTo8fDmr5I](<https://www.youtube.com/watch?v=bhTo8fDmr5I>))
* llms.txt
  * A plain text file at the root of your domain that summarises what your site is, what is on it, and which pages matter most. The spec lives at [**llmstxt.org**](<https://llmstxt.org/>).

    A minimal example:

    ```plaintext
    # Suganthan Mohanadasan
    
    > Personal website and blog of Suganthan Mohanadasan, a search journey optimisation consultant and co-founder of Snippet Digital and Keyword Insights.
    
    ## Blog Posts
    
    - [The Three Lives of Schema Markup](https://suganthan.com/blog/three-lives-of-schema-markup/): How Google and LLMs actually use schema across rendering, training, and runtime grounding.
    - [Cloudflare Markdown for Agents](https://suganthan.com/blog/cloudflare-markdown-for-agents/): 44 days of data on what AI crawlers actually requested from a live site.
    
    ## About
    
    - [About Suganthan](https://suganthan.com/about/)
    ```
  * The observable use case is coding agents looking up technical documentation, not chatbots grounding answers about your site at query time. Claude Code is the cleanest example.
  * **What Google says.** The Search team’s [**AI optimization guide**](<https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>) is explicit. “You don’t need to create new machine readable files, AI text files, markup, or Markdown to appear in generative AI search.” That is a definitive statement from Google about Google’s systems and consistent with the broader observation that chatbot grounding does not consult `llms.txt`. \[ . . . \] **Chrome Lighthouse audit (May 2026).** Chrome’s Lighthouse now includes an [`llms.txt` audit](<https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt>) inside a new “Agentic Browsing” category. It is opt-in observability, not endorsement.
    * It's completely fine if you decide to create and maintain LLMS.txt files (or other similar files) for other services or systems that use these files. Doing so will neither harm nor help your site's visibility or rankings in Google Search, as Google Search ignores them. ([https://developers.google.com/search/docs/fundamentals/ai-optimization-guide](<https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>))
  * Tips from [https://llmstxt.org/](<https://llmstxt.org/>)
    * Use concise, clear language.
    * When linking to resources, include brief, informative descriptions.
    * Avoid ambiguous terms or unexplained jargon.
    * Run a tool that expands your `llms.txt` file into an LLM context file and test a number of language models to see if they can answer questions about your content.
  * llms.txt is a proposed plain-text manifest for AI-oriented consumers. Major search crawlers have not confirmed that it changes citation eligibility, so do not use it as a substitute for crawlable HTML, internal links, robots.txt, or sitemap.xml. If you choose to publish one, keep its claims and links current. ([https://llmpulse.ai/blog/geo-guide/](<https://llmpulse.ai/blog/geo-guide/>))
  * **Agentic search and AI-to-AI queries.** By 2027, a meaningful share of “searches” will not be typed by humans. … Those agents will read your site programmatically, lean heavily on llms.txt, structured data, and clean APIs, and will favour brands that have invested in agent-readable infrastructure. … Start treating your top product and category pages as API surfaces, not just web pages. ([https://llmpulse.ai/blog/geo-guide/](<https://llmpulse.ai/blog/geo-guide/>))
  * Yoast:
    * [https://yoast.com/features/llms-txt/](<https://yoast.com/features/llms-txt/>)
    * [https://developer.yoast.com/features/llms-txt/functional-specification](<https://developer.yoast.com/features/llms-txt/functional-specification>)
    * Yoast competitor RankMath: [https://rankmath.com/kb/llms-txt/](<https://rankmath.com/kb/llms-txt/>) (for comparison: lets you select post types and taxonomies, set a limit, set additional content); 
      * All in One SEO has this feature as well. Pro version includes llms-full.txt, "Convert posts to Markdown"; post type/taxonomy selection; specific post/term exclusion.
  * Note: llms-full.txt also exists as a… convention(?) ([https://www.wpbeginner.com/wp-tutorials/what-is-llms-txt-how-to-add-llms-txt-in-wordpress/)](<https://www.wpbeginner.com/wp-tutorials/what-is-llms-txt-how-to-add-llms-txt-in-wordpress/)>)
  * NOTE: If hand-rolling this (automatically), ensure it doesn't expose password protected content. (As well as things like "Hide from archive?" on OpenSpace?)
* **Open Knowledge Format (OKF)**
  * A bundle is a folder of markdown files, one per page, each tagged with what it is and cross-linked into a graph the agent can walk. The honest position is the same as the rest of this layer. Nothing crawls the web for these bundles yet, and Google built the format for data teams sharing tables, not for blogs, so pointing it at a website is a repurposing. The immediate payoff is not traffic, it is a clean machine-legible copy of your content plus a map of how your pages link, which doubles as a free structural audit. Status: brand new (v0.1, June 2026). Google-backed but unread on the open web today. A low-cost early bet, not a traffic source yet.
* **Markdown negotiation**
  * When an agent sends `Accept: text/markdown`, return a markdown version of the page rather than the HTML. Agents parse markdown significantly more efficiently than HTML, both in tokens and in extraction quality. Status: emerging. Cloudflare popularised it. It is not yet a formal standard, but multiple agents now check for it.
* `.well-known/mcp/server-card.json` **(MCP Server Card)**
  * If your site exposes an MCP server, the MCP Server Card is how agents discover it. Two paths exist today.
    * `/.well-known/mcp/server-card.json` is the standardising convention in the MCP repo. Expected shape includes `serverInfo` (name, version), a `transport` block, a `capabilities` block, and the tools list.
    * `/.well-known/mcp-server.json` is the older flat convention some early scanners and implementations still check for.
      * Easiest move is to serve both during the transition. This is for sites that host an MCP server. If you have not built one, skip this and come back when you have. The spec is maintained at modelcontextprotocol.io. Status: emerging. SEP-1649 is the standardising direction. Serve both paths until the older one is fully retired.
      * 
        ```
        {
          "serverInfo": {
            "name": "Suganthan's MCP Server",
            "version": "1.0.0"
          },
          "description": "Tools for searching and reading Suganthan Mohanadasan's blog posts and notes.",
          "transport": {
            "type": "webmcp",
            "endpoint": "https://suganthan.com/mcp/"
          },
          "capabilities": {
            "tools": true
          },
          "tools": [
            {"name": "search_posts", "description": "Search blog posts by keyword"},
            {"name": "get_post", "description": "Get the full content of a specific post"},
            {"name": "list_posts", "description": "List all blog posts"},
            {"name": "get_site_info", "description": "Get site metadata"}
          ]
        }
        ```
* 
  > ### `.well-known/agent.json` **(A2A Agent Card)**
  * If your site is itself an agent, that is, it offers services another agent might call, Google’s A2A protocol uses `/.well-known/agent.json` for discovery. (Does not apply for any of our use cases?)
* `.well-known/ai-catalog.json` **(Agentic Resource Discovery)**
  * published [**Agentic Resource Discovery**](<https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/>), a spec for how agents find tools, agents, and APIs across the web. Where the MCP Server Card and the A2A Agent Card each advertise one capability, ARD’s `ai-catalog.json` is the single index that points at all of them at once. `ai-catalog.json` lists tools, MCP servers, A2A agents, and nested catalogs, and it adds a second half `api-catalog` has no concept of, registries that crawl those catalogs across the web and answer natural-language queries. Think the agentic web’s version of a search engine.
* **WebMCP**
  * Two different things share this name. They solve the same problem differently and an agent-ready site eventually wants both. A site that wants to be agent-ready in both today’s world and tomorrow’s ships both.
    * **[jasonjmcghee/WebMCP](<https://github.com/jasonjmcghee/webmcp>) (JavaScript library, works today).** A drop-in JS widget that exposes tools to MCP clients via a local WebSocket bridge. Works in any browser including stable Chrome, Safari, and Firefox. Agents connect through a local helper process.
    * **W3C / Chrome WebMCP (browser-native API).** A proposed browser API exposed as `navigator.modelContext`. Currently in Chrome Beta behind a flag. When called, it registers tool definitions directly with the browser, no bridge required. Chrome’s Early Preview Program launched in February 2026 and the standards work continues at TC39.
* **Agent Skills**
  * Anthropic’s [**agentskills.io**](<https://agentskills.io/>) defines skills (named, versioned, agent-invokable capabilities). A `skills.json` at your site’s well-known location lets agents discover what your site can do, separate from what your content is about. Status: bleeding edge. Spec still under active development.

## SOPs

* Auditing guide: [https://wpseoai.com/blog/geo-audit-how-to-get-started-and-check-your-website-for-ai-readyness/.](<https://wpseoai.com/blog/geo-audit-how-to-get-started-and-check-your-website-for-ai-readyness/.>) 
  * Which suggests using:
    * Search Console
    * Screaming Frog
      * For Schema audit. Has an export feature for this inventory. Run results through Rich Results and/or Schema validator.
    * Google Rich Results/Schema Validator
    * AI monitoring tool, e.g. Otterly, Profound, SEMrush
    * Server logs
  * Additional tips:
    * Audit About page for Organization schema, @id that matches home URL, sameAs links, Google's natural language API “to check entity salience scores across your key pages”
    * “Check for entity fragmentation”—i.e., make sure brand/product names are consistent. e.g., don't use OpenSpace Track have the time and OS Track the other half. (Content issue.)
    * Schema 'musts': Prioritize FAQPage schema for any page that contains question-and-answer content. Research from Relixir analyzing 50 sites found that pages with FAQPage schema achieved a citation rate roughly 2.7 times higher than pages without it. Add Organization schema to your homepage and About page if it is missing. Use HowTo schema on instructional content and Article or BlogPosting schema on editorial pages.
    * Don’t bury the lede: Research from CXL found that more than half of AI Overview citations come from the first 30% of page content. Audit your most important pages and ask: does the key answer appear near the top, or is it buried after several paragraphs of context-setting? Restructure pages so the direct answer leads, with supporting detail following.
      * Check whether the core answer appears within the first two to three paragraphs
      * Break dense paragraphs into self-contained blocks of two to four sentences, each covering one idea
      * Convert H2 and H3 headings to question style where the content beneath answers a specific user query
    * Set benchmarks and monitor results:
      * Write a list of 20 to 50 queries that represent how your target audience would ask about your products, services, or topics
      * Run each query in ChatGPT, Perplexity, Google AI Overviews, and Gemini
      * Record results in a spreadsheet with columns for: query, platform, brand mentioned (yes/no), website cited (yes/no), what the AI said, accuracy of the description, and which competitors appeared
      * Start with Google AI Overviews and ChatGPT. AI Overviews affect the most search traffic directly, and ChatGPT generates the majority of AI referral traffic
      * For ongoing tracking, connect a dedicated AI visibility platform. [Semrush’s AI Visibility Toolkit](<https://www.semrush.com/free-tools/ai-search-visibility-checker/>) automates scans across ChatGPT, Gemini, SearchGPT, and Perplexity. SE Ranking’s AI Search Toolkit, Profound, Otterly, and Ahrefs Brand Radar all offer citation tracking with varying platform coverage. Choose one platform and configure it to track your core query set before you move on to fixing anything.
      * Define KPIs at start: benchmark, monitor
* Search Console
  * To measure how your content is performing in generative AI features on Google Search and Discover, use the [Generative AI performance report](<https://support.google.com/webmasters/answer/16984139>) in Search Console. This can help you get an idea of how people are discovering your content through generative AI features on Google Search. ([https://developers.google.com/search/docs/fundamentals/ai-optimization-guide](<https://developers.google.com/search/docs/fundamentals/ai-optimization-guide>))
* Measure outcomes:
  * NOTE: Could use [https://llmpulse.ai/](<https://llmpulse.ai/>) as comparison, proof of concept. Test the [https://llmpulse.ai/ai-visibility-report.](<https://llmpulse.ai/ai-visibility-report.>)
  * What to track ([https://llmpulse.ai/blog/geo-guide/](<https://llmpulse.ai/blog/geo-guide/>)):
    * **Visibility (or mention rate).** Percentage of prompts in your target set where your brand appears in the answer, measured per engine. This is the foundational metric. Median visibility across measured brands in their core category is 8 to 12 percent; category leaders sit at 40 percent or above.
    * **Position-weighted visibility (AI Visibility Score).** A weighted version that rewards earlier mentions. Position 1 in the response is worth 100 percent, position 2 is worth 50 percent, position 3 is worth 33 percent, and so on. This is the closest analogue to “average position” in SEO and the cleanest single number to put on a dashboard.
    * **Share of Voice (SoV).** Your mentions divided by the sum of mentions for your tracked brand and configured competitors, expressed as a percentage. Keep the prompt set, competitor list, engines, locales, and schedule stable when comparing changes over time.
    * **Citation source coverage.** Of the third-party sources the engines cite for your category prompts, how many include your brand, your product, or your URLs. This is the off-page GEO scoreboard: it tells you whether your earned media, Wikipedia presence, reviews, and PR are actually showing up where it counts.
    * **Sentiment.** Are the mentions positive, neutral, or negative? Mention rate without sentiment is dangerous: a competitor named in a negative context is, in fact, in a worse position than not being mentioned at all. [Brand sentiment analysis](<https://llmpulse.ai/features/brand-sentiment>) is non-negotiable for serious GEO programmes.
    * **AI-referred traffic** (set up in GA4 with referrer filters for chat.openai.com, perplexity.ai, gemini.google.com, and so on) 
    * **Branded query lift** (Google Search Console trend on your brand name and key product names).

+++

+++ Next steps – Aug. 2026

**Internal steward notes for Marvel & Snap**  
Lead AI-Readiness Research and SOP Development for Client Sites (WordPress & Shopify)

A lot of “AI SEO” is classic SEO with new labels. **AI-ready** is a stack of capabilities—not a replacement for SEO.

* **Access policy** (beyond SEO: yes) — Training bots vs retrieval/search bots are separate; wrong `robots.txt` / CDN rules can erase AI citations.
* **Machine-readable facts** (beyond SEO: partially) — JSON-LD, product feeds, complete attributes. Keep schema for rich results; do not sell it as a proven AI-citation lever. Shopify product data still matters.
* **Citation-ready content** (beyond SEO: yes) — Answer-first, quotable claims, stats, expertise signals (form and density, not keywords).
* **Agent / commerce readiness** (beyond SEO: yes) — Shopify Catalog, clean metafields, buyable recommendations. MCP and similar protocols are not default brochure-site scope.
* **Measurement** (beyond SEO: yes) — Mentions/citations in AI answers and AI referral traffic—not just rankings.

**WordPress implementation default:** Bricks + child theme + Yoast. Extend those (hooks, Schema API, custom elements). Do not add Rank Math, AIOSEO, or a second `llms.txt` / “AI SEO” plugin on a standard build.

Findings from the first research pass live in this [Google doc](<https://docs.google.com/document/d/1Z4bcCaEeeuLYf_84MEjt_cdqYhYR2mlZBMEfY4Haohs/edit?tab=t.0#heading=h.uzjzqbstvazq>). This note is only remaining work: what to read, what to try, what to build.

---

## Reading list (prioritized)

Trust primary sources over blogs when they disagree.

### Tier 0 — Primary sources still to read

1. [**Google: AI features and your website**](<https://developers.google.com/search/docs/appearance/ai-features>)  
   Short eligibility checklist: crawlable, text-available, schema matches visible content, Merchant Center / Business Profile. Needed so the audit checklist matches Google’s own bar.
2. [**OpenAI crawlers**](<https://developers.openai.com/api/docs/bots>)  
   Confirm `GPTBot` (training) vs `OAI-SearchBot` / `ChatGPT-User` (live retrieval). Sites that block `OAI-SearchBot` do not appear in ChatGPT search.
3. **Anthropic, Perplexity, and Apple bot docs** (same treatment as OpenAI)  
   Training vs search vs user-fetch for each. Apple was never researched. Optional helper: [AI crawler access decision matrix](<https://www.digitalapplied.com/blog/ai-crawler-access-control-2026-robots-llms-txt-decision-matrix>).
4. **Content Signals + Cloudflare** `robots.txt`  
   Find the current Cloudflare / IETF writeup for `ai-train`, `search`, `ai-input`, and `use=immediate|reference|full`. Decide whether typical M&S clients get retrieval-allow + optional training opt-out, and do **not** rely on Content Signals alone.

### Tier 1 — Yoast + Bricks (implementation, not theory)

 5. **Yoast:** [`llms.txt` **feature**](<https://yoast.com/features/llms-txt/>) + [**functional spec**](<https://developer.yoast.com/features/llms-txt/functional-specification/>)  
    Hands-on, not another article pass. Confirm: manual page selection, which post types are included, whether noindex / password-protected URLs are excluded, and which filters exist on the version we ship (`wpseo_llmstxt_link_description`, `wpseo_llmstxt_content`, `wpseo_llmstxt_filesystem_path`).
 6. **Yoast: [Schema API](<https://developer.yoast.com/features/schema/api/>)** + [**integration guidelines**](<https://developer.yoast.com/features/schema/integration-guidelines/>)  
    How to add FAQ/HowTo (and similar) as graph pieces from a Bricks element—without a second JSON-LD script.
 7. **Yoast: [editing](<https://yoast.com/help/how-to-edit-robots-txt-through-yoast-seo/>)** [`robots.txt`](<https://yoast.com/help/how-to-edit-robots-txt-through-yoast-seo/>)  
    Physical file vs WordPress virtual `robots.txt`. The `robots_txt` filter does nothing once Yoast has written a file to disk. Decide one official path for M&S sites.
 8. **Bricks custom elements / child-theme docs** (whatever we already use internally)  
    Enough to ship an FAQ (etc.) element: semantic HTML, controls, and a PHP callback that can feed Yoast. Also check whether any Bricks core or nestable element already emits FAQ/HowTo schema (that would conflict).
 9. [**web.dev: agent-friendly websites**](<https://web.dev/articles/ai-agent-site-ux#build_agent-friendly_websites_2>)  
    Skim for agent-UX items we should (or should not) put in SOPs beyond semantic HTML and stable layout.
10. [**Chrome Lighthouse:** `llms.txt` **/ Agentic Browsing**](<https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt>)  
    Decide if this is an audit cross-check we run, not a score we sell.

### Tier 2 — Shopify / commerce (still unread in depth)

11. [**Shopify: Prepare product data for AI channels**](<https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels>)
12. [**Shopify: Agentic-ready product data**](<https://www.shopify.com/enterprise/blog/agentic-ready-product-data>) — Catalog, Agentic Storefronts, structured facts over marketing paste.
13. [**Shopify: Ecommerce schema**](<https://www.shopify.com/blog/ecommerce-schema>)
14. [**SearchMention: AI search optimization for Shopify**](<https://searchmention.com/blog/ai-search-optimization-for-shopify>) — theme schema gaps (`brand`, GTIN, ratings, shipping/returns).

Distill these into a checklist. Do not stop at headlines.

### Tier 3 — UX, KPIs, and video (still thin)

15. How **zero-click / citation traffic** changes what we report (brand presence vs sessions).
16. **Answer surfaces vs site journeys** — AI cites a passage; the page still needs a clear next step.
17. [**GEO / off-page video**](<https://www.youtube.com/watch?v=bhTo8fDmr5I>) — aggregators, Bing, multi-surface presence. Watch if off-page advisory is going into the lunch-and-learn; skip if not.

There is little canonical “Bricks AI UX” literature. Fill this from Google’s “text must be in the page,” the [web.dev](<http://web.dev>) article, Shopify’s agent guidance, and our own audits.

### Optional / later (do not block SOPs)

* [GEO paper — Aggarwal et al.](<https://arxiv.org/abs/2311.09735>) — only if you want the academic citation in a deck.
* Markdown negotiation (Cloudflare `Accept: text/markdown`) — extra-time for Cloudflare-heavy content sites, not default WP/Shopify.
* UCP, MCP, WebMCP, A2A, OKF, Agent Skills, `/.well-known/ai.txt` — quarterly watch list.
* Rank Math / AIOSEO / [AI Ready WP](<https://wordpress.org/plugins/ai-ready-wp/>) / other `llms.txt` generators — only if we inherit a site that already uses them. Do not research these as our default stack.

**Read critically:** If a piece only says “E-E-A-T + schema + headings,” file it under foundation—not the AI-readiness differentiator.

---

## To-do list (for the stewardship role)

### Phase 1 — Remaining reading and policy (week 1)

1. Write a **1-page internal definition:** “AI-ready” = Access + Facts + Citeability + (for ecom) Agent commerce, with SEO as the eligibility layer. Include Google (index-grounded, ignores `llms.txt`) vs ChatGPT/Perplexity (own crawlers + live fetch), and the schema honesty clause.
2. Finish the **bot policy matrix** from official docs (OpenAI / Anthropic / Perplexity / Google-Extended / Apple): train vs search vs user-fetch. Set a **default for typical M&S clients** (likely: always allow live-retrieval bots; training bots allow-unless-client-opts-out, or the reverse). Include Content Signals as optional/emerging.
3. Read and distill **Shopify** (Tier 2) into a product-data checklist with owners.

### Phase 2 — Hands-on research (week 2–4)

4. **Yoast on a real Bricks site (do this before writing any mu-plugin):**
   * Does Yoast already emit AI `User-agent` rules in `robots.txt`?
   * Enable `llms.txt`, switch to **manual page selection**, curate \~10–30 money-page URLs.
   * Are descriptions empty because Bricks `post_content` is empty? Does `wpseo_llmstxt_link_description` + Yoast meta description fix it?
   * Do noindex, password-protected, and “Hide from archive?” URLs leak into the file?
   * Confirm `wpseo_llmstxt_content` exists on our Yoast version if we want extra sections from code.
5. **Bricks kit inventory:**
   * A11y gaps in *our* elements (div-as-button, unlabeled inputs, dialogs/menus).
   * Any element that already prints JSON-LD (FAQ/accordion/HowTo).
   * CSS-in-image text, JS-only critical content, query-loop / template content that crawlers might miss.
6. **Audit 3–5 live WordPress sites and 2–3 Shopify sites** for:
   * `robots.txt` + Cloudflare / bot-fight-mode AI rules
   * Rendered HTML vs JS-only or image-only critical content
   * JSON-LD completeness / conflicts (Yoast + Bricks + ACF)
   * Presence/quality of `/llms.txt`
   * Product attributes (Shopify) / schema + feeds (WP commerce)
   * Optional cross-check: [isitagentready.com](<https://isitagentready.com/>), [agentchecker.ai](<https://agentchecker.ai/app/my-audits>), or Lighthouse Agentic Browsing—not a score to sell
7. **Citation baseline** on 1–2 willing clients: 20–50 prompts in AI Overviews and ChatGPT first, then Perplexity and Gemini. Log mention, citation, accuracy, competitors.
8. **Interview PM / dev / SEO:** where this work already appears accidentally in scopes (schema, CWV, content rewrites) so an add-on does not duplicate sold work.
9. **Tooling (pick one, don’t bake off forever):** Semrush AI Visibility, SE Ranking, Profound, Otterly, Ahrefs Brand Radar; [LLM Pulse report](<https://llmpulse.ai/ai-visibility-report>) as a cheap proof of concept. Also: GSC Generative AI performance report + GA4 referrer filters for AI chat domains.

### Phase 3 — Table-stakes build (week 3–6, overlap with audits)

Ship shared code in the **child theme or a small mu-plugin** (e.g. `ms-ai-readiness`). Prefer mu-plugin if it must run even when a client-specific child theme is thin; prefer child theme if it is Bricks-element PHP that belongs with the kit. Do not invent a new public plugin.

**Research the hook path first (Phase 2 item 4), then build.**

10. **Table stakes on every WordPress site** (useful even when the client never bought an “AI” add-on):
    * **AI crawler** `robots.txt` **snippet** — explicit `Allow: /` groups for live-retrieval bots (`OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Bingbot`, `Googlebot` is already covered). Training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) follow the policy from item 2. Implementation: Yoast file-editor paste **or** `robots_txt` filter—not both. Document the physical-file caveat.
    * `llms.txt` **descriptions** — `wpseo_llmstxt_link_description` so Bricks pages use the Yoast meta description instead of an empty excerpt.
    * **Yoast launch checklist** (process, not code): Organization + `sameAs`; `llms.txt` on + manual money pages; CPT “show in search results” only when we mean it; sitemap submitted to **Google and Bing**.
    * **One** `@graph` **rule** — custom Bricks elements must not print `<script type="application/ld+json">`. Schema goes through Yoast.
11. **Build once, use when the page needs it** (shared Bricks elements in the child theme):
    * **FAQ element** — visible semantic Q&A HTML *and* a Yoast FAQPage graph piece from the same data (`wpseo_schema_graph_pieces` / `wpseo_schema_graph`). This is the first custom element worth making.
    * Later, same pattern: **HowTo**, **lede / answer-first** block (first 2–3 paragraphs as extractable claims), **comparison table**.
    * CPTs: register type → Yoast Search Appearance → Bricks template → optional listing in manual `llms.txt`. No extra schema plugin.
12. **Not table stakes** (skip unless a specific client needs it): Markdown negotiation, HTTP `Link` `rel="describedby"` for `llms.txt`, MCP/WebMCP, `llms-full.txt`, a second `llms.txt` generator.
13. Map every checklist item to **owner** (dev / SEO / content / client) and **effort** (S/M/L).

### Phase 4 — Distill SOPs (week 5–7)

14. Produce reusable deliverables:
    * **AI-Readiness Audit Checklist** (WP + Shopify variants; pass/fail + owner)
    * **Crawler Policy SOP** (decision tree, sample `robots.txt`, Yoast physical vs filter, Cloudflare bot-fight, training opt-out)
    * **Schema & entity SOP** (Yoast as sole `@graph`; Bricks FAQ pattern; “schema must match visible”)
    * `llms.txt` **SOP** (Yoast-only; manual 10–30 URLs; when not to oversell it)
    * **Content citeability guidelines** for writers (answer-first, stats, attribution, freshness, quarterly refresh)
    * **Shopify agent-ready product data checklist** (after Tier 2 reading)

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

* **Crawler/CDN misconfig remediation** — high impact, often invisible; include Bing sitemap submission as launch hygiene
* **Reusable Bricks + Yoast kit** — FAQ (then HowTo / lede / comparison) elements + shared robots / `llms.txt` helpers
* **Schema conflict cleanup** on WP (Yoast + Bricks + ACF), sold as rich-results and entity hygiene
* **Shopify product data / agent readiness** audits tied to Shopify’s Catalog narrative
* **Citeability upgrades** on money pages (answer in the first 2–3 paragraphs)
* `llms.txt` **as cheap hygiene** — honest: no Google ranking benefit; some agents and Lighthouse look for it
* **AI visibility reporting** as a retainer (prompt set + monthly scorecard)
* **Brand entity kits** (`Organization` + consistent NAP + `sameAs`) for multi-location / franchise clients
* **Off-page / aggregator advisory** (GBP, Wikipedia/Wikidata, review sites) — usually client/marketing-owned

Avoid selling MCP, WebMCP, or “agentic protocols” on brochure sites. Avoid selling “we’ll rank you in ChatGPT.”

---

## Practical tip for searching

When Google returns generic SEO, search with these instead:

* `OAI-SearchBot` / `ChatGPT-User` / `GPTBot` / `Claude-SearchBot` / `Google-Extended` / `Applebot`
* `wpseo_llmstxt_link_description` / `wpseo_schema_graph_pieces` / Yoast Schema API
* `Bricks` custom element schema JSON-LD
* `Content Signals` robots.txt Cloudflare
* `agentic product data` / `Shopify Catalog`
* `"structured data"` `AI Overviews` site:developers.google.com

That filters for access policy, Yoast hooks, and platform docs—not “use H2s and backlinks.”

---

## Suggested next deliverable

Draft the **WordPress AI-Readiness Checklist** (audit items + pass/fail + owner) in parallel with Phase 1–2 reading. Label holes “confirm on live audit” rather than inventing them.

Do not wait for emerging-protocol research to start the checklist or the FAQ element spike.

+++

