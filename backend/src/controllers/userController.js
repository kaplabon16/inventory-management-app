import prisma from '../config/db.js'

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message })
  }
}

export async function getUserById(req, res) {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message })
  }
}
