import React, { useEffect, useState } from 'react'
import InventoryCard from '../components/InventoryCard.jsx'
import { listInventories } from '../services/inventoryService.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function Home() {
  const { user, token } = useAuth()
  const [inventories, setInventories] = useState([])
  const [recentItems, setRecentItems] = useState([])

  useEffect(() => {
    listInventories().then(all => {
      setInventories(all)
      // get latest 5 items across inventories
      const items = all.flatMap(inv => inv.items || [])
      items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setRecentItems(items.slice(0, 5))
    }).catch(console.error)
  }, [])

  // Dashboard stats
  const totalInventories = inventories.length
  const totalItems = inventories.reduce((sum, inv) => sum + (inv.items?.length || 0), 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow text-center">
          <div className="text-sm text-gray-500">Total Inventories</div>
          <div className="text-xl font-semibold">{totalInventories}</div>
        </div>
        <div className="p-4 border rounded shadow text-center">
          <div className="text-sm text-gray-500">Total Items</div>
          <div className="text-xl font-semibold">{totalItems}</div>
        </div>
        <div className="p-4 border rounded shadow text-center">
          <div className="text-sm text-gray-500">Your Name</div>
          <div className="text-xl font-semibold">{user?.name || 'Guest'}</div>
        </div>
      </div>

      {/* Recent Inventories */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Inventories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inventories.slice(-6).reverse().map(inv => (
            <InventoryCard key={inv.id} inventory={inv} />
          ))}
        </div>
      </div>

      {/* Recent Items */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentItems.map(item => (
            <div key={item.id} className="border rounded p-3 flex justify-between items-center">
              <div>
                <div className="text-sm font-semibold">{item.customId || item.id}</div>
                <div className="text-xs text-gray-600">{item.data?.title || item.data?.name || ''}</div>
              </div>
              <div className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
          {recentItems.length === 0 && <div className="text-gray-500">No recent items</div>}
        </div>
      </div>
    </div>
  )
}
