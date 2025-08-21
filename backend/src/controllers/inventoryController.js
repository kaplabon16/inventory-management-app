const prisma = require('../prisma/client')

const createInventory = async (req,res,next) => {
  try {
    const { title, description, category, isPublic, customFields, tags } = req.body
    const inventory = await prisma.inventory.create({
      data: {
        title, description, category, isPublic, customFields,
        creatorId: req.user.id,
        tags: { create: tags?.map(name => ({ name })) }
      }
    })
    res.json(inventory)
  } catch(e){ next(e) }
}

const getInventory = async (req,res,next) => {
  try {
    const { id } = req.params
    const inventory = await prisma.inventory.findUnique({ where: { id: parseInt(id) }, include: { items: true, tags: true, accessList: true }})
    res.json(inventory)
  } catch(e){ next(e) }
}

const updateInventory = async (req,res,next) => {
  try {
    const { id } = req.params
    const { title, description, category, isPublic, customFields, version } = req.body
    const updated = await prisma.inventory.updateMany({
      where: { id: parseInt(id), version },
      data: { title, description, category, isPublic, customFields, version: { increment: 1 } }
    })
    if(updated.count === 0) return res.status(409).json({ message: 'Version conflict' })
    res.json({ message: 'Updated successfully' })
  } catch(e){ next(e) }
}

const deleteInventory = async (req,res,next) => {
  try {
    const { id } = req.params
    await prisma.inventory.delete({ where: { id: parseInt(id) }})
    res.json({ message: 'Deleted successfully' })
  } catch(e){ next(e) }
}

module.exports = { createInventory, getInventory, updateInventory, deleteInventory }
