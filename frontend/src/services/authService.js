import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5045' })

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const login = (email, password) => API.post('/auth/login', { email, password })
const register = (data) => API.post('/auth/register', data)
const getProfile = (token) => API.get('/auth/profile', { headers: { Authorization: `Bearer ${token}` } })

export default { login, register, getProfile }
