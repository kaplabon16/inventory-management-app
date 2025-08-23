import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminPage(){
  const { token } = useAuth()
  const [users, setUsers] = useState([])

  useEffect(()=>{
    fetch((import.meta.env.VITE_API_BASE || 'http://localhost:5045') + '/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(r=>r.json()).then(setUsers).catch(()=>{})
  }, [token])

  async function action(url){
    try {
      const res = await fetch((import.meta.env.VITE_API_BASE || 'http://localhost:5045') + url, {
        method:'PUT', headers:{ Authorization: `Bearer ${token}` }
      })
      const j = await res.json()
      setUsers(prev => prev.map(u => u.id === j.id ? j : u))
    } catch(e){ console.error(e) }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Admin — Users</h2>
      <div className="space-y-3">
        {users.map(u=>(
          <div key={u.id} className="flex justify-between items-center border rounded p-3">
            <div>
              <div className="font-medium">{u.name} ({u.email})</div>
              <div className="text-sm text-gray-500">Admin: {u.isAdmin ? 'Yes' : 'No'}  •  Blocked: {u.blocked ? 'Yes' : 'No'}</div>
            </div>
            <div className="flex gap-2">
              {u.blocked ? <button onClick={()=>action(`/api/users/unblock/${u.id}`)} className="px-2 py-1 border rounded">Unblock</button> : <button onClick={()=>action(`/api/users/block/${u.id}`)} className="px-2 py-1 border rounded">Block</button>}
              {u.isAdmin ? <button onClick={()=>action(`/api/users/removeAdmin/${u.id}`)} className="px-2 py-1 border rounded">Remove Admin</button> : <button onClick={()=>action(`/api/users/makeAdmin/${u.id}`)} className="px-2 py-1 border rounded">Make Admin</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
