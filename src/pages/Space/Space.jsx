import { useState } from 'react'
import { Link } from 'react-router-dom'
import { seats as allSeats } from '../../data/seats.js'
import { useSession } from '../../context/SessionContext.jsx'
import FilterBar from '../../components/FilterBar/FilterBar.jsx'
import SeatMap from '../../components/SeatMap/SeatMap.jsx'
import SeatDetails from '../../components/SeatDetails/SeatDetails.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import './Space.css'

// Filter logic — deterministic per design §10.3
function applyFilters(filters) {
  if (filters.length === 0) return null // null = show all

  return allSeats
    .filter(seat => {
      if (seat.availability !== 'available') return false
      if (filters.includes('power')       && !seat.hasPower)                   return false
      if (filters.includes('quiet')       && seat.noiseLevel !== 'quiet')      return false
      if (filters.includes('fast-wifi')   && seat.wifiSpeed < 100)             return false
      if (filters.includes('window')      && !seat.naturalLighting)            return false
      if (filters.includes('group')       && seat.seatType !== 'group')        return false
      if (filters.includes('low-traffic') && seat.trafficLevel !== 'low')      return false
      return true
    })
    .map(s => s.id)
}

export default function Space() {
  const { selectedSeatId, selectSeat } = useSession()
  const [activeFilters, setActiveFilters] = useState([])
  const [focusedSeat, setFocusedSeat] = useState(null)
  const [unavailableMsg, setUnavailableMsg] = useState('')

  const filteredIds = applyFilters(activeFilters) // null = no filter active

  function toggleFilter(key) {
    setActiveFilters(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  function clearFilters() {
    setActiveFilters([])
  }

  function handleSeatClick(seat) {
    setFocusedSeat(seat)
  }

  function handleUnavailableClick(seat) {
    setUnavailableMsg(`${seat.label} is unavailable.`)
    setTimeout(() => setUnavailableMsg(''), 2500)
  }

  function handleBook(seat) {
    selectSeat(seat.id)
    setFocusedSeat(null)
  }

  function handleCloseDetails() {
    setFocusedSeat(null)
  }

  const hasNoMatches = filteredIds !== null && filteredIds.length === 0
  const bookedSeat = selectedSeatId ? allSeats.find(s => s.id === selectedSeatId) : null

  return (
    <main className="space-page">
      <div className="space-page__header">
        <h1 className="space-page__heading">FIND YOUR SPACE</h1>
        <p className="space-page__intro">
          Every seat has live telemetry. Filter by what matters to you, then click to book.
        </p>
      </div>

      <div className="space-page__layout">
        <aside className="space-page__sidebar">
          <p className="space-page__filter-label">FILTER SEATS</p>
          <FilterBar
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            onClearFilters={clearFilters}
          />
          {/* Legend */}
          <div className="space-page__legend">
            <div className="legend-item"><span className="legend-dot legend-dot--available" />Available</div>
            <div className="legend-item"><span className="legend-dot legend-dot--selected"  />Your seat</div>
            <div className="legend-item"><span className="legend-dot legend-dot--reserved"  />Reserved</div>
            <div className="legend-item"><span className="legend-dot legend-dot--occupied"  />Occupied</div>
          </div>
        </aside>

        <div className="space-page__map-area">
          {unavailableMsg && (
            <p className="space-page__unavailable-msg" role="alert">{unavailableMsg}</p>
          )}

          <SeatMap
            seats={allSeats}
            selectedSeatId={selectedSeatId}
            filteredSeatIds={filteredIds}
            onSeatClick={handleSeatClick}
            onUnavailableClick={handleUnavailableClick}
          />

          {hasNoMatches && (
            <EmptyState
              icon="☕"
              heading="No seats match your filters."
              message="Try removing a filter or exploring the full map."
              action={{ label: 'Clear all filters', onClick: clearFilters }}
            />
          )}
        </div>

        {focusedSeat && (
          <SeatDetails
            seat={focusedSeat}
            isCurrentlySelected={focusedSeat.id === selectedSeatId}
            onBook={handleBook}
            onClose={handleCloseDetails}
          />
        )}
      </div>

      {bookedSeat && (
        <div className="space-page__session-bar" role="status">
          <span>Your seat: <strong>{bookedSeat.label}</strong> · ₹{bookedSeat.pricePerHour}/hr</span>
          <Link to="/checkout" className="space-page__session-bar-link">View in Checkout →</Link>
        </div>
      )}
    </main>
  )
}
