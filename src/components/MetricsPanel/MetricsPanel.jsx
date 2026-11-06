import './MetricsPanel.css'

export default function MetricsPanel({ price, caffeine, calories, protein }) {
  return (
    <div
      className="metrics-panel"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Live drink metrics"
    >
      <div className="metrics-panel__item">
        <span className="metrics-panel__label">PRICE</span>
        <span className="metrics-panel__value">₹{price}</span>
      </div>
      <div className="metrics-panel__item">
        <span className="metrics-panel__label">CAFFEINE</span>
        <span className="metrics-panel__value">{caffeine}mg</span>
      </div>
      <div className="metrics-panel__item">
        <span className="metrics-panel__label">CALORIES</span>
        <span className="metrics-panel__value">{calories}kcal</span>
      </div>
      <div className="metrics-panel__item">
        <span className="metrics-panel__label">PROTEIN</span>
        <span className="metrics-panel__value">{protein}g</span>
      </div>
    </div>
  )
}
