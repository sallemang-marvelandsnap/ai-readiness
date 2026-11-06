# Crawler policy (draft)

**Default (locked):** always allow live-retrieval bots. Allow training bots unless the client opts out.  
**`robots.txt` implementation:** **Prefer the ElevateX `robots_txt` filter** for the studio allow-list (versioned, every site). **To-do** — ElevateX does not have this hook yet (`inc/hooks/` is ACF + client-scripts only). Until it ships, use Yoast’s file editor or WP’s default virtual file. Leave Yoast → Tools → File editor empty. Do not run a Yoast physical file *and* the filter — the file wins and the filter is ignored. Do not auto-create a physical `robots.txt` if Yoast is missing; WordPress already serves a virtual file, the filter still applies, and Yoast is required on this stack.

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
- Rely on Content Signals (`ai-train` / `search` / `ai-input` / `use=…`) alone. Treat as extra, not the policy.
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

Append via the ElevateX `robots_txt` filter. Paste into Yoast → Tools → File editor only if we have agreed to skip the filter on that site.

## Edge / WAF (Pantheon, not Cloudflare)

WP sites are on Pantheon. Check that Global CDN / WAF or a security plugin is not 403ing retrieval user-agents. A correct `robots.txt` does nothing if the edge blocks the bot. Do not assume a Cloudflare Bot Fight screen — we are not on Cloudflare.
