import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemCard({ item }) {
  return (
    <div className="bg-white shadow rounded-lg p-3 hover:shadow-lg transition duration-200">
      <h4 className="font-medium">{item.name}</h4>
      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
      <div className="flex justify-between mt-2 items-center">
        <span className="text-gray-600 text-sm">Likes: {item.likes}</span>
        <Link to={`/item/${item.id}`} className="text-blue-600 hover:underline">Details</Link>
      </div>
    </div>
  )
}
