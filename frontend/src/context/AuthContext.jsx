import React, { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService.js'
import { io } from 'socket.io-client'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5045'
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!token) return

    // Load user profile
    authService.getProfile(token)
      .then(profile => {
        setUser(profile)
        localStorage.setItem('user', JSON.stringify(profile))
      })
      .catch(() => {
        // Token invalid or forbidden
        logout()
      })

    // Initialize Socket.IO with token
    const s = io(SOCKET_URL, { auth: { token } })
    setSocket(s)
    return () => s.disconnect()
    // eslint-disable-next-line
  }, [token])

  async function loginLocal(email, password) {
    const res = await authService.login(email, password)
    setToken(res.token)
    setUser(res.user)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    return res
  }

  async function registerLocal(name, email, password) {
    const res = await authService.register(name, email, password)
    setToken(res.token)
    setUser(res.user)
    localStorage.setItem('token', res.token)
    localStorage.setItem('user', JSON.stringify(res.user))
    return res
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    if (socket) {
      socket.disconnect()
      setSocket(null)
    }
  }

  function startOAuth(provider) {
    // Redirect to backend OAuth route
    window.location.href = `${API}/api/auth/${provider}`
  }

  return (
    <AuthContext.Provider value={{ user, token, socket, loginLocal, registerLocal, logout, startOAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
