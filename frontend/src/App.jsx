// frontend/src/app.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Home from './pages/home.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
import ItemPage from './pages/ItemPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/profile.jsx'
import { useAuth } from './context/AuthContext.jsx'

export default function App(){
  const { user } = useAuth()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory/:id" element={<InventoryPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/admin" element={ user?.isAdmin ? <AdminPage /> : <Navigate to="/login" /> } />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={ user ? <Profile /> : <Navigate to="/login" /> } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
