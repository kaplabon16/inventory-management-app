import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function OAuthSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { handleOAuthSuccess } = useAuth()
  const [status, setStatus] = useState('processing')
  const [error, setError] = useState(null)

  useEffect(() => {
    async function processOAuth() {
      try {
        const token = searchParams.get('token')
        const error = searchParams.get('error')
        
        if (error) {
          console.error('OAuth error from URL:', error)
          setError(`OAuth failed: ${error}`)
          setStatus('error')
          setTimeout(() => navigate('/login'), 3000)
          return
        }
        
        if (!token) {
          console.error('No token received from OAuth')
          setError('No authentication token received')
          setStatus('error')
          setTimeout(() => navigate('/login'), 3000)
          return
        }
        
        console.log('Processing OAuth success with token...')
        setStatus('authenticating')
        
        await handleOAuthSuccess(token)
        
        console.log('OAuth success, redirecting to home...')
        setStatus('success')
        navigate('/', { replace: true })
        
      } catch (err) {
        console.error('OAuth processing failed:', err)
        setError(err.message || 'Authentication failed')
        setStatus('error')
        setTimeout(() => navigate('/login'), 3000)
      }
    }

    processOAuth()
  }, [searchParams, navigate, handleOAuthSuccess])

  if (status === 'processing') {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Processing Login...</h2>
        <p className="text-gray-600">Please wait while we complete your authentication.</p>
      </div>
    )
  }

  if (status === 'authenticating') {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-400 h-12 w-12 mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-4">Authenticating...</h2>
        <p className="text-gray-600">Setting up your session...</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-xl font-semibold mb-2">Login Successful!</h2>
        <p className="text-gray-600">Redirecting you to the application...</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center">
        <div className="text-red-600 text-6xl mb-4">✗</div>
        <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-gray-600">Redirecting you to login page...</p>
        <button 
          onClick={() => navigate('/login')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return null
}