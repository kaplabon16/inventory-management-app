import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch(err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-white/30 dark:bg-gray-800/40 backdrop-blur-md shadow-md border border-white/20 dark:border-gray-700/50 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/30 dark:bg-gray-700/40 backdrop-blur-md border border-white/20 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 mb-3"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-white/30 dark:bg-gray-700/40 backdrop-blur-md border border-white/20 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 mb-3"/>
        <button type="submit" className="w-full py-2 rounded-xl bg-blue-500/30 dark:bg-blue-600/30 text-blue-800 dark:text-blue-200">Login</button>
      </form>
    </div>
  )
}
