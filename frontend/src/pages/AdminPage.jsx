import React, { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../api/user.js'

export default function AdminPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers().then(setUsers).catch(console.error)
  }, [])

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id).then(() => {
        setUsers(prev => prev.filter(u => u.id !== id))
      })
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow border border-white/20 dark:border-gray-700/50">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 text-gray-800 dark:text-gray-200">Name</th>
              <th className="px-4 py-2 text-gray-800 dark:text-gray-200">Email</th>
              <th className="px-4 py-2 text-gray-800 dark:text-gray-200">Role</th>
              <th className="px-4 py-2 text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t border-white/20 dark:border-gray-700/50">
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{user.name}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{user.email}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{user.role}</td>
                <td className="px-4 py-2">
                  <button onClick={() => handleDelete(user.id)} className="px-2 py-1 rounded-xl bg-red-500/20 text-red-700 dark:text-red-300">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
