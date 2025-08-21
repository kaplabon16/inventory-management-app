import prisma from '../prisma/client.js'
import { generateToken } from '../utils/jwt.js'
import bcrypt from 'bcrypt'
import passport from 'passport'

export async function register(req,res){
  const {name,email,password} = req.body
  const hash = await bcrypt.hash(password,10)
  const user = await prisma.user.create({ data: {name,email,password:hash} })
  const token = generateToken(user)
  res.json({ token, user })
}

export async function login(req,res){
  const {email,password} = req.body
  const user = await prisma.user.findUnique({ where: { email } })
  if(!user) return res.status(400).json({ message: 'Invalid credentials' })
  const match = await bcrypt.compare(password,user.password)
  if(!match) return res.status(400).json({ message: 'Invalid credentials' })
  const token = generateToken(user)
  res.json({ token, user })
}

// OAuth callback
export async function oauthCallback(req,res){
  const user = req.user
  const token = generateToken(user)
  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`)
}
