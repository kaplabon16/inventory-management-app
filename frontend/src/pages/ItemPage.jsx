import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ItemPage(){
  const { id } = useParams()
  const [item, setItem] = useState(null)

  useEffect(()=>{
    fetch(`/api/items/${id}`).then(res=>res.json()).then(setItem)
  },[id])

  if(!item) return <p>Loading...</p>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
      <p>Quantity: {item.quantity}</p>
      <p>Location: {item.location}</p>
    </div>
  )
}
