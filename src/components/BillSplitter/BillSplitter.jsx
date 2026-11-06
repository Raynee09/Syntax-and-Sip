import { calculateGroupTotal, calculateSplitAmounts } from '../../context/calculations.js'
import './BillSplitter.css'

const MODES = [
  { key: 'order',  label: 'By Order'  },
  { key: 'equal',  label: 'Equal'     },
  { key: 'custom', label: 'Custom'    },
]

export default function BillSplitter({ members, splitMode, customAmounts, onSetSplitMode, onSetCustomAmount }) {
  const groupTotal  = calculateGroupTotal(members)
  const splitResult = calculateSplitAmounts(members, groupTotal, splitMode, customAmounts)
  const customSum   = Object.values(customAmounts).reduce((a, b) => a + (Number(b) || 0), 0)
  const remaining   = groupTotal - customSum
  const isCustomValid = splitMode !== 'custom' || remaining === 0

  return (
    <div className="bill-splitter">
      <p className="bill-splitter__label">SPLIT METHOD</p>

      <div className="bill-splitter__modes" role="group" aria-label="Split method">
        {MODES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`bill-splitter__mode-btn${splitMode === key ? ' bill-splitter__mode-btn--active' : ''}`}
            aria-pressed={splitMode === key}
            onClick={() => onSetSplitMode(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bill-splitter__rows">
        {members.map(m => (
          <div key={m.id} className="bill-splitter__row">
            <span className="bill-splitter__member-name">{m.name}</span>
            {splitMode === 'custom' ? (
              <div className="bill-splitter__custom-input-wrap">
                <span className="bill-splitter__rupee">₹</span>
                <input
                  type="number"
                  min="0"
                  id={`custom-${m.id}`}
                  className="bill-splitter__custom-input"
                  value={customAmounts[m.id] ?? ''}
                  onChange={e => onSetCustomAmount(m.id, e.target.value)}
                  aria-label={`Custom amount for ${m.name}`}
                />
              </div>
            ) : (
              <span className="bill-splitter__amount">₹{splitResult[m.id] ?? 0}</span>
            )}
          </div>
        ))}
      </div>

      {splitMode === 'custom' && (
        <p className={`bill-splitter__remaining ${!isCustomValid ? 'bill-splitter__remaining--error' : ''}`}>
          {isCustomValid
            ? 'Amounts balance ✓'
            : `Remaining: ₹${remaining} — Amounts must add up to ₹${groupTotal}`
          }
        </p>
      )}

      <div className="bill-splitter__total">
        <span className="bill-splitter__total-label">GROUP TOTAL</span>
        <span className="bill-splitter__total-amount">₹{groupTotal}</span>
      </div>
    </div>
  )
}
