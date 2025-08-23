const API = import.meta.env.VITE_API_BASE || 'http://localhost:5045'

export async function createItem(payload, token){
  const res = await fetch(`${API}/api/items`, {
    method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(payload)
  })
  if(!res.ok) throw await res.json()
  return res.json()
}

export async function updateItem(id,payload,token){
  const res = await fetch(`${API}/api/items/${id}`, {
    method:'PUT', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(payload)
  })
  if(!res.ok) throw await res.json()
  return res.json()
}

export async function likeItem(id, token){
  const res = await fetch(`${API}/api/items/like/${id}`, {
    method:'PUT', headers:{ Authorization:`Bearer ${token}` }
  })
  if(!res.ok) throw await res.json()
  return res.json()
}
