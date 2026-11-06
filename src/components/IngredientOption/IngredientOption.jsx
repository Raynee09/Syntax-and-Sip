import './IngredientOption.css'

export default function IngredientOption({ label, description, isSelected, onClick, size = 'chip' }) {
  return (
    <button
      type="button"
      className={`ingredient-option ingredient-option--${size}${isSelected ? ' ingredient-option--selected' : ''}`}
      aria-pressed={isSelected}
      onClick={onClick}
    >
      <span className="ingredient-option__label">{label}</span>
      {description && size === 'card' && (
        <span className="ingredient-option__desc">{description}</span>
      )}
    </button>
  )
}
