import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getInventory, updateInventory } from '../services/inventoryService.js'
import ItemCard from '../components/ItemCard.jsx'
import CustomFieldInput from '../components/CustomFieldInput.jsx'
import TagInput from '../components/TagInput.jsx'
import useIntervalSave from '../hooks/useIntervalSave.js'
import { useAuth } from '../context/AuthContext.jsx'
import { generateCustomId } from '../utils/generateCustomId.js'

export default function InventoryPage(){
  const { id } = useParams()
  const [inventory, setInventory] = useState(null)
  const [editing, setEditing] = useState(false)
  const { token, user, socket } = useAuth()

  useEffect(()=>{
    if(!id) return
    getInventory(id).then(setInventory).catch(console.error)
  }, [id])

  // autosave every 8s
  const save = useCallback(async ()=>{
    if(!editing || !inventory) return
    try {
      await updateInventory(inventory.id, {
        title: inventory.title,
        description: inventory.description,
        category: inventory.category,
        publicAccess: inventory.public,
        tags: inventory.tags,
        customFields: inventory.customFields,
        customIdFormat: inventory.customIdFormat,
        version: inventory.version
      }, token)
      // optimistic: on success, bump local version
      setInventory(prev => ({ ...prev, version: (prev.version||0) + 1 }))
    } catch(e){
      console.error('Autosave failed', e)
    }
  }, [editing, inventory, token])

  useIntervalSave(save, editing ? 8000 : null)

  // listen for real-time item events for this inventory
  useEffect(()=>{
    if(!socket || !inventory) return
    const onAdded = (item)=> {
      setInventory(prev => ({ ...prev, items: [ ...prev.items, item ] }))
    }
    socket.on(`itemAdded:${inventory.id}`, onAdded)
    return ()=> {
      socket.off(`itemAdded:${inventory.id}`, onAdded)
    }
  }, [socket, inventory])

  if(!inventory) return <div>Loading...</div>

  const canEdit = user && (user.id === inventory.ownerId || user.isAdmin || inventory.public)

  return (
    <div>
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          {!editing ? (
            <>
              <h2 className="text-xl font-semibold">{inventory.title}</h2>
              <p className="text-sm text-gray-600">{inventory.description}</p>
            </>
          ) : (
            <>
              <input className="border px-2 py-1 w-full mb-2" value={inventory.title} onChange={e=>setInventory({...inventory, title:e.target.value})} />
              <textarea className="border px-2 py-1 w-full" rows={4} value={inventory.description} onChange={e=>setInventory({...inventory, description:e.target.value})} />
            </>
          )}
        </div>

        {canEdit && (
          <div className="flex gap-2">
            <button onClick={()=>setEditing(e=>!e)} className="px-3 py-1 border rounded">{editing ? 'Stop edit' : 'Edit'}</button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {inventory.items?.map(it => <ItemCard key={it.id} item={it} canEdit={canEdit} />)}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Custom Fields</h3>
        {inventory.customFields?.length ? inventory.customFields.map((f,idx)=>(
          <CustomFieldInput key={idx} field={f} value={inventory.sampleData?.[f.key]} onChange={(v)=> {
            const sd = { ...(inventory.sampleData||{}) }
            sd[f.key] = v
            setInventory(prev => ({ ...prev, sampleData: sd }))
          }} />
        )) : <div className="text-sm text-gray-500">No custom fields</div>}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Tags</h3>
        <TagInput tags={inventory.tags||[]} onChange={t=>setInventory({...inventory, tags:t})} />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Custom ID preview</h3>
        <div className="p-3 border rounded">
          Preview: <code>{generateCustomId(inventory.customIdFormat || [], inventory.items?.length || 0)}</code>
        </div>
      </div>
    </div>
  )
}
