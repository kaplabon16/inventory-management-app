import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-auto py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} InventoryApp — built by Kaushik Plabon
    </footer>
  )
}
