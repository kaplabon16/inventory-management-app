import React, { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const { registerLocal } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await registerLocal(name, email, password)
      navigate("/") // redirect to home after successful registration
    } catch (err) {
      setError(err?.message || "Registration failed")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full border px-2 py-1"
        />
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
          <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">Register</button>
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        <div className="mt-3 text-sm">
          Already have an account? 
          <a href="/login" className="text-blue-600 underline ml-1">Login</a>
        </div>
      </form>
    </div>
  )
}
