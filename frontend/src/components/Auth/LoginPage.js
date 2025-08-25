import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.js'
import { socialLoginUrl } from '../../api/auth.js'

export default function LoginPage() {
  const { doLogin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await doLogin(email, password)
  }

  return (
    <div className="max-w-md p-4 mx-auto mt-10 border rounded">
      <h1 className="mb-4 text-xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border" />
        <button type="submit" className="p-2 text-white bg-primary">Login</button>
      </form>
      <div className="flex flex-col gap-2 mt-4">
        <a href={socialLoginUrl.google} className="p-2 text-center text-white bg-red-500">Login with Google</a>
        <a href={socialLoginUrl.github} className="p-2 text-center text-white bg-gray-800">Login with GitHub</a>
      </div>
    </div>
  )
}
