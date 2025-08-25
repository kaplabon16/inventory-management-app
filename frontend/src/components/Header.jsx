import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Header() {
  const { user, doLogout, login } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { language, changeLanguage } = useLanguage()
  const navigate = useNavigate()

  return (
    <header className="bg-gray-200 dark:bg-gray-800 p-4 flex flex-wrap justify-between items-center">
      <Link to="/" className="text-xl font-bold">InventoryApp</Link>
      <div className="flex items-center gap-3">
        <select value={language} onChange={e => changeLanguage(e.target.value)} className="p-1 rounded border">
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        <button onClick={toggleTheme} className="px-2 py-1 border rounded">
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={doLogout} className="px-2 py-1 border rounded">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => login('github')} className="px-2 py-1 border rounded">GitHub</button>
            <button onClick={() => login('google')} className="px-2 py-1 border rounded">Google</button>
          </>
        )}
      </div>
    </header>
  )
}
