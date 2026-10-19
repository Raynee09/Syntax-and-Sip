import { Routes, Route } from 'react-router-dom'

import Navbar   from './components/Navbar/Navbar.jsx'
import Footer   from './components/Footer/Footer.jsx'
import Home     from './pages/Home/Home.jsx'
import Space    from './pages/Space/Space.jsx'
import Fuel     from './pages/Fuel/Fuel.jsx'
import Squad    from './pages/Squad/Squad.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Story    from './pages/Story/Story.jsx'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/space"    element={<Space />} />
        <Route path="/fuel"     element={<Fuel />} />
        <Route path="/squad"    element={<Squad />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/story"    element={<Story />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
