import React, { useEffect, useState } from 'react'
import InventoryCard from '../components/InventoryCard.jsx'
import { listInventories } from '../services/inventoryService.js'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Home(){
  const { user } = useAuth()
  const [inventories, setInventories] = useState([])
  const [qparams] = useSearchParams()

  useEffect(()=> {
    const q = qparams.get('q') || ''
    listInventories(q).then(setInventories).catch(console.error)
  }, [qparams])

  if(!user) return (
    <div className="text-center mt-10 text-gray-600">
      Please <a href="/login" className="text-blue-600 underline">login</a> to view your dashboard
    </div>
  )

  const totalItems = inventories.reduce((acc, inv) => acc + (inv._count?.items || 0), 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded p-4 shadow text-center">
          <div className="text-sm text-gray-500">Total Inventories</div>
          <div className="text-2xl font-bold">{inventories.length}</div>
        </div>
        <div className="border rounded p-4 shadow text-center">
          <div className="text-sm text-gray-500">Total Items</div>
          <div className="text-2xl font-bold">{totalItems}</div>
        </div>
        {user.isAdmin && (
          <div className="border rounded p-4 shadow text-center">
            <div className="text-sm text-gray-500">Admin Access</div>
            <div className="text-2xl font-bold">✔</div>
          </div>
        )}
      </div>

      <section>
        <h3 className="text-xl font-semibold mb-2">Your Inventories</h3>
        {inventories.length ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {inventories.map(inv => (
              <InventoryCard key={inv.id} inventory={inv} />
            ))}
          </div>
        ) : <div className="text-gray-500">No inventories found</div>}
      </section>
    </div>
  )
}
