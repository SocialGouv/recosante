import { useState } from 'react'

const useSessionStorage = (key) => {
  const initialValue = sessionStorage.getItem(key)
  const [persistedValue, setPersistedValue] = useState(
    initialValue ? JSON.parse(initialValue) : initialValue
  )

  const setValue = (newValue) => {
    setPersistedValue(newValue)
    sessionStorage.setItem(key, JSON.stringify(newValue))
  }

  return [persistedValue, setValue]
}

export default useSessionStorage
