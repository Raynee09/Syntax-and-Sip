import Button from '../Button/Button.jsx'
import './EmptyState.css'

export default function EmptyState({ icon, heading, message, action }) {
  return (
    <div className="empty-state" role="status">
      {icon && <div className="empty-state__icon" aria-hidden="true">{icon}</div>}
      <h2 className="empty-state__heading">{heading}</h2>
      {message && <p className="empty-state__message">{message}</p>}
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
