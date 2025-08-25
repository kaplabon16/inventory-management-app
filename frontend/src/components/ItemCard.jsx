import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemCard({ item, canEdit }) {
  return (
    <div className="border rounded p-3 flex justify-between items-center bg-white dark:bg-gray-800 shadow hover:shadow-lg transition">
      <div>
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.customId || item.id}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{item.data?.title || item.data?.name || ''}</div>
      </div>
      <div className="flex gap-2">
        <Link to={`/item/${item.id}`} className="px-2 py-1 bg-green-600 text-white rounded text-xs">View</Link>
        {canEdit && <button className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>}
      </div>
    </div>
  )
}
