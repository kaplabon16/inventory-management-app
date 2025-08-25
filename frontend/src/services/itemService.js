import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE_URL

export const getItems = async (inventoryId) => {
  const res = await axios.get(`${API_BASE}/items?inventoryId=${inventoryId}`)
  return res.data
}

export const getItem = async (id) => {
  const res = await axios.get(`${API_BASE}/items/${id}`)
  return res.data
}

export const createItem = async (inventoryId, data, token) => {
  const res = await axios.post(`${API_BASE}/items`, { inventoryId, ...data }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const updateItem = async (id, data, token) => {
  const res = await axios.put(`${API_BASE}/items/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const deleteItem = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}
