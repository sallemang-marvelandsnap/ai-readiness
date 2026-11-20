# Next steps (Linear checklists)

**Marvel & Snap — internal.** Paste **one block** into a Linear ticket. These are the to-dos already in [01](01-ai-ready-definition.md)–[08](08-client-citeability.md), grouped by who does the work. They are not a new standard. Do **not** send this page to clients. Writers still get [08](08-client-citeability.md).

Each group renders as a checklist. Use **Raw** if you want the Linear markdown; the copy icon always copies that source (heading included).

**Launch vs audit:** same bar, two tickets. **Launch** is what you do before go-live. **Audit** is confirm on a real URL — QA on the soon-to-be-live site, or a post-launch review. Shopify is one block because [06](06-shopify-product-data-checklist.md) already is.

**Why Bricks page building is not inside project setup:** setup is environment, Yoast, and which kits are on. Page building is the Track B loop plus citeable HTML on money pages. Mixing them hides the human-in-the-builder step.

**Why registration is not only ElevateX:** theme work *writes* the kit once. A project *turns it on* — or, if nothing in ElevateX fits, builds a bespoke CPT/element with the same four pieces. Enabling an extant flag is not the same ticket as writing FAQ in the child theme.

**Clusters beyond the five named above** (the SOPs already require them):

- **Kickoff / writers** — money-page list and [08](08-client-citeability.md); SEO/PM + client, not a theme ticket.
- **Shopify launch / audit** — [06](06-shopify-product-data-checklist.md); do not use the WordPress lists on a store.
- **Measurement** — skip unless reporting is in the SOW ([01](01-ai-ready-definition.md), [03](03-wp-ai-readiness-checklist.md)).
- **Engagement close** — revoke the staging MCP credential ([02](02-studio-mcp-onesheet.md)).
- **Do not sell or install** — scoping reminder, not a client deliverable.

---

## 1. ElevateX theme development

Write once in the child theme for every future site. None of this is in ElevateX yet ([01](01-ai-ready-definition.md), [02](02-studio-mcp-onesheet.md), [05](05-crawler-policy.md), [07](07-schema-data-and-cards.md)). Paste into a **theme** ticket, not a client-site ticket.

Build order for elements/kits is in the block (FAQ first). A lede is a Bricks component, not PHP.

```markdown
## ElevateX — AI-readiness toolbox

Source: M&S AI-ready SOPs 01, 02, 05, 07.

- [ ] Set `BRICKS_DISABLE_MCP` when the env is live (`PANTHEON_ENVIRONMENT === 'live'` or `WP_ENVIRONMENT_TYPE === 'production'`), before Bricks loads
- [ ] Add a `robots_txt` filter with the retrieval (+ training) allow-list; leave Yoast → Tools → File editor empty on sites that use the filter
- [ ] Add `wpseo_llmstxt_link_description` so empty Bricks `post_content` does not yield empty `/llms.txt` lines
- [ ] Shared Yoast bridge helper: extras via `wpseo_schema_graph_pieces` / `wpseo_schema_graph`; Organization extras via `wpseo_schema_organization` — Yoast stays the only JSON-LD printer
- [ ] ACF options page (or the options store the theme already uses) for Organization extras that are real, official, and visible; empty fields stay out; do not hardcode values in PHP
- [ ] Per-site flags (options panel or `theme.config.json`) so kits and elements register only when that install needs them
- [ ] Schema-bearing Bricks elements (visible HTML + Yoast piece from the **same fields**; no `<script type="application/ld+json">` on the element). Build in this order:
  - [ ] FAQ first (most common extra)
  - [ ] HowTo when a project keeps needing numbered steps
  - [ ] Comparison when that layout keeps recurring
  - [ ] Review / Offer last, only if a vertical repeats ratings/offers that are also visible
- [ ] Team Card: HTML from card fields; if Person belongs (name/title visible), append Person to Yoast from those fields; teasers of CPT singles are heading + image + excerpt + link only
- [ ] Flagged CPT kits — each kit is CPT + ACF + Bricks single + card + Yoast bridge together; `@id` = permalink; JSON-LD `@type` is not the CPT slug:
  - [ ] Team / Person
  - [ ] Product or SoftwareApplication
  - [ ] Service
  - [ ] Event
- [ ] Lede as a reusable Bricks component (or text + global class), not a PHP element
- [ ] Do not add:
  - [ ] Speakable
  - [ ] FAQ schema on every page
  - [ ] A Software brick that dumps its own JSON-LD
  - [ ] A plugin per content type
  - [ ] Rank Math / a second schema plugin
```

---

## 2. Project / dev setup (WordPress)

A developer starting a **WordPress** job. Environment, Yoast Organization, which flags are on, staging MCP. Not page-building. Shopify: use §7.

```markdown
## Project setup — WordPress (AI-ready)

Source: M&S AI-ready SOPs 01, 02, 05, 07, 08.

- [ ] Stack is WordPress 6.9+, Bricks 2.4+, ElevateX, Yoast — no extra “AI SEO” plugin, no second `llms.txt` generator
- [ ] Agree the money-page list with SEO/PM (home, product/platform, solutions, About, plus any URL they would hate to lose)
- [ ] Hand the client SOP 08 at kickoff (not 01, 07, or this ticket)
- [ ] Agree one official name string per brand/product (not “Northwind Track” and “NW Track”)
- [ ] Organization record
  - [ ] Yoast: name, logo, `@id` = home URL, `sameAs` (LinkedIn, Wikipedia, social)
  - [ ] Extras that are real, official, and visible (legal name, public address, contact, founding date, published IDs); skip empty; do not subtype a brochure org as LocalBusiness just because About lists an office
- [ ] Turn on only the ElevateX kits/elements this client actually has — do not register Team + Products + Services + Events “just in case”
- [ ] Staging MCP (local/staging only)
  - [ ] Bricks → AI → MCP Adapter **Connected**
  - [ ] Dedicated builder user; Application Password on **that** user; store in 1Password (not git)
  - [ ] Copy the MCP snippet from Bricks → AI; add it in Cursor **Customize → MCPs** (or `.cursor/mcp.json`); username + Application Password = the dedicated user (not a chat prompt)
  - [ ] Official Bricks skills + `figma-to-bricks-drafts`
  - [ ] Figma MCP on **this** project’s file
- [ ] Keep MCP off production
  - [ ] `BRICKS_DISABLE_MCP` and/or abilities toggle off; **no** production Application Password
  - [ ] Do not set `BRICKS_ENABLE_PHP_ABILITIES` except on a trusted local/staging box
```

---

## 3. Bricks page building

Track B plus citeability on the page you are building ([04](04-figma-to-bricks-drafts.md), [08](08-client-citeability.md), [03](03-wp-ai-readiness-checklist.md) accessibility). One ticket per page is fine; do not paste this into the ElevateX toolbox ticket.

```markdown
## Bricks page building

Source: M&S AI-ready SOPs 02, 03, 04, 07, 08.

- [ ] Target is local or staging — not live; Bricks AI abilities stay off on production
- [ ] MCP draft
  - [ ] Agent lists existing global classes, variables, palettes, and `mns` tokens on **this** site before creating anything; Bricks names win; stop if nothing matches
  - [ ] One section per write; whole page Frame for context; human opens the builder before the next section
  - [ ] If desktop and mobile (or tablet) frames exist, give the agent both — mobile is Bricks breakpoints, not a second template
  - [ ] Map Figma’s look onto existing Bricks keys; do not invent a class or token to match Figma’s name
- [ ] Semantic HTML / accessibility tree
  - [ ] Real headings, lists, labels
  - [ ] Buttons are `<button>` or links, not clickable `div`s
  - [ ] Menus, dialogs, and accordions exist in the accessibility tree
- [ ] Citeable HTML on the page
  - [ ] Copy is rendered HTML, not only a background image or a JS-only drawer
  - [ ] Money page: first 2–3 paragraphs say what it is / what they do (SOP 08). Lede = component or text block, not a custom PHP element, not cloaked
- [ ] Extra elements on this page only if that content is actually visible
  - [ ] FAQ
  - [ ] HowTo
  - [ ] Comparison
  - [ ] Review
- [ ] One-page-only people/products: Bricks card grid, no CPT. Reused records: query the CPT; teaser card is heading, image, excerpt, link
- [ ] Do not print `<script type="application/ld+json">` from Bricks
- [ ] Front-end QA vs Figma; leftover gaps (hover, mobile, tokens, copy) listed on the project — do not rubber-stamp the MCP write
```

---

## 4. CPT / element / component registration

On **this project**: enable a kit that already exists in ElevateX, or add something bespoke with the same pattern ([07](07-schema-data-and-cards.md)). If you are writing FAQ for the whole theme, that is §1.

```markdown
## Register a CPT, element, or component

Source: M&S AI-ready SOPs 01, 07.

- [ ] Decide: appears on one page only → Bricks cards, no CPT, no ACF repeater. Same person/product/service/event in more than one place → CPT kit
- [ ] CPT kit (only if reused)
  - [ ] Enabling a shipped kit: turn the flag on; confirm CPT, ACF, Bricks single + card, and Yoast bridge all exist
  - [ ] Bespoke: same four pieces in the child theme, not a new plugin; `@id` = that post’s permalink; one Yoast `@graph`; no second `ld+json` script
- [ ] Product CPT vs schema (the post type is a CMS list, not a store claim)
  - [ ] CPT is fine even if nothing is for sale here
  - [ ] `Product` + `Offer` only if they sell it **on this site**
  - [ ] Software / platform → `SoftwareApplication`
  - [ ] Manuals / specs → `TechArticle` or WebPage
- [ ] Cards
  - [ ] One-page Team Cards: append Person if name/title are visible; Organization points at Person; not ProfilePage; not gated on seniority
  - [ ] Teaser cards of CPT singles: HTML + link only — do not re-append a full Person/Product
- [ ] New Bricks building block
  - [ ] Schema-bearing **element** (FAQ, HowTo, etc.): visible HTML and the Yoast piece from the **same fields**
  - [ ] Display-only **component** (lede): existing global classes/tokens; no PHP graph piece
- [ ] Do not
  - [ ] Use an ACF repeater as a fake CPT (no permalink)
  - [ ] Register every kit “just in case”
  - [ ] Treat Yoast’s blog-author Person as the leadership grid
```

---

## 5. WordPress launch

Do these to ship. Policy detail: [05](05-crawler-policy.md). Pass/fail wording lives in [03](03-wp-ai-readiness-checklist.md) — use §6 when you are verifying, not configuring.

```markdown
## WordPress launch — AI-ready

Source: M&S AI-ready SOPs 01, 03, 05, 07, 08.

- [ ] Production `robots.txt`
  - [ ] Allows retrieval bots (`OAI-SearchBot`, `ChatGPT-User`, Claude/Perplexity search + user, `Bingbot`, `Googlebot`)
  - [ ] Training bots allowed unless the client opted out in writing (`GPTBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `CCBot`)
  - [ ] One source only (ElevateX filter **or** Yoast file editor, never both)
- [ ] Yoast `llms.txt`
  - [ ] Enabled
  - [ ] **Manual page selection** of ~10–30 money URLs
  - [ ] Each line has a Yoast meta description
  - [ ] No noindex / password-protected / hide-from-archive URLs
- [ ] Sitemap submitted
  - [ ] Google Search Console
  - [ ] Bing Webmaster Tools
- [ ] Yoast Organization + `sameAs` filled; one `@graph` on money pages (no Bricks/card JSON-LD)
- [ ] Money pages: first 2–3 paragraphs are citeable HTML (SOP 08 already with the client)
- [ ] Bricks → AI abilities **off** on live; no production Application Password
- [ ] One canonical URL per page; trailing slashes consistent
- [ ] If reporting is in the SOW: GSC property verified (see Measurement block)
```

---

## 6. WordPress live audit

Confirm on the **production** (or soon-to-be-live) URL. Do not fail Pantheon staging for `Disallow: /`. Full how-to: [03](03-wp-ai-readiness-checklist.md). Mark pass / fail / n/a on the ticket.

```markdown
## WordPress live audit — AI-ready

Source: M&S AI-ready SOP 03 (and 05, 07). Production URL: ________

- [ ] Access
  - [ ] Live `/robots.txt` does not block retrieval bots; training allowed unless written opt-out
  - [ ] `curl -sI -A "OAI-SearchBot"` on the homepage is 200 or a normal redirect (not 403/429)
  - [ ] Confirmed which `robots.txt` source this site uses (Yoast file editor vs theme `robots_txt`)
- [ ] Sitemap submitted (not only that `/sitemap_index.xml` exists)
  - [ ] Google Search Console
  - [ ] Bing Webmaster Tools
- [ ] `/llms.txt`
  - [ ] ~10–30 recognizable money URLs
  - [ ] Real descriptions
  - [ ] List is current
- [ ] Schema
  - [ ] One Yoast `ld+json` script; Organization `@id` = home URL; `sameAs` matches real profiles
  - [ ] Brand/product names match everywhere
  - [ ] FAQPage / HowTo in schema only where that content is visible; one-page cards vs CPT matches SOP 07
  - [ ] Sample URL passes Rich Results Test; schema facts match visible text
- [ ] First screen of each money page: one pasteable sentence that says what it is; that sentence is HTML
- [ ] Accessibility
  - [ ] Buttons are `<button>` (or links that are links), not clickable `div`s
  - [ ] Form labels map to inputs
  - [ ] No layout-shift traps worth failing Core Web Vitals
- [ ] Bricks AI abilities off on live; no production Application Password
- [ ] Measurement rows only if in scope (see Measurement block)
```

---

## 7. Shopify launch / audit

Use this instead of §§2, 5, and 6 on a store ([06](06-shopify-product-data-checklist.md), [01](01-ai-ready-definition.md)). Passworded preview is not production and is not Catalog-eligible.

```markdown
## Shopify launch / audit — AI-ready

Source: M&S AI-ready SOPs 01, 06, 08. Store URL: ________

- [ ] Agents can find the store
  - [ ] Production crawlable (password off); do not rewrite Shopify `robots.txt` unless a retrieval bot is blocked
  - [ ] `/agents.md` and UCP discovery URLs respond (Shopify-hosted — do not recreate)
  - [ ] Catalog / Agentic Storefronts eligible, or a written reason it is not
- [ ] Sitemap submitted
  - [ ] Google Search Console
  - [ ] Bing Webmaster Tools
- [ ] Product facts on sample PDPs (current template **and** a leftover/legacy template if one still exists)
  - [ ] Title is the product name; first lines of the description say what it is (SOP 08 with the client)
  - [ ] Brand, GTIN/barcode, price, availability, options, images filled
  - [ ] Shipping/returns as policies or structured fields, not only a PDF
  - [ ] Ratings in schema only if reviews are visible
  - [ ] Metafields hold specs/materials agents can trust
- [ ] Theme schema
  - [ ] One Product JSON-LD with brand, GTIN, offers, availability; no duplicate Product graph; no schema app
  - [ ] Organization / brand `sameAs` present (theme or brand settings — Shopify often omits this)
- [ ] Skip unless asked
  - [ ] `llms.txt`
  - [ ] Extra SEO/AI apps
  - [ ] Custom MCP
- [ ] If Agentic is on and reporting is in scope: Catalog / AI-channel attribution in admin
```

---

## 8. Kickoff / writers

SEO/PM + client. Not a theme ticket. [08](08-client-citeability.md) is the only file they get.

```markdown
## Kickoff — citeable money pages

Source: M&S AI-ready SOPs 01, 08.

- [ ] Money-page list agreed (home, product/platform, solutions, About, plus any they’d hate to lose)
- [ ] Client has SOP 08 only — not the internal SOP set
- [ ] Official names written down (one string per product/brand)
- [ ] First paragraphs on money pages scheduled (client writes; we can review before launch)
- [ ] Optional: 15-minute workshop on one money page (not a video course)
- [ ] Skip
  - [ ] Site-wide Markdown clones
  - [ ] “Make a special AI file of every page”
  - [ ] Promising ChatGPT rankings
```

---

## 9. Measurement

Only if the engagement includes reporting. Do not build a Marvel & Snap visibility product ([01](01-ai-ready-definition.md), [03](03-wp-ai-readiness-checklist.md), [06](06-shopify-product-data-checklist.md)).

```markdown
## Measurement (if in SOW)

Source: M&S AI-ready SOPs 01, 03, 06.

- [ ] Channels we can actually see
  - [ ] Google Search Console Generative AI performance report (live, verified property)
  - [ ] GA4 AI referrers (`chatgpt.com`, `perplexity.ai`, `gemini.google.com`) — sessions only; under-counts zero-click
  - [ ] Citation baseline: 20–50 prompts, AI Overviews + ChatGPT first; mention / citation / miss
  - [ ] Shopify: Catalog / Agentic attribution if that channel is on
- [ ] Tools
  - [ ] Paid visibility tool only if the retainer includes a monthly scorecard
  - [ ] Glance-only tools (isitagentready, etc.) are not a deliverable
```

---

## 10. Engagement close

Staging MCP credentials must not outlive the job ([02](02-studio-mcp-onesheet.md)).

```markdown
## Engagement close — studio MCP

Source: M&S AI-ready SOP 02.

- [ ] Shut down studio MCP
  - [ ] Revoke the staging Application Password
  - [ ] Confirm Bricks → AI abilities are off on live (and `BRICKS_DISABLE_MCP` if the theme supports it)
  - [ ] Confirm Cursor is not pointed at a production MCP URL
```

---

## Do not sell or install

Scoping / estimate reminder. Not a client checklist.

```markdown
## Out of default scope

Source: M&S AI-ready SOP 01.

- [ ] MCP Adapter / Bricks AI **abilities** on production (plugin files in the repo are fine; the toggle and credential are not)
- [ ] Extra discovery files / protocols
  - [ ] A second `llms.txt` plugin
  - [ ] Site-wide Markdown dumps
  - [ ] MCP Server Cards, A2A, Markdown negotiation
- [ ] A Yoast-equivalent or “AI SEO” Shopify app
- [ ] A plugin library per content type
- [ ] “We’ll rank you in ChatGPT”
```
