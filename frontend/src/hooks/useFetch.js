import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export const useFetch = (endpoint, method = 'GET', body = null) => {
  const { user } = useContext(AuthContext)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(user ? { Authorization: `Bearer ${user.token}` } : {})
          },
          body: body ? JSON.stringify(body) : null
        })
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [endpoint, method, body, user])

  return { data, loading, error }
}
