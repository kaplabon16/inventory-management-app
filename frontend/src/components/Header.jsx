import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Header(){
  const { user, logout, startOAuth } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const navigate = useNavigate()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.png" alt="logo" className="h-8 w-8" />
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">InventoryApp</span>
        </Link>

        <div className="flex items-center gap-2">
          <input
            onKeyDown={(e)=>{ if(e.key==='Enter') navigate(`/?q=${e.target.value}`) }}
            placeholder="Search..."
            className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:ring focus:ring-blue-200"
          />

          <select value={language} onChange={e => setLanguage(e.target.value)} className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 shadow-sm">
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <button onClick={toggleTheme} className="px-2 py-1 rounded-md border shadow-sm">
            {theme==='light' ? '🌞' : '🌙'}
          </button>

          {user ? (
            <>
              <Link to="/profile" className="px-3 py-1 border rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">{user.name}</Link>
              <button onClick={logout} className="px-3 py-1 border rounded-md bg-red-500 text-white">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => startOAuth('github')} className="px-3 py-1 border rounded-md bg-gray-800 text-white hover:bg-gray-700">GitHub</button>
              <button onClick={() => startOAuth('google')} className="px-3 py-1 border rounded-md bg-red-500 text-white hover:bg-red-400">Google</button>
              <Link to="/login" className="px-3 py-1 border rounded-md bg-blue-600 text-white hover:bg-blue-500">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
