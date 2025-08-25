import axios from 'axios'
const API = import.meta.env.VITE_API_URL

const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

export const createItem = (data) => axios.post(`${API}/items`, data, authHeader())
export const updateItem = (id, data) => axios.put(`${API}/items/${id}`, data, authHeader())
export const deleteItem = (id) => axios.delete(`${API}/items/${id}`, authHeader())
export const likeItem = (id) => axios.post(`${API}/items/${id}/like`, {}, authHeader())
