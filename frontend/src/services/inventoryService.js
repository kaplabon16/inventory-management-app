import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE_URL

export const getAllInventories = async () => {
  const res = await axios.get(`${API_BASE}/inventories`)
  return res.data
}

export const getInventory = async (id) => {
  const res = await axios.get(`${API_BASE}/inventories/${id}`)
  return res.data
}

export const createInventory = async (data, token) => {
  const res = await axios.post(`${API_BASE}/inventories`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const updateInventory = async (id, data, token) => {
  const res = await axios.put(`${API_BASE}/inventories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const deleteInventory = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/inventories/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}
