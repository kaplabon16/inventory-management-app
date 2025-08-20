import prisma from '../config/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function register(req, res) {
  const { email, password, name } = req.body
  if (!email || !password || !name) return res.status(400).json({ message: 'All fields required' })

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { email, password: hashedPassword, name } })

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message })
  }
}

export async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'All fields required' })

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message })
  }
}
