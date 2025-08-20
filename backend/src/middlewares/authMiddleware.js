import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "No token provided" })

  const token = authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Invalid token" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: "Invalid/Expired token" })
  }
}

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admins only" })
  next()
}
