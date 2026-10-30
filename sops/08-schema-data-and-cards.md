# Schema: data, cards, one graph

**Companion to** [01 — definition](01-ai-ready-definition.md).  
Yoast **emits** the `@graph`. It does **not** own a Leadership grid, product card, or webinar listing.

---

## The rule

**Data → one canonical URL → cards reuse that URL → schema once.**

- **Data:** CPT (or an ACF repeater if it never appears elsewhere) + field group. ElevateX already has empty `register_custom_post_types()` and ACF local JSON.
- **Single template:** Bricks template for the canonical page. Full type here only: `Person`, `SoftwareApplication`, `Service`, `Event`, `Product`. `@id` = permalink (or a stable `#slug` if there is no public URL).
- **Cards:** one Bricks card or query loop for archives, “related,” homepage, About grids. **Display only.** No second `<script type="application/ld+json">`. Related Products at the end of a post must not emit another `SoftwareApplication`. Optional: `ItemList` of those canonical URLs.
- **Bridge:** ElevateX helper on `wpseo_schema_graph_pieces` reads the **same** ACF fields and stitches into Yoast. One `@graph` in view-source.

About / Board / Leadership: Yoast’s Person is the *post author*, not those people. Repeater is enough if they never appear elsewhere. The moment they show up on Team **and** About **and** a byline, use a Team CPT so every card shares one `@id`.

---

## What lives where

**ElevateX (feature-flag per site — options or `theme.config.json`), not a plugin per type**

- `team` / `products` (SoftwareApplication or Product) / `services` / `events`
- Flag on → CPT + ACF + schema bridge + “use this Bricks template”
- Flag off → nothing registered

**Yoast (every site):** Organization, WebPage, Breadcrumb, Article, author Person, `llms.txt`.

**Shopify:** product facts and Catalog; no M&S commerce MCP app.

**Do not:** a “Software” element that embeds schema; eight CPTs on every new site; Rank Math / extra schema plugins.

---

## Ship order

1. Schema bridge helper + FAQ element  
2. Lede (citeability; no CPT)  
3. First CPT kit when a second project needs the same shape — Team/Person **or** Product/Software  
4. Services and Events copy that kit  
5. HowTo / comparison / Review only when the layout repeats

---

## Audit check

- [ ] Cards on archives/related have **no** extra JSON-LD  
- [ ] Single has one Yoast graph piece with a stable `@id`  
- [ ] Visible card fields match the single (name, role, product name)  
- [ ] Entity names are consistent site-wide  
