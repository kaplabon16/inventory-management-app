import React, { createContext, useContext, useState } from 'react'
const LanguageContext = createContext()
export const useLanguage = ()=> useContext(LanguageContext)

export function LanguageProvider({ children }){
  const [language, setLanguage] = useState(()=> localStorage.getItem('lang') || 'en')
  function setLang(l){
    setLanguage(l); localStorage.setItem('lang', l)
  }
  return <LanguageContext.Provider value={{ language, setLanguage: setLang }}>{children}</LanguageContext.Provider>
}
