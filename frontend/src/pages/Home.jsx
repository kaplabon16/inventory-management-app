import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to InventoryApp</h1>
      <p className="mb-6">Browse our inventories:</p>
      <Link to="/inventory/1" className="text-blue-500 underline">Go to Inventory 1</Link>
    </div>
  )
}
