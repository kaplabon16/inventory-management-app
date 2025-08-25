import React from 'react'

export default function CustomFieldInput({ field, value, onChange }) {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-gray-700 mb-1">{field.label}</label>
      <input
        type={field.type || 'text'}
        value={value || ''}
        onChange={(e) => onChange(field.id, e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={field.placeholder || ''}
      />
    </div>
  )
}
