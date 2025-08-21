import jwt from 'jsonwebtoken'
import prisma from '../prisma/client.js'

export async function protect(req, res, next) {
  let token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Not authorized' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: decoded.id }})
    if (!user || user.blocked) return res.status(401).json({ message: 'Not authorized' })
    req.user = user
    next()
  } catch(e) {
    res.status(401).json({ message: 'Token invalid' })
  }
}

export function admin(req,res,next){
  if(req.user?.isAdmin) next()
  else res.status(403).json({ message: 'Admin only' })
}
