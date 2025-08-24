import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function InventoryPage(){
  const { id } = useParams()
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch(`/api/inventory/${id}/items`).then(res=>res.json()).then(setItems)
  },[id])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Inventory {id}</h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="border p-2 rounded">
            <Link to={`/item/${item.id}`} className="text-blue-500">{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
