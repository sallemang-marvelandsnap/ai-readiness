import { isValidElement, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import type { Components } from 'react-markdown'
import { getSop } from './sops'

function sopPathFromMarkdownHref(href: string): string | null {
  const [path, hash] = href.split('#')
  const file = path.replace(/^\.\//, '')
  if (!file.endsWith('.md')) return null
  const id = file.replace(/\.md$/, '')
  if (!getSop(id)) return null
  return `/sops/${id}${hash ? `#${hash}` : ''}`
}

function nodeText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children)
  return ''
}

function codeClassName(node: ReactNode): string {
  const child = Array.isArray(node) ? node[0] : node
  if (isValidElement<{ className?: string }>(child) && child.props.className) {
    return child.props.className
  }
  return ''
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function CopyIconButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      type="button"
      className="copy-icon-btn"
      onClick={onCopy}
      aria-label={copied ? 'Copied' : 'Copy markdown'}
      title={copied ? 'Copied' : 'Copy'}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </button>
  )
}

function MarkdownSnippet({ source }: { source: string }) {
  const [raw, setRaw] = useState(false)

  return (
    <div className="md-snippet">
      <div className="md-snippet-toolbar">
        <button
          type="button"
          className="md-snippet-toggle"
          aria-pressed={raw}
          onClick={() => setRaw((value) => !value)}
        >
          Raw
        </button>
        <CopyIconButton text={source} />
      </div>
      {raw ? (
        <pre className="md-snippet-raw">
          <code>{source}</code>
        </pre>
      ) : (
        <div className="md-snippet-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={innerComponents}>
            {source}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}

function CopyPre({ children }: { children?: ReactNode }) {
  const text = nodeText(children).replace(/\n$/, '')

  return (
    <div className="copy-pre">
      <CopyIconButton text={text} />
      <pre>{children}</pre>
    </div>
  )
}

const linkComponents: Pick<Components, 'a'> = {
  a({ href, children }) {
    if (!href) return <a>{children}</a>
    if (href.startsWith('http://') || href.startsWith('https://')) {
      return (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      )
    }
    const sopPath = sopPathFromMarkdownHref(href)
    if (sopPath) return <Link to={sopPath}>{children}</Link>
    if (href.startsWith('#')) return <a href={href}>{children}</a>
    return <a href={href}>{children}</a>
  },
}

const innerComponents: Components = {
  ...linkComponents,
}

const components: Components = {
  ...linkComponents,
  pre({ children }) {
    const source = nodeText(children).replace(/\n$/, '')
    if (codeClassName(children).includes('language-markdown')) {
      return <MarkdownSnippet source={source} />
    }
    return <CopyPre>{children}</CopyPre>
  },
}

export function SopMarkdown({ source }: { source: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
      {source}
    </ReactMarkdown>
  )
}
