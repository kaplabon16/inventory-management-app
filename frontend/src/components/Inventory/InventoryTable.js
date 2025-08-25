import { useEffect, useState } from 'react'
import { getLatestInventories, getPopularInventories } from '../../api/inventory.js'
import { useFetch } from '../../hooks/useFetch.js'
import { Link } from 'react-router-dom'

export default function InventoryTable({ type = 'latest' }) {
  const [inventories, setInventories] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = type === 'latest' ? await getLatestInventories() : await getPopularInventories()
      setInventories(res.data)
    }
    fetchData()
  }, [type])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Creator</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map(inv => (
            <tr key={inv.id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                <Link to={`/inventory/${inv.id}`} className="text-blue-600">{inv.title}</Link>
              </td>
              <td className="p-2">{inv.description}</td>
              <td className="p-2">{inv.creator?.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
