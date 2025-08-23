import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const { loginLocal } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(()=>{
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if(token){
      localStorage.setItem('token', token)
      window.location.href = '/'
    }
  }, [])

  async function submit(e){
    e.preventDefault()
    try {
      await loginLocal(email,password)
      navigate('/')
    } catch(err){
      setError(err?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border px-2 py-1" />
        <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border px-2 py-1" />
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded">Login</button>
          <a href="/api/auth/github" className="px-3 py-1 border rounded">GitHub</a>
          <a href="/api/auth/google" className="px-3 py-1 border rounded">Google</a>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="mt-2 text-sm">
          Don't have an account? 
          <a href="/register" className="text-green-600 underline ml-1">Register</a>
        </div>
      </form>
    </div>
  )
}
