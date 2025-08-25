import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { getInventoryById } from '../services/inventoryService'

export default function InventoryPage() {
  const { id } = useParams()
  const [inventory, setInventory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInventory() {
      try {
        const data = await getInventoryById(id)
        setInventory(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchInventory()
  }, [id])

  if (loading) return <div className="text-center mt-10">Loading inventory...</div>
  if (!inventory) return <div className="text-center mt-10 text-red-500">Inventory not found</div>

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-3">{inventory.name}</h1>
      <p className="text-gray-600 mb-5">{inventory.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.items.map(item => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}
