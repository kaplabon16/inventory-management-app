const API = import.meta.env.VITE_API_BASE || 'http://localhost:5045'

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data.message || res.statusText || 'Request failed'
    throw new Error(message)
  }
  return data
}

export async function login(email, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return handleResponse(res)
}

export async function register(name, email, password) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  return handleResponse(res)
}

export async function getProfile(token) {
  const res = await fetch(`${API}/api/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  return handleResponse(res)
}
