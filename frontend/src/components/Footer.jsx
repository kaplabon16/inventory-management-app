import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center">
      &copy; {new Date().getFullYear()} InventoryApp. All rights reserved.
    </footer>
  )
}
