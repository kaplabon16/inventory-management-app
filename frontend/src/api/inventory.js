import axios from 'axios'
const API = import.meta.env.VITE_API_URL

const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

export const getLatestInventories = () => axios.get(`${API}/inventories/latest`)
export const getPopularInventories = () => axios.get(`${API}/inventories/popular`)
export const searchInventories = (query) => axios.get(`${API}/inventories/search?query=${query}`)

export const createInventory = (data) => axios.post(`${API}/inventories`, data, authHeader())
export const getInventory = (id) => axios.get(`${API}/inventories/${id}`)
export const updateInventory = (id, data) => axios.put(`${API}/inventories/${id}`, data, authHeader())
export const deleteInventory = (id) => axios.delete(`${API}/inventories/${id}`, authHeader())
