import React from 'react'
import { Link } from 'react-router-dom'

export default function InventoryCard({ inventory }) {
  return (
    <Link to={`/inventory/${inventory.id}`} className="block p-4 rounded-xl bg-white/30 dark:bg-gray-800/40 backdrop-blur-md shadow-md border border-white/20 dark:border-gray-700/50 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{inventory.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{inventory.description}</p>
      <div className="mt-2 flex gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{inventory.items?.length || 0} items</span>
        {inventory.isPublic && <span>Public</span>}
      </div>
    </Link>
  )
}
