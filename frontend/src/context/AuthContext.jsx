import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password }, { withCredentials:true })
    setUser(res.data.user)
  }

  const logout = async () => {
    await axios.post('/auth/logout', {}, { withCredentials:true })
    setUser(null)
  }

  const startOAuth = provider => {
    window.location.href = `/auth/${provider}`
  }

  const oauthCallback = async () => {
    const res = await axios.get('/auth/oauth/callback', { withCredentials:true })
    setUser(res.data.user)
  }

  useEffect(()=>{
    axios.get('/auth/me', { withCredentials:true })
      .then(res=>setUser(res.data.user))
      .catch(()=>setUser(null))
  },[])

  return <AuthContext.Provider value={{ user, login, logout, startOAuth, oauthCallback }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
