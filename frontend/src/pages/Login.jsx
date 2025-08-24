import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { loginLocal } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // handle OAuth redirect with token param
    const params = new URLSearchParams(window.location.search)
    const token = params.get("token")
    if (token) {
      localStorage.setItem("token", token)
      window.location.href = "/" // reload page after OAuth login
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await loginLocal(email, password)
      navigate("/")
    } catch (err) {
      setError(err?.message || "Login failed")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border px-2 py-1"
        />
        <input
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border px-2 py-1"
        />
        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Login</button>
          <button type="button" onClick={() => window.location.href="https://inventory-backend-production-aa15.up.railway.app/api/auth/github"} className="px-3 py-1 border rounded">GitHub</button>
          <button type="button" onClick={() => window.location.href="/api/auth/google"} className="px-3 py-1 border rounded">Google</button>
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        <div className="mt-3 text-sm">
          Don't have an account? 
          <a href="/register" className="text-blue-600 underline ml-1">Register</a>
        </div>
      </form>
    </div>
  )
}
