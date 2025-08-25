const API = import.meta.env.VITE_API_URL || 'http://localhost:5045'

function authHeader() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getAllInventories() {
  const res = await fetch(`${API}/inventories`, { headers: authHeader() })
  if (!res.ok) throw new Error('Failed to fetch inventories')
  return res.json()
}

export async function getInventoryById(id) {
  const res = await fetch(`${API}/inventories/${id}`, { headers: authHeader() })
  if (!res.ok) throw new Error('Inventory not found')
  return res.json()
}
