# Schema: one record, many cards, one graph

**Companion to** [01 — definition](01-ai-ready-definition.md).  
For developers and PMs who have not lived in schema. **What to do, when, and how.**

---

## The problem

Clients repeat the same *things* in several places:

- A **person** on the About grid, a Team page, and a blog byline
- A **product** on its own page, an archive of cards, and “Related products” under a blog post
- A **service** or **event** the same way (detail page + cards elsewhere)

Search engines and AI systems understand those things best when there is **one official record** (name, role, facts) and **one official URL** for that record. If every card on every page invents its own schema blob, we get duplicates and conflicts. Yoast will output Organization and the *author* of a post. It will **not** notice a Leadership grid you built in Bricks. That part is on us.

---

## The rule (plain language)

**Enter each person/product/service/event once. Give it one page (or one stable id). Show it as cards wherever you want. Attach structured data only on that official page.**

- **Canonical URL** — The one page that *is* this person or product (e.g. `/team/jane-doe/` or `/products/track/`).
- **Card** — A teaser in a grid, archive, or “related” block. It links to the canonical URL.
- **CPT** — A WordPress **custom post type**: a first-class list in wp-admin, like Posts, but named Team or Products.
- **ACF field group** — Extra fields on that item (job title, GTIN, price, session date).
- **`@graph`** — The single JSON-LD packet Yoast prints in the page source. We add our Person/Product piece *into* that packet.
- **`@id`** — A unique id inside that packet, usually the canonical URL, so cards can *point at* the person without re-describing them.

You do **not** “create a CPT for Data.” You create a CPT (or a simple list on one page) for **the kind of thing that repeats** — people, products, services, or events.

---

## What to do, when

### 1. It appears on one page only

**Example:** Six board members, only on About, never reused.

**Do this:** On that page, build a Bricks grid of **Team Card** components (name, role, photo, short bio in the card). No ACF repeater. If we emit Person schema at all, do it **once on that About page** — not a JSON-LD blob on each card.

**Do not:** Register a Team post type for six names that will never have their own URLs.

### 2. The same thing appears in more than one place

**Example:** Jane is on About, `/team/`, and author boxes. Track is a product page, a catalog card, and “Related products.”

**Do this:** Register a CPT (Team, Products, Services, or Events). Each item is one post with a permalink. ACF fields live on that post. Bricks **single template** = the official page. Bricks **card** (or query loop) = teasers that **link** to that permalink. Schema only on the single.

**Do not:** Copy Jane’s name into three ACF repeaters. Do not put SoftwareApplication JSON-LD on the related-products card.

### 3. Every site, no extra CPT

Yoast already covers Organization, the page itself, breadcrumbs, blog articles, and the post author. Turn those on and fill `sameAs`. No new post type.

### 4. Shopify products

Use Shopify products and Catalog. Do not invent a WP Product CPT unless the site is WordPress commerce.

---

## How (ElevateX)

ElevateX already has empty hooks for this: `register_custom_post_types()` in the theme class, ACF local JSON, and `inc/bricks/elements.php`. We add **optional kits**, not a new plugin per type.

**Per site, turn on only what that client has** (theme option or `theme.config.json`):

- `team` — people with their own URLs or reused in several grids
- `products` — software or physical products (schema type `SoftwareApplication` or `Product`)
- `services` — offerings with their own pages
- `events` — webinars, conferences

**When a flag is on, ship all four pieces together:**

1. Register the CPT (so editors have a list in wp-admin).
2. Load the ACF field group (the facts).
3. Point Bricks at a **single** template and a **card** pattern (query loop is fine; a small custom element is fine if the card is reused often).
4. Add a small PHP **bridge** that hooks `wpseo_schema_graph_pieces`: on the single, read those ACF fields and append one Person/Product/Service/Event to Yoast’s graph. `@id` = that post’s permalink.

**When the flag is off:** none of that is registered. A brochure site with no product catalog should not see “Products” in wp-admin.

**Card rule for implementers:** the card prints heading, image, excerpt, and a link. It does **not** print `<script type="application/ld+json">`. If we need a list in the graph (rare), we add an `ItemList` of those permalinks on the *listing* page — still not a full Product on each card.

---

## Worked examples

**About → Leadership grid only**  
Bricks grid of Team Card components on About. Optional Person schema on that page only.

**About + Team + bylines**  
CPT `team`. Jane has `/team/jane-doe/`. About and the blog query that CPT. Schema for Jane only on `/team/jane-doe/`. Cards just link there.

**Software products**  
CPT `product` (or `software`). Single template = full `SoftwareApplication` in Yoast’s graph. Archive and “Related products” use the same card, **no** extra schema. The card’s title and image must match the single (same official name).

**Webinars**  
Same as products, CPT `event`, schema type `Event`, only on the event permalink.

---

## What not to do

- Do not register Team, Products, Services, *and* Events on every new site “just in case.”
- Do not build a Bricks “Software” element that dumps its own JSON-LD. Display in Bricks; schema in the Yoast bridge.
- Do not add Rank Math or a second schema plugin.
- Do not treat Yoast’s author Person as the leadership grid.

---

## Build order (when we write the kit)

1. A shared Yoast bridge helper + the FAQ **element** (FAQ is a block of Q&A on a page, not a CPT).
2. A lede / answer-first **Bricks component** (copy structure; no PHP element, no CPT).
3. The first full CPT kit when a **second** project needs the same shape — start with Team **or** Products, whichever comes first.
4. Services and Events copy that kit.
5. HowTo / comparison / Review elements only when that layout keeps recurring.

---

## Audit (when a site already has these patterns)

- [ ] One-page-only content uses a Bricks card grid; reused content uses a CPT
- [ ] Each reused person/product has one permalink
- [ ] Cards and related blocks have **no** extra JSON-LD
- [ ] The single has one Yoast graph piece and a stable `@id`
- [ ] Names on cards match the single (no “NW Track” vs “Northwind Track”)
