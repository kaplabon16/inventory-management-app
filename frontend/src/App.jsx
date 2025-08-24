import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
import ItemPage from './pages/ItemPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import OAuthSuccess from './pages/OAuthSuccess.jsx'
import { useAuth } from './context/AuthContext.jsx'

export default function App() {
  const { user, loading } = useAuth()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory/:id" element={<InventoryPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route 
            path="/admin" 
            element={user?.isAdmin ? <AdminPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" replace /> : <Register />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/login" replace />} 
          />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          
          {/* Catch-all route for 404 */}
          <Route 
            path="*" 
            element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The page you're looking for doesn't exist.
                </p>
                <a 
                  href="/" 
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  Go back to home
                </a>
              </div>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}