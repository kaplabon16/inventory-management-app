import prisma from '../prisma/client.js'
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcryptjs'
import passport from 'passport'

export async function register(req, res) {
  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { name, email, password: hash } })
  const token = generateToken(user)
  res.json({ token, user })
}

export async function login(req, res) {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(400).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: 'Invalid credentials' })
  const token = generateToken(user)
  res.json({ token, user })
}

// OAuth callback
export async function oauthCallback(req, res) {
  try {
    const user = req.user
    if (!user) return res.status(400).send('User not found')

    const token = generateToken(user)

    // Default to localhost if FRONTEND_URL not set
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173'

    res.redirect(`${frontendURL}/oauth-success?token=${token}`)
  } catch (err) {
    console.error(err)
    res.status(500).send('OAuth callback failed')
  }
}
