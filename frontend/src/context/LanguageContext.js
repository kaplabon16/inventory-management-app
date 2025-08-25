import { createContext, useState } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../translations/en.json'
import es from '../translations/es.json'

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const switchLanguage = (lang) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }
  return <LanguageContext.Provider value={{ language, switchLanguage }}>{children}</LanguageContext.Provider>
}
