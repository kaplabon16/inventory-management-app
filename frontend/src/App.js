import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.js'
import { ThemeProvider } from './context/ThemeContext.js'
import { LanguageProvider } from './context/LanguageContext.js'
import Navbar from './components/UI/Navbar.js'
import HomePage from './pages/HomePage.js'
import InventoryPage from './pages/InventoryPage.js'
import LoginPage from './components/Auth/LoginPage.js'

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <div className="container mx-auto mt-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/inventory/:id" element={<InventoryPage />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
