import { useState, useEffect } from 'react'
import { drinks }                    from '../../data/drinks.js'
import { milkOptions, sweetnessOptions, syrupOptions, extraOptions } from '../../data/ingredients.js'
import { calculateDrinkMetrics }     from '../../context/calculations.js'
import IngredientOption from '../IngredientOption/IngredientOption.jsx'
import DrinkVisual      from '../DrinkVisual/DrinkVisual.jsx'
import MetricsPanel     from '../MetricsPanel/MetricsPanel.jsx'
import Button           from '../Button/Button.jsx'
import './FuelBuilder.css'

const DEFAULT_DRAFT = {
  baseId:      drinks[0].id,
  milkId:      'none',
  sweetnessId: 'none',
  syrupIds:    [],
  extraIds:    [],
}

export default function FuelBuilder({ confirmedDrink, onConfirm }) {
  const [draft, setDraft]       = useState(confirmedDrink || DEFAULT_DRAFT)
  const [confirmed, setConfirmed] = useState(false)

  // If confirmedDrink changes externally (e.g. restored from LocalStorage), seed the draft
  useEffect(() => {
    if (confirmedDrink) setDraft(confirmedDrink)
  }, [])

  const metrics = calculateDrinkMetrics(draft)
  const base    = drinks.find(d => d.id === draft.baseId) || drinks[0]
  const milk    = milkOptions.find(m => m.id === draft.milkId)
  const hasMilk = milk && milk.id !== 'none'

  function setBase(id)       { setDraft(d => ({ ...d, baseId: id, milkId: d.milkId, sweetnessId: d.sweetnessId, syrupIds: d.syrupIds, extraIds: d.extraIds })) }
  function setMilk(id)       { setDraft(d => ({ ...d, milkId: id })) }
  function setSweetness(id)  { setDraft(d => ({ ...d, sweetnessId: id })) }
  function toggleSyrup(id)   { setDraft(d => ({ ...d, syrupIds: d.syrupIds.includes(id) ? d.syrupIds.filter(s => s !== id) : [...d.syrupIds, id] })) }
  function toggleExtra(id)   { setDraft(d => ({ ...d, extraIds: d.extraIds.includes(id) ? d.extraIds.filter(e => e !== id) : [...d.extraIds, id] })) }

  function handleAddToOrder() {
    onConfirm(draft)
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 2500)
  }

  return (
    <div className="fuel-builder">
      {/* ── Right column: visual + metrics ── */}
      <div className="fuel-builder__result">
        <DrinkVisual
          drinkColor={base.color}
          hasMilk={hasMilk}
          drinkName={base.name}
        />
        <div className="fuel-builder__drink-name">{base.name}</div>
        <MetricsPanel
          price={metrics.price}
          caffeine={metrics.caffeine}
          calories={Math.round(metrics.calories)}
          protein={Math.round(metrics.protein * 10) / 10}
        />
      </div>

      {/* ── Left column: controls ── */}
      <div className="fuel-builder__controls">
        <section className="fuel-builder__section">
          <p className="fuel-builder__section-label">BASE</p>
          <div className="fuel-builder__card-grid">
            {drinks.map(d => (
              <IngredientOption
                key={d.id}
                label={d.name}
                description={d.description}
                isSelected={draft.baseId === d.id}
                onClick={() => setBase(d.id)}
                size="card"
              />
            ))}
          </div>
        </section>

        <section className="fuel-builder__section">
          <p className="fuel-builder__section-label">MILK</p>
          <div className="fuel-builder__chip-row">
            {milkOptions.map(m => (
              <IngredientOption
                key={m.id}
                label={m.label}
                isSelected={draft.milkId === m.id}
                onClick={() => setMilk(m.id)}
                size="chip"
              />
            ))}
          </div>
        </section>

        <section className="fuel-builder__section">
          <p className="fuel-builder__section-label">SWEETNESS</p>
          <div className="fuel-builder__chip-row">
            {sweetnessOptions.map(s => (
              <IngredientOption
                key={s.id}
                label={s.label}
                isSelected={draft.sweetnessId === s.id}
                onClick={() => setSweetness(s.id)}
                size="chip"
              />
            ))}
          </div>
        </section>

        <section className="fuel-builder__section">
          <p className="fuel-builder__section-label">SYRUPS</p>
          <div className="fuel-builder__chip-row">
            {syrupOptions.map(s => (
              <IngredientOption
                key={s.id}
                label={s.label}
                isSelected={draft.syrupIds.includes(s.id)}
                onClick={() => toggleSyrup(s.id)}
                size="chip"
              />
            ))}
          </div>
        </section>

        <section className="fuel-builder__section">
          <p className="fuel-builder__section-label">EXTRAS</p>
          <div className="fuel-builder__chip-row">
            {extraOptions.map(e => (
              <IngredientOption
                key={e.id}
                label={e.label}
                isSelected={draft.extraIds.includes(e.id)}
                onClick={() => toggleExtra(e.id)}
                size="chip"
              />
            ))}
          </div>
        </section>

        <div className="fuel-builder__footer">
          <Button variant="primary" onClick={handleAddToOrder}>Add to Order</Button>
          {confirmed && (
            <p className="fuel-builder__confirm-msg" role="status">
              Added to your session ✓
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
