import React from 'react'
import { Link } from 'react-router-dom'

export default function InventoryCard({ inventory }) {
  if(!inventory) return null
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{inventory.title || 'Untitled'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{inventory.description || ''}</p>
        </div>
        <Link to={`/inventory/${inventory.id}`} className="text-xs px-2 py-1 bg-blue-600 text-white rounded">Open</Link>
      </div>
      <div className="mt-2 text-xs text-gray-500">Items: {inventory._count?.items || 0}</div>
    </div>
  )
}
