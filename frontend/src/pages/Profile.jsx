import React, { useEffect, useState } from 'react'
import { getProfile } from '../api/user.js'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getProfile().then(setUser).catch(console.error)
  }, [])

  if(!user) return <div className="text-gray-800 dark:text-gray-200 p-6">Loading...</div>

  return (
    <div className="container mx-auto py-6">
      <div className="p-6 rounded-xl bg-white/30 dark:bg-gray-800/40 backdrop-blur-md shadow-md border border-white/20 dark:border-gray-700/50 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{user.name}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Role: {user.role}</p>
      </div>
    </div>
  )
}
