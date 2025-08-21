const prisma = require('../prisma/client')
const generateCustomId = require('../utils/customIdGenerator')

const createItem = async (req,res,next) => {
  try {
    const { inventoryId, fields, customIdFormat } = req.body
    const customId = generateCustomId(customIdFormat)
    const item = await prisma.item.create({
      data: { inventoryId, fields, customId, createdById: req.user.id }
    })
    res.json(item)
  } catch(e){ next(e) }
}

const getItem = async (req,res,next) => {
  try {
    const { id } = req.params
    const item = await prisma.item.findUnique({ where: { id: parseInt(id) }})
    res.json(item)
  } catch(e){ next(e) }
}

const updateItem = async (req,res,next) => {
  try {
    const { id } = req.params
    const { fields, customId, version } = req.body
    const updated = await prisma.item.updateMany({
      where: { id: parseInt(id), version },
      data: { fields, customId, version: { increment: 1 } }
    })
    if(updated.count === 0) return res.status(409).json({ message: 'Version conflict' })
    res.json({ message: 'Updated successfully' })
  } catch(e){ next(e) }
}

const deleteItem = async (req,res,next) => {
  try {
    const { id } = req.params
    await prisma.item.delete({ where: { id: parseInt(id) }})
    res.json({ message: 'Deleted successfully' })
  } catch(e){ next(e) }
}

const likeItem = async (req,res,next) => {
  try {
    const { itemId } = req.body
    await prisma.like.create({ data: { itemId, userId: req.user.id }})
    res.json({ message: 'Liked successfully' })
  } catch(e){ next(e) }
}

module.exports = { createItem, getItem, updateItem, deleteItem, likeItem }
