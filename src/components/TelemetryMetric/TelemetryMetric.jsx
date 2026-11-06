import './TelemetryMetric.css'

export default function TelemetryMetric({ label, value, icon }) {
  return (
    <div className="telemetry-metric">
      {icon && <span className="telemetry-metric__icon" aria-hidden="true">{icon}</span>}
      <span className="telemetry-metric__label">{label}</span>
      <span className="telemetry-metric__value">{value}</span>
    </div>
  )
}
