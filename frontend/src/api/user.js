import axios from 'axios'
const API = import.meta.env.VITE_API_URL

const authHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

export const getAllUsers = () => axios.get(`${API}/users`, authHeader())
export const updateUserRoles = (id, roles) => axios.put(`${API}/users/${id}/roles`, { roles }, authHeader())
export const blockUser = (id) => axios.put(`${API}/users/${id}/block`, {}, authHeader())
export const unblockUser = (id) => axios.put(`${API}/users/${id}/unblock`, {}, authHeader())
