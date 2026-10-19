import { Link } from 'react-router-dom'
import './Button.css'

/**
 * Button — reusable interactive element for Syntax & Sip.
 *
 * Props:
 *   variant   "primary" | "secondary" | "ghost"  (default: "primary")
 *   as        "button" | "a" | Link               (default: "button")
 *   to        string  — React Router destination  (used when as="link")
 *   href      string  — native anchor href        (used when as="a")
 *   onClick   function
 *   children  node
 *   ...rest   any other valid button / anchor attributes
 */
function Button({
  variant = 'primary',
  as = 'button',
  to,
  href,
  onClick,
  children,
  ...rest
}) {
  const className = `btn btn--${variant}`

  // React Router <Link>
  if (as === 'link' && to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    )
  }

  // Native anchor
  if (as === 'a' && href) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }

  // Default: <button>
  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default Button
