import prisma from '../prisma/client.js'

export const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany({ include: { createdBy: true, inventory: true } })
    res.json(items)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const createItem = async (req, res) => {
  try {
    const { inventoryId, customId, data, createdById } = req.body
    const item = await prisma.item.create({
      data: { inventoryId, customId, data, createdById }
    })
    res.json(item)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
