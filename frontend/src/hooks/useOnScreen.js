import { useState, useEffect } from 'react'

export default function useOnScreen(ref, rootMargin = '0px', threshold = 1) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const current = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isIntersecting) {
          // Update our state when observer callback fires
          setIntersecting(entry.isIntersecting)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )
    if (current) {
      observer.observe(current)
    }
    return () => {
      observer.unobserve(current)
    }
  }, [ref, rootMargin, threshold, isIntersecting])

  return isIntersecting
}
