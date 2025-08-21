const prisma = require('../prisma/client')

const getAllUsers = async (req,res,next) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch(e) { next(e) }
}

const blockUser = async (req,res,next) => {
  try {
    const { id } = req.params
    const user = await prisma.user.update({ where: { id: parseInt(id) }, data: { blocked: true }})
    res.json(user)
  } catch(e){ next(e) }
}

const unblockUser = async (req,res,next) => {
  try {
    const { id } = req.params
    const user = await prisma.user.update({ where: { id: parseInt(id) }, data: { blocked: false }})
    res.json(user)
  } catch(e){ next(e) }
}

const deleteUser = async (req,res,next) => {
  try {
    const { id } = req.params
    await prisma.user.delete({ where: { id: parseInt(id) }})
    res.json({ message: 'Deleted successfully' })
  } catch(e){ next(e) }
}

const toggleAdmin = async (req,res,next) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) }})
    if(!user) return res.status(404).json({ message: 'User not found' })
    const updatedUser = await prisma.user.update({ where: { id: parseInt(id) }, data: { role: user.role === 'admin' ? 'user' : 'admin' }})
    res.json(updatedUser)
  } catch(e){ next(e) }
}

module.exports = { getAllUsers, blockUser, unblockUser, deleteUser, toggleAdmin }
