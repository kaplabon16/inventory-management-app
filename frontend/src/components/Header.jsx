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
    <header className="bg-gray-100 dark:bg-gray-800 border-b">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src="/src/assets/logo.png" alt="logo" className="h-8 w-8" />
          <span className="font-semibold text-lg">InventoryApp</span>
        </Link>

        <div className="flex items-center gap-3">
          <input
            onKeyDown={(e)=>{ if(e.key==='Enter') navigate(`/?q=${e.target.value}`) }}
            placeholder="Search..."
            className="px-3 py-1 rounded border"
          />

          <select value={language} onChange={e => setLanguage(e.target.value)} className="border rounded px-2 py-1">
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <button onClick={toggleTheme} className="px-2 py-1 border rounded">
            {theme==='light' ? '🌞' : '🌙'}
          </button>

          {user ? (
            <>
              <Link to="/profile" className="px-3 py-1 border rounded">{user.name}</Link>
              <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => startOAuth('github')} className="px-3 py-1 border rounded">Sign in with GitHub</button>
              <button onClick={() => startOAuth('google')} className="px-3 py-1 border rounded">Sign in with Google</button>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
