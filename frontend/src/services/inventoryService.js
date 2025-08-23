const API = import.meta.env.VITE_API_BASE || 'http://localhost:5045'

export async function listInventories(q){
  const url = new URL(API + '/api/inventories')
  if(q) url.searchParams.set('q', q)
  const res = await fetch(url.toString())
  if(!res.ok) throw await res.json()
  return res.json()
}

export async function getInventory(id){
  const res = await fetch(`${API}/api/inventories/${id}`)
  if(!res.ok) throw await res.json()
  return res.json()
}

export async function createInventory(payload, token){
  const res = await fetch(`${API}/api/inventories`, {
    method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(payload)
  })
  if(!res.ok) throw await res.json()
  return res.json()
}

export async function updateInventory(id,payload,token){
  const res = await fetch(`${API}/api/inventories/${id}`, {
    method:'PUT', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(payload)
  })
  if(!res.ok) throw await res.json()
  return res.json()
}
