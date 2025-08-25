import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

const Login = () => {
  const { login } = useContext(AuthContext)

  const handleOAuth = (provider) => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5045'}/auth/${provider}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    try { await login(email, password) } 
    catch(err) { console.error(err) }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" name="email" placeholder="Email" className="p-2 border rounded"/>
        <input type="password" name="password" placeholder="Password" className="p-2 border rounded"/>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
      <div className="mt-4 flex flex-col gap-2">
        <button onClick={() => handleOAuth('google')} className="bg-red-600 text-white p-2 rounded">Login with Google</button>
        <button onClick={() => handleOAuth('github')} className="bg-gray-800 text-white p-2 rounded">Login with GitHub</button>
      </div>
    </div>
  )
}

export default Login
