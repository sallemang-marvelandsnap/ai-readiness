export async function downloadSopPdf(options: {
  source: HTMLElement
  filename: string
  number: string
  title: string
  audience: string
}) {
  const html2pdf = (await import('html2pdf.js')).default

  const host = document.createElement('div')
  host.setAttribute('aria-hidden', 'true')
  host.style.cssText = 'position:fixed;left:-10000px;top:0;width:760px;'

  const sheet = document.createElement('article')
  sheet.className = 'pdf-export'
  const header = document.createElement('p')
  header.className = 'pdf-export-kicker'
  header.textContent = `Marvel & Snap · SOP ${options.number} · ${options.audience}`
  const heading = document.createElement('p')
  heading.className = 'pdf-export-title'
  heading.textContent = options.title
  const body = options.source.cloneNode(true) as HTMLElement
  body.querySelector('h1')?.remove()
  sheet.append(header, heading, body)
  host.append(sheet)
  document.body.append(host)

  try {
    const pdf = await html2pdf()
      .set({
        margin: [12, 12, 14, 12],
        filename: options.filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true, windowWidth: 760 },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
      })
      .from(sheet)
      .outputPdf('blob')

    const blob = pdf instanceof Blob ? pdf : new Blob([pdf], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = options.filename
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  } finally {
    host.remove()
  }
}
