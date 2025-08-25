import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 w-full max-w-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-800 dark:text-gray-200 font-bold">×</button>
        {children}
      </div>
    </div>
  )
}
