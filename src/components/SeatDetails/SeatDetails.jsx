import { useEffect, useRef } from 'react'
import TelemetryMetric from '../TelemetryMetric/TelemetryMetric.jsx'
import Button from '../Button/Button.jsx'
import './SeatDetails.css'

export default function SeatDetails({ seat, isCurrentlySelected, onBook, onClose }) {
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [seat?.id])

  if (!seat) return null

  const {
    label, seatType, wifiSpeed, noiseLevel, hasPower,
    naturalLighting, trafficLevel, pricePerHour,
  } = seat

  const typeLabel = {
    solo: 'Solo seat', group: 'Group table',
    booth: 'Booth', bar: 'Bar stool',
  }[seatType] || seatType

  return (
    <div
      className="seat-details"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seat-details-heading"
    >
      <div className="seat-details__header">
        <div>
          <h2
            className="seat-details__title"
            id="seat-details-heading"
            tabIndex={-1}
            ref={headingRef}
          >
            {label}
          </h2>
          <p className="seat-details__type">{typeLabel}</p>
        </div>
        <button
          type="button"
          className="seat-details__close"
          aria-label="Close seat details"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="seat-details__divider" />

      <div className="seat-details__metrics">
        <TelemetryMetric icon="📶" label="Wi-Fi"          value={`${wifiSpeed} Mbps`} />
        <TelemetryMetric icon="🔊" label="Noise"          value={noiseLevel} />
        <TelemetryMetric icon="⚡" label="Power"          value={hasPower ? 'Available' : 'None'} />
        <TelemetryMetric icon="☀" label="Natural Light"  value={naturalLighting ? 'Yes' : 'No'} />
        <TelemetryMetric icon="🚶" label="Traffic"        value={trafficLevel} />
        <TelemetryMetric icon="₹"  label="Price"          value={`₹${pricePerHour}/hr`} />
      </div>

      <div className="seat-details__divider" />

      {isCurrentlySelected ? (
        <p className="seat-details__selected-note">✓ This is your current selection</p>
      ) : null}

      <div className="seat-details__actions">
        <Button variant="primary" onClick={() => onBook(seat)}>
          {isCurrentlySelected ? 'Keep this seat' : 'Book this seat'}
        </Button>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
      </div>
    </div>
  )
}
