import { Link } from 'react-router-dom'
import './DotLink.scss'

function DotLink({ to, children, ...rest }) {
  if (to) {
    return (
      <Link to={to} className="dot-link">
        <span className="dot-link__marker" aria-hidden="true" />
        <span className="dot-link__label">{children}</span>
      </Link>
    )
  }

  return (
    <a className="dot-link" {...rest}>
      <span className="dot-link__marker" aria-hidden="true" />
      <span className="dot-link__label">{children}</span>
    </a>
  )
}

export default DotLink
