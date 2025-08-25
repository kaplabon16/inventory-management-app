import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard.jsx'
import { getInventory, likeItem } from '../api/inventory.js'

export default function InventoryPage() {
  const { id } = useParams()
  const [inventory, setInventory] = useState(null)

  useEffect(() => {
    getInventory(id).then(setInventory).catch(console.error)
  }, [id])

  const handleLike = (itemId) => {
    likeItem(itemId).then(updated => {
      setInventory(prev => ({
        ...prev,
        items: prev.items.map(it => it.id === itemId ? updated : it)
      }))
    })
  }

  if(!inventory) return <div className="text-gray-800 dark:text-gray-200 p-6">Loading...</div>

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{inventory.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{inventory.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.items.map(item => <ItemCard key={item.id} item={item} onLike={() => handleLike(item.id)} />)}
      </div>
    </div>
  )
}
