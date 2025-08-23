import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { listInventories } from '../services/inventoryService.js'
import InventoryCard from '../components/InventoryCard.jsx'

export default function Profile(){
  const { user, token } = useAuth()
  const [owned, setOwned] = useState([])
  const [writable, setWritable] = useState([])

  useEffect(()=>{
    // fetch all inventories and filter locally (backend could provide endpoints)
    listInventories().then(all=>{
      setOwned(all.filter(i=>i.ownerId === user.id))
      setWritable(all.filter(i=>i.access?.some(a=>a.userId === user.id)))
    }).catch(()=>{})
  }, [user])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profile: {user?.name}</h2>
      <section className="mb-6">
        <h3 className="font-semibold mb-2">Your Inventories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {owned.map(inv=> <InventoryCard key={inv.id} inventory={inv} />)}
        </div>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Writable Inventories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {writable.map(inv=> <InventoryCard key={inv.id} inventory={inv} />)}
        </div>
      </section>
    </div>
  )
}
