import { useState } from 'react'

export function useLocalStorage(key, defaultValue) {
  const [value, setValueState] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored === null) return defaultValue
      return JSON.parse(stored)
    } catch {
      return defaultValue
    }
  })

  function setValue(newVal) {
    setValueState(newVal)
    try {
      if (newVal === null || newVal === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newVal))
      }
    } catch {
      // Silently ignore storage errors
    }
  }

  return [value, setValue]
}
