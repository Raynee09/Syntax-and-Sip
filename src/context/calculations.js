// Pure calculation functions — no state, no side effects

import { drinks } from '../data/drinks.js'
import { milkOptions, sweetnessOptions, syrupOptions, extraOptions } from '../data/ingredients.js'
import { seats } from '../data/seats.js'

export function calculateDrinkMetrics(drinkConfig) {
  if (!drinkConfig) return { price: 0, caffeine: 0, calories: 0, protein: 0 }

  const base    = drinks.find(d => d.id === drinkConfig.baseId) || {}
  const milk    = milkOptions.find(m => m.id === drinkConfig.milkId) || {}
  const sweet   = sweetnessOptions.find(s => s.id === drinkConfig.sweetnessId) || {}
  const syrups  = (drinkConfig.syrupIds || []).map(id => syrupOptions.find(s => s.id === id) || {})
  const extras  = (drinkConfig.extraIds || []).map(id => extraOptions.find(e => e.id === id) || {})

  const sum = (arr, key) => arr.reduce((acc, item) => acc + (item[key] ?? 0), 0)

  return {
    price:    (base.basePrice ?? 0) + (milk.price ?? 0) + (sweet.price ?? 0) + sum(syrups, 'price') + sum(extras, 'price'),
    caffeine: (base.caffeine  ?? 0) + sum(extras, 'caffeine'),
    calories: (base.calories  ?? 0) + (milk.calories ?? 0) + (sweet.calories ?? 0) + sum(syrups, 'calories') + sum(extras, 'calories'),
    protein:  (base.protein   ?? 0) + (milk.protein  ?? 0) + sum(extras, 'protein'),
  }
}

export function getDrinkLabel(drinkConfig) {
  if (!drinkConfig) return 'No drink'
  const base = drinks.find(d => d.id === drinkConfig.baseId)
  const milk = milkOptions.find(m => m.id === drinkConfig.milkId)
  const milkLabel = milk && milk.id !== 'none' ? milk.label : null
  const syrupLabels = (drinkConfig.syrupIds || []).map(id => {
    const s = syrupOptions.find(x => x.id === id)
    return s ? s.label : null
  }).filter(Boolean)

  let label = base ? base.name : 'Drink'
  if (milkLabel) label = `${milkLabel} ${label}`
  if (syrupLabels.length) label += ` + ${syrupLabels.join(', ')}`
  return label
}

export function calculateMemberSubtotal(member) {
  const drinkCost = calculateDrinkMetrics(member.drinkConfig).price
  const seat = member.seatId ? seats.find(s => s.id === member.seatId) : null
  const seatCost = seat ? seat.pricePerHour : 0
  return drinkCost + seatCost
}

export function calculateGroupTotal(members) {
  return (members || []).reduce((acc, m) => acc + calculateMemberSubtotal(m), 0)
}

export function calculateSplitAmounts(members, groupTotal, splitMode, customAmounts) {
  if (!members || members.length === 0) return {}

  if (splitMode === 'order') {
    return members.reduce((acc, m) => {
      acc[m.id] = calculateMemberSubtotal(m)
      return acc
    }, {})
  }

  if (splitMode === 'equal') {
    const base = Math.floor(groupTotal / members.length)
    const remainder = groupTotal - base * members.length
    return members.reduce((acc, m, i) => {
      acc[m.id] = i === members.length - 1 ? base + remainder : base
      return acc
    }, {})
  }

  if (splitMode === 'custom') {
    return members.reduce((acc, m) => {
      acc[m.id] = customAmounts[m.id] ?? 0
      return acc
    }, {})
  }

  return {}
}
