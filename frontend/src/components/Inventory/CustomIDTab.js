import { useState } from 'react'

export default function CustomIDTab({ inventoryId }) {
  const [ids, setIds] = useState([{ id: 1, value: 'INV-001' }, { id: 2, value: 'INV-002' }])
  const [newId, setNewId] = useState('')

  const addId = () => {
    if(newId.trim()) {
      setIds(prev => [...prev, { id: prev.length+1, value: newId }])
      setNewId('')
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input type="text" className="flex-1 p-2 border" placeholder="New ID" value={newId} onChange={e=>setNewId(e.target.value)} />
        <button onClick={addId} className="px-2 text-white bg-primary">Add</button>
      </div>
      <ul className="pl-5 list-disc">
        {ids.map(id => <li key={id.id}>{id.value}</li>)}
      </ul>
    </div>
  )
}
