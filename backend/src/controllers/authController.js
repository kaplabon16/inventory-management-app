const prisma = require('../prisma/client')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/jwt')

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { username, email, password: hashedPassword }})
    const token = generateToken(user)
    res.json({ user, token })
  } catch(e) { next(e) }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email }})
    if(!user) return res.status(400).json({ message: 'Invalid credentials' })
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
    const token = generateToken(user)
    res.json({ user, token })
  } catch(e) { next(e) }
}

module.exports = { register, login }
