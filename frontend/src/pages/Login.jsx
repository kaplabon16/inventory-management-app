import { useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const name = params.get('name')
    const email = params.get('email')
    if (token && name && email) {
      login({ token, name, email })
      navigate('/')
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <a href="http://localhost:5000/auth/google" className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
        Login with Google
      </a>
      <a href="http://localhost:5000/auth/github" className="bg-gray-800 text-white px-4 py-2 rounded">
        Login with GitHub
      </a>
    </div>
  )
}

export default Login
