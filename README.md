# AI-ready (Marvel & Snap)

Internal SOPs for making client sites eligible to be crawled, understood, and quoted. This folder is also a small React site that turns `sops/*.md` into pages.

Research notes, the original PDF, and the October work plan are in `archived/`. They are not part of the site.

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

Markdown in `sops/` is the source of truth. The home page groups them; relative links between SOP files become site links.
