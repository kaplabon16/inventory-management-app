import React from 'react'

export default function CustomFieldInput({ field, value, onChange }) {
  const { type, title, description } = field
  if(type === 'text' || type === 'single') {
    return (
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{title}</label>
        <input value={value||''} onChange={e=>onChange(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" />
        {description && <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>}
      </div>
    )
  }
  if(type === 'multiline') {
    return (
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{title}</label>
        <textarea value={value||''} onChange={e=>onChange(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" rows={4} />
        {description && <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>}
      </div>
    )
  }
  if(type === 'number') {
    return (
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{title}</label>
        <input type="number" value={value||''} onChange={e=>onChange(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200" />
      </div>
    )
  }
  if(type === 'bool') {
    return (
      <div className="mb-3 flex items-center gap-2">
        <input type="checkbox" checked={!!value} onChange={e=>onChange(e.target.checked)} className="w-4 h-4" />
        <label className="text-gray-700 dark:text-gray-200">{title}</label>
      </div>
    )
  }
  return null
}
