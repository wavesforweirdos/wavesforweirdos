import './DotLinkGrid.scss'

function DotLinkGrid({ children, ariaLabel }) {
  return (
    <nav className="dot-link-grid" aria-label={ariaLabel}>
      <div className="dot-link-grid__scroll">{children}</div>
    </nav>
  )
}

export default DotLinkGrid
