import React, { useState } from 'react'

export default function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('')

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onChange([...tags, input.trim()])
      setInput('')
    }
  }

  const removeTag = (tag) => {
    onChange(tags.filter(t => t !== tag))
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span key={tag} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
            {tag} <button type="button" onClick={() => removeTag(tag)}>&times;</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a tag"
          onKeyDown={(e) => e.key === 'Enter' && addTag()}
        />
        <button type="button" onClick={addTag} className="bg-blue-600 text-white px-3 rounded hover:bg-blue-500">Add</button>
      </div>
    </div>
  )
}
