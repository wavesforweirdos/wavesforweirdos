import { Link } from 'react-router-dom'
import './DotLink.scss'

function DotLink({ to, children, ...rest }) {
  if (to) {
    return (
      <Link to={to} className="dot-link">
        <span aria-hidden="true" />
        {children}
      </Link>
    )
  }

  return (
    <a className="dot-link" {...rest}>
      <span aria-hidden="true" />
      {children}
    </a>
  )
}

export default DotLink
