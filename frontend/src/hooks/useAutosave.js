import { useEffect } from 'react'

export function useAutosave(callback, interval = 8000, deps = []) {
  useEffect(() => {
    const id = setInterval(() => callback(), interval)
    return () => clearInterval(id)
  }, deps)
}
