import { useState } from 'react'
import { useSession } from '../../context/SessionContext.jsx'
import SquadMember from '../../components/SquadMember/SquadMember.jsx'
import BillSplitter from '../../components/BillSplitter/BillSplitter.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import Button from '../../components/Button/Button.jsx'
import './Squad.css'

export default function Squad() {
  const {
    squad, createSession, joinSession,
    addMember, removeMember, updateMemberName,
    updateMemberDrink, updateMemberSeat,
    setSplitMode, setCustomAmount, clearSquad,
  } = useSession()

  const [createName, setCreateName] = useState('')
  const [joinName,   setJoinName]   = useState('')

  if (!squad) {
    return (
      <main className="squad-page">
        <div className="squad-page__header">
          <h1 className="squad-page__heading">STUDY TOGETHER</h1>
          <p className="squad-page__intro">Create a session or join an existing one.</p>
        </div>
        <div className="squad-page__start">
          <div className="squad-page__start-block">
            <label className="squad-page__input-label" htmlFor="create-name">Session name</label>
            <input
              id="create-name"
              className="squad-page__input"
              type="text"
              placeholder="e.g. Study Group Alpha"
              value={createName}
              onChange={e => setCreateName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') createSession(createName) }}
            />
            <Button variant="primary" onClick={() => createSession(createName)}>
              Create Session
            </Button>
          </div>

          <div className="squad-page__divider">or</div>

          <div className="squad-page__start-block">
            <label className="squad-page__input-label" htmlFor="join-name">Join by session name</label>
            <input
              id="join-name"
              className="squad-page__input"
              type="text"
              placeholder="e.g. Study Group Alpha"
              value={joinName}
              onChange={e => setJoinName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') joinSession(joinName) }}
            />
            <Button variant="secondary" onClick={() => joinSession(joinName)}>
              Join Session
            </Button>
          </div>
        </div>
      </main>
    )
  }

  const hasMembers = squad.members.length > 0

  return (
    <main className="squad-page">
      <div className="squad-page__header">
        <h1 className="squad-page__heading">STUDY TOGETHER</h1>
        <div className="squad-page__session-info">
          <p className="squad-page__session-name">{squad.sessionName}</p>
          <Button variant="ghost" onClick={clearSquad}>End Session</Button>
        </div>
      </div>

      <div className="squad-page__layout">
        {/* Left: members */}
        <div className="squad-page__members-col">
          {!hasMembers && (
            <EmptyState
              icon="☕"
              heading="No members yet."
              message="Add the first person to your squad."
            />
          )}

          {squad.members.map(member => (
            <SquadMember
              key={member.id}
              member={member}
              onRemove={removeMember}
              onUpdateName={updateMemberName}
              onUpdateDrink={updateMemberDrink}
              onUpdateSeat={updateMemberSeat}
            />
          ))}

          {squad.members.length < 8 && (
            <button
              type="button"
              className="squad-page__add-btn"
              onClick={() => addMember('New Member')}
            >
              + Add Member
            </button>
          )}
        </div>

        {/* Right: bill splitter */}
        {hasMembers && (
          <div className="squad-page__splitter-col">
            <BillSplitter
              members={squad.members}
              splitMode={squad.splitMode}
              customAmounts={squad.customAmounts}
              onSetSplitMode={setSplitMode}
              onSetCustomAmount={setCustomAmount}
            />
            <div className="squad-page__checkout-cta">
              <Button as="link" to="/checkout" variant="primary">
                Go to Checkout →
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
