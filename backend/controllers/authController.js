import prisma from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function register(req, res) {
  const { username, email, password } = req.body
  if (!username || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ message: 'Email already registered' })
  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { username, email, password: hashed, roles: ['user'] }
  })
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  res.json({ token, user })
}

export async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' })
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
  res.json({ token, user })
}

export function socialLoginRedirect(req, res) {
  res.redirect(process.env.FRONTEND_URL)
}
