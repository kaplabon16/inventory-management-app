import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import InventoryPage from './pages/InventoryPage'
import ItemPage from './pages/ItemPage'
import AdminPage from './pages/AdminPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { useAuth } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  const { user } = useAuth()

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory/:id" element={<InventoryPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/admin" element={user?.isAdmin ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
