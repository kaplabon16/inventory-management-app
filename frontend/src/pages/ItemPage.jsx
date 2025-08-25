import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getItemById } from '../services/itemService'

export default function ItemPage() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItem() {
      try {
        const data = await getItemById(id)
        setItem(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  if (loading) return <div className="text-center mt-10">Loading item...</div>
  if (!item) return <div className="text-center mt-10 text-red-500">Item not found</div>

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
      <p className="text-gray-500 mb-4">Likes: {item.likes}</p>
      <MarkdownRenderer content={item.description} />
    </div>
  )
}
