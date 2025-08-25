import prisma from '../prisma/client.js'
import bcrypt from 'bcryptjs'

// Register: create user and log them in (session)
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return res.status(400).json({ message: 'Email already in use' })
    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { name, email, password: hash } })
    // establish session
    req.login(user, (err) => {
      if (err) return next(err)
      // don't send password back
      const { password: _p, ...safeUser } = user
      res.json({ user: safeUser })
    })
  } catch (err) {
    next(err)
  }
}

// Local login: verify and establish session
export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const match = await bcrypt.compare(password, user.password || '')
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })
    req.login(user, (err) => {
      if (err) return next(err)
      const { password: _p, ...safeUser } = user
      res.json({ user: safeUser })
    })
  } catch (err) {
    next(err)
  }
}

// Logout: destroy session
export async function logout(req, res, next) {
  try {
    req.logout(err => {
      if (err) return next(err)
      req.session?.destroy(() => {
        res.clearCookie('connect.sid')
        res.json({ message: 'Logged out' })
      })
    })
  } catch (err) {
    next(err)
  }
}

// Return current user
export async function me(req, res) {
  if (!req.isAuthenticated || !req.isAuthenticated()) return res.status(401).json({ message: 'Not authenticated' })
  const user = req.user
  const { password: _p, ...safeUser } = user
  res.json({ user: safeUser })
}

// OAuth callback: passport already created session; redirect to frontend
export async function oauthCallback(req, res) {
  // If login succeeded, passport attached req.user and session is established
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/oauth-success`)
}
