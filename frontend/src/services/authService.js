const API = import.meta.env.VITE_API_BASE || 'http://localhost:5045'

export async function login(email, password){
  const res = await fetch(`${API}/api/auth/login`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  })
  if(!res.ok) throw await res.json()
  return res.json()
}

export async function register(name,email,password){
  const res = await fetch(`${API}/api/auth/register`, {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ name, email, password })
  })
  if(!res.ok) throw await res.json()
  return res.json()
}

export async function getProfile(token){
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:5045'
  const res = await fetch(base + '/api/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
  if(!res.ok) throw await res.json()
  return res.json()
}
