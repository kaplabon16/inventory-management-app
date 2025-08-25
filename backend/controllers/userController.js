import prisma from '../config/db.js'

export async function getAllUsers(req, res) {
  const users = await prisma.user.findMany({ select: { id: true, username: true, email: true, roles: true, blocked: true } })
  res.json(users)
}

export async function updateUserRoles(req, res) {
  const { id } = req.params
  const { roles } = req.body
  const updated = await prisma.user.update({ where: { id }, data: { roles } })
  res.json(updated)
}

export async function blockUser(req, res) {
  const { id } = req.params
  const updated = await prisma.user.update({ where: { id }, data: { blocked: true } })
  res.json(updated)
}

export async function unblockUser(req, res) {
  const { id } = req.params
  const updated = await prisma.user.update({ where: { id }, data: { blocked: false } })
  res.json(updated)
}
