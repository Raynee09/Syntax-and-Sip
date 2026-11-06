import Seat from '../Seat/Seat.jsx'
import './SeatMap.css'

export default function SeatMap({ seats, selectedSeatId, filteredSeatIds, onSeatClick, onUnavailableClick }) {
  return (
    <div className="seat-map-container">
      <svg
        className="seat-map"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Café floor map"
        role="img"
      >
        {/* ── Room outline ── */}
        <rect x="60" y="50" width="710" height="520" rx="8"
          fill="none" stroke="#D1B39C" strokeWidth="1.5" />

        {/* ── Bar counter left wall ── */}
        <rect x="60" y="50" width="70" height="520"
          fill="#734830" opacity="0.18" rx="0" />
        <text x="95" y="320" fill="#926347" fontSize="11" fontFamily="sans-serif"
          textAnchor="middle" transform="rotate(-90,95,320)">BAR SEATING</text>

        {/* ── Window zone top wall ── */}
        <rect x="130" y="50" width="640" height="40"
          fill="#D1B39C" opacity="0.15" />
        <text x="450" y="76" fill="#926347" fontSize="11" fontFamily="sans-serif"
          textAnchor="middle">WINDOW ZONE</text>

        {/* ── Group area label ── */}
        <text x="400" y="460" fill="#926347" fontSize="11" fontFamily="sans-serif"
          textAnchor="middle">GROUP TABLES</text>

        {/* ── Seats ── */}
        {seats.map(seat => (
          <Seat
            key={seat.id}
            seat={seat}
            isSelected={seat.id === selectedSeatId}
            isFilteredOut={filteredSeatIds !== null && !filteredSeatIds.includes(seat.id)}
            onSeatClick={onSeatClick}
            onUnavailableClick={onUnavailableClick}
          />
        ))}
      </svg>
    </div>
  )
}
