import React from 'react'

export default function CustomFieldInput({ field, value, onChange }) {
  const { type, title, description } = field
  if(type === 'text' || type === 'single') {
    return (
      <div className="mb-2">
        <label className="block text-sm">{title}</label>
        <input value={value||''} onChange={e=>onChange(e.target.value)} className="w-full border rounded px-2 py-1" />
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
    )
  }
  if(type === 'multiline') {
    return (
      <div className="mb-2">
        <label className="block text-sm">{title}</label>
        <textarea value={value||''} onChange={e=>onChange(e.target.value)} className="w-full border rounded px-2 py-1" rows={4} />
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
    )
  }
  if(type === 'number') {
    return (
      <div className="mb-2">
        <label className="block text-sm">{title}</label>
        <input type="number" value={value||''} onChange={e=>onChange(e.target.value)} className="w-full border rounded px-2 py-1" />
      </div>
    )
  }
  if(type === 'bool') {
    return (
      <div className="mb-2 flex items-center gap-2">
        <input type="checkbox" checked={!!value} onChange={e=>onChange(e.target.checked)} />
        <label>{title}</label>
      </div>
    )
  }
  return null
}
