import jwt from 'jsonwebtoken'
import prisma from '../config/db.js'

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user || user.blocked) return res.status(401).json({ message: 'Unauthorized' })
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.some(r => req.user.roles.includes(r))) {
      return res.status(403).json({ message: 'Forbidden' })
    }
    next()
  }
}
