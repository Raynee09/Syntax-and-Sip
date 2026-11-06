import './DrinkVisual.css'

export default function DrinkVisual({ drinkColor = '#8B5E3C', hasMilk = false, drinkName = '' }) {
  // Milk layer colour — lighter than the base drink
  const milkLayerColor = hasMilk ? 'rgba(233,230,227,0.35)' : 'transparent'

  return (
    <div className="drink-visual" aria-label={`Visual representation of ${drinkName}`}>
      <svg viewBox="0 0 160 220" className="drink-visual__svg" aria-hidden="true">
        {/* Cup body */}
        <path
          d="M30,40 L40,200 Q80,215 120,200 L130,40 Z"
          fill={drinkColor}
          style={{ transition: 'fill 0.3s ease' }}
        />
        {/* Milk/foam layer on top of liquid */}
        <path
          d="M30,40 L40,90 Q80,105 120,90 L130,40 Z"
          fill={milkLayerColor}
          style={{ transition: 'fill 0.3s ease' }}
        />
        {/* Cup outline */}
        <path
          d="M30,40 L40,200 Q80,215 120,200 L130,40 Z"
          fill="none"
          stroke="#926347"
          strokeWidth="2"
        />
        {/* Lid */}
        <ellipse cx="80" cy="40" rx="52" ry="10" fill="#734830" />
        <ellipse cx="80" cy="38" rx="48" ry="8"  fill="#926347" />
        {/* Sleeve band */}
        <path
          d="M32,130 L42,170 Q80,182 118,170 L128,130 Z"
          fill="rgba(29,8,4,0.15)"
        />
        {/* Drink name label */}
        <text
          x="80" y="155"
          textAnchor="middle"
          fill="rgba(233,230,227,0.7)"
          fontSize="10"
          fontFamily="sans-serif"
          fontWeight="600"
          letterSpacing="1"
        >
          {(drinkName || '').toUpperCase().substring(0, 8)}
        </text>
      </svg>
    </div>
  )
}
