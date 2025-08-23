import React from 'react'

export default function Modal({ open, title, children, onClose }) {
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded p-4 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="px-2 py-1">Close</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
