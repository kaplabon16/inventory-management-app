import { useState } from 'react'
import { likeItem } from '../../api/item.js'

export default function LikeButton({ itemId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)

  const handleLike = async () => {
    await likeItem(itemId)
    setLikes(prev => prev + 1)
  }

  return <button onClick={handleLike} className="text-blue-600">{likes} ❤️</button>
}
