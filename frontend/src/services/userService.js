const API = import.meta.env.VITE_API_URL || 'http://localhost:5045'

function authHeader() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getAllUsers() {
  const res = await fetch(`${API}/users`, { headers: authHeader() })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}
