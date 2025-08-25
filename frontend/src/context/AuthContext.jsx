import { createContext, useContext, useState, useEffect } from 'react'
import { getProfile, logout } from '../services/authService.js'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      getProfile(token).then(setUser).catch(() => setUser(null))
    }
  }, [token])

  const login = (provider) => {
    if (provider === 'github') window.location.href = import.meta.env.VITE_API_BASE_URL + '/auth/github'
    if (provider === 'google') window.location.href = import.meta.env.VITE_API_BASE_URL + '/auth/google'
    if (provider === 'apple') window.location.href = import.meta.env.VITE_API_BASE_URL + '/auth/apple'
  }

  const doLogout = async () => {
    if (token) await logout(token)
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, doLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
