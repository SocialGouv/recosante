import { useState } from 'react'
import useUrlB64ToUint8Array from 'hooks/useUrlB64ToUint8Array'

export default function useNotificationsPrompt(sw, applicationServerKey) {
  const [error, setError] = useState(false)
  const [prompting, setPrompting] = useState(false)

  const applicationServerKeyAsUint8Array =
    useUrlB64ToUint8Array(applicationServerKey)

  const subscribe = () => {
    console.log(applicationServerKeyAsUint8Array)
    setPrompting(true)
    return navigator.serviceWorker
      .register(sw)
      .then((registration) => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKeyAsUint8Array,
        })
      })
      .then((pushSubscription) => {
        setPrompting(false)
        setError(false)
        return pushSubscription
      })
      .catch((error) => {
        setPrompting(false)
        console.log(error)
        setError(error.message)
      })
  }

  const clear = () => {
    setError(false)
    setPrompting(false)
  }

  return { error, prompting, subscribe, clear }
}
