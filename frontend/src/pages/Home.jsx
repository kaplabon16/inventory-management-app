import React, { useEffect, useState } from 'react'
import InventoryCard from '../components/InventoryCard.jsx'
import { getInventories } from '../api/inventory.js'

export default function Home() {
  const [inventories, setInventories] = useState([])

  useEffect(() => {
    getInventories().then(res => setInventories(res)).catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Inventories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventories.map(inv => <InventoryCard key={inv.id} inventory={inv} />)}
      </div>
    </div>
  )
}
