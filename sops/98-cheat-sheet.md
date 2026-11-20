# Cheat sheet

Internal skim of 01–08. Do **not** send this to clients. Writers get [08](08-client-citeability.md). Tickets: [99](99-next-steps.md).

## Promise
- Eligible to be crawled, understood, and quoted
- Not a ChatGPT or Google AI ranking guarantee

## Stack
- WordPress: Bricks 2.4+ + ElevateX + Yoast
- Shopify: Catalog / Agentic Storefronts (Shopify’s platform)
- No extra “AI SEO” plugins or apps

## Who
- Dev — crawlers, Yoast / theme schema, ElevateX, Catalog
- SEO / PM — money-page list, `llms.txt`, GSC / Bing, measurement
- Client — the sentences. Give them 08 only
- Money pages = home, product/platform, solutions, About, anything they’d hate to lose

## Two tracks
- **A** — live client site (what we sell)
- **B** — Figma → Bricks via MCP on local/staging (how we build, not a ranking feature)

## Access · [05](05-crawler-policy.md)
- Never block retrieval bots on production (`OAI-SearchBot`, `ChatGPT-User`, Claude/Perplexity search + user, `Bingbot`, `Googlebot`)
- Allow training bots unless the client opts out in writing (`GPTBot`, `ClaudeBot`, `Google-Extended`, …)
- Staging `Disallow: /` is expected — don’t “fix” it
- One `robots.txt` source: ElevateX filter **or** Yoast file editor, never both
- Confirm with `curl -A "OAI-SearchBot"` — pass = 200, fail = 403 / 429
- Sitemap in Google Search Console **and** Bing

## WordPress · [03](03-wp-ai-readiness-checklist.md)
- Yoast Organization: name, logo, `@id` = home URL, `sameAs`
- One Yoast `@graph`. No second `ld+json` from Bricks or another plugin
- `llms.txt` on; ~10–30 money URLs picked by hand; each has a meta description
- First 2–3 paragraphs on money pages say what it is (HTML, not a hero image)
- Bricks AI abilities **off** on live; no production Application Password
- Buttons are buttons; labels map; no layout-shift traps

## Shopify · [06](06-shopify-product-data-checklist.md)
- Password off. Don’t fight Shopify’s `robots.txt` unless retrieval is blocked
- Catalog / Agentic eligible, or a written reason not
- `/agents.md` and UCP URLs respond (Shopify-hosted — don’t rebuild)
- PDPs: citeable first lines; brand; GTIN; offers; shipping/returns; ratings only if visible
- One Product JSON-LD; Organization `sameAs` (often missing)
- Skip unless asked: `llms.txt`, extra SEO/AI apps, custom MCP

## Schema · [07](07-schema-data-and-cards.md)
- One official URL per person / product / service / event
- One page only → Bricks cards. Reused → CPT kit (CPT + ACF + single + card + Yoast bridge)
- Cards never print their own JSON-LD
- Teaser cards = heading, image, excerpt, link
- Product CPT ≠ Product schema. `Offer` only if sold on this site. Software → `SoftwareApplication`. Manuals → `TechArticle` / WebPage
- FAQ / HowTo / comparison / Review: HTML + Yoast from the same fields, only when that content is visible
- Lede is a Bricks component, not PHP

## Copy · [08](08-client-citeability.md)
- Answer in the first sentence
- Claims stand alone
- One official name
- Specifics over adjectives
- Words in the HTML, not only in the design
- Skip fake FAQs and “make an AI file of every page”

## Studio · [02](02-studio-mcp-onesheet.md) / [04](04-figma-to-bricks-drafts.md)
- MCP on local/staging only
- Plugin files on live are fine; abilities + credentials must stay off
- Intended lock: `BRICKS_DISABLE_MCP` on production (not in ElevateX yet)
- Inspect existing `mns` tokens before creating anything; Bricks names win
- One section per MCP write; a human reviews in the builder
- No JSON-LD in Bricks drafts
- End of job: revoke the Application Password

## Measure
- Only if reporting is in the SOW
- GSC Generative AI report
- GA4 AI referrers (sessions only; under-counts zero-click)
- 20–50 prompt spreadsheet
- Paid tool only with a scorecard retainer

## Don’t
- Promise ChatGPT rankings
- Extra AI SEO / schema / `llms.txt` plugins
- MCP Server Cards, A2A, site-wide Markdown dumps
- MCP abilities on production
- FAQ schema on every page
