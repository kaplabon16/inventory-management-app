import React, { useState } from 'react'

export default function TagInput({ tags = [], onChange }) {
  const [value, setValue] = useState('')
  function addTag() {
    const t = value.trim()
    if(!t) return
    if(!tags.includes(t)) onChange([...tags, t])
    setValue('')
  }
  function remove(i) {
    const n = [...tags]; n.splice(i,1); onChange(n)
  }
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-2">
        {tags.map((t,i)=>(
          <span key={i} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded flex items-center gap-2">
            {t} <button onClick={()=>remove(i)} className="text-xs">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=> e.key==='Enter' && addTag()} className="border px-2 py-1 rounded flex-1" placeholder="Add tag and press Enter" />
        <button onClick={addTag} className="px-3 py-1 border rounded">Add</button>
      </div>
    </div>
  )
}
