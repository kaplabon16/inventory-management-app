import React, { useEffect, useState } from 'react'
import InventoryCard from '../components/InventoryCard'
import { getAllInventories } from '../services/inventoryService'

export default function Home() {
  const [inventories, setInventories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInventories() {
      try {
        const data = await getAllInventories()
        setInventories(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchInventories()
  }, [])

  if (loading) return <div className="text-center mt-10">Loading inventories...</div>

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">All Inventories</h1>
      {inventories.length === 0 
        ? <p className="text-gray-500">No inventories available.</p>
        : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {inventories.map(inv => <InventoryCard key={inv.id} inventory={inv} />)}
          </div>
      }
    </div>
  )
}
