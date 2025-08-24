import prisma from '../config/db.js'
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcryptjs'
import passport from 'passport'

export async function register(req, res) {
  try {
    const { name, email, password } = req.body
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' })
    }
    
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ 
      data: { name, email, password: hash },
      select: { id: true, name: true, email: true, isAdmin: true, blocked: true }
    })
    
    const token = generateToken(user)
    res.json({ 
      token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        blocked: user.blocked
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Registration failed', error: error.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    
    if (user.blocked) {
      return res.status(403).json({ message: 'Your account has been blocked' })
    }
    
    const match = await bcrypt.compare(password, user.password || '')
    if (!match) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    
    const token = generateToken(user)
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      blocked: user.blocked
    }
    
    res.json({ token, user: userResponse })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
}

// Fixed OAuth callback
export async function oauthCallback(req, res) {
  try {
    if (!req.user) {
      console.error('No user in OAuth callback')
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`)
    }
    
    const user = req.user
    const token = generateToken(user)
    
    // Use environment variable for frontend URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    
    console.log('OAuth success, redirecting to:', `${frontendUrl}/oauth-success?token=${token}`)
    res.redirect(`${frontendUrl}/oauth-success?token=${token}`)
  } catch (error) {
    console.error('OAuth callback error:', error)
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}/login?error=oauth_error`)
  }
}