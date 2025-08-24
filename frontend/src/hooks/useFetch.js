// frontend/src/hooks/usefetch.js
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function useFetch(){
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  async function request(path, options = {}){
    setLoading(true)
    try {
      const base = import.meta.env.VITE_API_BASE || 'http://localhost:5045'
      const res = await fetch(base + path, {
        ...options,
        headers: {
          'Content-Type':'application/json',
          ...(options.headers||{}),
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      })
      const json = await res.json().catch(()=>null)
      if(!res.ok) throw json || { message: 'Request failed' }
      return json
    } finally { setLoading(false) }
  }
  return { request, loading }
}
