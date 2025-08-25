import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(()=>{
    const stored = localStorage.getItem('theme')
    if(stored) setTheme(stored)
  },[])

  const toggleTheme = () => {
    const t = theme==='light'?'dark':'light'
    setTheme(t)
    localStorage.setItem('theme', t)
  }

  useEffect(()=>{
    document.documentElement.className = theme
  },[theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
