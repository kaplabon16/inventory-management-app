const API = import.meta.env.VITE_API_BASE || 'http://localhost:5045'

export async function login(email, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function register(name, email, password) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  if (!res.ok) throw new Error('Registration failed')
  return res.json()
}

export async function getProfile(token) {
  const res = await fetch(`${API}/api/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if (!res.ok) throw new Error('Forbidden or not authenticated')
  return res.json()
}
