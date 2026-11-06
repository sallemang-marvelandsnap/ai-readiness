# WordPress AI-readiness checklist

**Marvel & Snap — internal.** This is the **Track A** launch and audit list — the **live client site** (crawlers, citeable pages, Yoast), not the studio Figma → Bricks MCP workflow. Can retrieval bots fetch it, is the Yoast graph honest, can a model quote the money pages, and can we measure anything. Use it on a real URL (QA before launch, or a live audit). Mark each row **pass**, **fail**, or **n/a**. The definition of “AI-ready” is [01](01-ai-ready-definition.md). Shopify stores use [06](06-shopify-product-data-checklist.md) instead.

We do **not** promise rankings in ChatGPT. Do **not** send this file to clients. Writers get [08](08-client-citeability.md).

**Stack:** Bricks 2.4+ + ElevateX + Yoast. Do not add an “AI SEO” plugin or a second `llms.txt` generator.

**Owners** are named on each section. **Money pages** = home, product/platform, solutions, About, and any URL the client would be unhappy to lose.

**Where to look:** production (or the URL that will become production). Do **not** fail Pantheon staging for `Disallow: /` — that policy is in [05](05-crawler-policy.md).

Rows marked *confirm on live audit* cannot be judged from the repo — check this site’s live (or soon-to-be-live) URL or server logs.

---

## Access — can bots fetch the live page?

**Owner:** dev / SEO. Policy, bot lists, `robots.txt` source, sample snippet, and `curl -A` are in [05](05-crawler-policy.md). This section is only pass/fail on **this** URL.

**How:** Follow [05](05-crawler-policy.md) on production (`/robots.txt`, then `curl -sI -A "OAI-SearchBot"`). Sitemap is not in 05: confirm it is submitted in Google Search Console **and** Bing Webmaster Tools, not only that `/sitemap_index.xml` exists.

- [ ] Live `robots.txt` does **not** block retrieval bots ([05](05-crawler-policy.md)).
- [ ] Training bots are allowed unless the client opted out ([05](05-crawler-policy.md)).
- [ ] The edge is not 403ing those user-agents (`curl -A` in [05](05-crawler-policy.md)). *Confirm on live audit.*
- [ ] One `robots.txt` source only, per [05](05-crawler-policy.md) (ElevateX filter when it exists; never both). *Confirm on live audit which this site uses.*
- [ ] Sitemap submitted to **Google Search Console and Bing Webmaster Tools**.

---

## `llms.txt` — Yoast’s cheap index

**Owner:** SEO / content. This is **not** a Google ranking file. Google ignores it. We still turn Yoast’s feature on because the screen is already there.

**How:** Open `/llms.txt` on live. Confirm the toggle and **Manual page selection** in **Yoast SEO → Settings → Site features → AI tools → llms.txt** ([Yoast’s steps](https://yoast.com/help/enable-llmstxt/)). The file should list ~10–30 money URLs you recognize, each with a description. Empty descriptions → fill Yoast meta on those URLs. Spot-check that no private/noindex URL slipped in.

- [ ] Yoast `llms.txt` is **enabled**.
- [ ] About **10–30 money URLs** are picked by hand (home, product/platform, solutions, About). Do not leave Yoast’s auto “latest 5 per type.”
- [ ] Each line has a real description. Use the **Yoast meta description**. Empty lines usually mean Bricks left `post_content` empty — fix with meta + the `wpseo_llmstxt_link_description` filter in ElevateX, not another plugin.
- [ ] No password-protected, noindex, or “hide from archive” URLs in the file.
- [ ] The list is current (refresh quarterly with the money pages).

---

## Schema — one Yoast JSON-LD packet

**Owner:** dev / SEO. This is the **Facts** layer in [01](01-ai-ready-definition.md): official names and attributes (Organization, `sameAs`, product/person records) in **one** structured-data blob. It is for rich results and entity clarity, not a ChatGPT ranking lever. How we attach extras: [07](07-schema-data-and-cards.md).

**How:** View source on home and one money page. Search `ld+json` — there should be **one** Yoast `<script>`. Paste it into [Rich Results Test](https://search.google.com/test/rich-results) and [schema markup validator](https://validator.schema.org/). Check Organization `@id` = home URL and `sameAs` matches real profiles. **Mark the row fail** if you find a second `<script type="application/ld+json">` (for example a Bricks FAQ, card, or HTML element dumping its own schema). FAQ/HowTo belong in Yoast’s graph only if that Q&A or those steps are visible on the page.

- [ ] Yoast **Organization** on home/About: `@id` is the home URL; **`sameAs`** lists the official profiles (LinkedIn, Wikipedia, social).
- [ ] Brand and product names are the same everywhere (not “Northwind Track” on one page and “NW Track” on another).
- [ ] Article / BlogPosting on editorial. FAQPage only where visible Q&A exists. HowTo only on real step-by-step pages.
- [ ] Leadership / team / products / services / events: **one page only** → Bricks card grid (e.g. Team Card). **Reused in several places** → CPT + ACF kit. Schema only on the official single (or once on About if the grid never leaves that page). Cards and “related” blocks are display + link only — no JSON-LD on the card.
- [ ] **One `@graph`.** Fail if a Bricks card or element prints its own JSON-LD script.
- [ ] Schema facts match visible text (Google’s bar).
- [ ] A sample URL passes [Rich Results Test](https://search.google.com/test/rich-results). *Confirm Yoast + Bricks + ACF conflict patterns on live audit.*

---

## Citeability — can you quote the first screen?

**Owner:** content. Dev only if the sentence is trapped in the builder (image, widget, empty `post_content`). Give writers — client and internal — [08](08-client-citeability.md). A lede is a visible first sentence (Bricks component or text block), not a custom element and not hidden text. `llms.txt` and schema do not fix thin copy. Do not generate Markdown clones of every page.

**How:** On each money page, read only the first screen (or Reader view). You should be able to paste one sentence that says **what this is** or **what they do** (not a hero vibe line). If you cannot, fail the row. That is our citeability test, not an SEO/AI-Overview term called “definition.” View source (or disable images) and confirm that sentence is real text, not a background image or a closed JS drawer. Canonical: one URL in Yoast + the address bar, slash style consistent.

- [ ] The first 2–3 paragraphs say what the thing is or what they do. (Most AI Overview citations come from the first ~30% of the page.)
- [ ] Claims are self-contained (“Licenses start at $199 per user per month,” not “it’s affordable, as above”).
- [ ] That copy is in the **rendered HTML**, not only in a background image or a JS-only drawer. Extra Bricks wrappers around real text are fine.
- [ ] Headings, lists, and tables are real HTML elements.
- [ ] One canonical URL; trailing slashes are consistent.

---

## Accessibility / agent UX — owner: dev / QA

Agents and assistive tech both need a real accessibility tree. This is not a separate “AI widget.”

**How:** Chrome inspector → Accessibility tree on a money page (nav, a dialog or accordion, a form). Buttons should be `button` or `a`, not a `div` with a click handler. Core Web Vitals: GSC or PageSpeed on live; reserved image/font space is enough. If something fails, name the actual hole (e.g. “Team Card uses a `div` as a button,” “accordion not in the accessibility tree,” “missing `mns-*` token”) and fix it **on this project** — Bricks GUI if it is a one-off on the page, ElevateX/theme code if it is a shared component or token. A Linear issue on that project is the usual place to track it. Do not file “page builders are bad for accessibility.”

- [ ] Buttons are `<button>` (or links that are links), not clickable `div`s.
- [ ] Form labels map to inputs.
- [ ] Menus, dialogs, and accordions exist in the accessibility tree.
- [ ] No layout-shift traps (images and fonts reserve space). Existing Core Web Vitals work counts.
- [ ] Failures are named and fixed on this project (Bricks GUI or theme/ElevateX code, tracked in Linear) — not a generic “page builders are bad” note in these SOPs.

---

## Studio MCP — staging only

**Owner:** dev. **n/a on a production-only check.** This is **Track B** — how we **build** in the studio (Figma → Bricks via MCP on staging), not a client ranking feature. Same repo means the MCP Adapter **files** may exist on live; abilities must still be off. Details: [02](02-studio-mcp-onesheet.md).

**How:** On live, **Bricks → AI** — abilities off (or `BRICKS_DISABLE_MCP` in `wp-config`). No Application Password on a production user (Users → Application Passwords / 1Password). Staging may be on; password stays out of git.

- [ ] Bricks → AI abilities **off** on live. No production Application Password. (`BRICKS_DISABLE_MCP` on live is the durable lock; ElevateX does not set it yet.)
- [ ] If staging is used for Figma → Bricks drafts: dedicated Application Password user; password not in git.

---

## Measurement — if the engagement includes it

**Owner:** SEO / PM. Skip this section when we are not reporting. Do not build a Marvel & Snap visibility product.

**How:** GSC → Performance → Generative AI (needs a live, verified property). GA4 → reports or Explore, source/medium or session referrer containing `chatgpt.com`, `perplexity.ai`, `gemini.google.com`. Citation baseline: a spreadsheet of 20–50 prompts, run in AI Overviews and ChatGPT, note mention / citation / miss. Paid tool only if the SOW says scorecard.

- [ ] Google Search Console **Generative AI** performance report is available (live sites). That is the Google number.
- [ ] GA4 referrers for AI chat domains (`chatgpt.com`, `perplexity.ai`, `gemini.google.com`, etc.). These are **sessions only** and under-count zero-click answers.
- [ ] Citation baseline: 20–50 prompts, Google AI Overviews + ChatGPT first.
- [ ] A paid visibility tool only if the retainer includes a monthly scorecard.

---

## Optional third-party checkers (do not sell the score)

isitagentready, agentchecker, or Lighthouse Agentic Browsing — glance only. A tool score is not a deliverable.
