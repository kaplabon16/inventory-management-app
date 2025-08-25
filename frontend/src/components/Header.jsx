import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">InventoryApp</Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          {user && <Link to="/profile" className="hover:text-gray-300">Profile</Link>}
          {user?.isAdmin && <Link to="/admin" className="hover:text-gray-300">Admin</Link>}
          {user
            ? <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-500">Logout</button>
            : <>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
              </>
          }
        </nav>
      </div>
    </header>
  )
}
