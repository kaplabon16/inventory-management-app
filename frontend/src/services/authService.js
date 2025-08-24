const API = import.meta.env.VITE_API_BASE || "http://localhost:5000"

export async function login(email, password) {
  console.log('Making login request to:', `${API}/api/auth/login`)
  
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  })
  
  console.log('Login response status:', res.status)
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Login failed' }))
    console.error('Login error:', errorData)
    throw new Error(errorData.message || 'Login failed')
  }
  
  const data = await res.json()
  console.log('Login response data:', data)
  return data
}

export async function register(name, email, password) {
  console.log('Making registration request to:', `${API}/api/auth/register`)
  
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include"
  })
  
  console.log('Registration response status:', res.status)
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Registration failed' }))
    console.error('Registration error:', errorData)
    throw new Error(errorData.message || 'Registration failed')
  }
  
  const data = await res.json()
  console.log('Registration response data:', data)
  return data
}

export async function getProfile(token) {
  console.log('Making profile request to:', `${API}/api/users/me`)
  console.log('Using token:', token ? token.substring(0, 20) + '...' : 'No token')
  
  const res = await fetch(`${API}/api/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: "include"
  })
  
  console.log('Profile response status:', res.status)
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to get profile' }))
    console.error('Profile error:', errorData)
    throw new Error(errorData.message || 'Failed to get profile')
  }
  
  const data = await res.json()
  console.log('Profile response data:', data)
  return data
}