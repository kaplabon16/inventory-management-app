import React from 'react'

export default function CustomFieldInput({ field, value, onChange }) {
  const { type, title, description } = field
  const baseClass = "w-full px-3 py-2 rounded-xl bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
  
  if(type === 'text' || type === 'single') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">{title}</label>
        <input value={value||''} onChange={e=>onChange(e.target.value)} className={baseClass} />
        {description && <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>}
      </div>
    )
  }
  if(type === 'multiline') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">{title}</label>
        <textarea value={value||''} onChange={e=>onChange(e.target.value)} className={baseClass} rows={4} />
        {description && <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>}
      </div>
    )
  }
  if(type === 'number') {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">{title}</label>
        <input type="number" value={value||''} onChange={e=>onChange(e.target.value)} className={baseClass} />
      </div>
    )
  }
  if(type === 'bool') {
    return (
      <div className="mb-4 flex items-center gap-2">
        <input type="checkbox" checked={!!value} onChange={e=>onChange(e.target.checked)} className="accent-blue-500" />
        <label className="text-gray-800 dark:text-gray-200">{title}</label>
      </div>
    )
  }
  return null
}
