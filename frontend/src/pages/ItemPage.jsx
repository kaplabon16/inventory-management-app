// frontend/src/pages/itempage.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateItem, likeItem } from '../services/itemService.js'
import { useAuth } from '../context/AuthContext.jsx'
import CustomFieldInput from '../components/CustomFieldInput.jsx'
import { getInventory } from '../services/inventoryService.js'

export default function ItemPage(){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [inventory, setInventory] = useState(null)
  const { token, user } = useAuth()

  useEffect(()=>{
    fetch((import.meta.env.VITE_API_BASE || 'http://localhost:5045') + `/api/items/${id}`)
      .then(r=>r.json()).then(setItem).catch(()=>{})
  }, [id])

  useEffect(()=>{
    if(item && item.inventoryId){
      getInventory(item.inventoryId).then(setInventory).catch(()=>{})
    }
  }, [item])

  const canEdit = user && (user?.isAdmin || user?.id === item?.createdById || inventory?.public)

  async function save(){
    try {
      await updateItem(item.id, { data: item.data, customId: item.customId, version: item.version }, token)
      alert('Saved')
    } catch(e){ alert('Save failed: ' + (e?.message || JSON.stringify(e))) }
  }

  async function doLike(){
    try {
      const res = await likeItem(item.id, token) // { likes: [...] }
      setItem(prev=> ({ ...prev, likes: res.likes }))
    } catch(e){ console.error(e) }
  }

  if(!item) return <div>Loading...</div>

  return (
    <div>
      <h2 className="font-semibold">{item.customId || item.id}</h2>
      <div className="mb-4">
        {inventory && <div className="text-sm text-gray-600">Inventory: {inventory.title}</div>}
      </div>

      <div className="mb-4">
        {inventory?.customFields?.map((f)=>(
          <CustomFieldInput key={f.key} field={f} value={item.data?.[f.key]} onChange={(v)=> setItem({...item, data:{...item.data, [f.key]: v}})} />
        ))}
      </div>

      <div className="flex gap-3">
        {canEdit && <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>}
        <button onClick={doLike} className="px-3 py-1 border rounded">
          Like ({Array.isArray(item.likes) ? item.likes.length : 0})
        </button>
      </div>
    </div>
  )
}
