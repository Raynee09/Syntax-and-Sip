import { useSession } from '../../context/SessionContext.jsx'
import { calculateDrinkMetrics, getDrinkLabel } from '../../context/calculations.js'
import FuelBuilder from '../../components/FuelBuilder/FuelBuilder.jsx'
import './Fuel.css'

export default function Fuel() {
  const { confirmedDrink, confirmDrink } = useSession()

  const currentMetrics = confirmedDrink ? calculateDrinkMetrics(confirmedDrink) : null

  return (
    <main className="fuel-page">
      <div className="fuel-page__header">
        <h1 className="fuel-page__heading">BUILD YOUR SIP</h1>
        <p className="fuel-page__intro">
          Start with your base. Layer in milk, sweetness, syrups, and extras. Watch every metric update as you build.
        </p>
      </div>

      {confirmedDrink && currentMetrics && (
        <div className="fuel-page__current-order">
          <span>Current order: <strong>{getDrinkLabel(confirmedDrink)}</strong> — ₹{currentMetrics.price}</span>
          <span className="fuel-page__current-order-note">Edit below to update.</span>
        </div>
      )}

      <div className="fuel-page__builder">
        <FuelBuilder
          confirmedDrink={confirmedDrink}
          onConfirm={confirmDrink}
        />
      </div>
    </main>
  )
}
