export type SopAudience = 'internal' | 'client'

export type SopGroup = 'start' | 'live' | 'studio' | 'next'

export type Sop = {
  id: string
  file: string
  number: string
  title: string
  blurb: string
  audience: SopAudience
  group: SopGroup
}

export const groups: { id: SopGroup; label: string }[] = [
  { id: 'start', label: 'Start here' },
  { id: 'live', label: 'Live client site' },
  { id: 'studio', label: 'How we build' },
  { id: 'next', label: 'Next steps' },
]

export const sops: Sop[] = [
  {
    id: '01-ai-ready-definition',
    file: '01-ai-ready-definition.md',
    number: '01',
    title: 'What “AI-ready” means',
    blurb: 'The definition. Use this when scoping a site or deciding whether to add a plugin.',
    audience: 'internal',
    group: 'start',
  },
  {
    id: '98-cheat-sheet',
    file: '98-cheat-sheet.md',
    number: '98',
    title: 'Cheat sheet',
    blurb: 'Skim of 01–08. Headings and bullets only.',
    audience: 'internal',
    group: 'start',
  },
  {
    id: '03-wp-ai-readiness-checklist',
    file: '03-wp-ai-readiness-checklist.md',
    number: '03',
    title: 'WordPress AI-readiness checklist',
    blurb: 'Pass / fail / n/a on a real WordPress URL — launch or live audit.',
    audience: 'internal',
    group: 'live',
  },
  {
    id: '06-shopify-product-data-checklist',
    file: '06-shopify-product-data-checklist.md',
    number: '06',
    title: 'Shopify product-data checklist',
    blurb: 'The same job on a Shopify store: catalog, theme schema, citeable PDPs.',
    audience: 'internal',
    group: 'live',
  },
  {
    id: '05-crawler-policy',
    file: '05-crawler-policy.md',
    number: '05',
    title: 'Crawler policy',
    blurb: 'Which bots may fetch the live site, and how to confirm robots.txt.',
    audience: 'internal',
    group: 'live',
  },
  {
    id: '07-schema-data-and-cards',
    file: '07-schema-data-and-cards.md',
    number: '07',
    title: 'Schema: one record, many cards, one graph',
    blurb: 'Cards vs a CPT kit, and how extras attach to Yoast’s graph.',
    audience: 'internal',
    group: 'live',
  },
  {
    id: '08-client-citeability',
    file: '08-client-citeability.md',
    number: '08',
    title: 'Writing pages that AI can quote',
    blurb: 'The one sheet to send writers. Clients write the sentences.',
    audience: 'client',
    group: 'live',
  },
  {
    id: '02-studio-mcp-onesheet',
    file: '02-studio-mcp-onesheet.md',
    number: '02',
    title: 'Studio MCP',
    blurb: 'Local and staging only. Off on production.',
    audience: 'internal',
    group: 'studio',
  },
  {
    id: '04-figma-to-bricks-drafts',
    file: '04-figma-to-bricks-drafts.md',
    number: '04',
    title: 'Figma → Bricks section drafts',
    blurb: 'How Cursor reads a Figma frame and writes a section on staging.',
    audience: 'internal',
    group: 'studio',
  },
  {
    id: '99-next-steps',
    file: '99-next-steps.md',
    number: '99',
    title: 'Next steps (Linear checklists)',
    blurb: 'Copy a block into a ticket. Theme, setup, Bricks, launch, audit.',
    audience: 'internal',
    group: 'next',
  },
]

const markdownFiles = import.meta.glob('../sops/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function getSop(id: string): Sop | undefined {
  return sops.find((sop) => sop.id === id)
}

export function getSopMarkdown(id: string): string | undefined {
  const sop = getSop(id)
  if (!sop) return undefined
  const key = `../sops/${sop.file}`
  return markdownFiles[key]
}
