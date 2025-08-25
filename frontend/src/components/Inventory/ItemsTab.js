import { useState, useEffect } from 'react'
import { getInventory } from '../../api/inventory.js'
import { Link } from 'react-router-dom'
import { likeItem } from '../../api/item.js'

export default function ItemsTab({ inventoryId }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const res = await getInventory(inventoryId)
      setItems(res.data.items)
    }
    fetchItems()
  }, [inventoryId])

  const handleLike = async (id) => {
    await likeItem(id)
    setItems(prev => prev.map(item => item.id===id ? {...item, likesCount: item.likesCount+1} : item))
  }

  return (
    <table className="min-w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Likes</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{item.customId}</td>
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.likesCount}</td>
            <td className="p-2">
              <button onClick={() => handleLike(item.id)} className="text-blue-600">Like</button>
              <Link to={`/item/${item.id}`} className="ml-2 text-green-600">Edit/View</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
