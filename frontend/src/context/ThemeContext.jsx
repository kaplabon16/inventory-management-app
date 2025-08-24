import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState('light')

  useEffect(()=>{
    const local = localStorage.getItem('theme')
    if(local) setTheme(local)
  },[])

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark')
    localStorage.setItem('theme', theme)
  },[theme])

  const toggleTheme = ()=> setTheme(theme==='light' ? 'dark' : 'light')

  return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = ()=> useContext(ThemeContext)
