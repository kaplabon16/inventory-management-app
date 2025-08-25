import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { ThemeContext } from '../../context/ThemeContext.js'
import { LanguageContext } from '../../context/LanguageContext.js'

export default function Navbar() {
  const { user, doLogout } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { language, switchLanguage } = useContext(LanguageContext)

  return (
    <nav className="flex items-center justify-between p-4 text-white bg-primary">
      <div>Inventory App</div>
      <div className="flex gap-4">
        <button onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</button>
        <button onClick={() => switchLanguage(language === 'en' ? 'es' : 'en')}>{language.toUpperCase()}</button>
        {user ? <button onClick={doLogout}>Logout</button> : null}
      </div>
    </nav>
  )
}
