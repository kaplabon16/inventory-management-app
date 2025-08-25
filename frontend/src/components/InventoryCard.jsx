import React from 'react'
import { Link } from 'react-router-dom'

export default function InventoryCard({ inventory }){
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{inventory.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{inventory.description}</p>
        </div>
        <Link to={`/inventory/${inventory.id}`} className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md">Open</Link>
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Items: {inventory._count?.items || 0}</div>
    </div>
  )
}
