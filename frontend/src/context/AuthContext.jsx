import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService.js'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if OAuth token exists in URL
    const params = new URLSearchParams(window.location.search)
    const oauthToken = params.get('token')
    if (oauthToken) {
      localStorage.setItem('token', oauthToken)
      setToken(oauthToken)
      authService.getProfile(oauthToken)
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
      navigate('/') // remove ?token= from URL
      window.history.replaceState({}, document.title, '/')
    } else {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        setToken(storedToken)
        authService.getProfile(storedToken)
          .then(res => setUser(res.data))
          .catch(() => {
            localStorage.removeItem('token')
            setToken(null)
          })
      }
    }
  }, [])

  const login = async (email, password) => {
    const res = await authService.login(email, password)
    setUser(res.data.user)
    setToken(res.data.token)
    localStorage.setItem('token', res.data.token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
