import React, { useEffect, useState } from 'react'
import InventoryCard from '../components/InventoryCard.jsx'
import { listInventories } from '../services/inventoryService.js'
import { useSearchParams } from 'react-router-dom'

export default function Home(){
  const [inventories, setInventories] = useState([])
  const [loading, setLoading] = useState(true)
  const [qparams] = useSearchParams()

  useEffect(()=> {
    const q = qparams.get('q') || ''
    listInventories(q).then(data => setInventories(data || []))
      .catch(e=>{ console.error(e); setInventories([]) })
      .finally(()=> setLoading(false))
  }, [qparams])

  if(loading) return <div>Loading inventories...</div>
  if(inventories.length === 0) return <div>No inventories found</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {inventories.map(inv => <InventoryCard key={inv.id} inventory={inv} />)}
    </div>
  )
}
