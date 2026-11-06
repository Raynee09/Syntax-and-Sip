import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button.jsx'
import './Home.css'

// Static SVG floor map preview for the Space section
function FloorPreviewSVG() {
  return (
    <svg
      className="space-preview__svg"
      viewBox="0 0 340 220"
      aria-hidden="true"
      focusable="false"
    >
      {/* Room outline */}
      <rect x="8" y="8" width="324" height="204" rx="6"
        fill="none" stroke="#D1B39C" strokeWidth="1.5" />
      {/* Bar counter */}
      <rect x="8" y="8" width="60" height="204" rx="0"
        fill="#734830" opacity="0.25" />
      {/* Window zone */}
      <rect x="68" y="8" width="264" height="28" rx="0"
        fill="#D1B39C" opacity="0.15" />
      <text x="140" y="24" fill="#926347" fontSize="8" fontFamily="sans-serif">WINDOW ZONE</text>
      <text x="16" y="110" fill="#926347" fontSize="7" fontFamily="sans-serif"
        transform="rotate(-90,16,110)">BAR</text>
      <text x="180" y="185" fill="#926347" fontSize="8" fontFamily="sans-serif"
        textAnchor="middle">GROUP TABLES</text>
      {/* Solo seats — window row */}
      <circle cx="100" cy="60" r="10" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      <circle cx="140" cy="60" r="10" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      <circle cx="180" cy="60" r="10" fill="#926347" stroke="#734830" strokeWidth="1" opacity="0.5" />
      <circle cx="220" cy="60" r="10" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      <circle cx="260" cy="60" r="10" fill="#7A8C4F" stroke="#1D0804" strokeWidth="1.5" />
      <circle cx="300" cy="60" r="10" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      {/* Group tables — centre */}
      <rect x="110" y="110" width="28" height="28" rx="3" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      <rect x="160" y="110" width="28" height="28" rx="3" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      <rect x="210" y="110" width="28" height="28" rx="3" fill="#1D0804" stroke="#734830" strokeWidth="1" opacity="0.5" />
      <rect x="260" y="110" width="28" height="28" rx="3" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      {/* Bar seats */}
      <circle cx="40" cy="70" r="8" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      <circle cx="40" cy="100" r="8" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
      <circle cx="40" cy="130" r="8" fill="#926347" stroke="#734830" strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="160" r="8" fill="#D1B39C" stroke="#734830" strokeWidth="1" />
    </svg>
  )
}

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero" aria-label="Syntax and Sip — homepage hero">
        <div className="hero__content">
          <h1 className="hero__headline">FIND YOUR<br />CORNER.</h1>
          <p className="hero__tagline">A café designed around the way you work.</p>
          <div className="hero__ctas">
            <Button as="link" to="/space" variant="primary">BOOK A DESK</Button>
            <Button as="link" to="/fuel" variant="secondary">BUILD YOUR SIP</Button>
          </div>
        </div>
      </section>

      {/* ===== TASK 2.1 — BRAND INTRO ===== */}
      <section className="brand-intro" aria-labelledby="brand-intro-heading">
        <div className="brand-intro__inner">
          <p className="brand-intro__quote" id="brand-intro-heading">
            Not just a café.<br />A place built for<br />how you think.
          </p>
          <div className="brand-intro__copy">
            <p>Syntax &amp; Sip is a smart workspace café built for students, coders, designers, and focused minds. Reserve a seat, customise your order, and work in a space that actually gets it.</p>
            <p>Real Wi-Fi speeds. Real quiet zones. Real coffee.</p>
          </div>
        </div>
      </section>

      {/* ===== TASK 2.2 — PRODUCT JOURNEY ===== */}
      <section className="journey" aria-labelledby="journey-heading">
<section className="journey">
  <div className="journey__header">
    <div>
      <span className="section-label">THE JOURNEY</span>

      <h2>
        THREE WAYS
        <br />
        TO BELONG
      </h2>
    </div>

    <p>
      A space to work, fuel to create,
      <br />
      and people who get it.
    </p>
  </div>

  <div className="journey__grid">

    {/* FIND YOUR CORNER */}
    <article className="journey-card">
      <div className="journey-card__image">
        <img
          src="/src/assets/journey/corner.jpg"
          alt="Top view of a café workspace"
        />
      </div>

      <div className="journey-card__content">
        <h3>
          FIND YOUR
          <br />
          CORNER
        </h3>

        <p>
          Browse the interactive floor map.
          Filter by power, quiet zones,
          Wi-Fi speed, and more.
        </p>

        <a href="/space">
          EXPLORE THE MAP →
        </a>
      </div>
    </article>


    {/* BUILD YOUR SIP */}
    <article className="journey-card">
      <div className="journey-card__image">
        <img
          src="/src/assets/journey/sip.jpg"
          alt="Coffee drinks on a café table"
        />
      </div>

      <div className="journey-card__content">
        <h3>
          BUILD
          <br />
          YOUR SIP
        </h3>

        <p>
          Customise your drink from base
          to extras. Watch the price,
          caffeine, and calories update live.
        </p>

        <a href="/fuel">
          START BUILDING →
        </a>
      </div>
    </article>


    {/* STUDY TOGETHER */}
    <article className="journey-card">
      <div className="journey-card__image">
        <img
          src="/src/assets/journey/squad.jpg"
          alt="Friends studying together in a café"
        />
      </div>

      <div className="journey-card__content">
        <h3>
          STUDY
          <br />
          TOGETHER
        </h3>

        <p>
          Create a squad session.
          Add members, assign orders,
          and split the bill however works.
        </p>

        <a href="/squad">
          START A SQUAD →
        </a>
      </div>
    </article>

  </div>
</section>
      </section>

      {/* ===== TASK 2.3 — SPACE PREVIEW ===== */}
      <section className="space-preview" aria-labelledby="space-preview-heading">
        <div className="space-preview__inner">
          <div className="space-preview__text">
            <p className="space-preview__label">SPACE</p>
            <h2 className="space-preview__heading" id="space-preview-heading">
              Choose your corner.
            </h2>
            <p className="space-preview__desc">
              Every seat has live telemetry — Wi-Fi speed, noise level, power availability, and natural light. Filter the map and find exactly what you need before you arrive.
            </p>
            <div className="space-preview__stats">
              <span>18 seats</span>
              <span>6 filters</span>
              <span>Live telemetry</span>
            </div>
            <Link to="/space" className="space-preview__link">Find a seat →</Link>
          </div>
          <div className="space-preview__visual" aria-hidden="true">
            <FloorPreviewSVG />
          </div>
        </div>
      </section>

      {/* ===== TASK 2.4 — FUEL PREVIEW ===== */}
      <section className="fuel-preview" aria-labelledby="fuel-preview-heading">
        <div className="fuel-preview__inner">
          <h2 className="fuel-preview__drink" id="fuel-preview-heading">OATMILK<br />LATTE.</h2>
          <p className="fuel-preview__metrics">₹180 · 64mg caffeine · 180kcal · 3g protein</p>
          <Link to="/fuel" className="fuel-preview__link">BUILD YOURS →</Link>
        </div>
      </section>

      {/* ===== TASK 2.5 — SQUAD PREVIEW ===== */}
      <section className="squad-preview" aria-labelledby="squad-preview-heading">
        <div className="squad-preview__inner">
          <div className="squad-preview__left">
            <h2 className="squad-preview__heading" id="squad-preview-heading">STUDY TOGETHER.</h2>
            <div className="squad-preview__list" role="list">
              <div className="squad-preview__row" role="listitem">
                <span className="squad-preview__name">Priya</span>
                <span className="squad-preview__drink">Oat Latte + Vanilla</span>
                <span className="squad-preview__amount">₹210</span>
              </div>
              <div className="squad-preview__row" role="listitem">
                <span className="squad-preview__name">Arjun</span>
                <span className="squad-preview__drink">Cold Brew</span>
                <span className="squad-preview__amount">₹180</span>
              </div>
              <div className="squad-preview__row" role="listitem">
                <span className="squad-preview__name">Kavya</span>
                <span className="squad-preview__drink">Matcha + Oat Milk</span>
                <span className="squad-preview__amount">₹230</span>
              </div>
              <div className="squad-preview__total-row">
                <span className="squad-preview__total-label">Total</span>
                <span className="squad-preview__total-amount">₹620</span>
              </div>
            </div>
            <p className="squad-preview__tagline">Split equally? By order? You decide.</p>
            <Link to="/squad" className="squad-preview__link">Start a squad →</Link>
          </div>
          <div className="squad-preview__right" aria-hidden="true">
            <p className="squad-preview__big">3 members</p>
            <p className="squad-preview__big squad-preview__big--amount">₹620</p>
          </div>
        </div>
      </section>

      {/* ===== TASK 2.6 — STORY TEASER ===== */}
      <section className="story-teaser" aria-labelledby="story-teaser-heading">
        <div className="story-teaser__inner">
          <blockquote className="story-teaser__quote" id="story-teaser-heading">
            "We built Syntax &amp; Sip because we kept working in places that didn't get it."
          </blockquote>
          <Link to="/story" className="story-teaser__link">READ OUR STORY →</Link>
        </div>
      </section>

      {/* ===== TASK 2.6 — FINAL CTA ===== */}
      <section className="final-cta" aria-labelledby="final-cta-heading">
        <div className="final-cta__inner">
          <h2 className="final-cta__heading" id="final-cta-heading">READY TO FIND<br />YOUR CORNER?</h2>
          <div className="final-cta__actions">
            <Button as="link" to="/space" variant="primary">BOOK A DESK</Button>
            <Link to="/fuel" className="final-cta__link">Build your sip →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
