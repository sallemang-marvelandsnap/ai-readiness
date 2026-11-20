# Studio MCP (one sheet)

**Local and staging only. Off on production.** Bricks marks AI Abilities experimental.

---

## What this is

Cursor (or Claude / Copilot) talks to a **staging or local** WordPress site through the official [MCP Adapter](https://wordpress.org/plugins/mcp-adapter/) plugin. Bricks 2.4 registers abilities (pages, elements, classes, variables). Figma MCP **reads** a frame. Bricks MCP **writes** a section draft. Humans review in the builder.

This is how we implement designs. It is not an AI-search ranking feature. The adapter **plugin files** will usually be on production too (same repo as staging). That is fine. What must stay off on live is **abilities enabled** and a **usable MCP credential**.

---

## Setup (once per local/staging site)

1. WordPress **6.9+**, Bricks **2.4+**, ElevateX.
2. **Bricks → AI** → activate MCP Adapter if it is not already (canonical plugin; files are often already in the repo). Do **not** use the deprecated Automattic `wordpress-mcp` repo or a third-party Bricks MCP plugin.
3. Create a **dedicated WordPress user** (least privilege that can use the builder) and an **Application Password** on *that* user (Users → Profile → Application Passwords). Store it in 1Password, never in git. There is no Bricks “assign this user to MCP” toggle: the Application Password *is* the user.
4. Connect Cursor (not a chat prompt). On **Bricks → AI** (`/wp-admin/admin.php?page=bricks-ai`), copy the MCP client snippet (`@automattic/mcp-wordpress-remote` pointed at `/wp-json/mcp/mcp-adapter-default-server`). In Cursor, open **Customize → MCPs** (Settings now banners this: Plugins, MCPs, Skills, and Rules moved to Customize). Add the snippet there, or put the same JSON in `.cursor/mcp.json` (project) / `~/.cursor/mcp.json` (user). Set the WordPress username and Application Password to the dedicated user from step 3 — that is how MCP authenticates. Do not use an admin password. (The **Skills** install prompt on the same Bricks screen is step 5.)
5. Install **official Bricks skills in Cursor** (not on the WordPress site). They are optional instruction packs from **Codeer** (the Bricks company) — GitHub org `codeerhq` is them, not a third-party plugin. They teach the agent how to call Bricks abilities; they do not add permissions. Easiest: **Bricks → AI → Skills** → copy the install prompt → paste it into a Cursor chat. Or clone [codeerhq/bricks-skills](https://github.com/codeerhq/bricks-skills) and symlink the folders you want into `.cursor/skills/`. We need **`bricks-start-here`**, **`bricks-design-systems`**, **`bricks-naming-conventions`**, **`bricks-figma-to-bricks`**, **`bricks-html-css-to-bricks`**. Then load our project skill `figma-to-bricks-drafts` (ElevateX overlay: theme tokens first, no extra JSON-LD, local/staging only). Verify with the prompt on the same Bricks tab, or ask Cursor to list loaded Bricks skills. Do **not** install a community `bricks-mcp` WordPress plugin. [Academy](https://academy.bricksbuilder.io/builder/features/ai-abilities-and-skills/).
6. Connect Figma MCP to the **project file**, not a random library, unless we have agreed a shared M&S set. **Customize → MCPs**; Figma signed in; paste this job’s Figma URL in chat and confirm the file name before drafting. See [04](04-figma-to-bricks-drafts.md).

Confirm “Connected” in Bricks → AI. If the REST route is missing, check permalinks and plugin conflicts.

---

## Allowed / forbidden

- **Allowed:** local and staging; inspect design system first; draft sections; convert HTML → Bricks; QA inspect.
- **Forbidden:** production; inventing global classes or tokens without asking; extra JSON-LD; committing Application Passwords; treating agent output as shipped.

**What actually keeps it off production:** not “omit the plugin from the repo.” Local, staging, and live share the same codebase, so MCP Adapter will likely **exist** on all three. Activation and the Bricks toggle are per-environment (different databases). Bricks will still enable abilities on live if someone flips the switch.

Enforcement, in order of durability:

1. **Theme / env lock (intended):** if the environment is live (`PANTHEON_ENVIRONMENT === 'live'`, or `WP_ENVIRONMENT_TYPE === 'production'`), define `BRICKS_DISABLE_MCP` as `true` before Bricks loads. That greys out the abilities toggle and blocks registration (including WP-CLI). ElevateX already has `Foundation::is_pantheon( 'live' )`; it does **not** set this constant yet.
2. **Leave it off in the live DB:** abilities toggle off; adapter inactive if we can do that without the next deploy re-activating it.
3. **No live credential:** do not create a production Application Password or point Cursor at the live MCP URL.
4. Never set `BRICKS_ENABLE_PHP_ABILITIES` except on a trusted local/staging box.

When the engagement ends, revoke the Application Password and confirm Bricks AI is off on live.

---

## Headline workflow

See [04-figma-to-bricks-drafts.md](04-figma-to-bricks-drafts.md).
