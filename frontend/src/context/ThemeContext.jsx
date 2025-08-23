import React, { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext()
export const useTheme = ()=> useContext(ThemeContext)

export function ThemeProvider({ children }){
  const [theme, setTheme] = useState(()=> localStorage.getItem('theme') || 'light')
  useEffect(()=>{
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  },[theme])
  function toggleTheme(){ setTheme(t=> t==='light' ? 'dark' : 'light') }
  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}
