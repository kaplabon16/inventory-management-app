import { useState, useEffect } from 'react'
import { createItem, updateItem } from '../../api/item.js'

export default function ItemForm({ item, inventoryId, onSaved }) {
  const [name, setName] = useState(item?.name || '')
  const [customId, setCustomId] = useState(item?.customId || '')

  const handleSave = async () => {
    if(item) {
      await updateItem(item.id, { name, customId })
    } else {
      await createItem({ name, customId, inventoryId })
    }
    onSaved?.()
  }

  return (
    <div className="space-y-2">
      <input type="text" className="w-full p-2 border" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input type="text" className="w-full p-2 border" placeholder="Custom ID" value={customId} onChange={e=>setCustomId(e.target.value)} />
      <button onClick={handleSave} className="px-4 py-2 text-white bg-primary">Save</button>
    </div>
  )
}
