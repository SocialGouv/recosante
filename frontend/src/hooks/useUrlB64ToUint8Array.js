import { useState, useEffect } from 'react'

export default function useUrlB64ToUint8Array(base64String) {
  const [key, setKey] = useState()
  useEffect(() => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    const rawData = window.atob(base64)
    setKey(Uint8Array.from([...rawData].map((char) => char.charCodeAt(0))))
  }, [base64String])

  return key
}
