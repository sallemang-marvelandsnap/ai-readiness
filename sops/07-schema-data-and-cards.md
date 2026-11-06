# Schema: one record, many cards, one graph

**Marvel & Snap — internal.** This is the **Facts** layer for **WordPress**: when a person, product, service, or event shows up in more than one place, give it **one official page** and **one Yoast JSON-LD packet**. Cards elsewhere are display plus a link. It is not a ChatGPT ranking lever. Do **not** send this file to clients. Writers get [08](08-client-citeability.md) for sentences, not for schema.

**Stack:** Bricks + ElevateX + Yoast. Yoast prints **one** `<script type="application/ld+json">` (`@graph`). We add Person / Product / Service / Event *into that packet*. We do not let a Bricks card or a second plugin print its own script.

The CPT kits, Yoast bridge, and FAQ element are **not in ElevateX yet**. `register_custom_post_types()` and `inc/bricks/elements.php` are empty hooks. Until a kit ships, follow the **one page vs reused** rule in the Bricks GUI on that project.

---

## The problem

Clients repeat the same *things* in several places:

- A **person** on the About grid, a Team page, and a blog byline
- A **product** on its own page, an archive of cards, and “Related products” under a blog post
- A **service** or **event** the same way (a detail page, then cards elsewhere)

Search engines and AI systems understand those things best when there is **one official record** (name, role, facts) and **one official URL**. If every card invents its own schema blob, we get duplicates and conflicts. Yoast will output Organization and the *author* of a blog post. It will **not** notice a Leadership grid you built in Bricks. That part is on us.

---

## The rule

**Enter each person, product, service, or event once. Give it one page (or one stable id). Show it as cards wherever you want. Attach structured data only on that official page.**

**Terms**

- **Canonical URL** — the one page that *is* this person or product (for example `/team/jane-doe/` or `/products/track/`).
- **Card** — heading, image, a short line. It never prints its own `<script type="application/ld+json">`. Two uses: **one-page grid** — the card *is* the record; HTML from its fields, and if that schema type belongs on this page, the card or its Yoast hook appends it from those same fields (same pattern as FAQ). **Teaser** — the record lives on a CPT single; the card links there and does not re-append a full Person/Product.
- **CPT** — a WordPress **custom post type**: a first-class list in wp-admin, like Posts, but named Team or Products. Each item has a permalink.
- **ACF field group** — extra fields on that item (job title, GTIN, price, session date). An **ACF repeater** on one page is still not a permalink — do not use it as a fake CPT.
- **`@graph`** — the single JSON-LD packet Yoast prints in the page source. We add our Person/Product piece *into* that packet.
- **`@id`** — a unique id inside that packet, usually the canonical URL, so other pages can *point at* the person without re-describing them.
- **Yoast bridge** — a small ElevateX PHP hook. CPT extras use `wpseo_schema_graph_pieces` (or `wpseo_schema_graph`). Organization extras use `wpseo_schema_organization` on Yoast’s existing node. Yoast remains the printer. Not written yet.
- **Single template** — the Bricks template for one Team/Product post (the official page).

FAQ, HowTo, comparison, and Review are **speculative ElevateX elements** — we may write them when a project needs that layout; a brochure site may never use them. Drop one on a page only when that Q&A, those steps, that comparison, or those reviews are actually visible. The element prints HTML and appends the matching piece to Yoast’s `@graph` from the **same fields**. None of them exist yet.

---

## What to do, when

### 1. It appears on one page only

**Example:** six board members, only on About, never reused on another URL.

**Do this:** On that page, build a Bricks grid of **Team Card**s (name, role, photo, short bio in the card). Do not add an ACF repeater and do not register a Team post type. In this case – Team Members on an About page – Person is a relevant schema type, provided that their information is visible (i.e. name, title; not simply headshot). Therefore, the card or its Yoast hook would append Person from those same fields to the singular Yoast `@graph`, pointed at from Organization. If we were dealing with a different block of content whose schema type does not belong on that page (unlike Person on About), the cards stay HTML only. Either way: one Yoast `@graph`, no JSON-LD script on the card.

**Do not:** Register a Team post type for six names that will never have their own URLs.

### 2. The same thing appears in more than one place

**Example:** Jane is on About, `/team/`, and author boxes. Track is a product page, a catalog card, and “Related products.”

**Do this:** Register a CPT (Team, Products, Services, or Events). Each item is one post with a permalink. ACF fields live on that post. The Bricks **single template** is the official page. A Bricks **card** (or query loop — a grid that pulls those posts) is the teaser that **links** to that permalink. Schema only on the single.

**Do not:** Copy Jane’s name into three ACF repeaters. Do not put `SoftwareApplication` JSON-LD on the related-products card.

### 3. Every site, no extra CPT

Yoast already covers Organization, the page itself, breadcrumbs, blog articles, and the post author. Turn those on and fill `sameAs`. No new post type.

**Organization extras** still are not a CPT. Yoast’s Organization screen is the base (name, logo, `@id` = home URL, `sameAs`). It has no inputs for things like legal name, street address, or founding date. Put those on **the same Organization node** with `wpseo_schema_organization` — one `@graph`, no second script. ElevateX does not ship this yet. The usual pattern is an **ACF options page** (legal name, address, and the rest) and a theme hook that reads those values into Yoast’s Organization node. Another options store the theme already uses is fine; do not hardcode the values in PHP.

Include a property when the fact is **real, official, and visible** (Contact, About, footer). Empty fields stay out. Do not assign a field set by sector (“SaaS gets these, restaurants get those”). Sector and location only tell you whether a given fact *exists*.

**If they have it**

- Almost every org: `legalName` (when it differs from the brand), `description`, `email` / `telephone`
- A public HQ / street address on the site: `address` (PostalAddress). Skip if there is no public address
- They want to be reached: `contactPoint` (`contactType` plus phone and/or email; `areaServed` on the point if support is regional)
- A defined market: Organization `areaServed`
- They publish a founding date: `foundingDate`
- IDs they already publish (VAT, DUNS, NAICS): those properties — never invent

**Not this blob**

- Multi-location / franchise NAP is a separate LocalBusiness / location kit, not extra fields on one Organization node
- Merchant / local storefront properties (`returnPolicy`, geo, hours) only if they are actually that kind of business
- Do not subtype a B2B brochure org as `LocalBusiness` just because About lists an office

### 4. Products (CPT vs schema)

A **Products CPT** is fine on WordPress whenever the same product-shaped thing is reused (platform pages, spec sheets, manuals) — even if nothing is for sale on this site. The post type is a CMS list, not a claim that we run a store.

**Schema is a separate choice.** Do not emit Google-style `Product` with an `Offer` (price, availability, seller) unless they actually sell that item **on this site**. Inventing an Offer is dishonest. For software or a platform they do not sell as a SKU, use `SoftwareApplication` on the official URL. A manual or spec page is `TechArticle` (or ordinary WebPage), not `Product` + `Offer`. `Product` without `Offer` is optional entity markup for a hardware page they do not sell here; skip it if the page is really a document about the product.

On a **Shopify** store, use Shopify products and Catalog ([06](06-shopify-product-data-checklist.md)). Do not also register a WordPress Product CPT there.

---

## How (ElevateX)

ElevateX already has empty hooks for this: `register_custom_post_types()` in the theme class, ACF local JSON, and `inc/bricks/elements.php`. We add **optional kits** in the child theme, not a new plugin per type. None of the kits exist yet.

**Per site, turn on only what that client has** (theme option or `theme.config.json` — the panel does not have to exist on day one). Until it does, register only what the project will use:

- `team` — people with their own URLs, or the same person in several grids
- `products` — software, hardware, or manuals that reuse the same records. Schema still lives on that post’s permalink. The JSON-LD `@type` is chosen per **Products (CPT vs schema)** above (`SoftwareApplication`, `TechArticle`, or `Product`+`Offer` only if they sell it here) — naming the post type `product` does not make the `@type` `Product`.
- `services` — offerings with their own pages
- `events` — webinars, conferences

**When a flag is on, ship all four pieces together:**

1. Register the CPT (so editors have a list in wp-admin).
2. Load the ACF field group (the facts).
3. Point Bricks at a **single** template and a **card** pattern (a query loop is fine; a small custom element is fine if the card is reused often).
4. Add a small PHP **bridge** that hooks `wpseo_schema_graph_pieces`: on the single, read those ACF fields and append one Person/Product/Service/Event to Yoast’s graph. `@id` = that post’s permalink. Organization extras are a different hook (`wpseo_schema_organization`) on Yoast’s existing node (Every site, no extra CPT, above). Not a CPT flag. Product schema type follows **Products (CPT vs schema)** above, not whether the CPT is named Product.

**When the flag is off:** none of that is registered. A brochure site with no product catalog should not see “Products” in wp-admin.

**Card rule:** never print `<script type="application/ld+json">` from the card. One-page grid: HTML from the card fields; append to Yoast from those fields only when that type belongs on this page. Teaser (CPT): heading, image, excerpt, link — do not re-append a full Person/Product. If we need a list in the graph (rare), add an `ItemList` of permalinks on the *listing* page.

---

## Worked examples

**Leadership only on About.** Build a Bricks grid of Team Cards on About. No Team CPT. If Person belongs (people are visible and with comprehensive fields), the card or its hook appends Person to Yoast on About from the card fields. If not, HTML only.

**Jane on About, a Team index, and bylines.** CPT `team`. Jane’s official URL is `/team/jane-doe/`. About and the blog query that CPT. Person schema for Jane only on `/team/jane-doe/`. Cards just link there.

**Software products.** CPT `product` (or `software`). The single template puts `SoftwareApplication` in Yoast’s graph (not `Product` + `Offer` unless they sell it on this site). The archive and “Related products” use the same card, with **no** extra schema. The card’s title and image must match the single (same official name).

**Manuals / spec sheets, not for sale.** CPT `product` (or `manual`) is still fine. Schema on the document URL is `TechArticle` or WebPage — no `Offer`.

**Webinars.** Same pattern as products: CPT `event`, schema type `Event`, only on the event permalink.

---

## What not to do

- Do not register Team, Products, Services, *and* Events on every new site “just in case.”
- Do not build a Bricks “Software” element that dumps its own JSON-LD. Display in Bricks; schema in the Yoast bridge.
- Do not add Rank Math or a second schema plugin.
- Do not treat Yoast’s author Person as the leadership grid.

---

## Build order (when we write this in ElevateX)

This is the order we implement the toolbox in the theme — **not** the order blocks appear on a page. None of it is in the repo yet.

1. A shared Yoast bridge helper, then the FAQ **element** (visible Q&A + Yoast FAQ piece from the same fields).
2. The first full CPT kit when a **second** project needs the same shape — start with Team **or** Products, whichever comes first.
3. Services and Events copy that kit.
4. HowTo / comparison / Review elements only when that layout keeps recurring.

A lede is a potential Bricks component or the first paragraph ([01](01-ai-ready-definition.md), [08](08-client-citeability.md)). Do not add it as a PHP element or a CPT in this work.

---

## Audit (when a site already has these patterns)

**Owner:** dev / SEO. Use this on a live (or soon-to-be-live) URL. Tick the matching rows on [03](03-wp-ai-readiness-checklist.md) as well.

**How:** Pick one person or product that appears in more than one place. Open the official URL and view source — search `ld+json`. There should be **one** Yoast script, with that Person/Product in the graph and `@id` = this permalink. Then open a page that only *shows the card* (About grid, related block). That page must **not** contain a second JSON-LD describing the same person or product. Names on the card must match the official page (not “NW Track” on the card and “Northwind Track” on the single).

- [ ] One-page-only content uses a Bricks card grid; reused content uses a CPT.
- [ ] Each reused person/product has one permalink.
- [ ] Cards and related blocks have **no** extra JSON-LD.
- [ ] The single has one Yoast graph piece and a stable `@id`.
- [ ] Names on cards match the single.
