# Shopify product-data checklist

**Marvel & Snap — internal.** This is the **Track A** launch and audit list for a **Shopify store** — can agents find it, are product facts complete, is the theme schema honest, can a model quote the product pages, and can we measure anything. It is not WordPress, not Yoast, and not a custom MCP app. Use it on a real store (QA before launch, or a live audit). Mark each row **pass**, **fail**, or **n/a**. The definition of “AI-ready” and the Shopify vs WordPress map are in [01](01-ai-ready-definition.md). WordPress sites use [03](03-wp-ai-readiness-checklist.md) instead.

We do **not** promise rankings in ChatGPT. Do **not** send this file to clients. Writers get [08](08-client-citeability.md) for product copy.

**Stack:** Shopify Catalog / Agentic Storefronts (Shopify’s platform). Do not install an “AI SEO” or MCP Shopify app. Skip `llms.txt` unless someone asks — Shopify does not generate one, Google ignores it, and Catalog plus product-page HTML are the index.

**Owners** are named on each section. A **PDP** is a product detail page (the product URL a customer sees). **Money pages** here = those PDPs plus home, collections, and About — any URL the client would be unhappy to lose.

**Where to look:** production (store password off). Shopify’s default `robots.txt` is usually `Allow: /`. Do not rewrite it unless a rule blocks retrieval — that policy is in [05](05-crawler-policy.md). A passworded preview is not production; it also makes the store ineligible for Catalog.

**Terms**

- **Catalog / Agentic Storefronts** — Shopify’s product feed and sales channel for AI shopping (ChatGPT, Copilot, and similar). Shopify hosts this. We do not build an app.
- **UCP / MCP** — Shopify-hosted agent endpoints. Confirm they respond. Do not recreate them.
- **GTIN** — the product barcode (UPC / EAN / ISBN).
- **Metafield** — a structured extra field on a product (materials, specs), not leftover copy that exists only as theme text.

Official Shopify and audit reading still to distill into extra rows: [product data for AI channels](https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels), [agentic-ready product data](https://www.shopify.com/enterprise/blog/agentic-ready-product-data), [ecommerce schema](https://www.shopify.com/blog/ecommerce-schema), [SearchMention checklist](https://searchmention.com/blog/ai-search-optimization-for-shopify). Catalog eligibility rules: [Shopify Help](https://help.shopify.com/en/manual/shopify-catalog/requirements).

---

## Platform — can agents find the store?

**Owner:** dev / SEO. Shopify already hosts agent discovery. This section is pass/fail on **this** store, not a request to build MCP.

**How:** On production, open `/robots.txt`. Fail only if a retrieval bot is blocked ([05](05-crawler-policy.md)). Shopify often lists `/agents.md`, `/.well-known/ucp`, and `/api/ucp/mcp` there — open those URLs; they should respond, not 404. In **Shopify admin → Sales channels → Agentic → Sources → Shopify Catalog**: an eligible store shows a product count; an ineligible store shows a warning. Click the warning and record the reason, or fail the row if there is none. Shopify generates `/sitemap.xml`; confirm it is submitted in Google Search Console **and** Bing Webmaster Tools, not only that the file exists.

- [ ] Production is crawlable (password off; retrieval bots not blocked).
- [ ] `/agents.md` and UCP discovery URLs respond (Shopify-hosted).
- [ ] Catalog / Agentic Storefronts is **eligible**, or there is a written reason it is not.
- [ ] Sitemap submitted to **Google Search Console and Bing Webmaster Tools**.

---

## Product facts — can an agent trust the PDP?

**Owner:** client merch + us on theme / metafields. Shopify does not have Yoast; these fields *are* the facts layer.

**How:** Open a sample of PDPs: at least one product on the **current** product template and, if the store still has them, one on a **legacy** or leftover template (mixed templates are the usual fail). Read only the first screen of the description — you should be able to paste one sentence that says **what this product is**. Then in admin, open that same product and confirm title, description, vendor/brand, barcode (GTIN), price, inventory/availability, options, images, and metafields. Shipping and returns should live as store policies (**Settings → Policies**) or structured fields, not only in a PDF.

- [ ] The title is the product name, not marketing paste.
- [ ] The description states what it is in the first lines (citeable). Hand writers [08](08-client-citeability.md).
- [ ] Brand, GTIN/barcode, price, availability, options, and images are filled.
- [ ] Shipping and returns facts exist on a page or in structured fields, not only in a PDF.
- [ ] Ratings appear in schema only if they match reviews that are visible on the page.
- [ ] Metafields hold facts agents can trust (materials, specs). Those facts are not only unstructured text in the theme.

---

## Theme schema — one Product graph

**Owner:** dev / theme. This is JSON-LD in the page source, same honesty bar as Yoast on WordPress: one packet, facts that match visible text. Do not add a schema app.

**How:** View source on a PDP. Search `ld+json`. There should be **one** Product script that includes brand, GTIN, offers, and availability. Fail if a second schema app or a duplicate Product graph is present. On home, check for Organization (or brand) and **`sameAs`** (LinkedIn, Wikipedia, social). Shopify often omits `sameAs`; add it in the theme or brand settings.

- [ ] Product JSON-LD includes brand, GTIN, offers, and availability.
- [ ] There is no conflicting duplicate Product graph.
- [ ] Organization / brand **`sameAs`** lists the official profiles.

---

## Measurement — if the engagement includes it

**Owner:** SEO / PM. Skip this section when we are not reporting. Do not build a Marvel & Snap visibility product.

**How:** If Agentic Storefronts is on, check **Sales channels → Agentic** for Catalog / AI-channel attribution. For search and chat mentions, use the same sources as WordPress: Google Search Console → Performance → Generative AI (live, verified property); GA4 source/medium or session referrer containing `chatgpt.com`, `perplexity.ai`, `gemini.google.com`. Citation baseline: a spreadsheet of 20–50 brand or product prompts, run in AI Overviews and ChatGPT, note mention / citation / miss.

- [ ] AI-channel / Catalog attribution is available in admin if Agentic Storefronts is on.
- [ ] Google Search Console **Generative AI** report and GA4 AI referrers if the store is live and in scope. Referrers are **sessions only** and under-count zero-click answers.
- [ ] Citation baseline: 20–50 prompts, Google AI Overviews + ChatGPT first.

---

On the next Shopify job, review **Sales channels → Agentic** and a sample of PDPs (current template and a leftover one, if it exists). Add what you actually saw as concrete pass/fail examples on these rows. Do not wait on a custom app.
