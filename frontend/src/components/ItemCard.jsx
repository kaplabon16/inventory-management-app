import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemCard({ item, canEdit }) {
  return (
    <div className="border rounded p-2 shadow hover:shadow-md transition flex justify-between items-center">
      <div>
        <p className="font-semibold">{item.customId}</p>
        <p className="text-sm">{item.title}</p>
      </div>
      <div className="flex gap-2">
        <Link to={`/item/${item.id}`} className="px-2 py-1 bg-green-500 text-white rounded text-xs">View</Link>
        {canEdit && (
          <button className="px-2 py-1 bg-red-500 text-white rounded text-xs">Delete</button>
        )}
      </div>
    </div>
  )
}
