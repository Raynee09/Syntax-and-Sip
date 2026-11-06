import { useState } from 'react'
import { seats }    from '../../data/seats.js'
import { drinks }   from '../../data/drinks.js'
import { calculateMemberSubtotal, getDrinkLabel } from '../../context/calculations.js'
import './SquadMember.css'

export default function SquadMember({ member, onRemove, onUpdateName, onUpdateDrink, onUpdateSeat }) {
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal]         = useState(member.name)

  const subtotal    = calculateMemberSubtotal(member)
  const drinkLabel  = getDrinkLabel(member.drinkConfig)
  const seatObj     = member.seatId ? seats.find(s => s.id === member.seatId) : null

  function handleNameBlur() {
    setEditingName(false)
    if (nameVal.trim()) onUpdateName(member.id, nameVal.trim())
    else setNameVal(member.name)
  }

  function handleDrinkChange(e) {
    const baseId = e.target.value
    if (!baseId) {
      onUpdateDrink(member.id, null)
      return
    }
    onUpdateDrink(member.id, {
      baseId,
      milkId: 'none',
      sweetnessId: 'none',
      syrupIds: [],
      extraIds: [],
    })
  }

  function handleSeatChange(e) {
    onUpdateSeat(member.id, e.target.value || null)
  }

  const availableSeats = seats.filter(s => s.availability === 'available' || s.id === member.seatId)

  return (
    <div className="squad-member">
      <div className="squad-member__top">
        {editingName ? (
          <input
            className="squad-member__name-input"
            value={nameVal}
            onChange={e => setNameVal(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={e => { if (e.key === 'Enter') handleNameBlur() }}
            autoFocus
            aria-label="Member name"
          />
        ) : (
          <button
            type="button"
            className="squad-member__name"
            onClick={() => setEditingName(true)}
            aria-label={`Edit name: ${member.name}`}
          >
            {member.name}
          </button>
        )}
        <span className="squad-member__subtotal">₹{subtotal}</span>
        <button
          type="button"
          className="squad-member__remove"
          aria-label={`Remove ${member.name}`}
          onClick={() => onRemove(member.id)}
        >
          ✕
        </button>
      </div>

      <div className="squad-member__row">
        <label className="squad-member__field-label" htmlFor={`drink-${member.id}`}>Drink</label>
        <select
          id={`drink-${member.id}`}
          className="squad-member__select"
          value={member.drinkConfig?.baseId || ''}
          onChange={handleDrinkChange}
        >
          <option value="">No drink</option>
          {drinks.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="squad-member__row">
        <label className="squad-member__field-label" htmlFor={`seat-${member.id}`}>Seat</label>
        <select
          id={`seat-${member.id}`}
          className="squad-member__select"
          value={member.seatId || ''}
          onChange={handleSeatChange}
        >
          <option value="">No seat</option>
          {availableSeats.map(s => (
            <option key={s.id} value={s.id}>{s.label} — ₹{s.pricePerHour}/hr</option>
          ))}
        </select>
      </div>
    </div>
  )
}
