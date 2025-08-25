import React from 'react'

export default function ItemCard({ item, onLike }) {
  return (
    <div className="p-3 rounded-xl bg-white/30 dark:bg-gray-800/40 backdrop-blur-md shadow border border-white/20 dark:border-gray-700/50">
      <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">{item.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">Likes: {item.likes || 0}</span>
        <button onClick={onLike} className="px-2 py-1 text-sm rounded-xl bg-blue-500/20 text-blue-600">Like</button>
      </div>
    </div>
  )
}
