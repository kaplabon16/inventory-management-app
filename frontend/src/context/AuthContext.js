import { createContext, useState, useEffect } from 'react'
import { login } from '../api/auth.js'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
  }, [token])

  const doLogin = async (email, password) => {
    const res = await login({ email, password })
    setUser(res.data.user)
    setToken(res.data.token)
  }

  const doLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ user, token, doLogin, doLogout }}>{children}</AuthContext.Provider>
}
