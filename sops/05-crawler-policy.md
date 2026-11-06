# Crawler policy

**Marvel & Snap — internal.** This is the **Access** layer: which bots may fetch the live site. It is not a ChatGPT ranking promise. Use it when setting `robots.txt` or answering “should we block GPTBot?” Launch checks live in [03](03-wp-ai-readiness-checklist.md) (WordPress) and [06](06-shopify-product-data-checklist.md) (Shopify). Do **not** send this file to clients.

WordPress is on **Pantheon** (not Cloudflare). Shopify’s default `robots.txt` is usually `Allow: /`; do not fight it unless a rule blocks retrieval.

---

## Two kinds of bot (do not use one switch)

- **Live retrieval** — used **now** for answers and citations (`OAI-SearchBot`, `ChatGPT-User`, Claude/Perplexity search and user bots, `Bingbot`, `Googlebot`). If the client wants to appear in AI answers, **never block these** on production. OpenAI: sites that block `OAI-SearchBot` do not appear in ChatGPT search.
- **Training** — used to train future model weights (`GPTBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `CCBot`). **Allow unless the client opts out** of training. Opting out does not replace allowing retrieval bots.

Google is grounded in its own index and **ignores `llms.txt`**. ChatGPT and Perplexity use their own crawlers. `robots.txt` is still the place we allow or deny those user-agents.

---

## Locked default

Always allow live-retrieval bots on **production**. Allow training bots unless the client has opted out in writing.

Pantheon `test` / `dev` / multidev environments often `Disallow: /` for every bot. That is expected. Do not “fix” staging by opening it to the world. Fail **live** if production still blocks retrieval.

---

## Where the rules live (WordPress)

**Prefer** an ElevateX `robots_txt` filter so the allow-list is in git and the same on every site. Leave **Yoast SEO → Tools → File editor** empty.

**Not in the theme yet** (`inc/hooks/` is ACF + client-scripts only; `ai-readiness.php` is still to-do). Until the filter ships: use Yoast’s file editor **or** leave WordPress’s default virtual `robots.txt` if nothing `Disallow`s retrieval bots.

**Never both.** If Yoast has saved a physical `robots.txt`, WordPress ignores the PHP filter. Do not auto-create a physical file because Yoast is missing — a physical file is what *breaks* the filter, Yoast is required on this stack, and WordPress already serves a virtual file.

---

## Allow (retrieval)

- `OAI-SearchBot`, `ChatGPT-User` — OpenAI live / ChatGPT search
- `Claude-SearchBot`, `Claude-User` — Anthropic live
- `PerplexityBot`, `Perplexity-User` — Perplexity
- `Bingbot` — Copilot; ChatGPT may use Bing’s index — also submit the sitemap to Bing
- `Googlebot` — already required; powers AI Overviews / AI Mode

## Allow unless the client opts out (training)

`GPTBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `CCBot`

To opt out of training only: `Disallow: /` for those training user-agents. Do **not** add retrieval bots to that block.

---

## Do not

- Block all bots on **production**.
- Rely on Content Signals (`ai-train` / `search` / `ai-input` / `use=…`) as the policy. Those are extra comments some files include; explicit `User-agent` rules are what we use.
- Add invented HTTP `Link` headers (`rel="llms"`, `rel="ai"`).
- Assume a Cloudflare Bot Fight screen. We are not on Cloudflare.

---

## How to confirm (production)

Open `https://example.com/robots.txt`. Fail if `User-agent: *` plus `Disallow: /`, or if a named retrieval bot is disallowed.

Then fetch as a bot (a correct `robots.txt` does nothing if the edge returns 403):

```bash
curl -sI -A "OAI-SearchBot" https://example.com/
```

Pass = `200` or a normal redirect. Fail = `403` / `429` (often an empty or WAF body) from Pantheon Global CDN, WAF, or a security plugin. Repeat with `ChatGPT-User` if you want.

To see **which `robots.txt` source** this site uses: **Yoast SEO → Tools → File editor**. If a file is saved there, that physical file is the source. If the editor is empty, grep the theme for `robots_txt` (ElevateX does not have it yet). Tick the Access rows on the site you are auditing in [03](03-wp-ai-readiness-checklist.md).

---

## Sample snippet (retrieval + training allowed)

Use this when we own `robots.txt` (ElevateX filter, later; Yoast file editor only if we have agreed to skip the filter on that site).

```txt
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: Google-Extended
User-agent: CCBot
Allow: /
```
