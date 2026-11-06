import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { downloadSopPdf } from '../download-pdf'
import { SopMarkdown } from '../markdown'
import { getSop, getSopMarkdown, sops } from '../sops'

export function SopPage() {
  const { id } = useParams()
  const sop = id ? getSop(id) : undefined
  const source = id ? getSopMarkdown(id) : undefined
  const bodyRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)

  if (!sop || source === undefined) {
    return (
      <article className="missing">
        <h1>Not a SOP</h1>
        <p>
          No document matches this URL. <Link to="/">Back to the list.</Link>
        </p>
      </article>
    )
  }

  const current = sop
  const markdown = source
  const ordered = sops.slice().sort((a, b) => a.number.localeCompare(b.number))
  const index = ordered.findIndex((item) => item.id === current.id)
  const prev = index > 0 ? ordered[index - 1] : undefined
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined

  async function onDownload() {
    if (!bodyRef.current) return
    setDownloading(true)
    try {
      await downloadSopPdf({
        source: bodyRef.current,
        filename: `mns-sop-${current.file.replace(/\.md$/, '.pdf')}`,
        number: current.number,
        title: current.title,
        audience: current.audience === 'client' ? 'Give to writers' : 'Internal',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <article className="sop">
      <div className="sop-toolbar">
        <p className="eyebrow">
          SOP {current.number}
          {current.audience === 'client' ? ' · Give to writers' : ' · Internal'}
        </p>
        {current.number !== '99' ? (
          <button type="button" className="pdf-btn" onClick={onDownload} disabled={downloading}>
            {downloading ? 'Preparing PDF…' : 'Download PDF'}
          </button>
        ) : null}
      </div>
      <div className="sop-body" ref={bodyRef}>
        <SopMarkdown source={markdown} />
      </div>
      <nav className="pager" aria-label="Adjacent SOPs">
        {prev ? (
          <Link to={`/sops/${prev.id}`} className="pager-prev">
            <span>Previous</span>
            {prev.number} {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/sops/${next.id}`} className="pager-next">
            <span>Next</span>
            {next.number} {next.title}
          </Link>
        ) : null}
      </nav>
    </article>
  )
}
