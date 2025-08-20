import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

const JWT_SECRET = 'your_jwt_secret_here' // change this to a strong secret

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    })

    res.status(201).json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })

    res.json({ message: 'Login successful', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
