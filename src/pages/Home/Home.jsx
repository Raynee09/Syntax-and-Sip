import Button from '../../components/Button/Button.jsx'
import './Home.css'

function Home() {
  return (
    <main>
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
    </main>
  )
}

export default Home
