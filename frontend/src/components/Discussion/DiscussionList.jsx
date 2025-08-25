import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function DiscussionList({ inventoryId }) {
  const [messages, setMessages] = useState([])
  const socket = io(import.meta.env.VITE_API_URL)

  useEffect(() => {
    socket.emit('joinInventory', inventoryId)
    socket.on('newMessage', msg => setMessages(prev => [...prev, msg]))
    return () => socket.disconnect()
  }, [inventoryId])

  return (
    <div className="space-y-2 overflow-y-auto max-h-96">
      {messages.map(msg => (
        <div key={msg.id} className="p-2 border rounded">
          <div className="font-bold">{msg.user.username}</div>
          <div>{msg.message}</div>
        </div>
      ))}
    </div>
  )
}
