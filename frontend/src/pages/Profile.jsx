import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile(){
  const { user } = useAuth()
  if(!user) return <p>Loading...</p>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.isAdmin ? 'Admin' : 'User'}</p>
    </div>
  )
}
