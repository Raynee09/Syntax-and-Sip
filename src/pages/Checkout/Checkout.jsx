import { useState } from 'react'
import { Link }     from 'react-router-dom'
import { useSession } from '../../context/SessionContext.jsx'
import { seats }      from '../../data/seats.js'
import { calculateDrinkMetrics, getDrinkLabel, calculateGroupTotal, calculateSplitAmounts } from '../../context/calculations.js'
import Button    from '../../components/Button/Button.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import './Checkout.css'

const SPLIT_LABELS = { order: 'By Order', equal: 'Equal Split', custom: 'Custom Split' }

export default function Checkout() {
  const { selectedSeatId, confirmedDrink, squad, confirmSession } = useSession()
  const [confirmed, setConfirmed] = useState(false)

  const hasAnything = selectedSeatId || confirmedDrink || (squad && squad.members.length > 0)

  // Seat
  const seat = selectedSeatId ? seats.find(s => s.id === selectedSeatId) : null

  // Drink
  const drinkMetrics = confirmedDrink ? calculateDrinkMetrics(confirmedDrink) : null
  const drinkLabel   = confirmedDrink ? getDrinkLabel(confirmedDrink) : null

  // Squad
  const members    = squad?.members || []
  const groupTotal = calculateGroupTotal(members)
  const splitAmounts = squad ? calculateSplitAmounts(members, groupTotal, squad.splitMode, squad.customAmounts) : {}
  const customSum  = squad?.splitMode === 'custom'
    ? Object.values(squad.customAmounts).reduce((a, b) => a + (Number(b) || 0), 0)
    : groupTotal
  const isCustomValid = squad?.splitMode !== 'custom' || customSum === groupTotal

  // Final total
  let finalTotal = 0
  if (squad && members.length > 0) {
    finalTotal = groupTotal
  } else {
    if (drinkMetrics) finalTotal += drinkMetrics.price
    if (seat)         finalTotal += seat.pricePerHour // 1hr default
  }

  function handleConfirm() {
    confirmSession()
    setConfirmed(true)
  }

  // ── Success screen ──
  if (confirmed) {
    return (
      <main className="checkout-page checkout-page--success">
        <div className="checkout-success">
          <p className="checkout-success__icon">☕</p>
          <h1 className="checkout-success__heading">Your session is confirmed.</h1>
          <p className="checkout-success__sub">See you at Syntax &amp; Sip.</p>
          <div className="checkout-success__actions">
            <Button as="link" to="/fuel" variant="secondary">Explore the menu →</Button>
            <Button as="link" to="/"    variant="ghost">Back to home →</Button>
          </div>
        </div>
      </main>
    )
  }

  // ── Empty state ──
  if (!hasAnything) {
    return (
      <main className="checkout-page">
        <div className="checkout-page__header">
          <h1 className="checkout-page__heading">YOUR SESSION</h1>
        </div>
        <EmptyState
          icon="☕"
          heading="Nothing here yet."
          message="Start building your session by finding a space, building your sip, or starting a squad."
          action={null}
        />
        <div className="checkout-empty-actions">
          <Button as="link" to="/space"  variant="secondary">Find a space →</Button>
          <Button as="link" to="/fuel"   variant="secondary">Build your sip →</Button>
          <Button as="link" to="/squad"  variant="secondary">Start a squad →</Button>
        </div>
      </main>
    )
  }

  // ── Summary ──
  return (
    <main className="checkout-page">
      <div className="checkout-page__header">
        <h1 className="checkout-page__heading">YOUR SESSION</h1>
      </div>

      <div className="checkout-page__layout">
        <div className="checkout-page__blocks">
          {/* Seat block */}
          <div className="checkout-block">
            <div className="checkout-block__head">
              <h2 className="checkout-block__title">Seat</h2>
              <Link to="/space" className="checkout-block__edit">Edit →</Link>
            </div>
            {seat ? (
              <div className="checkout-block__content">
                <p className="checkout-block__main">{seat.label}</p>
                <p className="checkout-block__sub">{seat.seatType} · ₹{seat.pricePerHour}/hr · 1 hour (default)</p>
              </div>
            ) : (
              <p className="checkout-block__empty">
                No seat selected. <Link to="/space" className="checkout-block__link">Choose one →</Link>
              </p>
            )}
          </div>

          {/* Drink block */}
          <div className="checkout-block">
            <div className="checkout-block__head">
              <h2 className="checkout-block__title">Drink</h2>
              <Link to="/fuel" className="checkout-block__edit">Edit →</Link>
            </div>
            {confirmedDrink && drinkMetrics ? (
              <div className="checkout-block__content">
                <p className="checkout-block__main">{drinkLabel}</p>
                <p className="checkout-block__sub">₹{drinkMetrics.price} · {drinkMetrics.caffeine}mg caffeine · {Math.round(drinkMetrics.calories)}kcal</p>
              </div>
            ) : (
              <p className="checkout-block__empty">
                No drink added. <Link to="/fuel" className="checkout-block__link">Build one →</Link>
              </p>
            )}
          </div>

          {/* Squad block */}
          {squad && members.length > 0 && (
            <div className="checkout-block">
              <div className="checkout-block__head">
                <h2 className="checkout-block__title">Squad — {squad.sessionName}</h2>
                <Link to="/squad" className="checkout-block__edit">Edit →</Link>
              </div>
              <div className="checkout-block__content">
                <div className="checkout-squad-list">
                  {members.map(m => (
                    <div key={m.id} className="checkout-squad-row">
                      <span className="checkout-squad-row__name">{m.name}</span>
                      <span className="checkout-squad-row__drink">{getDrinkLabel(m.drinkConfig)}</span>
                      <span className="checkout-squad-row__amount">₹{splitAmounts[m.id] ?? 0}</span>
                    </div>
                  ))}
                </div>
                <p className="checkout-block__sub">
                  Split method: <strong>{SPLIT_LABELS[squad.splitMode]}</strong>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Total + confirm */}
        <div className="checkout-page__sidebar">
          <div className="checkout-total">
            <span className="checkout-total__label">TOTAL</span>
            <span className="checkout-total__amount">₹{finalTotal}</span>
            {seat && (!squad || members.length === 0) && (
              <p className="checkout-total__note">Seat: 1 hour assumed</p>
            )}
          </div>

          {!isCustomValid && (
            <p className="checkout-custom-warning">
              Custom split amounts don't balance. <Link to="/squad">Fix in Squad →</Link>
            </p>
          )}

          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!isCustomValid}
          >
            Confirm Session
          </Button>
        </div>
      </div>
    </main>
  )
}
