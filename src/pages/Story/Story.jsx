import Button from '../../components/Button/Button.jsx'
import './Story.css'

export default function Story() {
  return (
    <main className="story-page">
      {/* Hero */}
      <section className="story-hero">
        <div className="story-hero__inner">
          <h1 className="story-hero__headline">A PLACE<br />TO THINK.</h1>
        </div>
      </section>

      {/* Origin */}
      <section className="story-origin">
        <div className="story-origin__inner">
          <div className="story-origin__text">
            <p>We kept looking for a place where we could settle in for four hours and actually get things done. Not a library. Not a loud bar. Somewhere that understood both the coffee and the code.</p>
            <p>Most cafés are designed for turnover. Syntax &amp; Sip is designed for the session — the long mornings, the focused afternoons, the late study runs that turn into something unexpected.</p>
            <p>We built a workspace that happens to make exceptional coffee. Or maybe a coffee shop that happens to be the best place to work. Either way, it's yours.</p>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="story-quote">
        <div className="story-quote__inner">
          <blockquote className="story-quote__text">
            "We built Syntax &amp; Sip for the people who live between ideas."
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="story-values">
        <div className="story-values__inner">
          <div className="story-value">
            <h2 className="story-value__heading">Focus</h2>
            <p className="story-value__desc">Every seat is chosen for concentration. Noise levels, lighting, Wi-Fi — all measured, all visible, all yours to filter by.</p>
          </div>
          <div className="story-value">
            <h2 className="story-value__heading">Community</h2>
            <p className="story-value__desc">Syntax &amp; Sip is built for the people who work alongside other people. Study groups, design jams, code reviews — welcome here.</p>
          </div>
          <div className="story-value">
            <h2 className="story-value__heading">Craft</h2>
            <p className="story-value__desc">The coffee is as considered as the seating. Single origins, careful extraction, and a builder that lets you make it exactly yours.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="story-cta">
        <div className="story-cta__inner">
          <h2 className="story-cta__heading">Ready to find your corner?</h2>
          <Button as="link" to="/space" variant="primary">BOOK A DESK</Button>
        </div>
      </section>
    </main>
  )
}
