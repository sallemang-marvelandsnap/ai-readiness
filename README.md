# AI-ready (Marvel & Snap)

Internal SOPs for making client sites eligible to be crawled, understood, and quoted. This folder is also a small React site that turns `sops/*.md` into pages.

Do **not** send the whole set to clients. Writers get `08` only.

Research notes and earlier work plans are in `archived/`. They are not part of the site.

## Run the site

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Edit a file in `sops/` and save — the page reloads.

```bash
npm run build
npm run preview
```

## SOP sources

Markdown in `sops/` is the source of truth. The home page groups them; relative links between SOP files become site links. To add a page, put a new `.md` in `sops/` **and** register it in `src/sops.ts`.

- **01** — What “AI-ready” means: the definition, two tracks, and what we do or skip on a standard build.
- **02** — Studio MCP: Cursor/Bricks MCP on local and staging only; off on production.
- **03** — WordPress AI-readiness checklist: pass / fail / n/a on a real WordPress URL at launch or audit.
- **04** — Figma → Bricks section drafts: how Cursor reads a Figma frame and writes a section on staging.
- **05** — Crawler policy: which bots may fetch the live site, and how to confirm `robots.txt`.
- **06** — Shopify product-data checklist: Catalog, theme schema, and citeable PDPs (the WordPress job on a store).
- **07** — Schema: one record, many cards, one Yoast graph — cards vs a CPT kit, extras in Yoast not a second script.
- **08** — Writing pages that AI can quote: the one sheet for clients and writers.
- **98** — Cheat sheet: skim of 01–08 as headings and bullets.
- **99** — Next steps: Linear-ready checklists (theme, setup, Bricks, launch, audit).
