import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return <div className="text-center mt-10">You are not logged in.</div>

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <div className="bg-white shadow-md rounded p-5 max-w-md mx-auto">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Role:</span> {user.isAdmin ? 'Admin' : 'User'}</p>
      </div>
    </div>
  )
}
