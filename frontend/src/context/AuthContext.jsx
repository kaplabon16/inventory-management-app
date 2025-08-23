import React, { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService.js'
import { io } from 'socket.io-client'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const API = import.meta.env.VITE_API_BASE || 'http://localhost:5045'
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API

export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [token, setToken] = useState(()=> localStorage.getItem('token') || null)
  const [socket, setSocket] = useState(null)

  useEffect(()=>{
    // if token exists, try to load profile
    if(token){
      authService.getProfile(token).then(u=>{
        setUser(u)
        localStorage.setItem('user', JSON.stringify(u))
      }).catch(()=> {
        setToken(null); setUser(null); localStorage.removeItem('token'); localStorage.removeItem('user')
      })

      const s = io(SOCKET_URL, { auth: { token } })
      setSocket(s)
      return ()=> s.disconnect()
    } else {
      setUser(null)
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      if(socket) { socket.disconnect(); setSocket(null) }
    }
    // eslint-disable-next-line
  }, [token])

  function loginLocal(email, password){
    return authService.login(email,password).then(res=>{
      setToken(res.token)
      setUser(res.user)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      return res
    })
  }

  function registerLocal(name,email,password){
    return authService.register(name,email,password).then(res=>{
      setToken(res.token); setUser(res.user)
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      return res
    })
  }

  function logout(){
    setToken(null); setUser(null)
  }

  function startOAuth(provider){
    // redirect to backend OAuth starter route
    window.location.href = `${API}/api/auth/${provider}`
  }

  return (
    <AuthContext.Provider value={{ user, token, loginLocal, registerLocal, logout, startOAuth, socket }}>
      {children}
    </AuthContext.Provider>
  )
}
