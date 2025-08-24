import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginUser, registerUser, getCurrentUser } from '../services/authService.jsx'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    getCurrentUser().then(setUser).catch(()=>setUser(null))
  },[])

  const login = async (credentials)=>{
    const data = await loginUser(credentials)
    setUser(data)
    return data
  }

  const register = async (details)=>{
    const data = await registerUser(details)
    setUser(data)
    return data
  }

  const logout = ()=> setUser(null)

  const startOAuth = (provider)=>{
    window.location.href = `/api/auth/${provider}`
  }

  return (
    <AuthContext.Provider value={{user, login, register, logout, startOAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=> useContext(AuthContext)
