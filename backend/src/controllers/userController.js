import prisma from '../prisma/client.js'

// list users (admin only)
export async function getUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, isAdmin: true, blocked: true, createdAt: true }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
}

export async function blockUser(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    if (req.user.id === id) return res.status(400).json({ message: "Admins cannot block themselves via this endpoint" })
    const user = await prisma.user.update({ where: { id }, data: { blocked: true } })
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function unblockUser(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const user = await prisma.user.update({ where: { id }, data: { blocked: false } })
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function makeAdmin(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    const user = await prisma.user.update({ where: { id }, data: { isAdmin: true } })
    res.json(user)
  } catch (err) {
    next(err)
  }
}

export async function removeAdmin(req, res, next) {
  try {
    const id = parseInt(req.params.id)
    // Allow admin to remove themselves (project requirement)
    const user = await prisma.user.update({ where: { id }, data: { isAdmin: false } })
    res.json(user)
  } catch (err) {
    next(err)
  }
}
