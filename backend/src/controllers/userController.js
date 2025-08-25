import prisma from '../config/db.js'

export async function getAllUsers(req, res, next) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    })
    res.json(users)
  } catch (err) { next(err) }
}
