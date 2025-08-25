import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, startOAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(email,password)
      navigate('/')
    } catch(err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="container mx-auto mt-20 max-w-md p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Login</h2>
      {error && <div className="mb-2 text-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring focus:ring-blue-200" required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:ring focus:ring-blue-200" required />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">Login</button>
      </form>
      <div className="mt-4 flex gap-2">
        <button onClick={()=>startOAuth('github')} className="px-3 py-2 bg-gray-800 text-white rounded-md w-full">GitHub</button>
        <button onClick={()=>startOAuth('google')} className="px-3 py-2 bg-red-500 text-white rounded-md w-full">Google</button>
      </div>
    </div>
  )
}
