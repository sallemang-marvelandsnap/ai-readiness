# Crawler policy (draft)

**Default (locked):** always allow live-retrieval bots. Allow training bots unless the client opts out.  
**`robots.txt` implementation:** pick **one** path after the Yoast-on-Bricks spike. Do not run a Yoast physical file *and* an ElevateX `robots_txt` filter.

---

## Allow (retrieval — required for citations)

- `OAI-SearchBot`, `ChatGPT-User` (OpenAI live / ChatGPT search)
- `Claude-SearchBot`, `Claude-User` (Anthropic live)
- `PerplexityBot`, `Perplexity-User`
- `Bingbot` (Copilot; ChatGPT may use Bing’s index — also submit the sitemap to Bing)
- `Googlebot` (already required; powers AI Overviews / AI Mode)

OpenAI: sites that block `OAI-SearchBot` do not appear in ChatGPT search.

## Allow unless client opts out (training)

- `GPTBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `CCBot`

## Do not

- Block all bots on **production** (Pantheon test envs that `Disallow: /` are fine).
- Rely on Content Signals (`ai-train` / `search` / `ai-input` / `use=…`) alone. OpenSpace already emits `Content-Signal`; treat as extra, not the policy.
- Add invented `Link` `rel="llms"` / `rel="ai"` headers.

## Sample retrieval + training allow snippet

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

Paste into Yoast → Tools → File editor **or** append via `robots_txt` if no physical file exists.

## Cloudflare

Check bot fight / AI scrape rules on live. A correct `robots.txt` does nothing if the CDN returns 403 to those user-agents.
