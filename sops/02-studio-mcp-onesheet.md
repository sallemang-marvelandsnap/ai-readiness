# Studio MCP (one sheet)

**Local and staging only. Off on production.** Bricks marks AI Abilities experimental.

---

## What this is

Cursor (or Claude / Copilot) talks to a **staging or local** WordPress site through the official [MCP Adapter](https://wordpress.org/plugins/mcp-adapter/) plugin. Bricks 2.4 registers abilities (pages, elements, classes, variables). Figma MCP **reads** a frame. Bricks MCP **writes** a section draft. Humans review in the builder.

This is how we implement designs. It is not installed on the live client site and it is not an AI-search ranking feature.

---

## Setup (once per local/staging site)

1. WordPress **6.9+**, Bricks **2.4+**, ElevateX.
2. **Bricks → AI** → install/activate MCP Adapter (canonical plugin). Do **not** use the deprecated Automattic `wordpress-mcp` repo or a third-party Bricks MCP plugin.
3. Create a **dedicated WordPress user** (least privilege that can use the builder) and an **Application Password**. Store it in 1Password, never in git.
4. Point Cursor at `/wp-json/mcp/mcp-adapter-default-server` via `@automattic/mcp-wordpress-remote` (Bricks shows the snippet).
5. Install official Bricks skills in the client. Load the project skill `figma-to-bricks-drafts`.
6. Connect Figma MCP to the **project file**, not a random library, unless we have agreed a shared M&S set.

Confirm “Connected” in Bricks → AI. If the REST route is missing, check permalinks and plugin conflicts.

---

## Allowed / forbidden

- **Allowed:** local and staging; inspect design system first; draft sections; convert HTML → Bricks; QA inspect.
- **Forbidden:** production; inventing global classes or tokens without asking; extra JSON-LD; committing Application Passwords; treating agent output as shipped.

When the engagement ends, revoke the Application Password and confirm Bricks AI is off on live.

---

## Headline workflow

See [05-figma-to-bricks-drafts.md](05-figma-to-bricks-drafts.md).
