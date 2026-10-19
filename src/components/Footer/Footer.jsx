import { Link } from 'react-router-dom'
import './Footer.css'

const footerLinks = [
  { label: 'Space', to: '/space' },
  { label: 'Fuel',  to: '/fuel'  },
  { label: 'Squad', to: '/squad' },
  { label: 'Story', to: '/story' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <span className="footer__brand">SYNTAX &amp; SIP</span>

        {/* Nav links */}
        <ul className="footer__links" role="list">
          {footerLinks.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} className="footer__link">{label}</Link>
            </li>
          ))}
        </ul>

        {/* Tagline */}
        <p className="footer__tagline">
          A café designed around the way you work.
        </p>

      </div>
    </footer>
  )
}

export default Footer
