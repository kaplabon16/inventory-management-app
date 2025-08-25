import { useState, useEffect } from 'react'

export default function useFetch(apiFunc, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    apiFunc()
      .then(res => isMounted && setData(res))
      .catch(err => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false))
    return () => { isMounted = false }
  }, deps)

  return { data, loading, error }
}
