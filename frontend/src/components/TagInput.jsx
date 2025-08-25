import React, { useState } from 'react'

export default function TagInput({ tags, setTags, placeholder = "Add tag" }) {
  const [input, setInput] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      if (!tags.includes(input.trim())) setTags([...tags, input.trim()])
      setInput('')
    }
    if (e.key === 'Backspace' && !input) {
      setTags(tags.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white/20 dark:bg-gray-700/30 rounded-xl border border-white/20 dark:border-gray-700/50">
      {tags.map((tag, i) => (
        <span key={i} className="px-2 py-1 bg-blue-500/20 dark:bg-blue-600/30 text-blue-800 dark:text-blue-200 rounded-xl flex items-center gap-1">
          {tag} <button onClick={() => setTags(tags.filter(t => t !== tag))} className="font-bold">×</button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-gray-800 dark:text-gray-200 outline-none px-1 py-1"
      />
    </div>
  )
}
