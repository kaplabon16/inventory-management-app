import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 mt-auto">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} InventoryApp. All rights reserved.
      </div>
    </footer>
  )
}
