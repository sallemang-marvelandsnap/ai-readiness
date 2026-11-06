import { NavLink, Outlet } from 'react-router-dom'
import { sops } from '../sops'

export function Layout() {
  return (
    <div className="shell">
      <header className="masthead">
        <NavLink to="/" className="wordmark" end>
          <span className="wordmark-kicker">Marvel &amp; Snap</span>
          <span className="wordmark-title">AI-ready</span>
        </NavLink>
        <p className="masthead-note">Internal SOPs. Do not send the whole set to clients — writers get 08.</p>
      </header>
      <div className="columns">
        <nav className="toc" aria-label="SOPs">
          <NavLink to="/" className="toc-home" end>
            Home
          </NavLink>
          <ol className="toc-list">
            {sops
              .slice()
              .sort((a, b) => a.number.localeCompare(b.number))
              .map((sop) => (
                <li key={sop.id}>
                  <NavLink to={`/sops/${sop.id}`}>
                    <span className="toc-num">{sop.number}</span>
                    <span className="toc-label">{sop.title}</span>
                  </NavLink>
                </li>
              ))}
          </ol>
        </nav>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
