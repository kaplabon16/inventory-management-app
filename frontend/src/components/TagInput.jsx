import React, { useState } from 'react'

export default function TagInput({ tags, setTags }) {
  const [input, setInput] = useState('')
  const handleKeyDown = e => {
    if(e.key === 'Enter' && input.trim()) {
      setTags([...tags, input.trim()])
      setInput('')
      e.preventDefault()
    }
  }
  const removeTag = idx => setTags(tags.filter((_, i)=>i!==idx))
  return (
    <div className="flex flex-wrap gap-2 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1">
      {tags.map((tag,i)=>(
        <div key={i} className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded flex items-center gap-1">
          {tag} <span className="cursor-pointer" onClick={()=>removeTag(i)}>✕</span>
        </div>
      ))}
      <input
        value={input}
        onChange={e=>setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tag"
        className="flex-1 border-none outline-none bg-transparent text-sm text-gray-800 dark:text-gray-100"
      />
    </div>
  )
}
