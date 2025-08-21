import prisma from '../config/db.js'

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
}

export const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  })
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  res.json(user)
}

export const blockUser = async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isBlocked: true },
  })
  res.json(user)
}

export const unblockUser = async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isBlocked: false },
  })
  res.json(user)
}

export const toggleAdmin = async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isAdmin: !user.isAdmin },
  })
  res.json(updatedUser)
}
