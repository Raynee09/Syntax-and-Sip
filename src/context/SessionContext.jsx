import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { exampleSessions } from '../data/squad.js'

const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const [selectedSeatId, setSelectedSeatId] = useLocalStorage('syntaxsip_seat', null)
  const [confirmedDrink, setConfirmedDrink]  = useLocalStorage('syntaxsip_drink', null)
  const [squad, setSquad]                    = useLocalStorage('syntaxsip_squad', null)

  // ── Seat ──────────────────────────────────────────────────────────────────
  function selectSeat(seatId) {
    setSelectedSeatId(seatId)
  }

  function clearSeat() {
    setSelectedSeatId(null)
  }

  // ── Drink ─────────────────────────────────────────────────────────────────
  function confirmDrink(drinkConfig) {
    setConfirmedDrink(drinkConfig)
  }

  function clearDrink() {
    setConfirmedDrink(null)
  }

  // ── Squad ─────────────────────────────────────────────────────────────────
  function createSession(name) {
    setSquad({
      sessionName: name || 'My Squad',
      members: [],
      splitMode: 'order',
      customAmounts: {},
    })
  }

  function joinSession(name) {
    const match = exampleSessions.find(
      s => s.sessionName.toLowerCase() === (name || '').toLowerCase()
    )
    if (match) {
      setSquad({ ...match })
    } else {
      createSession(name)
    }
  }

  function addMember(memberName) {
    if (!squad) return
    const newMember = {
      id: Date.now().toString(),
      name: memberName || 'New Member',
      drinkConfig: null,
      seatId: null,
    }
    setSquad({ ...squad, members: [...squad.members, newMember] })
  }

  function removeMember(memberId) {
    if (!squad) return
    const updated = squad.members.filter(m => m.id !== memberId)
    const newCustomAmounts = { ...squad.customAmounts }
    delete newCustomAmounts[memberId]
    setSquad({ ...squad, members: updated, customAmounts: newCustomAmounts })
  }

  function updateMemberName(memberId, name) {
    if (!squad) return
    setSquad({
      ...squad,
      members: squad.members.map(m => m.id === memberId ? { ...m, name } : m),
    })
  }

  function updateMemberDrink(memberId, drinkConfig) {
    if (!squad) return
    setSquad({
      ...squad,
      members: squad.members.map(m => m.id === memberId ? { ...m, drinkConfig } : m),
    })
  }

  function updateMemberSeat(memberId, seatId) {
    if (!squad) return
    setSquad({
      ...squad,
      members: squad.members.map(m => m.id === memberId ? { ...m, seatId } : m),
    })
  }

  function setSplitMode(mode) {
    if (!squad) return
    setSquad({ ...squad, splitMode: mode })
  }

  function setCustomAmount(memberId, amount) {
    if (!squad) return
    setSquad({
      ...squad,
      customAmounts: { ...squad.customAmounts, [memberId]: Number(amount) || 0 },
    })
  }

  function clearSquad() {
    setSquad(null)
  }

  // ── Confirm session (clears everything) ───────────────────────────────────
  function confirmSession() {
    setSelectedSeatId(null)
    setConfirmedDrink(null)
    setSquad(null)
  }

  const value = {
    selectedSeatId, selectSeat, clearSeat,
    confirmedDrink, confirmDrink, clearDrink,
    squad, createSession, joinSession,
    addMember, removeMember, updateMemberName,
    updateMemberDrink, updateMemberSeat,
    setSplitMode, setCustomAmount, clearSquad,
    confirmSession,
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used inside SessionProvider')
  return ctx
}
