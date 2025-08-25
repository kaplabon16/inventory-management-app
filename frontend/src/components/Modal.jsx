import React from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  if(!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>
        <div>{children}</div>
        <button onClick={onClose} className="absolute top-2 right-2 px-2 py-1 rounded-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">✕</button>
      </div>
    </div>
  )
}
