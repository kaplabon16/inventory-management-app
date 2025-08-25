import { useEffect } from 'react'

export default function useIntervalSave(callback, delay) {
  useEffect(() => {
    const interval = setInterval(callback, delay)
    return () => clearInterval(interval)
  }, [callback, delay])
}
