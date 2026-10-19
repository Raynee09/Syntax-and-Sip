import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '../Button/Button.jsx'
import './Navbar.css'

const navLinks = [
  { label: 'SPACE', to: '/space' },
  { label: 'FUEL',  to: '/fuel'  },
  { label: 'SQUAD', to: '/squad' },
  { label: 'STORY', to: '/story' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Overlay mode on homepage only; solid on all other pages
  const isHome = pathname === '/'
  const navClass = `navbar ${isHome ? 'navbar--overlay' : 'navbar--solid'}`

  function toggleMenu() {
    setMenuOpen(prev => !prev)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className={navClass} aria-label="Main navigation">
      <div className="navbar__inner">

        {/* Brand */}
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          SYNTAX &amp; SIP
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="navbar__cta">
          <Button as="link" to="/space" variant="primary">
            BOOK A DESK
          </Button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="navbar__hamburger"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          onClick={toggleMenu}
        >
          {/* Three lines drawn with CSS spans */}
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>

      </div>

      {/* Mobile dropdown */}
      <div
        id="navbar-mobile-menu"
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
      >
        <ul role="list">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-cta">
          <Button as="link" to="/space" variant="primary" onClick={closeMenu}>
            BOOK A DESK
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
