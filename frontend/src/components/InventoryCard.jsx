import React from 'react'
import { Link } from 'react-router-dom'

export default function InventoryCard({ inventory }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition relative">
      <h2 className="font-bold text-lg">{inventory.title}</h2>
      <p className="text-sm">{inventory.description}</p>
      {inventory.image && <img src={inventory.image} alt={inventory.title} className="mt-2 max-h-32 w-full object-cover" />}
      <p className="text-xs mt-1">By: {inventory.creatorName}</p>
      <Link to={`/inventory/${inventory.id}`} className="absolute top-2 right-2 px-2 py-1 bg-blue-500 text-white rounded text-xs">
        Open
      </Link>
    </div>
  )
}
