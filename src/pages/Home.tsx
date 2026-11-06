import { Link } from 'react-router-dom'
import { groups, sops } from '../sops'

export function Home() {
  return (
    <article className="home">
      <p className="eyebrow">Working standards</p>
      <h1>AI-ready client sites</h1>
      <p className="lede">
        Marvel &amp; Snap makes pages eligible to be crawled, understood, and quoted. We do not promise rankings
        in ChatGPT. These pages are the team SOPs. Research notes that fed them live in <code>archived/</code> and
        are not part of this site.
      </p>
      {groups.map((group) => (
        <section key={group.id} className="sop-group">
          <h2>{group.label}</h2>
          <ul className="sop-cards">
            {sops
              .filter((sop) => sop.group === group.id)
              .map((sop) => (
                <li key={sop.id}>
                  <Link to={`/sops/${sop.id}`}>
                    <span className="card-meta">
                      <span className="card-num">{sop.number}</span>
                      {sop.audience === 'client' ? <span className="pill">Give to writers</span> : null}
                    </span>
                    <span className="card-title">{sop.title}</span>
                    <span className="card-blurb">{sop.blurb}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </article>
  )
}
