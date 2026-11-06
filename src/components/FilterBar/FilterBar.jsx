import './FilterBar.css'

const FILTERS = [
  { key: 'power',       label: 'Power' },
  { key: 'quiet',       label: 'Quiet' },
  { key: 'fast-wifi',   label: 'Fast Wi-Fi' },
  { key: 'window',      label: 'Window' },
  { key: 'group',       label: 'Group' },
  { key: 'low-traffic', label: 'Low Traffic' },
]

export default function FilterBar({ activeFilters, onToggleFilter, onClearFilters }) {
  const hasActive = activeFilters.length > 0

  return (
    <div className="filter-bar" role="group" aria-label="Seat filters">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={`filter-bar__btn${activeFilters.includes(key) ? ' filter-bar__btn--active' : ''}`}
          aria-pressed={activeFilters.includes(key)}
          onClick={() => onToggleFilter(key)}
        >
          {label}
        </button>
      ))}
      {hasActive && (
        <button
          type="button"
          className="filter-bar__clear"
          onClick={onClearFilters}
        >
          Clear all
        </button>
      )}
    </div>
  )
}
