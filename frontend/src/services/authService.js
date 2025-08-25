import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const loginWithGithub = () => {
  window.location.href = `${API_BASE}/auth/github`
}

export const loginWithGoogle = () => {
  window.location.href = `${API_BASE}/auth/google`
}

export const loginWithApple = () => {
  window.location.href = `${API_BASE}/auth/apple`
}

export const getProfile = async (token) => {
  const res = await axios.get(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const logout = async (token) => {
  await axios.post(`${API_BASE}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
