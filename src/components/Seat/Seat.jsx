import './Seat.css'

// Colour map for each seat state (SVG inline values)
const STATE_STYLES = {
  available:    { fill: '#D1B39C', stroke: '#734830', opacity: 1,    cursor: 'pointer' },
  selected:     { fill: '#7A8C4F', stroke: '#1D0804', opacity: 1,    cursor: 'pointer' },
  reserved:     { fill: '#926347', stroke: '#926347', opacity: 0.5,  cursor: 'not-allowed' },
  occupied:     { fill: '#1D0804', stroke: '#1D0804', opacity: 0.55, cursor: 'not-allowed' },
  'filtered-out': { fill: '#D1B39C', stroke: '#D1B39C', opacity: 0.18, cursor: 'default' },
}

export default function Seat({ seat, isSelected, isFilteredOut, onSeatClick, onUnavailableClick }) {
  const { id, label, availability, seatType, mapX, mapY } = seat

  // Derive visual state
  let visualState = availability
  if (isSelected) visualState = 'selected'
  else if (isFilteredOut) visualState = 'filtered-out'

  const style = STATE_STYLES[visualState] || STATE_STYLES.available
  const isInteractable = availability === 'available' || isSelected
  const isDisabled = availability === 'reserved' || availability === 'occupied'

  function handleClick() {
    if (isDisabled) {
      onUnavailableClick && onUnavailableClick(seat)
    } else if (!isFilteredOut) {
      onSeatClick && onSeatClick(seat)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  const ariaLabel = `${label} — ${seatType}, ${isSelected ? 'your selection' : availability}`
  const isGroup = seatType === 'group' || seatType === 'booth'
  const size = isGroup ? 24 : 18

  return (
    <g
      className={`seat seat--${visualState}`}
      role="button"
      tabIndex={isDisabled || isFilteredOut ? -1 : 0}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: style.cursor }}
    >
      <title>{ariaLabel}</title>
      {isGroup ? (
        <rect
          x={mapX - size / 2}
          y={mapY - size / 2}
          width={size}
          height={size}
          rx="3"
          fill={style.fill}
          stroke={style.stroke}
          strokeWidth="1.5"
          opacity={style.opacity}
        />
      ) : (
        <circle
          cx={mapX}
          cy={mapY}
          r={size}
          fill={style.fill}
          stroke={style.stroke}
          strokeWidth="1.5"
          opacity={style.opacity}
        />
      )}
    </g>
  )
}
