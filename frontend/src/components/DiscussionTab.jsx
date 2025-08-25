import React, { useEffect, useState } from 'react'
import { getDiscussion, postComment } from '../api/item.js'

export default function DiscussionTab({ itemId }) {
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    getDiscussion(itemId).then(setComments).catch(console.error)
  }, [itemId])

  const handlePost = () => {
    if (!text.trim()) return
    postComment(itemId, text).then(newComment => {
      setComments(prev => [...prev, newComment])
      setText('')
    })
  }

  return (
    <div className="p-4 bg-white/30 dark:bg-gray-800/40 backdrop-blur-md rounded-xl shadow border border-white/20 dark:border-gray-700/50">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Discussion</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto mb-2">
        {comments.map(c => (
          <div key={c.id} className="p-2 bg-white/20 dark:bg-gray-700/30 rounded-xl">
            <p className="text-gray-700 dark:text-gray-200"><strong>{c.user.name}</strong>: {c.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Write a comment..." 
          className="flex-1 px-3 py-2 rounded-xl bg-white/20 dark:bg-gray-700/30 text-gray-800 dark:text-gray-200 outline-none"/>
        <button onClick={handlePost} className="px-4 py-2 rounded-xl bg-blue-500/20 dark:bg-blue-600/30 text-blue-700 dark:text-blue-200">Post</button>
      </div>
    </div>
  )
}
