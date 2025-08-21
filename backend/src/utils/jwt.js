import jwt from 'jsonwebtoken'

export const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' })

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)
