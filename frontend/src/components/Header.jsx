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
    <header className="sticky top-0 z-50 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border-b border-white/20 dark:border-gray-700/50">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/src/assets/logo.png" alt="logo" className="h-8 w-8" />
          <span className="font-semibold text-lg text-gray-800 dark:text-white">InventoryApp</span>
        </Link>

        <div className="flex items-center gap-3">
          <input
            onKeyDown={(e)=>{ if(e.key==='Enter') navigate(`/?q=${e.target.value}`) }}
            placeholder="Search..."
            className="px-3 py-1 rounded-xl bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/50 text-gray-800 dark:text-gray-200"
          />

          <select value={language} onChange={e => setLanguage(e.target.value)} className="border rounded-xl px-2 py-1 bg-white/30 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 border-white/20 dark:border-gray-700/50">
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <button onClick={toggleTheme} className="px-2 py-1 border rounded-xl bg-white/30 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/50">
            {theme==='light' ? '🌞' : '🌙'}
          </button>

          {user ? (
            <>
              <Link to="/profile" className="px-3 py-1 border rounded-xl bg-white/30 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/50">{user.name}</Link>
              <button onClick={logout} className="px-3 py-1 border rounded-xl bg-red-500/20 text-red-600 border-red-300">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => startOAuth('github')} className="px-3 py-1 border rounded-xl bg-white/30 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/50">Sign in with GitHub</button>
              <button onClick={() => startOAuth('google')} className="px-3 py-1 border rounded-xl bg-white/30 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/50">Sign in with Google</button>
              <Link to="/login" className="px-3 py-1 border rounded-xl bg-white/30 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/50">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
