import React, { createContext, useContext, useState, useEffect } from "react"
import * as authService from "../services/authService.js"
import { io } from "socket.io-client"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000"
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { 
      const stored = localStorage.getItem("user")
      return stored ? JSON.parse(stored) : null
    } 
    catch { 
      return null 
    }
  })
  
  const [token, setToken] = useState(() => localStorage.getItem("token") || null)
  const [socket, setSocket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initializeAuth() {
      setLoading(true)
      
      if (token) {
        try {
          console.log('Fetching user profile with token...')
          const userProfile = await authService.getProfile(token)
          console.log('User profile fetched:', userProfile)
          
          setUser(userProfile)
          localStorage.setItem("user", JSON.stringify(userProfile))

          // Initialize socket connection
          const s = io(SOCKET_URL, { 
            auth: { token }, 
            withCredentials: true,
            transports: ['websocket', 'polling']
          })
          
          s.on('connect', () => {
            console.log('Socket connected:', s.id)
          })
          
          s.on('connect_error', (error) => {
            console.error('Socket connection error:', error)
          })
          
          setSocket(s)
          
        } catch (error) {
          console.error('Failed to get user profile:', error)
          logout()
        }
      } else {
        console.log('No token found, user not authenticated')
        logout()
      }
      
      setLoading(false)
    }

    initializeAuth()
    
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
    // eslint-disable-next-line
  }, [token])

  function loginLocal(email, password) {
    console.log('Attempting local login for:', email)
    return authService.login(email, password).then(res => {
      console.log('Login successful:', res)
      setToken(res.token)
      setUser(res.user)
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))
      return res
    }).catch(error => {
      console.error('Login failed:', error)
      throw error
    })
  }

  function registerLocal(name, email, password) {
    console.log('Attempting registration for:', email)
    return authService.register(name, email, password).then(res => {
      console.log('Registration successful:', res)
      setToken(res.token)
      setUser(res.user)
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))
      return res
    }).catch(error => {
      console.error('Registration failed:', error)
      throw error
    })
  }

  function logout() {
    console.log('Logging out...')
    setToken(null)
    setUser(null)
    if (socket) {
      socket.disconnect()
      setSocket(null)
    }
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  function startOAuth(provider) {
    console.log(`Starting OAuth with ${provider}`)
    window.location.href = `${API}/api/auth/${provider}`
  }

  // Handle OAuth success with token
  async function handleOAuthSuccess(token) {
    try {
      console.log('Handling OAuth success with token:', token.substring(0, 20) + '...')
      setToken(token)
      localStorage.setItem("token", token)
      
      // Fetch user profile
      const userProfile = await authService.getProfile(token)
      console.log('OAuth user profile:', userProfile)
      
      setUser(userProfile)
      localStorage.setItem("user", JSON.stringify(userProfile))
      
      return userProfile
    } catch (error) {
      console.error('OAuth success handling failed:', error)
      logout()
      throw error
    }
  }

  const contextValue = {
    user,
    token,
    loading,
    loginLocal,
    registerLocal,
    logout,
    startOAuth,
    handleOAuthSuccess,
    socket
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}