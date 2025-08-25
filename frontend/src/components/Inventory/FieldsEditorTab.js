import { useState } from 'react'
import { useDragDrop } from '../../hooks/useDragDrop.js'

export default function FieldsEditorTab({ inventoryId }) {
  const { items: fields, moveItem } = useDragDrop([{ id:1, title:'Field1' }, { id:2, title:'Field2' }])

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center justify-between p-2 border">
          <span>{field.title}</span>
          <div className="flex gap-1">
            <button disabled={index===0} onClick={() => moveItem(index, index-1)}>↑</button>
            <button disabled={index===fields.length-1} onClick={() => moveItem(index, index+1)}>↓</button>
          </div>
        </div>
      ))}
    </div>
  )
}
