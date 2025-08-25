import React from 'react'
import { Link } from 'react-router-dom'

export default function InventoryCard({ inventory }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-200">
      <h3 className="text-xl font-semibold">{inventory.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{inventory.description}</p>
      <div className="flex justify-between mt-3 items-center">
        <span className="text-gray-600 text-sm">Items: {inventory.itemsCount}</span>
        <Link to={`/inventory/${inventory.id}`} className="text-blue-600 hover:underline">View</Link>
      </div>
    </div>
  )
}
