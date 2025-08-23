import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t">
      <div className="container text-center py-4 text-sm">
        © {new Date().getFullYear()} InventoryApp — built by Kaushik Plabon
      </div>
    </footer>
  )
}
