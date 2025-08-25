import jwt from 'jsonwebtoken'

export function generateToken(user) {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'jwt-secret', { expiresIn: '7d' })
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'jwt-secret')
}
