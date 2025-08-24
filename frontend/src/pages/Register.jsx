import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      await register({name,email,password})
      navigate('/')
    }catch(err){
      alert('Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full border rounded px-3 py-2" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full border rounded px-3 py-2" />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Register</button>
      </form>
    </div>
  )
}
