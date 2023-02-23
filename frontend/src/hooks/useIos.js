import { useState, useEffect } from 'react'

export default function useIos() {
  const [ios, setIos] = useState(false)
  useEffect(() => {
    setIos(
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    )
  }, [])

  return ios
}
