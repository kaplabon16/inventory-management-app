const jwt = require('jsonwebtoken')
const prisma = require('../prisma/client')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if(!authHeader) return res.status(401).json({ message: 'No token provided' })
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: decoded.id }})
    if(!user || user.blocked) return res.status(403).json({ message: 'User blocked or not found' })
    req.user = user
    next()
  } catch(e) { return res.status(401).json({ message: 'Invalid token' }) }
}

const adminMiddleware = (req, res, next) => {
  if(req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
  next()
}

module.exports = { authMiddleware, adminMiddleware }
