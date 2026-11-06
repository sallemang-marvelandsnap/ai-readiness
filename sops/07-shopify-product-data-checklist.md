# Shopify product-data checklist (draft)

**We do not build a Shopify MCP app** and we do not need a Yoast equivalent. Shopify already exposes UCP/MCP and `/agents.md` on modern stores (`robots.txt` often points at `/agents.md`, `/.well-known/ucp`, `/api/ucp/mcp`). Our job is what Yoast would have been on WP: **catalog quality**, **theme schema**, citeable PDP copy, then Catalog / Agentic Storefronts in admin. See the map in [01](01-ai-ready-definition.md).

Official reading still to distill into the rows below: [product data for AI channels](https://www.shopify.com/enterprise/blog/product-data-tips-ai-channels), [agentic-ready product data](https://www.shopify.com/enterprise/blog/agentic-ready-product-data), [ecommerce schema](https://www.shopify.com/blog/ecommerce-schema), [SearchMention checklist](https://searchmention.com/blog/ai-search-optimization-for-shopify).

---

## Platform (usually already there)

- [ ] `/agents.md` and UCP discovery respond (Shopify-hosted).
- [ ] Admin: Agentic Storefronts / Catalog eligibility — not “ineligible” without a reason.
- [ ] Sitemap submitted; store is crawlable on **production**.

## Product facts (owner: client merch + us on theme/metafields)

On a sample of PDPs, including **new** and **legacy** templates:

- [ ] Title is the product, not marketing paste.
- [ ] Description states what it is in the first lines (citeable).
- [ ] Brand, GTIN/barcode, price, availability, options, images.
- [ ] Shipping and returns facts exist (page or structured), not only in a PDF.
- [ ] Ratings if you claim them (and they match visible reviews).
- [ ] Metafields used for facts agents can trust (materials, specs), not only in the theme as leftover text.

## Theme schema

- [ ] Product JSON-LD includes brand, GTIN, offers, availability.
- [ ] No conflicting duplicate Product graphs.

## Measurement (if in scope)

- [ ] AI-channel / Catalog attribution in admin if Agentic Storefronts is on.
- [ ] Same citation-baseline idea as WP for brand queries.

**Still need:** on the next Shopify job, walk admin plus a new **and** a legacy PDP and fill concrete pass/fail examples. Do not wait on a custom app.
